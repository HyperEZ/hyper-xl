import { ReactNode } from 'react';
import { R as Row } from './Row-CO-gLrwi.js';

/**
 * Props handed to a custom display renderer (셀 내 커스텀 요소 삽입 / Custom
 * Cell Renderer). A renderer is a plain function invoked at cell render time; it
 * receives the resolved cell value plus the row / column it belongs to and the
 * cell's 0-based grid coordinates. `isEditing` is always `false` for a display
 * renderer: while a cell is being edited the grid blanks it and overlays the
 * editor, so the display renderer is not invoked at all. The flag is meaningful
 * only on the editor (`CellEditorProps`), where it is `true`.
 */
interface CellRendererProps<T = unknown> {
    row: Row;
    column: Column<T>;
    value: T;
    /** 0-based row index in the (sorted/filtered) grid view. */
    rowIndex: number;
    /** 0-based column index in the current column order. */
    columnIndex: number;
    /**
     * `true` only on the custom editor (the active edit target). Always `false`
     * when received by a display renderer, which is never invoked during editing.
     */
    isEditing: boolean;
}
/**
 * How a custom editor's commit should move the active cell afterwards,
 * mirroring Excel: Enter / Shift+Enter move down / up, Tab / Shift+Tab move
 * right / left, and `'none'` keeps the active cell where it is. Defaults to
 * `'none'` when {@link CellEditorProps.onCommit} is called without it.
 */
type CellEditCommitNav = 'enter' | 'shift-enter' | 'tab' | 'shift-tab' | 'none';
/**
 * Props handed to a custom editor (Editor Renderer). Extends the
 * display props with the commit / cancel callbacks the editor calls to end the
 * edit. `onCommit(next, nav?)` writes the typed value back through the grid's
 * normal `onCellChange` pipeline (no string coercion — the editor owns the
 * type) and optionally moves the active cell (`nav`, default `'none'`);
 * `onCancel()` discards the edit and restores grid focus. The editor owns its
 * own keyboard, focus, and blur behaviour — the grid only positions it over the
 * cell rectangle. Note: mousedown inside the editor does not propagate to the
 * grid (so a click can't be read as a selection gesture that cancels the edit).
 */
interface CellEditorProps<T = unknown> extends CellRendererProps<T> {
    onCommit: (next: T, nav?: CellEditCommitNav) => void;
    onCancel: () => void;
    /**
     * How the edit was started: `'edit'` (F2 / double-click — full value),
     * `'overwrite'` (a printable key — {@link initialDraft} carries that char),
     * or `'clear'` (Backspace — start empty). Editors that manage their own
     * widget (slider, picker) can ignore this; text-like editors can honour it.
     */
    mode?: 'edit' | 'overwrite' | 'clear';
    /**
     * Seed string for the edit, already accounting for {@link mode}: the current
     * value's string form for `'edit'`, the typed character for `'overwrite'`,
     * or `''` for `'clear'`. The editor is free to ignore it and read
     * {@link CellRendererProps.value} instead.
     */
    initialDraft?: string;
}
/**
 * A custom display renderer: maps {@link CellRendererProps} to React content.
 * Invoked as a plain render function (once per visible cell), so it should be a
 * **pure function of its props** — don't call hooks at its top level. If you
 * need local state, render a child component from it (`(p) => <MyCell {...p} />`).
 */
type CellRenderer<T = unknown> = (props: CellRendererProps<T>) => ReactNode;
/**
 * A custom editor: maps {@link CellEditorProps} to React content. Unlike
 * {@link CellRenderer}, the editor is mounted as a **component** (its own
 * fiber), so it may hold draft state with hooks (`useState`, `useRef`, …) and
 * mounts / unmounts cleanly as editing starts and ends.
 */
type CellEditor<T = unknown> = (props: CellEditorProps<T>) => ReactNode;
/**
 * Static map of cell-level renderer overrides keyed by
 * `${rowIndex}:${columnIndex}` (0-based grid coordinates). A cell-level
 * renderer wins over the column-level `Column.cellRenderer`, giving the two
 * levels of override the spec calls for (컬럼 단위 / 셀 단위). When the map
 * form is used the library never mutates the object, so a stable reference can
 * be kept across renders for React's referential equality.
 */
type CellRenderersMap = Readonly<Record<string, CellRenderer>>;
/**
 * Function form of `cellRenderers`. Called by the grid at *render* time, once
 * per visible cell, to resolve a per-cell renderer (or `undefined` to fall
 * back to the column-level renderer).
 *
 * **Performance contract** — like {@link CellRenderersMap} this runs once per
 * visible cell per render and the grid does not cache results. Keep it O(1)
 * and return *referentially stable* renderer functions (define them at module
 * scope or memoize them) so the memoized {@link Cell} doesn't re-render when an
 * unrelated parent state changes.
 */
type CellRendererResolver = (rowIndex: number, columnIndex: number) => CellRenderer | undefined;
/**
 * `cellRenderers` prop value — the cell-level (vs. column-level) renderer
 * source. Either a static map or a resolver function. Resolves to `undefined`
 * for cells with no override, which fall back to `Column.cellRenderer`.
 *
 * **Precedence / composition** — a resolved cell-level renderer *replaces* the
 * column-level renderer outright; the two do not compose. Because any renderer
 * also takes over a cell's value display, an overridden cell skips the column's
 * `numberFormat` and any conditional-format decoration produced via
 * `makeConditionalCellRenderer` on `Column.cellRenderer`. If you need to layer
 * on top of those, call the underlying renderer from inside your cell renderer.
 */
type CellRenderers = CellRendererResolver | CellRenderersMap;
declare function cellRendererKey(rowIndex: number, columnIndex: number): string;
/**
 * Resolve the cell-level renderer for a coordinate, normalising the map and
 * function forms to a single `CellRenderer | undefined` result.
 */
declare function resolveCellRenderer(cellRenderers: CellRenderers | undefined, rowIndex: number, columnIndex: number): CellRenderer | undefined;

/**
 * Validation verdict returned by `Column.validate`. `true` = valid, `false` =
 * invalid (no message), or a non-empty string carrying a human-readable
 * reason. Empty-string is reserved (treat as valid) so callers can keep their
 * validate fns trivially returning the failure message or `''`.
 */
type ColumnValidationResult = boolean | string;
/**
 * Binds a column to a named value list (spec §2.3 드롭다운 목록). The active
 * cell of a list column renders a ▼ picker; choosing an option writes its
 * value through the normal `onCellChange` pipeline.
 */
interface ColumnValidation {
    /**
     * Key into `XlReactProps.validationLists`. When it resolves to a non-empty
     * list (and editing is enabled), the column's cells become list cells.
     */
    listKey: string;
    /**
     * When true, a non-empty cell value that is NOT one of the list's options
     * paints the "invalid" style (master-reference validation, §2.4). Defaults
     * to false — the list is a convenience picker that still permits free text.
     * Empty values are governed by `required`, not this flag.
     */
    strict?: boolean;
}
interface Column<T = unknown> {
    id: string;
    accessor: (row: Row) => T;
    /**
     * Light hint that drives the default editor's input filtering and validity
     * styling. `'number'` rejects non-numeric keystrokes during edit. Defaults
     * to `'text'`.
     */
    dataType?: 'text' | 'number';
    /**
     * When true, the cell paints an "invalid" style if the accessor returns an
     * empty value: `null`, `undefined`, `''`, or `NaN` (which a number column
     * can land on via failed parsing). `0` and `false` are NOT considered
     * empty — they are valid Excel-y values. Pure visual cue; never blocks
     * commit. `required` is checked *before* `validate` and short-circuits
     * when the value is empty — a custom validator cannot suppress the
     * required check.
     */
    required?: boolean;
    /**
     * Optional per-value validator. Runs against the current cell value (not
     * the edit draft) to drive the cell's invalid styling. Receives the row so
     * cross-column rules (e.g. "qty ≤ row.capacity") can validate against
     * siblings. Independent of `required`; both are unioned (cell is invalid
     * if either flags it).
     */
    validate?: (value: T, row: Row) => ColumnValidationResult;
    /**
     * Opts this column into the data-validation list picker (spec §2.3). The
     * referenced list is supplied via `XlReactProps.validationLists`; the active
     * cell shows a ▼ dropdown (also openable with Alt+↓ / F2 / double-click).
     */
    validation?: ColumnValidation;
    /**
     * Column-level display renderer. Replaces the default value-to-text
     * rendering for every cell in the column. A per-cell override supplied via
     * `XlReactProps.cellRenderers` takes precedence over this. The renderer
     * receives the cell value, row, column, and 0-based coordinates.
     */
    cellRenderer?: CellRenderer<T>;
    /**
     * Column-level custom editor (Editor Renderer). When set, entering
     * edit mode on a cell in this column renders this component over the cell
     * rectangle instead of the built-in text input. It receives the current
     * value plus `onCommit(next, nav?)` / `onCancel()` and owns its own keyboard
     * and focus. Display (`cellRenderer`) and edit (`cellEditor`) are independent.
     *
     * Two behaviours to wire deliberately:
     * - **Commit-on-blur is opt-in.** Unlike the built-in input, the grid can't
     *   read a custom editor's draft, so it *cancels* the edit when the user
     *   clicks another cell. For Excel-style save-on-click-away, call `onCommit`
     *   from your editor's own blur handler.
     * - **A bound `validation` list wins.** If the column also sets `validation`,
     *   double-click / F2 opens the list picker, not this editor.
     */
    cellEditor?: CellEditor<T>;
    /**
     * Initial column width in pixels. Overrides the grid's `columnWidth`
     * default for this column. User drag-resize and AutoFit (OUT-7 §6.1)
     * record their own per-id overrides on top of this initial value.
     */
    width?: number;
    /**
     * Marks every cell in this column as protected (OUT-18). Equivalent to
     * returning `true` from `XlReactProps.cellProtection` for every row in this
     * column; the two sources are unioned so either can elevate a cell to
     * read-only. Protected cells block typing / Delete / Backspace, paste,
     * fill (Ctrl+D / R / Enter and the fill-handle), Cut's clear-half, and
     * row/column deletion that would touch them. Formula-driven recomputes
     * coming back through `onCellChange` from the consumer are untouched —
     * the grid only gates user-initiated mutations.
     */
    readOnly?: boolean;
    /**
     * Opts this column into the inline AutoComplete suggestion (§2.3). While
     * editing a cell in this column the grid scans every row's value through
     * `accessor`, builds the unique string pool, and shows the first
     * case-insensitive prefix match as ghost text after the user's draft. Tab
     * or ArrowRight (with the caret at end) accepts the candidate (using its
     * original casing); Esc dismisses the suggestion without leaving edit
     * mode. Off by default — opt in per column. Suppressed automatically once
     * the draft contains a newline (Alt+Enter) since ghost text on a
     * wrapped/multiline draft is out of scope.
     */
    autoComplete?: boolean;
}
/**
 * Heterogeneous column array element. Consumers pass `AnyColumn[]` to <XlReact>
 * because Column<T> is invariant in T (T appears in both covariant accessor
 * return and contravariant cellRenderer/cellEditor input positions). Define
 * individual columns with the generic `Column<MyType>` for full type safety;
 * the array then widens to `AnyColumn[]` at the prop boundary.
 */
type AnyColumn = Column<any>;

/**
 * Cell visual format model. The grid is consumer-controlled:
 * it owns no format state. Consumers describe how each cell should look via the
 * `cellFormats` prop (function or map, mirroring `cellAnnotations`), and the
 * grid resolves + paints the result at render time.
 *
 * The model bundles the four "appearance" pillars — font, alignment, fill,
 * border — plus a reserved `numberFormat` slot. This paint path covers
 * font/alignment/fill/border; `numberFormat` is metadata only here and this
 * module does not render value transformations.
 */
type CellHorizontalAlign = 'left' | 'center' | 'right' | 'justify' | 'distributed';
type CellVerticalAlign = 'top' | 'middle' | 'bottom' | 'distributed';
/**
 * Border line style. Maps to a CSS `border-style` (solid / dashed / dotted /
 * double); `thick` is a heavier solid line (Excel's "굵은 선").
 */
type CellBorderLineStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'thick';
interface CellBorderSide {
    /** Line style. Defaults to `'solid'` when the side is present but unset. */
    style?: CellBorderLineStyle;
    /** CSS color (HEX / rgb()/ named). Defaults to the grid's border color. */
    color?: string;
    /** Explicit line width in px (base / zoom-invariant). Overrides the
     *  style-derived default (1px, or 2px for `'thick'`). */
    width?: number;
}
/** Per-side borders. Omitted sides keep the grid's default gridline. */
interface CellBorder {
    top?: CellBorderSide;
    right?: CellBorderSide;
    bottom?: CellBorderSide;
    left?: CellBorderSide;
    /**
     * Diagonal line from the cell's top-left to its bottom-right corner (╲).
     * Unlike the four edge sides, diagonals are purely cell-internal — they are
     * never shared with a neighbor and are painted as an SVG overlay (CSS borders
     * cannot draw diagonals), so non-square cells still get an exact
     * corner-to-corner line.
     */
    diagonalDown?: CellBorderSide;
    /** Diagonal line from the cell's bottom-left to its top-right corner (╱). */
    diagonalUp?: CellBorderSide;
}
interface CellFont {
    /** CSS font-family stack (e.g. `'맑은 고딕, sans-serif'`). */
    family?: string;
    /** Font size in px, BASE / zoom-invariant — the grid multiplies by the
     *  current zoom factor so per-cell sizes scale in step with the sheet. */
    size?: number;
    bold?: boolean;
    italic?: boolean;
    /** `true`/`'single'` → single underline; `'double'` → double underline. */
    underline?: boolean | 'single' | 'double';
    strikethrough?: boolean;
    /** Font color (HEX / rgb() / named). */
    color?: string;
}
interface CellAlign {
    horizontal?: CellHorizontalAlign;
    vertical?: CellVerticalAlign;
    /** Wrap long text onto multiple lines (§7.2 P1). Note: the grid does NOT
     *  auto-expand row height for wrapped text — set `Row.height` for that. */
    wrap?: boolean;
    /** Indent level (§7.2 P1). Each level adds a fixed left inset when the cell
     *  is left-aligned (Excel parity). */
    indent?: number;
}
interface CellFill {
    /** Background color (HEX / rgb() / named). Absent / undefined = no fill. */
    backgroundColor?: string;
}
interface CellFormat {
    font?: CellFont;
    align?: CellAlign;
    fill?: CellFill;
    border?: CellBorder;
    /**
     * Number format string or preset. Co-located on the cell format for a single
     * object, but this paint path ignores it.
     */
    numberFormat?: string;
}
/**
 * Static map of cell formats keyed by `${rowIndex}:${columnIndex}` — 0-based
 * grid coordinates (the positions Excel labels A2 / B3 / …). When the map form
 * is used, the library never mutates it; consumers should keep a stable
 * reference (and stable `CellFormat` object identities) across renders so the
 * memoized cell render path can skip untouched cells via reference equality.
 * Sparse maps are expected; missing keys mean "no format".
 */
type CellFormatsMap = Readonly<Partial<Record<string, CellFormat>>>;
/**
 * Function form of `cellFormats`. Called by the grid at *render* time, once per
 * visible cell (every body row × column rendered, plus frozen panes). Returning
 * `null` / `undefined` means "no format on this cell".
 *
 * **Performance contract** — keep this O(1). If the source is heavy, memoize a
 * `CellFormatsMap` via `useMemo` and pass the map form instead. The grid does
 * NOT cache results across renders. Returning a *fresh* object each call is
 * supported (the memoized cell compares formats structurally), but reusing
 * stable object references is cheaper.
 */
type CellFormatResolver = (rowIndex: number, columnIndex: number) => CellFormat | null | undefined;
/**
 * `cellFormats` prop value. Read-only visual formatting attached to specific
 * cells by the consumer. The grid paints the format but never edits the
 * underlying source; on a structural change (merge / split / row or column
 * insert, delete, or reorder) the consumer is expected to update its own
 * format source. Positional maps usually need to shift or prune keys when the
 * coordinate grid changes.
 * `CellFormatToolbar` edits the map form; resolver-backed stores should adapt
 * toolbar changes at the application boundary.
 */
type CellFormats = CellFormatResolver | CellFormatsMap;
declare function cellFormatKey(rowIndex: number, columnIndex: number): string;
/**
 * Resolve the format for a given cell, normalising nullish results to
 * `undefined` so call sites can use a single truthy check. Mirrors
 * `resolveCellAnnotation`.
 */
declare function resolveCellFormat(formats: CellFormats | undefined, rowIndex: number, columnIndex: number): CellFormat | undefined;

/**
 * Selection data model for OUT-2.
 *
 * A selection is an active cell + an anchor cell + a list of inclusive
 * rectangular ranges. The last range is treated as the "current" one and is
 * the target of shift-extend / drag-extend updates; earlier ranges are frozen
 * (committed via Ctrl+click / Ctrl+drag).
 */
interface CellCoord {
    row: number;
    col: number;
}
/** Inclusive rectangular range. May be unnormalized (start > end on either axis). */
interface SelectionRange {
    start: CellCoord;
    end: CellCoord;
}
/** Read-only snapshot exposed via onSelectionChange. */
interface SelectionSnapshot {
    active: CellCoord;
    ranges: ReadonlyArray<SelectionRange>;
}

/**
 * Frozen snapshot of the grid that import/export operates on. Consumers
 * assemble this from their own state; the helpers never read state from the
 * grid component.
 */
interface GridSnapshot {
    rows: ReadonlyArray<Row>;
    columns: ReadonlyArray<AnyColumn>;
    cellFormats?: CellFormatsMap;
    merges?: ReadonlyArray<SelectionRange>;
}
/** Subset of rows / columns to write. */
type ExportRange = 'all' | {
    rows: ReadonlyArray<number>;
} | ReadonlyArray<SelectionRange>;
interface ExportOptions {
    /** Sheet tab name; defaults to `'Sheet1'`. */
    sheetName?: string;
    /**
     * Prepend a synthetic header row carrying the column ids. Useful when the
     * grid itself has no header row. Defaults to `false` — most consumers
     * already include a caption row at `rows[0]`, and inserting another would
     * produce two header rows in the exported file.
     */
    includeHeader?: boolean;
    /**
     * Apply the bold + filled + centered "header style" to the first xlsx row
     * (whether that's the consumer's `rows[0]` or the auto-inserted header row
     * when `includeHeader === true`). A consumer cellFormat at row 0 still wins
     * field-by-field. Defaults to `true`.
     */
    headerStyle?: boolean;
    /**
     * Freeze the first row in the exported sheet's view (sticky header on
     * scroll). Defaults to `true`.
     */
    freezeHeader?: boolean;
    /** Which rows / ranges to write. Defaults to `'all'`. */
    range?: ExportRange;
    /** Restrict output to these column ids in order. Defaults to all columns. */
    columnIds?: ReadonlyArray<string>;
    /** Carry CellFormat → xlsx style. Defaults to `true`. */
    preserveFormat?: boolean;
}
interface ImportOptions {
    /** Sheet tab name; defaults to the first sheet in the workbook. */
    sheetName?: string;
    /**
     * 1-based row that carries column headers, used to derive `Column.id` for
     * each output column. The header row itself is **kept** in `rows` by default
     * — Excel-faithful behaviour, the visible grid mirrors the source workbook.
     * Set `headerRow: null` to skip header parsing (columns become A/B/C/…).
     * Defaults to `1`.
     */
    headerRow?: number | null;
    /**
     * Drop the header row from the returned `rows` (the classic
     * "headers are metadata, not data" model). Defaults to `false`; the demo
     * keeps it true for a lossless round-trip.
     */
    dropHeaderRow?: boolean;
    /**
     * Map an excel header label → system column id. Headers not in the map keep
     * their slugged label as the id.
     */
    columnMapping?: Readonly<Record<string, string>>;
    /** Carry xlsx style → CellFormat. Defaults to `true`. */
    preserveFormat?: boolean;
    /**
     * Reject the file before parsing when its byte length exceeds this limit.
     * Defaults to `DEFAULT_MAX_IMPORT_SIZE_BYTES` (50 MB) — large enough for
     * realistic spreadsheets, small enough to keep a single tab from blowing up
     * the browser on a malicious / accidental upload. Set `0` to disable.
     */
    maxFileSizeBytes?: number;
}
/** Default file-size cap for `importFromXlsx` — 50 MB. */
declare const DEFAULT_MAX_IMPORT_SIZE_BYTES: number;
type ImportWarningKind = 'empty-sheet' | 'sheet-not-found' | 'merge-skipped' | 'unknown-cell-type' | 'header-missing' | 'duplicate-header' | 'cell-error';
interface ImportWarning {
    kind: ImportWarningKind;
    message: string;
}
interface ImportResult {
    rows: Row[];
    columns: AnyColumn[];
    cellFormats: CellFormatsMap;
    merges: SelectionRange[];
    /** All sheets present in the source workbook, in tab order. */
    sheetNames: ReadonlyArray<string>;
    warnings: ReadonlyArray<ImportWarning>;
    /**
     * Raw header label for each column (by position). Empty string when there
     * was no header text. The `ImportDialog` uses these to render the column
     * mapping UI; programmatic callers can use them to feed `columnMapping`.
     */
    headerLabels: ReadonlyArray<string>;
}
interface CsvOptions {
    /** Field delimiter; defaults to `','`. */
    delimiter?: ',' | '\t' | ';' | '|';
    /** Line terminator on export. Defaults to `'\n'`. */
    newline?: '\n' | '\r\n';
    /** Emit a UTF-8 BOM so Excel opens the file in the correct codepage. */
    bom?: boolean;
    /** Treat the first row as a header (export: bold-omitted, import: column ids). */
    includeHeader?: boolean;
    /**
     * Map a source CSV header label → system column id. Headers not in the map
     * keep their slugged label as the id. Mirrors `ImportOptions.columnMapping`.
     */
    columnMapping?: Readonly<Record<string, string>>;
}
/** One sheet entry for `exportMultiSheetXlsx`. */
interface MultiSheetEntry extends ExportOptions {
    snapshot: GridSnapshot;
}

export { type AnyColumn as A, type ExportRange as B, type CellFormat as C, DEFAULT_MAX_IMPORT_SIZE_BYTES as D, type ExportOptions as E, type ImportWarning as F, type GridSnapshot as G, type ImportWarningKind as H, type ImportOptions as I, cellFormatKey as J, cellRendererKey as K, resolveCellFormat as L, type MultiSheetEntry as M, resolveCellRenderer as N, type SelectionRange as S, type ImportResult as a, type CellCoord as b, type CellAlign as c, type CellBorderSide as d, type CellFill as e, type CellFont as f, type CellFormatsMap as g, type SelectionSnapshot as h, type CellFormats as i, type CellRenderers as j, type CellRendererProps as k, type CsvOptions as l, type CellBorder as m, type CellBorderLineStyle as n, type CellEditCommitNav as o, type CellEditor as p, type CellEditorProps as q, type CellFormatResolver as r, type CellHorizontalAlign as s, type CellRenderer as t, type CellRendererResolver as u, type CellRenderersMap as v, type CellVerticalAlign as w, type Column as x, type ColumnValidation as y, type ColumnValidationResult as z };

import * as react_jsx_runtime from 'react/jsx-runtime';
import { R as Row } from './Row-CO-gLrwi.js';
import { b as CellCoord, S as SelectionRange, c as CellAlign, d as CellBorderSide, e as CellFill, f as CellFont, C as CellFormat, g as CellFormatsMap, A as AnyColumn, h as SelectionSnapshot, i as CellFormats, j as CellRenderers, k as CellRendererProps, G as GridSnapshot, l as CsvOptions, a as ImportResult, M as MultiSheetEntry, E as ExportOptions, I as ImportOptions } from './types-Bi0L8kwK.js';
export { m as CellBorder, n as CellBorderLineStyle, o as CellEditCommitNav, p as CellEditor, q as CellEditorProps, r as CellFormatResolver, s as CellHorizontalAlign, t as CellRenderer, u as CellRendererResolver, v as CellRenderersMap, w as CellVerticalAlign, x as Column, y as ColumnValidation, z as ColumnValidationResult, D as DEFAULT_MAX_IMPORT_SIZE_BYTES, B as ExportRange, F as ImportWarning, H as ImportWarningKind, J as cellFormatKey, K as cellRendererKey, L as resolveCellFormat, N as resolveCellRenderer } from './types-Bi0L8kwK.js';
import { ReactElement, ReactNode, CSSProperties, RefObject } from 'react';
import { P as PivotAggregationKind, a as PivotConfig, b as PivotResult, c as PivotLayoutOptions, d as PivotAvailableField } from './pivot-presets-Cd4PBMr1.js';
export { D as DEFAULT_PIVOT_LAYOUT, E as EMPTY_PIVOT_CONFIG, e as PIVOT_AGGREGATION_LABELS, f as PIVOT_DATE_UNIT_LABELS, g as PIVOT_REPORT_LAYOUT_LABELS, h as PIVOT_SORT_MODE_LABELS, i as PIVOT_SUBTOTAL_POSITION_LABELS, j as PIVOT_VALUE_DISPLAY_LABELS, k as PivotAreaName, l as PivotDateGroupUnit, m as PivotField, n as PivotFieldGrouping, o as PivotFieldSort, p as PivotFilterField, q as PivotGroupedValue, r as PivotHeaderCell, s as PivotLabelFilter, t as PivotNumberBin, u as PivotPreset, v as PivotReportLayout, w as PivotRowSubtotal, x as PivotSortMode, y as PivotSubtotalPosition, z as PivotValueDisplay, A as PivotValueField, B as PivotValueFilter, C as PivotValueHeaderCell, W as WIRING_PIVOT_PRESETS, F as WIRING_PIVOT_PRESET_BY_ID, G as WIRING_PRESET_FIELDS, H as WiringPivotPreset, I as WiringPivotPresetId, J as WiringShipmentData, K as buildWiringShipmentDataset, L as isPivotGroupedValue } from './pivot-presets-Cd4PBMr1.js';

/**
 * Static map of cell annotations keyed by `${rowIndex}:${columnIndex}` —
 * `${rowIndex}` and `${columnIndex}` are 0-based grid coordinates (the
 * positions Excel labels A2 / B3 / …). When the map form is used, the
 * library never mutates the object; consumers can keep a stable reference
 * across renders for React's referential equality.
 */
type CellAnnotationsMap = Readonly<Record<string, string>>;
/**
 * Function form of `cellAnnotations`. Called by the grid at *render* time to
 * decide whether each visible cell shows the indicator triangle, AND at
 * hover time to resolve the tooltip text. Returning `null`, `undefined`, or
 * `''` means "no annotation on this cell".
 *
 * **Performance contract** — the grid calls this function once per visible
 * cell per render (every body row × column rendered, plus frozen panes), so
 * keep it O(1). If the source is heavy (DB lookup, computed property),
 * materialize it into a `CellAnnotationsMap` via `useMemo` first and pass
 * the map form. The grid does NOT cache results across renders. Pass a
 * referentially stable function (e.g. via `useCallback`) so memoized cells
 * don't re-render when an unrelated parent state changes.
 */
type CellAnnotationResolver = (rowIndex: number, columnIndex: number) => string | null | undefined;
/**
 * `cellAnnotations` prop value. Read-only metadata attached to specific cells
 * by the consumer (per OUT-15) — the grid renders the annotation indicator
 * and exposes the text via tooltip but never edits the underlying source.
 *
 * When the consumer triggers a structural change (cell merge / split / row
 * delete / column delete), the consumer is expected to drop the corresponding
 * entries from its own annotation source. The grid retains no annotation
 * state of its own, so re-rendering with the updated `cellAnnotations` value
 * is enough to clear the indicator.
 */
type CellAnnotations = CellAnnotationResolver | CellAnnotationsMap;
declare function cellAnnotationKey(rowIndex: number, columnIndex: number): string;
/**
 * Resolve the annotation string for a given cell, normalising empty / nullish
 * results to `undefined` so call sites can use a single truthy check.
 */
declare function resolveCellAnnotation(annotations: CellAnnotations | undefined, rowIndex: number, columnIndex: number): string | undefined;

/**
 * Editing data model.
 *
 * The grid stays controlled: the active cell can transition into an "editing"
 * status while the user types, then commits by emitting an onCellChange
 * callback. The consumer owns the row data and applies the change.
 *
 * `mode` controls how the editor's initial draft is seeded:
 *   - 'edit'      — F2 / double-click. Draft = current accessor value, full select.
 *   - 'overwrite' — Printable key. Draft = the typed char, no selection.
 *   - 'clear'     — Backspace. Draft = '', no current value preserved.
 */

interface CellChange {
    coord: CellCoord;
    columnId: string;
    prevValue: unknown;
    nextValue: unknown;
}
/**
 * Payload for `onCellsClear` (Delete on a selection). Carries the cleared
 * ranges *clamped to grid bounds* rather than a flat cell list — expanding to
 * cells eagerly would allocate O(rows × cols) coordinate objects per Ctrl+A +
 * Delete on a large sheet. Consumers iterate the rectangular ranges directly.
 */
interface CellsClearPayload {
    ranges: ReadonlyArray<SelectionRange>;
}

/**
 * Right-click context menu data model (OUT-7 §6.2 + §6.3).
 *
 * The grid stays controlled: the menu fires a typed intent and the consumer
 * owns the row / column collections. Payloads carry both id and index so
 * consumers can splice their arrays without re-running their own index
 * lookup.
 */

interface RowsInsertPayload {
    /** Row index of the right-clicked target. */
    atIndex: number;
    position: 'above' | 'below';
    count: number;
}
interface RowsDeletePayload {
    rowIds: ReadonlyArray<Row['id']>;
    rowIndices: ReadonlyArray<number>;
}
interface ColumnsInsertPayload {
    atIndex: number;
    position: 'left' | 'right';
    count: number;
}
interface ColumnsDeletePayload {
    columnIds: ReadonlyArray<string>;
    columnIndices: ReadonlyArray<number>;
}
/**
 * Header drag-reorder (OUT-7 §6.3 P1). `targetIndex` is the destination
 * position in the RESULTING array — i.e. the consumer applies it as
 * `splice(targetIndex, 0, ...moved)` after removing `rowIndices` from
 * the source. For a contiguous block of size N moved forward, the
 * payload's `targetIndex` accounts for the removal (it's the post-removal
 * index), so the consumer doesn't have to recompute.
 */
interface RowsReorderPayload {
    rowIds: ReadonlyArray<Row['id']>;
    rowIndices: ReadonlyArray<number>;
    targetIndex: number;
}
interface ColumnsReorderPayload {
    columnIds: ReadonlyArray<string>;
    columnIndices: ReadonlyArray<number>;
    targetIndex: number;
}
/**
 * Clipboard / paste-special callbacks (§16). Each payload carries the active
 * selection ranges so the consumer can iterate without re-deriving them.
 */
interface ClipboardCopyPayload {
    ranges: ReadonlyArray<{
        start: CellCoord;
        end: CellCoord;
    }>;
    text: string;
}
interface PasteRequestPayload {
    coord: CellCoord;
    ranges: ReadonlyArray<{
        start: CellCoord;
        end: CellCoord;
    }>;
}
interface PasteSpecialRequestPayload {
    coord: CellCoord;
}
interface SortColumnPayload {
    columnId: string;
    columnIndex: number;
}
interface FilterByValuePayload {
    coord: CellCoord;
    /** Raw value at `coord` as returned by the column's accessor. */
    value: unknown;
}
interface CellFormatRequestPayload {
    coord: CellCoord;
}
interface CellAddressActionPayload {
    coord: CellCoord;
}

/**
 * Sort direction for a single column. Excel-style: 'asc' = A→Z / 1→9,
 * 'desc' = Z→A / 9→1.
 */
type SortDirection = 'asc' | 'desc';
/**
 * One key in a multi-column sort. The library emits an ordered list of these
 * via `onSortStateChange`; the consumer applies them in order (the first entry
 * is the primary key).
 */
interface SortColumnEntry {
    columnId: string;
    direction: SortDirection;
}
/** Ordered list of sort keys. Empty array = no sort. */
type SortState = ReadonlyArray<SortColumnEntry>;
/**
 * Per-column value filter. `selectedValues` is the set of canonical-string
 * forms (see `valueToFilterKey`) of accessor values that should remain
 * visible. A missing entry in `FilterState` (or one with `selectedValues`
 * covering every unique value) means no filter on that column.
 *
 * Canonicalisation is "what the user sees in the dropdown": numbers via
 * `String(n)`, strings as-is, `null`/`undefined`/`''`/`NaN` → the blank
 * sentinel. This avoids `Set<unknown>` reference-identity pitfalls and lets
 * consumers serialize filter state trivially.
 */
interface ColumnValueFilter {
    selectedValues: ReadonlySet<string>;
}
/**
 * Map of columnId → ColumnValueFilter. Missing entries pass through
 * (no filter on that column).
 *
 * Sparse-by-design: when the user selects every option in the dropdown
 * panel, the library DELETES that column's entry rather than persisting
 * "all values selected" — the two states are equivalent (every row
 * passes), and the sparse form keeps serialized FilterState small and
 * lets consumers cheaply test whether a column is filtered via
 * `state[columnId] !== undefined`. Programmatic constructors should mirror
 * this: never write an entry whose `selectedValues` covers every option.
 */
type FilterState = Readonly<Record<string, ColumnValueFilter>>;
/** Sentinel used for null/undefined/empty/NaN values in the filter dropdown. */
declare const BLANK_FILTER_KEY = "__xl_react_blank__";

/**
 * Canonicalise a raw accessor value to its filter key. `null`, `undefined`,
 * empty string, and `NaN` all collapse to a single "blank" bucket so the
 * dropdown shows them as one "(Blanks)" entry.
 */
declare function valueToFilterKey(value: unknown): string;

/**
 * Predicate that returns `true` for cells the user must not be allowed to
 * mutate (OUT-18). Receives 0-based grid indices, NOT row IDs / column IDs —
 * the cell-protection contract is positional so a consumer that wants id-
 * keyed protection should derive the predicate from a (row, col) → row/col
 * mapping at call time. Result must be stable for a given (row, col) within
 * one render; the grid memoises lookups inside hot paths (paste/fill).
 *
 * Combined with `Column.readOnly` via a union: a cell is protected when
 * `cellProtection(row, col) === true` OR `columns[col].readOnly === true`.
 */
type CellProtectionPredicate = (rowIndex: number, columnIndex: number) => boolean;
/**
 * Categories of user-initiated mutations the protection layer can block.
 * Surfaced to consumers through `XlReactProps.onProtectedAction` so a host
 * UI can render an Excel-style "this cell is protected" banner. Each kind
 * maps 1-to-1 to a grid surface:
 *   - `edit`         — F2 / double-click / type-to-overwrite / Backspace clear
 *   - `clear`        — Delete on a non-empty selection
 *   - `paste`        — Ctrl+V / native paste / right-click Paste
 *   - `fill`         — fill-handle drag, Ctrl+D, Ctrl+R, Ctrl+Enter
 *   - `cut`          — Ctrl+X clear-half (Cut leaves the source on the
 *                      clipboard but tries to wipe it; we skip protected
 *                      cells in that wipe)
 *   - `move`         — Shift+drag move of a range whose source or target
 *                      includes at least one protected cell
 *   - `replace`      — Find & Replace (§9) write that would land on a
 *                      protected cell (single Replace or Replace All)
 *   - `rowDelete`    — right-click "Delete row(s)" that would remove a row
 *                      containing at least one protected cell
 *   - `columnDelete` — right-click "Delete column(s)" idem
 */
type ProtectedAction = 'edit' | 'clear' | 'paste' | 'fill' | 'cut' | 'move' | 'replace' | 'rowDelete' | 'columnDelete';
/**
 * Notifier payload fired when the grid drops a user action because it
 * targeted protected cells. The grid still applies the action to the
 * unprotected parts of the same gesture (a paste covering a 5×5 with one
 * protected cell still writes the other 24 cells); `coords` captures only
 * the cells that were skipped, and is always non-empty when this notifier
 * fires — the grid suppresses the call entirely when there is nothing to
 * report. For single-cell surfaces (e.g. F2 on a protected active cell)
 * `coords` is a one-element array carrying that cell.
 */
interface ProtectedActionInfo {
    action: ProtectedAction;
    coords: ReadonlyArray<CellCoord>;
}

type NullablePatch<T extends object> = {
    [K in keyof T]?: T[K] | null;
};
type CellFontPatch = NullablePatch<CellFont>;
type CellAlignPatch = NullablePatch<CellAlign>;
type CellFillPatch = NullablePatch<CellFill>;
type CellBorderSidePatch = NullablePatch<CellBorderSide>;
interface CellBorderPatch {
    top?: CellBorderSidePatch | null;
    right?: CellBorderSidePatch | null;
    bottom?: CellBorderSidePatch | null;
    left?: CellBorderSidePatch | null;
    diagonalDown?: CellBorderSidePatch | null;
    diagonalUp?: CellBorderSidePatch | null;
}
interface CellFormatPatch {
    font?: CellFontPatch | null;
    align?: CellAlignPatch | null;
    fill?: CellFillPatch | null;
    border?: CellBorderPatch | null;
    numberFormat?: string | null;
}
type CellFormatPatchResolver = (current: CellFormat | undefined, coord: CellCoord) => CellFormatPatch | null | undefined;
type CellBorderPlacement = 'outline' | 'all' | 'top' | 'right' | 'bottom' | 'left' | 'none' | 'diagonal-down' | 'diagonal-up';
declare const BORDER_SIDES: readonly ["top", "right", "bottom", "left"];
type BorderSideName = (typeof BORDER_SIDES)[number];
/** A single logical edge of one cell — the unit the border-draw pencil paints. */
interface CellBorderEdge {
    row: number;
    col: number;
    side: BorderSideName;
}
/**
 * Apply a controlled cell-format patch across one or more inclusive selection
 * ranges. The input map is never mutated; cells whose format becomes empty are
 * removed from the returned sparse map.
 */
declare function applyCellFormatPatch(formats: CellFormatsMap | undefined, ranges: ReadonlyArray<SelectionRange>, patchOrResolver: CellFormatPatch | CellFormatPatchResolver): CellFormatsMap;
/**
 * Apply Excel-style border commands to selected ranges.
 *
 * `outline`, `top`, `right`, `bottom`, and `left` target the selected range's
 * outer rectangle, not every cell in the range. `all` targets every logical
 * gridline inside the range. Shared edges are written to one owning cell and
 * the opposite side is cleared, so adjacent cells do not double-paint seams.
 */
declare function applyCellBorderPatch(formats: CellFormatsMap | undefined, ranges: ReadonlyArray<SelectionRange>, placement: CellBorderPlacement, side: CellBorderSidePatch): CellFormatsMap;
/**
 * Draw or erase a batch of individual cell edges — the write primitive behind
 * the Excel-style "Draw Border" / "Erase Border" pencil (spec §7.4 P2). Pass a
 * `side` to draw each edge with that style/color, or `null` to erase. Edge
 * ownership and the matching neighbor-seam clear are handled exactly as in the
 * range-based border commands, so a pencil stroke never double-paints a shared
 * gridline. The input map is never mutated.
 */
declare function applyCellBorderEdges(formats: CellFormatsMap | undefined, edges: ReadonlyArray<CellBorderEdge>, side: CellBorderSidePatch | null): CellFormatsMap;

/**
 * Excel-style "Draw Border" pencil tools (spec §7.4 P2):
 *   - `draw`  — paint the single cell edge nearest the cursor.
 *   - `grid`  — paint all four edges of the cell under the cursor.
 *   - `erase` — clear the single cell edge nearest the cursor.
 */
type BorderDrawTool = 'draw' | 'grid' | 'erase';

/**
 * Data-validation list model (spec §2.3 드롭다운 목록 / §2.4 데이터 검증).
 *
 * A column opts into the list picker via `Column.validation.listKey`, which
 * names an entry in {@link ValidationLists} passed to `<XlReact validationLists>`.
 * The list is consumer-owned data — the grid only reads it to render the
 * dropdown and (optionally) flag out-of-list values.
 */
/**
 * One option in a validation list. The bare-string form is sugar for
 * `{ value, label: value }`; use the object form when the stored cell value
 * differs from the human-readable label (e.g. a port code vs. its name).
 */
interface ValidationListOption {
    /** The value written to the cell when this option is picked. */
    value: string;
    /** Display label in the dropdown. Defaults to {@link value} when omitted. */
    label?: string;
}
/** A single list entry: shorthand string or an explicit value/label option. */
type ValidationListItem = string | ValidationListOption;
/** An ordered list of selectable options. */
type ValidationList = ReadonlyArray<ValidationListItem>;
/**
 * Named registry of validation lists, keyed by `listKey`. Pass to
 * `<XlReact validationLists={...} />`; columns reference a key via
 * `Column.validation.listKey`.
 */
type ValidationLists = Readonly<Record<string, ValidationList>>;
/**
 * A normalized option — both `value` and `label` are always present. The
 * dropdown and the pure helpers operate on this resolved shape so callers
 * never re-derive the label.
 */
interface ResolvedValidationOption {
    value: string;
    label: string;
}

/**
 * Normalize one list item into `{ value, label }`. Bare strings become
 * `{ value: s, label: s }`; an object's missing/empty label falls back to its
 * value so the dropdown always has something to show.
 */
declare function normalizeOption(item: ValidationListItem): ResolvedValidationOption;
/** Normalize a whole list. Pure; allocates a fresh array. */
declare function normalizeList(list: ValidationList): ResolvedValidationOption[];
/**
 * Resolve a column's bound validation list to normalized options, or `null`
 * when the column has no `validation.listKey`, the key is missing from
 * `validationLists`, or the resolved list is empty. A `null` result means
 * "this is not a list cell" — callers skip all dropdown machinery.
 */
declare function resolveColumnList(column: AnyColumn | undefined, validationLists: ValidationLists | undefined): ResolvedValidationOption[] | null;
/**
 * Case-insensitive substring filter over option labels AND values, so a user
 * can search by either the visible text or the stored code. An empty/blank
 * query returns the list unchanged (same reference).
 */
declare function filterOptions(options: ReadonlyArray<ResolvedValidationOption>, query: string): ReadonlyArray<ResolvedValidationOption>;
/**
 * True when `value` (stringified) matches an option's value. Used by strict
 * validation to flag out-of-list cells. Nullish / empty values are reported as
 * "in list" here — emptiness is `required`'s concern, not the list's.
 */
declare function isValueInList(value: unknown, options: ReadonlyArray<ResolvedValidationOption>): boolean;

interface ValidationDropdownProps {
    /** Normalized options to choose from (already resolved from the registry). */
    options: ReadonlyArray<ResolvedValidationOption>;
    /** Current cell value, used to pre-highlight the matching option on open. */
    currentValue: unknown;
    /**
     * Pixel rect of the anchoring cell, in the same coordinate space the editor
     * uses. The panel drops directly under the cell (`top + height`) and is at
     * least as wide as the cell.
     */
    anchor: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    /** Show the search box. Auto-enabled by the grid for long lists. */
    searchable?: boolean;
    /** Placeholder for the search input. */
    searchPlaceholder?: string;
    /** Shown when the (possibly filtered) list is empty. */
    emptyLabel?: string;
    onSelect: (value: string) => void;
    onClose: () => void;
}
/**
 * Data-validation list picker (spec §2.3). A popover anchored under the active
 * cell: optional search box, a scrollable option list with keyboard navigation
 * (↑/↓ to move, Enter to pick, Esc to close), click-to-pick, and
 * outside-click-to-close. Dismissal mirrors `FilterPanel` (document-capture
 * listeners) so it composes with the grid's own key handling.
 */
declare function ValidationDropdown({ options, currentValue, anchor, searchable, searchPlaceholder, emptyLabel, onSelect, onClose, }: ValidationDropdownProps): ReactElement;

/** Stable identifier for a row in the outline (mirrors `Row['id']`). */
type RowId = Row['id'];
/**
 * §6.4 — per-visible-row outline metadata produced by {@link computeRowOutline}.
 * Drives the first data cell's `level * indentPx` indent and the +/- disclosure
 * widget rendered by the grid.
 */
interface RowOutlineCell {
    /** 0-based outline depth (matches `Row.level` for this row). */
    level: number;
    /** `true` when at least one descendant exists in the source rows. */
    hasChildren: boolean;
    /** `true` when this row's direct children are currently hidden. */
    collapsed: boolean;
}
/**
 * Per-row outline array — one entry per *visible* row, in the same order the
 * visible rows are passed to {@link XlReactProps.rows}. A `null` entry means
 * "no outline metadata for this row" (top-level leaf with no siblings worth
 * indenting); the grid renders such rows with no indent and no disclosure.
 */
type RowOutline = ReadonlyArray<RowOutlineCell | null>;
/**
 * §6.4 — pre-computed parent/child structure of the source row array.
 * Returned by {@link buildRowTree}; consumed internally by
 * {@link computeRowOutline} and {@link collectRowDescendantIds}.
 *
 * Trees may be constructed from either explicit `Row.parentId` references or
 * inferred from runs of `Row.level` (the nearest preceding row with
 * `level === thisLevel - 1` is the parent). Mixing the two is allowed —
 * `parentId` wins per-row whenever set.
 */
interface RowTree {
    /** Children by parent id. The `null` key holds root-level rows. */
    childrenByParent: ReadonlyMap<RowId | null, ReadonlyArray<RowId>>;
    /** Parent id for each row (or `null` for roots). */
    parentById: ReadonlyMap<RowId, RowId | null>;
    /** Resolved depth for each row (0 = root). */
    levelById: ReadonlyMap<RowId, number>;
    /** Convenience lookup from id → source array index. */
    indexById: ReadonlyMap<RowId, number>;
}

/**
 * §6.4 — build the parent/child structure of a source row array.
 *
 * Resolution order per row:
 *   1. If `Row.parentId` is set (non-`null`) **and** points at an earlier row,
 *      that row is the parent. Forward references / unknown parents fall
 *      through to step 2 (treated as `parentId` was omitted).
 *   2. If `Row.level > 0`, the nearest preceding row with `level === thisLevel
 *      − 1` is the parent. Pre-order rows therefore do not need explicit
 *      `parentId`.
 *   3. Otherwise the row is a root (`parentById.get(id) === null`).
 *
 * Levels are taken from `Row.level` when set, otherwise derived from the
 * parent chain (`null` parent → 0, else `parent.level + 1`).
 *
 * Rows with duplicate `id` values keep the **first occurrence** — later
 * duplicates are silently skipped (a `console.warn` is emitted in dev). This
 * keeps `parentById` acyclic so the downstream ancestor walks cannot loop.
 *
 * The returned maps are referentially independent of the input and safe to
 * cache by `rows` identity in a `useMemo`.
 */
declare function buildRowTree(rows: ReadonlyArray<Row>): RowTree;
/**
 * §6.4 — recursively collect every descendant id of `rowId` from the source
 * array. Returns an empty set when `rowId` is unknown or is a leaf.
 *
 * Useful when the consumer wants to expand-all / collapse-subtree in one
 * step. The tree can be passed in pre-built (avoid rebuilding per click) or
 * derived from `rows` on the fly.
 */
declare function collectRowDescendantIds(rows: ReadonlyArray<Row>, rowId: RowId, tree?: RowTree): Set<RowId>;
/**
 * §6.4 — derive the visible row slice + matching outline metadata for a
 * source row array under a collapse state.
 *
 * A row is hidden when **any** ancestor's id is in `collapsedIds`. The
 * returned `outline[i]` describes `visibleRows[i]`:
 *   - `level` mirrors the row's tree depth (0 = root).
 *   - `hasChildren` is `true` when at least one direct child exists in the
 *     source rows, regardless of whether the children are currently visible.
 *   - `collapsed` is `true` when this row's own id is in `collapsedIds`
 *     **and** it has children (no point flagging leaves).
 *
 * Walks the source array **once** (O(N)). Tree depth does not enter the cost,
 * because the visibility test uses a "shallowest active collapse barrier"
 * counter that's cleared as soon as we exit the collapsed subtree. This
 * relies on the source array being in pre-order, the same precondition
 * `buildRowTree` already uses for level inference.
 *
 * Pass the result straight to `<XlReact rows={visibleRows} rowOutline={outline} />`.
 */
declare function computeRowOutline(rows: ReadonlyArray<Row>, collapsedIds: ReadonlySet<RowId>, tree?: RowTree): {
    visibleRows: Row[];
    outline: RowOutline;
};
/**
 * §6.4 — pure toggle helper. Returns a new `Set<RowId>` with `rowId`
 * removed when it was present and added when it wasn't. Use as a reducer
 * step when handling the grid's `onRowOutlineToggle` callback.
 */
declare function toggleRowCollapse(collapsedIds: ReadonlySet<RowId>, rowId: RowId): Set<RowId>;
/**
 * §6.4 — seed a `collapsedIds` set with every row whose depth is in `levels`
 * (and that actually has children — leaves are skipped). Mirrors the PRD's
 * `defaultCollapsedLevels` initialization helper.
 */
declare function collapseAtLevels(rows: ReadonlyArray<Row>, levels: ReadonlyArray<number>, tree?: RowTree): Set<RowId>;

interface XlReactProps {
    columns: AnyColumn[];
    rows: Row[];
    rowHeight?: number;
    columnWidth?: number;
    overscan?: number;
    className?: string;
    /**
     * Fired whenever the user-visible selection (active cell or range list)
     * changes. Not fired for the initial mount.
     */
    onSelectionChange?: (selection: SelectionSnapshot) => void;
    /**
     * Notification hook fired on F2 / double-click. Independent of the actual
     * `onCellChange` editing pipeline so consumers that just want a "user
     * wants to edit" signal (telemetry, focus stealing, etc.) don't have to
     * wire the full mutation callback.
     */
    onEditRequest?: (coord: CellCoord) => void;
    /**
     * Fires when the user commits an edit (Enter / Tab / focus loss with a
     * changed draft). Wiring this in turns editing on — without it the grid
     * is implicitly read-only because there's nowhere to send mutations.
     */
    onCellChange?: (change: CellChange) => void;
    /**
     * Fires when Delete is pressed against a non-empty selection. The grid
     * does not own row data; the consumer iterates the cleared coords and
     * applies the clear to their state.
     */
    onCellsClear?: (payload: CellsClearPayload) => void;
    /**
     * Force the grid into a read-only mode that suppresses edit entry even if
     * `onCellChange` is wired. Useful for view-only audits / locked rows.
     */
    readOnly?: boolean;
    /**
     * Pin row 0 to the top during vertical scroll (OUT-7 §6.5). The frozen
     * row stays visible above the body while remaining interactive
     * (selection / editing route to the original coordinate as usual).
     * Equivalent to `freezeRowCount: 1`.
     */
    freezeFirstRow?: boolean;
    /**
     * Pin column 0 to the left during horizontal scroll (OUT-7 §6.5).
     * Equivalent to `freezeColCount: 1`.
     */
    freezeFirstCol?: boolean;
    /**
     * Pin the first N rows to the top (OUT-7 §6.5 P1, N-row freeze). When
     * set, overrides `freezeFirstRow`. The user can also freeze at the
     * active cell via the cell right-click menu ("Freeze panes") — that
     * choice is held in internal state and persists past parent re-renders.
     */
    freezeRowCount?: number;
    /** Pin the first N columns to the left. Overrides `freezeFirstCol`. */
    freezeColCount?: number;
    /**
     * Minimum width a user can drag-resize a column down to. Defaults to 32px.
     */
    minColumnWidth?: number;
    /**
     * Minimum height a user can drag-resize a row down to. Defaults to 18px.
     */
    minRowHeight?: number;
    /**
     * Fires when the user picks "Insert row above/below" from the row /
     * cell right-click menu (OUT-7 §6.2). The grid does not own row data
     * — consumers splice their own array based on `atIndex` + `position`.
     * Wiring this turns on the corresponding menu items; leaving it
     * unset hides them entirely (no disabled stubs).
     */
    onRowsInsert?: (payload: RowsInsertPayload) => void;
    /**
     * Fires when the user picks "Delete row" from the row / cell
     * right-click menu (OUT-7 §6.3).
     */
    onRowsDelete?: (payload: RowsDeletePayload) => void;
    /**
     * Fires when the user picks "Insert column left/right" from the
     * column / cell right-click menu (OUT-7 §6.2).
     */
    onColumnsInsert?: (payload: ColumnsInsertPayload) => void;
    /**
     * Fires when the user picks "Delete column" from the column / cell
     * right-click menu (OUT-7 §6.3).
     */
    onColumnsDelete?: (payload: ColumnsDeletePayload) => void;
    /**
     * Fires when the user drag-reorders a row / column header (OUT-7 §6.3
     * P1). `targetIndex` is the destination position in the resulting
     * array — apply with `splice(targetIndex, 0, ...moved)`. The grid does
     * not own the data; the consumer reorders its own arrays.
     */
    onRowsReorder?: (payload: RowsReorderPayload) => void;
    onColumnsReorder?: (payload: ColumnsReorderPayload) => void;
    /**
     * Notifier fired when the user copies the active selection via Ctrl+C or
     * the right-click "Copy" item (OUT-13 §16). The grid also writes the TSV
     * `text` to the OS clipboard automatically — the callback is purely a
     * notification so consumers can react (toast, undo-stack entry, etc.).
     */
    onCopy?: (payload: ClipboardCopyPayload) => void;
    /**
     * Notifier fired when the user cuts the active selection via Ctrl+X or
     * the right-click "Cut" item. The grid also fires `onCellsClear` so the
     * consumer can wipe the source cells.
     */
    onCut?: (payload: ClipboardCopyPayload) => void;
    /**
     * Fires on Ctrl+V or right-click "Paste". Behaves as a *notification* when
     * `onCellChange` is also wired: the library reads the OS clipboard, parses
     * the Excel TSV, and emits one `onCellChange` per cell (OUT-4 §3). When
     * `onCellChange` is NOT wired (or `readOnly` is on), this callback is the
     * sole paste signal and the consumer is responsible for applying the
     * paste against their own state. The `nextValue` carried by auto-paste
     * `onCellChange` events is always a `string` (clipboard text) — consumers
     * with numeric / typed columns should coerce inside their reducer.
     */
    onPasteRequest?: (payload: PasteRequestPayload) => void;
    /** Right-click "Paste special…" intent. Cell targets only. */
    onPasteSpecialRequest?: (payload: PasteSpecialRequestPayload) => void;
    /**
     * Column sort intents (right-click "Sort ▶ Ascending / Descending"). The
     * grid does not own row ordering — the consumer re-sorts its `rows`
     * array in response.
     */
    onSortAscending?: (payload: SortColumnPayload) => void;
    onSortDescending?: (payload: SortColumnPayload) => void;
    /** Right-click "Sort ▶ Custom sort…" — opens the consumer's dialog. */
    onSortCustomRequest?: (payload: SortColumnPayload) => void;
    /** Right-click "Filter ▶ Filter by selected value" (cell targets only). */
    onFilterByValueRequest?: (payload: FilterByValuePayload) => void;
    /** Right-click "Filter ▶ Clear filter" (whole grid). */
    onClearFilterRequest?: () => void;
    /**
     * Format-cell dialog request — fires on Ctrl+1 or right-click "Format
     * cell…". Callback only; use the exported `CellFormatToolbar` for the
     * built-in controlled toolbar, or wire this to a custom dialog.
     */
    onCellFormatRequest?: (payload: CellFormatRequestPayload) => void;
    /** Right-click "Insert note…" (cell targets only). */
    onInsertNoteRequest?: (payload: CellAddressActionPayload) => void;
    /** Right-click "Hyperlink…" (cell targets only). */
    onInsertHyperlinkRequest?: (payload: CellAddressActionPayload) => void;
    /**
     * Enable Ctrl+Z / Ctrl+Y / Ctrl+Shift+Z (OUT-6, §5). Defaults to `true`
     * when `onCellChange` is wired — the grid records every cell-level
     * mutation it dispatches (edit / paste / fill / clear / cut) and replays
     * the inverse through `onCellChange` on undo. Set `false` to opt out
     * (e.g. when the consumer ships its own history alongside the reducer).
     *
     * Contract: undo of a clear / cut snapshot replays the prior cell value
     * via `onCellChange(coord, prev)`, so the consumer's `onCellChange`
     * reducer MUST be the inverse of its `onCellsClear` reducer (i.e.
     * writing `prev` back to the coord undoes the clear). Consumers with
     * non-equivalent clear semantics (property deletion, structural row
     * change, etc.) should opt out and manage history themselves.
     */
    enableUndo?: boolean;
    /** Max undo entries retained (default `100`, spec mandates ≥ 50). */
    undoMaxEntries?: number;
    /** Max bytes the undo stack may retain before evicting (default 8 MiB). */
    undoMaxBytes?: number;
    /**
     * Current sort state (OUT-9 §8.1). Controlled: when `onSortStateChange`
     * is wired the grid renders click-to-sort arrows in column headers and
     * fires this callback with the next state on each click. Plain click
     * cycles asc → desc → none on a single column; Shift+click extends the
     * multi-column sort. The grid does NOT reorder rows — the consumer
     * re-sorts its `rows` array in response to the callback (stable sort
     * guaranteed by ES2019 `Array.prototype.sort`).
     */
    sortState?: SortState;
    onSortStateChange?: (next: SortState) => void;
    /**
     * Current filter state (OUT-9 §8.2). Controlled: when `onFilterStateChange`
     * is wired the grid renders a filter funnel button on each column header
     * and a dropdown checkbox panel on click. The grid does NOT hide rows —
     * the consumer filters its `rows` array in response to the callback.
     * Map keys are column ids; missing entries mean "no filter" on that
     * column. Selected values use canonical string keys (see
     * `valueToFilterKey`).
     */
    filterState?: FilterState;
    onFilterStateChange?: (next: FilterState) => void;
    /**
     * Optional unfiltered source rows used to compute the filter dropdown's
     * unique-value list (Excel parity). When the user opens the filter panel
     * on column `X`, the library applies every column's filter EXCEPT `X`'s
     * to `filterPanelRows` and lists the resulting unique values. Without
     * this prop the library falls back to scanning `rows`, which means once
     * the consumer has narrowed `rows` via a filter, reopening that filter
     * shows only the previously-kept values — incorrect for restoring a
     * broader selection. Pass the pre-filter source array here to get
     * Excel-correct behavior.
     */
    filterPanelRows?: ReadonlyArray<Row>;
    /**
     * Sheet zoom factor (OUT-14). `1.0` is 100%, range `0.1` (10%) — `4.0`
     * (400%), Excel-faithful. Controlled mode: pass `zoom` plus
     * `onZoomChange` and own the value in parent state. Uncontrolled mode:
     * pass `defaultZoom` (or nothing) — the grid manages internal zoom and
     * `onZoomChange` still fires for telemetry. Zoom multiplies row
     * heights, column widths, the row gutter, the header lane, and the
     * font size linearly so virtualization math and font rendering stay
     * pixel-aligned (not a CSS transform). Ctrl+wheel and the bottom-right
     * status-bar widget (+ / − / slider / percentage button → reset) all
     * funnel through the same change path.
     */
    zoom?: number;
    defaultZoom?: number;
    onZoomChange?: (zoom: number) => void;
    /** Show / hide the bottom-right zoom widget. Defaults to `true`. */
    showZoomControl?: boolean;
    zoomMin?: number;
    zoomMax?: number;
    /**
     * Read-only cell annotations / tooltips (OUT-15). Two forms:
     *   - Function: `(rowIndex, columnIndex) => string | null | undefined`.
     *     Returning `null`, `undefined`, or an empty string means "no
     *     annotation on this cell" (the indicator + tooltip are skipped).
     *   - Map: `{ "0:1": "...", "3:4": "..." }` keyed by `${row}:${col}`.
     *     Missing keys behave the same as a function returning `undefined`.
     *
     * Cells with a non-empty annotation render a small triangle indicator in
     * the top-right corner; hovering the cell shows the annotation in a
     * standard tooltip (delay-in / delay-out, ESC to dismiss). The data is
     * developer-injected — there is no in-grid UI to edit annotations.
     * Per spec, the consumer should drop the entry when merging or splitting
     * the cell; the grid retains no annotation state of its own.
     */
    cellAnnotations?: CellAnnotations;
    /** Tooltip show delay in ms (default 500). */
    annotationShowDelayMs?: number;
    /** Tooltip hide delay in ms once the pointer leaves the cell (default 100). */
    annotationHideDelayMs?: number;
    /**
     * Per-cell visual format — font, alignment, fill, border.
     * The grid is consumer-controlled: it owns no format state, it just paints
     * what this prop resolves. Two forms (mirroring `cellAnnotations`):
     *   - Function: `(rowIndex, columnIndex) => CellFormat | null | undefined`.
     *     Returning `null` / `undefined` means "no format on this cell".
     *   - Map: `{ "0:1": { font: { bold: true } }, ... }` keyed by
     *     `${rowIndex}:${columnIndex}` (0-based grid coordinates).
     *
     * A resolved `CellFormat` is applied as inline style on top of the cell's
     * layout: `font` (family / size / bold / italic / underline / strikethrough
     * / color), `align` (horizontal / vertical / wrap / indent), `fill`
     * (backgroundColor), and `border` (per-side style / color / width). A
     * per-cell `font.size` (BASE px) scales with the sheet zoom.
     *
     * **Performance contract** — in function form the grid calls the resolver
     * once per visible cell per render; keep it O(1) and prefer stable
     * `CellFormat` object references (or the map form via `useMemo`) so the
     * memoized cell render path can skip untouched cells.
     *
     * The `CellFormat.numberFormat` slot is co-located here but rendered by the
     * number-format engine (separate issue); this paint path ignores it.
     */
    cellFormats?: CellFormats;
    /**
     * Cell-level custom renderers (셀 내 커스텀 요소 삽입 / Custom Cell
     * Renderer). The *second* of two override levels: a cell-level renderer here wins over the
     * column-level `Column.cellRenderer`, which in turn replaces the default
     * value-to-text rendering. Use it for per-cell visuals (progress bars,
     * badges, sparklines) that a whole column shouldn't share. Two forms
     * (mirroring `cellFormats`):
     *   - Function: `(rowIndex, columnIndex) => CellRenderer | undefined`.
     *     Returning `undefined` falls back to the column renderer.
     *   - Map: `{ "0:1": ({ value }) => <Badge value={value} />, ... }` keyed by
     *     `${rowIndex}:${columnIndex}` (0-based grid coordinates).
     *
     * Each renderer receives `{ value, row, column, rowIndex, columnIndex,
     * isEditing }`. Editing is unaffected — the renderer is display-only and the
     * cell is blanked under the editor while it's open. For a custom *editor*,
     * see `Column.cellEditor`.
     *
     * **Performance contract** — in function form the grid calls the resolver
     * once per visible cell per render and does not cache results. Keep it O(1)
     * and return *referentially stable* renderer functions (module scope or
     * memoized) so the memoized cell render path can skip untouched cells; the
     * map form gives this for free.
     */
    cellRenderers?: CellRenderers;
    /**
     * Active "Draw Border" pencil tool (spec §7.4 P2), or `null` for none. When
     * set — together with {@link onCellFormatsChange} — the grid overlays a
     * pointer layer that paints cell-edge borders as the user drags:
     *   - `'draw'`  — the single edge nearest the cursor.
     *   - `'grid'`  — all four edges of the cell under the cursor.
     *   - `'erase'` — clears the nearest edge.
     * Pair with {@link CellFormatToolbarProps.activeBorderTool} /
     * `onBorderDrawToolChange` so the menu can toggle the tool. The pencil
     * requires the *map* form of `cellFormats` (a function resolver can't be
     * patched); it is a no-op otherwise.
     */
    borderDrawTool?: BorderDrawTool | null;
    /**
     * Line style / colour the pencil draws with. Forward the `side` argument from
     * the toolbar's `onBorderDrawToolChange`. Ignored by the eraser. Defaults to
     * a 1px solid line in the grid's border colour.
     */
    borderDrawSide?: CellBorderSide;
    /**
     * Emits the next `cellFormats` map after a pencil stroke (the grid never
     * mutates the input). Wire to the same setter that backs `cellFormats` and
     * the toolbar's `onCellFormatsChange`. Required to enable {@link borderDrawTool}.
     */
    onCellFormatsChange?: (next: CellFormatsMap) => void;
    /**
     * Cell merges (spec §7.5) — an array of inclusive rectangular ranges, each
     * collapsed to its top-left *anchor* cell which spans the whole region; the
     * cells it covers are not rendered. Consumer-owned, like {@link cellFormats}:
     * the grid only paints them. Mutate via the exported pure helpers
     * (`mergeSelection` / `unmergeSelection`) wired to your own UI — the
     * {@link CellMergeToolbar} does this out of the box. Keep the array
     * referentially stable across renders so the merge-aware selection and the
     * memoized render path don't churn. Overlapping/degenerate ranges are
     * normalized away (first wins).
     *
     * Scope (P1): merge affects *rendering* and *selection geometry* only. The
     * covered cells keep their underlying values, and the data paths (copy /
     * paste / fill / clear) still operate on raw cell coordinates — so a write
     * that targets a merged region writes through to the (hidden) covered cells.
     * Merge-aware clipboard/fill semantics and merges that reach into a frozen
     * row/column are deferred to a later phase; a merge overlapping a frozen pane
     * dev-warns and renders incorrectly.
     */
    merges?: ReadonlyArray<SelectionRange>;
    /**
     * Show the bottom-left selection-aggregate status bar (OUT-19, §10).
     * Renders live SUM / AVG / COUNT for the current selection, Excel-faithful:
     *   - SUM / AVG ignore non-numeric cells
     *   - AVG denominator excludes blank cells
     *   - COUNT is the Excel COUNTA equivalent (non-empty cells)
     * Hidden automatically on single-cell selections; pass `false` to opt out.
     * Defaults to `true`.
     */
    showSelectionStats?: boolean;
    /**
     * BCP-47 locale forwarded to the number formatter used by the status bar
     * pills. Pass a fixed tag (e.g. `'ko-KR'`, `'en-US'`) for deterministic
     * rendering across host environments; omit to use the runtime default.
     */
    selectionStatsLocale?: string | string[];
    /**
     * Per-cell read-only protection (OUT-18). Returns `true` for cells that
     * must reject every user-initiated edit surface: typing, Delete /
     * Backspace, paste, fill (Ctrl+D/R/Enter + fill-handle), the Cut
     * clear-half, and row/column deletion that would touch them. Unioned
     * with `Column.readOnly` — either source can elevate a cell. Formula
     * recomputes that route through `onCellChange` from the consumer are
     * NOT gated; protection only intercepts user intents before they reach
     * the consumer's reducer.
     *
     * When at least one cell evaluates protected the grid paints a subtle
     * striped background on those cells (override via the
     * `--xl-react-readonly-stripe` CSS custom property).
     */
    cellProtection?: CellProtectionPredicate;
    /**
     * Fires when the grid skipped a user action because it landed on
     * protected cells (OUT-18). The action still applies to the unprotected
     * portion of the same gesture; `coords` carries the cells that were
     * skipped. Wire this to surface an Excel-style "this cell is protected"
     * banner in the host UI.
     */
    onProtectedAction?: (info: ProtectedActionInfo) => void;
    /**
     * Enable the built-in Find & Replace dialog (§9). Defaults to `true`.
     * When on, Ctrl+F opens Find and Ctrl+H opens Replace (macOS: ⌥⌘F, since
     * Cmd+H is the OS hide-window shortcut); replace routes through
     * `onCellChange` with undo + cell-protection handling. Set `false` to opt
     * out entirely — the grid then leaves Ctrl+F to the browser's native find
     * and never renders the dialog, so a consumer can ship its own search UI
     * (the pure `findMatches` / `replaceInValue` helpers and the
     * `FindReplaceDialog` component are exported for that).
     */
    enableFindReplace?: boolean;
    /**
     * Per-visible-row outline metadata for the row hierarchy / grouping UI
     * (§6.4). Length must match the visible `rows` array (or be omitted).
     * Each entry carries `{ level, hasChildren, collapsed }`:
     *
     *   - `level` drives a `level * rowOutlineIndentPx` left-padding on the
     *     first data column, so siblings line up under their parent.
     *   - `hasChildren` paints the +/- disclosure button in the same column.
     *     Leaves get an empty placeholder of identical width so their content
     *     stays aligned with sibling parents.
     *   - `collapsed` flips the disclosure between ▶ (collapsed) and ▼
     *     (expanded). The grid does not filter rows itself — pass already-
     *     filtered visible rows in `rows`. Use the exported
     *     {@link computeRowOutline} helper to derive `{ visibleRows, outline }`
     *     from a source array under a `collapsedIds` Set.
     *
     * `null` / `undefined` entries opt that specific row out of the disclosure
     * + indent (leaf row in an otherwise flat tree, separator row, etc.).
     */
    rowOutline?: ReadonlyArray<RowOutlineCell | null | undefined>;
    /**
     * Fires when the user clicks the +/- disclosure widget on a row whose
     * `rowOutline[rowIndex].hasChildren` is true. `next` is `'expand'` when
     * the row was collapsed and `'collapse'` otherwise. The grid does not
     * manage collapse state — wire this to a `collapsedIds` reducer in the
     * consumer (see {@link toggleRowCollapse}).
     *
     * Wrap this handler in `useCallback` (or otherwise stabilise its identity
     * across renders): the disclosure click target is rendered inside the
     * first data column's `Cell`, and its field-level memo comparator includes
     * this callback. A fresh function on every render forces every parent
     * cell to re-render even when neither rows nor the outline changed.
     */
    onRowOutlineToggle?: (rowIndex: number, next: 'collapse' | 'expand') => void;
    /**
     * Per-level indent in px applied to the first data column when
     * `rowOutline` is wired. Defaults to 16. The disclosure widget reserves a
     * matching slot regardless of level so leaves and parents in the same row
     * align visually.
     */
    rowOutlineIndentPx?: number;
    /**
     * Named data-validation lists for the dropdown picker (spec §2.3). Keys are
     * referenced by a column's `validation.listKey`. A list item is a bare
     * string (value === label) or `{ value, label }` when the stored value
     * differs from the display text (e.g. a port code vs. its name):
     *
     * ```tsx
     * <XlReact
     *   validationLists={{ statusList: ['대기', '진행', '완료'] }}
     *   columns={[{ id: 'status', accessor: r => r.data.status,
     *               validation: { listKey: 'statusList' } }]}
     * />
     * ```
     *
     * The active cell of a list column shows a ▼ caret; the picker also opens on
     * Alt+↓, F2, or double-click. Selecting an option writes the value through
     * `onCellChange` (undo + protection aware). With `validation.strict` a value
     * not in the list paints the invalid style (master-reference validation, §2.4).
     */
    validationLists?: ValidationLists;
    /**
     * Show / hide the cell gridlines (§13 P1). Defaults to `true`.
     * When `false` the grid applies the `xl-react-grid--no-gridlines`
     * modifier class on the root; the CSS rule strips the cell right /
     * bottom border colors so the grid looks like a borderless canvas
     * (Excel "눈금선 표시" toggle). Headers, selection, freeze separators,
     * and any user-painted cell borders remain visible.
     */
    showGridlines?: boolean;
    /**
     * Show / hide the column-header lane and row-number gutter (§13 P1).
     * Defaults to `true`. When `false` the grid applies
     * `xl-react-grid--no-headers` on the root — the CSS rule hides the
     * header and gutter via `visibility: hidden`. **The reserved space is
     * preserved** so the internal layout math (virtualization offsets,
     * hit testing, sticky positioning) stays untouched; consumers that
     * want full edge-to-edge data can nest the grid in a container with
     * `clip-path` / `overflow` cropping. Equivalent to Excel "머리글 표시".
     */
    showHeaders?: boolean;
}
declare function XlReact({ columns, rows, rowHeight, columnWidth, overscan, className, onSelectionChange, onEditRequest, onCellChange, onCellsClear, readOnly, freezeFirstRow, freezeFirstCol, freezeRowCount, freezeColCount, minColumnWidth, minRowHeight, onRowsInsert, onRowsDelete, onColumnsInsert, onColumnsDelete, onRowsReorder, onColumnsReorder, onCopy, onCut, onPasteRequest, onPasteSpecialRequest, onSortAscending, onSortDescending, onSortCustomRequest, onFilterByValueRequest, onClearFilterRequest, onCellFormatRequest, onInsertNoteRequest, onInsertHyperlinkRequest, enableUndo, undoMaxEntries, undoMaxBytes, sortState, onSortStateChange, filterState, onFilterStateChange, filterPanelRows, zoom, defaultZoom, onZoomChange, showZoomControl, zoomMin, zoomMax, cellAnnotations, annotationShowDelayMs, annotationHideDelayMs, cellFormats, cellRenderers, borderDrawTool, borderDrawSide, onCellFormatsChange, merges, showSelectionStats, selectionStatsLocale, cellProtection, onProtectedAction, enableFindReplace, rowOutline, onRowOutlineToggle, rowOutlineIndentPx, validationLists, showGridlines, showHeaders, }: XlReactProps): react_jsx_runtime.JSX.Element;

interface ProcessInChunksOptions {
    chunkSize?: number;
    signal?: AbortSignal;
}
/**
 * Process `items` in fixed-size chunks, yielding between chunks via
 * requestAnimationFrame so the main thread can paint. Returns a Promise that
 * resolves after every item has been visited.
 *
 * Used by OUT-12 paste / fill / bulk-edit paths to keep the browser
 * responsive on 10k+ cell operations.
 */
declare function processInChunks<T>(items: readonly T[], perItem: (item: T, index: number) => void, options?: ProcessInChunksOptions): Promise<void>;

interface BoundedUndoStackOptions<T> {
    maxEntries?: number;
    maxBytes?: number;
    /** Estimate the byte cost of an entry. Defaults to JSON.stringify length. */
    sizeOf?: (entry: T) => number;
}
/**
 * Bounded undo stack: evicts oldest entries when either `maxEntries` or
 * `maxBytes` is exceeded. Designed for OUT-12's "Undo 스택은 메모리 한계 고려"
 * requirement so long sessions cannot leak.
 *
 * Not thread-safe; callers should serialize push/pop themselves.
 */
declare class BoundedUndoStack<T> {
    private readonly entries;
    private readonly sizes;
    private bytes;
    private readonly maxEntries;
    private readonly maxBytes;
    private readonly sizeOf;
    constructor(options?: BoundedUndoStackOptions<T>);
    get size(): number;
    get byteSize(): number;
    push(entry: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    clear(): void;
    toArray(): readonly T[];
    private evict;
}

/**
 * Excel-style column label for a 0-based index. Uses the bijective base-26
 * scheme (also called "spreadsheet numbering") where every position maps to a
 * non-empty string:
 *
 *   0 → A, 25 → Z, 26 → AA, 51 → AZ, 52 → BA, 701 → ZZ, 702 → AAA
 *
 * NOT the same as plain base-26: in this scheme there is no "leading zero",
 * so `AA` follows `Z` instead of `BA`. That's why Excel's columns count up
 * without skipping single-letter "values".
 *
 * Column headers are library-fixed (matching Excel) — consumers cannot
 * override them. Returns an empty string for non-integer / negative input
 * as a defensive guard; callers in the grid always pass valid 0-based
 * column indices, so this branch is unreachable in practice.
 */
declare function defaultColumnLabel(index: number): string;

/**
 * Excel-style row-gutter label for a 0-based index. 1-based number, mirroring
 * `defaultColumnLabel` so row + column headers share the same Excel convention:
 *
 *   0 → "1", 1 → "2", 99 → "100", …
 *
 * Row headers are library-fixed — consumers cannot override them. Returns an
 * empty string for non-integer / negative input as a defensive guard; callers
 * in the grid always pass valid 0-based row indices, so this branch is
 * unreachable in practice.
 */
declare function defaultRowLabel(index: number): string;

/**
 * Undo / Redo data model (OUT-6, 명세서 §5 + §17).
 *
 * Cell-level mutations (single edit, bulk paste, fill, clear) are normalised
 * into a single `cell-edits` command containing the affected coordinates with
 * both `prev` and `next` values. Undo walks the change list and re-emits each
 * write with the sides swapped through the existing `onCellChange` pipeline,
 * so the consumer reducer keeps a single mutation entry point and the grid
 * never owns row data.
 *
 * Row / column / sort intents are out of scope for this iteration because they
 * require a snapshot of the consumer's row order, which the current callback
 * surface does not carry. Those operations stay outside the stack until OUT-24
 * adds sheet-aware history (§5 P2). Their dispatch is unaffected.
 */

interface HistorySnapshot {
    canUndo: boolean;
    canRedo: boolean;
    undoSize: number;
    redoSize: number;
}

/**
 * Live aggregate summary for the current selection (OUT-19, §10).
 *
 * - `sum` / `avg` / `min` / `max` are `null` when the selection contains no
 *   numeric cells. That distinguishes "no numbers to summarise" from "the
 *   numbers sum to 0".
 * - `count` is the Excel `COUNTA` equivalent: non-empty cells (`null`,
 *   `undefined`, and empty strings count as empty and are excluded).
 * - `numericCount` is the denominator behind `avg` and the population behind
 *   `sum` / `min` / `max` — exposed so consumers can build their own readouts
 *   (e.g. "AVG over 3 numbers") without re-walking the selection.
 * - `cellCount` is every cell the user selected (incl. blanks + non-numeric).
 *   The status bar uses it to decide whether to render at all (≥ 2 cells per
 *   the spec — single-cell selections stay quiet).
 *
 * `min` / `max` are pre-computed for the P2 "MIN / MAX" status-bar items
 * called out in the OUT-19 spec; the default `SelectionStatusBar` ignores
 * them today, but they're free to compute alongside SUM and keep the
 * structural type stable for consumers building custom readouts.
 */
interface SelectionAggregates {
    sum: number | null;
    avg: number | null;
    min: number | null;
    max: number | null;
    count: number;
    numericCount: number;
    cellCount: number;
}
/**
 * Walk every cell covered by `ranges` (deduplicated against overlap) and
 * compute SUM / AVG / COUNT.
 *
 * Range coordinates are clamped to the grid before iteration so callers can
 * hand over the raw selection state, including stale ranges that haven't
 * been re-clamped yet after a `rows` / `columns` shrink.
 *
 * Overlap handling: multi-select Ctrl+drag can hand back ranges that share
 * cells. A `Set<number>` of `(row * colCount + col)` keys keeps each cell at
 * most once in the totals — matching Excel's status-bar behaviour where
 * overlapping selections still report a single SUM. The key fits in a JS
 * safe integer up to ~9e15 (`Number.MAX_SAFE_INTEGER`), far beyond any
 * realistic grid.
 */
declare function computeAggregates(ranges: ReadonlyArray<SelectionRange>, rows: ReadonlyArray<Row>, columns: ReadonlyArray<AnyColumn>): SelectionAggregates;

interface CellMergeToolbarLabels {
    merge?: string;
    unmerge?: string;
    mergeCenter?: string;
}
interface CellMergeToolbarProps {
    /** Current selection snapshot (from `XlReact.onSelectionChange`). */
    selection: SelectionSnapshot | null;
    /** Current merges (the same array passed to `XlReact.merges`). */
    merges?: ReadonlyArray<SelectionRange>;
    /** Called with the next merges array when the user merges / unmerges. */
    onMergesChange: (next: SelectionRange[]) => void;
    /**
     * Optional format state. When both are provided, "Merge & Center" also
     * centers the merged region horizontally via the cell format model. Without them
     * the button still merges but skips the alignment step.
     */
    cellFormats?: CellFormatsMap;
    onCellFormatsChange?: (next: CellFormatsMap) => void;
    /**
     * Called when a merge hides cells, with the rectangles it covers (the merged
     * region minus its top-left anchor). Opt in to discard those values like
     * Excel — e.g. route them through the same handler as `onCellsClear`. Omitted
     * by default so the library preserves the consumer's data.
     *
     * Only cell *values* are reported; any `cellFormats` on the covered cells are
     * left intact (clear them yourself for full Excel parity). Note that merging
     * fires this alongside `onMergesChange` (and `onCellFormatsChange` for Merge &
     * Center) as separate callbacks — batch them into one undo transaction.
     */
    onMergeClearCovered?: (ranges: SelectionRange[]) => void;
    className?: string;
    disabled?: boolean;
    /** Override the (Korean by default) button captions. */
    labels?: CellMergeToolbarLabels;
}
/**
 * Reusable Merge / Unmerge / Merge & Center controls (spec §7.5), mirroring
 * the {@link import('../format').CellFormatToolbar} pattern: a controlled
 * component that turns the current selection into the next `merges` array via
 * the pure helpers. Drop it next to the grid and feed it the same selection
 * and merges state.
 */
declare function CellMergeToolbar({ selection, merges, onMergesChange, cellFormats, onCellFormatsChange, onMergeClearCovered, className, disabled, labels, }: CellMergeToolbarProps): react_jsx_runtime.JSX.Element;

/**
 * Conditional formatting rule model (§7.8). Rules describe how cells should be
 * styled based on their values; the pure evaluator (`evaluateConditionalFormats`)
 * turns a rule list + the consumer's rows/columns into a `CellFormat` map plus
 * a parallel map of in-cell decorations (data bars / icon sets) that can't be
 * expressed as a `CellFormat`.
 *
 * The grid stays consumer-controlled: the evaluator owns no state and reads cell
 * values through each column's `accessor`, so comparisons run against the raw
 * underlying value — independent of any number-format display transform.
 */

/** Numeric comparison operators for value rules. */
type ComparisonOperator = 'greaterThan' | 'greaterThanOrEqual' | 'lessThan' | 'lessThanOrEqual' | 'equal' | 'notEqual' | 'between' | 'notBetween';
/** Substring operators for text rules. */
type TextOperator = 'contains' | 'notContains' | 'startsWith' | 'endsWith';
/** Relative date windows, evaluated against `EvaluateOptions.now`. */
type DateOperator = 'today' | 'yesterday' | 'tomorrow' | 'last7Days' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth';
/** Fields shared by every rule. */
interface BaseRule {
    /**
     * Column ids the rule applies to. Omit or leave empty to target every
     * column. Range-relative rules (top/bottom, average, duplicate/unique,
     * color scale, data bar, icon set) compute their statistics over the pool
     * of all targeted cells, mirroring an Excel "applied range".
     */
    columns?: readonly string[];
    /**
     * Excel "stop if true": when this rule matches a cell, no lower-priority
     * rule is applied to that cell. Rules are evaluated in array order — index 0
     * is the highest priority and wins per CSS property.
     */
    stopIfTrue?: boolean;
}
/** `value X 이상/이하/사이` — numeric comparison. */
interface CellValueRule extends BaseRule {
    type: 'cellValue';
    operator: ComparisonOperator;
    /** Primary operand. */
    value: number;
    /** Upper operand for `between` / `notBetween` (order-insensitive vs `value`). */
    value2?: number;
    format: CellFormat;
}
/** `상위/하위 N개` — top or bottom N items (or percent). */
interface TopBottomRule extends BaseRule {
    type: 'topBottom';
    direction: 'top' | 'bottom';
    /** Rank count, or a 0-100 percentage when `percent` is true. */
    rank: number;
    /** Treat `rank` as a percentage of the (numeric) cell count. */
    percent?: boolean;
    format: CellFormat;
}
/** `평균 초과/미만` — relative to the mean of targeted numeric cells. */
interface AverageRule extends BaseRule {
    type: 'average';
    direction: 'above' | 'below' | 'aboveOrEqual' | 'belowOrEqual';
    format: CellFormat;
}
/** `중복 값 / 고유 값` — highlight duplicated or unique values. */
interface DuplicateRule extends BaseRule {
    type: 'duplicate' | 'unique';
    format: CellFormat;
}
/** `텍스트 포함 / 시작 / 끝` — substring conditions. */
interface TextRule extends BaseRule {
    type: 'text';
    operator: TextOperator;
    text: string;
    /** Case-sensitive match. Defaults to false (Excel-like). */
    caseSensitive?: boolean;
    format: CellFormat;
}
/** `날짜 — 오늘/이번 주/지난 달/지난 7일`. */
interface DateRule extends BaseRule {
    type: 'date';
    operator: DateOperator;
    format: CellFormat;
}
/** A single anchor in a color-scale gradient. */
interface ColorScaleStop {
    /**
     * How the stop's position is derived from the data:
     * - `min` / `max` — the lowest / highest value in the range.
     * - `number` — the absolute `value`.
     * - `percentile` — the `value`-th percentile (0-100) of the range.
     */
    type: 'min' | 'max' | 'number' | 'percentile';
    value?: number;
    /** Hex color for this stop (`#rgb` or `#rrggbb`). */
    color: string;
}
/** `색조(Color Scale)` — min~max gradient mapped onto `fill.backgroundColor`. */
interface ColorScaleRule extends BaseRule {
    type: 'colorScale';
    /**
     * 2 or 3 ascending stops. Defaults to the Excel red→yellow→green 3-color
     * scale (min / 50th percentile / max) when omitted.
     */
    stops?: readonly ColorScaleStop[];
}
/** `데이터 막대(Data Bar)` — proportional in-cell bar. */
interface DataBarRule extends BaseRule {
    type: 'dataBar';
    /** Bar fill color (default `#638ec6`). */
    color?: string;
    /** Explicit range floor; defaults to the minimum value in the range. */
    min?: number;
    /** Explicit range ceiling; defaults to the maximum value in the range. */
    max?: number;
    /** Render only the bar, hiding the cell value. Defaults to false. */
    hideValue?: boolean;
}
/** Built-in 3-icon sets. */
type IconSetName = 'triangles' | 'arrows' | 'checks' | 'traffic';
/** `아이콘 세트` — band a value into one of three icons. */
interface IconSetRule extends BaseRule {
    type: 'iconSet';
    iconSet: IconSetName;
    /**
     * Two ascending lower bounds splitting values into 3 bands. Interpreted as
     * percentiles (0-100) unless `absolute` is set. Defaults to even thirds
     * (33.33 / 66.67 percentile). Note: with heavily tied data the two
     * percentile bounds can collapse to the same value, merging bands (values
     * at-or-above the shared bound jump to the top icon). Use `absolute`
     * thresholds for tie-heavy columns where exact bands matter.
     */
    thresholds?: readonly [number, number];
    /** Interpret `thresholds` as absolute numbers instead of percentiles. */
    absolute?: boolean;
}
/** Discriminated union of every supported rule. */
type ConditionalRule = CellValueRule | TopBottomRule | AverageRule | DuplicateRule | TextRule | DateRule | ColorScaleRule | DataBarRule | IconSetRule;
/** Proportional bar drawn inside a cell. */
interface DataBarDecoration {
    type: 'dataBar';
    /** Fill ratio in [0, 1]. */
    ratio: number;
    color: string;
    hideValue: boolean;
}
/** Glyph drawn beside a cell value. */
interface IconDecoration {
    type: 'icon';
    /** The glyph to render (e.g. `▲`). */
    glyph: string;
    /** Accessible label for the glyph. */
    label: string;
    /** Glyph color. */
    color: string;
}
/** In-cell decoration that cannot be expressed as a `CellFormat`. */
type ConditionalDecoration = DataBarDecoration | IconDecoration;
interface EvaluateOptions {
    /**
     * Reference "now" for date rules. Defaults to `new Date()`. Pass an explicit
     * value for deterministic output (tests, SSR).
     */
    now?: Date;
    /** First day of week for `thisWeek` / `lastWeek`. 0 = Sunday (default), 1 = Monday. */
    weekStartsOn?: 0 | 1;
}
/** `"row:col"`-keyed map of resolved cell formats — feeds the `cellFormats` prop. */
type ConditionalFormatsMap = Readonly<Partial<Record<string, CellFormat>>>;
/** `"row:col"`-keyed map of in-cell decorations. */
type ConditionalDecorationsMap = Readonly<Partial<Record<string, ConditionalDecoration>>>;
interface ConditionalFormatResult {
    /**
     * Indexed `"row:col"` format map. Pass straight to the grid's `cellFormats`
     * prop (it accepts the map form). To combine with the consumer's own formats,
     * note that a map-level spread (`{ ...a, ...b }`) replaces the *entire*
     * `CellFormat` for any overlapping cell — it does not merge per property. For
     * a per-property combine, merge each overlapping cell's two formats yourself.
     */
    formats: ConditionalFormatsMap;
    /** Indexed `"row:col"` map of data-bar / icon decorations. */
    decorations: ConditionalDecorationsMap;
}

/** Captions for every control. Korean by default; override for i18n. */
interface ConditionalFormatToolbarLabels {
    button: string;
    highlightGroup: string;
    greaterThan: string;
    lessThan: string;
    between: string;
    topBottomGroup: string;
    top10: string;
    bottom10: string;
    aboveAverage: string;
    belowAverage: string;
    duplicateValues: string;
    uniqueValues: string;
    decorationGroup: string;
    dataBar: string;
    colorScale: string;
    iconSet: string;
    clearGroup: string;
    clearSelected: string;
    clearAll: string;
    valueLabelSingle: string;
    valueLabelLower: string;
    valueLabelUpper: string;
    apply: string;
    cancel: string;
}
declare const DEFAULT_CONDITIONAL_FORMAT_LABELS: ConditionalFormatToolbarLabels;
interface ConditionalFormatToolbarProps {
    /** Current selection snapshot (from `XlReact.onSelectionChange`). */
    selection: SelectionSnapshot | null;
    /**
     * The same `columns` array passed to the grid and the evaluator. Used to map
     * the selection's column indices to the column ids each new rule targets, so
     * `selection` must be consistent with this array (i.e. captured against the
     * same column ordering) for the scoping to resolve to the right ids.
     */
    columns: readonly AnyColumn[];
    /** Current rules (the same array passed to `evaluateConditionalFormats`). */
    rules: readonly ConditionalRule[];
    /** Called with the next rules array when the user adds or clears a rule. */
    onRulesChange: (next: ConditionalRule[]) => void;
    className?: string;
    /** Disable the whole toolbar. */
    disabled?: boolean;
    /** Override the (Korean by default) captions. */
    labels?: Partial<ConditionalFormatToolbarLabels>;
}
declare function ConditionalFormatToolbar({ selection, columns, rules, onRulesChange, className, disabled, labels, }: ConditionalFormatToolbarProps): react_jsx_runtime.JSX.Element;

/**
 * Named cell styles & theme presets (§7.7). A *cell style* is a reusable,
 * named bundle of {@link CellFormat} — Excel's "셀 스타일" (제목 / 소계 / 합계 /
 * 입력 / 경고 …). Built on top of OUT-27's visual format model: a style is just
 * a `CellFormat` with a name, so applying one writes plain `cellFormats` entries
 * the grid already knows how to paint. No new grid state, no new render path.
 *
 * Applying a style *copies* its format into `cellFormats`; the grid keeps no
 * cell→style link. So, unlike Excel, editing a style definition does not
 * retro-update already-styled cells — re-apply the style to propagate a change.
 */

/**
 * A reusable, named bundle of visual formatting. The `id` doubles as the
 * registry key; `format` is the {@link CellFormat} the style applies.
 */
interface NamedCellStyle {
    /** Stable machine id; also the registry key. */
    id: string;
    /** Human-facing caption shown in pickers. Falls back to `id` when omitted. */
    label?: string;
    /**
     * Optional grouping key for galleries (e.g. `'titles'`, `'data'`,
     * `'themed'`). Pickers render one section per category in first-seen order.
     */
    category?: string;
    /** `true` for library-shipped presets; absent/false for consumer styles. */
    builtin?: boolean;
    /** The visual format this style applies. */
    format: CellFormat;
}
/**
 * Immutable registry of named styles keyed by {@link NamedCellStyle.id}. Holds
 * built-in presets plus any consumer-defined styles. The helpers in
 * `registry.ts` never mutate a registry; each edit returns a new object so it
 * slots straight into React state.
 */
type CellStyleRegistry = Readonly<Record<string, NamedCellStyle>>;
/**
 * How applying a style combines with a cell's existing format.
 *
 * - `'replace'` (default) — the cell's format becomes the style's format,
 *   dropping any prior formatting. Matches Excel's "apply cell style" semantics.
 * - `'merge'` — the style's defined facets are layered onto the existing format
 *   (style wins per property); unrelated facets are kept. Useful for stacking a
 *   style on top of hand-tuned formatting.
 */
type CellStyleApplyMode = 'replace' | 'merge';

/** Captions for the toolbar. Korean by default; override for i18n. */
interface CellStyleToolbarLabels {
    button: string;
    /** "Normal" entry that clears any style from the selection. */
    clear: string;
    /** Section heading per style category. Unlisted categories show no heading. */
    categories: Record<string, string>;
}
declare const DEFAULT_CELL_STYLE_LABELS: CellStyleToolbarLabels;
interface CellStyleToolbarProps {
    /** Current selection snapshot (from `XlReact.onSelectionChange`). */
    selection: SelectionSnapshot | null;
    /** The same `cellFormats` map passed to the grid. */
    cellFormats?: CellFormatsMap;
    /** Called with the next map when the user applies or clears a style. */
    onCellFormatsChange: (next: CellFormatsMap) => void;
    /** Styles to show. Defaults to the built-in preset registry. */
    registry?: CellStyleRegistry;
    /** How a style combines with existing formatting. Default `'replace'`. */
    applyMode?: CellStyleApplyMode;
    className?: string;
    /** Disable the whole toolbar. */
    disabled?: boolean;
    /** Override the (Korean by default) captions. */
    labels?: Partial<CellStyleToolbarLabels>;
}
declare function CellStyleToolbar({ selection, cellFormats, onCellFormatsChange, registry, applyMode, className, disabled, labels, }: CellStyleToolbarProps): react_jsx_runtime.JSX.Element;

interface CellFormatToolbarFontOption {
    label: string;
    value: string;
}
interface CellFormatToolbarNumberFormatOption {
    label: string;
    /** Excel format code, or '' for General (clears the cell's `numberFormat`). */
    value: string;
}
interface CellFormatToolbarProps {
    selection: SelectionSnapshot | null;
    cellFormats?: CellFormatsMap;
    onCellFormatsChange: (next: CellFormatsMap) => void;
    className?: string;
    disabled?: boolean;
    fontFamilies?: readonly CellFormatToolbarFontOption[];
    fontSizes?: readonly number[];
    /**
     * Number-format presets shown in the toolbar's number-format dropdown. Each
     * value is an Excel format code applied to {@link CellFormat.numberFormat};
     * the `''` entry maps to General and clears the field. Defaults to a Korean
     * label set covering 일반 / 숫자 / 통화 / 회계 / 백분율 / 지수 / 분수 /
     * 날짜 / 시간 / 텍스트.
     */
    numberFormats?: readonly CellFormatToolbarNumberFormatOption[];
    /**
     * Current cell merges. Provide together with {@link onMergesChange} to fold
     * the Merge / Merge & Center / Unmerge controls into this toolbar instead of
     * rendering a separate {@link import('../merge').CellMergeToolbar}.
     */
    merges?: ReadonlyArray<SelectionRange>;
    /** Called with the next merges array; presence enables the merge controls. */
    onMergesChange?: (next: SelectionRange[]) => void;
    /**
     * Called when a merge hides cells, with the rectangles it covers (the merged
     * region minus its top-left anchor). Opt in to discard those values like
     * Excel — e.g. route them through the same handler as `onCellsClear`. Omitted
     * by default so the library preserves the consumer's data.
     *
     * Only cell *values* are reported; any `cellFormats` on the covered cells are
     * left intact (clear them yourself for full Excel parity). Note that merging
     * fires this alongside `onMergesChange` (and `onCellFormatsChange` for Merge &
     * Center) as separate callbacks — batch them into one undo transaction.
     */
    onMergeClearCovered?: (ranges: SelectionRange[]) => void;
    /** Override the (Korean by default) merge button captions. */
    mergeLabels?: CellMergeToolbarLabels;
    /**
     * Currently-active "Draw Border" pencil tool (spec §7.4 P2), or `null` when
     * none. Controlled by the consumer: pair with {@link onBorderDrawToolChange}
     * and forward the same value — plus {@link borderDrawSide} from the change
     * callback — to the grid's `borderDrawTool` / `borderDrawSide` props so the
     * pencil can paint on the sheet.
     */
    activeBorderTool?: BorderDrawTool | null;
    /**
     * Wiring this enables the Draw Border / Draw Border Grid / Erase Border menu
     * items. Fired when the user toggles a tool (clicking the active tool again
     * passes `null` to turn it off), and again whenever the line colour / style
     * changes while a tool is active so the grid draws with the latest side.
     * `side` carries the menu's current `{ style, color }`.
     */
    onBorderDrawToolChange?: (tool: BorderDrawTool | null, side: CellBorderSide) => void;
    /**
     * Current conditional-format rules (§7.8). Provide together with
     * {@link onConditionalRulesChange} and {@link columns} to fold the "조건부
     * 서식 ▾" dropdown into this toolbar instead of rendering a separate
     * {@link import('../conditionalFormat').ConditionalFormatToolbar}. Re-run
     * `evaluateConditionalFormats` on the returned rules to repaint.
     */
    conditionalRules?: readonly ConditionalRule[];
    /** Called with the next rules array; presence (with `columns`) enables the control. */
    onConditionalRulesChange?: (next: ConditionalRule[]) => void;
    /**
     * The same `columns` array passed to the grid and the evaluator. Required by
     * the conditional-format dropdown to map the selection's column indices to the
     * column ids each new rule targets.
     */
    columns?: readonly AnyColumn[];
    /** Override the (Korean by default) conditional-format captions. */
    conditionalFormatLabels?: Partial<ConditionalFormatToolbarLabels>;
    /**
     * Cell-style registry (§7.7). Provide it to fold the "셀 스타일 ▾" gallery
     * dropdown into this toolbar (pass {@link import('../cellStyles').BUILTIN_CELL_STYLE_REGISTRY}
     * for the built-in presets, or a custom registry). Applying a style writes
     * `cellFormats` entries via {@link onCellFormatsChange}, like the rest of the
     * toolbar — no extra wiring needed.
     */
    cellStyleRegistry?: CellStyleRegistry;
    /** How an applied style combines with existing formatting. Default `'replace'`. */
    cellStyleApplyMode?: CellStyleApplyMode;
    /** Override the (Korean by default) cell-style captions. */
    cellStyleLabels?: Partial<CellStyleToolbarLabels>;
    /**
     * Format Painter (§7.3) toggle. Wiring this enables an extra button in the
     * font-style group that mirrors the keyboard Ctrl+Shift+C / Ctrl+Shift+V
     * pair: pressing it captures the active cell's format (arming), pressing it
     * again clears the buffered format (disarming). The button highlights
     * (`data-active="true"`) while the painter is armed.
     */
    formatPainterArmed?: boolean;
    /** Called when the user toggles the Format Painter button. */
    onFormatPainterToggle?: () => void;
    /** Override the (Korean) Format Painter button caption. */
    formatPainterLabel?: string;
}
declare function CellFormatToolbar({ selection, cellFormats, onCellFormatsChange, className, disabled, fontFamilies, fontSizes, numberFormats, merges, onMergesChange, onMergeClearCovered, mergeLabels, activeBorderTool, onBorderDrawToolChange, conditionalRules, onConditionalRulesChange, columns, conditionalFormatLabels, cellStyleRegistry, cellStyleApplyMode, cellStyleLabels, formatPainterArmed, onFormatPainterToggle, formatPainterLabel, }: CellFormatToolbarProps): react_jsx_runtime.JSX.Element;

/**
 * Number-format engine (§7.6 / OUT-28).
 *
 * A **pure, UI-independent** function that converts a raw cell value into its
 * Excel-style display string. It is the runtime counterpart to the reserved
 * `CellFormat.numberFormat` slot (OUT-27): the grid calls {@link formatCellValue}
 * for cells that carry a `numberFormat` and have no custom `cellRenderer`.
 *
 * Design contract:
 * - **Deterministic.** Digit grouping (`,`) and the decimal point (`.`) are
 *   ASCII-fixed — they match Excel's default and the ko-KR / en-US convention
 *   and are *not* derived from `locale`, so output never depends on the host
 *   environment. `locale` only selects month / weekday *names* (`mmm`, `dddd`).
 * - **Total.** Never throws on a malformed format string; on any parse problem
 *   it falls back to a plain string render of the value.
 * - **No side effects.** Safe to call once per visible cell on every render.
 *
 * Supported (§7.6):
 * - P1: General, number w/ decimals, currency (₩/$), accounting, percent,
 *   thousands grouping, fraction, scientific, date & time.
 * - P2: custom 4-section codes (`pos;neg;zero;text`), forced leading zeros
 *   ("앞자리 0 보존"), unit suffixes (`0"톤"`).
 *
 * Known limitations (documented, not bugs):
 * - Literals interspersed *between* integer placeholders (e.g. the phone-number
 *   style `000-0000-0000`) are not positionally filled beyond leading-zero
 *   padding — use a `cellRenderer` for those.
 * - Bracket conditions that re-select a section (`[>=100]…`) and elapsed-time
 *   brackets (`[h]`, `[mm]`, `[ss]`) are parsed but ignored.
 * - Color tokens (`[Red]`) are stripped — color output belongs to conditional
 *   formatting (OUT-31); this engine returns a string. See `formatCellValueRich`
 *   seam notes at the three bracket-strip sites.
 * - `General` falls back to JS number stringification for magnitudes outside the
 *   plain-decimal range (very large/small values may show `1e-7`-style output).
 * - Scientific always normalises the mantissa to one integer digit (engineering
 *   notation like `##0.0E+0` is not grouped), and a fraction format's whole part
 *   is not thousands-grouped (`#,##0 ?/?` → `12345 1/2`, ungrouped).
 */
/**
 * Named format presets → Excel format-code strings. Either the preset *key*
 * (`'PERCENT'`) or the underlying code (`'0%'`) may be passed to
 * {@link formatCellValue}; keys are uppercase words and never collide with
 * valid Excel codes.
 */
declare const NUMBER_FORMAT_PRESETS: {
    readonly GENERAL: "General";
    readonly INTEGER: "0";
    readonly NUMBER: "0.00";
    readonly THOUSANDS: "#,##0";
    readonly THOUSANDS_DECIMALS: "#,##0.00";
    readonly CURRENCY_KRW: "₩#,##0";
    readonly CURRENCY_KRW_DECIMALS: "₩#,##0.00";
    readonly CURRENCY_USD: "$#,##0.00";
    readonly ACCOUNTING_KRW: "₩ #,##0;₩ -#,##0;₩ -";
    readonly PERCENT: "0%";
    readonly PERCENT_DECIMALS: "0.00%";
    readonly SCIENTIFIC: "0.00E+00";
    readonly FRACTION: "# ?/?";
    readonly DATE_ISO: "YYYY-MM-DD";
    readonly DATE_YM: "YYYY-MM";
    readonly DATE_MD: "MM/DD";
    readonly DATE_KO: "YYYY년 MM월 DD일";
    readonly TIME_HM: "HH:mm";
    readonly DATETIME: "YYYY-MM-DD HH:mm";
    readonly TEXT: "@";
};
type NumberFormatPreset = keyof typeof NUMBER_FORMAT_PRESETS;
/**
 * Convert a cell value to its display string per an Excel-style number-format
 * code (or a {@link NUMBER_FORMAT_PRESETS} key). Pure and deterministic; see
 * the module header for the full contract. Returns `''` for nullish input and
 * never throws.
 */
declare function formatCellValue(value: unknown, format?: string, locale?: string): string;
/**
 * Return a copy of `format` with `delta` more (or fewer) decimal places applied
 * to each numeric section. A `General`/empty format becomes `0` first so a
 * single increase yields `0.0` (Excel parity). Date / text / scientific /
 * fraction sections are returned unchanged.
 */
declare function adjustFormatDecimals(format: string, delta: number): string;
/** Add one decimal place (§7.6 "소수점 자릿수 늘리기"). */
declare function increaseDecimals(format: string): string;
/** Remove one decimal place (§7.6 "소수점 자릿수 줄이기"). */
declare function decreaseDecimals(format: string): string;

/**
 * Cell-merge data model (spec §7.5).
 *
 * A merge is an inclusive rectangular {@link SelectionRange}; the *anchor* is
 * its normalized top-left cell. Merges are consumer-owned (passed via the
 * `merges` prop) — the grid renders the anchor cell spanning the whole region
 * and hides the cells it covers. These helpers are pure so consumers can drive
 * Merge / Unmerge / Merge & Center from their own UI (toolbar, context menu).
 */

/** A merged region. Alias of {@link SelectionRange}; anchor = normalized top-left. */
type MergeRange = SelectionRange;
/**
 * Normalize a merges array: order each range top-left → bottom-right, drop
 * degenerate single-cell ranges, and drop any range overlapping an
 * earlier-kept one (first wins, deterministic). Always returns a fresh array.
 */
declare function normalizeMerges(merges: ReadonlyArray<SelectionRange> | undefined): MergeRange[];
/** Fast lookup structure over a normalized, non-overlapping merge set. */
interface MergeIndex {
    /** Normalized, non-overlapping merges. */
    readonly merges: ReadonlyArray<MergeRange>;
    /** Whether the set contains any merge at all (cheap guard for hot paths). */
    readonly isEmpty: boolean;
    /** The merge whose anchor (top-left) is exactly (row,col), or null. */
    anchorAt(row: number, col: number): MergeRange | null;
    /** The merge containing (row,col), or null. */
    mergeContaining(row: number, col: number): MergeRange | null;
    /** True if (row,col) lies inside any merge (anchor or covered cell). */
    isCovered(row: number, col: number): boolean;
}
/** Build a {@link MergeIndex} from a raw (possibly dirty) merges array. */
declare function buildMergeIndex(merges: ReadonlyArray<SelectionRange> | undefined): MergeIndex;
/** The merge containing `coord`, or null. */
declare function findMergeAt(merges: ReadonlyArray<SelectionRange> | undefined, coord: CellCoord): MergeRange | null;
/** The anchor (top-left) of the merge containing `coord`, or null. */
declare function mergeAnchorOf(merges: ReadonlyArray<SelectionRange> | undefined, coord: CellCoord): CellCoord | null;
/**
 * Merge each multi-cell range in `ranges` into a single region. Existing merges
 * that intersect a new region are subsumed (removed). Single-cell ranges are
 * ignored — merging one cell is a no-op, matching Excel. Returns a normalized
 * merge set.
 */
declare function mergeSelection(merges: ReadonlyArray<SelectionRange> | undefined, ranges: ReadonlyArray<SelectionRange>): MergeRange[];
/** Remove every merge that intersects any of `ranges`. Returns a normalized set. */
declare function unmergeSelection(merges: ReadonlyArray<SelectionRange> | undefined, ranges: ReadonlyArray<SelectionRange>): MergeRange[];
/**
 * The cells a merge hides — the whole region minus its top-left anchor —
 * expressed as up to two rectangles (the rest of the anchor row, then every
 * row below). Excel discards these values when merging (only the anchor
 * survives); feed them to a clear handler to mirror that behavior. Returns an
 * empty array for a single-cell range (nothing is covered).
 */
declare function coveredCellRanges(range: SelectionRange): SelectionRange[];

/**
 * Pure conditional-formatting evaluator (§7.8).
 *
 * `evaluateConditionalFormats(rules, rows, columns, options?)` produces a
 * `"row:col"`-keyed `CellFormat` map (for the `cellFormats` prop) plus a
 * parallel decoration map for data bars / icon sets. No grid state, no React —
 * just data in, data out — so it is trivially unit-testable.
 *
 * Semantics: rules are evaluated in array order; index 0 is the highest
 * priority and wins per CSS property when several rules touch the same cell.
 * A matching `stopIfTrue` rule freezes the cell so no lower-priority rule
 * applies. Range-relative rules (top/bottom, average, duplicate/unique, color
 * scale, data bar, icon set) compute their statistics over the pool of all
 * targeted cells.
 */

interface IconDecorationSeed {
    glyph: string;
    label: string;
    color: string;
}
/**
 * Built-in 3-icon sets, ordered low → high band. Colors echo Excel's
 * red / amber / green semantics.
 */
declare const ICON_SETS: Readonly<Record<IconSetName, readonly [IconDecorationSeed, IconDecorationSeed, IconDecorationSeed]>>;
declare function evaluateConditionalFormats(rules: readonly ConditionalRule[], rows: readonly Row[], columns: readonly AnyColumn[], options?: EvaluateOptions): ConditionalFormatResult;
/**
 * Look up the decoration for a cell by 0-based indices, normalising a miss to
 * `undefined`. Mirrors `resolveCellFormat`.
 */
declare function resolveConditionalDecoration(decorations: ConditionalDecorationsMap | undefined, rowIndex: number, columnIndex: number): ConditionalDecoration | undefined;

/**
 * Rendering for the in-cell decorations the conditional-format evaluator emits
 * but a `CellFormat` can't express: proportional data bars and icon-set glyphs
 * (§7.8). The grid core stays untouched — decorations ride in through the
 * existing per-column `cellRenderer` hook via `makeConditionalCellRenderer`,
 * keeping the consumer-controlled contract intact.
 */

interface ConditionalDataBarProps {
    decoration: DataBarDecoration;
    /** Cell content drawn over the bar. Hidden when the rule set `hideValue`. */
    children?: ReactNode;
}
/**
 * Proportional bar painted behind the cell value. Positioned absolutely against
 * the cell box (the grid's cells are `position: absolute`, so they form the
 * containing block), with the value floated above on its own stacking level.
 */
declare function ConditionalDataBar({ decoration, children }: ConditionalDataBarProps): ReactNode;
interface ConditionalIconProps {
    decoration: IconDecoration;
    /** Cell content drawn after the icon glyph. */
    children?: ReactNode;
}
/** Icon-set glyph rendered before the cell value. */
declare function ConditionalIcon({ decoration, children }: ConditionalIconProps): ReactNode;
interface ConditionalCellRendererOptions {
    /**
     * Wrap an existing per-column `cellRenderer`. When set, it owns the cell's
     * value display and `cellFormats` is ignored — decorations are layered on top
     * of whatever it returns.
     */
    baseRenderer?: (props: CellRendererProps) => ReactNode;
    /**
     * The same `cellFormats` you pass to the grid (map or resolver). With no
     * `baseRenderer`, the value drawn beside a data bar / icon is run through its
     * cell's `numberFormat` via `formatCellValue`, mirroring `Cell.tsx`'s display
     * path so decorations and number formatting compose (e.g. a data bar behind
     * `₩1,234,567` rather than `1234567`). Omit it to show the raw value.
     */
    cellFormats?: CellFormats;
}
/**
 * Build a `cellRenderer` that overlays the evaluator's data-bar / icon
 * decorations onto each cell. Because `cellRenderer` receives `row` / `column`
 * (not grid indices), this resolves indices via `row.id` / `column.id`, so the
 * `rows` / `columns` passed here must be the same arrays the evaluator saw.
 *
 * Spread the result onto the `cellRenderer` of every column you want decorated.
 * Cells without a decoration fall through to the value display, so it is safe to
 * apply to all columns.
 *
 * **Value display** mirrors `Cell.tsx`'s precedence: `options.baseRenderer`
 * wins; otherwise `options.cellFormats`' `numberFormat` is applied via
 * `formatCellValue`; otherwise the raw value is stringified. Pass `cellFormats`
 * (the same one given to the grid) so decorated cells keep their number format —
 * the grid's own `numberFormat` path is bypassed once a `cellRenderer` is set.
 *
 * **Contract & memoization** — the lookup is by id, so `rows` / `columns` must
 * carry the same ids (and ordering) the evaluator saw; passing a differently
 * ordered set silently lands decorations on the wrong cells. Duplicate row /
 * column ids resolve to the last occurrence (and warn in development). Memoize
 * the returned renderer (and the decorated columns built from it): a fresh
 * renderer identity yields new column objects, which busts the grid's per-cell
 * memo and re-renders every decorated cell.
 */
declare function makeConditionalCellRenderer(result: ConditionalFormatResult, rows: readonly Row[], columns: readonly AnyColumn[], options?: ConditionalCellRendererOptions): (props: CellRendererProps) => ReactNode;

/**
 * Pure rule-building helpers behind {@link ConditionalFormatToolbar} (§7.8).
 * They turn the current selection + a user choice into the next
 * `ConditionalRule[]`, mirroring the merge module's split between pure model
 * (`mergeModel`) and UI (`CellMergeToolbar`). No React, no DOM — unit-testable
 * in isolation.
 *
 * Rules built here scope themselves to the columns the selection spans, matching
 * Excel's "apply to the selected range" behaviour. Range-relative rules
 * (top/bottom, average, color scale, …) then pool their statistics over exactly
 * those columns.
 */

/** Excel's default "light red fill with dark red text" highlight. */
declare const DEFAULT_HIGHLIGHT_FORMAT: CellFormat;
/**
 * Distinct column ids the selection spans, left-to-right. Returns `[]` when
 * there is no selection — callers disable their controls in that case.
 */
declare function selectionColumnIds(selection: SelectionSnapshot | null, columns: readonly AnyColumn[]): string[];
declare function buildDataBarRule(columnIds: readonly string[], color?: string): DataBarRule;
declare function buildColorScaleRule(columnIds: readonly string[]): ColorScaleRule;
declare function buildIconSetRule(columnIds: readonly string[], iconSet?: IconSetName): IconSetRule;
/**
 * Build a cell-value comparison rule. `value2` is kept only for the range
 * operators (`between` / `notBetween`); for the others it is dropped. Note a
 * `between` rule built without `value2` collapses to an equality test at
 * evaluation time (lo === hi), so callers should supply both bounds.
 */
declare function buildCellValueRule(columnIds: readonly string[], operator: ComparisonOperator, value: number, value2?: number, format?: CellFormat): CellValueRule;
declare function buildTopBottomRule(columnIds: readonly string[], direction: 'top' | 'bottom', rank: number, percent?: boolean, format?: CellFormat): TopBottomRule;
declare function buildAverageRule(columnIds: readonly string[], direction: AverageRule['direction'], format?: CellFormat): AverageRule;
declare function buildDuplicateRule(columnIds: readonly string[], type: 'duplicate' | 'unique', format?: CellFormat): DuplicateRule;
/** Append a rule (highest priority is index 0, so new rules go to the front). */
declare function appendRule(rules: readonly ConditionalRule[], rule: ConditionalRule): ConditionalRule[];
/**
 * Drop every rule that targets one of `columnIds` (Excel "선택한 셀의 규칙
 * 지우기"). Untargeted rules apply to the whole sheet and survive a scoped
 * clear — use {@link clearAllRules} to remove those too. A multi-column rule
 * that overlaps the selection is removed whole, not narrowed — this mirrors
 * Excel's coarse "clear rules from selected cells"; do not change it to
 * per-column narrowing without intent.
 */
declare function clearRulesForColumns(rules: readonly ConditionalRule[], columnIds: readonly string[]): ConditionalRule[];
/** Remove all rules (Excel "시트 전체에서 규칙 지우기"). */
declare function clearAllRules(): ConditionalRule[];

/**
 * Built-in cell-style presets (§7.7 [P2]). Each entry is a {@link CellFormat}
 * bundle with a Korean caption, mirroring Excel's named cell styles (제목 /
 * 머리글 / 좋음·나쁨·보통 / 입력·출력·계산 / 경고·메모 / 소계·합계) plus a small
 * set of themed accents ([P3] 테마). Colours follow Excel's default theme so a
 * sheet styled here reads the same as the desktop app.
 *
 * The ordered {@link BUILTIN_CELL_STYLE_LIST} drives gallery layout; the keyed
 * {@link BUILTIN_CELL_STYLES} record (insertion order preserved) is what the
 * registry starts from.
 */

/**
 * Ordered list of built-in styles. Categories group the gallery into Excel-like
 * sections; ids are stable English machine keys, labels are the Korean captions.
 */
declare const BUILTIN_CELL_STYLE_LIST: readonly NamedCellStyle[];
/**
 * Built-in styles keyed by id, in gallery order. The registry helpers start
 * from this; consumers can layer their own styles on top via
 * {@link import('./registry').createCellStyleRegistry}.
 */
declare const BUILTIN_CELL_STYLES: Readonly<Record<string, NamedCellStyle>>;
/** Union of the built-in style ids. */
type BuiltinCellStyleId = (typeof BUILTIN_CELL_STYLE_LIST)[number]['id'];

/**
 * Cell-style registry helpers (§7.7 [P2] — 사용자 지정 스타일 저장 / 재사용).
 * Pure and immutable: every edit returns a *new* {@link CellStyleRegistry} so
 * the result drops straight into React state, matching the consumer-controlled,
 * no-mutation contract used across the library.
 */

/**
 * Build a registry from the built-in presets plus any consumer-defined styles.
 * Custom entries are layered last, so a custom style sharing a built-in id
 * overrides it. The result is frozen; use {@link defineCellStyle} /
 * {@link removeCellStyle} to derive edited copies.
 */
declare function createCellStyleRegistry(custom?: readonly NamedCellStyle[]): CellStyleRegistry;
/** Ready-made registry of just the built-in presets. */
declare const BUILTIN_CELL_STYLE_REGISTRY: CellStyleRegistry;
/** Look up a named style by id. */
declare function getCellStyle(registry: CellStyleRegistry, id: string): NamedCellStyle | undefined;
/**
 * Resolve a style id to its {@link CellFormat}. Returns the style's own format
 * object (not a clone) — callers writing it into a `cellFormats` map should go
 * through {@link import('./applyCellStyle').applyCellStyle}, which clones.
 */
declare function resolveCellStyle(registry: CellStyleRegistry, id: string): CellFormat | undefined;
/**
 * Add or replace a style, returning a new registry. A style sharing an existing
 * id overwrites it (the typical "save as / overwrite" path). The input registry
 * is never mutated.
 */
declare function defineCellStyle(registry: CellStyleRegistry, style: NamedCellStyle): CellStyleRegistry;
/**
 * Remove a style by id, returning a new registry. Removing an unknown id is a
 * no-op (returns the same registry). Built-in ids can be removed too — pass a
 * fresh {@link createCellStyleRegistry} result to restore them.
 */
declare function removeCellStyle(registry: CellStyleRegistry, id: string): CellStyleRegistry;
/** Filters for {@link listCellStyles}. */
interface ListCellStylesOptions {
    /** Restrict to a single category. */
    category?: string;
    /** `true` → only built-ins; `false` → only consumer styles. */
    builtin?: boolean;
}
/**
 * List the registry's styles in insertion order (built-ins first, then any
 * custom styles in the order they were added). Optionally filter by category or
 * built-in flag — handy for rendering a gallery section.
 */
declare function listCellStyles(registry: CellStyleRegistry, options?: ListCellStylesOptions): NamedCellStyle[];

/**
 * Compose named styles into a `cellFormats` map (§7.7 — "사용자 스타일을
 * cellFormats로 합성하는 유틸"). Pure: the input map is never mutated and a new
 * sparse {@link CellFormatsMap} is returned, so results drop into React state.
 *
 * A style is just a {@link CellFormat}, so applying one writes plain map entries
 * the grid already paints — no new grid state. `'replace'` swaps the cell's
 * whole format for the style's (Excel parity); `'merge'` layers the style's
 * facets on top of existing formatting via the shared
 * {@link applyCellFormatPatch} merge path.
 */

/** Options for {@link applyCellStyle}. */
interface ApplyCellStyleOptions {
    /** How the style combines with each cell's existing format. Default `'replace'`. */
    mode?: CellStyleApplyMode;
}
/**
 * Apply a resolved {@link CellFormat} (a style's `format`) across one or more
 * inclusive selection ranges.
 *
 * - `mode: 'replace'` (default) — each cell's format becomes a clone of `format`.
 * - `mode: 'merge'` — `format`'s facets are layered onto the existing format
 *   (style wins per property). Merge only *adds or overrides* facets; it never
 *   removes one — use `'replace'`, or the clear below, to drop formatting.
 *
 * Passing `undefined` (or an empty format) clears the cells in `ranges` — the
 * "표준 / Normal" style. This short-circuits before the mode check, so it clears
 * in either mode.
 */
declare function applyCellStyle(formats: CellFormatsMap | undefined, ranges: ReadonlyArray<SelectionRange>, format: CellFormat | undefined, options?: ApplyCellStyleOptions): CellFormatsMap;
/**
 * Resolve a style id from the registry and apply it (see {@link applyCellStyle}).
 * An unknown id is a no-op — the input map is returned unchanged (same
 * reference, so it won't trip a React identity bailout) — so a stray id never
 * silently wipes formatting. To clear, call {@link applyCellStyle} with
 * `undefined`.
 */
declare function applyNamedCellStyle(formats: CellFormatsMap | undefined, ranges: ReadonlyArray<SelectionRange>, registry: CellStyleRegistry, id: string, options?: ApplyCellStyleOptions): CellFormatsMap;
/** Options for {@link buildTableStyleFormats} ([P3] 표 스타일 일괄 적용). */
interface TableStyleOptions {
    /** Format for the range's first row. */
    header?: CellFormat;
    /** Format for even body rows (0-based within the body), e.g. banded fill. */
    band?: CellFormat;
    /** Format for odd body rows. Omit for un-banded bodies. */
    bandAlt?: CellFormat;
    /** Format for the range's last row (applied after banding). */
    total?: CellFormat;
    /** How each row's format combines with existing formatting. Default `'replace'`. */
    mode?: CellStyleApplyMode;
}
/**
 * Apply a table style across a rectangular range in one pass ([P3]): a header
 * row, alternating banded body rows, and an optional total row. Each section is
 * applied with {@link applyCellStyle}, so the result is a plain
 * {@link CellFormatsMap}. Omitted sections are skipped. The header (first row)
 * and total (last row) win over banding when the range is one or two rows tall.
 */
declare function buildTableStyleFormats(formats: CellFormatsMap | undefined, range: SelectionRange, options: TableStyleOptions): CellFormatsMap;

/**
 * Find & Replace data model (§9).
 *
 * The grid is consumer-controlled — it owns no row data — so search runs over
 * the `rows` / `columns` the consumer passes and replace routes back through
 * the normal `onCellChange` mutation path. These types describe the search
 * query, the per-cell match results, and the batched replacement intents the
 * dialog hands back to the grid.
 */

/**
 * Where a search runs. A single-grid component has no notion of a multi-sheet
 * "workbook", so the spec's third scope collapses to these two:
 *   - `'sheet'`     — every cell in the grid.
 *   - `'selection'` — only the cells inside the current selection ranges.
 */
type FindReplaceScope = 'sheet' | 'selection';
/** Mode the dialog opens in. Ctrl+F → `'find'`, Ctrl+H → `'replace'`. */
type FindReplaceMode = 'find' | 'replace';
interface FindReplaceOptions {
    /** Case-sensitive comparison. Default `false` (Excel parity). */
    matchCase: boolean;
    /**
     * Match the entire cell contents rather than a substring (Excel's "Match
     * entire cell contents"). With `useRegex` the pattern is anchored `^…$`.
     */
    wholeCell: boolean;
    /** Treat the query as a JavaScript regular expression. */
    useRegex: boolean;
}
/** Default options — substring, case-insensitive, literal (no regex). */
declare const DEFAULT_FIND_REPLACE_OPTIONS: FindReplaceOptions;
/** A single matched cell, in row-major scan order. */
interface FindMatch {
    coord: CellCoord;
    columnId: string;
    /** The cell's stringified value at scan time (used for the results list). */
    value: string;
}
/**
 * One replacement intent handed back to the grid. The grid resolves the
 * current `prevValue`, coerces `nextText` per the column's `dataType`, applies
 * it via `onCellChange`, and records a single undo entry for the batch.
 */
interface ReplaceItem {
    coord: CellCoord;
    columnId: string;
    /** The replacement as raw text; the grid coerces number columns. */
    nextText: string;
}

/**
 * Pure Find & Replace engine (§9). No React, no grid internals — operates on
 * the consumer's `rows` / `columns` so it stays trivially unit-testable and
 * reusable outside the built-in dialog.
 */

/** Thrown by {@link compileMatcher} / {@link findMatches} for an invalid regex. */
declare class InvalidRegexError extends Error {
    constructor(message: string);
}
/**
 * Stringify a cell value the way search compares it. `null` / `undefined`
 * become the empty string; everything else uses `String()`. We search the
 * *underlying* value (not a number-formatted display string) so a replace can
 * round-trip back through `onCellChange`.
 */
declare function cellValueToString(value: unknown): string;
/**
 * A query compiled once, reused across every scanned cell. `test` reports
 * whether a cell value matches; `replace` returns the rewritten value, or
 * `null` when nothing matched (so callers can skip a no-op write).
 */
interface CompiledMatcher {
    test: (text: string) => boolean;
    replace: (text: string, replacement: string) => string | null;
}
/**
 * Compile a query + options into a reusable matcher. Throws
 * {@link InvalidRegexError} when `options.useRegex` and the query is not a
 * valid regular expression. An empty query never matches.
 */
declare function compileMatcher(query: string, options: FindReplaceOptions): CompiledMatcher;
interface FindMatchesArgs {
    rows: ReadonlyArray<Row>;
    columns: ReadonlyArray<AnyColumn>;
    query: string;
    options: FindReplaceOptions;
    scope: FindReplaceScope;
    /** Required when `scope === 'selection'`. */
    ranges?: ReadonlyArray<SelectionRange>;
}
/**
 * Find every matching cell in row-major order. Throws
 * {@link InvalidRegexError} for an invalid regex query. An empty query yields
 * an empty list.
 */
declare function findMatches(args: FindMatchesArgs): FindMatch[];
/**
 * Apply a replacement to a single value string. Returns the rewritten string,
 * or `null` when the value did not match (so the caller skips the write).
 * Throws {@link InvalidRegexError} for an invalid regex query.
 */
declare function replaceInValue(value: string, query: string, replacement: string, options: FindReplaceOptions): string | null;

interface FindReplaceDialogLabels {
    findTitle: string;
    replaceTitle: string;
    findTab: string;
    replaceTab: string;
    findLabel: string;
    replaceLabel: string;
    matchCase: string;
    wholeCell: string;
    useRegex: string;
    scope: string;
    scopeSheet: string;
    scopeSelection: string;
    findPrev: string;
    findNext: string;
    replace: string;
    replaceAll: string;
    close: string;
    noMatches: string;
    invalidRegex: string;
    replaceDisabled: string;
    /** e.g. `(2, 5) => "2 of 5"`. */
    matchStatus: (current: number, total: number) => string;
    /** e.g. `3 => "Replaced 3"`. */
    replacedStatus: (count: number) => string;
}
declare const DEFAULT_FIND_REPLACE_LABELS: FindReplaceDialogLabels;
interface FindReplaceDialogProps {
    /** Mode the dialog opens in; the user can switch tabs afterwards. */
    mode: FindReplaceMode;
    rows: ReadonlyArray<Row>;
    columns: ReadonlyArray<AnyColumn>;
    /** Current selection ranges — backs the `Selection` scope. */
    selectionRanges: ReadonlyArray<SelectionRange>;
    /** Whether replace is possible (editing wired & not read-only). */
    canReplace?: boolean;
    /** Seed the find input (e.g. the active cell text). */
    initialQuery?: string;
    /** Move the grid's active cell to a match and scroll it into view. */
    onJump: (coord: CellCoord) => void;
    /** Apply a batch of replacements; returns how many cells actually changed. */
    onReplace?: (items: ReadonlyArray<ReplaceItem>) => number;
    onClose: () => void;
    labels?: Partial<FindReplaceDialogLabels>;
}
/**
 * Built-in Find & Replace modal (§9), opened by Ctrl+F / Ctrl+H. Owns the
 * query, options, scope, and result cursor; jumps the grid via `onJump` and
 * routes replacements back through `onReplace` so the grid stays the single
 * owner of mutation, coercion, undo, and protection.
 */
declare function FindReplaceDialog({ mode: initialMode, rows, columns, selectionRanges, canReplace, initialQuery, onJump, onReplace, onClose, labels: labelOverrides, }: FindReplaceDialogProps): react_jsx_runtime.JSX.Element;

/**
 * `<prefix>_YYYYMMDD_HHmm.xlsx` (PRD §11.2 "파일명 자동 생성"). Local time, not
 * UTC, so the filename matches the user's clock.
 */
declare function defaultExportFilename(prefix?: string, now?: Date): string;
/**
 * Browser-only file-save helper. Creates an object URL, dispatches a synthetic
 * click on a transient `<a>`, then revokes the URL on the next tick. No-op
 * outside a browser environment.
 */
declare function triggerBlobDownload(blob: Blob, filename: string): void;

/**
 * Serialise a `GridSnapshot` to a CSV / TSV string. RFC 4180 quoting; consumer
 * picks delimiter + line terminator + BOM. Number / string / null values
 * supported; objects are JSON-encoded so the round-trip is lossless for arrays
 * of primitives.
 */
declare function exportToCsv(snapshot: GridSnapshot, options?: CsvOptions): string;
/**
 * Parse a CSV / TSV string into the same `ImportResult` shape used by
 * `parseWorkbookToGrid`, so consumers can route both pipelines through the
 * same `<ImportDialog>` confirm step.
 */
declare function importFromCsv(text: string, options?: CsvOptions): ImportResult;

/**
 * Serialise a grid snapshot to an .xlsx Blob. ExcelJS is dynamically imported
 * so the base `xl-react` bundle stays free of the dependency for consumers
 * that never call this function.
 */
declare function exportToXlsx(snapshot: GridSnapshot, options?: ExportOptions): Promise<Blob>;
/**
 * Serialise multiple grid snapshots to a single .xlsx Blob — one sheet per
 * entry. Each entry carries its own `snapshot` plus the usual `ExportOptions`
 * (sheetName / includeHeader / range / columnIds / preserveFormat / …); entries
 * without a `sheetName` get `Sheet1`, `Sheet2`, … in order.
 *
 * Empty / single-entry input is allowed (multi-sheet collapses to single-sheet
 * behaviour), so this can replace `exportToXlsx` for callers that may end up
 * with a variable sheet count.
 */
declare function exportMultiSheetXlsx(sheets: ReadonlyArray<MultiSheetEntry>): Promise<Blob>;

/** Thrown by `importFromXlsx` when the input exceeds the configured size cap. */
declare class ImportFileTooLargeError extends Error {
    readonly byteLength: number;
    readonly limit: number;
    constructor(byteLength: number, limit: number);
}
/**
 * Parse a `.xlsx` source (`File`, `Blob`, `ArrayBuffer`, or `Uint8Array`) into
 * grid-ready rows/columns/formats. ExcelJS is dynamically imported so the base
 * `xl-react` bundle stays free of the dependency.
 *
 * The returned `sheetNames` lists every tab in the source workbook so the UI
 * layer can offer a sheet selector and re-call with `options.sheetName`.
 *
 * Inputs over `options.maxFileSizeBytes` (default 50 MB, set to `0` to
 * disable) are rejected with `ImportFileTooLargeError` before any bytes hit
 * the ExcelJS parser — guards the tab against zip-bomb / accidental huge
 * uploads.
 */
declare function importFromXlsx(source: File | Blob | ArrayBuffer | Uint8Array, options?: ImportOptions): Promise<ImportResult>;

interface ExportButtonProps extends GridSnapshot {
    /** Override the generated filename. Defaults to `defaultExportFilename()`. */
    filename?: string | (() => string);
    /** Prefix passed to `defaultExportFilename` when `filename` is not set. */
    filenamePrefix?: string;
    /** Options forwarded to `exportToXlsx`. */
    exportOptions?: ExportOptions;
    /** Button label / children; defaults to "엑셀로 내보내기". */
    children?: ReactNode;
    /** Class added on top of `xl-export-button`. */
    className?: string;
    /** Disable the button externally (also disabled while a download is mid-flight). */
    disabled?: boolean;
    /** Title attribute. */
    title?: string;
    /** Fired when the export fails (file write / serialization error). */
    onError?: (error: unknown) => void;
}
/**
 * One-click .xlsx download. Builds the workbook lazily so consumers that just
 * import the button never pay for ExcelJS at parse time.
 */
declare function ExportButton({ rows, columns, cellFormats, merges, filename, filenamePrefix, exportOptions, children, className, disabled, title, onError, }: ExportButtonProps): react_jsx_runtime.JSX.Element;

interface ImportDialogLabels {
    title: string;
    pickFilePrompt: string;
    dropPrompt: string;
    pickButton: string;
    sheet: string;
    headerRow: string;
    noHeader: string;
    preview: string;
    warnings: string;
    cancel: string;
    confirm: string;
    busy: string;
    columnMapping: string;
    columnMappingSourceColumn: string;
    columnMappingTargetId: string;
}
declare const DEFAULT_IMPORT_DIALOG_LABELS: ImportDialogLabels;
interface ImportDialogProps {
    open: boolean;
    onClose: () => void;
    /** Called with the parsed result when the user clicks "가져오기". */
    onImport: (result: ImportResult, file: File) => void;
    /** Override the dialog text. */
    labels?: Partial<ImportDialogLabels>;
}
/**
 * Staged import wizard:
 * 1. **pick**: drag / click to pick a file
 * 2. **configure**: choose sheet (when multiple) + header row + preview
 * 3. **busy**: parsing in flight (also briefly during preview re-runs)
 *
 * The dialog never owns the grid state — `onImport(result)` hands the parsed
 * `ImportResult` to the consumer who decides how to merge / replace.
 */
declare function ImportDialog({ open, onClose, onImport, labels: labelOverrides, }: ImportDialogProps): react_jsx_runtime.JSX.Element | null;

/**
 * Apply `kind` to a list of raw cell values pulled from `Row.data[field]`.
 *
 * Returns `null` for buckets the aggregator has nothing to say about:
 *   - `sum`     → no numerics
 *   - `count`   → no rows at all (zero-length input; not "no numerics")
 *   - `countA`  → no rows at all
 *   - `average` → no numerics
 *   - `max`/`min` → no numerics
 *   - `stdDev`/`variance` → fewer than two numerics (sample variance is undefined for n < 2)
 *   - `product` → no numerics (an empty product would otherwise be `1`, which
 *                 the renderer would misread as "all rows had value 1")
 *
 * `count` (the Excel COUNT) counts numeric cells. `countA` counts non-blank
 * cells regardless of type.
 *
 * Variance and standard deviation use the **sample** form (n − 1 denominator),
 * matching Excel's pivot defaults (`Var` / `StdDev`).
 */
declare function aggregate(kind: PivotAggregationKind, values: ReadonlyArray<unknown>): number | null;

/**
 * §10A — main entry. Aggregates `rows` by `config` into a matrix
 * ready to render. Pure: same inputs → same `PivotResult`, no globals.
 *
 * Algorithm:
 *   1. Filter step (§10A area "Filter") — keep only rows that pass every
 *      active filter.
 *   2. Build the row-axis grouping tree from `config.rows`, and the
 *      column-axis grouping tree from `config.columns`.
 *   3. Cross every leaf-row × leaf-column pair to determine which source
 *      rows fall into that bucket (set intersection on row indices).
 *   4. For each bucket, run `aggregate(...)` per value field over
 *      `Row.data[valueField.key]`.
 *   5. Run grand-total aggregations across whole axes (and whole table)
 *      directly against the source — never sum cell values, because
 *      `average` / `min` / `max` / `variance` / `stdDev` / `product`
 *      do not distribute over the cell partition.
 */
/**
 * §10A.6 P2 — extra options for {@link buildPivot}. `extraRowFilter` runs
 * AFTER `config.filters` and AND-combines with it, so the slicer / timeline
 * components (see `slicer.tsx`) can layer their own row predicate without
 * mutating the consumer's `PivotConfig`. `index` is the source-row index in
 * the original `rows` array — drill-down / `effectiveSourceIndices` keep the
 * caller-visible indexing scheme.
 */
interface BuildPivotOptions {
    extraRowFilter?: (row: Row, index: number) => boolean;
}
declare function buildPivot(rows: ReadonlyArray<Row>, config: PivotConfig, options?: BuildPivotOptions): PivotResult;

/**
 * §10A.6 P2 — Slicer (visual filter button panel) + Timeline (date slicer).
 *
 * Both components publish their selections to a {@link PivotSlicerScope}.
 * Every `PivotBuilder` mounted under the same scope reads the merged
 * predicate via {@link usePivotSlicerRowPredicate} and AND-combines it with
 * its own `config.filters`. The wiring lets a single slicer panel drive
 * multiple pivots simultaneously — Excel's "Report Connections" mental model
 * without manual connection lists.
 *
 * Design choices:
 *   - Scope state is held as a `Map<id, Selection>` and republished through
 *     context. Slicer/Timeline components are pure UI shells around
 *     `useSlicerState`; consumers can ignore the bundled UI and build their
 *     own controls that publish through the same hook.
 *   - When a row lacks the slicer's `field`, the predicate passes it through
 *     (does NOT drop it). This avoids accidentally wiping pivots that share a
 *     scope but were never meant to be filtered (different data source);
 *     consumers needing strict matching should use separate scopes.
 *   - Timeline range is half-open `[startMs, endMs)` so successive zoom-unit
 *     buckets compose without double-counting boundary rows. Buckets render
 *     their human label from the start instant.
 */

/** Allow-set selection produced by {@link PivotSlicer}. */
interface CategoricalSelection {
    readonly kind: 'categorical';
    /** Source-row data key the predicate compares against. */
    readonly field: string;
    /**
     * `undefined` (or omitted from the scope map) = pass all. Non-undefined =
     * keep only rows whose `String(row.data[field])` is in this set.
     * Empty set explicitly means "nothing passes" so the user sees an empty
     * pivot when they deselect everything (Excel parity).
     */
    readonly selectedKeys: ReadonlySet<string>;
}
/** Date-range selection produced by {@link PivotTimeline}. */
interface TimelineSelection {
    readonly kind: 'timeline';
    readonly field: string;
    /** Half-open `[startMs, endMs)`. Omit to clear the range. */
    readonly range?: {
        readonly startMs: number;
        readonly endMs: number;
    };
}
type SlicerSelection = CategoricalSelection | TimelineSelection;
interface PivotSlicerScopeValue {
    /** Snapshot of every slicer's current state. Keyed by slicer id. */
    readonly selections: ReadonlyMap<string, SlicerSelection>;
    /** Publish (or `null` to clear) the selection for a slicer id. */
    setSelection(id: string, selection: SlicerSelection | null): void;
}
/**
 * Wraps a subtree so every `PivotBuilder` (and slicer / timeline) inside
 * shares the same selection registry. Outside a scope, `PivotBuilder` reads
 * a `null` context and behaves as before (no extra filtering).
 */
declare function PivotSlicerScope({ children }: {
    children: ReactNode;
}): ReactElement;
/**
 * Returns the merged row predicate for every active slicer in scope.
 * Outside a scope (no provider above the consumer), returns `null` so the
 * consumer can skip the predicate entirely — avoids an extra `useMemo`
 * dependency change on every render.
 */
declare function usePivotSlicerRowPredicate(): ((row: Row, index: number) => boolean) | null;
/**
 * Lower-level access to the scope. Most consumers won't need this — the
 * bundled `PivotSlicer` / `PivotTimeline` components are the supported way to
 * publish selections. Exported so unit tests and custom controls can drive
 * the same registry.
 */
declare function usePivotSlicerScope(): PivotSlicerScopeValue | null;
interface PivotSlicerLabels {
    /** Heading shown above the chip grid. Defaults to the `title` prop or `field`. */
    title?: string;
    /** "(공백)" placeholder shown for null / undefined / empty-string values. */
    blank?: string;
    /** "전체" toggle that selects every option. */
    selectAll?: string;
    /** "모두 해제" toggle that deselects every option (empty pivot). */
    clearAll?: string;
    /** "필터 해제" — clears the slicer entirely so it stops filtering. */
    reset?: string;
}
interface PivotSlicerProps {
    /** Source-row data key the slicer filters by. */
    field: string;
    /** Source rows — enumerated for the option list. */
    rows: ReadonlyArray<Row>;
    /**
     * Stable id for this slicer within the scope. Defaults to `field`. Use an
     * explicit id when two slicers in the same scope filter the same field
     * differently (rare).
     */
    id?: string;
    /** Title shown above the chip grid. Defaults to the field key. */
    title?: string;
    labels?: PivotSlicerLabels;
    className?: string;
    /**
     * Cap on enumerated options. Sources with thousands of distinct values
     * would otherwise grind the panel; the cap silently truncates the option
     * list (first N values, in source order). Defaults to 200.
     */
    maxOptions?: number;
}
/**
 * §10A.6 P2 — visual filter button panel. Renders the unique source values
 * for `field` as toggle chips; the selection publishes to the enclosing
 * {@link PivotSlicerScope} so every pivot in scope filters together.
 */
declare function PivotSlicer(props: PivotSlicerProps): ReactElement;
declare const TIMELINE_UNITS: readonly ["year", "quarter", "month"];
type TimelineUnit = (typeof TIMELINE_UNITS)[number];
interface PivotTimelineLabels {
    title?: string;
    zoomLabel?: string;
    reset?: string;
    /** Empty-state message when no rows yielded a parseable date. */
    empty?: string;
    /** Aria description prefix for each bucket button (`"{prefix} {label}"`). */
    bucketAriaPrefix?: string;
}
interface PivotTimelineProps {
    /** Source-row data key holding the date (Date instance, ISO string, or epoch ms). */
    field: string;
    rows: ReadonlyArray<Row>;
    /** Slicer id within the scope. Defaults to `field`. */
    id?: string;
    /** Title shown above the bucket strip. Defaults to the field key. */
    title?: string;
    /** Initial zoom unit. Defaults to `'month'`. */
    initialUnit?: TimelineUnit;
    labels?: PivotTimelineLabels;
    className?: string;
}
/**
 * §10A.6 P2 — date-range slicer with year / quarter / month zoom.
 *
 * Buckets the source rows' `field` values into the chosen unit, renders one
 * button per bucket, and lets the user click (or shift-click) to set the
 * inclusive bucket range. The published range is `[firstBucket.start,
 * lastBucket.end)` so the predicate stays half-open and successive buckets
 * compose without double-counting.
 */
declare function PivotTimeline(props: PivotTimelineProps): ReactElement;

/**
 * §10A.9 P1 — "Show Details" / drill-down helpers.
 *
 * The pivot grid surfaces a body cell as `(gridRow, gridCol)` once the engine
 * + adapter have flattened the result. This module reverses that flattening:
 *
 *   1. `pivotDrillDownAt(snapshot, gridRow, gridCol)` looks up which kind of
 *      cell a given grid coord is (body / subtotal / grand-total) and returns
 *      a {@link PivotDrillDownTarget} describing it.
 *   2. `resolvePivotDrillDown(target, result)` resolves the target against a
 *      `PivotResult` to produce the source-row indices behind the cell.
 *
 * Consumers (PivotBuilder's double-click handler, the standalone
 * "Show Details" API) compose the two so user actions on the rendered grid
 * end up holding `ReadonlyArray<number>` indices into the original `rows`.
 */

/** Discriminator for the five cell families a drill-down can land on. */
type PivotDrillDownKind = 'body' | 'subtotal' | 'grandTotalRow' | 'grandTotalColumn' | 'grandTotal';
/**
 * Lightweight, snapshot-stored cell descriptor — does NOT yet carry the
 * source-row indices. Pair with `resolvePivotDrillDown` to get the full
 * source list against the engine's `PivotResult`.
 *
 *   - `body`:               (rowLeafIndex, columnLeafIndex, valueFieldIndex)
 *   - `subtotal`:           (subtotalIndex, columnLeafIndex, valueFieldIndex)
 *   - `grandTotalRow`:      (columnLeafIndex, valueFieldIndex), no row leaf
 *   - `grandTotalColumn`:   (rowLeafIndex, valueFieldIndex), no column leaf
 *   - `grandTotal`:         (valueFieldIndex) only
 */
interface PivotDrillDownTarget {
    kind: PivotDrillDownKind;
    rowLeafIndex: number | null;
    columnLeafIndex: number | null;
    valueFieldIndex: number;
    /** Index into `PivotResult.rowSubtotals`. Present iff `kind === 'subtotal'`. */
    subtotalIndex?: number;
}
/** Resolved drill-down — the target plus the source rows it represents. */
interface PivotDrillDownDetails extends PivotDrillDownTarget {
    /** Indices into the original `rows` array passed to {@link buildPivot}. */
    sourceRowIndices: ReadonlyArray<number>;
    /** Row path from root to leaf; `[]` for grand-total-row / grand-total. */
    rowPath: ReadonlyArray<{
        field: string;
        value: unknown;
    }>;
    /** Column path from root to leaf; `[]` for grand-total-column / grand-total. */
    columnPath: ReadonlyArray<{
        field: string;
        value: unknown;
    }>;
    /** Value-field descriptor for the cell (`valueFields[valueFieldIndex]`). */
    valueField: PivotResult['valueFields'][number];
}
/**
 * Look up the drill-down descriptor for a grid coord. Returns `null` when the
 * coord lands on a header / row-label / column-label / corner cell (anywhere
 * outside the body / subtotal / grand-total regions). The snapshot must be
 * the one produced by {@link pivotResultToGrid} for the same `PivotResult`
 * the caller will pass to {@link resolvePivotDrillDown} — they share the
 * `(rowLeafIndex, columnLeafIndex, valueFieldIndex)` indexing scheme.
 */
declare function pivotDrillDownAt(snapshot: PivotGridSnapshot, gridRow: number, gridCol: number): PivotDrillDownTarget | null;
/**
 * Stringify a `(row, col)` pair for the drill-down lookup map. Single source
 * of truth so adapter + consumer agree on the key format.
 */
declare function drillDownKey(row: number, col: number): string;
/**
 * Resolve a target against the engine's `PivotResult` to get the source-row
 * indices behind the cell. Pure function — caller decides what to do with the
 * indices (typically: slice the original `rows` array and render in a new
 * `<XlReact>` grid).
 *
 * Resolution rules per `kind`:
 *   - `body`               — `rowLeaf ∩ columnLeaf`.
 *   - `grandTotalRow`      — `columnLeaf ∩ effective` (every visible row).
 *   - `grandTotalColumn`   — `rowLeaf ∩ effective` (every visible column).
 *   - `grandTotal`         — `effective` itself.
 *   - `subtotal`           — union of leaves in the subtotal's range,
 *                            intersected with `columnLeaf` (or `effective` for
 *                            the subtotal's grand-total-column slice).
 */
declare function resolvePivotDrillDown(target: PivotDrillDownTarget, result: PivotResult): PivotDrillDownDetails;
/**
 * Convenience: resolve to actual `Row` objects (not just indices) in the
 * order they appear in the source. Skips entries whose index falls outside
 * `rows.length` (defensive — should not happen against a fresh result).
 */
declare function pivotDrillDownRows(target: PivotDrillDownTarget, result: PivotResult, rows: ReadonlyArray<Row>): {
    details: PivotDrillDownDetails;
    rows: ReadonlyArray<Row>;
};

/** Pre-formatted, ready-to-feed-to-`<XlReact>` view of a pivot result. */
interface PivotGridSnapshot {
    columns: AnyColumn[];
    rows: Row[];
    /**
     * Number of header rows the grid should freeze (column-axis depth + the
     * optional value-header row).
     */
    freezeRowCount: number;
    /** Number of row-header columns the grid should freeze. */
    freezeColCount: number;
    /**
     * Optional merge ranges suggesting Excel-style header span — pass straight
     * to `<XlReact merges>`. Cells inside a merge still keep their underlying
     * `data[colId]`; only the anchor's value renders.
     */
    merges: SelectionRange[];
    /**
     * §10A.9 P1 — `(gridRow, gridCol)` → drill-down descriptor for every body /
     * subtotal / grand-total value cell. Use `pivotDrillDownAt(snapshot, ...)`
     * to query; pair with `resolvePivotDrillDown(target, result)` to get the
     * source-row indices. Header / row-label / corner cells aren't in the map
     * (lookup returns `null`).
     */
    drillDown: ReadonlyMap<string, PivotDrillDownTarget>;
    /**
     * §10A.7 P2 — formats for built-in pivot style preset / banded rows / banded
     * columns. Forwarded to `<XlReact cellFormats>`. Consumer-supplied formats
     * win where keys collide (set them downstream from the snapshot pass).
     * `null` when no styling is active; `undefined` when the snapshot was built
     * by a pre-§10A.7 P2 call (defensive — current callers always populate).
     */
    cellFormats?: CellFormatsMap | null;
    /**
     * §10A.5 P2 / §10A.9 P2 — for every row-axis group node that has at least
     * one leaf descendant, the `(depth, pathKey)` pair that consumers can flip
     * into {@link PivotGridAdapterOptions.collapsedRowGroupKeys} to collapse
     * that group. Adapter publishes this so callers can build their UI without
     * re-walking `result.rowHeaders` themselves. Empty when the row axis has
     * fewer than two fields (no non-leaf groups exist).
     */
    collapsibleRowGroups: ReadonlyArray<{
        /** 0-based depth in the row tree (0 = outermost, `rows.length-1` = leaf). */
        depth: number;
        /** Path key as produced by {@link pivotRowGroupKey}. */
        pathKey: string;
        /** First (inclusive) leaf-row index the group spans. */
        leafFrom: number;
        /** Last (inclusive) leaf-row index the group spans. */
        leafTo: number;
    }>;
}
/**
 * §10A.7 P2 / §10A.5 P2 / §10A.9 P2 — optional adapter knobs that don't
 * belong on `PivotConfig` because they're consumer UI state, not engine
 * input. Pass alongside `labels` / `layout` when calling
 * {@link pivotResultToGrid}.
 */
interface PivotGridAdapterOptions {
    /**
     * §10A.5 P2 / §10A.9 P2 — keys of row-axis groups the user has collapsed.
     * Build each key via {@link pivotRowGroupKey} on the group's path prefix
     * (matching one of the entries in {@link PivotGridSnapshot.collapsibleRowGroups}).
     * Collapsed groups hide every descendant leaf row and replace them with
     * the group's subtotal row (forced — even when `layout.subtotalPosition`
     * would otherwise hide it).
     */
    collapsedRowGroupKeys?: ReadonlySet<string>;
}
interface PivotGridLabels {
    /** Used for the top-left blank rectangle's first cell. */
    corner?: string;
    /** Label for the grand-total row's leading cell. */
    grandTotalRow?: string;
    /** Label for the grand-total column's header. */
    grandTotalColumn?: string;
    /**
     * §10A.7 P1 — suffix appended to a row-subtotal's parent label, e.g. given
     * the label `'부산'` the subtotal cell reads `'부산 합계'`. Set to an empty
     * string to drop the suffix entirely.
     */
    subtotalSuffix?: string;
}
/**
 * §10A — adapt a {@link PivotResult} into a controlled snapshot the existing
 * {@link XlReact} grid can render directly. This gives pivots the same UX as
 * the rest of the library — cell selection, keyboard navigation, clipboard,
 * status bar, zoom, freeze panes — without a parallel rendering path.
 *
 * Layout produced:
 *   - Row 0..N-1 : column-axis headers (one row per column-axis depth).
 *   - Row N      : value-field header (only when the engine emitted it).
 *   - Row N+1..  : body rows.
 *   - Last row   : grand-total row (when present).
 *   - Column 0..M-1 : row-axis headers (one column per row-axis depth, or one
 *                     stub column for column-only pivots).
 *   - Column M..    : body value cells, columnLeaf × valueField in matrix order.
 *   - Last columns  : grand-total column cells (when present).
 *
 * Cell values:
 *   - Header cells store plain strings (the column / value labels).
 *   - Body cells store the raw `number | null` from the matrix.
 *   - The default column renderer formats numbers via `Intl.NumberFormat` and
 *     leaves strings as-is, so the grid auto-formats numerics without the
 *     consumer wiring `cellFormats`.
 *
 * The grand-total row label is anchored in column 0 and a merge range spans
 * the row-header column block so the label reads as "총합계 ─────".
 */
declare function pivotResultToGrid(result: PivotResult, labels?: PivotGridLabels, layout?: PivotLayoutOptions, adapterOptions?: PivotGridAdapterOptions): PivotGridSnapshot;

interface PivotBuilderLabels extends PivotGridLabels {
    /** Shown when no row / column / value field is configured yet. */
    empty?: string;
    fieldListTitle?: string;
    rowAreaTitle?: string;
    columnAreaTitle?: string;
    valueAreaTitle?: string;
    filterAreaTitle?: string;
    refreshButton?: string;
    grandTotalRowToggle?: string;
    grandTotalColumnToggle?: string;
    defaultAggregation?: string;
    /** Label for the per-value-chip "값 표시 형식" dropdown (§10A.4). */
    valueDisplayLabel?: string;
    emptyArea?: string;
    /** §10A.5 — header text for the grouping popover on row/column chips. */
    groupingPopoverTitle?: string;
    groupingDateLegend?: string;
    groupingNumberLegend?: string;
    groupingNoneOption?: string;
    groupingBinSizeLabel?: string;
    groupingBinOriginLabel?: string;
    groupingApplyButton?: string;
    groupingClearButton?: string;
    groupingCancelButton?: string;
    groupingNotSupported?: string;
    /** §10A.6 — header text + section legends for the sort/filter popover. */
    sortFilterPopoverTitle?: string;
    sortLegend?: string;
    sortNoneOption?: string;
    sortValueFieldLabel?: string;
    sortManualReorderHint?: string;
    labelFilterLegend?: string;
    labelFilterNoneOption?: string;
    labelFilterIncludeOption?: string;
    labelFilterTextOption?: string;
    labelFilterNumberOption?: string;
    labelFilterDateOption?: string;
    labelFilterPatternLabel?: string;
    labelFilterNumberValueLabel?: string;
    labelFilterDateValueLabel?: string;
    valueFilterLegend?: string;
    valueFilterAxisHint?: string;
    valueFilterNoneOption?: string;
    valueFilterTopOption?: string;
    valueFilterBottomOption?: string;
    valueFilterAboveAverageOption?: string;
    valueFilterBelowAverageOption?: string;
    valueFilterThresholdOption?: string;
    valueFilterNLabel?: string;
    valueFilterThresholdLabel?: string;
    /** §10A.7 P1 — section header + per-control labels for the layout panel. */
    layoutSectionTitle?: string;
    subtotalPositionLabel?: string;
    reportLayoutLabel?: string;
    emptyCellDisplayLabel?: string;
    /** Placeholder dropdown options for the "빈 셀 표시값" select. */
    emptyCellDisplayBlankOption?: string;
    emptyCellDisplayZeroOption?: string;
    emptyCellDisplayDashOption?: string;
    /** §10A.7 P2 — repeat-labels / banded-rows / banded-columns / style preset labels. */
    repeatItemLabelsToggle?: string;
    bandedRowsToggle?: string;
    bandedColumnsToggle?: string;
    stylePresetLabel?: string;
    /** §10A.4 P2 — axis label for calc-family value display modes. */
    valueDisplayAxisLabel?: string;
    /** §10A.3 P2 — value-chip duplicate-button affordance label. */
    duplicateValueChip?: string;
    /** §10A.5 P2 — manual grouping popover labels. */
    manualGroupButton?: string;
    manualGroupPopoverTitle?: string;
    manualGroupLabelLabel?: string;
    manualGroupValuesLabel?: string;
    manualGroupValuesHint?: string;
    manualGroupAddButton?: string;
    manualGroupRemoveButton?: string;
    manualGroupApplyButton?: string;
    manualGroupClearButton?: string;
    manualGroupCancelButton?: string;
    /** §10A.5 P2 / §10A.9 P2 — collapse/expand panel labels. */
    collapsePanelTitle?: string;
    collapsePanelHint?: string;
    collapseAllButton?: string;
    expandAllButton?: string;
    collapseToggleCollapsed?: string;
    collapseToggleExpanded?: string;
    /** §10A.9 P2 — drill up / drill down buttons. */
    drillUpButton?: string;
    drillUpHint?: string;
    /** §10A.9 P1 — labels for the "Show Details" drill-down modal. */
    detailsTitle?: string;
    detailsCloseButton?: string;
    detailsEmpty?: string;
    detailsRowCount?: (count: number) => string;
}
interface PivotBuilderProps {
    rows: ReadonlyArray<Row>;
    /** Fields the user can drag into the pivot. */
    availableFields: ReadonlyArray<PivotAvailableField>;
    /** Optional initial layout. */
    initialConfig?: Partial<PivotConfig>;
    /** Fired whenever the layout or grand-total flags change. */
    onConfigChange?: (config: PivotConfig) => void;
    labels?: PivotBuilderLabels;
    className?: string;
    /**
     * Optional explicit pixel height for the result grid. When omitted, the
     * builder stretches to fill its parent (the parent must constrain height
     * for `<XlReact>` to size itself; see the demo's `.demo-grid` wrapper).
     */
    gridHeight?: number;
    /**
     * §10A.9 P1 — when set, intercepts the value-cell double-click instead of
     * opening the built-in modal. The receiver can route the drill-down rows
     * into a separate sheet/tab or its own dialog. Returns nothing — the
     * builder doesn't wait on it.
     */
    onShowDetails?: (details: PivotDrillDownDetails, rows: ReadonlyArray<Row>) => void;
    /**
     * §10A.9 P1 — disables the built-in "Show Details" modal entirely. Pair
     * with `onShowDetails` when the consumer wants drill-down delegation but
     * not the bundled dialog.
     */
    disableShowDetails?: boolean;
    /**
     * §10A.8 P2 — auto-refresh cadence. When set, the pivot recomputes every
     * `autoRefreshIntervalMs` milliseconds. When inside a `PivotRefreshScope`
     * the timer fans out to every sibling pivot via `refreshAll`. Setting `0`
     * / `null` / omitting disables the timer.
     */
    autoRefreshIntervalMs?: number | null | undefined;
    /**
     * §10A.8 P2 — when `true`, fires an initial refresh on mount (Excel's
     * "Refresh data when opening the file" toggle). Defaults to `false`.
     */
    refreshOnMount?: boolean | undefined;
}
/**
 * §10A — 4-area pivot builder. Manages a `PivotConfig` over the four drop
 * zones (Row / Column / Value / Filter) and a checkbox-driven field list, and
 * renders the resulting `PivotResult` through the standard {@link XlReact}
 * grid so users get the same selection / keyboard / clipboard / status-bar
 * UX as the rest of the library — there is no separate pivot rendering path.
 *
 * State lives entirely inside the component — there's no controlled-config
 * prop yet because the MVP doesn't need round-tripping with external state.
 * The optional `onConfigChange` callback is fire-and-forget for telemetry /
 * persistence.
 *
 * Drag-drop uses the native HTML5 API (no external lib) — a field chip in
 * any zone (including the available list) is `draggable`, and each drop zone
 * accepts drops that target either that area or the trash icon ✕.
 *
 * Known DnD limitations (intentional MVP shape):
 *   - No touch / pointer-event fallback — desktop drag only. A keyboard /
 *     touch reorder UI is tracked as a follow-up.
 *   - No insertion-point indicator — drops always land at the end of an area
 *     (mid-area reorders happen by drag-and-drop to a new area, then back).
 *   - No drop-target ARIA live-region announcements.
 *
 * "새로 고침" (§10A.8 Refresh) is wired by incrementing a `refreshNonce` that
 * forces the `useMemo` for `result` to recompute. In Excel terms this matters
 * when the source rows are mutable behind the consumer — `buildPivot` is pure,
 * so the recompute will pick up any new data without changing the config.
 */
declare function PivotBuilder({ rows, availableFields, initialConfig, onConfigChange, labels, className, gridHeight, onShowDetails, disableShowDetails, autoRefreshIntervalMs, refreshOnMount, }: PivotBuilderProps): ReactElement;

/**
 * §10A.8 P1 — "모두 새로 고침" (refresh all) coordination.
 *
 * Each {@link PivotBuilder} already exposes its own "새로 고침" button that
 * forces a recompute against its current source rows. When several pivots
 * live on the same page and all draw from the same mutable data source, the
 * user wants a single action to fan out across them.
 *
 * Wrap the subtree containing the pivots in a {@link PivotRefreshScope}; the
 * scope publishes a monotonically increasing `nonce` through context, and
 * each `PivotBuilder` consumes it as an additional `useMemo` dependency so a
 * shared bump forces every pivot to rebuild. Components outside a scope work
 * as before — the consumer hook returns a no-op nonce and the local refresh
 * button keeps working.
 *
 * Usage:
 *   ```tsx
 *   <PivotRefreshScope>
 *     <RefreshAllButton />
 *     <PivotBuilder ... />
 *     <PivotBuilder ... />
 *   </PivotRefreshScope>
 *
 *   function RefreshAllButton() {
 *     const refreshAll = usePivotRefreshAll();
 *     return <button onClick={refreshAll}>모두 새로 고침</button>;
 *   }
 *   ```
 */

/** Provider — wraps a subtree that should share a single "refresh all" trigger. */
declare function PivotRefreshScope({ children }: {
    children: ReactNode;
}): ReactElement;
/**
 * Returns the action that triggers a fan-out refresh of every PivotBuilder
 * in the enclosing {@link PivotRefreshScope}. Outside a scope this returns a
 * no-op so the call site doesn't have to special-case the unwrapped tree.
 */
declare function usePivotRefreshAll(): () => void;
/**
 * §10A.8 P2 — auto-refresh hook. Wires a periodic timer into the enclosing
 * {@link PivotRefreshScope} so every pivot in scope recomputes on the
 * configured cadence. Mirrors Excel's "Refresh data every N minutes" pivot
 * option.
 *
 * Behavior:
 *   - `intervalMs <= 0` / `null` / `undefined`  — disables the timer.
 *   - `refreshOnMount` (default `false`)        — also fires once when the
 *                                                  hook mounts (Excel's
 *                                                  "Refresh data when opening
 *                                                  the file" toggle).
 *   - Works outside a scope (the underlying `usePivotRefreshAll` is a no-op
 *     there, so the timer fires but no pivot re-renders).
 *
 * Place the hook in a component that lives inside {@link PivotRefreshScope}
 * (the same place you'd render `<RefreshAllButton />`).
 */
declare function usePivotAutoRefresh(intervalMs: number | null | undefined, options?: {
    refreshOnMount?: boolean;
}): void;

/**
 * Pluggable source of pivot input rows. The `rows` snapshot is read on every
 * render; `subscribe` lets consumers (the {@link useRowSource} hook) react to
 * mutations without polling.
 *
 * Implementations must guarantee:
 *   - `rows` returns the SAME reference until the source actually mutates, so
 *     downstream `useMemo` deps stay stable across cosmetic re-renders.
 *   - `subscribe` returns an unsubscribe function. Multiple listeners are
 *     supported.
 *   - Listeners are notified AFTER the new `rows` reference is observable
 *     (callers reading `source.rows` inside the listener see the new array).
 */
interface RowSource {
    /** Current snapshot of source rows. Stable until the source mutates. */
    readonly rows: ReadonlyArray<Row>;
    /**
     * Subscribe to source mutations. Returns an unsubscribe handle. Static
     * sources may return a no-op (their `rows` never change).
     */
    subscribe(listener: () => void): () => void;
}
/** Type guard for {@link RowSource} (vs a raw `ReadonlyArray<Row>`). */
declare function isRowSource(value: unknown): value is RowSource;
/**
 * Wraps an existing `ReadonlyArray<Row>` as a {@link RowSource}. `subscribe`
 * is a no-op because the underlying array never mutates from this source's
 * perspective — consumers that need live updates should use
 * {@link dynamicRowSource} or build their own implementation.
 *
 * Useful when a consumer already has the data in hand and just wants the
 * pivot API surface to be `RowSource`-uniform (e.g. mixing static + dynamic
 * sources inside {@link combinedRowSource}).
 */
declare function staticRowSource(rows: ReadonlyArray<Row>): RowSource;
/**
 * Mutable, in-memory {@link RowSource}. Every mutation produces a fresh
 * `rows` array reference (snapshot semantics — consumers reading the
 * pre-mutation reference keep their stable view) and notifies every
 * subscriber.
 *
 * Use cases:
 *   - The consumer keeps the canonical list and wants pivots to react.
 *   - Test fixtures need a programmatic mutation path that mirrors how a
 *     real grid would push rows in.
 */
interface DynamicRowSource extends RowSource {
    /** Append one or many rows to the tail of the source. */
    add(row: Row | ReadonlyArray<Row>): void;
    /**
     * Remove every row matching the predicate. Returns the count removed so
     * callers can act on "did anything change". Order of remaining rows is
     * preserved.
     */
    remove(predicate: (row: Row, index: number) => boolean): number;
    /**
     * Replace one or many rows in place using `updater`. Returns the count
     * updated. Use this instead of `remove` + `add` when you want to keep the
     * row's position stable.
     */
    setRow(predicate: (row: Row, index: number) => boolean, updater: (row: Row) => Row): number;
    /** Swap the entire backing list. Notifies listeners exactly once. */
    replace(rows: ReadonlyArray<Row>): void;
    /** Reset to an empty list. Notifies listeners (no-op when already empty). */
    clear(): void;
}
/**
 * Create a {@link DynamicRowSource} seeded with `initial` (defaults to
 * empty). The returned object owns its internal array — every mutation
 * produces a fresh snapshot, so React consumers via {@link useRowSource}
 * pick up changes without tearing.
 */
declare function dynamicRowSource(initial?: ReadonlyArray<Row>): DynamicRowSource;
/**
 * Async / remote {@link RowSource}. Wraps a `fetcher` (e.g. a DB query, fetch
 * to an HTTP endpoint, or a Promise-returning RPC) into the same `RowSource`
 * shape as the in-memory sources. Until the first fetch resolves the source
 * exposes the provided `initialRows` (defaults to empty) so the pivot renders
 * an empty result instead of throwing.
 *
 * Lifecycle:
 *   - Construction is synchronous. The fetcher fires once immediately so the
 *     first paint after mount already has the live result (the caller can
 *     opt out by passing `initialRows` and not awaiting the first fetch).
 *   - `refetch()` triggers a manual reload. Errors thrown by the fetcher are
 *     forwarded to `options.onError` (when provided) and silently dropped
 *     otherwise — the source keeps its previous snapshot in that case.
 *   - `setIntervalMs(ms)` switches polling cadence on the fly. `null` / `0`
 *     stops polling. Multiple successive calls debounce safely.
 *   - `dispose()` clears the polling timer and removes every listener. Call
 *     this on unmount of a long-lived owner.
 *
 * Compared to {@link dynamicRowSource}: this source is "pull" — every snapshot
 * comes from the fetcher. Use it for DB-backed pivots and remote feeds; use
 * {@link dynamicRowSource} when the consumer holds the canonical list locally.
 */
interface AsyncRowSource extends RowSource {
    /** Manually re-run the fetcher and publish the result (`replace` semantics). */
    refetch(): Promise<void>;
    /** Adjust polling cadence (`null` / `0` disables). */
    setIntervalMs(ms: number | null | undefined): void;
    /** Stop polling, drop every listener — call on owner unmount. */
    dispose(): void;
}
interface AsyncRowSourceOptions {
    /** Snapshot exposed until the first fetch resolves. Defaults to `[]`. */
    initialRows?: ReadonlyArray<Row>;
    /**
     * Polling cadence in ms. `null` / `0` / omitted disables polling.
     *
     * This timer governs **data fetching** cadence — every tick refetches and
     * publishes a new snapshot. For pure **computation** refresh of pivots that
     * share a `PivotRefreshScope` (i.e. recompute against the same rows on a
     * timer), use `usePivotAutoRefresh(intervalMs)` instead. Combining both at
     * the same cadence is redundant: the data fetch already invalidates the
     * pivot through the snapshot subscription, so an additional refresh-scope
     * tick just doubles the recompute work.
     */
    intervalMs?: number | null;
    /**
     * Skip the immediate fetch-on-construct. The source starts with
     * `initialRows`; the caller must invoke `refetch()` (or wait for the poll
     * timer) to populate it. Defaults to `false`.
     */
    manual?: boolean;
    /**
     * Error sink for fetcher failures. Without this hook, errors are dropped
     * (the source keeps its previous snapshot). Provide one to surface load
     * failures via your app's error toast / log pipeline.
     */
    onError?: (error: unknown) => void;
}
/**
 * Create an {@link AsyncRowSource} that hydrates from `fetcher`. The fetcher
 * may return a sync `ReadonlyArray<Row>` (handy for tests) or a Promise of
 * one (the production path).
 */
declare function asyncRowSource(fetcher: () => ReadonlyArray<Row> | Promise<ReadonlyArray<Row>>, options?: AsyncRowSourceOptions): AsyncRowSource;
/**
 * Compose multiple {@link RowSource}s into one virtual source. The combined
 * `rows` array is the concatenation of every input source's snapshot, in the
 * order they were passed. Every input's `subscribe` is fanned through to the
 * combined listener pool, so a mutation on any input triggers a single
 * notification on the output.
 *
 * Models the "외부 데이터 (다른 그리드)" case — a pivot fed by the union of
 * two grids' rows, where each grid keeps its own `dynamicRowSource` and
 * pushes its own rows in independently.
 *
 * `dispose()` unsubscribes from every input but does not dispose them — the
 * caller still owns the individual sources.
 */
interface CombinedRowSource extends RowSource {
    /** Unsubscribe from every input source. Sources themselves are NOT disposed. */
    dispose(): void;
}
declare function combinedRowSource(...sources: ReadonlyArray<RowSource>): CombinedRowSource;
/**
 * React hook — subscribe to a {@link RowSource} and return its live `rows`
 * array. Re-renders the consumer whenever the source notifies a mutation.
 * Accepts a raw `ReadonlyArray<Row>` too, in which case the array is
 * returned as-is (handy for components that accept either shape).
 *
 * Usage:
 *   ```tsx
 *   const source = useMemo(() => dynamicRowSource(seedRows), []);
 *   const rows = useRowSource(source);
 *   return <PivotBuilder rows={rows} availableFields={…} />;
 *   ```
 *
 * The hook uses `useSyncExternalStore` to stay safe under React 18's
 * concurrent rendering — listeners and snapshots are read in a single
 * coherent pass so the pivot never observes a half-mutated source.
 */
declare function useRowSource(source: RowSource | ReadonlyArray<Row>): ReadonlyArray<Row>;
/**
 * Convenience React hook — seed a {@link DynamicRowSource} once and keep it
 * stable across renders. Equivalent to
 * `useMemo(() => dynamicRowSource(initial), [])`, but reads more obviously
 * at the call site (`const source = useDynamicRowSource(seedRows)`).
 *
 * Pair with {@link useRowSource} to get the live `rows` array:
 *
 *   ```tsx
 *   const source = useDynamicRowSource(seedRows);
 *   const rows = useRowSource(source);
 *   return <PivotBuilder rows={rows} ... />;
 *   ```
 *
 * The `initial` argument is only read on the first render — later changes
 * are ignored. Use `source.replace(newRows)` to swap the backing list.
 */
declare function useDynamicRowSource(initial?: ReadonlyArray<Row>): DynamicRowSource;
/**
 * Convenience React hook — construct an {@link AsyncRowSource} once and call
 * `dispose()` automatically on unmount. The polling timer and listener pool
 * are torn down with the host component, which eliminates the most common
 * `asyncRowSource` footgun (a `setInterval` outliving its owner).
 *
 * The `fetcher` is captured in a ref so consumers may pass a fresh function
 * each render without resetting the source — every refetch (manual or
 * scheduled) calls the latest closure. `options` is read only on the first
 * render; use `source.setIntervalMs(ms)` to change polling cadence at
 * runtime.
 *
 *   ```tsx
 *   const source = useAsyncRowSource(() => fetch('/api/rows').then(r => r.json()), {
 *     intervalMs: 30_000,
 *     onError: showToast,
 *   });
 *   const rows = useRowSource(source);
 *   return <PivotBuilder rows={rows} ... />;
 *   ```
 */
declare function useAsyncRowSource(fetcher: () => ReadonlyArray<Row> | Promise<ReadonlyArray<Row>>, options?: AsyncRowSourceOptions): AsyncRowSource;

/**
 * §10A.10 P2 — Pivot chart (막대 / 선 / 원형).
 *
 * Renders a pivot's aggregated values as a self-contained SVG chart. The
 * component shares the same row → config → buildPivot flow as PivotBuilder so
 * it transparently picks up:
 *   - the slicer / timeline predicate published into a `PivotSlicerScope`
 *     (visual filter components fan out to charts the same way they fan out
 *     to pivots), AND
 *   - the "모두 새로 고침" nonce published into a `PivotRefreshScope` (the
 *     shared "refresh all" toolbar drives the chart too).
 *
 * Design choices:
 *   - No external chart library. The slicer/timeline siblings are pure UI
 *     shells around hooks, and recharts/visx would dwarf the rest of the
 *     library's bundle. Pure SVG keeps tree-shaking, styling, and the dep
 *     graph identical to the existing pivot surface.
 *   - One series per chart (single value field). Multi-series charts get
 *     ambiguous fast on bar/line/pie and are out of scope for the P2 task.
 *   - Categories come from one axis (row leaves by default; column leaves on
 *     opt-in). The other axis is collapsed to its grand-total aggregate per
 *     leaf — exactly the number Excel writes on the "총합계" row/column. That
 *     keeps non-distributive aggregates (`average`, `min`, `max`, …) honest:
 *     we read the aggregate from the engine instead of summing display cells.
 *   - The headless `pivotResultToChartSeries` helper is exported so consumers
 *     with their own chart library can reuse the picker without taking on the
 *     SVG renderer.
 */

/** §10A.10 P2 — chart kinds. */
type PivotChartKind = 'bar' | 'line' | 'pie';
/** Which pivot axis the chart consumes as its category list. */
type PivotChartCategoryAxis = 'row' | 'column';
/**
 * One series datum. Bar/line render `value === null` as a gap (no bar / line
 * break); pie drops null and non-positive slices because a "negative slice"
 * has no geometric meaning.
 */
interface PivotChartSeriesPoint {
    /** Display label assembled from the axis path (`/` between levels). */
    readonly label: string;
    /** Aggregated value from the engine, or `null` for an empty bucket. */
    readonly value: number | null;
}
interface PivotChartLabels {
    /** Empty-state hint when no rows survive the filter / no value field. */
    empty?: string;
    /** Title hint shown only when consumers pass `title=undefined` (the default chart title). */
    defaultTitle?: string;
}
interface PivotChartProps {
    /** Source rows — same shape `PivotBuilder` consumes. */
    rows: ReadonlyArray<Row>;
    /**
     * Pivot specification. The chart uses the engine's grand-total aggregates,
     * so the consumer's `showGrandTotal*` toggles do NOT affect the chart values
     * — the component forces both totals on internally before reading them. The
     * sibling PivotBuilder (or any other consumer) keeps the user's toggles.
     *
     * Reference stability matters: this prop participates in the `useMemo` dep
     * array that drives `buildPivot`. Inline literals (`config={{ ... }}` in
     * JSX) re-render every parent tick and force a fresh pivot computation.
     * Hold it in `useState`, `useMemo`, or a module constant — same contract as
     * `PivotBuilder`'s `initialConfig`.
     */
    config: PivotConfig;
    /** 막대 / 선 / 원형. */
    kind: PivotChartKind;
    /** Index into `config.values`. Out-of-range falls back to `0`. Default: `0`. */
    valueFieldIndex?: number;
    /**
     * Which axis supplies the categories. `'row'` (default) plots one bar /
     * line point / slice per row leaf; `'column'` does the symmetric thing on
     * column leaves. Picking an axis with no fields yields the empty state.
     */
    categoryAxis?: PivotChartCategoryAxis;
    /** SVG viewport width (px). Defaults to `520`. */
    width?: number;
    /** SVG viewport height (px). Defaults to `280`. */
    height?: number;
    /** Optional wrapper className. */
    className?: string;
    /** Optional title above the chart. Defaults to the chosen value field's label. */
    title?: string;
    labels?: PivotChartLabels;
}
/**
 * Pure mapping from a `PivotResult` to a flat series. Reads the engine's
 * `displayGrandTotal*` slices (one number per leaf, aggregated by the engine
 * — never by summing display cells, which would break for non-distributive
 * aggregates). Falls back to `displayMatrix` when the orthogonal axis has no
 * fields and the engine therefore can't emit a grand-total slice.
 */
declare function pivotResultToChartSeries(result: PivotResult, options?: {
    valueFieldIndex?: number;
    categoryAxis?: PivotChartCategoryAxis;
}): ReadonlyArray<PivotChartSeriesPoint>;
/**
 * §10A.10 P2 — pivot-driven chart.
 */
declare function PivotChart(props: PivotChartProps): ReactElement;

/**
 * §10A.9 P1 — "Show Details" modal. Renders the source rows behind a
 * drill-down target in a sticky-header HTML table.
 *
 * Headless consumers can mount this on their own — pair {@link pivotDrillDownAt},
 * {@link pivotDrillDownRows}, and this component to get the same dialog the
 * builder uses without going through {@link PivotBuilder}. {@link PivotBuilder}
 * itself wires the modal on value-cell double-click and forwards its labels.
 *
 * Why a plain table and not nested `<XlReact>`: the source rows need human
 * field names from `availableFields` as column headers, but `<XlReact>` uses
 * alphabetic header labels (A, B, C…) — the column definitions don't carry a
 * `label` field. A scrollable table with `position: sticky` thead matches the
 * dialog's modal feel and keeps the implementation small.
 *
 * Dismiss: Escape, click on the backdrop, or the close button. The active
 * element is restored to whatever had focus before the modal opened so a
 * double-click → close → keyboard nav cycle leaves the grid focused.
 */

interface PivotDetailsModalProps {
    /** Resolved drill-down target — produced by {@link resolvePivotDrillDown}. */
    details: PivotDrillDownDetails;
    /** Source rows to render — typically `pivotDrillDownRows(...).rows`. */
    sourceRows: ReadonlyArray<Row>;
    /**
     * Field descriptors used to derive human column labels and the crumb labels
     * in the header. Same shape as {@link PivotBuilder}'s `availableFields`.
     */
    availableFields: ReadonlyArray<PivotAvailableField>;
    /** Called when the user dismisses the modal (Esc / backdrop / close button). */
    onClose: () => void;
    /** Dialog title — defaults to "세부 정보". */
    titleLabel?: string;
    /** Close-button text — defaults to "닫기". */
    closeLabel?: string;
    /** Shown when `sourceRows` is empty — defaults to a Korean fallback string. */
    emptyLabel?: string;
    /** Count badge formatter — defaults to ``(n) => `${n}개 행```. */
    countLabel?: (count: number) => string;
}
declare function PivotDetailsModal({ details, sourceRows, availableFields, onClose, titleLabel, closeLabel, emptyLabel, countLabel, }: PivotDetailsModalProps): ReactElement;

/**
 * Workbook / sheets — multi-tab data model (§14).
 *
 * The library owns *only* the tab-level metadata (name, color, hidden,
 * protected) and the active-sheet pointer. Each sheet's actual payload
 * (rows / columns / cellFormats / merges / undo stack / selection) stays in
 * consumer state, keyed by `sheet.id`. That mirrors how the rest of the grid
 * is already controlled — `<XlReact>` never owns row data — and keeps the
 * workbook reducer trivial to unit-test in isolation.
 *
 * Consumers route writes through the controller hook (or dispatch raw
 * actions); duplicating, deleting, or hiding a sheet only shuffles meta, so
 * the consumer's payload map is the one source of truth and stays in sync
 * with the workbook via the action they observed.
 */
type SheetId = string;
/**
 * Tab-level metadata for a single sheet. The id is stable for the lifetime
 * of the workbook — consumers map their per-sheet payload by `id`, never by
 * name (renames are common; ids must outlive them).
 */
interface Sheet {
    /** Stable id. Generated by the reducer when not provided. */
    readonly id: SheetId;
    /** Display label on the tab. Excel caps at ~31 chars; we don't enforce. */
    readonly name: string;
    /**
     * Tab color (CSS color string). Omitted / null means "no color" — Excel
     * renders the tab in the default chrome.
     */
    readonly color?: string | null;
    /** P2 — hidden tabs are excluded from the tab bar; accessible via "show". */
    readonly hidden?: boolean;
    /**
     * P2 — read-only flag. Library does **not** enforce — consumers decide
     * how to gate writes (e.g. pass to `<XlReact>` as `editingDisabled` or
     * block `onCellChange`). Surfaced here so the meta survives import/export
     * and the tab bar can render a lock badge.
     */
    readonly protected?: boolean;
}
/** Whole workbook: tabs + the currently active tab pointer. */
interface Workbook {
    readonly sheets: ReadonlyArray<Sheet>;
    /** Must reference a sheet in `sheets`. */
    readonly activeSheetId: SheetId;
}
/**
 * Discriminated union of every reducer action. Held in this shape (not as
 * a controller method bag) so the reducer can be exported as a pure
 * function and replayed in tests / undo stacks without React.
 */
type WorkbookAction = {
    readonly type: 'add';
    readonly sheet?: Partial<Pick<Sheet, 'id' | 'name' | 'color'>>;
    /** Insert immediately after this sheet; default appends. */
    readonly afterSheetId?: SheetId;
    /** Activate the new sheet (default true). */
    readonly activate?: boolean;
} | {
    readonly type: 'delete';
    readonly sheetId: SheetId;
} | {
    readonly type: 'rename';
    readonly sheetId: SheetId;
    readonly name: string;
} | {
    readonly type: 'recolor';
    readonly sheetId: SheetId;
    readonly color: string | null;
} | {
    readonly type: 'reorder';
    readonly sheetId: SheetId;
    readonly toIndex: number;
} | {
    readonly type: 'duplicate';
    readonly sheetId: SheetId;
    readonly newId?: SheetId;
    readonly newName?: string;
    readonly activate?: boolean;
} | {
    readonly type: 'setHidden';
    readonly sheetId: SheetId;
    readonly hidden: boolean;
} | {
    readonly type: 'setProtected';
    readonly sheetId: SheetId;
    readonly protected: boolean;
} | {
    readonly type: 'activate';
    readonly sheetId: SheetId;
};
interface CreateWorkbookOptions {
    /**
     * Seed sheets in tab order. When omitted, a single auto-named sheet is
     * created so the workbook is never empty (Excel invariant — at least one
     * visible sheet must exist).
     */
    readonly initialSheets?: ReadonlyArray<Partial<Pick<Sheet, 'id' | 'name' | 'color' | 'hidden' | 'protected'>>>;
    /** Prefix for auto-generated sheet names. Defaults to `'Sheet'`. */
    readonly defaultNamePrefix?: string;
}

/**
 * Build a workbook from optional seed sheets. Always produces at least one
 * sheet so `activeSheetId` is guaranteed to point at a valid entry.
 */
declare function createWorkbook(options?: CreateWorkbookOptions): Workbook;
/**
 * Pure reducer. Reject-and-return-self on invariant violations (duplicate
 * id, name conflict, deleting the only sheet, hiding the last visible
 * sheet) — consumers can detect "no-op" by reference-equality on the
 * returned workbook and surface a UI message if needed.
 */
declare function workbookReducer(workbook: Workbook, action: WorkbookAction): Workbook;

interface WorkbookController {
    /** Current workbook state. */
    workbook: Workbook;
    /** The active sheet — guaranteed to exist and never hidden. */
    activeSheet: Sheet;
    /** Sheets the tab bar should render. */
    visibleSheets: ReadonlyArray<Sheet>;
    /** Hidden sheets — for the "show / unhide" picker. */
    hiddenSheets: ReadonlyArray<Sheet>;
    /** Raw dispatch — for custom flows / batching. */
    dispatch: (action: WorkbookAction) => void;
    /** Append a new sheet (auto-named if no name given) and activate it. */
    addSheet: (sheet?: Partial<Pick<Sheet, 'id' | 'name' | 'color'>>) => void;
    /** Remove a sheet. The last remaining sheet is never deleted. */
    deleteSheet: (sheetId: SheetId) => void;
    /** Rename a sheet. Ignored on empty / duplicate names. */
    renameSheet: (sheetId: SheetId, name: string) => void;
    /** Set tab color (CSS color); pass `null` to clear. */
    recolorSheet: (sheetId: SheetId, color: string | null) => void;
    /** Move a sheet to a new 0-based index. Clamped to range. */
    reorderSheet: (sheetId: SheetId, toIndex: number) => void;
    /** Clone a sheet's meta (consumer mirrors payload via the same id). */
    duplicateSheet: (sheetId: SheetId) => void;
    /** Hide / show a sheet. Cannot hide the last visible sheet. */
    setSheetHidden: (sheetId: SheetId, hidden: boolean) => void;
    /** Mark a sheet read-only. Consumer enforces the actual write block. */
    setSheetProtected: (sheetId: SheetId, isProtected: boolean) => void;
    /** Switch the active tab. No-op when sheet is hidden or unknown. */
    activateSheet: (sheetId: SheetId) => void;
}
/**
 * Stateful workbook controller. Wraps the pure reducer in a `useReducer`
 * and surfaces stable callbacks for the common tab-bar actions. The
 * `dispatch` escape hatch is exported so consumers who want to batch
 * actions or middleware-route them can still do so.
 *
 * `options` is captured on first render only; subsequent prop changes do
 * **not** rebuild the workbook. Reset the entire owner component if you
 * need to load a different file.
 */
declare function useWorkbook(options?: CreateWorkbookOptions): WorkbookController;

interface SheetTabBarLabels {
    addSheet: string;
    rename: string;
    delete: string;
    duplicate: string;
    color: string;
    clearColor: string;
    hide: string;
    show: string;
    showSheetsTitle: string;
    protect: string;
    unprotect: string;
    protectedBadgeTitle: string;
}
declare const DEFAULT_SHEET_TAB_BAR_LABELS: SheetTabBarLabels;
/** Korean preset for `SheetTabBarProps.labels`. */
declare const KOREAN_SHEET_TAB_BAR_LABELS: SheetTabBarLabels;
/**
 * Subset of `WorkbookController` the tab bar actually needs. We accept the
 * narrowed shape too so a consumer who's wired their own dispatcher can
 * still drop the component in without the full hook.
 */
interface SheetTabBarController {
    readonly workbook: Workbook;
    readonly activeSheet: Sheet;
    readonly visibleSheets: ReadonlyArray<Sheet>;
    readonly hiddenSheets: ReadonlyArray<Sheet>;
    readonly addSheet: WorkbookController['addSheet'];
    readonly deleteSheet: WorkbookController['deleteSheet'];
    readonly renameSheet: WorkbookController['renameSheet'];
    readonly recolorSheet: WorkbookController['recolorSheet'];
    readonly reorderSheet: WorkbookController['reorderSheet'];
    readonly duplicateSheet: WorkbookController['duplicateSheet'];
    readonly setSheetHidden: WorkbookController['setSheetHidden'];
    readonly setSheetProtected: WorkbookController['setSheetProtected'];
    readonly activateSheet: WorkbookController['activateSheet'];
}
interface SheetTabBarProps {
    controller: SheetTabBarController;
    /** Curated palette for the color picker. */
    palette?: ReadonlyArray<string>;
    labels?: Partial<SheetTabBarLabels>;
    className?: string;
    style?: CSSProperties;
}
/**
 * The bottom-of-grid tab strip (§14). Renders one tab per visible sheet,
 * a "+" button to append, a hidden-sheet picker (when any sheet is
 * hidden), and a context menu per tab for rename / delete / color /
 * duplicate / hide / protect. Double-click on a tab triggers inline
 * rename; drag-and-drop reorders tabs.
 *
 * The component is purely controlled — all state lives in the
 * `controller` (see `useWorkbook`).
 */
declare function SheetTabBar(props: SheetTabBarProps): ReactElement;

interface WorkbookToMultiSheetOptions {
    /**
     * Include hidden sheets in the export. Default `false` — hidden sheets
     * are dropped (cf. Excel "Hide Sheet" which keeps them in the file; we
     * don't carry a `state: 'hidden'` flag through `MultiSheetEntry` yet).
     */
    readonly includeHidden?: boolean;
    /**
     * Default export options applied to every entry (per-sheet entries can
     * still override). Useful for `freezeHeader: false` workbook-wide.
     */
    readonly defaults?: Omit<MultiSheetEntry, 'snapshot' | 'sheetName'>;
}
/**
 * Build a `MultiSheetEntry[]` for `exportMultiSheetXlsx` from a Workbook
 * plus a resolver that returns each sheet's payload. Returns sheets in
 * tab order. Sheets whose resolver returns `null`/`undefined` are skipped
 * — that's a useful pattern for "lazy" sheets where the consumer wants to
 * export only sheets currently materialised.
 */
declare function workbookToMultiSheetEntries(workbook: Workbook, getSnapshot: (sheet: Sheet) => GridSnapshot | null | undefined, options?: WorkbookToMultiSheetOptions): MultiSheetEntry[];

interface UseFullscreenReturn {
    isFullscreen: boolean;
    isSupported: boolean;
    request: () => Promise<void>;
    exit: () => Promise<void>;
    toggle: () => Promise<void>;
}
declare function useFullscreen<T extends HTMLElement = HTMLElement>(targetRef: RefObject<T | null>): UseFullscreenReturn;

/**
 * Cross-window data sync via `BroadcastChannel` (§13 P2). When the
 * user opens the same workbook in a second browser window (Excel "새 창"),
 * every keystroke that mutates one window's data should appear in the
 * other within the same tick.
 *
 * The hook is a thin wrapper over the standards-compliant `BroadcastChannel`
 * API: it does not own any application state, it only forwards messages
 * between same-origin contexts that subscribe on the same `channelName`.
 *
 * Pattern (both windows):
 *
 * ```tsx
 * const sync = useWorkbookBroadcast<RowsPayload>('xl-react/sample');
 *
 * // emit on every mutation
 * useEffect(() => { sync.broadcast({ rows }); }, [rows]);
 *
 * // apply incoming
 * useEffect(() => {
 *   if (sync.latest) setRows(sync.latest.rows);
 * }, [sync.latest]);
 * ```
 *
 * Notes:
 *   - Messages do NOT echo back to the sender (browser default), so a
 *     window's own `broadcast(x)` will not appear in its own `latest`.
 *   - When the runtime lacks `BroadcastChannel` (SSR, older Safari in
 *     private mode, jsdom without polyfill), `isSupported` is `false`,
 *     `broadcast` is a no-op, and `latest` stays `null` so the consumer
 *     degrades to single-window mode.
 *   - The channel is closed on unmount; do not keep the return value
 *     after the component unmounts.
 */
interface UseWorkbookBroadcastReturn<T> {
    /** Latest message received from another tab. `null` until a peer broadcasts. */
    latest: T | null;
    /**
     * Post a message to all other tabs on this channel. Payloads pass through
     * the browser's structured-clone algorithm, which runs on the main thread —
     * sending a 100k-row workbook on every keystroke will block the UI. For
     * large workbooks, broadcast diffs / commands instead of the full snapshot,
     * or debounce the broadcast to a sensible rate.
     */
    broadcast: (payload: T) => void;
    /** Whether the runtime supports `BroadcastChannel`. */
    isSupported: boolean;
}
declare function useWorkbookBroadcast<T>(channelName: string): UseWorkbookBroadcastReturn<T>;
/**
 * Open the current document in a new browser window aimed at the same
 * URL, so a second `useWorkbookBroadcast(channelName)` listener mounts
 * on the other side. The returned `Window` reference can be used to
 * `close()` from the parent. Returns `null` if the browser blocks the
 * popup (most browsers require a direct user gesture for `window.open`).
 *
 * The `target` argument is the second `window.open` parameter. Use a
 * stable name (e.g. `'xl-react-new-window'`) to reuse the same window
 * across repeated clicks; pass `'_blank'` to always open a fresh window.
 */
declare function openSheetInNewWindow(options?: {
    /** URL to open. Defaults to the current `location.href`. */
    href?: string;
    target?: string;
    /** `window.open` features string. Defaults to a reasonable popup geometry. */
    features?: string;
}): Window | null;

/**
 * @experimental Public surface may change before 1.0. The scroll-sync
 * mechanism currently couples to the grid root via the `.xl-react-grid`
 * class selector; a forthcoming imperative `gridRef` API on `XlReact`
 * will replace that hook so the wrapper can support draggable split
 * bars, freeze-aware sync, and programmatic `scrollTo`.
 *
 * Split-pane wrapper (§13 P2). Renders the same `XlReact` props
 * across 1 / 2 / 4 panes in a CSS-grid layout and synchronizes the
 * scroll positions across paired panes — matching Excel's "분할(Split)":
 *
 *   - `none`       — single pane (passthrough; useful for toggling off
 *                    split without restructuring the tree).
 *   - `horizontal` — two side-by-side panes, vertical scroll synced
 *                    (i.e. row N is at the same screen Y in both).
 *   - `vertical`   — two stacked panes, horizontal scroll synced.
 *   - `quad`       — 2×2 grid. Top-left and top-right share vertical
 *                    scroll; top-left and bottom-left share horizontal
 *                    scroll; the diagonal partners are synced by
 *                    transitivity.
 *
 * The wrapper does not own data — it accepts a `renderPane(paneId)`
 * factory and renders one `XlReact` per slot. Pass the same `columns` /
 * `rows` / handlers in every pane to mirror Excel parity; pass slices
 * to show different windows over the same workbook.
 *
 * Scroll sync attaches to `.xl-react-grid` DOM nodes via `querySelector`
 * after mount; on mode change or unmount it removes the listeners. The
 * implementation guards against scroll-feedback loops with a per-axis
 * `lock` flag.
 */
type SplitMode = 'none' | 'horizontal' | 'vertical' | 'quad';
type SplitPaneId = 'tl' | 'tr' | 'bl' | 'br';
interface SplitPaneViewProps {
    mode: SplitMode;
    /**
     * Render one `XlReact` (or any other content) for a given pane slot.
     * Called with `'tl'` for the single pane in `'none'` mode.
     */
    renderPane: (paneId: SplitPaneId) => ReactNode;
    /** Optional className on the outer wrapper. */
    className?: string;
    /**
     * CSS `grid-template-rows` for the horizontal split bar. Defaults to
     * `1fr 1fr` (50/50). Ignored in `'horizontal'` and `'none'` modes.
     */
    rowSplit?: string;
    /**
     * CSS `grid-template-columns` for the vertical split bar. Defaults to
     * `1fr 1fr` (50/50). Ignored in `'vertical'` and `'none'` modes.
     */
    colSplit?: string;
    /** Optional ARIA label for the wrapper region. */
    ariaLabel?: string;
}
declare function SplitPaneView({ mode, renderPane, className, rowSplit, colSplit, ariaLabel, }: SplitPaneViewProps): ReactElement;

/**
 * Print (§12) — public types.
 *
 * The print module is built around three layers (mirroring `sheets/` and
 * `findReplace/`):
 *
 *   - **Pure pagination** (`paginate`) computes which row/column indices
 *     fall on each page given paper size, orientation, margins, scale,
 *     row / column dimensions, an optional print area, and optional
 *     row / column repeat ranges. No DOM, no React — fully testable.
 *
 *   - **Header/footer placeholder resolver** (`resolvePlaceholders`)
 *     expands Excel-style markers (`&P` page#, `&N` total pages, `&D`
 *     date, `&T` time, `&F` filename, `&A` sheet name) into final text.
 *
 *   - **`PrintPreview` component + `usePrintController` hook** are the
 *     UI surfaces. The component renders the paginated preview and
 *     drives `window.print()` once the user clicks "인쇄"; the hook owns
 *     `PrintOptions` so consumers can wire it from any toolbar.
 *
 * Per the project convention (`<XlReact>` never owns row data), the print
 * module never owns row data either — the consumer hands rows / columns /
 * cell-format map / value formatter to the preview, and the preview reads
 * via the same coord-key scheme used by the grid.
 */

/**
 * Paper presets surfaced by the print module. Custom paper sizes are
 * possible by passing `paperWidthMm` / `paperHeightMm` directly in
 * `PrintOptions`; the preset only seeds those when unset.
 */
type PaperSize = 'A4' | 'A3' | 'A5' | 'Letter' | 'Legal' | 'Tabloid';
type Orientation = 'portrait' | 'landscape';
/** Page margins in millimetres. */
interface PageMargins {
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly left: number;
}
/**
 * Inclusive row/column index range to repeat on every page (Excel's
 * "행 반복 / 열 반복"). `start` / `end` are 0-based, end is inclusive.
 */
interface RepeatRange {
    readonly start: number;
    readonly end: number;
}
/**
 * Three-zone header or footer (Excel parity). Each zone accepts the
 * placeholder grammar in `headerFooter.ts`. Empty / undefined zones
 * render as nothing — no fallback text.
 */
interface HeaderFooterPart {
    readonly left?: string;
    readonly center?: string;
    readonly right?: string;
}
/**
 * Consumer-facing print options. Every field is optional; defaults are
 * filled by `usePrintController` / `paginate` so a bare `{}` is a valid
 * starting point.
 */
interface PrintOptions {
    readonly paperSize?: PaperSize;
    readonly orientation?: Orientation;
    /** Margins in mm. Defaults to {top: 19, right: 19, bottom: 19, left: 19}. */
    readonly margins?: PageMargins;
    /**
     * Zoom applied during preview / print. 1.0 = 100%. Clamped to
     * [0.1, 4.0] by the pagination engine. (P3 — `scale`.)
     */
    readonly scale?: number;
    /**
     * Override the paper width / height resolved from `paperSize`. When
     * either field is set, both are used as-is and `paperSize` is treated
     * as a label. Custom sizes are supported this way.
     */
    readonly paperWidthMm?: number;
    readonly paperHeightMm?: number;
    /**
     * Restrict the printed region. When set, rows/cols outside the range
     * are excluded from pagination entirely. Defaults to the whole grid.
     */
    readonly printArea?: SelectionRange | null;
    /**
     * Rows repeated on every page (page header band). Excel's
     * "인쇄 제목 → 반복할 행". Inclusive; pass `null` to disable.
     */
    readonly repeatRows?: RepeatRange | null;
    /** Columns repeated on every page (page-left band). */
    readonly repeatCols?: RepeatRange | null;
    /** Top header band — left / center / right with placeholder grammar. */
    readonly header?: HeaderFooterPart;
    /** Bottom footer band — left / center / right with placeholder grammar. */
    readonly footer?: HeaderFooterPart;
    /** Filename expanded for `&F` in header / footer text. */
    readonly filename?: string;
    /** Sheet name expanded for `&A`. */
    readonly sheetName?: string;
    /** Render Excel-style cell borders / gridlines on the printed page. */
    readonly showGridlines?: boolean;
    /** Print the A1 column header lane + row gutter. */
    readonly showHeaders?: boolean;
}
/** Resolved (no `undefined`) variant used inside the pagination engine. */
interface ResolvedPrintOptions {
    readonly paperSize: PaperSize;
    readonly orientation: Orientation;
    readonly margins: PageMargins;
    readonly scale: number;
    readonly paperWidthMm: number;
    readonly paperHeightMm: number;
    readonly printArea: SelectionRange | null;
    readonly repeatRows: RepeatRange | null;
    readonly repeatCols: RepeatRange | null;
    readonly header: HeaderFooterPart;
    readonly footer: HeaderFooterPart;
    readonly filename: string;
    readonly sheetName: string;
    readonly showGridlines: boolean;
    readonly showHeaders: boolean;
}
/**
 * One paginated page. `rows` / `cols` are the body indices on the page
 * (in original 0-based grid order, after applying `printArea`).
 * `repeatedRows` / `repeatedCols` are the indices that get re-rendered
 * as the page-top / page-left band; they may overlap with the body
 * (e.g. on the page that natively contains them) — the renderer should
 * skip the duplicate to match Excel.
 */
interface PrintPage {
    readonly pageIndex: number;
    readonly rows: ReadonlyArray<number>;
    readonly cols: ReadonlyArray<number>;
    readonly repeatedRows: ReadonlyArray<number>;
    readonly repeatedCols: ReadonlyArray<number>;
    /** Computed body-band height in CSS px (after scale). */
    readonly bodyHeightPx: number;
    /** Computed body-band width in CSS px (after scale). */
    readonly bodyWidthPx: number;
}
/**
 * Pagination output. Also reports the *between-row* / *between-col*
 * indices where a new page begins — useful for §12's "페이지 나누기 미리보기"
 * overlay that paints dashed page-break lines onto the live grid.
 */
interface PaginationResult {
    readonly pages: ReadonlyArray<PrintPage>;
    /** Row indices at which a new page begins (excludes the very first page). */
    readonly rowPageBreaks: ReadonlyArray<number>;
    /** Column indices at which a new page begins (excludes the very first page). */
    readonly colPageBreaks: ReadonlyArray<number>;
    /** Final paper width / height in CSS px (post-orientation, pre-scale). */
    readonly pageWidthPx: number;
    readonly pageHeightPx: number;
    /** Usable body width / height (after margins, after scale). */
    readonly usableWidthPx: number;
    readonly usableHeightPx: number;
}
/** 1 millimetre ≈ 3.7795 CSS px at 96 dpi. Shared constant. */
declare const MM_TO_PX: number;
/** Paper preset table — millimetres. */
declare const PAPER_SIZES_MM: Readonly<Record<PaperSize, {
    widthMm: number;
    heightMm: number;
}>>;
declare const DEFAULT_MARGINS_MM: PageMargins;
declare const DEFAULT_PRINT_OPTIONS: ResolvedPrintOptions;

/**
 * Pure pagination engine for §12 print. Greedy column-then-row packing
 * (Excel's behaviour): we fill columns left-to-right onto a page until
 * the next column would overflow the usable width, then start a new
 * vertical band of pages for the remaining columns. Within each vertical
 * band, rows are packed top-down with the same overflow rule.
 *
 * The engine never inspects DOM / row data — it works off plain row /
 * column dimension arrays the consumer supplies (or, when omitted, the
 * defaults provided alongside them). That keeps it fully unit-testable
 * and lets the preview re-paginate on every option change without a
 * layout flush.
 */

interface PaginationInput {
    readonly rowCount: number;
    readonly colCount: number;
    /**
     * Per-row CSS px height. Out-of-range / missing entries fall back to
     * `defaultRowHeight`. Pass an empty array + `defaultRowHeight` for a
     * uniform grid.
     */
    readonly rowHeights?: ReadonlyArray<number>;
    /** Per-column CSS px width; missing entries fall back to `defaultColWidth`. */
    readonly colWidths?: ReadonlyArray<number>;
    readonly defaultRowHeight: number;
    readonly defaultColWidth: number;
    /**
     * Extra band reserved at the top of every page for the rendered
     * header (printed as the "머리글" band). Subtracted from the usable
     * body height before row packing. Defaults to 0.
     */
    readonly headerBandPx?: number;
    /** Extra band at the bottom of every page (the "바닥글"). */
    readonly footerBandPx?: number;
    readonly options?: PrintOptions;
}
/**
 * Merge a sparse `PrintOptions` with the module defaults, applying paper
 * preset / orientation, clamping scale, and normalizing every optional
 * range. Exposed so the preview component and the controller hook can
 * share the same resolution.
 */
declare function resolvePrintOptions(options: PrintOptions | undefined): ResolvedPrintOptions;
/**
 * Compute pages, page breaks, and per-page geometry from an options
 * object and the consumer's row / column dimension arrays. Pure.
 */
declare function paginate(input: PaginationInput): PaginationResult;

/**
 * Header / footer placeholder grammar for §12. Mirrors Excel's
 * ampersand-prefixed markers so consumers familiar with
 * `&P / &N / &D / &T / &F / &A` get parity behaviour. Style markers
 * (`&B` bold, `&I` italic, `&U` underline) are also recognized but
 * passed through as plain markers for the renderer to interpret —
 * resolving them to React nodes lives in the preview component.
 */

declare const PRINT_PLACEHOLDERS: {
    readonly PAGE: "&P";
    readonly TOTAL: "&N";
    readonly DATE: "&D";
    readonly TIME: "&T";
    readonly FILE: "&F";
    readonly SHEET: "&A";
    readonly AMP: "&&";
};
interface PlaceholderContext {
    readonly pageNumber: number;
    readonly totalPages: number;
    readonly date?: Date;
    readonly filename?: string;
    readonly sheetName?: string;
    /**
     * Formatter for the `&D` (date) marker. Defaults to ISO-8601
     * `YYYY-MM-DD`. Consumers can pass locale-aware formatters
     * (e.g. `Intl.DateTimeFormat`) for richer rendering.
     */
    readonly formatDate?: (date: Date) => string;
    /** Formatter for the `&T` (time) marker. Defaults to `HH:MM`. */
    readonly formatTime?: (date: Date) => string;
}
/**
 * Expand placeholders inside a single text zone. Style markers and
 * unknown `&X` sequences are passed through verbatim — they're a hint
 * for the renderer, not an error.
 *
 * `&&` is the literal-ampersand escape, mirroring Excel.
 */
declare function resolvePlaceholders(template: string, ctx: PlaceholderContext): string;
/**
 * Convenience wrapper that resolves every zone of a `HeaderFooterPart`
 * with the same context.
 */
declare function resolveHeaderFooter(part: HeaderFooterPart, ctx: PlaceholderContext): {
    left: string;
    center: string;
    right: string;
};
/**
 * Are any of the three zones non-empty after placeholder expansion?
 * Used by the preview to decide whether to reserve a header/footer
 * band on each page (so blank options collapse the band height to 0).
 */
declare function isHeaderFooterEmpty(part: HeaderFooterPart | undefined): boolean;

interface UsePrintControllerOptions {
    /** Sparse initial options. Merged with module defaults. */
    readonly initial?: PrintOptions;
}
interface PrintController {
    /** Sparse options the consumer can pass to `<PrintPreview options={…} />`. */
    readonly options: PrintOptions;
    /** Resolved options with every field filled (defaults applied). */
    readonly resolved: ResolvedPrintOptions;
    /** Preview-open flag. */
    readonly isOpen: boolean;
    /** Merge a sparse patch into the current options. */
    readonly update: (patch: PrintOptions) => void;
    readonly setPrintArea: (range: SelectionRange | null) => void;
    readonly setRepeatRows: (range: RepeatRange | null) => void;
    readonly setRepeatCols: (range: RepeatRange | null) => void;
    /** Open the preview (sets `isOpen` to true). */
    readonly open: () => void;
    /** Close the preview. */
    readonly close: () => void;
    /** Reset every option back to defaults (and close the preview). */
    readonly reset: () => void;
}
declare function usePrintController(opts?: UsePrintControllerOptions): PrintController;

/**
 * `PrintPreview` — modal-overlay preview for §12. Renders one preview
 * page per `paginate()` page in the resolved options, framed by the
 * paper outline + margins. The "인쇄" button toggles a body-level class
 * and invokes `window.print()`; a `@media print` stylesheet (shipped in
 * `src/styles/print.css`) hides everything except the preview and lets
 * each `.xl-react-print-page` use a page break.
 *
 * Conventions match the rest of the library:
 *   - Consumer owns row/column data; the preview reads via `formatValue`.
 *   - Default labels are Korean (matches the demo); pass `labels` for
 *     i18n.
 *   - No portal — the modal renders in place; the backdrop blocks click
 *     bleed-through and a wrapping `.xl-react-print-modal` carries the
 *     `role="dialog"`.
 */

interface PrintPreviewLabels {
    readonly title: string;
    readonly print: string;
    readonly close: string;
    readonly paper: string;
    readonly orientation: string;
    readonly portrait: string;
    readonly landscape: string;
    readonly scale: string;
    readonly margins: string;
    readonly marginTop: string;
    readonly marginRight: string;
    readonly marginBottom: string;
    readonly marginLeft: string;
    readonly header: string;
    readonly footer: string;
    readonly headerLeft: string;
    readonly headerCenter: string;
    readonly headerRight: string;
    readonly printArea: string;
    readonly clearPrintArea: string;
    readonly repeatRows: string;
    readonly repeatCols: string;
    readonly gridlines: string;
    readonly headers: string;
    readonly pageOf: (current: number, total: number) => string;
    readonly placeholderHint: string;
}
declare const DEFAULT_PRINT_PREVIEW_LABELS: PrintPreviewLabels;
interface PrintPreviewProps {
    /** Toggles the modal. When false the component returns `null`. */
    readonly open: boolean;
    /** Called when the user clicks the "닫기" / backdrop / presses Escape. */
    readonly onClose: () => void;
    readonly rows: ReadonlyArray<Row>;
    readonly columns: ReadonlyArray<AnyColumn>;
    /** Per-row CSS px height; missing entries fall back to `defaultRowHeight`. */
    readonly rowHeights?: ReadonlyArray<number>;
    /** Per-column CSS px width; missing entries fall back to `defaultColWidth`. */
    readonly colWidths?: ReadonlyArray<number>;
    readonly defaultRowHeight?: number;
    readonly defaultColWidth?: number;
    /** Current sparse options. */
    readonly options: PrintOptions;
    /** Called when the user mutates an option via the preview toolbar. */
    readonly onOptionsChange?: (next: PrintOptions) => void;
    /**
     * Custom value formatter. When omitted, the preview pulls
     * `column.accessor(row)` and converts to string (the same default
     * `<XlReact>` uses for display).
     */
    readonly formatValue?: (value: unknown, coord: CellCoord) => string;
    /** Called once `window.print()` returns (or immediately if no DOM). */
    readonly onPrint?: () => void;
    readonly labels?: Partial<PrintPreviewLabels>;
    /**
     * Optional override for the row gutter label (matches `<XlReact>`'s
     * `defaultRowLabel`). Useful when the host grid hides row 0 as a caption.
     */
    readonly rowLabel?: (rowIndex: number) => string;
    /** Override for the column header label (defaults to A, B, C…). */
    readonly columnLabel?: (colIndex: number) => string;
    /**
     * Optional reserved CSS px height for the printed header band. Defaults
     * to 24 when any header zone is non-empty, 0 otherwise. The pagination
     * engine subtracts this from the usable body height per page.
     */
    readonly headerBandPx?: number;
    /** Symmetric override for the footer band. */
    readonly footerBandPx?: number;
}
/**
 * Programmatic entry point for the "인쇄" button. Adds a marker class to
 * `<body>` (so the print stylesheet can scope itself), calls
 * `window.print()`, then strips the marker on `afterprint`. Exported for
 * consumers who want to drive printing without the preview UI.
 */
declare function startPrint(onAfter?: () => void): void;
declare function PrintPreview(props: PrintPreviewProps): ReactElement | null;

/**
 * `PageBreakOverlay` — dashed page-break preview painted on top of the
 * live grid (§12 "페이지 나누기 미리보기"). The component consumes the
 * `rowPageBreaks` / `colPageBreaks` indices from `paginate()` plus the
 * per-row / per-column dimension arrays the host already owns, and
 * absolutely-positions a horizontal / vertical dashed line at every
 * break boundary.
 *
 * The overlay does no painting on the grid itself — it sits in a
 * `pointer-events: none` wrapper above the host, so selection /
 * scrolling stay intact. Hosts wire it inside their grid container
 * with `position: relative`.
 */

interface PageBreakOverlayProps {
    /** Output of `paginate(...)`. Drives where the dashed lines go. */
    readonly pagination: PaginationResult;
    /**
     * Per-row CSS px heights from index 0. Missing / out-of-range entries
     * fall back to `defaultRowHeight`. Provide the same array you handed
     * to `paginate(...)` for parity.
     */
    readonly rowHeights?: ReadonlyArray<number>;
    readonly colWidths?: ReadonlyArray<number>;
    readonly defaultRowHeight: number;
    readonly defaultColWidth: number;
    /** Offset (px) for any header band drawn above the grid body. */
    readonly offsetTop?: number;
    /** Offset (px) for any row gutter drawn to the left of the grid body. */
    readonly offsetLeft?: number;
    readonly className?: string;
}
declare function PageBreakOverlay({ pagination, rowHeights, colWidths, defaultRowHeight, defaultColWidth, offsetTop, offsetLeft, className, }: PageBreakOverlayProps): ReactElement;

/**
 * Excel-style error codes that the formula engine surfaces. Limited to the
 * subset needed by the consumer-controlled grid: division by zero, circular
 * references, malformed references, type / value mismatches, and parse
 * failures. Each code matches the literal Excel string so consumers can
 * render the value directly.
 */
type FormulaErrorCode = '#DIV/0!' | '#CIRCULAR!' | '#REF!' | '#VALUE!' | '#NAME?';
declare const FORMULA_ERROR_CODES: readonly FormulaErrorCode[];
/**
 * Discriminated AST node returned by `parseFormula`. The grammar is
 * deliberately small (numbers, cell refs, unary minus, the four arithmetic
 * operators, parentheses) — the rest of the family (functions, ranges,
 * absolute refs) is deferred to a later phase.
 */
type FormulaAst = {
    type: 'number';
    value: number;
} | {
    type: 'ref';
    row: number;
    col: number;
    /** When `true`, the row half is anchored ($) and survives fill shifting. */
    rowAbsolute?: boolean;
    /** When `true`, the column half is anchored ($) and survives fill shifting. */
    colAbsolute?: boolean;
} | {
    type: 'unary';
    op: '-';
    operand: FormulaAst;
} | {
    type: 'binary';
    op: '+' | '-' | '*' | '/';
    left: FormulaAst;
    right: FormulaAst;
};
/** Parse-time failure. */
interface FormulaParseError {
    type: 'error';
    code: '#NAME?' | '#REF!';
    message: string;
}
type FormulaParseResult = FormulaAst | FormulaParseError;
/**
 * Result of evaluating an AST against a cell-value resolver. A successful
 * evaluation yields a JS `number`; any failure path collapses to an
 * `FormulaErrorCode` literal.
 */
type FormulaEvalResult = number | FormulaErrorCode;
/**
 * Resolver passed into the evaluator. Returns the *display* value of another
 * cell — already an evaluated number, a propagated error code, or `null` /
 * `undefined` for blank. Strings that aren't pure numbers count as
 * `#VALUE!` so the engine can never accidentally coerce a label into 0.
 */
type CellValueResolver = (coord: CellCoord) => number | FormulaErrorCode | string | null | undefined;
/** Returns `true` for the five Excel error literals. */
declare function isFormulaError(value: unknown): value is FormulaErrorCode;

/**
 * Parsed A1 reference, including absolute markers. `rowAbsolute` / `colAbsolute`
 * correspond to the `$` prefixed-row / `$`-prefixed-column halves of an Excel
 * reference (`$A$1` = both, `A$1` = row absolute, `$A1` = col absolute, `A1` =
 * fully relative).
 */
interface ParsedCellRef {
    row: number;
    col: number;
    rowAbsolute: boolean;
    colAbsolute: boolean;
}
/**
 * Convert an Excel-style A1 reference (e.g. `"B3"`, `"$A$1"`, `"A$1"`,
 * `"$A1"`) to zero-based grid coordinates and absolute markers. Returns
 * `null` if the input doesn't look like a cell reference.
 */
declare function parseA1(ref: string): ParsedCellRef | null;
/**
 * Convert an A1 reference to zero-based coords. Accepts absolute markers but
 * discards them — callers that need absolute info should call `parseA1`.
 */
declare function a1ToCoord(ref: string): {
    row: number;
    col: number;
} | null;
/**
 * Inverse of `parseA1`. `opts.rowAbsolute` / `opts.colAbsolute` control
 * whether the emitted ref carries `$` markers. Both inputs are zero-based.
 */
declare function coordToA1(row: number, col: number, opts?: {
    rowAbsolute?: boolean;
    colAbsolute?: boolean;
}): string;

type Token = {
    type: 'number';
    value: number;
} | {
    type: 'ref';
    ref: string;
} | {
    type: 'function';
    name: string;
} | {
    type: 'op';
    op: '+' | '-' | '*' | '/';
} | {
    type: 'lparen';
} | {
    type: 'rparen';
};
interface TokenizeError {
    type: 'error';
    message: string;
}
/**
 * Split a formula body (the part after `=`) into a flat token stream. Skips
 * whitespace; bails on any character that doesn't belong to the supported
 * subset so the parser can surface `#NAME?` / `#REF!` cleanly.
 */
declare function tokenize(input: string): Token[] | TokenizeError;

/**
 * Parse the raw cell text (with or without the leading `=`) into an AST.
 * The grammar is intentionally small to match the spec's "사칙연산 + 셀
 * 참조" scope:
 *
 *   expression = term  (('+'|'-') term)*
 *   term       = unary (('*'|'/') unary)*
 *   unary      = '-' unary | primary
 *   primary    = number | ref | '(' expression ')'
 *
 * Cell references may carry optional `$` absolute markers (`$A$1`, `A$1`,
 * `$A1`); they survive on the AST so fill operations can preserve them.
 * Anything outside this grammar (functions, ranges) yields a `#NAME?` /
 * `#REF!` parse error.
 */
declare function parseFormula(input: string): FormulaParseResult;
/** Walks the AST and returns every cell reference it contains. */
declare function extractRefs(ast: FormulaAst): Array<{
    row: number;
    col: number;
}>;

/**
 * Evaluate the AST using `resolveRef` to look up referenced cells. Returns
 * either a `number` or an Excel-style error literal. Error codes propagate
 * eagerly: any subtree that resolves to an error short-circuits the
 * containing expression.
 */
declare function evaluateAst(ast: FormulaAst, resolveRef: CellValueResolver): FormulaEvalResult;

/**
 * Shift relative cell references inside a formula by `(deltaRow, deltaCol)`,
 * leaving absolute (`$`-marked) halves anchored — the same semantics Excel
 * uses when a formula is copied or filled to another position.
 *
 *   shiftFormulaRefs('=A1+$B$1', 2, 0)   → '=A3+$B$1'
 *   shiftFormulaRefs('=A1+B$1', 1, 3)    → '=D2+E$1'
 *
 * When shifting would move a relative ref to a negative row/column, the ref
 * is replaced with a sentinel that the parser rejects as `#REF!` so the
 * resulting formula evaluates to the Excel-standard `#REF!` error.
 *
 * Non-formula inputs (anything not starting with `=`) and unparseable
 * formulas are returned unchanged — fill callers should still copy the raw
 * value verbatim in those cases.
 */
declare function shiftFormulaRefs(formula: string, deltaRow: number, deltaCol: number): string;

/**
 * The raw form of a cell, as authored by the user. A leading `=` flags a
 * formula; anything else is treated as a literal (number when the string
 * parses cleanly, plain string otherwise). `null` clears the cell.
 */
type RawCellValue = string | number | null;
/**
 * Display form of a cell — what the consumer should render. Resolved
 * literal, computed formula result, or an Excel-style error literal.
 */
type DisplayCellValue = number | string | FormulaErrorCode | null;
/**
 * Sheet-level helper that tracks raw cell values, parses formulas, walks the
 * dependency graph, and produces a fresh display map after each edit. Kept
 * deliberately framework-agnostic so it can be used inside a React reducer
 * or any other consumer state container.
 *
 * Recalculation policy: when a cell changes, the sheet evaluates that cell
 * and every transitive dependent. A cycle anywhere in the affected subgraph
 * marks every cell in the cycle as `#CIRCULAR!`.
 */
declare class FormulaSheet {
    private cells;
    /** Reverse index: key → cells that reference it. */
    private dependents;
    /** Returns `true` when the cell has any state (raw or computed). */
    has(coord: CellCoord): boolean;
    /** Returns the raw text the user authored, or `null` if the cell is empty. */
    getRaw(coord: CellCoord): RawCellValue;
    /** Returns the display value (computed result or literal). */
    getDisplay(coord: CellCoord): DisplayCellValue;
    /**
     * Set the raw value of a cell and recompute every transitive dependent.
     * Returns the set of cell keys whose display value changed — the consumer
     * uses this to splice the new values into its grid state.
     */
    setRaw(coord: CellCoord, raw: RawCellValue): CellCoord[];
    private collectAffected;
    private recompute;
}

interface FormulaBarLabels {
    /** ARIA label for the name box (address) input. */
    nameBox?: string;
    /** ARIA label for the formula input. */
    formulaInput?: string;
    /** Title / ARIA label for the commit (✓) button. */
    commit?: string;
    /** Title / ARIA label for the cancel (✗) button. */
    cancel?: string;
    /** Caption inside the `fx` prefix badge. */
    fxIcon?: string;
    /** Placeholder shown in the input when no cell is selected. */
    emptyPlaceholder?: string;
}
interface FormulaBarProps {
    /**
     * A1 reference of the active cell (e.g. `"A1"`, `"$B$2"`). Drives the
     * name-box readout. `null` / `undefined` collapses the bar into a neutral
     * empty state. Derive from `XlReact.onSelectionChange` + `coordToA1`.
     */
    activeRef?: string | null;
    /**
     * Raw cell value as authored by the user (a formula like `"=A1*B1"` or a
     * literal). Numbers are stringified for display. `null` / `undefined`
     * shows an empty input. Read from the consumer's data source — e.g.
     * `FormulaSheet.getRaw(active)`.
     */
    value?: string | number | null;
    /**
     * Fires on Enter / ✓ / blur with the in-progress draft. Empty input is
     * reported as `null` so consumers can pass it straight to
     * `FormulaSheet.setRaw`. The bar exits edit mode after the call.
     */
    onCommit?: (value: string | null) => void;
    /** Fires on Esc / ✗. The bar discards the draft and reverts to `value`. */
    onCancel?: () => void;
    /**
     * Fires when the user presses Enter inside the name box with a valid A1
     * reference (absolute markers stripped). Wire this to your selection
     * model to jump the active cell — leaving it unset keeps the name box
     * read-only for navigation.
     */
    onNavigate?: (target: {
        row: number;
        col: number;
        ref: string;
    }) => void;
    /** Suppress edits without hiding the bar. Buttons disappear, input is read-only. */
    readOnly?: boolean;
    /** Greyed-out state (e.g. no active selection yet). */
    disabled?: boolean;
    className?: string;
    labels?: FormulaBarLabels;
}
/**
 * Excel-faithful formula bar (§10 / §13). A controlled component with two
 * inputs: the **name box** on the left displays the active cell's A1
 * reference (and optionally accepts an A1 ref to navigate to), and the
 * **formula input** on the right shows / edits the cell's raw value.
 *
 * Editing model: the bar holds its own draft string internally so per-keystroke
 * typing never touches consumer state. Enter / ✓ / focus loss commit the draft
 * via {@link FormulaBarProps.onCommit}; Esc / ✗ cancel. Hangul / Japanese /
 * Chinese IME composition is guarded — composing characters never commit.
 *
 * The bar does **not** open the in-cell editor; it edits the raw value of the
 * already-active cell. Consumers route the committed string back to their own
 * sheet model (e.g. `FormulaSheet.setRaw` + the existing `onCellChange`
 * pipeline) so the grid's `cellRenderer` paints the new display value.
 */
declare function FormulaBar({ activeRef, value, onCommit, onCancel, onNavigate, readOnly, disabled, className, labels, }: FormulaBarProps): react_jsx_runtime.JSX.Element;

export { AnyColumn, type ApplyCellStyleOptions, type AsyncRowSource, type AsyncRowSourceOptions, type AverageRule, BLANK_FILTER_KEY, BUILTIN_CELL_STYLES, BUILTIN_CELL_STYLE_LIST, BUILTIN_CELL_STYLE_REGISTRY, type BaseRule, type BorderDrawTool, BoundedUndoStack, type BoundedUndoStackOptions, type BuiltinCellStyleId, type CellAddressActionPayload, CellAlign, type CellAlignPatch, type CellAnnotationResolver, type CellAnnotations, type CellAnnotationsMap, type CellBorderEdge, type CellBorderPatch, type CellBorderPlacement, CellBorderSide, type CellBorderSidePatch, type CellChange, CellCoord, CellFill, type CellFillPatch, CellFont, type CellFontPatch, CellFormat, type CellFormatPatch, type CellFormatPatchResolver, type CellFormatRequestPayload, CellFormatToolbar, type CellFormatToolbarFontOption, type CellFormatToolbarNumberFormatOption, type CellFormatToolbarProps, CellFormats, CellFormatsMap, CellMergeToolbar, type CellMergeToolbarLabels, type CellMergeToolbarProps, type CellProtectionPredicate, CellRendererProps, CellRenderers, type CellStyleApplyMode, type CellStyleRegistry, CellStyleToolbar, type CellStyleToolbarLabels, type CellStyleToolbarProps, type CellValueResolver, type CellValueRule, type CellsClearPayload, type ClipboardCopyPayload, type ColorScaleRule, type ColorScaleStop, type ColumnValueFilter, type ColumnsDeletePayload, type ColumnsInsertPayload, type ColumnsReorderPayload, type CombinedRowSource, type ComparisonOperator, type CompiledMatcher, type ConditionalCellRendererOptions, ConditionalDataBar, type ConditionalDataBarProps, type ConditionalDecoration, type ConditionalDecorationsMap, type ConditionalFormatResult, ConditionalFormatToolbar, type ConditionalFormatToolbarLabels, type ConditionalFormatToolbarProps, type ConditionalFormatsMap, ConditionalIcon, type ConditionalIconProps, type ConditionalRule, type CreateWorkbookOptions, CsvOptions, DEFAULT_CELL_STYLE_LABELS, DEFAULT_CONDITIONAL_FORMAT_LABELS, DEFAULT_FIND_REPLACE_LABELS, DEFAULT_FIND_REPLACE_OPTIONS, DEFAULT_HIGHLIGHT_FORMAT, DEFAULT_IMPORT_DIALOG_LABELS, DEFAULT_MARGINS_MM, DEFAULT_PRINT_OPTIONS, DEFAULT_PRINT_PREVIEW_LABELS, DEFAULT_SHEET_TAB_BAR_LABELS, type DataBarDecoration, type DataBarRule, type DateOperator, type DateRule, type DisplayCellValue, type DuplicateRule, type DynamicRowSource, type EvaluateOptions, ExportButton, type ExportButtonProps, ExportOptions, FORMULA_ERROR_CODES, type FilterByValuePayload, type FilterState, type FindMatch, type FindMatchesArgs, FindReplaceDialog, type FindReplaceDialogLabels, type FindReplaceDialogProps, type FindReplaceMode, type FindReplaceOptions, type FindReplaceScope, type FormulaAst, FormulaBar, type FormulaBarLabels, type FormulaBarProps, type FormulaErrorCode, type FormulaEvalResult, type FormulaParseError, type FormulaParseResult, FormulaSheet, GridSnapshot, type HeaderFooterPart, type HistorySnapshot, ICON_SETS, type IconDecoration, type IconSetName, type IconSetRule, ImportDialog, type ImportDialogLabels, type ImportDialogProps, ImportFileTooLargeError, ImportOptions, ImportResult, InvalidRegexError, KOREAN_SHEET_TAB_BAR_LABELS, type ListCellStylesOptions, MM_TO_PX, type MergeIndex, type MergeRange, MultiSheetEntry, NUMBER_FORMAT_PRESETS, type NamedCellStyle, type NumberFormatPreset, PAPER_SIZES_MM, PRINT_PLACEHOLDERS, PageBreakOverlay, type PageBreakOverlayProps, type PageMargins, type PaginationInput, type PaginationResult, type PaperSize, type ParsedCellRef, type PasteRequestPayload, type PasteSpecialRequestPayload, PivotAggregationKind, PivotAvailableField, PivotBuilder, type PivotBuilderLabels, type PivotBuilderProps, PivotChart, type PivotChartCategoryAxis, type PivotChartKind, type PivotChartLabels, type PivotChartProps, type PivotChartSeriesPoint, PivotConfig, PivotDetailsModal, type PivotDetailsModalProps, type PivotDrillDownDetails, type PivotDrillDownKind, type PivotDrillDownTarget, type PivotGridLabels, type PivotGridSnapshot, PivotLayoutOptions, PivotRefreshScope, PivotResult, PivotSlicer, type PivotSlicerLabels, type PivotSlicerProps, PivotSlicerScope, PivotTimeline, type PivotTimelineLabels, type PivotTimelineProps, type PlaceholderContext, type PrintController, type PrintOptions, type Orientation as PrintOrientation, type PrintPage, PrintPreview, type PrintPreviewLabels, type PrintPreviewProps, type ProcessInChunksOptions, type ProtectedAction, type ProtectedActionInfo, type RawCellValue, type RepeatRange, type ReplaceItem, type ResolvedPrintOptions, type ResolvedValidationOption, Row, type RowId, type RowOutline, type RowOutlineCell, type RowSource, type RowTree, type RowsDeletePayload, type RowsInsertPayload, type RowsReorderPayload, type SelectionAggregates, SelectionRange, SelectionSnapshot, type Sheet, type SheetId, SheetTabBar, type SheetTabBarController, type SheetTabBarLabels, type SheetTabBarProps, type SortColumnEntry, type SortColumnPayload, type SortDirection, type SortState, type SplitMode, type SplitPaneId, SplitPaneView, type SplitPaneViewProps, type TableStyleOptions, type TextOperator, type TextRule, type Token, type TokenizeError, type TopBottomRule, type UseFullscreenReturn, type UsePrintControllerOptions, type UseWorkbookBroadcastReturn, ValidationDropdown, type ValidationDropdownProps, type ValidationList, type ValidationListItem, type ValidationListOption, type ValidationLists, type Workbook, type WorkbookAction, type WorkbookController, type WorkbookToMultiSheetOptions, XlReact, type XlReactProps, a1ToCoord, adjustFormatDecimals, appendRule, applyCellBorderEdges, applyCellBorderPatch, applyCellFormatPatch, applyCellStyle, applyNamedCellStyle, asyncRowSource, buildAverageRule, buildCellValueRule, buildColorScaleRule, buildDataBarRule, buildDuplicateRule, buildIconSetRule, buildMergeIndex, buildPivot, buildRowTree, buildTableStyleFormats, buildTopBottomRule, cellAnnotationKey, cellValueToString, clearAllRules, clearRulesForColumns, collapseAtLevels, collectRowDescendantIds, combinedRowSource, compileMatcher, computeAggregates, computeRowOutline, coordToA1, coveredCellRanges, createCellStyleRegistry, createWorkbook, decreaseDecimals, defaultColumnLabel, defaultExportFilename, defaultRowLabel, defineCellStyle, dynamicRowSource, evaluateAst, evaluateConditionalFormats, exportMultiSheetXlsx, exportToCsv, exportToXlsx, extractRefs, filterOptions, findMatches, findMergeAt, formatCellValue, getCellStyle, importFromCsv, importFromXlsx, increaseDecimals, isFormulaError, isHeaderFooterEmpty, isRowSource, isValueInList, listCellStyles, makeConditionalCellRenderer, mergeAnchorOf, mergeSelection, normalizeList, normalizeMerges, normalizeOption, openSheetInNewWindow, paginate, parseA1, parseFormula, aggregate as pivotAggregate, pivotDrillDownAt, drillDownKey as pivotDrillDownKey, pivotDrillDownRows, pivotResultToChartSeries, pivotResultToGrid, processInChunks, removeCellStyle, replaceInValue, resolveCellAnnotation, resolveCellStyle, resolveColumnList, resolveConditionalDecoration, resolveHeaderFooter, resolvePivotDrillDown, resolvePlaceholders, resolvePrintOptions, selectionColumnIds, shiftFormulaRefs, startPrint, staticRowSource, toggleRowCollapse, tokenize, triggerBlobDownload, unmergeSelection, useAsyncRowSource, useDynamicRowSource, useFullscreen, usePivotAutoRefresh, usePivotRefreshAll, usePivotSlicerRowPredicate, usePivotSlicerScope, usePrintController, useRowSource, useWorkbook, useWorkbookBroadcast, valueToFilterKey, workbookReducer, workbookToMultiSheetEntries };

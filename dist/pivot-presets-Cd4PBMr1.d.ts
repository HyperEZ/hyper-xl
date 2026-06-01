import { R as Row } from './Row-CO-gLrwi.js';

/**
 * §10A — pivot table types. Source rows are aggregated against a `PivotConfig`
 * (Row × Column × Value × Filter areas) to produce a `PivotResult` matrix that
 * the renderer turns into a table.
 *
 * Field keys reference entries inside `Row.data` — pivots aggregate
 * `Row.data[field]`, not the raw `Row` shape.
 */
/** The four pivot drop zones. */
type PivotAreaName = 'row' | 'column' | 'value' | 'filter';
/**
 * Aggregation kinds available in the MVP (§10A.3 P1). Future "다중 집계" /
 * "차이·누계·순위·인덱스" entries (§10A.3 P2, §10A.4 P2) will be added as
 * additional members or composed via `valueDisplay`.
 */
type PivotAggregationKind = 'sum' | 'count' | 'countA' | 'average' | 'max' | 'min' | 'stdDev' | 'variance' | 'product';
/**
 * §10A.4 — display format applied per value field after aggregation.
 *
 * P1 percent family (ratios in `[0, 1]`, rendered as Excel-style `%`):
 *   - `normal`               → raw aggregate.
 *   - `percentOfTotal`       → cell / grand total.
 *   - `percentOfColumn`      → cell / column grand total.
 *   - `percentOfRow`         → cell / row grand total.
 *   - `percentOfParentRow`   → cell / parent-row aggregate.
 *                              At the top level the parent is the grand total.
 *   - `percentOfParentColumn`→ symmetric counterpart along the column axis.
 *
 * P2 calc family — operate along {@link PivotValueField.valueDisplayAxis}
 * ('column' by default, mirroring Excel's most-common pick):
 *   - `differenceFromPrevious`       → cell − previous cell (raw).
 *   - `percentDifferenceFromPrevious`→ (cell − prev) / prev (ratio).
 *   - `runningTotal`                 → cumulative sum of `cell` along the axis.
 *   - `percentOfRunningTotal`        → running total / grand total (ratio).
 *   - `rankAscending`                → 1 = smallest; ties share the lower rank
 *                                       (Excel's `RANK.EQ(..., 1)` semantics).
 *   - `rankDescending`               → 1 = largest; ties share the lower rank.
 *   - `index`                        → `(cell × grandTotal) /
 *                                       (rowTotal × columnTotal)`. Excel's
 *                                       relative-weight measure; useful to
 *                                       spot cells that over- or under-index
 *                                       against axis totals.
 *
 * Non-distributive aggregates (`average`, `min`, `max`, `variance`, `stdDev`,
 * `product`) compute ratio-of-aggregates rather than a contribution share,
 * mirroring Excel exactly — the result may exceed 100 %.
 */
type PivotValueDisplay = 'normal' | 'percentOfTotal' | 'percentOfColumn' | 'percentOfRow' | 'percentOfParentRow' | 'percentOfParentColumn' | 'differenceFromPrevious' | 'percentDifferenceFromPrevious' | 'runningTotal' | 'percentOfRunningTotal' | 'rankAscending' | 'rankDescending' | 'index';
/**
 * §10A.4 P2 — axis the calc-family display modes operate along. Picked per
 * value field via {@link PivotValueField.valueDisplayAxis}; defaults to
 * `'column'` (Excel's default for "Show Values As — Difference From / Running
 * Total / Rank / Index"). Ignored for the percent family (`percentOf*`) and
 * for `'normal'`.
 */
type PivotValueDisplayAxis = 'row' | 'column';
/**
 * §10A.5 P1 — date grouping units. Source values are bucketed into the
 * unit's calendar boundary (e.g. `'quarter'` collapses 2026-02-15 into the
 * `2026-Q1` bucket).
 */
type PivotDateGroupUnit = 'year' | 'quarter' | 'month' | 'week' | 'day';
/**
 * §10A.5 P1 — numeric binning. Values are bucketed into fixed-width
 * half-open intervals `[start, start + size)`. `origin` shifts the first
 * bin's start; the default `0` produces bins anchored at the y-axis
 * (`[0, size)`, `[size, 2·size)`, …).
 */
interface PivotNumberBin {
    /** Bin width. Must be a positive finite number. */
    size: number;
    /** Optional offset of the first bin's start. Defaults to `0`. */
    origin?: number;
}
/**
 * §10A.5 P1 — per-field grouping spec. Only one of `dateUnit` / `numberBin`
 * makes sense at a time; the engine picks the first matching variant. Empty
 * / `undefined` grouping passes values through unchanged.
 */
interface PivotFieldGrouping {
    dateUnit?: PivotDateGroupUnit;
    numberBin?: PivotNumberBin;
}
/**
 * §10A.5 P2 — one user-defined manual group. Lumps a hand-picked set of raw
 * (text) values under a single display `label` so distinct source values
 * collapse to one row/column bucket without editing the underlying data —
 * Excel's "Group Selection" on a text axis.
 *
 *   - `label`  — the bucket's display label (e.g. `'국내'`).
 *   - `values` — raw cell values to roll into this bucket. Matching uses
 *                `manualMatchKey` (string coercion via `String(value)`), so
 *                numeric `1` and string `"1"` collide on purpose — the
 *                builder's comma-string popover stays useful even for numeric
 *                source fields. Use string entries for text fields; for
 *                booleans, `String(true) === 'true'` is the equality.
 *
 * Buckets are non-overlapping — the first matching bucket wins. Values not
 * listed in any bucket pass through unchanged.
 */
interface PivotManualGroup {
    readonly label: string;
    readonly values: ReadonlyArray<unknown>;
}
/**
 * §10A.5 — bucketed value emitted by the grouping pass and stored in
 * `rowPaths` / `columnPaths` / `PivotHeaderCell.value` when a field carries a
 * `grouping` or `manualGroup` spec. The `__grouped` tag lets consumers
 * (renderers, labelers) distinguish a bucket from a raw value of the same
 * shape; `label` is what the grid displays. Engine-internal callers also
 * read `date` / `bin` to sort or interrogate the bucket bounds, or
 * `manualLabel` to recognise §10A.5 P2 manual buckets.
 */
interface PivotGroupedValue {
    readonly __grouped: true;
    /** Display label for the bucket (e.g. `'2026-Q1'`, `'1000–2000'`, `'국내'`). */
    readonly label: string;
    /**
     * Present when bucketed by a `dateUnit`. `start` anchors the bucket.
     *
     * Note: `start` is a `Date` instance, so `PivotResult` is intentionally
     * NOT JSON-safe — `JSON.stringify` would coerce `start` to an ISO string
     * and `isPivotGroupedValue` would still match (the `__grouped` brand
     * survives), but consumers reading `start.getTime()` would break. If
     * persistence / clipboard round-trip becomes required, add an explicit
     * `toJSON` / `fromJSON` pair here rather than relying on plain JSON.
     */
    readonly date?: {
        readonly unit: PivotDateGroupUnit;
        readonly start: Date;
    };
    /** Present when bucketed by a `numberBin`. `[start, end)`. */
    readonly bin?: {
        readonly start: number;
        readonly end: number;
    };
    /**
     * §10A.5 P2 — present when bucketed by a {@link PivotManualGroup}. The label
     * doubles as the discriminator so two manual groups with the same name on
     * different axes don't accidentally collide.
     */
    readonly manualLabel?: string;
}
/** Type guard for {@link PivotGroupedValue} stored in row/column paths. */
declare function isPivotGroupedValue(v: unknown): v is PivotGroupedValue;
/**
 * §10A.6 P1 — sort mode applied to a row/column field's GroupNode children.
 *
 *   - `'label-asc'` / `'label-desc'` — lexicographic on the display label
 *     (`labelOf(node.value)`). Grouped buckets (`PivotGroupedValue`) sort by
 *     their pre-baked label, which is designed to be lexically-comparable
 *     (e.g. `'2026-Q1' < '2026-Q2'`, `'0–100' < '100–200'` once zero-padded).
 *   - `'value-asc'` / `'value-desc'` — by aggregated value for the chosen
 *     `valueFieldIndex`. The aggregation reuses the value field's existing
 *     agg + valueDisplay; sort key is the leaf's column-grand-total (rows)
 *     or row-grand-total (columns).
 *   - `'manual'` — explicit `manualOrder` of group keys (the engine's
 *     `groupKeyOf` form, NOT the display label). Unspecified keys fall to
 *     the end in source order.
 */
type PivotSortMode = 'label-asc' | 'label-desc' | 'value-asc' | 'value-desc' | 'manual';
interface PivotFieldSort {
    mode: PivotSortMode;
    /** Required for `value-asc` / `value-desc`. Indexes into `config.values`. */
    valueFieldIndex?: number;
    /** Required for `manual`. List of `groupKeyOf(node.value)` strings in desired order. */
    manualOrder?: ReadonlyArray<string>;
}
/**
 * §10A.6 P1 — label-axis filter applied to GroupNode children before
 * flattening to leaves. Variants:
 *
 *   - `include`: Excel-style explicit allow-set on group keys (matches the
 *     filter checkbox dropdown). Most discoverable via the UI.
 *   - `text`: substring / prefix / suffix / equality match on the display
 *     label. Case-insensitive by default.
 *   - `number`: comparison against a raw numeric value held by the group's
 *     `value`. Grouped numeric bins compare against their `bin.start`.
 *   - `date`: comparison against a Date value (`value` instanceof Date, or
 *     grouped bucket's `date.start`).
 *
 * Multi-criteria stacking is out of scope for P1 — one filter per field.
 */
type PivotLabelFilter = {
    kind: 'include';
    values: ReadonlyArray<string>;
} | {
    kind: 'text';
    op: 'contains' | 'startsWith' | 'endsWith' | 'equals' | 'notEquals';
    pattern: string;
    caseInsensitive?: boolean;
} | {
    kind: 'number';
    op: 'gt' | 'lt' | 'gte' | 'lte' | 'equals' | 'notEquals' | 'between';
    value: number;
    /** Required for `between` (inclusive upper bound). */
    value2?: number;
} | {
    kind: 'date';
    op: 'before' | 'after' | 'on' | 'notOn' | 'between';
    /** ISO string or epoch ms; coerced via the engine's date parser. */
    value: string | number | Date;
    value2?: string | number | Date;
};
/**
 * §10A.6 P1 — value-based filter applied to one axis's leaves *after* the
 * matrix is computed. Operates on the leaf's grand-total aggregate for the
 * chosen `valueFieldIndex`.
 *
 *   - `topN`: keep the top / bottom N leaves by value.
 *   - `aboveAverage` / `belowAverage`: keep leaves > / < the axis-wide mean
 *     of the chosen value field.
 *   - `threshold`: keep leaves passing a fixed numeric comparison.
 *
 * Ties at the N+1 boundary keep all tied leaves (matches Excel semantics).
 */
type PivotValueFilter = {
    kind: 'topN';
    direction: 'top' | 'bottom';
    n: number;
    valueFieldIndex: number;
} | {
    kind: 'aboveAverage';
    valueFieldIndex: number;
} | {
    kind: 'belowAverage';
    valueFieldIndex: number;
} | {
    kind: 'threshold';
    op: 'gt' | 'lt' | 'gte' | 'lte' | 'equals' | 'notEquals';
    value: number;
    valueFieldIndex: number;
};
/** Field reference for the Row / Column areas. */
interface PivotField {
    /** Key inside `Row.data`. */
    key: string;
    /** Human label; defaults to `key`. */
    label?: string;
    /**
     * §10A.5 P1 — bucket raw cell values into date units or numeric bins
     * before grouping. Only applies on row / column axes; on Value / Filter
     * fields the engine ignores it.
     */
    grouping?: PivotFieldGrouping;
    /**
     * §10A.5 P2 — user-defined manual groups on a text field. Each entry rolls
     * the listed raw values into one bucket labelled by `group.label`. Values
     * not covered by any bucket pass through unchanged. Applied after
     * {@link grouping} so a number-binned axis can still carry manual
     * relabelling on top of its bins (rare, but consistent).
     */
    manualGroup?: ReadonlyArray<PivotManualGroup>;
    /**
     * §10A.6 P1 — sort applied to this field's GroupNode children. Defaults
     * to first-seen source order when omitted. Only meaningful on row/column
     * fields; the engine ignores it on Value / Filter fields.
     */
    sort?: PivotFieldSort;
    /**
     * §10A.6 P1 — label-side filter applied to this field's GroupNode
     * children before flattening. Non-matching nodes are dropped from the
     * tree. Only meaningful on row/column fields.
     */
    labelFilter?: PivotLabelFilter;
}
/** Field reference for the Value area — adds an aggregation kind. */
interface PivotValueField extends PivotField {
    /** Aggregation function. Defaults to `'sum'` (§10A.3). */
    agg?: PivotAggregationKind;
    /**
     * Display transform applied to the aggregated value. Defaults to `'normal'`
     * (raw number). See {@link PivotValueDisplay} for the full P1+P2 list.
     */
    valueDisplay?: PivotValueDisplay;
    /**
     * §10A.4 P2 — axis the calc-family modes (`differenceFromPrevious`,
     * `runningTotal`, `rankAscending` / `Descending`, `percentOfRunningTotal`,
     * `percentDifferenceFromPrevious`) operate along. Defaults to `'column'`
     * (Excel's default for "Show Values As"). Ignored for `'normal'` and the
     * five percent modes.
     */
    valueDisplayAxis?: PivotValueDisplayAxis;
}
/** Field reference for the Filter area — pre-aggregation row predicate. */
interface PivotFilterField extends PivotField {
    /**
     * Allowed values for the field. `undefined` (the default) passes every
     * value through. Comparison is on the raw cell value via
     * `canonicalFilterKey` so booleans/nulls/empty strings stay distinct from
     * stringified equivalents.
     */
    selectedValues?: ReadonlyArray<unknown>;
}
/**
 * §10A.7 P1 — placement of row-axis subtotal rows.
 *
 *   - `'top'`    — subtotal row precedes its group's leaves.
 *   - `'bottom'` — subtotal row follows its group's leaves.
 *   - `'none'`   — subtotals are not rendered.
 *
 * Subtotals are emitted for every non-leaf level on the row axis (i.e. one
 * subtotal per group at depths `0..rows.length - 2`). When `rows.length < 2`
 * there are no non-leaf groups, so the option has no effect.
 */
type PivotSubtotalPosition = 'top' | 'bottom' | 'none';
/**
 * §10A.7 P1 — row-axis label layout, mirroring Excel's three modes.
 *
 *   - `'tabular'` (default) — one row-header column per row field; every leaf
 *     carries the full path across those columns.
 *   - `'outline'` — one row-header column per row field, but only the deepest
 *     label appears on leaf rows; parent labels live on the subtotal rows
 *     (which makes `'outline'` most useful with `subtotalPosition !== 'none'`).
 *   - `'compact'` — a single row-header column; every label is rendered into
 *     that column with depth-proportional indentation.
 */
type PivotReportLayout = 'compact' | 'outline' | 'tabular';
/**
 * §10A.7 P2 — built-in pivot style preset, mirroring Excel's "PivotStyle
 * Light/Medium/Dark" gallery (one representative member per family). The
 * preset drives header / banded fill colors only; cell content stays
 * untouched, so consumer cellFormats overrides win as usual.
 *
 *   - `'none'`   — no style (default). Headers + body keep the bare grid look.
 *   - `'light'`  — soft slate accents (Excel's PivotStyleLight16 family).
 *   - `'medium'` — saturated blue header band (Excel's PivotStyleMedium9).
 *   - `'dark'`   — high-contrast charcoal header, bright body (Medium14-ish).
 */
type PivotStylePreset = 'none' | 'light' | 'medium' | 'dark';
/**
 * §10A.7 P1+P2 — pivot layout options. Engine ignores layout entries (`*`);
 * they're rendering concerns owned by `gridAdapter`. Only `subtotalPosition`
 * is read by the engine (to decide whether subtotal computation is worth
 * doing).
 */
interface PivotLayoutOptions {
    /** Where to render row-axis subtotals. Defaults to `'none'`. */
    subtotalPosition?: PivotSubtotalPosition;
    /** Row-axis label layout. Defaults to `'tabular'`. */
    reportLayout?: PivotReportLayout;
    /**
     * String substituted for empty body cells (the engine emits `null` for
     * buckets with no rankable source values). Defaults to `''` (blank).
     */
    emptyCellDisplay?: string;
    /**
     * §10A.7 P2 — when `true`, parent labels are repeated on every leaf row
     * (and not just on the first one) for `outline` / `compact` layouts.
     * Tabular always repeats; the option is a no-op there. Defaults to `false`
     * (Excel's pre-2016 "leave parent rows blank" look).
     */
    repeatItemLabels?: boolean;
    /**
     * §10A.7 P2 — alternate the background fill on body rows for visual
     * separation (Excel's "Banded Rows" checkbox in the PivotTable styles
     * group). Banding applies to leaf rows only; subtotals and grand totals
     * keep their own background. Defaults to `false`.
     */
    bandedRows?: boolean;
    /**
     * §10A.7 P2 — alternate the background fill on body columns. Defaults to
     * `false`. Banding columns and rows can be combined.
     */
    bandedColumns?: boolean;
    /**
     * §10A.7 P2 — choose a built-in pivot style family (header band + banding
     * accent colors). Defaults to `'none'`. The grid still honours
     * consumer-provided `cellFormats`, which override the preset on a per-cell
     * basis.
     */
    stylePreset?: PivotStylePreset;
}
/** Human-readable label for a subtotal position (used by the layout panel). */
declare const PIVOT_SUBTOTAL_POSITION_LABELS: Readonly<Record<PivotSubtotalPosition, string>>;
/** Human-readable label for a report layout (used by the layout panel). */
declare const PIVOT_REPORT_LAYOUT_LABELS: Readonly<Record<PivotReportLayout, string>>;
/**
 * Full pivot specification. Field arrays drive grouping order — the first
 * entry in `rows` is the outermost row grouping, etc.
 *
 * `showGrandTotalRow` / `showGrandTotalColumn` cover the §10A.7 P1
 * "총합계 행/열 On/Off" toggle. Defaults are `true` to mirror Excel's
 * out-of-the-box behaviour.
 */
interface PivotConfig {
    rows: ReadonlyArray<PivotField>;
    columns: ReadonlyArray<PivotField>;
    values: ReadonlyArray<PivotValueField>;
    filters: ReadonlyArray<PivotFilterField>;
    showGrandTotalRow?: boolean;
    showGrandTotalColumn?: boolean;
    /**
     * §10A.6 P1 — value-based filter applied to row leaves after the matrix
     * is computed. Leaves are filtered against their grand-total-column value
     * for the chosen `valueFieldIndex`. Single-filter per axis in P1.
     */
    rowValueFilter?: PivotValueFilter;
    /** §10A.6 P1 — symmetric to `rowValueFilter` for column leaves. */
    columnValueFilter?: PivotValueFilter;
    /** §10A.7 P1 — layout/display options (subtotals, report layout, empty-cell display). */
    layout?: PivotLayoutOptions;
}
/**
 * §10A.11 P1 — generic preset descriptor. Bundles a stable `id` (typed as a
 * literal union so consumers can switch over it exhaustively), a Korean
 * display label, an optional description (tooltip / aria-description), and a
 * fully-specified `PivotConfig` ready to feed into `PivotBuilder`
 * (`initialConfig`) or `buildPivot` directly.
 *
 * Domain-specific preset arrays (e.g. {@link WiringPivotPreset}) narrow `Id`
 * to their own union; consumers wanting their own preset bank can do the
 * same: `PivotPreset<'mine-a' | 'mine-b'>`.
 */
interface PivotPreset<Id extends string = string> {
    readonly id: Id;
    readonly label: string;
    readonly description?: string;
    readonly config: PivotConfig;
}
/**
 * Default layout options used as a fallback when a `PivotConfig` doesn't carry
 * a `layout` block (or sets only a subset of the fields). Frozen so consumers
 * can spread it without accidentally mutating the shared default.
 */
declare const DEFAULT_PIVOT_LAYOUT: Required<PivotLayoutOptions>;
/** Empty pivot config — useful as a `useState` initializer. */
declare const EMPTY_PIVOT_CONFIG: PivotConfig;
/**
 * A single header cell along the row or column axis. `span` is the number of
 * leaf columns/rows this header covers — used by the renderer to emit `colSpan`
 * / `rowSpan`. `path` records the field/value pairs from the root of the
 * header tree down to this cell so consumers can identify a header
 * unambiguously (e.g. drill-down later in §10A.9 will use it).
 */
interface PivotHeaderCell {
    field: string;
    label: string;
    value: unknown;
    span: number;
    depth: number;
    path: ReadonlyArray<{
        field: string;
        value: unknown;
    }>;
}
/**
 * Header level for the value-field row in column headers (when `values.length`
 * drives an extra deepest row of "Sum of X / Avg of Y / …" labels).
 */
interface PivotValueHeaderCell {
    valueFieldIndex: number;
    label: string;
    span: 1;
    depth: number;
}
/**
 * §10A.7 P1 — one row-axis subtotal entry, computed once per non-leaf group on
 * the row axis. The renderer (`gridAdapter`) decides where to insert it (top
 * vs bottom of the group, or not at all) based on `layout.subtotalPosition`.
 *
 * The shape mirrors a body row in `PivotResult.matrix` — `values` is laid
 * out `c * valueFields.length + v` for column-leaf `c` and value-field `v`,
 * and `grandTotalColumnValues` lines up with `PivotResult.grandTotalColumn`'s
 * per-row slice.
 */
interface PivotRowSubtotal {
    /** Depth of the non-leaf node, in `[0, rows.length - 2]`. */
    depth: number;
    /** Field/value pairs from the root of the row tree to the group node. */
    path: ReadonlyArray<{
        field: string;
        value: unknown;
    }>;
    /** First (inclusive) leaf-row index covered by this subtotal. */
    leafFrom: number;
    /** Last (inclusive) leaf-row index covered by this subtotal. */
    leafTo: number;
    /** Aggregated cells for the group — same indexing as a `matrix` row. */
    values: ReadonlyArray<number | null>;
    /** §10A.4 display-transformed counterpart of `values`. */
    displayValues: ReadonlyArray<number | null>;
    /** Per-value grand-total-column slice for the group, or `null` when the GT-column is off. */
    grandTotalColumnValues: ReadonlyArray<number | null> | null;
    /** Display-transformed counterpart of `grandTotalColumnValues`. */
    displayGrandTotalColumnValues: ReadonlyArray<number | null> | null;
}
/**
 * Output of {@link buildPivot}. Coordinates are pre-flattened:
 *   - `matrix[r][c * valueFields.length + v]` holds the aggregate for leaf
 *     row `r`, leaf column `c`, and value field `v`.
 *   - `grandTotalRow[c * valueFields.length + v]` holds the column-wise grand
 *     total for value field `v` (computed fresh from the source — not the sum
 *     of `matrix[*][..]`, which would break for `average`/`min`/`max`/…).
 *   - `grandTotalColumn[r * valueFields.length + v]` mirrors the same for rows.
 *   - `grandTotal[v]` is the overall aggregate per value field.
 *
 * `null` cells signal "no source rows fell into this bucket" — Excel renders
 * those as blank.
 */
interface PivotResult {
    /** Row-axis header rows, depth-major: `rowHeaders[depth][headerIndex]`. */
    rowHeaders: ReadonlyArray<ReadonlyArray<PivotHeaderCell>>;
    /** Column-axis header rows, depth-major (top first). */
    columnHeaders: ReadonlyArray<ReadonlyArray<PivotHeaderCell>>;
    /**
     * When `values.length > 1` or `valueAxis === 'column'` (future), the
     * renderer appends a deepest header row enumerating the value fields per
     * leaf column. `null` when not needed (single value field).
     */
    valueHeaderRow: ReadonlyArray<PivotValueHeaderCell> | null;
    /** Leaf row paths (one entry per body row), in render order. */
    rowPaths: ReadonlyArray<ReadonlyArray<unknown>>;
    /** Leaf column paths (one entry per body column group), in render order. */
    columnPaths: ReadonlyArray<ReadonlyArray<unknown>>;
    /** Value field descriptors that align with the matrix's `v` axis. */
    valueFields: ReadonlyArray<{
        key: string;
        label: string;
        agg: PivotAggregationKind;
        valueDisplay: PivotValueDisplay;
        /**
         * §10A.4 P2 — axis the calc-family display modes operated along (the
         * engine resolves the default per `PivotValueField` so consumers reading
         * `result.valueFields[v].valueDisplayAxis` always see a concrete value).
         */
        valueDisplayAxis: PivotValueDisplayAxis;
    }>;
    /** Aggregated cells. See {@link PivotResult} for the indexing scheme. */
    matrix: ReadonlyArray<ReadonlyArray<number | null>>;
    /** Per-column × value grand totals, or `null` when disabled. */
    grandTotalRow: ReadonlyArray<number | null> | null;
    /** Per-row × value grand totals, or `null` when disabled. */
    grandTotalColumn: ReadonlyArray<number | null> | null;
    /** Per-value-field overall total, or `null` when both grand toggles off. */
    grandTotal: ReadonlyArray<number | null> | null;
    /**
     * §10A.4 — same shape as `matrix`, but with each value-field column
     * post-processed through its `valueDisplay`. For `'normal'` value fields
     * this is identical to `matrix`; for the percent modes it holds the
     * `cell / denominator` ratio (or `null` if the denominator is `null` / `0`).
     * Consumers that want the raw aggregate should read `matrix`; consumers
     * that want the renderable value should read `displayMatrix`.
     */
    displayMatrix: ReadonlyArray<ReadonlyArray<number | null>>;
    /** Display-transformed counterpart of `grandTotalRow`. */
    displayGrandTotalRow: ReadonlyArray<number | null> | null;
    /** Display-transformed counterpart of `grandTotalColumn`. */
    displayGrandTotalColumn: ReadonlyArray<number | null> | null;
    /** Display-transformed counterpart of `grandTotal`. */
    displayGrandTotal: ReadonlyArray<number | null> | null;
    /** Number of source rows that survived the filter step. */
    sourceRowCount: number;
    /**
     * §10A.7 P1 — row-axis subtotals (one per non-leaf group). Always emitted
     * when `rows.length >= 2`; the renderer applies the configured
     * `subtotalPosition` to decide whether to surface them. Empty array when
     * `rows.length < 2` (no non-leaf groups exist).
     */
    rowSubtotals: ReadonlyArray<PivotRowSubtotal>;
    /**
     * §10A.9 P1 — per row leaf, the indices into the original `rows` array
     * (passed to {@link buildPivot}) whose data fell into that leaf after every
     * filter pass (Filter area + label filter + value filter). Drill-down /
     * "Show Details" consumers intersect these with `columnLeafSourceIndices`
     * to recover the exact source rows behind any body cell.
     *
     * Aligned with `rowPaths` — `rowLeafSourceIndices[r]` corresponds to
     * `rowPaths[r]`. Empty for column-only pivots (no row fields → one
     * synthetic leaf collecting every effective source row).
     */
    rowLeafSourceIndices: ReadonlyArray<ReadonlyArray<number>>;
    /** §10A.9 P1 — symmetric counterpart of `rowLeafSourceIndices`. */
    columnLeafSourceIndices: ReadonlyArray<ReadonlyArray<number>>;
    /**
     * §10A.9 P1 — source-row indices that survived every filter on both axes
     * combined (the §10A.6 "effective" set). Equivalently: rows that are
     * row-axis visible (in *some* `rowLeafSourceIndices[r]`) AND column-axis
     * visible (in *some* `columnLeafSourceIndices[c]`). Used as the source
     * bucket behind grand-total cells and as the intersection target for any
     * single-axis drill-down (grand-total row / column / corner).
     */
    effectiveSourceIndices: ReadonlyArray<number>;
}
/**
 * A descriptor for a field the user can drag into the pivot — typically
 * derived from the source data's columns. `type` lets the field list panel
 * pick a sensible default area (numeric → Value, otherwise → Row) when the
 * checkbox is toggled.
 */
interface PivotAvailableField {
    key: string;
    label?: string;
    /** Hint for the default-area heuristic. */
    type?: 'text' | 'number' | 'date';
}
/** Human-readable label for an aggregation kind (used by the field list). */
declare const PIVOT_AGGREGATION_LABELS: Readonly<Record<PivotAggregationKind, string>>;
/** Human-readable label for a value-display mode (used by the value chip). */
declare const PIVOT_VALUE_DISPLAY_LABELS: Readonly<Record<PivotValueDisplay, string>>;
/** Human-readable label for a date-grouping unit (used by the grouping popover). */
declare const PIVOT_DATE_UNIT_LABELS: Readonly<Record<PivotDateGroupUnit, string>>;
/** Human-readable label for a sort mode (used by the sort/filter popover). */
declare const PIVOT_SORT_MODE_LABELS: Readonly<Record<PivotSortMode, string>>;

/**
 * §10A.11 P1 + P2 — preset pivot recipes commonly used in the wiring (배선)
 * shipment workflow. Each preset bundles a ready-to-apply {@link PivotConfig}
 * that can be fed into `PivotBuilder` (`initialConfig`) or `buildPivot`
 * directly, so consumers can ship a "즉시 적용" button without restating the
 * pivot layout by hand. The companion {@link buildWiringShipmentDataset}
 * produces a deterministic fake shipment manifest that exercises every
 * preset family.
 *
 * §10A.11 P2 adds three lenses:
 *   - 항차별 적재 현황       (voyage-level loading status, by region)
 *   - 부서별 면허 발급 현황   (license issuance count by department, by month)
 *   - 부서별 생산 진척        (production progress %, by department × month)
 */
/**
 * Stable identifier for a wiring-shipment preset. Drives the `key`/data-testid
 * pattern in demos and storybooks so consumers can opt into a specific layout.
 */
type WiringPivotPresetId = 'wiring-sum-by-region' | 'wiring-sum-by-product' | 'wiring-sum-by-department' | 'wiring-monthly-cumulative' | 'wiring-plan-vs-actual-percent' | 'wiring-voyage-loading-status' | 'wiring-license-status-by-department' | 'wiring-production-progress-by-department';
/**
 * One wiring-shipment preset entry — a narrowed {@link PivotPreset} whose
 * `id` is one of the library-shipped {@link WiringPivotPresetId} values.
 * Consumers defining their own preset banks can use `PivotPreset<'mine-a' |
 * 'mine-b'>` directly without copy-pasting this shape.
 */
type WiringPivotPreset = PivotPreset<WiringPivotPresetId>;
/**
 * Shape of the row data emitted by {@link buildWiringShipmentDataset}. The
 * keys line up with {@link WIRING_PRESET_FIELDS} so a preset can be applied
 * against the dataset without any column-name remapping.
 */
interface WiringShipmentData {
    /** 양하항 (destination port). */
    region: string;
    /** 품종 (cargo product class). */
    product: string;
    /** 부서 (originating department). */
    department: string;
    /** Bucketed month label `YYYY-MM`, aligned with `shipDate`. */
    month: string;
    /** Shipment timestamp — feeds §10A.5 date grouping. */
    shipDate: Date;
    /** 수량 (lot count). */
    qty: number;
    /** 선적량 (loaded tonnage, t). */
    weight: number;
    /** 계획(t) — planned tonnage for plan-vs-actual analysis. */
    planTon: number;
    /** §10A.11 P2 — 항차 (voyage identifier, `'V001'` form). */
    voyage: string;
    /** §10A.11 P2 — 면허 발급 상태 (license status enum). */
    license: '발급' | '심사' | '미발급';
    /** §10A.11 P2 — 생산 진척 (% completed, 0..100). */
    productionPct: number;
}
/**
 * Available fields published by the wiring-shipment dataset. The order
 * matches the §10A.11 PRD walkthrough (text → date → numeric) so the field
 * list in the demo reads top-to-bottom in the same order users encounter
 * them in the source spreadsheet.
 */
declare const WIRING_PRESET_FIELDS: ReadonlyArray<PivotAvailableField>;
/**
 * Build a deterministic fake wiring-shipment manifest. With the default seed
 * the rows are stable across reloads so demos and screenshot tests read the
 * same numbers every run; passing a different seed lets storybook stories or
 * regression suites generate independent fixtures without breaking shared
 * snapshots.
 *
 * Returned rows carry `data` matching {@link WiringShipmentData} and `id`
 * shaped as `ship-{1..count}` for easy log/output diffing.
 */
declare function buildWiringShipmentDataset(options?: {
    count?: number;
    seed?: number;
}): Row[];
/**
 * Ordered list of wiring-shipment presets. The first three share the §10A.11
 * "배선신청 합계" family; the next two cover monthly cumulative and the
 * plan-vs-actual percent lens. The §10A.11 P2 entries (voyage loading,
 * license status, production progress) round out the bank. Frozen so
 * consumers can re-export or destructure without accidentally mutating the
 * shared definitions.
 */
declare const WIRING_PIVOT_PRESETS: ReadonlyArray<WiringPivotPreset>;
/**
 * Map view over {@link WIRING_PIVOT_PRESETS}. Useful when a UI key (button
 * `id`, URL slug) already names a preset and the caller just needs the
 * config to feed into `buildPivot` or `PivotBuilder`.
 */
declare const WIRING_PIVOT_PRESET_BY_ID: Readonly<Record<WiringPivotPresetId, WiringPivotPreset>>;

export { type PivotValueField as A, type PivotValueFilter as B, type PivotValueHeaderCell as C, DEFAULT_PIVOT_LAYOUT as D, EMPTY_PIVOT_CONFIG as E, WIRING_PIVOT_PRESET_BY_ID as F, WIRING_PRESET_FIELDS as G, type WiringPivotPreset as H, type WiringPivotPresetId as I, type WiringShipmentData as J, buildWiringShipmentDataset as K, isPivotGroupedValue as L, type PivotAggregationKind as P, WIRING_PIVOT_PRESETS as W, type PivotConfig as a, type PivotResult as b, type PivotLayoutOptions as c, type PivotAvailableField as d, PIVOT_AGGREGATION_LABELS as e, PIVOT_DATE_UNIT_LABELS as f, PIVOT_REPORT_LAYOUT_LABELS as g, PIVOT_SORT_MODE_LABELS as h, PIVOT_SUBTOTAL_POSITION_LABELS as i, PIVOT_VALUE_DISPLAY_LABELS as j, type PivotAreaName as k, type PivotDateGroupUnit as l, type PivotField as m, type PivotFieldGrouping as n, type PivotFieldSort as o, type PivotFilterField as p, type PivotGroupedValue as q, type PivotHeaderCell as r, type PivotLabelFilter as s, type PivotNumberBin as t, type PivotPreset as u, type PivotReportLayout as v, type PivotRowSubtotal as w, type PivotSortMode as x, type PivotSubtotalPosition as y, type PivotValueDisplay as z };

interface Row {
    id: string | number;
    data: Record<string, unknown>;
    /**
     * Initial row height in pixels. Overrides the grid's `rowHeight` default
     * for this row. User drag-resize (OUT-7 §6.1) records its own per-id
     * override on top of this initial value.
     */
    height?: number;
    /**
     * §6.4 row hierarchy depth — `0` is top-level, `1` is a child, `2` is a
     * grandchild, and so on. Setting this on any row turns the grid into a
     * grouped view; the row-grouping helpers (`computeRowOutline`,
     * `collectRowDescendantIds`, …) read the depth to derive parent/child
     * relationships and to drive the +/- disclosure widget and per-level
     * indentation in the first data column.
     */
    level?: number;
    /**
     * §6.4 explicit parent reference. When present it overrides the implicit
     * "parent is the nearest preceding row whose level is one less" rule used
     * by the row-grouping helpers, which is enough for trees that arrive in
     * pre-order. Use `parentId` when rows are not pre-ordered, or to point at
     * a parent that does not directly precede the child. `null` (or omitted)
     * means "root / no explicit parent".
     */
    parentId?: string | number | null;
}

export type { Row as R };

import * as ExcelJS from 'exceljs';
import { G as GridSnapshot, E as ExportOptions, I as ImportOptions, a as ImportResult, C as CellFormat } from './types-Dnb2TDOE.js';
import 'react';
import './Row-CO-gLrwi.js';

/**
 * Mutate the given ExcelJS workbook so it carries the grid snapshot. The
 * workbook is supplied by the caller (so this module never imports `exceljs`
 * at runtime — the lazy import happens in `exportXlsx.ts`).
 *
 * Layout:
 * - One worksheet (`options.sheetName ?? 'Sheet1'`)
 * - When `includeHeader === true`, prepend a synthetic row of column ids
 *   (default `false` — most consumers already carry a caption row at row 0)
 * - Body rows in the chosen `range`, columns filtered/reordered via
 *   `columnIds`
 * - Cell formats (when `preserveFormat !== false`) applied per body cell
 *   AFTER the auto header style, so consumer formats win per field
 * - Merges (when `preserveFormat !== false`) translated and applied — out-of-
 *   range merges are silently dropped
 * - When `headerStyle !== false`, the first xlsx row (auto or consumer row 0)
 *   is bold + filled + centered; when `freezeHeader !== false`, row 1 is
 *   pinned in the worksheet view
 */
declare function buildWorkbookFromSnapshot(workbook: ExcelJS.Workbook, snapshot: GridSnapshot, options?: ExportOptions): ExcelJS.Worksheet;

/**
 * ExcelJS workbook → `ImportResult`. The workbook is supplied by the caller
 * (loaded via `importXlsx.ts`'s lazy `await import('exceljs')`).
 *
 * - Picks `options.sheetName` (falls back to the first sheet, with a warning
 *   when the named sheet is missing)
 * - Treats `options.headerRow` (1-based, default 1) as the column-header row;
 *   pass `null` to skip header parsing and label columns A/B/C…
 * - Slugs each header label into a column id, applying `options.columnMapping`
 *   first if present
 * - Reads cell values + styles (when `preserveFormat !== false`), preserving
 *   non-empty styles into `cellFormats` keyed by `{rowInExport}:{colInExport}`
 * - Converts ExcelJS merges into `SelectionRange[]` in export coordinates
 *   (rows above the data band are dropped)
 */
declare function parseWorkbookToSnapshot(workbook: ExcelJS.Workbook, options?: ImportOptions): ImportResult;

/**
 * `CellFormat` → ExcelJS `Style`. Empty input → empty output (caller decides
 * whether to skip assignment).
 */
declare function cellFormatToExcelStyle(format: CellFormat): Partial<ExcelJS.Style>;
/** ExcelJS `Style` → `CellFormat`. Empty input → `undefined`. */
declare function cellFormatFromExcelStyle(style: Partial<ExcelJS.Style> | undefined): CellFormat | undefined;

export { buildWorkbookFromSnapshot, cellFormatFromExcelStyle, cellFormatToExcelStyle, parseWorkbookToSnapshot };

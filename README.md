# hyper-xl

Excel-like grid component library for React. Inject your own cell renderers and keep the spreadsheet engine out of your application code.

Virtualized rendering with selection, editing, clipboard, fill, sort and filter, find and replace, zoom, annotations, protection, aggregation, pivot tables, conditional formatting, cell visual formatting, and Excel (xlsx) import/export.

> **Distribution notice.** This package ships a prebuilt, minified bundle. The core engine source is not included. See [License](#license) below: free for evaluation and non-commercial use, commercial use requires a separate license.

📖 **Full API reference:** [`docs/reference.html`](docs/reference.html) (open in a browser for the complete interactive reference).

## Install

```bash
npm install hyper-xl
# or
pnpm add hyper-xl
# or
yarn add hyper-xl
```

### Peer dependencies

`react` and `react-dom` are required peers. `exceljs` is an **optional** peer, needed only if you import the Excel helpers from `hyper-xl/exceljs`.

```bash
npm install react react-dom
npm install exceljs   # optional, only for xlsx import/export
```

| Peer        | Range                  | Required                              |
| ----------- | ---------------------- | ------------------------------------- |
| `react`     | `^18.0.0 \|\| ^19.0.0` | yes                                   |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` | yes                                   |
| `exceljs`   | `^4.4.0`               | optional (only for `hyper-xl/exceljs`)|

## Usage

```tsx
import { useState } from 'react';
import {
  CellFormatToolbar,
  XlReact,
  cellFormatKey,
  type CellFormatsMap,
  type Column,
  type Row,
  type SelectionSnapshot,
} from 'hyper-xl';
import 'hyper-xl/styles.css';
import 'hyper-xl/themes/light.css';

const columns: Column[] = [
  { id: 'name', header: 'Name', accessor: (r) => r.data.name },
  { id: 'qty', header: 'Qty', accessor: (r) => r.data.qty },
];

const rows: Row[] = [
  { id: 1, data: { name: 'Container A', qty: 12 } },
  { id: 2, data: { name: 'Container B', qty: 8 } },
];

const initialCellFormats: CellFormatsMap = {
  [cellFormatKey(0, 1)]: {
    align: { horizontal: 'right' },
    font: { family: 'Consolas, monospace' },
  },
};

export function Page() {
  const [selection, setSelection] = useState<SelectionSnapshot | null>(null);
  const [cellFormats, setCellFormats] = useState<CellFormatsMap>(initialCellFormats);

  return (
    <>
      <CellFormatToolbar
        selection={selection}
        cellFormats={cellFormats}
        onCellFormatsChange={setCellFormats}
      />
      <XlReact
        columns={columns}
        rows={rows}
        cellFormats={cellFormats}
        onSelectionChange={setSelection}
      />
    </>
  );
}
```

`CellFormatToolbar` edits the sparse `CellFormatsMap` form. The resolver form of `cellFormats` is useful for read-only derived formatting; apps that edit formats through the built-in toolbar should keep a map-backed state.

### Custom cell rendering

```tsx
const columns: Column[] = [
  {
    id: 'qty',
    header: 'Qty',
    accessor: (r) => r.data.qty as number,
    cellRenderer: ({ value }) => <strong>{value.toLocaleString()}</strong>,
    cellEditor: ({ value, onCommit, onCancel }) => (
      <input
        defaultValue={String(value)}
        onBlur={(e) => onCommit(Number(e.target.value))}
        onKeyDown={(e) => e.key === 'Escape' && onCancel()}
        autoFocus
      />
    ),
  },
];
```

## Entry points

| Import path             | Contents                                                              |
| ----------------------- | --------------------------------------------------------------------- |
| `hyper-xl`              | Grid component, hooks, formatting utilities, and types                |
| `hyper-xl/exceljs`      | Low-level ExcelJS helpers (requires the `exceljs` peer)               |
| `hyper-xl/pivot/presets`| Pivot presets and the generic `PivotPreset<Id>` shape                 |
| `hyper-xl/styles.css`   | Required base stylesheet (tokens + class rules)                       |
| `hyper-xl/themes/light.css` | Optional light theme token overrides                              |

## Public API (highlights)

The most common exports are listed below; the package ships full TypeScript declarations, so your editor surfaces the complete API on import.

| Export                 | Kind      | Notes                                                                 |
| ---------------------- | --------- | --------------------------------------------------------------------- |
| `XlReact`              | component | Virtualized Excel-like grid component                                 |
| `CellFormatToolbar`    | component | Controlled toolbar for editing selected cell formats                  |
| `FormulaBar`           | component | Controlled formula/value bar bound to the active selection            |
| `XlReactProps`         | type      | Controlled grid props: rows, columns, callbacks, formats              |
| `Column<T>`            | type      | `id`, `header`, `accessor`, optional `cellRenderer` / `cellEditor`    |
| `Row`                  | type      | `{ id, data }` where `data` is `Record<string, unknown>`              |
| `CellFormat`           | type      | Cell-level visual formatting model (font / alignment / fill / border) |
| `CellFormatsMap`       | type      | Sparse `${row}:${col}` map for per-cell formats                       |
| `cellFormatKey`        | utility   | Builds the `${row}:${col}` key used by `CellFormatsMap`               |
| `applyCellFormatPatch` | utility   | Applies a format patch across selected ranges                         |
| `applyCellBorderPatch` | utility   | Applies Excel-style range border commands                             |
| `computeAggregates`    | utility   | Computes aggregate values over a selection                            |

## CSS

The library ships CSS as standalone files only. The JS entry does **not** side-effect-import any CSS, which keeps Next.js and other "no global CSS from node_modules" bundlers happy and avoids double-loading. Import the stylesheet explicitly:

```ts
import 'hyper-xl/styles.css';        // required
import 'hyper-xl/themes/light.css';  // optional theme
```

All visible styles are driven by `--xl-react-*` CSS variables, so apps can override individual tokens without touching the bundle.

## Requirements

- Node `>=20`
- React 18 or 19

## License

hyper-xl is distributed under the **HyperEZ Source-Available License** (see [LICENSE](LICENSE)).

- **Evaluation, learning, and non-commercial use:** permitted at no cost.
- **Commercial or production use:** requires a separate commercial license.

To obtain a commercial license, or for any licensing question, contact **support@hyperez.io**.

Copyright (c) 2026 HyperEZ Inc. (주식회사 하이퍼이지). All rights reserved.

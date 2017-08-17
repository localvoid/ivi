export interface Matrix {
  items: number[];
  columns: number;
}

export interface MatrixRowView {
  items: number[] | null;
  offset: number;
  length: number;
}

export function matrix(rows: number, cols: number): Matrix {
  return {
    items: new Array(rows * cols).fill(0),
    columns: cols,
  };
}

export function matrixGet(m: Matrix, i: number, j: number): number {
  return m.items[i * m.columns + j];
}

export function matrixSet(m: Matrix, i: number, j: number, value: number): void {
  m.items[i * m.columns + j] = value;
}

export function matrixRowView(items: number[] | null, offset: number, length: number): MatrixRowView {
  return { items, offset, length };
}

export function matrixGetRowView(view: MatrixRowView, m: Matrix, row: number): void {
  view.items = m.items;
  view.offset = row * m.columns;
  view.length = m.columns;
}

export function matrixRowViewGet(v: MatrixRowView, i: number): number {
  return v.items![i + v.offset];
}

export function matrixRowViewSet(v: MatrixRowView, i: number, value: number): void {
  v.items![i + v.offset] = value;
}

export function matrixRowViewMul(lhs: MatrixRowView, rhs: MatrixRowView): number {
  let result = 0;
  for (let i = 0; i < lhs.length; i++) {
    result += lhs.items![i] * rhs.items![i];
  }
  return result;
}

export function matrixRowViewNormalize(v: MatrixRowView): number {
  return Math.sqrt(matrixRowViewMul(v, v));
}

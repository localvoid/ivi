export type TNode =
  | TElement // Element
  | string   // Text
  | number   // Expr index
  ;

export interface TElement {
  readonly flags: number;
  readonly prefix: string;
  readonly suffix: string;
  readonly props: TProperty[] | null;
  readonly style: TStyle | null;
  readonly children: TNode[] | number | null;
}

export const enum TFlags {
  // Element Flags:
  // <div &="offsets" />
  GenerateOffsets = 1,
  // <textarea .value={} />
  EscapeInnerHTML = 1 << 1,

  // Property Flags
  // Do not serialize properties with empty string value
  IgnoreEmptyString = 1,
}

export interface TProperty {
  /** Property prefix. */
  readonly prefix: string;
  /** Property flags. */
  readonly flags: number;
  /** Expression index. */
  readonly i: number;
}

export interface TStyle {
  /** Static style. */
  readonly stat: string;
  /** Dynamic style. */
  readonly dyn: TProperty[] | null;
}

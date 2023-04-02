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
  readonly children: TNode[] | null;
}

export const enum TFlags {
  GenerateOffsets = 1,
}

export interface TProperty {
  /** Attribute prefix. */
  prefix: string;
  /** Expression index. */
  readonly i: number;
}

export interface TStyle {
  readonly prefix: string;
  readonly dynamic: TProperty[];
}

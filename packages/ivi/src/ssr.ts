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

export type VAny =
  | null       // Empty slot
  | undefined  // Empty slot
  | false      // Empty slot
  | string     // Text
  | number     // Text
  | VTemplate  // Template
  | VAny[]     // Array / List
  ;

export interface VTemplate {
  /** Template Descriptor. */
  readonly d: TemplateDescriptor;
  /** Expressions. */
  readonly e: any[];
}

export type TemplateDescriptor = TNode[];

export type Component = undefined;

export type ComponentFactory = {
  (factory: (c: Component) => () => VAny): () => VAny;
  <P>(
    factory: (
      c: Component,
      areEqual?: (prev: P, next: P) => boolean
    ) => (props: P) => VAny,
  ): (props: P) => VAny;
};

export const component: ComponentFactory = <P>(
  factory: (c: Component) => (props?: P) => VAny,
  areEqual?: (prev: P, next: P) => boolean,
): (props?: P) => VAny => (
  (props?: P) => factory(void 0)(props)
);

const NOOP = () => { };
export const preventUpdates = NOOP;
export const useUnmount = NOOP;

export type UseEffectFactory = {
  (
    ccomponent: Component,
    effect: () => (() => void) | void,
  ): () => void;
  <P>(
    component: Component,
    effect: (props: P) => (() => void) | void,
    areEqual?: (prev: P, next: P) => boolean
  ): (props: P) => void;
};

export const useEffect: UseEffectFactory = <P>(
  component: Component,
  hook: (props?: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean,
): (props?: P) => void => NOOP;

export const invalidate = NOOP;

export const List = <E, K>(
  entries: E[],
  getKey: (entry: E, index: number) => K,
  render: (entry: E) => VAny,
): VAny => entries.map(render);

export const dirtyCheck = NOOP;
export const update = NOOP;
export const unmount = NOOP;

/**
 * Arrays, Template, Strings, Holes
 *
 */
export type TemplatePart =
  | null
  | undefined
  | false
  | string
  | number
  | TemplateBlock
  ;

export type TemplateBlock = (string | number)[];
export type Emitter = (s: string) => void;

export const _T = (
  flags: number,
  prefix: string,
  suffix: string,
  props: TProperty[] | null,
  style: TStyle | null,
  children: TNode[] | null,
): TElement => ({
  flags,
  prefix,
  suffix,
  props,
  style,
  children,
});

export const _P = (
  prefix: string,
  i: number,
): TProperty => ({
  prefix,
  i,
});

export const _S = (
  prefix: string,
  dynamic: TProperty[],
): TStyle => ({
  prefix,
  dynamic,
});

export const _t = (
  d: TemplateDescriptor,
  e?: any[],
): VTemplate => ({
  d,
  e,
} as any);

export const render = (v: VAny): string => {
  let result;
  const ctx = RENDER_CONTEXT;
  try {
    renderNode(v);
    result = ctx.t;
  } finally {
    ctx.t = "";
    ctx.s = 0;
  }
  return result;
};

const renderNode = (v: VAny) => {
  if (v === false || v == null) {
    return;
  }
  const ctx = RENDER_CONTEXT;
  if (typeof v === "object") {
    if (_isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        renderNode(v[i]);
      }
    } else { // Element
      const exprs = v.e;
      const tNodes = v.d;
      for (let i = 0; i < tNodes.length; i++) {
        const child = tNodes[i];
        if (typeof child === "object") { // Element
          renderTElement(exprs, child);
          ctx.s = (ctx.s + 1) & RenderState.OffsetMask;
        } else if (typeof child === "string") { // Text
          if (ctx.s & RenderState.PrevText) {
            ctx.t += "<!>";
          }
          ctx.s = (ctx.s + 1) | RenderState.PrevText;
          ctx.t += escapeText(child);
        } else { // Expr
          renderNode(exprs[child]);
        }
      }
    }
  } else { // text
    if (typeof v === "number") {
      v = v.toString();
    } else {
      v = escapeAttr(v);
    }
    if (ctx.s & RenderState.PrevText) {
      ctx.t += "<!>";
    }
    ctx.s = (ctx.s + 1) | RenderState.PrevText;
    ctx.t += v;
  }
};

const renderTElement = (exprs: any[], e: TElement) => {
  let openElement = e.prefix;
  const flags = e.flags;
  const offsets = (flags & TFlags.GenerateOffsets) ? [] as number[] : void 0;
  const suffix = e.suffix;
  const children = e.children;
  const style = e.style;
  const props = e.props;
  const ctx = RENDER_CONTEXT;
  if (props !== null) {
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      openElement += prop.prefix + exprs[prop.i];
    }
    openElement += '"';
  }
  if (style !== null) {
    openElement += style.prefix;
    const dynamicStyle = style.dynamic;
    for (let i = 0; i < dynamicStyle.length; i++) {
      const dynamic = dynamicStyle[i];
      openElement += dynamic.prefix + exprs[dynamic.i];
    }
    openElement += '"';
  }

  if (children === null) {
    ctx.t += openElement + ">" + suffix;
    return;
  }

  let childrenString = "";
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (typeof child === "object") { // Element
      const prevT = ctx.t;
      const prevS = ctx.s;
      ctx.t = "";
      ctx.s = 0;
      renderTElement(exprs, child);
      childrenString += ctx.t;
      ctx.t = prevT;
      ctx.s = prevS & RenderState.OffsetMask;
    } else if (typeof child === "string") { // Text
      if (ctx.s & RenderState.PrevText) {
        childrenString += "<!>";
      }
      ctx.s |= RenderState.PrevText;
      childrenString += child;
    } else { // Expr
      const prevT = ctx.t;
      const prevS = ctx.s;
      ctx.t = "";
      ctx.s &= RenderState.PrevText;
      renderNode(exprs[child]);
      childrenString += ctx.t;
      ctx.t = prevT;
      const offset = ctx.s & RenderState.OffsetMask;
      ctx.s = prevS | (ctx.s & RenderState.PrevText);
      if (offsets !== void 0) {
        offsets.push(offset);
      }
    }
  }
  if (offsets !== void 0) {
    openElement += ` &="${offsets.join(" ")}">`;
  } else {
    openElement += `>`;
  }
  ctx.t += openElement + childrenString + suffix;
};

const enum RenderState {
  PrevText = 1 << 24,
  OffsetMask = (1 << 24) - 1,
}

interface RenderContext {
  /** Rendered text. */
  t: string;
  /** Render State. */
  s: number;
}

const RENDER_CONTEXT: RenderContext = Object.seal({
  t: "",
  s: 0,
});

const _Array = Array;
const _isArray = _Array.isArray;

const escapeAttr = (s: string): string => {
  if (s.length === 0) {
    return s;
  }

  let last = 0;
  let i = 0;
  let out = "";
  let escape = "";

  for (; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c === 34) {
      escape = "&quot;";
    } else if (c === 38) {
      escape = "&amp;";
    } else {
      continue;
    }

    if (i !== last) {
      out += s.slice(last, i);
    }
    out += escape;
    last = i + 1;
  }
  if (i !== last) {
    out += s.slice(last, i);
  }
  return out;
};

const escapeText = (s: string): string => {
  if (s.length === 0) {
    return s;
  }

  let last = 0;
  let i = 0;
  let out = "";
  let escape = "";

  for (; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c === 60) {
      escape = "&lt;";
    } else if (c === 38) {
      escape = "&amp;";
    } else {
      continue;
    }

    if (i !== last) {
      out += s.slice(last, i);
    }
    out += escape;
    last = i + 1;
  }
  if (i !== last) {
    out += s.slice(last, i);
  }
  return out;
};

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

export const render = (v: VAny): string => {
  let result;
  const ctx = RENDER_CONTEXT;
  try {
    renderNode(v);
    result = ctx.s;
  } finally {
    ctx.s = "";
    ctx.i = 0;
  }
  return result;
};

const renderNode = (v: VAny) => {
  if (v === false || v == null) {
    return;
  }
  if (typeof v === "object") {
    if (_isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        renderNode(v[i]);
      }
    } else { // Element
      const ctx = RENDER_CONTEXT;
      const exprs = v.e;
      const tNodes = v.d;
      for (let i = 0; i < tNodes.length; i++) {
        const child = tNodes[i];
        if (typeof child === "object") { // Element
          renderTElement(exprs, child);
        } else if (typeof child === "string") { // Text
          ctx.i++;
          ctx.s += escapeText(child);
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
    RENDER_CONTEXT.s += v;
    RENDER_CONTEXT.i++;
  }
};

const renderTElement = (exprs: any[], e: TElement) => {
  let offset = 0;
  let s = e.prefix;
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
      s += prop.prefix + exprs[prop.i];
    }
    s += '"';
  }
  if (style !== null) {
    s += style.prefix;
    const dynamicStyle = style.dynamic;
    for (let i = 0; i < dynamicStyle.length; i++) {
      const dynamic = dynamicStyle[i];
      s += dynamic.prefix + exprs[dynamic.i];
    }
    s += '"';
  }
  if (children !== null) {
    for (let i = 0; children.length; i++) {
      const child = children[i];
      if (typeof child === "object") { // Element
        renderTElement(exprs, child);
      } else if (typeof child === "string") { // Text
        offset++;
        s += child;
      } else { // Expr
        const prevOffsets = ctx.i;
        ctx.i = 0;
        renderNode(exprs[child]);
        const offset = ctx.i;
        ctx.i = prevOffsets;
        if (offsets !== void 0) {
          offsets.push(offset);
        }
      }
    }
  }
  if (flags & TFlags.GenerateOffsets) {
  }
  ctx.s += s + suffix;
  ctx.i += offset;
};

interface RenderContext {
  /** Rendered string. */
  s: string;
  /** Children offset. */
  i: number;
}

const RENDER_CONTEXT: RenderContext = Object.seal({
  s: "",
  i: 0,
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

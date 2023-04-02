import {
  type TNode, type TProperty, type TElement, TFlags,
} from "./template.js";
import { escapeAttr, escapeText } from "./escape.js";

export type SAny = undefined;
export type SNode = undefined;
export type SNode1 = undefined;
export type SNode2 = undefined;
export type SRoot = undefined;
export type SText = undefined;
export type STemplate = undefined;
export type SList = undefined;
export type SContext = undefined;
export type SComponent = undefined;
export type Root = undefined;
export type Component = undefined;

export type VAny =
  | null       // Empty slot
  | undefined  // Empty slot
  | false      // Empty slot
  | string     // Text
  | number     // Text
  | VTemplate  // Template
  | VComponent // Component
  | VContext   // Context
  | VAny[]     // Array / List
  ;

export const enum VNodeType {
  Template = 0,
  Component = 1,
  Context = 2,
}

export interface TemplateDescriptor {
  readonly t: VNodeType.Template;
  readonly s: TNode[];
}

export interface VTemplate {
  readonly d: TemplateDescriptor;
  /** Expressions. */
  readonly p: any[] | undefined;
}

export interface ComponentDescriptor<P = any> {
  readonly t: VNodeType.Component;
  readonly s: (component: Component) => (props: P) => VAny;
}

export interface VComponent<P = any> {
  readonly d: ComponentDescriptor<P>;
  /** Component Props. */
  readonly p: P;
}

export interface ContextDescriptor<T = any> {
  readonly t: VNodeType.Context;
  readonly s: T;
}

export interface ContextProps<T = any> {
  /** Context Value. */
  readonly v: T;
  /** Context Children. */
  readonly c: VAny;
}

export interface VContext<T = any> {
  readonly d: ContextDescriptor<T>;
  readonly p: ContextProps<T>;
}

export type VList = VAny[];

const NOOP_1 = (arg1: any) => { };

export const defineRoot = NOOP_1;

export const contextType = <T>(): ContextDescriptor<T> => ({
  t: VNodeType.Context,
  s: null!,
});

export const context = <T>(): [
  get: (component: Component) => T | undefined,
  provider: (value: T, children: VAny) => VContext<T>,
] => {
  const d: ContextDescriptor = { t: VNodeType.Context, s: null! };
  return [
    (component: Component) => {
      const ctxStack = RENDER_CONTEXT.c;
      let i = ctxStack.length;
      while (i-- > 0) {
        const c = ctxStack[i];
        if (c.d === d) {
          return c.p.v;
        }
      }
      return void 0;
    },
    (v: T, c: VAny) => ({ d, p: { v, c } }),
  ];
};

export type ContextType<T> = ContextDescriptor<T>;


export type ComponentFactory = {
  (
    factory: (c: Component) => () => VAny,
  ): () => VComponent<undefined>;
  <P>(
    factory: (c: Component) => (props: P) => VAny,
    areEqual?: (prev: P, next: P) => boolean
  ): (props: P) => VComponent<P>;
};

export const component: ComponentFactory = <P>(
  s: (component: Component) => (props?: P) => VAny,
  areEqual?: (prev: P, next: P) => boolean,
): (props?: P) => VComponent => {
  const d: ComponentDescriptor = { t: VNodeType.Component, s };
  return (p?: P) => ({ d, p });
};

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

/** Returns noop function. */
export const useEffect: UseEffectFactory = <P>(
  component: Component,
  hook: (props?: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean,
): (props?: P) => void => NOOP_1;

/** Returns noop function. */
export const useLayoutEffect = useEffect;

/** Returns noop function. */
export const useIdleEffect = useEffect;

export const List = <E, K>(
  entries: E[],
  getKey: (entry: E, index: number) => K,
  render: (entry: E) => VAny,
): VAny => entries.map(render);

export const _$T = (s: TNode[]): TemplateDescriptor => ({
  t: VNodeType.Template,
  s,
});

export const _$E = (
  flags: number,
  prefix: string,
  suffix: string,
  props: TProperty[] | null,
  children: TNode[] | null,
): TElement => ({
  flags,
  prefix,
  suffix,
  props,
  children,
});

export const _$P = (
  prefix: string,
  i: number,
): TProperty => ({
  prefix,
  i,
});

export const _$t = (
  d: TemplateDescriptor,
  p?: any[],
): VTemplate => ({
  d,
  p,
});

export const renderToString = (v: any): string => {
  let result;
  const ctx = RENDER_CONTEXT;
  try {
    renderNode(v as VAny);
    result = ctx.t;
  } finally {
    ctx.t = "";
    ctx.s = 0;
    ctx.c.length = 0;
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
    } else {
      const { d, p } = v;
      const { t, s } = d;
      if (t === VNodeType.Template) {
        const roots: TNode[] = s;
        for (let i = 0; i < roots.length; i++) {
          const child = roots[i];
          if (typeof child === "object") { // Element
            renderTElement(p, child);
          } else if (typeof child === "string") { // Text
            renderText(escapeText(child));
          } else { // Expr
            renderNode(p![child]);
          }
        }
      } else if (t === VNodeType.Component) {
        renderNode(s(void 0)(p));
      } else { // Context
        const ctxStack = RENDER_CONTEXT.c;
        ctxStack.push(v as VContext);
        renderNode(p);
        ctxStack.pop();
      }
    }
  } else { // text
    renderText(
      (typeof v === "number")
        ? v.toString()
        : escapeText(v)
    );
  }
};

const renderText = (text: string) => {
  const ctx = RENDER_CONTEXT;
  if (ctx.s & RenderState.PrevText) {
    ctx.t += "<!>";
  }
  ctx.s = (ctx.s + 1) | RenderState.PrevText;
  ctx.t += text;
};

const renderTElement = (exprs: any[], e: TElement) => {
  const ctx = RENDER_CONTEXT;
  const flags = e.flags;
  const offsets: number[] | undefined = (flags & TFlags.GenerateOffsets)
    ? []
    : void 0;
  const suffix = e.suffix;
  const children = e.children;
  const props = e.props;
  let openElement = e.prefix;

  if (props !== null) {
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      openElement += prop.prefix + escapeAttr(exprs[prop.i]);
    }
    openElement += '"';
  }

  if (children === null) {
    ctx.t += openElement + ">" + suffix;
    ctx.s = (ctx.s + 1) & RenderState.OffsetMask;
    return;
  }

  const prevT = ctx.t;
  const prevS = ctx.s;
  ctx.t = "";
  ctx.s = 0;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (typeof child === "object") { // Element
      renderTElement(exprs, child);
    } else if (typeof child === "string") { // Text
      renderText(child);
    } else { // Expr
      const prevS = ctx.s;
      ctx.s &= RenderState.PrevText;
      renderNode(exprs[child]);
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

  ctx.t = prevT + openElement + ctx.t + suffix;
  ctx.s = (prevS + 1) & RenderState.OffsetMask;
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
  /** Context stack. */
  c: VContext[];
}

const RENDER_CONTEXT: RenderContext = Object.seal({
  t: "",
  s: 0,
  c: [],
});

const _Array = Array;
const _isArray = _Array.isArray;

export const _h = () => {
  throw Error("_h function isn't available during Server-Side Rendering.");
};
export const _hN = () => {
  throw Error("_hN function isn't available during Server-Side Rendering.");
};
export const _hE = () => {
  throw Error("_hE function isn't available during Server-Side Rendering.");
};
export const _s = () => {
  throw Error("_s function isn't available during Server-Side Rendering.");
};
export const _sN = () => {
  throw Error("_sN function isn't available during Server-Side Rendering.");
};
export const _sE = () => {
  throw Error("_sE function isn't available during Server-Side Rendering.");
};
export const _T = () => {
  throw Error("_T function isn't available during Server-Side Rendering.");
};
export const _t = () => {
  throw Error("_t function isn't available during Server-Side Rendering.");
};

export const invalidate = () => {
  throw Error("invalidate function isn't available during Server-Side Rendering.");
};
export const useUnmount = () => {
  throw Error("useUnmount function isn't available during Server-Side Rendering.");
};

export const createRoot = () => {
  throw Error("createRoot function isn't available during Server-Side Rendering.");
};
export const dirtyCheck = () => {
  throw Error("dirtyCheck function isn't available during Server-Side Rendering.");
};
export const update = () => {
  throw Error("update function isn't available during Server-Side Rendering.");
};
export const unmount = () => {
  throw Error("unmount function isn't available during Server-Side Rendering.");
};
export const hydrate = () => {
  throw Error("hydrate function isn't available during Server-Side Rendering.");
};

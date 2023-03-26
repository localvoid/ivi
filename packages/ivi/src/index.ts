// # Implementation Details
//
// ## Type Casting
//
// The current code base contains a lot of type casting. In idiomatic typescript
// it should be implemented with type guards, and if javascript toolchains
// supported inlining in some reliable way instead of relying on their
// heuristics, the code would be way much cleaner with type guard functions.
//
// ## `var` vs `let`
//
// In some places variables are declared with `var` instead of `let`, it is a
// micro optimization that propably won't have any significant impact on
// performance, especially when the JIT kicks in.
//
//     function __var(i) {
//       var j = i;
//       return function _var() {
//         return j;
//       }
//     }
//
//     function __let(i) {
//       let j = i;
//       return function _let() {
//         return j;
//       };
//     }
//
// In the example above, `_var` function will have the following bytecode in V8:
//
//     LdaImmutableCurrentContextSlot [2]
//     Return
//
// And `_let` function:
//
//     LdaImmutableCurrentContextSlot [2]
//     ThrowReferenceErrorIfHole[0];
//     Return
//
// ## `if (a === true) {}` vs `if (a) {}`
//
// In a lot of places there are explicit strict equality checks to avoid
// `toBool()` coercion. Sometimes we can avoid explicit checks when JIT compiler
// is going to inline functions and will be able to eliminate `toBool()`
// coercion. For example, `_isArray()` calls doesn't use strict equality checks.
//
// `(a === true)`
//
// 0x738b024    24  488b5518             REX.W movq rdx, [rbp + 0x18];
// 0x738b028    28  493995b0000000       REX.W cmpq[r13 + 0xb0](root(true_value)), rdx;
// 0x738b02f    2f  0f8424000000         jz 0x738b059 < +0x59 >
// 0x738b035    35  48b80000000014000000 REX.W movq rax, 0x1400000000;
// 0x738b03f    3f  488b4de8             REX.W movq rcx, [rbp - 0x18];
// 0x738b043    43  488be5               REX.W movq rsp, rbp;
// 0x738b046    46  5d                   pop rbp;
// 0x738b047    47  4883f902             REX.W cmpq rcx, 0x2;
// 0x738b04b    4b  7f03                 jg 0x738b050 < +0x50 >
// 0x738b04d    4d  c21000               ret 0x10;
//
// `(a)`, inlines `toBool()`
//
// 0x618b024    24  488b5518             REX.W movq rdx, [rbp + 0x18];
// 0x618b028    28  f6c201               testb rdx, 0x1;
// 0x618b02b    2b  0f84a7000000         jz 0x618b0d8 < +0xd8 >
// 0x618b031    31  493995b8000000       REX.W cmpq[r13 + 0xb8](root(false_value)), rdx;
// 0x618b038    38  0f8459000000         jz 0x618b097 < +0x97 >
// 0x618b03e    3e  493995c0000000       REX.W cmpq[r13 + 0xc0](root(empty_string)), rdx;
// 0x618b045    45  0f844c000000         jz 0x618b097 < +0x97 >
// 0x618b04b    4b  488b4aff             REX.W movq rcx, [rdx - 0x1];
// 0x618b04f    4f  f6410d10             testb[rcx + 0xd], 0x10;
// 0x618b053    53  0f853e000000         jnz 0x618b097 < +0x97 >
// 0x618b059    59  49398d38010000       REX.W cmpq[r13 + 0x138](root(heap_number_map)), rcx;
// 0x618b060    60  0f8484000000         jz 0x618b0ea < +0xea >
// 0x618b066    66  49398db8010000       REX.W cmpq[r13 + 0x1b8](root(bigint_map)), rcx;
// 0x618b06d    6d  0f846c000000         jz 0x618b0df < +0xdf >
// 0x618b073    73  48b8000000000a000000 REX.W movq rax, 0xa00000000;
// 0x618b07d    7d  488b4de8             REX.W movq rcx, [rbp - 0x18];
// 0x618b081    81  488be5               REX.W movq rsp, rbp;
// 0x618b084    84  5d                   pop rbp;
// 0x618b085    85  4883f902             REX.W cmpq rcx, 0x2;
// 0x618b089    89  7f03                 jg 0x618b08e < +0x8e >
// 0x618b08b    8b  c21000               ret 0x10;
//
// ## Polymorphic Call-Sites
//
// It is not always a good idea to optimize for monomorphic call-sites. If there
// is a low degree polymorphism, it can be better to use different shapes.
//
// In some cases compiler can optimize several polymorphic call-sites and
// perform just one shape check. To understand how to reorganize code, so that
// compiler could better optimize it, it is necessary to understand aliasing:
// https://en.wikipedia.org/wiki/Aliasing_(computing)
//
// ## Dynamic Lists
//
// Just some reminders:
//
// ### Lazy rendering
//
// It may seem like a good idea to render dynamic lists lazily and even avoid
// storing keys in memory, but it may lead to some subtle bugs with mutable
// entries.
//
// ### Dynamic Lists with Immutable Entries
//
// It is possible to create stateless node for immutable lists by storing
// entries, key function and render function in a stateless node. On initial
// mount we will need to invoke render function for each entry and keys can be
// completely ignored. And when dynamic list is updated, we can lazily recover
// old keys from previous entries.
//
// Don't think that it is worth it in most real-world scenarios, and we can
// always just memoize stateless node with dynamic list in a component state.
//
// ## Root Entry Functions
//
// Entry functions (update, dirtyCheck, unmount) should save and restore render
// context to avoid edge cases when they invoked synchronously in a different
// root context.
//
// ## Additional Resources
//
// - https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html
// - https://benediktmeurer.de/2017/06/29/javascript-optimization-patterns-part2/
//

import {
  TemplateFlags, ChildOpCode, PropOpCode, StateOpCode, CommonPropType,
} from "./template/format.js";

// Store global variables in a local scope as const variables so that JIT
// compiler could easily inline functions and eliminate checks in case global
// variables are overriden.
export const _Object = Object;
export const _Array = Array;
export const _isArray: <T = any>(a: any) => a is T[] = _Array.isArray;
export const _Map = Map;
export const _Int32Array = Int32Array;

const nodeProto = Node.prototype;
const elementProto = Element.prototype;
const doc = document;

// Template containers are used to create static templates from HTML strings
// via `innerHTML`.
const HTM_TEMPLATE = /**@__PURE__*/doc.createElement("template");
const HTM_TEMPLATE_CONTENT = HTM_TEMPLATE.content;
const _SVG_TEMPLATE = /**@__PURE__*/doc.createElement("template");
const SVG_TEMPLATE = /**@__PURE__*/doc.createElementNS("http://www.w3.org/2000/svg", "svg");
/**@__PURE__*/_SVG_TEMPLATE.content.appendChild(SVG_TEMPLATE);
const SVG_TEMPLATE_CONTENT = _SVG_TEMPLATE.content.firstChild as Element;

// Store Node/Element methods to avoid going through a long prototype chain and
// avoid megamorphic call-sites when accessing DOM nodes.

/** `Node.prototype.insertBefore` */
export const nodeInsertBefore = nodeProto.insertBefore;
/** `Node.prototype.removeChild`. */
export const nodeRemoveChild = nodeProto.removeChild;
/** `Node.prototype.cloneNode`. */
export const nodeCloneNode = nodeProto.cloneNode;
/** `Element.prototype.setAttribute` */
export const elementGetAttribute = elementProto.getAttribute;
/** `Element.prototype.setAttribute` */
export const elementSetAttribute = elementProto.setAttribute;
/** `Element.prototype.removeAttribute` */
export const elementRemoveAttribute = elementProto.removeAttribute;
/** `EventTarget.prototype.addEventListener` */
export const elementAddEventListener = elementProto.addEventListener;
/** `EventTarget.prototype.removeEventListener` */
export const elementRemoveEventListener = elementProto.removeEventListener;

/** `Object.getOwnPropertyDescriptor(o, p)` */
const getDescriptor = (o: any, p: string | number | symbol) => _Object.getOwnPropertyDescriptor(o, p);

/** `Node.prototype.getFirstChild` */
export const nodeGetFirstChild = /*@__PURE__*/getDescriptor(nodeProto, "firstChild")!.get!;
/** `Node.prototype.getLastChild` */
export const nodeGetLastChild = /*@__PURE__*/getDescriptor(nodeProto, "lastChild")!.get!;
/** `Node.prototype.getNextSibling` */
export const nodeGetNextSibling = /*@__PURE__*/getDescriptor(nodeProto, "nextSibling")!.get!;
/** `Node.prototype.getPrevSibling` */
export const nodeGetPrevSibling = /*@__PURE__*/getDescriptor(nodeProto, "previousSibling")!.get!;
/** `Node.prototype.setTextContent` */
export const nodeSetTextContent = /*@__PURE__*/getDescriptor(nodeProto, "textContent")!.set!;
/** `Element.prototype.className` */
export const elementSetClassName = /*@__PURE__*/getDescriptor(elementProto, "className")!.set!;
/** `HTMLElement.prototype.style`. */
export const htmlElementGetStyle = /*@__PURE__*/getDescriptor(HTMLElement.prototype, "style")!.get!;
/** `SVGElement.prototype.style` */
export const svgElementGetStyle = /*@__PURE__*/getDescriptor(SVGElement.prototype, "style")!.get!;

/**
 * Render Context.
 */
export interface RenderContext {
  /** Parent DOM Element */
  p: Element;
  /** Next DOM Node. */
  n: Node | null;
  /** Template state index. */
  si: number;
  /** DOM Side Effects */
  e: Array<() => void>;
}

// When object is sealed and stored in a const variable, JIT compiler can
// eliminate object map(shape) checks when accessing its properties.
/**
 * Global Render Context.
 */
export const RENDER_CONTEXT: RenderContext = _Object.seal({
  p: null!,
  n: null,
  si: 0,
  e: [],
});

// Types are stored as bit flags so that we could perform multiple tests with a
// single bitwise operation. E.g. `flags & (List | Array)`.
/**
 * Flags.
 */
export const enum Flags {
  // VNode and SNode flags
  Template = 1,
  Component = 1 << 1,
  List = 1 << 2,
  Array = 1 << 3,
  Text = 1 << 4,
  Root = 1 << 5,
  TypeMask = (1 << 6) - 1,

  // Component Dirty Flags
  Dirty = 1 << 6,
  DirtySubtree = 1 << 7,

  // Update Flags
  ForceUpdate = 1 << 8,
  DisplaceNode = 1 << 9,
}

/**
 * Stateful Node with 1 state slot.
 *
 * @typeparam S1 State slot #1.
 */
export interface SNode1<V = VAny, S1 = any> {
  /** Stateless Node. */
  v: V;
  /** See {@link Flags} for details. */
  f: Flags;
  /** Children Stateful Nodes. */
  c: SNode | (SNode | null)[] | null;
  /** Parent Stateful Node. */
  p: SNode | null,
  /** State slot #1. */
  s1: S1;
}

/**
 * Stateful Node with 2 state slots.
 *
 * @typeparam S1 State slot #1.
 * @typeparam S2 State slot #2.
 */
export interface SNode2<V = VAny, S1 = any, S2 = any> extends SNode1<V, S1> {
  /** State slot #2. */
  s2: S2;
}

/**
 * Stateful Node.
 */
export type SNode<V = VAny> = SNode1<V> | SNode2<V>;

/** Stateful Root Node. */
export type SRoot<S = any> = SNode1<VRoot, S>;
/** Stateful Text Node. */
export type SText = SNode1<string | number, Text>;
/** Stateful Template Node. */
export type STemplate = SNode1<VTemplate, Node[]>;
/** Stateful List Node. */
export type SList = SNode1<VList, null>;
/** Stateful Component Node. */
export type SComponent = SNode2<
  VComponent,
  /** Render function. */
  null | ComponentRenderFn,
  /** Unmount hooks. */
  null | (() => void) | (() => void)[]
>;
/** Stateful Component Node. */
export type Component = SComponent;

export type ComponentRenderFn = <P = any>(props: P) => VAny;

/**
 * Creates a Stateful Node instance.
 *
 * @param v VNode.
 * @returns {@link SNode} instance.
 */
export const createSNode = <V extends VAny, S>(
  f: Flags,
  v: V,
  c: SNode | Array<SNode1 | null> | null,
  p: SNode | null,
  s1: S,
): SNode1<V, S> => ({ f, v, c, p, s1 });

/**
 * Stateless Node Descriptor.
 */
export interface VDescriptor<P1 = any, P2 = any> {
  /** See {@link Flags} for details. */
  readonly f: Flags;
  /** First property. */
  readonly p1: P1;
  /** Second property. */
  readonly p2: P2;
}

/** Root Invalidate Hook. */
export type OnRootInvalidated<S> = (root: SRoot<S>) => void;
/** Root Descriptor. */
export type RootDescriptor<S = any> = VDescriptor<OnRootInvalidated<S>, null>;

/** Template Data. */
export interface TemplateData {
  /**
   * SMI (Small Integer) value that packs several values:
   *
   *     struct Data {
   *       stateSize:10;    // The number of state slots
   *       childrenSize:10; // The number of children slots
   *       svg:1;           // Template with SVG elements
   *     }
   *
   * stateSize and childrenSize are used for preallocating arrays with
   * exact number to avoid dynamic growth and reduce memory consumption.
   */
  f: number,
  /**
   * Array of SMI values that stores OpCodes for updating element properties.
   */
  p: PropOpCode[],
  /**
   * Array of SMI values that stores OpCodes for updating children nodes.
   */
  c: ChildOpCode[],
  /**
   * Array of SMI values that stores opCodes for traversing DOM nodes and
   * saving references to DOM nodes into internal state when template is
   * instantiated.
   */
  s: StateOpCode[],
  /** Array of string values that stores keys for dynamic properties. */
  d: any[],
}

/** Template Descriptor */
export type TemplateDescriptor = VDescriptor<TemplateData, () => Element>;

/** Component Descriptor */
export type ComponentDescriptor<P = any> = VDescriptor<
  // Component factory function.
  ComponentFactoryFn<P>,
  // `areEqual()` function.
  undefined | ((prev: P, next: P) => boolean)
>;

export type ComponentFactoryFn<P = any> = (component: Component) => (props: P) => VAny;

/** List Descriptor */
export type ListDescriptor = VDescriptor<null, null>;

/**
 * Stateless Node.
 *
 * @typeparam D Descriptor.
 * @typeparam P Property.
 */
export interface VNode<D extends VDescriptor<any, any> = VDescriptor<any, any>, P = any> {
  /** Descriptor. */
  readonly d: D;
  /** Property. */
  readonly p: P;
}

/** Stateless Root Node. */
export type VRoot = VNode<RootDescriptor, RootProps>;
/** Stateless Template Node. */
export type VTemplate<P = any> = VNode<TemplateDescriptor, P>;
/** Stateless Component Node. */
export type VComponent<P = any> = VNode<ComponentDescriptor, P>;
/** Stateless List Node. */
export type VList<K = any> = VNode<ListDescriptor, ListProps<K>>;

/**
 * Stateless Root Node Props.
 *
 * Contains a DOM position where root children should mounted.
 */
export interface RootProps {
  /** Parent Element */
  p: Element,
  /** Next Node */
  n: Node | null,
}

/**
 * Stateless List Node Props.
 *
 * Contains unique keys for stateless nodes and stateless nodes.
 */
export interface ListProps<K = any> {
  /** Unique Keys. */
  k: K[],
  /** Stateless Nodes. */
  v: VAny[],
}

/**
 * Stateless Tree Node.
 */
export type VAny =
  | null       // Hole
  | undefined  // Hole
  | false      // Hole
  | string     // Text
  | number     // Text
  | VRoot      // Root
  | VTemplate  // Template
  | VComponent // Component
  | VList      // Dynamic List with track by key algo
  | VArray     // Dynamic List with track by index algo
  ;

/**
 * Recursive Stateless Tree Array.
 */
export type VArray = VAny[];

/**
 * Element Directive.
 */
export type ElementDirective = <E extends Element>(element: E) => void;

export const _flushDOMEffects = () => {
  const e = RENDER_CONTEXT.e;
  if (e.length > 0) {
    RENDER_CONTEXT.e = [];
    for (let i = 0; i < e.length; i++) {
      e[i]();
    }
  }
};

const _updateTemplateProperties = (
  currentElement: Element,
  opCodes: PropOpCode[],
  data: string[],
  state: Node[],
  prevProps: any[] | null,
  nextProps: any[],
  svg: boolean,
) => {
  for (let i = 0; i < opCodes.length; i++) {
    let style: CSSStyleDeclaration | undefined;
    const op = opCodes[i];
    const type = op & PropOpCode.TypeMask;
    const dataIndex = op >> PropOpCode.DataShift;
    if (type === PropOpCode.SetNode) {
      currentElement = state[dataIndex] as Element;
      style = void 0;
    } else {
      const propsIndex = (op >> PropOpCode.InputShift) & PropOpCode.Mask6;
      const next = nextProps[propsIndex];
      let prev;
      if (prevProps !== null) {
        prev = prevProps[propsIndex];
      }
      if (prev !== next || type === PropOpCode.DiffDOMProperty) {
        if (type === PropOpCode.Common) {
          if (dataIndex === CommonPropType.ClassName) {
            if (next !== "" || prev !== void 0) {
              elementSetClassName.call(currentElement, next);
            }
          } else { // CommonPropType.TextContent
            if (prev === void 0) {
              nodeSetTextContent.call(currentElement, next);
            } else {
              nodeGetFirstChild.call(currentElement).nodeValue = next;
            }
          }
        } else if (type === PropOpCode.Directive) {
          (next as ElementDirective)(currentElement);
        } else {
          const key = data[dataIndex];
          if (type === PropOpCode.Attribute) {
            if (next !== void 0) {
              elementSetAttribute.call(currentElement, key, next as string);
            } else {
              elementRemoveAttribute.call(currentElement, key);
            }
          } else if (type === PropOpCode.Property) {
            (currentElement as Record<string, any>)[key] = next;
          } else if (type === PropOpCode.DiffDOMProperty) {
            if ((currentElement as Record<string, any>)[key] !== next) {
              (currentElement as Record<string, any>)[key] = next;
            }
          } else if (type === PropOpCode.Style) {
            if (style === void 0) {
              style = (svg === false)
                ? htmlElementGetStyle.call(currentElement as HTMLElement)
                : svgElementGetStyle.call(currentElement as SVGElement);
            }
            style!.setProperty(key, next as string);
          } else { // PropOpCode.Event
            if (prev !== void 0) {
              elementRemoveEventListener.call(currentElement, key, prev);
            }
            elementAddEventListener.call(currentElement, key, next);
          }
        }
      }
    }
  }
};

const _assignTemplateSlots = (
  currentNode: Node,
  opCodes: StateOpCode[],
  offset: number,
  endOffset: number,
  state: Node[],
) => {
  const ctx = RENDER_CONTEXT;
  while (true) {
    const op = opCodes[offset++];
    if (op & StateOpCode.Save) {
      state[++ctx.si] = currentNode;
    }
    if (op & StateOpCode.EnterOrRemove) {
      const enterOffset = op >> StateOpCode.OffsetShift;
      // Enter offset is used to disambiguate between enter and remove
      // operations. Remove operations will always have a 0 enterOffset.
      if (enterOffset) { // Enter
        _assignTemplateSlots(
          nodeGetFirstChild.call(currentNode),
          opCodes,
          offset,
          offset += enterOffset,
          state,
        );
      } else { // Remove
        // Remove operation implies that current node is always a comment node
        // followed by a text node.
        const commentNode = currentNode as Comment;
        state[++ctx.si] = currentNode = nodeGetNextSibling.call(currentNode);
        commentNode.remove();
      }
    }
    if (offset === endOffset) {
      return;
    }
    currentNode = nodeGetNextSibling.call(currentNode);
  }
};

const _mountList = (
  parentState: SNode1,
  flags: Flags,
  children: VArray,
  vNode: VAny,
): SNode1 => {
  let i = children.length;
  const sChildren = _Array(i);
  const sNode = createSNode(flags, vNode, sChildren, null, parentState);
  while (i > 0) {
    sChildren[--i] = _mount(sNode, children[i]);
  }
  return sNode;
};

const _updateArray = (
  parentSNode: SNode1,
  sNode: SNode1,
  next: VAny,
  updateFlags: Flags,
): SNode1 | null => {
  if (!_isArray(next)) {
    _unmount(sNode, true);
    return _mount(parentSNode, next);
  }
  const prevSChildren = sNode.c as (SNode1 | null)[];
  let nextSChildren = prevSChildren;
  let prevLength = prevSChildren.length;
  let nextLength = next.length;
  if (nextLength !== prevLength) {
    sNode.c = nextSChildren = _Array(nextLength);
    while (prevLength > nextLength) {
      const sChild = prevSChildren[--prevLength];
      if (sChild !== null) {
        _unmount(sChild, true);
      }
    }
    while (nextLength > prevLength) {
      nextSChildren[--nextLength] = _mount(sNode, next[nextLength]);
    }
  }
  while (nextLength > 0) {
    nextSChildren[--nextLength] = _update(
      sNode,
      prevSChildren[nextLength],
      next[nextLength],
      updateFlags,
    );
  }
  return sNode;
};

/**
 * Updates a Stateful Node with a new Stateless Node.
 *
 * @param parentSNode Parent Stateul Node.
 * @param sNode Stateful Node to update.
 * @param next New Stateless Node.
 * @param updateFlags Update flags (ForceUpdate and DisplaceNode).
 * @returns Stateful Node.
 */
const _update = (
  parentSNode: SNode,
  sNode: SNode | null,
  next: VAny,
  updateFlags: number,
): SNode | null => {
  if (sNode === null) {
    return _mount(parentSNode, next);
  }
  if (next === false || next == null) {
    _unmount(sNode, true);
    return null;
  }

  // polymorphic call-site
  const children = sNode.c;
  const prev = sNode.v;
  const state = sNode.s1;
  const flags = sNode.f;
  const type = flags & Flags.TypeMask;
  sNode.f = type;

  // Reassign to reduce memory consumption even if next value is strictly
  // equal to the prev value.
  sNode.v = next;

  // Text and Array should be checked before Component, Template and List
  // because their stateless nodes are represented with basic string and array
  // types.
  if (type === Flags.Text) {
    if (typeof next !== "object") {
      if (prev !== next) {
        (state as Text).nodeValue = next as string;
      }
      if (updateFlags & Flags.DisplaceNode) {
        nodeInsertBefore!.call(
          RENDER_CONTEXT.p,
          (state as Text),
          RENDER_CONTEXT.n,
        );
      }
      return sNode;
    }
    nodeRemoveChild!.call(RENDER_CONTEXT.p, (state as Text));
    return _mount(parentSNode, next)!;
  }

  if (prev === next) {
    _dirtyCheck(sNode, updateFlags);
    return sNode;
  }
  // Dirty flags should be cleared after dirty checking.
  sNode.f = type;

  if (type === Flags.Array) {
    return _updateArray(parentSNode, sNode, next, updateFlags);
  }

  const descriptor = (next as VNode).d;
  const nextProps = (next as VNode).p;
  const prevProps = (prev as VNode).p;
  if ((prev as VNode).d !== descriptor) {
    _unmount(sNode, true);
    return _mount(parentSNode, next);
  }

  if (type === Flags.Component) {
    if (
      ((flags | updateFlags) & (Flags.Dirty | Flags.ForceUpdate)) ||
      (descriptor.p2 === void 0) ||
      (descriptor.p2(prevProps, nextProps) !== true)
    ) {
      sNode.c = _update(
        sNode,
        children as SNode,
        (state as ComponentRenderFn)(nextProps),
        updateFlags,
      );
    } else if (children !== null) {
      _dirtyCheck(children as SNode, updateFlags);
    }
  } else if (type === Flags.Template) {
    const ctx = RENDER_CONTEXT;
    const parentElement = ctx.p;
    const tplData = (descriptor as TemplateDescriptor).p1;
    const flags = tplData.f;
    const data = tplData.d;
    const propsOpCodes = tplData.p;
    const childOpCodes = tplData.c;
    const rootDOMNode = state[0] as Element;

    if (updateFlags & Flags.DisplaceNode) {
      updateFlags ^= Flags.DisplaceNode;
      nodeInsertBefore!.call(parentElement, rootDOMNode, ctx.n);
    }

    _updateTemplateProperties(
      rootDOMNode,
      propsOpCodes,
      data,
      state as Node[],
      prevProps,
      nextProps,
      !!(flags & TemplateFlags.Svg),
    );

    if (children !== null) {
      ctx.p = rootDOMNode;
      ctx.n = null;

      let childrenIndex = 0;
      for (let i = 0; i < childOpCodes.length; i++) {
        const childOpCode = childOpCodes[i];
        const type = childOpCode & ChildOpCode.Type;
        const value = childOpCode >> ChildOpCode.ValueShift;
        if (type === ChildOpCode.Child) {
          (children as (SNode | null)[])[childrenIndex] =
            _update(
              sNode,
              (children as (SNode | null)[])[childrenIndex++],
              nextProps[value],
              updateFlags,
            );
        } else if (type === ChildOpCode.SetNext) {
          ctx.n = state[value];
        } else { // ChildOpCode.SetParent
          ctx.p = state[value] as Element;
          ctx.n = null;
        }
      }

      ctx.p = parentElement;
    }

    ctx.n = rootDOMNode;
  } else { // Dynamic Lists
    _updateList(
      sNode as SList,
      prevProps,
      nextProps,
      updateFlags,
    );
  }

  return sNode;
};

/**
 * Mounts Stateless Node.
 *
 * @param parentSNode Parent Stateful Node.
 * @param v Stateless Node.
 * @returns Mounted Stateful Node.
 */
const _mount = (parentSNode: SNode, v: VAny): SNode | null => {
  if (v !== false && v != null) {
    if (typeof v === "object") {
      if (_isArray(v)) {
        return _mountList(parentSNode, Flags.Array, v, v);
      } else {
        const descriptor = v.d;
        const props = v.p;
        const descriptorP1 = descriptor.p1;
        const type = descriptor.f & (Flags.Template | Flags.Component);
        if (type === Flags.Template) {
          const ctx = RENDER_CONTEXT;
          const parentDOMElement = ctx.p;
          const nextDOMNode = ctx.n;
          const tplData = descriptorP1 as TemplateData;
          const data = tplData.d;
          const propsOpCodes = tplData.p;
          const stateOpCodes = tplData.s;
          const childOpCodes = tplData.c;
          const flags = tplData.f;
          const rootDOMNode = (descriptor as TemplateDescriptor).p2();
          const state = _Array<Node>(flags & TemplateFlags.Mask6);
          state[0] = rootDOMNode;

          if (stateOpCodes.length > 0) {
            ctx.si = 0;
            _assignTemplateSlots(
              nodeGetFirstChild.call(rootDOMNode),
              stateOpCodes,
              0,
              stateOpCodes.length,
              state,
            );
          }
          _updateTemplateProperties(
            rootDOMNode,
            propsOpCodes,
            data,
            state,
            null,
            props,
            !!(flags & TemplateFlags.Svg),
          );

          const stateNode = createSNode(
            Flags.Template,
            v,
            null,
            parentSNode,
            state,
          );
          if (childOpCodes.length > 0) {
            const children = _Array<SNode | null>(
              (flags >> TemplateFlags.ChildrenSizeShift) & TemplateFlags.Mask6
            );
            stateNode.c = children;
            ctx.p = rootDOMNode;
            ctx.n = null;
            let childrenIndex = 0;
            for (let i = 0; i < childOpCodes.length; i++) {
              const childOpCode = childOpCodes[i];
              const type = childOpCode & ChildOpCode.Type;
              const value = childOpCode >> ChildOpCode.ValueShift;
              if (type === ChildOpCode.Child) {
                children[childrenIndex++] = _mount(stateNode, props[value]);
              } else if (type === ChildOpCode.SetNext) {
                ctx.n = state[value];
              } else { // ChildOpCode.SetParent
                ctx.p = state[value] as Element;
                ctx.n = null;
              }
            }
            ctx.p = parentDOMElement;
          }
          ctx.n = rootDOMNode;

          nodeInsertBefore!.call(parentDOMElement, rootDOMNode, nextDOMNode);
          return stateNode;
        } else if (type === Flags.Component) {
          const sNode: Component = {
            f: Flags.Component,
            v: v as VComponent,
            c: null,
            p: parentSNode,
            s1: null!,
            s2: null,
          };
          const renderFn = (descriptorP1 as ComponentFactoryFn)(sNode);
          sNode.c = _mount(sNode, renderFn(props));
          sNode.s1 = renderFn;
          return sNode;
        }
        // List
        return _mountList(parentSNode, Flags.List, (props as ListProps).v, v);
      }
    } else {
      const ctx = RENDER_CONTEXT;
      const next = ctx.n;
      const e = doc.createTextNode(v as string);
      ctx.n = e;
      nodeInsertBefore.call(ctx.p, e, next);
      return createSNode(Flags.Text, v, null, parentSNode, e);
    }
  }
  return null;
};

/**
 * Performs a Dirty Checking in a Stateful Node Subtree.
 *
 * @param sNode Stateful Node.
 * @param updateFlags Update flags (ForceUpdate and DisplaceNode).
 */
const _dirtyCheck = (sNode: SNode, updateFlags: number): void => {
  const ctx = RENDER_CONTEXT;
  // polymorphic call-site
  const state = sNode.s1;
  const v = sNode.v;
  const children = sNode.c;
  const flags = sNode.f;
  const type = flags & Flags.TypeMask;
  sNode.f = type;
  if (type === Flags.Template) {
    const rootDOMNode = (state as Node[])[0] as Element;
    if (updateFlags & Flags.DisplaceNode) {
      updateFlags ^= Flags.DisplaceNode;
      nodeInsertBefore.call(ctx.p, rootDOMNode, ctx.n);
    }
    if (flags & Flags.DirtySubtree) {
      ctx.p = rootDOMNode;
      ctx.n = null;
      const parentDOMElement = ctx.p;
      const childOpCodes = (v as VTemplate).d.p1.c;
      let childrenIndex = 0;
      for (let i = 0; i < childOpCodes.length; i++) {
        const op = childOpCodes[i];
        const type = op & ChildOpCode.Type;
        const value = op >> ChildOpCode.ValueShift;
        if (type === ChildOpCode.Child) {
          const sChild = (children as (SNode1 | null)[])[childrenIndex++];
          if (sChild !== null) {
            _dirtyCheck(sChild, updateFlags);
          }
        } else if (type === ChildOpCode.SetNext) {
          ctx.n = (state as Node[])[value];
        } else { // ChildOpCode.SetParent
          ctx.p = state[value] as Element;
          ctx.n = null;
        }
      }
      ctx.p = parentDOMElement;
    }
    ctx.n = rootDOMNode;
  } else if (flags === Flags.Text) {
    if (updateFlags & Flags.DisplaceNode) {
      nodeInsertBefore.call(ctx.p, state as Text, ctx.n);
    }
    ctx.n = state as Text;
  } else if (flags & Flags.Component) {
    if ((flags | updateFlags) & (Flags.Dirty | Flags.ForceUpdate)) {
      sNode.c = _update(
        sNode,
        children as SNode,
        (state as ComponentRenderFn)!((v as VComponent).p),
        updateFlags,
      );
    } else if (children !== null) {
      _dirtyCheck(children as SNode, updateFlags);
    }
  } else { // Array || List
    let i = (children as Array<SNode | null>).length;
    while (--i >= 0) {
      const sChild = (children as Array<SNode | null>)[i];
      if (sChild !== null) {
        _dirtyCheck(sChild, updateFlags);
      }
    }
  }
};

/**
 * Unmounts Stateful Node.
 *
 * @param sNode Stateful Node.
 * @param detach Detach root DOM nodes from the DOM.
 */
const _unmount = (sNode: SNode, detach: boolean): void => {
  const flags = sNode.f; // polymorphic call-site

  if (detach === true && (flags & (Flags.Template | Flags.Text))) {
    detach = false;
    nodeRemoveChild.call(
      RENDER_CONTEXT.p,
      (flags & Flags.Template)
        ? (sNode as STemplate).s1[0]
        : (sNode as SText).s1
    );
  }
  // polymorphic call-site
  const sChildren = sNode.c;
  if (sChildren !== null) {
    if (_isArray(sChildren)) {
      for (let i = 0; i < sChildren.length; i++) {
        const sChild = sChildren[i];
        if (sChild !== null) {
          _unmount(sChild, detach);
        }
      }
    } else {
      _unmount(sChildren as SNode, detach);
    }
  }
  if (flags & Flags.Component) {
    const unmountHooks = (sNode as SComponent).s2;
    if (unmountHooks !== null) {
      if (typeof unmountHooks === "function") {
        unmountHooks();
      } else {
        for (let i = 0; i < unmountHooks.length; i++) {
          unmountHooks[i]();
        }
      }
    }
  }
};

const enum MagicValues {
  /**
   * One of the children nodes were moved.
   */
  RearrangeNodes = 1073741823, // Max SMI Value
  /**
   * New node marker.
   */
  NewNodeMark = -1,
  /**
   * LIS marker.
   */
  LISMark = -2,
}

/**
 * Update children list with track by key algorithm.
 *
 * High-level overview of the algorithm that is implemented in this function:
 *
 * This algorithm finds a minimum number of DOM operations. It works in
 * several steps:
 *
 * 1. Common prefix and suffix optimization.
 *
 * Look for nodes with identical keys by simultaneously iterating through nodes
 * in the old children list `A` and new children list `B` from both sides.
 *
 *     A: -> [a b c d] <-
 *     B: -> [a b d] <-
 *
 * Skip nodes "a" and "b" at the start, and node "d" at the end.
 *
 *     A: -> [c] <-
 *     B: -> [] <-
 *
 * 2. Zero length optimizations.
 *
 * Check if the size of one of the list is equal to zero. When length of the
 * old children list is zero, insert remaining nodes from the new list. When
 * length of the new children list is zero, remove remaining nodes from the old
 * list.
 *
 *     A: -> [a b c g] <-
 *     B: -> [a g] <-
 *
 * Skip nodes "a" and "g" (prefix and suffix optimization).
 *
 *     A: [b c]
 *     B: []
 *
 * Remove nodes "b" and "c".
 *
 * 3. Index and unmount removed nodes.
 *
 *     A: [b c d e f]
 *     B: [c b h f e]
 *     P: [. . . . .] // . == -1
 *
 * Create array `P` (`sources`) with the length of the new children list and
 * fills it with `NewNodeMark` values. This mark indicates that node at this
 * position should be mounted. Later we will assign node positions in the old
 * children list to this array.
 *
 *     A: [b c d e f]
 *     B: [c b h f e]
 *     P: [. . . . .] // . == -1
 *     I: {
 *       c: 0, // B[0] == c
 *       b: 1, // B[1] == b
 *       h: 2,
 *       f: 3,
 *       e: 4,
 *     }
 *     last = 0
 *
 * Create reverse index `I` that maps keys to node positions in the new
 * children list.
 *
 *     A: [b c d e f]
 *         ^
 *     B: [c b h f e]
 *     P: [. 0 . . .] // . == -1
 *     I: {
 *       c: 0,
 *       b: 1, <-
 *       h: 2,
 *       f: 3,
 *       e: 4,
 *     }
 *     last = 1
 *
 * Assign original positions of the nodes from the old children list to the
 * array `P`.
 *
 * Iterate through nodes in the old children list and gets their new positions
 * from the index `I`. Assign old node position to the array `P`. When index
 * `I` doesn't have a key for the old node, it means that it should be
 * unmounted.
 *
 * When we assigning positions to the array `P`, we also store position of the
 * last seen node in the new children list `pos`, if the last seen position is
 * greater than the current position of the node at the new list, then we are
 * switching `rearrangeNodes` flag to `true` (`pos === RearrangeNodes`).
 *
 *     A: [b c d e f]
 *           ^
 *     B: [c b h f e]
 *     P: [1 0 . . .] // . == -1
 *     I: {
 *       c: 0, <-
 *       b: 1,
 *       h: 2,
 *       f: 3,
 *       e: 4,
 *     }
 *     last = 1 // last > 0; rearrangeNodes = true
 *
 * The last position `1` is greater than the current position of the node at the
 * new list `0`, switch `rearrangeNodes` flag to `true`.
 *
 *     A: [b c d e f]
 *             ^
 *     B: [c b h f e]
 *     P: [1 0 . . .] // . == -1
 *     I: {
 *       c: 0,
 *       b: 1,
 *       h: 2,
 *       f: 3,
 *       e: 4,
 *     }
 *     rearrangeNodes = true
 *
 * Node with key "d" doesn't exist in the index `I`, unmounts node `d`.
 *
 *     A: [b c d e f]
 *               ^
 *     B: [c b h f e]
 *     P: [1 0 . . 3] // . == -1
 *     I: {
 *       c: 0,
 *       b: 1,
 *       h: 2,
 *       f: 3,
 *       e: 4, <-
 *     }
 *     rearrangeNodes = true
 *
 * Assign position `3` for `e` node.
 *
 *     A: [b c d e f]
 *                 ^
 *     B: [c b h f e]
 *     P: [1 0 . 4 3] // . == -1
 *     I: {
 *       c: 0,
 *       b: 1,
 *       h: 2,
 *       f: 3, <-
 *       e: 4,
 *     }
 *     rearrangeNodes = true
 *
 * Assign position `4` for 'f' node.
 *
 * 4. Find minimum number of moves when `rearrangeNodes` flag is on and mount
 *    new nodes.
 *
 *     A: [b c d e f]
 *     B: [c b h f e]
 *     P: [1 * . 4 *] // . == -1  * == -2
 *
 * When `rearrangeNodes` is on, mark all nodes in the array `P` that belong to
 * the [longest increasing subsequence](http://en.wikipedia.org/wiki/Longest_increasing_subsequence)
 * and move all nodes that doesn't belong to this subsequence.
 *
 * Iterate over the new children list and the `P` array simultaneously. When
 * value from `P` array is equal to `NewNodeMark`, mount a new node. When it
 * isn't equal to `LisMark`, move it to a new position.
 *
 *     A: [b c d e f]
 *     B: [c b h f e]
 *                 ^  // new_pos == 4
 *     P: [1 * . 4 *] // . == NewNodeMark  * == LisMark
 *                 ^
 *
 * Node "e" has `LisMark` value in the array `P`, nothing changes.
 *
 *     A: [b c d e f]
 *     B: [c b h f e]
 *               ^    // new_pos == 3
 *     P: [1 * . 4 *] // . == NewNodeMark  * == LisMark
 *               ^
 *
 * Node "f" has `4` value in the array `P`, move it before the next node "e".
 *
 *     A: [b c d e f]
 *     B: [c b h f e]
 *             ^      // new_pos == 2
 *     P: [1 * . 4 *] // . == NewNodeMark  * == LisMark
 *             ^
 *
 * Node "h" has `NewNodeMark` value in the array `P`, mount new node "h".
 *
 *     A: [b c d e f]
 *     B: [c b h f e]
 *           ^        // new_pos == 1
 *     P: [1 * . 4 *] // . == NewNodeMark  * == LisMark
 *           ^
 *
 * Node "b" has `LisMark` value in the array `P`, nothing changes.
 *
 *     A: [b c d e f]
 *     B: [c b h f e]
 *         ^          // new_pos == 0
 *     P: [1 * . 4 *] // . == NewNodeMark  * == LisMark
 *
 * Node "c" has `1` value in the array `P`, move it before the next node "b".
 *
 * When `rearrangeNodes` flag is off, skip LIS algorithm and mount nodes that
 * have `NewNodeMark` value in the array `P`.
 *
 * NOTE: There are many variations of this algorithm that are used by many UI
 * libraries and many implementations are still using an old optimization
 * technique that were removed several years ago from this implementation. This
 * optimization were used to improve performance of simple moves/swaps. E.g.
 *
 *     A: -> [a b c] <-
 *     B: -> [c b a] <-
 *
 * Move "a" and "c" nodes to the other edge.
 *
 *     A: -> [b] <-
 *     B: -> [b] <-
 *
 * Skip node "b".
 *
 * This optimization were removed because it breaks invariant that insert and
 * remove operations shouldn't trigger a move operation. E.g.
 *
 *     A: -> [a b]
 *     B:    [c a] <-
 *
 * Move node "a" to the end.
 *
 *     A: [b]
 *     B: [c a]
 *
 * Remove node "b" and insert node "c".
 *
 * In this use case, this optimization performs one unnecessary operation.
 * Instead of removing node "b" and inserting node "c", it also moves node "a".
 *
 * @param sNode {@link SList} node.
 * @param a Previous {@link ListProps}.
 * @param b Next {@link ListProps}.
 * @param updateFlags Update flags.
 * @noinline
 * @__NOINLINE__
 */
const _updateList = (
  sNode: SList,
  a: ListProps<any>,
  b: ListProps<any>,
  updateFlags: Flags,
): void => {
  const aKeys = a.k;
  const bKeys = b.k;
  const bVNodes = b.v;
  let bLength = bKeys.length;
  let aLength = aKeys.length;
  const result = _Array(bLength);

  if (bLength === 0) { // New children list is empty.
    if (aLength > 0) { // Unmount nodes from the old children list.
      _unmount(sNode, true);
    }
  } else if (aLength === 0) { // Old children list is empty.
    while (bLength > 0) { // Mount nodes from the new children list.
      result[--bLength] = _mount(sNode, bVNodes[bLength]);
    }
  } else {
    const sChildren = sNode.c as Array<SNode | null>;
    let aEnd = aLength - 1;
    let bEnd = bLength - 1;
    let start = 0;
    let key = bKeys[bEnd];

    // Step 1
    outer: while (true) {
      // Update nodes with the same key at the end.
      while (aKeys[aEnd] === key) {
        result[bEnd] = _update(
          sNode,
          sChildren[aEnd--],
          bVNodes[bEnd],
          updateFlags,
        );
        if (start > --bEnd || start > aEnd) {
          break outer;
        }
        key = bKeys[bEnd];
      }

      // Update nodes with the same key at the beginning.
      while (aKeys[start] === bKeys[start] && ++start <= aEnd && start <= bEnd) {
        // delayed update (all updates should be performed from right-to-left).
      }

      break;
    }

    // Step 2
    if (start > aEnd) {
      // All nodes from `a` are updated, insert the rest from `b`.
      while (bEnd >= start) {
        result[bEnd] = _mount(sNode, bVNodes[bEnd--]);
      }
    } else if (start > bEnd) {
      // All nodes from `b` are updated, remove the rest from `a`.
      bLength = start;
      do {
        const sChild = sChildren[bLength++];
        if (sChild !== null) {
          _unmount(sChild, true);
        }
      } while (bLength <= aEnd);
    } else { // Step 3
      let bLength = bEnd - start + 1;
      const sources = new _Int32Array(bLength); // Maps positions in the new children list to positions in the old list.
      const keyIndex = new _Map<any, number>(); // Maps keys to their positions in the new children list.
      for (let i = 0; i < bLength; i++) {
        // `NewNodeMark` value indicates that node doesn't exist in the old children list.
        sources[i] = MagicValues.NewNodeMark;
        const j = start + i;
        keyIndex.set(bKeys[j], j);
      }

      // When `nodePosition === RearrangeNodes`, it means that one of the nodes is in the wrong position and we should
      // rearrange nodes with LIS-based algorithm `markLIS()`.
      let nodePosition = 0;
      for (let i = start; i <= aEnd; i++) {
        const sChild = sChildren[i];
        const nextPosition = keyIndex.get(aKeys[i]);
        if (nextPosition !== void 0) {
          nodePosition = (nodePosition < nextPosition)
            ? nextPosition
            : MagicValues.RearrangeNodes;
          sources[nextPosition - start] = i;
          result[nextPosition] = sChild;
        } else if (sChild !== null) {
          _unmount(sChild, true);
        }
      }

      // Step 4

      // Mark LIS nodes only when this node weren't moved `moveNode === false` and we've detected that one of the
      // children nodes were moved `pos === MagicValues.MovedChildren`.
      if (!(updateFlags & Flags.DisplaceNode) && nodePosition === MagicValues.RearrangeNodes) {
        markLIS(sources);
      }
      while (bLength-- > 0) {
        bEnd = bLength + start;
        const node = bVNodes[bEnd];
        const lisValue = sources[bLength];
        result[bEnd] = (lisValue === -1)
          ? _mount(sNode, node)
          : _update(
            sNode,
            result[bEnd],
            node,
            updateFlags |
            ((nodePosition === MagicValues.RearrangeNodes && lisValue !== MagicValues.LISMark)
              ? Flags.DisplaceNode
              : 0),
          );
      }
    }

    // Delayed update for nodes from Step 1 (prefix only). Reconciliation algorithm always updates nodes from right to
    // left.
    while (start > 0) {
      result[--start] = _update(
        sNode,
        sChildren[start],
        bVNodes[start],
        updateFlags,
      );
    }
  }
  sNode.c = result;
};

/**
 * Modified Longest Increased Subsequence algorithm.
 *
 * Mutates input array `a` and replaces all values that are part of LIS with -2 value.
 *
 * Constraints:
 * - Doesn't work with negative numbers. -1 values are ignored.
 * - Input array `a` should contain at least one value that is greater than -1.
 *
 * {@link http://en.wikipedia.org/wiki/Longest_increasing_subsequence}
 *
 * @example
 *
 *     const A = Int32Array.from([-1, 0, 2, 1]);
 *     markLIS(A);
 *     // A => [-1, -2, 2, -2]
 *
 * @param a Array of numbers.
 * @noinline
 * @__NOINLINE__
 */
const markLIS = (a: Int32Array): void => {
  const length = a.length;
  const parent = new _Int32Array(length);
  const index = new _Int32Array(length);
  let indexLength = 0;
  let i = 0;
  let j: number;
  let k: number;
  let lo: number;
  let hi: number;

  // Skip -1 values at the start of the input array `a`.
  for (; a[i] === MagicValues.NewNodeMark; i++) { /**/ }

  index[0] = i++;
  for (; i < length; i++) {
    k = a[i];
    if (k !== MagicValues.NewNodeMark) { // Ignore -1 values.
      j = index[indexLength];
      if (a[j] < k) {
        parent[i] = j;
        index[++indexLength] = i;
      } else {
        lo = 0;
        hi = indexLength;

        while (lo < hi) {
          j = (lo + hi) >> 1;
          if (a[index[j]] < k) {
            lo = j + 1;
          } else {
            hi = j;
          }
        }

        if (k < a[index[lo]]) {
          if (lo > 0) {
            parent[i] = index[lo - 1];
          }
          index[lo] = i;
        }
      }
    }
  };

  // Mutate input array `a` and assign -2 value to all nodes that are part of LIS.
  j = index[indexLength];
  while (indexLength-- >= 0) {
    a[j] = MagicValues.LISMark;
    j = parent[j];
  }
};

/**
 * Creates a HTML Template cloning factory.
 */
export const _h = (t: string | Node): () => Element => (
  () => {
    if (typeof t === "string") {
      HTM_TEMPLATE.innerHTML = t;
      t = HTM_TEMPLATE_CONTENT.firstChild!;
    }
    return nodeCloneNode.call(t, true) as Element;
  }
);

/**
 * Creates a HTML Template factory.
 */
export const _hN = (t: string): () => Element => (
  () => (
    HTM_TEMPLATE.innerHTML = t,
    HTM_TEMPLATE_CONTENT.firstChild! as Element
  )
);

/**
 * Creates a HTML Element factory.
 */
export const _hE = (t: string): () => Element => (
  () => doc.createElement(t)
);

/**
 * Creates a SVG Template cloning factory.
 */
export const _s = (t: string | Node): () => Element => (
  () => {
    if (typeof t === "string") {
      SVG_TEMPLATE.innerHTML = t;
      t = SVG_TEMPLATE_CONTENT.firstChild!;
    }
    return nodeCloneNode.call(t, true) as Element;
  }
);

/**
 * Creates a SVG Template factory.
 */
export const _sN = (t: string): () => Element => (
  () => (
    SVG_TEMPLATE.innerHTML = t,
    SVG_TEMPLATE_CONTENT.firstChild! as Element
  )
);

/**
 * Creates a SVG Element factory.
 */
export const _sE = (t: string): () => Element => (
  () => doc.createElementNS("http://www.w3.org/2000/svg", t)
);

/**
 * Creates a template descriptor.
 */
export const _T = (
  p2: () => Element,
  f: number,
  p: PropOpCode[],
  c: ChildOpCode[],
  s: StateOpCode[],
  d: any[],
): TemplateDescriptor => ({
  f: Flags.Template,
  p1: { f, p, c, s, d },
  p2,
});

export const _t = (d: TemplateDescriptor, p: any[]): VTemplate => ({ d, p });

export type ComponentFactory = {
  (factory: (c: Component) => () => VAny): () => VComponent<undefined>;
  <P>(
    factory: (c: Component) => (props: P) => VAny,
    areEqual?: (prev: P, next: P) => boolean
  ): (props: P) => VComponent<P>;
};

/**
 * Creates a factory that produces component nodes.
 *
 * @typeparam P Property type.
 * @param p1 Function that creates stateful render functions.
 * @param p2 Function that checks `props` for equality.
 * @returns Factory that produces component nodes.
 */
export const component: ComponentFactory = <P>(
  p1: (c: Component) => (props?: P) => VAny,
  p2?: (prev: P, next: P) => boolean,
): (p?: any) => VComponent<P> => {
  const d: ComponentDescriptor = { f: Flags.Component, p1, p2 };
  return (p: P) => ({ d, p });
};

/**
 * Prevents triggering updates.
 */
export const preventUpdates = (p: any) => true;

/**
 * Adds an unmount hook.
 *
 * @example
 *
 *     const Example = component((c) => {
 *       useUnmount(c, () => { console.log("unmounted"); });
 *
 *       return () => null;
 *     });
 *
 * @param component Component instance.
 * @param hook Unmount hook.
 */
export const useUnmount = (component: Component, hook: () => void): void => {
  const hooks = component.s2;
  component.s2 = (hooks === null)
    ? hook
    : (typeof hooks === "function")
      ? [hooks, hook]
      : (hooks.push(hook), hooks);
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

/**
 * Creates a side effect hook.
 *
 * @example
 *
 *     const Example = component((c) => {
 *       const [count, setCount] = useState(0);
 *       const timer = useEffect(c, shallowEq, ({ interval }) => {
 *         const tid = setInterval(() => { setCount(count() + 1); }, interval);
 *         return () => { clearInterval(tid); };
 *       });
 *
 *       return (interval) => (
 *         timer({ interval }),
 *
 *         htm`span.Counter ${i}`
 *       );
 *     });
 *
 * @typeparam T Hook props type.
 * @param component Component instance.
 * @param hook Side effect function.
 * @param areEqual Function that checks if input value hasn't changed.
 * @returns Side effect hook.
 */
export const useEffect: UseEffectFactory = <P>(
  component: Component,
  hook: (props?: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean,
): (props?: P) => void => {
  // var usage is intentional, see `index.js` module for an explanation.
  var reset: (() => void) | void;
  var prev: P | undefined;
  return (next?: P) => {
    if (
      areEqual === void 0 ||
      prev === void 0 ||
      areEqual(prev as P, next as P) === false
    ) {
      if (reset !== void 0) {
        reset();
      }
      RENDER_CONTEXT.e.push(() => {
        reset = hook(next!);
        if (component !== void 0 && reset !== void 0) {
          useUnmount(component, () => {
            if (reset !== void 0) {
              reset();
            }
          });
          component = (void 0)!;
        }
      });
    }
    prev = next;
  };
};

/**
 * Invalidates a component.
 *
 * @param c Component instance.
 */
export const invalidate = (c: Component): void => {
  if (!(c.f & Flags.Dirty)) {
    c.f |= Flags.Dirty;
    let prev: SNode = c;
    let parent = c.p;
    while (parent !== null) {
      // Polymorphic call-sites
      if (parent.f & Flags.DirtySubtree) {
        return;
      }
      prev = parent;
      parent.f |= Flags.DirtySubtree;
      parent = parent.p;
    }
    (prev as SRoot).v.d.p1(prev as SRoot);
  }
};

/**
 * VDescriptor for List nodes.
 */
export const LIST_DESCRIPTOR: ListDescriptor = {
  f: Flags.List,
  p1: null,
  p2: null,
};

/**
 * Creates a dynamic list.
 *
 * @typeparam E Entry type.
 * @typeparam K Key type.
 * @param entries Entries.
 * @param getKey Get key from entry function.
 * @param render Render entry function.
 * @returns Dynamic list.
 */
export const List = <E, K>(
  entries: E[],
  getKey: (entry: E, index: number) => K,
  render: (entry: E) => VAny,
): VList => ({
  d: LIST_DESCRIPTOR,
  p: {
    k: entries.map(getKey),
    v: entries.map(render),
  },
});

/**
 * Performs a Dirty Checking in a root subtree.
 *
 * @param root Stateful Root Node.
 * @param updateFlags Update flags (ForceUpdate and DisplaceNode).
 */
export const dirtyCheck = (root: SRoot, updateFlags: number): void => {
  while ((updateFlags | root.f) & (Flags.DirtySubtree | Flags.ForceUpdate)) {
    const ctx = RENDER_CONTEXT;
    const { p, n } = ctx;
    root.f = Flags.Root;
    if (root.c !== null) {
      const domSlot = root.v.p;
      RENDER_CONTEXT.p = domSlot.p;
      RENDER_CONTEXT.n = domSlot.n;
      _dirtyCheck(root.c as SNode, updateFlags);
      updateFlags = 0;
      _flushDOMEffects();
    }
    ctx.p = p;
    ctx.n = n;
  }
};

/**
 * Updates a root subtree.
 *
 * @param root Stateful Root Node.
 * @param next New Stateless Node.
 * @param updateFlags Update flags (ForceUpdate and DisplaceNode).
 */
export const update = (root: SRoot, next: VAny, updateFlags: number): void => {
  const ctx = RENDER_CONTEXT;
  const { p, n } = ctx;
  const domSlot = root.v.p;
  ctx.p = domSlot.p;
  ctx.n = domSlot.n;
  root.f = Flags.Root;
  root.c = _update(
    root,
    root.c as SNode,
    next,
    updateFlags,
  );
  _flushDOMEffects();
  ctx.p = p;
  ctx.n = n;
  dirtyCheck(root, 0);
};

/**
 * Unmounts root node.
 *
 * @param root Stateful Root Node.
 * @param detach Detach root DOM nodes from the DOM.
 */
export const unmount = (root: SRoot, detach: boolean): void => {
  if (root.c !== null) {
    const ctx = RENDER_CONTEXT;
    const { p, n } = ctx;
    ctx.p = root.v.p.p;
    root.f = Flags.Root;
    _unmount(root.c as SNode, detach);
    ctx.p = p;
    ctx.n = n;
  }
};

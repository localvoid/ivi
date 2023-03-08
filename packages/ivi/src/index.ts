import { TemplateFlags, ChildOpCode, PropOpCode, StateOpCode } from "@ivi/template-compiler/format";

const _Object = Object;
const _Array = Array;
const _isArray: <T = any>(a: any) => a is T[] = _Array.isArray;
const _Map = Map;
const _Int32Array = Int32Array;

const nodeProto = Node.prototype;
const elementProto = Element.prototype;
const doc = document;

const HTM_TEMPLATE = /**@__PURE__*/doc.createElement("template");
const HTM_TEMPLATE_CONTENT = HTM_TEMPLATE.content;
const _SVG_TEMPLATE = /**@__PURE__*/doc.createElement("template");
const SVG_TEMPLATE = /**@__PURE__*/doc.createElementNS("http://www.w3.org/2000/svg", "svg");
/**@__PURE__*/_SVG_TEMPLATE.appendChild(SVG_TEMPLATE);
const SVG_TEMPLATE_CONTENT = _SVG_TEMPLATE.content.firstChild as Element;

/** `Node.prototype.insertBefore` */
const _nodeInsertBefore = nodeProto.insertBefore;
/** `Node.prototype.removeChild`. */
const _nodeRemoveChild = nodeProto.removeChild;
/** `Node.prototype.cloneNode`. */
const _nodeCloneNode = nodeProto.cloneNode;
/** `Element.prototype.setAttribute` */
const elementSetAttribute = elementProto.setAttribute;
/** `Element.prototype.removeAttribute` */
const elementRemoveAttribute = elementProto.removeAttribute;
/** `EventTarget.prototype.addEventListener` */
const elementAddEventListener = elementProto.addEventListener;
/** `EventTarget.prototype.removeEventListener` */
const elementRemoveEventListener = elementProto.removeEventListener;

/** `Object.getOwnPropertyDescriptor(o, p)` */
const getDescriptor = (o: any, p: string | number | symbol) => _Object.getOwnPropertyDescriptor(o, p);

/** `Node.prototype.getFirstChild` */
const _nodeGetFirstChild = /*@__PURE__*/getDescriptor(nodeProto, "firstChild")!.get!;
/** `Node.prototype.getNextSibling` */
const _nodeGetNextSibling = /*@__PURE__*/getDescriptor(nodeProto, "nextSibling")!.get!;
/** `Element.prototype.className` */
const elementSetClassName = /*@__PURE__*/getDescriptor(elementProto, "className")!.set!;
/** `HTMLElement.prototype.style`. */
const htmlElementGetStyle = /*@__PURE__*/getDescriptor(HTMLElement.prototype, "style")!.get!;
/** `SVGElement.prototype.style` */
const svgElementGetStyle = /*@__PURE__*/getDescriptor(SVGElement.prototype, "style")!.get!;

interface Context {
  /** Next node. */
  n: Node | null;
  /** State index. */
  si: number;
}

const CONTEXT: Context = _Object.seal({
  n: null,
  si: 0,
});

/**
 * NodeFlags are used by VNodes and SNodes.
 */
export const enum NodeFlags {
  Template = 1,
  Component = 1 << 1,
  List = 1 << 2,
  Array = 1 << 3,
  Text = 1 << 4,
  Root = 1 << 5,

  Dirty = 1 << 6,
  DirtySubtree = 1 << 7,
  CleanMask = Dirty - 1,
}

/**
 * State node.
 *
 * @typeparam S Internal state.
 */
export interface SNode<V = VAny, S = any> {
  /** VAny. */
  v: V;
  /** See {@link NodeFlags} for details. */
  f: NodeFlags;
  /** Children state nodes. */
  c: SNode | (SNode | null)[] | null;
  /** Current state. */
  s: S;
  /** Parent state. */
  p: SNode | null,
}

export type SRoot<S = any> = SNode<VRoot, S>;
export type SText = SNode<string | number, Text>;
export type STemplate = SNode<VTemplate, Node[]>;
export type SList = SNode<VList, null>;
export type SComponent = SNode<VComponent, ComponentState>;
export type Component = SComponent;

export interface ComponentState {
  /** Render function. */
  r: null | ((props: any) => VAny),
  /** Unmount hooks. */
  u: null | (() => void) | (() => void)[];
}

/**
 * createSNode creates a {@link SNode} instance.
 *
 * @param v VNode.
 * @returns {@link SNode} instance.
 */
export const createSNode = <V extends VAny, S>(
  f: NodeFlags,
  v: V,
  c: SNode | Array<SNode | null> | null,
  s: S,
  p: SNode | null,
): SNode<V, S> => ({ f, v, c, s, p });

export interface VDescriptor<P1 = any, P2 = any> {
  /** See {@link NodeFlags} for details. */
  readonly f: NodeFlags;
  readonly p1: P1;
  readonly p2: P2;
}

export type OnRootInvalidated<S> = (root: SRoot<S>) => void;
export type RootDescriptor<S = any> = VDescriptor<OnRootInvalidated<S>, null>;

export interface TemplateData {
  /** Flags. */
  f: number,
  /** Prop OpCodes */
  p: PropOpCode[],
  /** Child OpCodes */
  c: ChildOpCode[],
  /** State OpCodes */
  s: StateOpCode[],
  /** Data */
  d: any[],
}

export type TemplateDescriptor = VDescriptor<TemplateData, any>;

export type ComponentDescriptor<P = any> = VDescriptor<
  (component: Component) => (props: P) => VAny,
  undefined | ((prev: P, next: P) => boolean)
>;

export type ListDescriptor = VDescriptor<null, null>;

/**
 * VNode.
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

/** Root VNode. */
export type VRoot = VNode<RootDescriptor, RootProps>;
/** Template VNode. */
export type VTemplate<P = any> = VNode<TemplateDescriptor, P>;
/** Component VNode. */
export type VComponent<P = any> = VNode<ComponentDescriptor, P>;
/** List VNode. */
export type VList<K = any> = VNode<ListDescriptor, ListProps<K>>;

export interface RootProps {
  /** Parent Element */
  p: Element,
  /** Next Node */
  n: Node | null,
}

export interface ListProps<K = any> {
  k: K[],
  v: VAny[],
}

/**
 * Operation.
 */
export type VAny =
  | null
  | string
  | number
  | VRoot
  | VTemplate
  | VComponent
  | VList
  | VArray
  ;

/**
 * Recursive operation array.
 */
export type VArray = VAny[];

export type Directive = (element: Element) => void;

const _unmount = (
  parentElement: Element,
  sNode: SNode | (SNode | null)[] | null,
): void => {
  var c, i;
  if (sNode !== null) {
    if (_isArray(sNode)) {
      for (i = 0; i < sNode.length; i++) {
        if ((c = sNode[i]) !== null) {
          unmount(parentElement, c, true);
        }
      }
    } else {
      unmount(parentElement, sNode, true);
    }
  }
};

const _updateTemplateProperties = (
  currentElement: Element,
  opCodes: PropOpCode[],
  strings: string[],
  state: Node[],
  prevProps: any[] | null,
  nextProps: any[],
  svg: boolean,
) => {
  var style;
  var key;
  var type;
  var propsIndex;
  var dataIndex;
  var op;
  var prev;
  var next;
  var i = 0;
  for (; i < opCodes.length; i++) {
    op = opCodes[i];
    type = op & PropOpCode.TypeMask;
    dataIndex = (op >> PropOpCode.DataShift) & PropOpCode.Mask10;
    if (type === PropOpCode.SetNode) {
      currentElement = state[dataIndex] as Element;
      style = void 0;
    } else {
      propsIndex = op >> PropOpCode.InputShift;
      if (prevProps !== null) {
        prev = prevProps[propsIndex];
      }
      next = nextProps[propsIndex];
      if (prev !== next || type === PropOpCode.DiffDOMProperty) {
        if (type === PropOpCode.Common) {
          // There is only one common property right now: class names
          elementSetClassName.call(currentElement, next);
        } else if (type === PropOpCode.Directive) {
          (next as Directive)(currentElement);
        } else {
          key = strings[dataIndex];
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
            style.setProperty(key, next as string);
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
  var tmp;
  var op;
  var ctx = CONTEXT;
  while (offset < endOffset) {
    op = opCodes[offset++];
    if (op & StateOpCode.Save) {
      state[++ctx.si] = currentNode;
    }
    if (op & StateOpCode.EnterOrRemove) {
      if (tmp = op >> StateOpCode.OffsetShift) { // Enter
        _assignTemplateSlots(
          _nodeGetFirstChild.call(currentNode),
          opCodes,
          offset,
          offset += tmp,
          state,
        );
      } else { // Remove
        tmp = currentNode as Comment;
        state[++ctx.si] = currentNode = _nodeGetNextSibling.call(currentNode);
        tmp.remove();
      }
    } else { // Next
      currentNode = _nodeGetNextSibling.call(currentNode);
    }
  }
};

const _mountTemplate = (
  parentSNode: SNode,
  parentElement: Element,
  vNode: VTemplate,
) => {
  var currentNode;
  var childIndex;
  var value;
  var j;
  var type;
  var children = null;
  var ctx = CONTEXT;
  var nextNode = ctx.n;
  var d = vNode.d;
  var props = vNode.p;
  var tpl = d.p1;
  var rootNode = d.p2();
  var opCodes: StateOpCode[] | ChildOpCode[] = tpl.s;
  var i = tpl.f;
  var state = _Array<Node>(i & TemplateFlags.Mask10);
  state[0] = rootNode;

  ctx.n = null;

  if (opCodes.length > 0) {
    ctx.si = 0;
    _assignTemplateSlots(
      _nodeGetFirstChild.call(rootNode),
      opCodes,
      0,
      opCodes.length,
      state,
    );
  }
  _updateTemplateProperties(
    rootNode,
    tpl.p,
    tpl.d,
    state,
    null,
    props,
    !!(tpl.f & TemplateFlags.Svg),
  );

  currentNode = rootNode;
  childIndex = 0;
  j = i >> 10;
  var stateNode = createSNode(NodeFlags.Template, vNode, children, state, parentSNode);
  if (j > 0) {
    stateNode.c = children = _Array(j);
    opCodes = tpl.c;
    for (i = 0; i < opCodes.length; i++) {
      j = opCodes[i];
      type = j & ChildOpCode.Type;
      value = j >> ChildOpCode.ValueShift;
      if (type === ChildOpCode.Child) {
        children[childIndex++] = mount(stateNode, currentNode, props[value]);
      } else if (type === ChildOpCode.SetNext) {
        ctx.n = (state as Node[])[value];
      } else { // ChildOpCode.SetParent
        currentNode = (state as Node[])[value] as Element;
        ctx.n = null;
      }
    }
  }

  _nodeInsertBefore!.call(parentElement, rootNode, nextNode);
  ctx.n = rootNode;
  return stateNode;
};

const _updateTemplate = (
  parentElement: Element,
  sNode: STemplate,
  next: VTemplate,
  displace: boolean,
) => {
  var v;
  var c;
  var k;
  var j;
  var i;
  var ctx = CONTEXT;
  var children = sNode.c;
  var prevProps = (sNode.v as VTemplate).p;
  var state = sNode.s;
  var nextProps = next.p;
  var d = next.d;
  var tpl = d.p1;
  var rootNode = state[0] as Element;
  var opCodes = tpl.c;

  if (displace === true) {
    _nodeInsertBefore!.call(parentElement, rootNode, ctx.n);
  }

  _updateTemplateProperties(
    rootNode,
    tpl.p,
    tpl.d,
    state as Node[],
    prevProps,
    nextProps,
    !!(tpl.f & TemplateFlags.Svg),
  );

  parentElement = rootNode;
  ctx.n = null;

  j = 0;
  for (i = 0; i < opCodes.length; i++) {
    c = opCodes[i];
    k = c & ChildOpCode.Type;
    v = c >> ChildOpCode.ValueShift;
    if (k === ChildOpCode.Child) {
      (children as (SNode | null)[])[j] =
        update(
          sNode,
          parentElement,
          (children as (SNode | null)[])[j++],
          nextProps[v],
          false,
        );
    } else if (k === ChildOpCode.SetNext) {
      ctx.n = (state as Node[])[v];
    } else { // ChildOpCode.SetParent
      parentElement = (state as Node[])[v] as Element;
      ctx.n = null;
    }
  }

  ctx.n = rootNode;
};

const _mountList = (parentState: SNode, parentElement: Element, f: NodeFlags, arr: VArray, o: VAny): SNode => {
  var i = arr.length;
  var c = _Array(i);
  var s = createSNode(f, o, c, null, parentState);
  while (i > 0) {
    c[--i] = mount(s, parentElement, arr[i]);
  }
  return s;
};

const _updateText = (
  parentSNode: SNode,
  parentElement: Element,
  sNode: SNode,
  next: string,
  displace: boolean,
): SNode => {
  var o;
  var s = sNode.s;
  if (typeof next !== "object") {
    o = sNode.v;
    // Reassign to reduce memory consumption even if nextOp is strictly equal to the prev op.
    sNode.v = next;
    if (o !== next) {
      (s as Node).nodeValue = next as string;
    }
    if (displace === true) {
      _nodeInsertBefore!.call(parentElement, s as Node, CONTEXT.n);
    }
    return sNode;
  } else {
    _nodeRemoveChild!.call(parentElement, s as Node);
    return mount(parentSNode, parentElement, next)!;
  }
};

const _updateComponent = (
  parentElement: Element,
  sNode: SComponent,
  next: VComponent,
  displace: boolean,
  forceUpdate: boolean,
) => {
  var child = sNode.c;
  var prevProps = (sNode.v as VComponent).p;
  var descriptor = next.d as ComponentDescriptor;
  var nextProps = next.p;
  if (
    (forceUpdate === true) || (
      (prevProps !== nextProps) &&
      (descriptor.p2 === void 0 || descriptor.p2(prevProps, nextProps) !== true)
    )
  ) {
    sNode.f = NodeFlags.Component;
    sNode.c = update(
      sNode,
      parentElement,
      child as SNode,
      sNode.s.r!(nextProps),
      displace,
    );
  } else if (sNode.c !== null) {
    dirtyCheck(parentElement, child as SNode, displace);
  }
};

const _updateArray = (
  parentElement: Element,
  sNode: SNode,
  children: VArray,
  displace: boolean,
) => {
  var result;
  var childState;
  var opStateChildren;
  var j;
  var i = children.length;
  if (i === 0) {
    _unmount(parentElement, sNode);
  } else {
    opStateChildren = sNode.c! as (SNode<any> | null)[];
    j = opStateChildren.length;
    if (i !== j) {
      sNode.c = (result = _Array(i));
      while (j > i) {
        if ((childState = (opStateChildren as Array<SNode | null>)[--j]) !== null) {
          _unmount(parentElement, childState);
        }
      }
      while (i > j) {
        result[--i] = mount(sNode, parentElement, children[i]);
      }
    }
    while (i > 0) {
      opStateChildren[--i] = update(
        sNode,
        parentElement,
        (opStateChildren as Array<SNode | null>)[i],
        children[i],
        displace,
      );
    }
  }
};

const enum MagicValues {
  /**
   * One of the children nodes were moved.
   */
  MovedChildren = 1073741823,
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
 * @param parentElement Parent DOM element.
 * @param sNode OpNode state for a TrackByKey operation.
 * @param a Previous operations.
 * @param b Next operations.
 * @param displace Children DOM nodes should be moved.
 * @noinline
 * @__NOINLINE__
 */
const _updateList = (
  parentElement: Element,
  sNode: SNode,
  a: ListProps<any>,
  b: ListProps<any>,
  displace: boolean,
): void => {
  var aKeys = a.k;
  var bKeys = b.k;
  var bOps = b.v;
  var i = bKeys.length;
  var j: number | undefined = aKeys.length;
  var result = Array(i);

  if (i === 0) { // New children list is empty.
    if (j > 0) { // Unmount nodes from the old children list.
      _unmount(parentElement, sNode);
    }
  } else if (j === 0) { // Old children list is empty.
    while (i > 0) { // Mount nodes from the new children list.
      result[--i] = mount(sNode, parentElement, bOps[i]);
    }
  } else {
    var opStateChildren = sNode.c as Array<SNode | null>;
    var aEnd = j - 1; // a.length - 1
    var bEnd = i - 1; // b.length - 1
    var start = 0;
    var node = bKeys[bEnd];

    // Step 1
    outer: while (true) {
      // Update nodes with the same key at the end.
      while (aKeys[aEnd] === node) {
        result[bEnd] = update(
          sNode,
          parentElement,
          opStateChildren[aEnd--],
          bOps[bEnd],
          displace,
        );
        if (start > --bEnd || start > aEnd) {
          break outer;
        }
        node = bKeys[bEnd];
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
        result[bEnd] = mount(sNode, parentElement, bOps[bEnd--]);
      }
    } else if (start > bEnd) {
      // All nodes from `b` are updated, remove the rest from `a`.
      i = start;
      do {
        _unmount(parentElement, opStateChildren[i++]);
      } while (i <= aEnd);
    } else { // Step 3
      // When `pos === 99999999`, it means that one of the nodes is in the wrong position and we should rearrange nodes
      // with LIS-based algorithm `markLIS()`.
      var pos = 0;
      var bLength = bEnd - start + 1;
      var sources = new _Int32Array(bLength); // Maps positions in the new children list to positions in the old list.
      var keyIndex = new _Map<any, number>(); // Maps keys to their positions in the new children list.
      for (i = 0; i < bLength; ++i) {
        j = i + start;
        // `NewNodeMark` value indicates that node doesn't exist in the old children list.
        sources[i] = MagicValues.NewNodeMark;
        keyIndex.set(bKeys[j], j);
      }

      for (i = start; i <= aEnd; ++i) {
        j = keyIndex.get(aKeys[i]);
        node = opStateChildren[i];
        if (j !== void 0) {
          pos = (pos < j) ? j : MagicValues.MovedChildren;
          sources[j - start] = i;
          result[j] = node;
        } else {
          _unmount(parentElement, node);
        }
      }

      // Step 4

      // Mark LIS nodes only when this node weren't moved `moveNode === false` and we've detected that one of the
      // children nodes were moved `pos === MagicValues.MovedChildren`.
      if (displace === false && pos === MagicValues.MovedChildren) {
        markLIS(sources);
      }
      while (bLength-- > 0) {
        bEnd = bLength + start;
        node = bOps[bEnd];
        j = sources[bLength];
        result[bEnd] = (j === -1) ?
          mount(sNode, parentElement, node) :
          update(
            sNode,
            parentElement,
            result[bEnd],
            node,
            displace || (pos === MagicValues.MovedChildren && j !== MagicValues.LISMark),
          );
      }
    }

    // Delayed update for nodes from Step 1 (prefix only). Reconciliation algorithm always updates nodes from right to
    // left.
    while (start > 0) {
      result[--start] = update(
        sNode,
        parentElement,
        opStateChildren[start],
        bOps[start],
        displace,
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
 *   const A = Int32Array.from([-1, 0, 2, 1]);
 *   markLIS(A);
 *   // A => [-1, -2, 2, -2]
 *
 * @param a Array of numbers.
 * @noinline
 * @__NOINLINE__
 */
const markLIS = (a: Int32Array): void => {
  var length = a.length;
  var parent = new _Int32Array(length);
  var index = new _Int32Array(length);
  var indexLength = 0;
  var i = 0;
  var j: number;
  var k: number;
  var lo: number;
  var hi: number;

  // Skip -1 values at the start of the input array `a`.
  for (; a[i] === MagicValues.NewNodeMark; ++i) { /**/ }

  index[0] = i++;
  for (; i < length; ++i) {
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
    return _nodeCloneNode.call(t, true) as Element;
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
    return _nodeCloneNode.call(t, true) as Element;
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
  f: NodeFlags.Template,
  p1: { f, p, c, s, d },
  p2,
});

export const _t = (d: TemplateDescriptor, p: any[]): VTemplate => ({ d, p });

/**
 * Creates a factory that produces component nodes.
 *
 * @typeparam P Property type.
 * @param p1 Component function.
 * @param p2 `areEqual` function that checks `props` for equality.
 * @returns Factory that produces component nodes.
 */
export const component = <P>(
  p1: (c: SComponent) => (props: P) => VAny,
  p2?: (prev: P, next: P) => boolean,
): (props: P) => VComponent<P> => (
  p1 = { f: NodeFlags.Component, p1, p2 } satisfies ComponentDescriptor as any,
  (p: P) => ({ d: p1 as any, p })
);

/**
 * VDescriptor for List nodes.
 */
const LIST: ListDescriptor = { f: NodeFlags.List, p1: null, p2: null };

/**
 * Creates a dynamic list operation.
 *
 * @typeparam E Entry type.
 * @typeparam K Key type.
 * @param entries Entries.
 * @param getKey Get key from entry function.
 * @param render Render entry function.
 * @returns List operation.
 */
export const List = <E, K>(
  entries: E[],
  getKey: (entry: E, index: number) => K,
  render: (entry: E) => VAny,
): VList => ({
  d: LIST,
  p: {
    k: entries.map(getKey),
    v: entries.map(render),
  },
});

/**
 * Invalidates component.
 *
 * @param c Component instance.
 */
export const invalidate = (c: Component): void => {
  if (!(c.f & NodeFlags.Dirty)) {
    c.f |= NodeFlags.Dirty;
    var parent = c.p;
    while (parent !== null) {
      if (parent.f & NodeFlags.DirtySubtree) {
        return;
      }
      parent.f |= NodeFlags.DirtySubtree;
      c = parent as any;
      parent = parent.p;
    }
    (c as any as SRoot).v.d.p1(c as any as SRoot);
  }
};

export const dirtyCheck = (
  parentElement: Element,
  sNode: SNode,
  displace: boolean,
): void => {
  var state, i,
    rootNode,
    ctx = CONTEXT,
    children = sNode.c,
    flags = sNode.f;
  if (flags & NodeFlags.Template) {
    rootNode = sNode.s[0];
    let c;
    if (displace === true) {
      _nodeInsertBefore.call(parentElement, rootNode, ctx.n);
    }
    if (flags & NodeFlags.DirtySubtree) {
      const childOpCodes = (sNode as STemplate).v.d.p1.c;
      const state = (sNode as STemplate).s;
      let currentNode = rootNode;
      let childIndex = 0;
      for (i = 0; i < childOpCodes.length; i++) {
        const op = childOpCodes[flags];
        const type = op & ChildOpCode.Type;
        const value = op >> ChildOpCode.ValueShift;
        if (type === ChildOpCode.Child) {
          c = (children as (SNode | null)[])[childIndex++];
          if (c !== null) {
            dirtyCheck(currentNode, c, false);
          }
        } else if (type === ChildOpCode.SetNext) {
          ctx.n = (state as Node[])[value];
        } else { // ChildOpCode.SetParent
          currentNode = state[value] as Element;
          ctx.n = null;
        }
      }
    }
    ctx.n = rootNode;
  } else if (flags & NodeFlags.Text) {
    if (displace === true) {
      _nodeInsertBefore.call(parentElement, sNode.s, ctx.n);
    }
    ctx.n = sNode.s;
  } else if (flags & NodeFlags.Component) {
    if (flags & NodeFlags.Dirty) {
      _updateComponent(
        parentElement,
        sNode as Component,
        (sNode as Component).v,
        displace,
        true,
      );
    } else if (children !== null) {
      dirtyCheck(parentElement, children as SNode, displace);
    }
  } else { // Array || List
    i = (children as Array<SNode | null>).length;
    while (i-- >= 0) {
      if ((state = (children as Array<SNode | null>)[i]) !== null) {
        dirtyCheck(parentElement, state, displace);
      }
    }
  }
  sNode.f &= NodeFlags.CleanMask;
};

/**
 * Updates a SNode with a next operation.
 *
 * @param parentElement Parent DOM Element.
 * @param sNode Operation state.
 * @param next Next operation.
 * @param displace DOM Element should be moved.
 * @returns OpNode state.
 */
export const update = (
  parentSNode: SNode,
  parentElement: Element,
  sNode: SNode | null,
  next: VAny,
  displace: boolean,
): SNode | null => {
  var flags, prev;
  if (next === null) {
    _unmount(parentElement, sNode);
    return null;
  }
  if (sNode === null) {
    return mount(parentSNode, parentElement, next);
  }
  flags = sNode.f;

  if (flags & NodeFlags.Text) {
    return _updateText(
      parentSNode,
      parentElement,
      sNode,
      next as string,
      displace,
    );
  }
  prev = sNode.v;
  if (prev === next) {
    dirtyCheck(parentElement, sNode, displace);
    return sNode;
  }
  if (
    ((flags & NodeFlags.Array) && !_isArray(next))
    || ((prev as VNode).d !== (next as VNode).d)
  ) {
    _unmount(parentElement, sNode);
    return mount(parentSNode, parentElement, next);
  }

  flags &= (NodeFlags.Component | NodeFlags.Template | NodeFlags.Array);
  if (flags === NodeFlags.Component) {
    _updateComponent(
      parentElement,
      sNode as Component,
      next as VComponent,
      displace,
      false,
    );
  } else if (flags === NodeFlags.Template) {
    _updateTemplate(
      parentElement,
      sNode as STemplate,
      next as VTemplate,
      displace,
    );
  } else if (flags === NodeFlags.Array) {
    _updateArray(parentElement, sNode, next as VArray, displace);
  } else {
    _updateList(
      parentElement,
      sNode,
      (prev as VList).p,
      (next as VList).p,
      displace,
    );
  }

  sNode.v = next;
  return sNode;
};

export const mount = (
  parentSNode: SNode,
  parentElement: Element,
  v: VAny,
): SNode | null => {
  var i, c, s, d, e;
  if (v !== null) {
    if (typeof v === "object") {
      if (_isArray(v)) {
        return _mountList(parentSNode, parentElement, NodeFlags.Array, v, v);
      } else {
        d = v.d;
        i = d.f & (NodeFlags.Template | NodeFlags.Component);
        if (i === NodeFlags.Template) {
          return _mountTemplate(parentSNode, parentElement, v as VTemplate);
        } else if (i === NodeFlags.Component) {
          e = { r: null, u: null } satisfies ComponentState;
          s = createSNode<VComponent, ComponentState>(
            NodeFlags.Component,
            v as VComponent,
            null,
            e,
            parentSNode,
          );
          (e as ComponentState).r = c = (d as ComponentDescriptor).p1(s as Component);
          s.c = mount(s, parentElement, c((v as VComponent).p));
          return s;
        }
        // List
        return _mountList(
          parentSNode,
          parentElement,
          NodeFlags.List,
          (v as VList).p.v,
          v,
        );
      }
    } else {
      c = CONTEXT;
      e = doc.createTextNode(v as string);
      _nodeInsertBefore!.call(parentElement, e, c.n);
      c.n = e;
      return createSNode(NodeFlags.Text, v, null, e, parentSNode);
    }
  }
  return null;
};

export const unmount = (parentElement: Element, sNode: SNode, detach: boolean): void => {
  var c, i, v, f = sNode.f;

  if (detach === true && (f & (NodeFlags.Template | NodeFlags.Text))) {
    detach = false;
    _nodeRemoveChild!.call(
      parentElement,
      (f & NodeFlags.Template)
        ? (sNode as STemplate).s[0]
        : (sNode as SText).s
    );
  }
  if ((c = sNode.c) !== null) {
    if (_isArray(c)) {
      for (i = 0; i < c.length; i++) {
        if ((v = c[i]) !== null) {
          unmount(parentElement, v, detach);
        }
      }
    } else {
      unmount(parentElement, c as SNode, detach);
    }
  }
  if (f & NodeFlags.Component) {
    if ((c = (sNode as SComponent).s.u) !== null) {
      if (typeof c === "function") {
        c();
      } else {
        for (i = 0; i < c.length; i++) {
          c[i]();
        }
      }
    }
  }
};

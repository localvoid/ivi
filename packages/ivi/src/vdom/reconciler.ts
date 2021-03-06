/**
 * If you think that some code in this module is weird, you aren't alone :) There are many code fragments in this module
 * that would be considered as a "bad practice" by the community, in most cases it is implemented this way because every
 * function in this module is on a hot path. It is better to overoptimize some small module, instead of pushing
 * performance issues into user space.
 */
import {
  UNMOUNT_TOKEN, dirtyCheckWatchList, saveObservableDependencies, assign, enableWatch, disableWatch,
} from "../core";
import {
  doc, objectHasOwnProperty,
  nodeInsertBefore, nodeRemoveChild, elementSetAttribute, nodeCloneNode, elementRemoveAttribute,
  elementSetClassName, htmlElementGetStyle, svgElementGetStyle,
} from "../dom/shortcuts";
import { SVG_NAMESPACE } from "../dom/namespaces";
import { CSSStyleProps } from "../dom/style";
import { NodeFlags } from "./node_flags";
import { AttributeDirective } from "./attribute_directive";
import { OpNode, DOMElementOp, EventsOp, ContextOp, TrackByKeyOp, ComponentOp, OpArray, Key, Op } from "./operations";
import { OpState } from "./state";
import { ElementProtoDescriptor } from "./element_proto";
import { ComponentDescriptor, ComponentState } from "./component";
import { setContext, pushContext, ContextDescriptor, ContextState } from "./context";

const enum MagicValues {
  /**
   * One of the children nodes were moved.
   */
  MovedChildren = 99999999,
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
 * Simple workaround that efficiently solves a lot of issues with fragments, nested `TrackByKey` ops and holes
 * (`null` ops).
 *
 * Reconciler always goes through the tree from right to left and updates `_nextNode` value when it goes through nodes
 * associated with DOM nodes, so when we need to insert a new DOM node, we can take it from this variable instead of
 * recursively looking for a next DOM node.
 */
let _nextNode!: Node | null;

/**
 * _resetState resets global reconciler state.
 */
export function _resetState(): void {
  _nextNode = null;
}

/**
 * VisitNodesDirective controls the traversal algorithm {@link visitNodes}`.
 */
export const enum VisitNodesDirective {
  /**
   * Continue traversing the tree.
   */
  Continue = 0,
  /**
   * Stops immediately.
   */
  StopImmediate = 1,
  /**
   * Stops traversing through children nodes and continues trversing through adjacent nodes.
   */
  Stop = 1 << 1,
}

/**
 * visitNodes traverses the operation state tree and invokes `visitor` function for each state node.
 *
 * @param opState State node.
 * @param visitor Visitor function.
 * @returns {@link VisitNodesDirective}
 */
export function visitNodes(opState: OpState, visitor: (opState: OpState) => VisitNodesDirective): VisitNodesDirective;
export function visitNodes(
  opState: OpState | null,
  visitor: (opState: OpState) => VisitNodesDirective,
): VisitNodesDirective {
  let i = visitor(opState!);
  if (i !== VisitNodesDirective.Continue) {
    return (i & VisitNodesDirective.StopImmediate);
  }

  const { f, c } = opState!;
  if ((f & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
    for (i = 0; i < (c as Array<OpState | null>).length; i++) {
      if (
        (opState = (c as Array<OpState | null>)[i]) !== null &&
        (visitNodes(opState, visitor) & VisitNodesDirective.StopImmediate) !== 0
      ) {
        return VisitNodesDirective.StopImmediate;
      }
    }
  } else if (c !== null) {
    return visitNodes(c as OpState, visitor);
  }
  return VisitNodesDirective.Continue;
}

/**
 * getDOMNode retrieves closest DOM node from the {@link OpState} instance.
 *
 * @typeparam T DOM node type.
 * @param opState State node.
 * @returns DOM node.
 */
export function getDOMNode<T extends Node>(opState: OpState | null): T | null;
export function getDOMNode<T extends Node>(opState: OpState | Array<OpState | null> | null): T | null {
  if (opState === null) {
    return null;
  }

  let i = (opState as OpState).f;
  let c: OpState | Node | null;
  if ((i & (NodeFlags.Element | NodeFlags.Text)) === 0) {
    opState = (opState as OpState).c;
    if ((i & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      for (i = 0; i < (opState as Array<OpState | null>).length; i++) {
        if ((c = getDOMNode((opState as Array<OpState | null>)[i])) !== null) {
          return c as T;
        }
      }
      return null;
    }
    return getDOMNode(opState as OpState);
  }
  return (opState as OpState).s as T;
}

export function _dirtyCheck(
  parentElement: Element,
  opState: OpState,
  moveNode: boolean,
): void {
  const flags = opState.f;
  const c = opState.c;
  let state;
  let i;
  let r;

  if ((flags & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
    state = opState.s as Node;
    if (moveNode === true) {
      nodeInsertBefore!.call(parentElement, state, _nextNode);
    }
    if (c !== null) {
      _nextNode = null;
      _dirtyCheck(state as Element, c as OpState, false);
    }
    _nextNode = state;
  } else if ((flags & NodeFlags.Component) !== 0) {
    state = opState.s as ComponentState;
    if (
      ((flags & NodeFlags.Dirty) !== 0) ||
      (state.d !== null && dirtyCheckWatchList(state.d) === true)
    ) {
      r = opState.o as ComponentOp;
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        enableWatch();
      }
      r = state.r!(r.v, r.c);
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        disableWatch();
      }
      state.d = saveObservableDependencies();
      opState.c = _update(
        parentElement,
        c as OpState | null,
        r,
        moveNode,
      );
    } else if (c !== null) {
      _dirtyCheck(parentElement, c as OpState, moveNode);
    }
  } else if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
    i = (c as Array<OpState | null>).length;
    while (i > 0) {
      if ((state = (c as Array<OpState | null>)[--i]) !== null) {
        _dirtyCheck(parentElement, state, moveNode);
      }
    }
  } else if ((flags & NodeFlags.Events) !== 0) {
    _dirtyCheck(parentElement, c as OpState, moveNode);
  } else { // ((f & NodeFlags.Context) !== 0)
    state = setContext(opState.s);
    _dirtyCheck(parentElement, c as OpState, moveNode);
    setContext(state);
  }
}

function _unmountWalk(opState: OpState): void {
  const flags = opState.f;
  let children;
  let i;
  let v;

  if ((children = opState.c) !== null) {
    if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      for (i = 0; i < (children as Array<OpState | null>).length; i++) {
        if ((v = (children as Array<OpState | null>)[i]) !== null) {
          _unmountWalk(v);
        }
      }
    } else {
      _unmountWalk(children as OpState);
    }
  }

  if ((flags & NodeFlags.Component) !== 0) {
    if ((v = (opState.s as ComponentState).u) !== null) {
      if (typeof v === "function") {
        v(UNMOUNT_TOKEN);
      } else {
        for (i = 0; i < v.length; i++) {
          v[i](UNMOUNT_TOKEN);
        }
      }
    }
  }
}

function _unmountRemove(parentElement: Element, opState: OpState): void;
function _unmountRemove(
  parentElement: Element,
  opState: OpState | Array<OpState | null> | null,
): void {
  let i = (opState as OpState).f;
  let c;

  if ((i & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
    nodeRemoveChild!.call(parentElement, (opState as OpState).s as Node);
  } else {
    opState = (opState as OpState).c;
    if ((i & (NodeFlags.TrackByKey | NodeFlags.Fragment)) !== 0) {
      for (i = 0; i < (opState as Array<OpState | null>).length; ++i) {
        if ((c = (opState as Array<OpState | null>)[i]) !== null) {
          _unmountRemove(parentElement, c);
        }
      }
    } else if (opState !== null) {
      _unmountRemove(parentElement, opState as OpState);
    }
  }
}

export function _unmount(parentElement: Element, opState: OpState): void {
  _unmountRemove(parentElement, opState);
  _unmountWalk(opState);
}

function _mountText(parentElement: Element, o: string | number): OpState {
  const s = doc.createTextNode(o as string);
  nodeInsertBefore!.call(parentElement, s, _nextNode);
  _nextNode = s;
  return { f: NodeFlags.Text, o, c: null, s };
}

function _createElement(node: Element | undefined, op: DOMElementOp): Element {
  const { t, v, n } = op;
  const svg = (t.f & NodeFlags.Svg) !== 0;
  if (node === void 0) {
    const tagName = t.d as string;
    node = svg ?
      doc.createElementNS(SVG_NAMESPACE, tagName) :
      doc.createElement(tagName);
  }

  if (n) {
    _updateClassName(node, n, svg);
  }

  if (v !== void 0) {
    _updateAttrs(node, void 0, v, svg);
  }

  return node;
}

function _mountObject(
  parentElement: Element,
  o: OpNode,
): OpState {
  const opType = o.t; // polymorphic callsite
  const f = opType.f;
  const opState = { f, o, c: null, s: null } as OpState;
  let prevState;
  let value;
  let node;
  let i;

  if ((f & NodeFlags.Component) !== 0) {
    opState.s = prevState = { r: null, d: null, u: null } as ComponentState;
    // Reusing value variable.
    prevState.r = value = (opType.d as ComponentDescriptor).c(opState);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      enableWatch();
    }
    node = value((o as ComponentOp).v, (o as ComponentOp).c);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      disableWatch();
    }
    prevState.d = saveObservableDependencies();
    opState.c = _mount(parentElement, node);
  } else {
    if ((f & NodeFlags.Element) !== 0) {
      value = opType.d;
      if ((f & NodeFlags.ElementProto) !== 0) {
        node = (value as ElementProtoDescriptor).n as Element;
        if (node === null) {
          (value as ElementProtoDescriptor).n = node = _createElement(
            void 0,
            (value as ElementProtoDescriptor).p,
          );
        }
        node = nodeCloneNode!.call(node, false) as Element;
      }
      opState.s = node = _createElement(node, o as DOMElementOp);

      prevState = _nextNode;
      if ((value = (o as DOMElementOp).c) !== null) {
        _nextNode = null;
        opState.c = _mount(node, value);
      }
      _nextNode = node;
      nodeInsertBefore!.call(parentElement, node, prevState);
    } else if ((f & (NodeFlags.Events | NodeFlags.Context)) !== 0) {
      if ((f & NodeFlags.Context) !== 0) {
        opState.s = prevState = ((f & NodeFlags.SetContextState) !== 0) ?
          setContext((o as ContextOp).v) :
          pushContext(opType.d as ContextDescriptor, (o as ContextOp).v);
        opState.c = _mount(parentElement, (o as ContextOp).c);
        setContext(prevState);
      } else {
        opState.c = _mount(parentElement, (o as EventsOp).c);
      }
    } else { // ((opFlags & NodeFlags.TrackByKey) !== 0)
      node = (o as TrackByKeyOp).v;
      i = node.length;
      opState.c = value = Array(i);
      while (i > 0) {
        value[--i] = _mount(parentElement, node[i].v);
      }
    }
  }
  return opState;
}

function _mountFragment(parentElement: Element, o: OpArray): OpState {
  let i = o.length;
  const c = Array(i);
  while (i > 0) {
    c[--i] = _mount(parentElement, o[i]);
  }
  return { f: NodeFlags.Fragment, o, c, s: null };
}

export function _mount(
  parentElement: Element,
  op: Op,
): OpState | null {
  return (op !== null) ?
    (
      (typeof op === "object") ?
        (
          (op instanceof Array) ?
            _mountFragment(parentElement, op) :
            _mountObject(parentElement, op)
        ) :
        _mountText(parentElement, op)
    ) :
    null;
}

/**
 * _update updates a stateNode with a next operation.
 *
 * @param parentElement Parent DOM Element.
 * @param opState Operation state.
 * @param nextOp Next operation.
 * @param moveNode DOM Element should be moved.
 * @returns OpNode state.
 */
export function _update(
  parentElement: Element,
  opState: OpState | null,
  nextOp: Op,
  moveNode: boolean,
): OpState | null {
  if (nextOp === null) {
    if (opState !== null) {
      _unmount(parentElement, opState);
    }
    return null;
  }
  if (opState === null) {
    return _mount(parentElement, nextOp);
  }
  const { f, o, s } = opState;

  if ((f & NodeFlags.Text) !== 0) {
    if (typeof nextOp !== "object") {
      // Reassign to reduce memory consumption even if nextOp is strictly equal to the prev op.
      opState.o = nextOp;
      if (o !== nextOp) {
        (s as Node).nodeValue = nextOp as string;
      }
      if (moveNode === true) {
        nodeInsertBefore!.call(parentElement, s as Node, _nextNode);
      }
      _nextNode = s as Node;
    } else {
      nodeRemoveChild!.call(parentElement, s as Node);
      return _mount(parentElement, nextOp);
    }
  } else {
    // Here we don't need to reassign nextOp because op should always be an object, and strict equality will guarantee
    // that this object is occupying the same memory region.
    if (o === nextOp) {
      _dirtyCheck(parentElement, opState, moveNode);
      return opState;
    }
    if (
      ((f & NodeFlags.Fragment) !== 0 ?
        !(nextOp instanceof Array) :
        (
          nextOp instanceof Array ||
          (o as OpNode).t !== (nextOp as OpNode).t // polymorphic callsites
        )
      )
    ) {
      _unmount(parentElement, opState);
      return _mount(parentElement, nextOp);
    }
    opState.o = nextOp;
    const opStateChildren = opState.c;
    let prevData1;
    let nextData1;
    let prevData2;
    let nextData2;
    let nextValue;
    let i;

    if ((f & NodeFlags.Component) !== 0) {
      prevData1 = (o as ComponentOp).v;
      prevData2 = (o as ComponentOp).c;
      nextData1 = (nextOp as ComponentOp).v;
      nextData2 = (nextOp as ComponentOp).c;
      nextValue = (nextOp as ComponentOp).t.d as ComponentDescriptor;
      // Prioritize checking 2nd property as it is most likely will be used to pass children nodes or custom render
      // function, so it won't have any complex `areEqual` checking.
      if (
        (
          (prevData2 !== nextData2) &&
          (nextValue.e2 === void 0 || nextValue.e2(prevData2, nextData2) !== true)
        ) || (
          (prevData1 !== nextData1) &&
          (nextValue.e1 === void 0 || nextValue.e1(prevData1, nextData1) !== true)
        )
      ) {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== "production") {
          enableWatch();
        }
        nextData1 = (s as ComponentState).r!(nextData1, nextData2);
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== "production") {
          disableWatch();
        }
        (s as ComponentState).d = saveObservableDependencies();

        opState.c = _update(
          parentElement,
          opStateChildren as OpState,
          nextData1,
          moveNode,
        );
      } else {
        _dirtyCheck(parentElement, opState, moveNode);
      }
    } else {
      if ((f & NodeFlags.Element) !== 0) {
        i = (f & NodeFlags.Svg) !== 0;

        if ((o as DOMElementOp).n !== (nextValue = (nextOp as DOMElementOp).n)) {
          if (nextValue === void 0) {
            nextValue = "";
          }
          _updateClassName(s as Element, nextValue, i);
        }

        if ((o as DOMElementOp).v !== (nextValue = (nextOp as DOMElementOp).v)) {
          _updateAttrs(s as Element, (o as DOMElementOp).v, nextValue, i);
        }

        if (moveNode === true) {
          nodeInsertBefore!.call(parentElement, s as Element, _nextNode);
        }

        _nextNode = null;
        opState.c = _update(s as Element, opStateChildren as OpState, (nextOp as DOMElementOp).c, false);
        _nextNode = s as Node;
      } else if ((f & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
        if ((f & NodeFlags.Fragment) !== 0) {
          i = (nextOp as OpArray).length;
          if (i === 0) {
            _unmount(parentElement, opState);
          } else {
            prevData1 = (opStateChildren as Array<OpState | null>).length;
            if (i !== prevData1) {
              opState.c = nextValue = Array(i);
              while (prevData1 > i) {
                nextData1 = (opStateChildren as Array<OpState | null>)[--prevData1];
                if (nextData1 !== null) {
                  _unmount(parentElement, nextData1);
                }
              }
              while (i > prevData1) {
                nextValue[--i] = _mount(parentElement, (nextOp as OpArray)[i]);
              }
            } else {
              nextValue = (opStateChildren as Array<OpState | null>);
            }
            while (i > 0) {
              nextValue[--i] = _update(
                parentElement,
                (opStateChildren as Array<OpState | null>)[i],
                (nextOp as OpArray)[i],
                moveNode,
              );
            }
          }
        } else {
          _updateChildrenTrackByKeys(
            parentElement,
            opState,
            (o as TrackByKeyOp).v,
            (nextOp as TrackByKeyOp).v,
            moveNode,
          );
        }
      } else if ((f & NodeFlags.Events) !== 0) {
        opState.c = _update(
          parentElement,
          opStateChildren as OpState,
          (nextOp as EventsOp).c,
          moveNode,
        );
      } else { // if ((flags & NodeFlags.Context) !== 0) {
        nextData1 = (nextOp as ContextOp).v;
        if ((f & NodeFlags.SetContextState) !== 0) {
          opState.s = nextData1;
        } else {
          nextValue = (s as ContextState).v;
          if (nextValue.v !== nextData1) {
            assign(nextValue, nextData1);
          }
        }
        nextValue = setContext(opState.s);
        opState.c = _update(
          parentElement,
          opStateChildren as OpState,
          (nextOp as ContextOp).c,
          moveNode,
        );
        setContext(nextValue);
      }
    }
  }

  return opState;
}

/**
 * Update children list with track by key algorithm.
 *
 * High-level overview of the algorithm that is implemented in this function.
 *
 * This algorithm finds a minimum[1] number of DOM operations. It works in several steps:
 *
 * 1. Common prefix and suffix optimization.
 *
 * This optimization technique is looking for nodes with identical keys by simultaneously iterating through nodes in the
 * old children list `A` and new children list `B` from both sides.
 *
 *  A: -> [a b c d] <-
 *  B: -> [a b d] <-
 *
 * Skip nodes "a" and "b" at the start, and node "d" at the end.
 *
 *  A: -> [c] <-
 *  B: -> [] <-
 *
 * 2. Zero length optimizations.
 *
 * Check if the size of one of the list is equal to zero. When length of the old children list is zero, insert remaining
 * nodes from the new list. When length of the new children list is zero, remove remaining nodes from the old list.
 *
 *  A: -> [a b c g] <-
 *  B: -> [a g] <-
 *
 * Skip nodes "a" and "g" (prefix and suffix optimization).
 *
 *  A: [b c]
 *  B: []
 *
 * Remove nodes "b" and "c".
 *
 * 3. Index and unmount removed nodes.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [. . . . .] // . == -1
 *
 * Create array `P` (`sources` variable) with the length of the new children list and fill it with `-1` values
 * (`MagicValue.NewNodeMark` constant). `-1` value indicates that node at this position should be mounted. Later we will
 * assign node positions in the old children list to this array.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [. . . . .] // . == -1
 *  I: {
 *    c: 0, // B[0] == c
 *    b: 1, // B[1] == b
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  last = 0
 *
 * Create reverse index `I` that maps keys to node positions in the new children list.
 *
 *  A: [b c d e f]
 *      ^
 *  B: [c b h f e]
 *  P: [. 0 . . .] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1, <-
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  last = 1
 *
 * Assign original positions of the nodes from the old children list to the array `P`.
 *
 * Iterate through nodes in the old children list and get their new positions from the index `I`. Assign old node
 * position to the array `P`. When index `I` doesn't have a key for the old node, it means that it should be unmounted.
 *
 * When we assigning positions to the array `P`, we also store a position of the last seen node in the new children
 * list (`pos` variable), if the last seen position is greater than current position of the node at the new list, then
 * we are switching `moved` flag to `true` (`pos === MagicValue.MovedChildren`).
 *
 *  A: [b c d e f]
 *        ^
 *  B: [c b h f e]
 *  P: [1 0 . . .] // . == -1
 *  I: {
 *    c: 0, <-
 *    b: 1,
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  last = 1 // last > 0; moved = true
 *
 * The last position `1` is greater than current position of the node at the new list `0`, switch `moved` flag to
 * `true`.
 *
 *  A: [b c d e f]
 *          ^
 *  B: [c b h f e]
 *  P: [1 0 . . .] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1,
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  moved = true
 *
 * Node with key "d" doesn't exist in the index `I`, unmount node `d`.
 *
 *  A: [b c d e f]
 *            ^
 *  B: [c b h f e]
 *  P: [1 0 . . 3] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1,
 *    h: 2,
 *    f: 3,
 *    e: 4, <-
 *  }
 *  moved = true
 *
 * Assign position `3` for `e` node.
 *
 *  A: [b c d e f]
 *              ^
 *  B: [c b h f e]
 *  P: [1 0 . 4 3] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1,
 *    h: 2,
 *    f: 3, <-
 *    e: 4,
 *  }
 *  moved = true
 *
 * Assign position `4` for 'f' node.
 *
 * 4. Find minimum number of moves when `moved` flag is on and mount new nodes.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [1 * . 4 *] // . == -1  * == -2
 *
 * When `moved` is on, mark all nodes in the array `P` that belong to the
 * [longest increasing subsequence](http://en.wikipedia.org/wiki/Longest_increasing_subsequence) and move all nodes that
 * doesn't belong to this subsequence.
 *
 * Iterate over the new children list and the `P` array simultaneously. When value from `P` array is equal to `-1`,
 * mount a new node. When it isn't equal to `-2`, move it.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *              ^  // new_pos == 4
 *  P: [1 * . 4 *] // . == -1  * == -2
 *              ^
 *
 * Node "e" has `-2` value in the array `P`, nothing changes.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *            ^    // new_pos == 3
 *  P: [1 * . 4 *] // . == -1  * == -2
 *            ^
 *
 * Node "f" has `4` value in the array `P`, move it before the next node "e".
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *          ^      // new_pos == 2
 *  P: [1 * . 4 *] // . == -1  * == -2
 *          ^
 *
 * Node "h" has `-1` value in the array `P`, mount new node "h".
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *        ^        // new_pos == 1
 *  P: [1 * . 4 *] // . == -1  * == -2
 *        ^
 *
 * Node "b" has `-2` value in the array `P`, nothing changes.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *      ^          // new_pos == 0
 *  P: [1 * . 4 *] // . == -1  * == -2
 *
 * Node "c" has `1` value in the array `P`, move it before the next node "b".
 *
 * When `moved` flag is off, skip LIS algorithm and mount nodes that have `-1` value in the array `P`.
 *
 * [1] Actually it is almost minimum number of dom ops, when node is removed and another one is inserted at the same
 * place, instead of insert and remove dom ops, we can use one replace op. It will make everything even more
 * complicated, and other use cases will be slower, so I don't think that it is worth to use replace here.
 *
 * NOTE: There are many variations of this algorithm that are used by many UI libraries and many implementations are
 * still using an old optimization technique that were removed several years ago from this implementation. This
 * optimization were used to improve performance of simple moves/swaps. For example:
 *
 *  A: -> [a b c] <-
 *  B: -> [c b a] <-
 *
 * Move "a" and "c" nodes to the other edge.
 *
 *  A: -> [b] <-
 *  B: -> [b] <-
 *
 * Skip node "b".
 *
 * This optimization were removed because it breaks the promise that insert and remove operations shouldn't trigger a
 * move operation. For example:
 *
 *  A: -> [a b]
 *  B:    [c a] <-
 *
 * Move node "a" to the end.
 *
 *  A: [b]
 *  B: [c]
 *
 * Remove node "b" and insert node "c".
 *
 * In this use case, this optimization performs one unnecessary operation. Instead of removing node "b" and inserting
 * node "c", it also moves node `a`.
 *
 * @param parentElement Parent DOM element.
 * @param opState OpNode state for a TrackByKey operation.
 * @param a Previous operations.
 * @param b Next operations.
 * @param moveNode Children DOM nodes should be moved.
 * @noinline
 * @__NOINLINE__
 */
function _updateChildrenTrackByKeys(
  parentElement: Element,
  opState: OpState,
  a: Key<any, OpNode>[],
  b: Key<any, OpNode>[],
  moveNode: boolean,
): void {
  let i = b.length;
  let j: number | undefined = a.length;
  let result = Array(i);

  if (i === 0) { // New children list is empty.
    if (j > 0) { // Unmount nodes from the old children list.
      _unmount(parentElement, opState);
    }
  } else if (j === 0) { // Old children list is empty.
    while (i > 0) { // Mount nodes from the new children list.
      result[--i] = _mount(parentElement, b[i].v);
    }
  } else {
    let opStateChildren = opState.c as Array<OpState | null>;
    let aEnd = j - 1; // a.length - 1
    let bEnd = i - 1; // b.length - 1
    let start = 0;
    let node: OpNode | Key<any, OpNode> | OpState | null = b[bEnd];

    // Step 1
    outer: while (true) {
      // Update nodes with the same key at the end.
      while (a[aEnd].k === node.k) {
        result[bEnd] = _update(parentElement, opStateChildren[aEnd--], node.v, moveNode);
        if (start > --bEnd || start > aEnd) {
          break outer;
        }
        node = b[bEnd];
      }

      // Update nodes with the same key at the beginning.
      while (a[start].k === b[start].k && ++start <= aEnd && start <= bEnd) {
        // delayed update (all updates should be performed from right-to-left).
      }

      break;
    }

    // Step 2
    if (start > aEnd) {
      // All nodes from `a` are updated, insert the rest from `b`.
      while (bEnd >= start) {
        result[bEnd] = _mount(parentElement, b[bEnd--].v);
      }
    } else if (start > bEnd) {
      // All nodes from `b` are updated, remove the rest from `a`.
      i = start;
      do {
        if ((node = opStateChildren[i++]) !== null) {
          _unmount(parentElement, node);
        }
      } while (i <= aEnd);
    } else { // Step 3
      // When `pos === 99999999`, it means that one of the nodes is in the wrong position and we should rearrange nodes
      // with LIS-based algorithm `markLIS()`.
      let pos = 0;
      let bLength = bEnd - start + 1;
      let sources = new Int32Array(bLength); // Maps positions in the new children list to positions in the old list.
      let keyIndex = new Map<any, number>(); // Maps keys to their positions in the new children list.
      for (i = 0; i < bLength; ++i) {
        j = i + start;
        // `NewNodeMark` value indicates that node doesn't exist in the old children list.
        sources[i] = MagicValues.NewNodeMark;
        keyIndex.set(b[j].k, j);
      }

      for (i = start; i <= aEnd; ++i) {
        j = keyIndex.get(a[i].k);
        node = opStateChildren[i];
        if (j !== void 0) {
          pos = (pos < j) ? j : MagicValues.MovedChildren;
          sources[j - start] = i;
          result[j] = node;
        } else if (node !== null) {
          _unmount(parentElement, node);
        }
      }

      // Step 4

      // Mark LIS nodes only when this node weren't moved `moveNode === false` and we've detected that one of the
      // children nodes were moved `pos === MagicValues.MovedChildren`.
      if (moveNode === false && pos === MagicValues.MovedChildren) {
        markLIS(sources);
      }
      while (bLength-- > 0) {
        bEnd = bLength + start;
        node = b[bEnd].v;
        j = sources[bLength];
        result[bEnd] = (j === -1) ?
          _mount(parentElement, node) :
          _update(
            parentElement,
            result[bEnd],
            node,
            moveNode || (pos === MagicValues.MovedChildren && j !== MagicValues.LISMark),
          );
      }
    }

    // Delayed update for nodes from Step 1 (prefix only). Reconciliation algorithm always updates nodes from right to
    // left.
    while (start > 0) {
      result[--start] = _update(parentElement, opStateChildren[start], b[start].v, moveNode);
    }
  }
  opState.c = result;
}

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
function markLIS(a: Int32Array): void {
  let length = a.length;
  let parent = new Int32Array(length);
  let index = new Int32Array(length);
  let indexLength = 0;
  let i = 0;
  let j: number;
  let k: number;
  let lo: number;
  let hi: number;

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
  }

  // Mutate input array `a` and assign -2 value to all nodes that are part of LIS.
  j = index[indexLength];
  while (indexLength-- >= 0) {
    a[j] = MagicValues.LISMark;
    j = parent[j];
  }
}

/**
 * Update DOM classname.
 *
 * @param element DOM Element.
 * @param className Class name.
 * @param svg SVG Element.
 */
function _updateClassName(element: Element, className: string, svg: boolean): void {
  /**
   * SVGElement.className returns `SVGAnimatedString`.
   *
   * #quirks
   */
  if (svg === true) {
    elementSetAttribute!.call(element, "class", className);
  } else {
    elementSetClassName!.call((element as HTMLElement), className);
  }
}

/**
 * Update DOM styles.
 *
 * @param element HTML or SVG Element.
 * @param a Prev styles.
 * @param b Next styles.
 * @param svg SVG element.
 */
function _updateStyle(
  element: HTMLElement | SVGElement,
  a: Record<string, string> | undefined,
  b: Record<string, string> | undefined,
  svg: boolean,
): void {
  const style = svg === true ? svgElementGetStyle!.call(element) : htmlElementGetStyle!.call(element);
  let key: string;
  let bValue;

  if (a === void 0) {
    // a is empty, insert all styles from b.
    for (key in b!) {
      bValue = b![key];
      if (bValue !== void 0) {
        style.setProperty(key, bValue);
      }
    }
  } else if (b === void 0) {
    // b is empty, remove all styles from a
    for (key in a) {
      if (a[key] !== void 0) {
        style.removeProperty(key);
      }
    }
  } else {
    let matchCount = 0;
    let i = 0;
    for (key in a) {
      const aValue = a[key];
      bValue = (objectHasOwnProperty.call(b, key) === true) ? (matchCount++, b[key]) : void 0;
      if (aValue !== bValue) {
        if (bValue !== void 0) {
          style.setProperty(key, bValue);
        } else {
          style.removeProperty(key);
        }
      }
    }

    const keys = Object.keys(b);
    for (; matchCount < keys.length && i < keys.length; ++i) {
      key = keys[i];
      if (objectHasOwnProperty.call(a, key) === false) {
        bValue = b[key];
        ++matchCount;
        if (bValue !== void 0) {
          style.setProperty(key, b[key]);
        }
      }
    }
  }
}

/**
 * Update DOM attributes.
 *
 * @param element DOM element.
 * @param a Prev DOM attributes.
 * @param b Next DOM attributes.
 * @param svg SVG element.
 */
function _updateAttrs(
  element: Element,
  a: Record<string, string | number | AttributeDirective<any> | CSSStyleProps | undefined> | undefined,
  b: Record<string, string | number | AttributeDirective<any> | CSSStyleProps | undefined> | undefined,
  svg: boolean,
): void {
  let key: string;

  if (a === void 0) {
    // a is empty, insert all attributes from b.
    for (key in b!) {
      _updateAttr(element, key, void 0, b![key], svg);
    }
  } else if (b === void 0) {
    // b is empty, remove all attributes from a.
    for (key in a) {
      _updateAttr(element, key, a[key], void 0, svg);
    }
  } else {
    let matchCount = 0;
    let i = 0;
    for (key in a) {
      _updateAttr(
        element,
        key,
        a[key],
        (objectHasOwnProperty.call(b, key) === true) ? (matchCount++, b[key]) : void 0,
        svg,
      );
    }

    const keys = Object.keys(b);
    for (; matchCount < keys.length && i < keys.length; ++i) {
      key = keys[i];
      if (objectHasOwnProperty.call(a, key) === false) {
        _updateAttr(element, key, void 0, b[key], svg);
        ++matchCount;
      }
    }
  }
}

/**
 * Update DOM attribute.
 *
 * @param element DOM Element.
 * @param key Attribute name.
 * @param prev Previous value.
 * @param next Next value.
 * @param svg SVG element.
 */
function _updateAttr(
  element: Element,
  key: string,
  prev: string | number | AttributeDirective<any> | CSSStyleProps | undefined,
  next: string | number | AttributeDirective<any> | CSSStyleProps | undefined,
  svg: boolean,
): void {
  if (key !== "style") {
    if (typeof next === "object") {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        if (typeof prev !== "object" && prev !== void 0) {
          throw new Error(
            `Invalid DOM attribute, transitioning from basic values to attribute directives isn't allowed`,
          );
        }
      }
      (next as AttributeDirective<any>).u!(
        element,
        key,
        prev === void 0 ? void 0 : (prev as AttributeDirective<any>).v,
        next.v,
      );
    } else if (typeof prev === "object") {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        if (typeof next !== "object" && next !== void 0) {
          throw new Error(
            `Invalid DOM attribute, transitioning from attribute directives to basic values isn't allowed`,
          );
        }
      }
      (prev as AttributeDirective<any>).u!(
        element,
        key,
        (prev as AttributeDirective<any>).v,
        void 0,
      );
    } else if (prev !== next) {
      if (next === void 0) {
        elementRemoveAttribute!.call(element, key);
      } else {
        elementSetAttribute!.call(element, key, next as string);
      }
    }
  } else if (prev !== next) {
    _updateStyle(element as HTMLElement, prev as CSSStyleProps, next as CSSStyleProps, svg);
  }
}

import {
  doc, objectHasOwnProperty,
  nodeInsertBefore, nodeRemoveChild, elementSetAttribute, nodeCloneNode, nodeSetTextContent, elementRemoveAttribute,
  elementSetClassName, htmlElementGetStyle, svgElementGetStyle,
} from "../dom/shortcuts";
import { SVG_NAMESPACE } from "../dom/namespaces";
import { CSSStyleProps } from "../dom/style";
import { NodeFlags } from "./node_flags";
import { AttributeDirective } from "./attribute_directive";
import { OpNode, ElementData, OpArray, Key, ContextData, Op, EventsData } from "./operations";
import { OpState, createStateNode } from "./state";
import { ElementProtoDescriptor } from "./element_proto";
import { ComponentDescriptor, ComponentHooks, StatelessComponentDescriptor } from "./component";
import { setContext, restoreContext, assignContext } from "./context";

let _nextNode!: Node | null;
let _deepStateFlags!: NodeFlags;
let _dirtyContext!: boolean;

export function _resetState(): void {
  _nextNode = null;
  _deepStateFlags = 0;
  _dirtyContext = false;
}

function _pushDeepState(): NodeFlags {
  const s = _deepStateFlags;
  _deepStateFlags = 0;
  return s;
}

function _popDeepState(prev: NodeFlags, current: NodeFlags): NodeFlags {
  const r = current | _deepStateFlags;
  _deepStateFlags |= prev;
  return r;
}

/**
 * VisitNodesDirective controls the traversal algorithm.
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
   * Stops traversing through children nodes.
   */
  Stop = 1 << 1,
}

/**
 * visitNodes traverses the operation state tree and invokes `visitor` function for each state node.
 *
 * @param opState State node.
 * @param visitor Visitor function.
 * @returns {@link VisitNodesFlags}
 */
export function visitNodes(opState: OpState, visitor: (opState: OpState) => VisitNodesDirective): VisitNodesDirective {
  const vFlags = visitor(opState);
  if (vFlags !== VisitNodesDirective.Continue) {
    return (vFlags & VisitNodesDirective.StopImmediate);
  }

  const { f, c } = opState;
  if ((f & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
    for (let i = 0; i < (c as Array<OpState | null>).length; i++) {
      const child = (c as Array<OpState | null>)[i];
      if (child !== null && (visitNodes(child, visitor) & VisitNodesDirective.StopImmediate) !== 0) {
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
 * @param opState State node.
 * @returns DOM node.
 */
export function getDOMNode(opState: OpState): Node | null {
  const flags = opState.f;
  if ((flags & (NodeFlags.Element | NodeFlags.Text)) === 0) {
    const children = opState.c;
    if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      for (let i = 0; i < (children as Array<OpState | null>).length; i++) {
        const c = (children as Array<OpState | null>)[i];
        if (c !== null) {
          return getDOMNode(c);
        }
      }
      return null;
    }
    if (children === null) {
      return null;
    }
    return getDOMNode(children as OpState);
  }
  return opState.s as Node;
}

export function _dirtyCheck(
  parentElement: Element,
  opState: OpState,
  moveNode: boolean,
  singleChild: boolean,
): void {
  const { f, c } = opState;
  let state;
  let deepState;
  let i;

  if ((f & NodeFlags.Component) !== 0) {
    state = opState.s as ComponentHooks;
    deepState = _pushDeepState();
    if (
      ((f & NodeFlags.Stateful) !== 0) && (
        ((f & NodeFlags.Dirty) !== 0) ||
        (state.s !== null && state.s() === true)
      )
    ) {
      opState.c = _update(
        parentElement,
        c as OpState,
        state.r!((opState.o as OpNode).d),
        moveNode,
        singleChild,
      );
    } else if ((f & NodeFlags.DeepStateDirtyCheck) !== 0) {
      _dirtyCheck(parentElement, c as OpState, moveNode, singleChild);
    } else {
      if (moveNode === true) {
        _moveNodes(parentElement, opState);
      } else {
        _nextNode = getDOMNode(opState);
      }
    }
    opState.f = (opState.f & NodeFlags.SelfFlags) | _deepStateFlags;
    _deepStateFlags |= deepState | ((opState.f & NodeFlags.DeepStateFlags) << NodeFlags.DeepStateShift);
  } else if ((f & NodeFlags.DeepStateDirtyCheck) !== 0) {
    // Checking for `children === null` is unnecessary, `DeepStateDirtyCheck` flag guarantees that element should
    // have children nodes.
    deepState = _pushDeepState();
    if ((f & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
      state = opState.s as Node;
      if (moveNode === true) {
        nodeInsertBefore!.call(parentElement, state, _nextNode);
      }
      _dirtyCheck(state as Element, c as OpState, false, true);
      _nextNode = state;
    } else if ((f & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      i = (c as Array<OpState | null>).length;
      while (i > 0) {
        if ((state = (c as Array<OpState | null>)[--i]) !== null) {
          _dirtyCheck(parentElement, state, moveNode, false);
        }
      }
    } else if ((f & NodeFlags.Events) !== 0) {
      _dirtyCheck(parentElement, c as OpState, moveNode, singleChild);
    } else { // Context
      if (_dirtyContext === true) {
        opState.s = assignContext((opState.o as OpNode<ContextData>).d.v);
      }
      state = setContext(opState.s as {});
      _dirtyCheck(parentElement, c as OpState, moveNode, singleChild);
      restoreContext(state);
    }
    opState.f = _popDeepState(deepState, opState.f);
  } else {
    if (moveNode === true) {
      _moveNodes(parentElement, opState);
    } else {
      _nextNode = getDOMNode(opState);
    }
  }
}

function _moveNodes(parentElement: Element, opState: OpState) {
  const flags = opState.f;
  if ((flags & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
    const domNode = opState.s as Node;
    nodeInsertBefore!.call(parentElement, domNode, _nextNode);
    _nextNode = domNode;
  } else {
    const children = opState.c;
    if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      let i = (children as Array<OpState | null>).length;
      while (i > 0) {
        const c = (children as Array<OpState | null>)[--i];
        if (c !== null) {
          _moveNodes(parentElement, c);
        }
      }
    } else if (children !== null) {
      _moveNodes(parentElement, children as OpState);
    }
  }
}

function _unmountWalk(opState: OpState): void {
  const flags = opState.f;
  let i;
  let v;

  if ((flags & NodeFlags.DeepStateUnmount) !== 0) {
    const children = opState.c;
    if (children !== null) {
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
  }

  if ((flags & NodeFlags.Unmount) !== 0) {
    v = (opState.s as ComponentHooks).u;
    if (v !== null) {
      if (typeof v === "function") {
        v(true);
      } else {
        for (i = 0; i < v.length; i++) {
          v[i](true);
        }
      }
    }
  }
}

function _unmountRemove(parentElement: Element, opState: OpState, singleChild: boolean): void {
  const flags = opState.f;

  if ((flags & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
    nodeRemoveChild!.call(parentElement, opState.s as Node);
  } else {
    const children = opState.c;
    if ((flags & (NodeFlags.TrackByKey | NodeFlags.Fragment)) !== 0) {
      if (singleChild === true) {
        nodeSetTextContent!.call(parentElement, "");
      } else {
        for (let i = 0; i < (children as Array<OpState | null>).length; ++i) {
          const c = (children as Array<OpState | null>)[i];
          if (c !== null) {
            _unmountRemove(parentElement, c, false);
          }
        }
      }
    } else if (children !== null) {
      _unmountRemove(parentElement, children as OpState, singleChild);
    }
  }
}

export function _unmount(parentElement: Element, opState: OpState, singleChild: boolean): void {
  _unmountRemove(parentElement, opState, singleChild);
  _unmountWalk(opState);
}

function _mountText(
  parentElement: Element,
  opState: OpState,
  op: string | number,
) {
  const node = doc.createTextNode(op as string);
  nodeInsertBefore!.call(parentElement, node, _nextNode);
  _nextNode = node;
  opState.s = node;
  opState.f = NodeFlags.Text;
}

function _createElement(node: Element | undefined, op: OpNode<ElementData>): Element {
  const opType = op.t;
  const { n, a } = op.d;
  const svg = (opType.f & NodeFlags.Svg) !== 0;
  if (node === void 0) {
    const tagName = opType.d as string;
    node = svg ?
      doc.createElementNS(SVG_NAMESPACE, tagName) :
      doc.createElement(tagName);
  }

  if (n) {
    _updateClassName(node, n, svg);
  }

  if (a !== void 0) {
    _updateAttrs(node, void 0, a, svg);
  }

  return node;
}

function _mountObject(
  parentElement: Element,
  opState: OpState,
  op: OpNode,
): void {
  const { t, d } = op;
  const flags = t.f;
  let deepStateFlags;
  let prevState;
  let value;

  if ((flags & NodeFlags.Component) !== 0) {
    deepStateFlags = _pushDeepState();
    if ((flags & NodeFlags.Stateful) !== 0) {
      opState.s = prevState = { r: null, s: null, u: null } as ComponentHooks;
      // Reusing value variable.
      (prevState as ComponentHooks).r = value = (op.t.d as ComponentDescriptor).c(opState);
    } else {
      value = (op.t.d as StatelessComponentDescriptor).c;
    }
    opState.c = _mount(parentElement, value(d));
    opState.f = (opState.f & NodeFlags.SelfFlags) | flags | _deepStateFlags;
    _deepStateFlags |= deepStateFlags | ((opState.f & NodeFlags.DeepStateFlags) << NodeFlags.DeepStateShift);
  } else {
    deepStateFlags = _pushDeepState();
    if ((flags & NodeFlags.Element) !== 0) {
      const descriptor = t.d;
      let node: Element | undefined;
      if ((flags & NodeFlags.ElementProto) !== 0) {
        node = (descriptor as ElementProtoDescriptor).n as Element;
        if (node === null) {
          (descriptor as ElementProtoDescriptor).n = node = _createElement(
            void 0,
            (descriptor as ElementProtoDescriptor).p,
          );
        }
        node = nodeCloneNode!.call(node, false) as Element;
      }
      opState.s = node = _createElement(node, op);

      prevState = _nextNode;
      _nextNode = null;
      value = d.c;
      if (value !== null) {
        opState.c = _mount(node, value);
      }
      nodeInsertBefore!.call(parentElement, node, prevState);
      _nextNode = node;
    } else if ((flags & (NodeFlags.Events | NodeFlags.Context)) !== 0) {
      if ((flags & NodeFlags.Context) !== 0) {
        prevState = setContext(
          opState.s = assignContext((d as ContextData).v),
        );
        opState.c = _mount(parentElement, (d as ContextData).c);
        restoreContext(prevState);
      } else {
        opState.c = _mount(parentElement, (d as EventsData).c);
      }
    } else { // ((opFlags & NodeFlags.TrackByKey) !== 0)
      let i = (d as Key<any, OpNode>[]).length;
      opState.c = value = Array(i);
      while (i > 0) {
        value[--i] = _mount(parentElement, (d as Key<any, OpNode>[])[i].v);
      }
    }
    opState.f = _popDeepState(deepStateFlags, flags);
  }
}

function _mountFragment(
  parentElement: Element,
  opState: OpState,
  childrenOps: OpArray,
): void {
  let i = childrenOps.length;
  const newChildren = Array(i);
  const deepStateFlags = _pushDeepState();
  while (i > 0) {
    newChildren[--i] = _mount(parentElement, childrenOps[i]);
  }
  opState.c = newChildren;
  opState.f = _popDeepState(deepStateFlags, NodeFlags.Fragment);
}

export function _mount(
  parentElement: Element,
  op: Op,
): OpState | null {
  if (op !== null) {
    const stateNode = createStateNode(op);
    if (typeof op === "object") {
      if (op instanceof Array) {
        _mountFragment(parentElement, stateNode, op);
      } else {
        _mountObject(parentElement, stateNode, op);
      }
    } else {
      _mountText(parentElement, stateNode, op);
    }
    return stateNode;
  }
  return null;
}

function _hasDifferentType(
  a: OpNode | OpArray,
  b: OpNode | OpArray | string | number,
): boolean {
  if (typeof b !== "object") {
    return true;
  }
  if (a instanceof Array) {
    return !(b instanceof Array);
  }
  return (b instanceof Array || a.t !== b.t);
}

/**
 * _update updates a stateNode with a next operation.
 *
 * @param parentElement Parent DOM Element.
 * @param opState Operation state.
 * @param nextOp Next operation.
 * @param moveNode DOM Element should be moved.
 * @param singleChild Parent DOM Element contains a single child.
 * @returns OpNode state.
 */
export function _update(
  parentElement: Element,
  opState: OpState | null,
  nextOp: Op,
  moveNode: boolean,
  singleChild: boolean,
): OpState | null {
  if (nextOp === null) {
    if (opState !== null) {
      _unmount(parentElement, opState, singleChild);
    }
    return null;
  }
  if (opState === null) {
    return _mount(parentElement, nextOp);
  }
  const { o, s } = opState;
  let flags = opState.f;

  if ((flags & NodeFlags.Text) !== 0) {
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
      _dirtyCheck(parentElement, opState, moveNode, singleChild);
      return opState;
    }
    if (_hasDifferentType(o as OpNode | OpArray, nextOp) === true) {
      _unmount(parentElement, opState, singleChild);
      return _mount(parentElement, nextOp);
    }
    opState.o = nextOp;
    const opStateChildren = opState.c;
    let deepStateFlags;
    let prevData;
    let nextData;
    let nextValue;

    if ((flags & NodeFlags.Component) !== 0) {
      prevData = (o as OpNode).d;
      nextData = (nextOp as OpNode).d;
      const descriptor = ((nextOp as OpNode).t.d as StatelessComponentDescriptor | ComponentDescriptor);
      if (
        ((flags & NodeFlags.Dirty) !== 0) ||
        (
          (prevData !== nextData) &&
          (descriptor.e === void 0 || descriptor.e(prevData, nextData) === true)
        )
      ) {
        deepStateFlags = _pushDeepState();
        opState.c = _update(
          parentElement,
          opStateChildren as OpState,
          ((flags & NodeFlags.Stateful) !== 0) ?
            (opState.s as ComponentHooks).r!(nextData) :
            (descriptor as StatelessComponentDescriptor).c(nextData),
          moveNode,
          singleChild,
        );
        // opState.f can be changed after `_update()`.
        flags = opState.f;
        opState.f = (flags & NodeFlags.SelfFlags) | _deepStateFlags;
        _deepStateFlags |= deepStateFlags | ((flags & NodeFlags.DeepStateFlags) << NodeFlags.DeepStateShift);
      } else {
        _dirtyCheck(parentElement, opState, moveNode, singleChild);
      }
    } else {
      deepStateFlags = _pushDeepState();
      if ((flags & NodeFlags.Element) !== 0) {
        const svg = (flags & NodeFlags.Svg) !== 0;
        prevData = (o as OpNode<ElementData>).d;
        nextData = (nextOp as OpNode<ElementData>).d;
        if (moveNode === true) {
          nodeInsertBefore!.call(parentElement, s, _nextNode);
        }

        nextValue = nextData.n;
        if (prevData.n !== nextValue) {
          if (nextValue === void 0) {
            nextValue = "";
          }
          _updateClassName(s, nextValue, svg);
        }

        nextValue = nextData.a;
        if (prevData.a !== nextValue) {
          _updateAttrs(s as Element, prevData.a, nextValue, svg);
        }

        _nextNode = null;
        opState.c = _update(s as Element, opStateChildren as OpState, nextData.c, false, true);

        _nextNode = s as Node;
      } else if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
        if ((flags & NodeFlags.Fragment) !== 0) {
          let i = (nextOp as OpArray).length;
          // When there is a different length for statically positioned elements, it is much more likely that internal
          // elements should have a different internal state, so it is better to destroy previous state and instantiate
          // a new one. This heuristics is slightly different from React, but it should be better at handling some
          // use cases.
          if ((opStateChildren as Array<OpState | null>).length === i) {
            while (i > 0) {
              (opStateChildren as Array<OpState | null>)[--i] =
                _update(
                  parentElement,
                  (opStateChildren as Array<OpState | null>)[i],
                  (nextOp as OpArray)[i],
                  moveNode,
                  false);
            }
          } else {
            _unmount(parentElement, opState, singleChild);
            _mountFragment(parentElement, opState, nextOp as OpArray);
          }
        } else {
          _updateChildrenTrackByKeys(
            parentElement,
            opState,
            (o as OpNode).d,
            (nextOp as OpNode).d,
            moveNode,
            singleChild,
          );
        }
      } else if ((flags & NodeFlags.Events) !== 0) {
        opState.c = _update(
          parentElement,
          opStateChildren as OpState,
          (nextOp as OpNode<EventsData>).d.c,
          moveNode,
          singleChild,
        );
      } else { // if ((stateFlags & NodeFlags.Context) !== 0) {
        const dirtyContext = _dirtyContext;
        nextData = (nextOp as OpNode<ContextData>).d;
        nextValue = nextData.v;
        if ((o as OpNode<ContextData>).d.v !== nextValue || _dirtyContext === true) {
          opState.s = assignContext(nextValue);
          _dirtyContext = true;
        }
        // reusing variable name, it is actually a previous value in the context stack.
        nextValue = setContext(opState.s as {});
        opState.c = _update(parentElement, opStateChildren as OpState, nextData.c, moveNode, singleChild);
        restoreContext(nextValue);
        _dirtyContext = dirtyContext;
      }
      opState.f = _popDeepState(deepStateFlags, opState.f);
    }
  }

  return opState;
}

/**
 * Update children list with track by key algorithm.
 *
 * High-level overview of the algorithm that is implemented in this function (slightly outdated, but the key ideas are
 * the same).
 *
 * This algorithm finds a minimum[1] number of DOM operations. It works in several steps:
 *
 * 1. Find common suffix and prefix.
 *
 * This optimization technique is searching for nodes with identical keys by simultaneously iterating over nodes in the
 * old children list `A` and new children list `B` from both sides:
 *
 *  A: -> [a b c d] <-
 *  B: -> [a b d] <-
 *
 * Here we can skip nodes "a" and "b" at the begininng, and node "d" at the end.
 *
 *  A: -> [c] <-
 *  B: -> [] <-
 *
 * Here it will check if the size of one of the list is equal to zero. When length of the old children list is zero,
 * it will insert all remaining nodes from the new list, and when length of the new children list is zero, it will
 * remove all remaining nodes from the old list.
 *
 * When algorithm can't find a solution with this simple optimization technique, it will go to the next step of the
 * algorithm. For example:
 *
 *  A: -> [a b c d e f g] <-
 *  B: -> [a c b h f e g] <-
 *
 * Nodes "a" and "g" at the edges are the same, skipping them.
 *
 *  A: -> [b c d e f] <-
 *  B: -> [c b h f e] <-
 *
 * Here we are stuck, so we need to switch to the next step.
 *
 * 2. Look for removed and inserted nodes, and simultaneously check if one of the nodes is moved.
 *
 * First we create an array `P` with the length of the new children list and assign to each position value `-1`, it has
 * a meaning of a new node that should be inserted. Later we will assign node positions in the old children list to this
 * array.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [. . . . .] // . == -1
 *
 * Then we need to build an index `I` that maps keys with node positions of the remaining nodes from the new children
 * list.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [. . . . .] // . == -1
 *  I: {
 *    c: 0,
 *    b: 1,
 *    h: 2,
 *    f: 3,
 *    e: 4,
 *  }
 *  last = 0
 *
 * With this index, we start to iterate over the remaining nodes from the old children list and check if we can find a
 * node with the same key in the index. If we can't find any node, it means that it should be removed, otherwise we
 * assign position of the node in the old children list to the positions array.
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
 * When we assigning positions to the positions array, we also keep a position of the last seen node in the new children
 * list, if the last seen position is larger than current position of the node at the new list, then we are switching
 * `moved` flag to `true`.
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
 * The last position `1` is larger than current position of the node at the new list `0`, switching `moved` flag to
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
 * Node with key "d" doesn't exist in the index, removing node.
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
 * Assign position for `e`.
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
 * Assign position for 'f'.
 *
 * At this point we are checking if `moved` flag is on, or if the length of the old children list minus the number of
 * removed nodes isn't equal to the length of the new children list. If any of this conditions is true, then we are
 * going to the next step.
 *
 * 3. Find minimum number of moves if `moved` flag is on, or insert new nodes if the length is changed.
 *
 * When `moved` flag is on, we need to find the
 * [longest increasing subsequence](http://en.wikipedia.org/wiki/Longest_increasing_subsequence) in the positions array,
 * and move all nodes that doesn't belong to this subsequence.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *  moved = true
 *
 * Now we just need to simultaneously iterate over the new children list and LIS from the end and check if the current
 * position is equal to a value from LIS.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *              ^  // new_pos == 4
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *              ^  // new_pos == 4
 *  moved = true
 *
 * Node "e" stays at the same place.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *            ^    // new_pos == 3
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *            ^    // new_pos != 1
 *  moved = true
 *
 * Node "f" is moved, move it before the next node "e".
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *          ^      // new_pos == 2
 *  P: [1 0 . 4 3] // . == -1
 *          ^      // old_pos == -1
 *  LIS:     [1 4]
 *            ^
 *  moved = true
 *
 * Node "h" has a `-1` value in the positions array, insert new node "h".
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *        ^        // new_pos == 1
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *            ^    // new_pos == 1
 *  moved = true
 *
 * Node "b" stays at the same place.
 *
 *  A: [b c d e f]
 *  B: [c b h f e]
 *      ^          // new_pos == 0
 *  P: [1 0 . 4 3] // . == -1
 *  LIS:     [1 4]
 *          ^      // new_pos != undefined
 *  moved = true
 *
 * Node "c" is moved, move it before the next node "b".
 *
 * When moved flag is off, we don't need to find LIS, and we just iterate over the new children list and check its
 * current position in the positions array, if it is `-1`, then we insert new node.
 *
 * [1] Actually it is almost minimum number of dom ops, when node is removed and another one is inserted at the same
 * place, instead of insert and remove dom ops, we can use one replace op. It will make everything even more
 * complicated, and other use cases will be slower, so I don't think that it is worth to use replace here.
 *
 * @param parentElement Parent DOM element.
 * @param opState OpNode state for a TrackByKey operation.
 * @param a Previous operations.
 * @param b Next operations.
 * @param moveNode Children DOM nodes should be moved.
 * @param singleChild Parent DOM element contains a single node.
 * @noinline
 */
function _updateChildrenTrackByKeys(
  parentElement: Element,
  opState: OpState,
  a: Key<any, OpNode>[],
  b: Key<any, OpNode>[],
  moveNode: boolean,
  singleChild: boolean,
): void {
  let i = b.length;
  let j: number | undefined = a.length;
  const result = Array(i);

  if (i === 0) { // New children list is empty.
    if (j > 0) { // Unmount nodes from the old children list.
      _unmount(parentElement, opState, singleChild);
    }
  } else if (j === 0) { // Old children list is empty.
    while (i > 0) { // Mount nodes from the new children list.
      result[--i] = _mount(parentElement, b[i].v);
    }
  } else {
    const opStateChildren = opState.c as Array<OpState | null>;
    let aEnd = j - 1; // a.length - 1
    let bEnd = i - 1; // b.length - 1
    let start = 0;
    let node: OpNode | Key<any, OpNode> | OpState | null = b[bEnd];

    // Step 1
    outer: while (true) {
      // Update nodes with the same key at the end.
      while (a[aEnd].k === node.k) {
        result[bEnd] = _update(parentElement, opStateChildren[aEnd--], node.v, moveNode, false);
        if (start > --bEnd || start > aEnd) {
          break outer;
        }
        node = b[bEnd];
      }

      // Update nodes with the same key at the beginning.
      while (a[start].k === b[start].k) {
        // delayed update (all updates should be performed from right-to-left).
        if (++start > aEnd || start > bEnd) {
          break outer;
        }
      }

      break;
    }

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
          _unmount(parentElement, node, false);
        }
      } while (i <= aEnd);
    } else { // Step 2
      // When `pos === 99999999`, it means that one of the nodes is in the wrong position and we should rearrange nodes
      // with lis-based algorithm.
      let pos = 0;
      // Number of updated nodes after prefix/suffix phase. It is used for an optimization that removes all child nodes
      // with `textContent=""` when there are no updated nodes.
      let updated = 0;

      const aLength = aEnd - start + 1;
      const bLength = bEnd - start + 1;
      const sources = Array(bLength); // Maps positions in the new children list to positions in the old children list.
      const keyIndex = new Map<any, number>(); // Maps keys to their positions in the new children list.
      for (i = 0; i < bLength; ++i) {
        j = i + start;
        sources[i] = -1; // Special value `-1` indicates that node doesn't exist in the old children list.
        keyIndex.set(b[j].k, j);
      }

      for (i = start; i <= aEnd && updated < bLength; ++i) {
        j = keyIndex.get(a[i].k);
        if (j !== void 0) {
          pos = (pos < j) ? j : 99999999;
          ++updated;
          sources[j - start] = i;
          result[j] = opStateChildren[i];
          // remove updated nodes from previous array, so that we could remove the rest from the document.
          opStateChildren[i] = null;
        }
      }

      if (aLength === a.length && updated === 0) {
        // Zero updated nodes in step 1 and 2, remove all nodes and insert new ones.
        _unmount(parentElement, opState, singleChild);
        while (bEnd >= 0) {
          result[bEnd] = _mount(parentElement, b[bEnd--].v);
        }
      } else {
        // Step 3
        // Remove nodes that weren't updated in the old children list.
        for (i = start; i <= aEnd; i++) {
          if ((node = opStateChildren[i]) !== null) {
            _unmount(parentElement, node, false);
          }
        }

        i = bLength;
        if (moveNode === true || pos !== 99999999) {
          while (i > 0) {
            pos = --i + start;
            node = b[pos].v;
            result[pos] = (sources[i] === -1) ?
              _mount(parentElement, node) :
              _update(parentElement, result[pos], node, moveNode, false);
          }
        } else {
          const seq = lis(sources);
          j = seq.length - 1;
          while (i > 0) {
            pos = --i + start;
            node = b[pos].v;
            if (sources[i] === -1) {
              result[pos] = _mount(parentElement, node);
            } else {
              if (j < 0 || i !== seq[j]) {
                moveNode = true;
              } else {
                --j;
              }
              result[pos] = _update(parentElement, result[pos], node, moveNode, false);
              moveNode = false;
            }
          }
        }
      }
    }

    // update nodes from Step 1 (prefix only)
    while (start > 0) {
      result[--start] = _update(parentElement, opStateChildren[start], b[start].v, moveNode, false);
    }
  }
  opState.c = result;
}

/**
 * Slightly modified Longest Increased Subsequence algorithm, it ignores items that have -1 value, they're representing
 * new items.
 *
 * {@link http://en.wikipedia.org/wiki/Longest_increasing_subsequence}
 *
 * It is possible to use typed arrays in this function, and it will make it faster in most javascript engines, but for
 * some reason instantiating small typed arrays is slower in synthetic microbenchmarks on V8
 * {@link https://gist.github.com/localvoid/88da772d987794605f7fa4a078bce4d6} (maybe there is something wrong in this
 * benchmarks, if someone want to spend more time on optimizations, I'd recommend to double check everything).
 *
 * To solve problem with instantiation, we could just reuse arrays, but in my opinion it isn't worth to overcomplicate
 * this algorithm since it is already extremely fast and it is highly unlikely that it will be even noticeable in the
 * profiler. Usually when there is an update in the real applications, it triggers reordering of one dynamic children
 * list, that is why I prefer to keep it simple.
 *
 * @param a - Array of numbers
 * @returns Longest increasing subsequence
 * @noinline
 */
function lis(a: number[]): number[] {
  const p = a.slice();
  // result is instantiated as an empty array to prevent instantiation with CoW backing store.
  const result: number[] = [];
  let n = 0;
  let i = 0;
  let u: number;
  let v: number;
  let j: number;

  result[0] = 0;
  for (; i < a.length; ++i) {
    const k = a[i];
    if (k > -1) {
      j = result[n];
      if (a[j] < k) {
        p[i] = j;
        result[++n] = i;
      } else {
        u = 0;
        v = n;

        while (u < v) {
          j = (u + v) >> 1;
          if (a[result[j]] < k) {
            u = j + 1;
          } else {
            v = j;
          }
        }

        if (k < a[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
  }

  v = result[n];

  while (n >= 0) {
    result[n--] = v;
    v = p[v];
  }

  return result;
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
 */
function _updateStyle(
  element: HTMLElement | SVGElement,
  a: CSSStyleProps | undefined,
  b: CSSStyleProps | undefined,
  svg: boolean,
): void {
  const style = svg === true ? svgElementGetStyle!.call(element) : htmlElementGetStyle!.call(element);
  let key: string;
  let bValue;

  if (a === void 0) {
    // a is empty, insert all styles from b.
    for (key in b!) {
      bValue = (b as { [key: string]: string })[key];
      if (bValue !== void 0) {
        style.setProperty(key, bValue);
      }
    }
  } else if (b === void 0) {
    // b is empty, remove all styles from a
    for (key in a) {
      if ((a as { [key: string]: string })[key] !== void 0) {
        style.removeProperty(key);
      }
    }
  } else {
    let matchCount = 0;
    let i = 0;
    for (key in a) {
      const aValue = a[key];
      bValue = (objectHasOwnProperty.call(b, key) === true) ? (matchCount++ , b[key]) : void 0;
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
 */
function _updateAttrs(
  element: Element,
  a: { [key: string]: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined } | undefined,
  b: { [key: string]: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined } | undefined,
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
        (objectHasOwnProperty.call(b, key) === true) ? (matchCount++ , b[key]) : void 0,
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
 */
function _updateAttr(
  element: Element,
  key: string,
  prev: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined,
  next: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined,
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
      if (typeof next === "boolean") {
        next = next ? "" : void 0;
      }
      if (next === void 0) {
        if (prev !== void 0 && prev !== false) {
          elementRemoveAttribute!.call(element, key);
        }
      } else {
        elementSetAttribute!.call(element, key, next as string);
      }
    }
  } else if (prev !== next) {
    _updateStyle(element as HTMLElement, prev as CSSStyleProps, next as CSSStyleProps, svg);
  }
}

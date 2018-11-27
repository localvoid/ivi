import {
  objectHasOwnProperty, nodeInsertBefore, nodeRemoveChild, elementSetAttribute, nodeCloneNode, elementRemoveAttribute,
} from "../core/shortcuts";
import { SVG_NAMESPACE } from "../dom/namespaces";
import { CSSStyleProps } from "../dom/style";
import { NodeFlags } from "./node_flags";
import { AttributeDirective } from "./attribute_directive";
import {
  OpNode, ElementData, RecursiveOpChildrenArray, Key, OpData, ContextData, OpChildren,
} from "./operations";
import { StateNode, createStateNode, getDOMNode } from "./state";
import { ElementProtoDescriptor } from "./element_proto";
import { ComponentDescriptor, ComponentHooks, StatelessComponentDescriptor } from "./component";
import { getContext, setContext, restoreContext } from "./context";

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

export function _dirtyCheck(
  parentElement: Element,
  stateNode: StateNode,
  moveNode: boolean,
  singleChild: boolean,
): void {
  const { flags, children } = stateNode;
  let domNode;
  let deepState;
  let i;

  if ((flags & NodeFlags.Component) !== 0) {
    const hooks = stateNode.state as ComponentHooks;
    deepState = _pushDeepState();
    if (
      ((flags & NodeFlags.Stateful) !== 0) && (
        ((flags & NodeFlags.Dirty) !== 0) ||
        (hooks.dirtyCheck !== null && hooks.dirtyCheck(getContext()) === true)
      )
    ) {
      stateNode.children = _update(
        parentElement,
        children as StateNode,
        hooks.update!((stateNode.op as OpNode).data),
        moveNode,
        singleChild,
      );
    } else if ((flags & NodeFlags.DeepStateDirtyCheck) !== 0) {
      _dirtyCheck(parentElement, children as StateNode, moveNode, singleChild);
    } else {
      if (moveNode) {
        _moveNodes(parentElement, stateNode);
      } else {
        _nextNode = getDOMNode(stateNode);
      }
    }
    stateNode.flags = (stateNode.flags & NodeFlags.SelfFlags) | _deepStateFlags;
    _deepStateFlags |= deepState | ((stateNode.flags & NodeFlags.DeepStateFlags) << NodeFlags.DeepStateShift);
  } else if ((flags & NodeFlags.DeepStateDirtyCheck) !== 0) {
    deepState = _pushDeepState();
    if ((flags & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
      domNode = stateNode.state as Node;
      if (moveNode === true) {
        /* istanbul ignore else */
        if (DEBUG) {
          parentElement.insertBefore(domNode, _nextNode);
        } else {
          nodeInsertBefore.call(parentElement, domNode, _nextNode);
        }
      }
      if (children !== null) {
        _dirtyCheck(domNode as Element, children as StateNode, false, true);
      }
      _nextNode = domNode;
    } else if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      i = (children as Array<StateNode>).length;
      while (--i >= 0) {
        _dirtyCheck(parentElement, (children as Array<StateNode>)[i], moveNode, false);
      }
    } else if ((flags & (NodeFlags.Events | NodeFlags.Ref)) !== 0) {
      _dirtyCheck(parentElement, stateNode.children as StateNode, moveNode, singleChild);
    } else {
      if (_dirtyContext === true) {
        stateNode.state = { ...getContext(), ...(stateNode.op as OpNode<ContextData>).data.data };
      }
      const prevContext = setContext(stateNode.state as {});
      _dirtyCheck(parentElement, stateNode.children as StateNode, moveNode, singleChild);
      restoreContext(prevContext);
    }
    stateNode.flags = _popDeepState(deepState, stateNode.flags);
  } else {
    if (moveNode) {
      _moveNodes(parentElement, stateNode);
    } else {
      _nextNode = getDOMNode(stateNode);
    }
  }
}

function _moveNodes(parentElement: Element, stateNode: StateNode) {
  const flags = stateNode.flags;
  if ((flags & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
    const domNode = stateNode.state as Node;
    /* istanbul ignore else */
    if (DEBUG) {
      parentElement.insertBefore(domNode, _nextNode);
    } else {
      nodeInsertBefore.call(parentElement, domNode, _nextNode);
    }
    _nextNode = domNode;
  } else {
    const children = stateNode.children;
    if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
      let i = (children as Array<StateNode | null>).length;
      while (--i >= 0) {
        const c = (children as Array<StateNode | null>)[i];
        if (c !== null) {
          _moveNodes(parentElement, c);
        }
      }
    } else if (children !== null) {
      _moveNodes(parentElement, children as StateNode);
    }
  }
}

function _unmountWalk(stateNode: StateNode): void {
  const flags = stateNode.flags;
  let i;

  if ((flags & NodeFlags.DeepStateUnmount) !== 0) {
    const children = stateNode.children;
    if (children !== null) {
      if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
        for (i = 0; i < (children as Array<StateNode | null>).length; i++) {
          const c = (children as Array<StateNode | null>)[i];
          if (typeof c === "object" && c !== null) {
            _unmountWalk(c);
          }
        }
      } else {
        _unmountWalk(children as StateNode);
      }
    }
  }

  if ((flags & NodeFlags.Unmount) !== 0) {
    const hooks = (stateNode.state as ComponentHooks);
    const unmountHooks = hooks.unmount;
    if (unmountHooks !== null) {
      if (typeof unmountHooks === "function") {
        unmountHooks();
      } else {
        for (i = 0; i < unmountHooks.length; i++) {
          unmountHooks[i](true);
        }
      }
    }
  }
}

function _unmountRemove(parentElement: Element, stateNode: StateNode, singleChild: boolean): void {
  const flags = stateNode.flags;

  if ((flags & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
    const domNode = stateNode.state as Node;
    if (DEBUG) {
      parentElement.removeChild(domNode);
    } else {
      nodeRemoveChild.call(parentElement, domNode);
    }
  } else if ((flags & (NodeFlags.TrackByKey | NodeFlags.Fragment)) !== 0) {
    if (singleChild === true) {
      parentElement.textContent = "";
    } else {
      const children = stateNode.children as Array<StateNode | null>;
      for (let i = 0; i < children.length; ++i) {
        const c = children[i];
        if (c !== null) {
          _unmountRemove(parentElement, c, false);
        }
      }
    }
  } else {
    const children = stateNode.children as StateNode | null;
    if (children !== null) {
      _unmountRemove(parentElement, children, singleChild);
    }
  }
}

export function _unmount(parentElement: Element, stateNode: StateNode, singleChild: boolean): void {
  _unmountRemove(parentElement, stateNode, singleChild);
  _unmountWalk(stateNode);
}

function _mountText(
  parentElement: Element,
  stateNode: StateNode,
  op: string | number,
) {
  const node = document.createTextNode(op as string);
  /* istanbul ignore else */
  if (DEBUG) {
    parentElement.insertBefore(node, _nextNode);
  } else {
    nodeInsertBefore.call(parentElement, node, _nextNode);
  }
  _nextNode = node;
  stateNode.state = node;
  stateNode.flags = NodeFlags.Text;
}

function _createElement(node: Element | undefined, op: OpNode<ElementData>): Element {
  const opType = op.type;
  const svg = (opType.flags & NodeFlags.Svg) !== 0;
  if (node === void 0) {
    const tagName = opType.descriptor as string;
    node = svg ?
      document.createElementNS(SVG_NAMESPACE, tagName) :
      document.createElement(tagName);
  }

  const { className, attrs } = op.data;
  if (className) {
    /**
     * SVGElement.className returns `SVGAnimatedString`
     */
    if (svg) {
      /* istanbul ignore else */
      if (DEBUG) {
        (node as SVGElement).setAttribute("class", className);
      } else {
        elementSetAttribute.call(node, "class", className);
      }
    } else {
      (node as HTMLElement).className = className;
    }
  }

  if (attrs !== void 0) {
    _updateAttrs(node, void 0, attrs);
  }

  return node;
}

function _mountObject(
  parentElement: Element,
  stateNode: StateNode,
  op: OpNode,
): void {
  const opType = op.type;
  const opData = op.data;
  const opFlags = opType.flags;
  let deepStateFlags;

  if ((opFlags & NodeFlags.Component) !== 0) {
    deepStateFlags = _pushDeepState();
    let update;
    if ((opFlags & NodeFlags.Stateful) !== 0) {
      const hooks: ComponentHooks = stateNode.state = { update: null, dirtyCheck: null, unmount: null };
      update = hooks.update = (op.type.descriptor as ComponentDescriptor).c(stateNode);
    } else {
      update = (op.type.descriptor as StatelessComponentDescriptor).c;
    }
    const root = update(opData);
    stateNode.children = _mount(parentElement, root);
    stateNode.flags = (stateNode.flags & NodeFlags.SelfFlags) | opFlags | _deepStateFlags;
    _deepStateFlags |= deepStateFlags | ((stateNode.flags & NodeFlags.DeepStateFlags) << NodeFlags.DeepStateShift);
  } else {
    deepStateFlags = _pushDeepState();
    if ((opFlags & NodeFlags.Element) !== 0) {
      let node: Element | undefined;
      const descriptor = opType.descriptor;
      if ((opFlags & NodeFlags.ElementProto) !== 0) {
        node = (descriptor as ElementProtoDescriptor).node as Element;
        if (node === null) {
          (descriptor as ElementProtoDescriptor).node = node = _createElement(
            void 0,
            (descriptor as ElementProtoDescriptor).proto,
          );
        }
        /* istanbul ignore else */
        if (DEBUG) {
          node = node.cloneNode(false) as Element;
        } else {
          node = nodeCloneNode.call(node, false) as Element;
        }
      }
      stateNode.state = node = _createElement(node, op);

      const children = opData.children;
      const nextNode = _nextNode;
      _nextNode = null;
      if (children !== null) {
        stateNode.children = _mount(node, children);
      }
      /* istanbul ignore else */
      if (DEBUG) {
        parentElement.insertBefore(node, nextNode);
      } else {
        nodeInsertBefore.call(parentElement, node, nextNode);
      }
      _nextNode = node;
    } else if ((opFlags & (NodeFlags.Events | NodeFlags.Ref | NodeFlags.Context)) !== 0) {
      if ((opFlags & NodeFlags.Context) !== 0) {
        const prevContext = setContext(
          stateNode.state = { ...getContext(), ...(opData as OpData<ContextData>).data },
        );
        stateNode.children = _mount(parentElement, (opData as OpData<ContextData>).children);
        restoreContext(prevContext);
      } else {
        if ((opFlags & NodeFlags.Ref) !== 0) {
          opData.data.v = stateNode;
        }
        stateNode.children = _mount(parentElement, (opData as OpData<ContextData>).children);
      }
    } else { // ((opFlags & NodeFlags.TrackByKey) !== 0)
      let i = (opData as Key<any, OpNode>[]).length;
      const result = Array(i);
      stateNode.children = result;
      while (--i >= 0) {
        result[i] = _mount(parentElement, (opData as Key<any, OpNode>[])[i].v);
      }
    }
    stateNode.flags = _popDeepState(deepStateFlags, stateNode.flags | opFlags);
  }
}

function _mountFragment(
  parentElement: Element,
  stateNode: StateNode,
  childrenOps: RecursiveOpChildrenArray,
): void {
  const deepStateFlags = _pushDeepState();
  let i = childrenOps.length;
  const newChildren = Array(i);
  while (--i >= 0) {
    newChildren[i] = _mount(parentElement, childrenOps[i]);
  }
  stateNode.children = newChildren;
  stateNode.flags = _popDeepState(deepStateFlags, NodeFlags.Fragment);
}

export function _mount(
  parentElement: Element,
  op: OpChildren,
): StateNode | null {
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

function _hasDifferentTypes(a: OpNode | RecursiveOpChildrenArray, b: OpChildren): boolean {
  if (typeof b !== "object") {
    return true;
  } else if (a instanceof Array) {
    if (!(b instanceof Array)) {
      return true;
    }
  } else if (b instanceof Array || a.type !== b!.type) {
    return true;
  }
  return false;
}

/**
 * _update updates a stateNode with a next operation.
 *
 * @param parentElement - Parent DOM Element
 * @param stateNode - State Node
 * @param nextOp - Next Operation
 * @returns State Node
 */
export function _update(
  parentElement: Element,
  stateNode: StateNode | null,
  nextOp: OpChildren,
  moveNode: boolean,
  singleChild: boolean,
): StateNode | null {
  if (nextOp === null) {
    if (stateNode !== null) {
      _unmount(parentElement, stateNode, singleChild);
    }
    return null;
  }
  if (stateNode === null) {
    return _mount(parentElement, nextOp);
  }
  const prevOp = stateNode.op;
  const stateFlags = stateNode.flags;
  const state = stateNode.state;

  if ((stateFlags & NodeFlags.Text) !== 0) {
    if (typeof nextOp !== "object") {
      stateNode.op = nextOp;
      if (prevOp !== nextOp) {
        (state as Node).nodeValue = nextOp as string;
      }
      if (moveNode === true) {
        /* istanbul ignore else */
        if (DEBUG) {
          parentElement.insertBefore(state as Node, _nextNode);
        } else {
          nodeInsertBefore.call(parentElement, state as Node, _nextNode);
        }
      }
      _nextNode = state as Node;
    } else {
      /* istanbul ignore else */
      if (DEBUG) {
        parentElement.removeChild(state as Node);
      } else {
        nodeRemoveChild.call(parentElement, state as Node);
      }
      return _mount(parentElement, nextOp);
    }
  } else {
    if (prevOp === nextOp) {
      _dirtyCheck(parentElement, stateNode, moveNode, singleChild);
      return stateNode;
    }
    if (_hasDifferentTypes(
      prevOp as OpNode | RecursiveOpChildrenArray,
      nextOp as OpNode | RecursiveOpChildrenArray,
    ) === true) {
      // prevOp can't be === null (stateNode === null)
      _unmount(parentElement, stateNode, singleChild);
      return _mount(parentElement, nextOp);
    }
    stateNode.op = nextOp;
    const stateChildren = stateNode.children;
    let deepStateFlags;
    let prevData;
    let nextData;
    if ((stateFlags & NodeFlags.Component) !== 0) {
      prevData = (prevOp as OpNode).data;
      nextData = (nextOp as OpNode).data;
      const descriptor = ((nextOp as OpNode).type.descriptor as StatelessComponentDescriptor | ComponentDescriptor);
      if (
        ((stateFlags & NodeFlags.Dirty) !== 0) ||
        (
          (prevData !== nextData) &&
          (descriptor.shouldUpdate === void 0 || descriptor.shouldUpdate(prevData, nextData) === true)
        )
      ) {
        deepStateFlags = _pushDeepState();
        const root = ((stateFlags & NodeFlags.Stateful) !== 0) ?
          (stateNode.state as ComponentHooks).update!(nextData) :
          (descriptor as StatelessComponentDescriptor).c(nextData);
        stateNode.children = _update(
          parentElement,
          stateChildren as StateNode,
          root,
          moveNode,
          singleChild,
        );
        stateNode.flags = (stateNode.flags & NodeFlags.SelfFlags) | _deepStateFlags;
        _deepStateFlags |= deepStateFlags | ((stateNode.flags & NodeFlags.DeepStateFlags) << NodeFlags.DeepStateShift);
      } else {
        _dirtyCheck(parentElement, stateNode, moveNode, singleChild);
      }
    } else {
      deepStateFlags = _pushDeepState();
      if ((stateFlags & NodeFlags.Element) !== 0) {
        prevData = (prevOp as OpNode).data;
        nextData = (nextOp as OpNode).data;
        if (moveNode === true) {
          /* istanbul ignore else */
          if (DEBUG) {
            parentElement.insertBefore(state as Node, _nextNode);
          } else {
            nodeInsertBefore.call(parentElement, state, _nextNode);
          }
        }

        let nextClassName = nextData.className;
        if (prevData.className !== nextClassName) {
          if (nextClassName === void 0) {
            nextClassName = "";
          }
          if ((stateFlags & NodeFlags.Svg) !== 0) {
            /* istanbul ignore else */
            if (DEBUG) {
              (state as Element).setAttribute("class", nextClassName);
            } else {
              elementSetAttribute.call(state, "class", nextClassName);
            }
          } else {
            (state as Element).className = nextClassName;
          }
        }

        if (prevData.attrs !== nextData.attrs) {
          _updateAttrs(state as Element, prevData.attrs, nextData.attrs);
        }

        const nextChildren = nextData.children;
        if (prevData.children !== nextChildren) {
          _nextNode = null;
          stateNode.children = _update(state as Element, stateChildren as StateNode, nextChildren, false, true);
        }

        _nextNode = state as Node;
      } else if ((stateFlags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
        if ((stateFlags & NodeFlags.Fragment) !== 0) {
          let i = (nextOp as RecursiveOpChildrenArray).length;
          while (--i >= 0) {
            (stateChildren as Array<StateNode | null>)[i] =
              _update(
                parentElement,
                (stateChildren as Array<StateNode | null>)[i],
                (nextOp as RecursiveOpChildrenArray)[i],
                moveNode,
                false);
          }
        } else {
          _updateChildrenTrackByKeys(
            parentElement,
            stateNode,
            (prevOp as OpNode).data,
            (nextOp as OpNode).data,
            moveNode,
            singleChild,
          );
        }
      } else if ((stateFlags & (NodeFlags.Events | NodeFlags.Ref)) !== 0) {
        nextData = (nextOp as OpNode).data;
        stateNode.children = _update(
          parentElement,
          stateChildren as StateNode,
          nextData.children,
          moveNode,
          singleChild,
        );
      } else { // if ((stateFlags & NodeFlags.Context) !== 0) {
        prevData = (prevOp as OpNode).data;
        nextData = (nextOp as OpNode).data;
        const dirtyContext = _dirtyContext;
        if (prevData.data !== nextData.data || _dirtyContext === true) {
          stateNode.state = { ...getContext(), ...nextData.data };
          _dirtyContext = true;
        }
        const context = setContext(stateNode.state as {});
        _update(parentElement, stateChildren as StateNode, nextData.children, moveNode, singleChild);
        restoreContext(context);
        _dirtyContext = dirtyContext;
      }
      stateNode.flags = _popDeepState(deepStateFlags, stateNode.flags);
    }
  }

  return stateNode;
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
 * @param stateNode TrackByKey state.
 * @param a Previous operations.
 * @param b Next operations.
 */
function _updateChildrenTrackByKeys(
  parentElement: Element,
  stateNode: StateNode,
  a: Key<any, OpNode>[],
  b: Key<any, OpNode>[],
  moveNode: boolean,
  singleChild: boolean,
): void {
  const childrenState = stateNode.children as StateNode[];
  const result = Array(b.length);
  let i: number;

  if (b.length === 0) {
    if (childrenState.length > 0) {
      _unmount(parentElement, stateNode, singleChild);
    }
  } else if (childrenState.length === 0) {
    i = b.length;
    while (--i >= 0) {
      result[i] = _mount(parentElement, b[i].v);
    }
  } else {
    let aStartNode = a[0];
    let bStartNode = b[0];
    let aEnd = a.length - 1;
    let bEnd = b.length - 1;
    let aEndNode = a[aEnd];
    let bEndNode = b[bEnd];
    let start = 0;
    let j: number | undefined;
    let sNode: StateNode | null;

    // Step 1
    outer: while (true) {
      // Sync nodes with the same key at the end.
      while (aEndNode.k === bEndNode.k) {
        result[bEnd] = _update(parentElement, childrenState[aEnd--], bEndNode.v, moveNode, false);
        if (start > --bEnd || start > aEnd) {
          break outer;
        }
        aEndNode = a[aEnd];
        bEndNode = b[bEnd];
      }

      // Sync nodes with the same key at the beginning.
      while (aStartNode.k === bStartNode.k) {
        // delayed update (all updates should be performed from right-to-left)
        if (++start > aEnd || start > bEnd) {
          break outer;
        }
        aStartNode = a[start];
        bStartNode = b[start];
      }

      break;
    }

    if (start > aEnd) {
      // All nodes from a are synced, insert the rest from b.
      while (bEnd >= start) {
        result[bEnd] = _mount(parentElement, b[bEnd--].v);
      }
    } else if (start > bEnd) {
      // All nodes from b are synced, remove the rest from a.
      i = start;
      do {
        _unmount(parentElement, childrenState[i++], false);
      } while (i <= aEnd);
    } else { // Step 2
      const aLength = aEnd - start + 1;
      const bLength = bEnd - start + 1;
      const nullableState = childrenState as Array<StateNode | null>;

      // Mark all nodes as inserted.
      const sources = Array(bLength);
      for (i = 0; i < bLength; ++i) {
        sources[i] = -1;
      }

      // When pos === 1000000, it means that one of the nodes in the wrong position.
      let pos = 0;
      let updated = 0;

      const keyIndex = new Map<any, number>();
      // Build an index that maps keys to their locations in the new children list.
      for (j = start; j <= bEnd; ++j) {
        keyIndex.set(b[j].k, j);
      }

      for (i = start; i <= aEnd && updated < bLength; ++i) {
        j = keyIndex.get(a[i].k);
        if (j !== void 0) {
          pos = (pos > j) ? 1000000 : j;
          ++updated;
          sources[j - start] = i;
          result[j] = childrenState[i];
          nullableState[i] = null;
        }
      }

      if (aLength === a.length && updated === 0) {
        // Noone is synced.
        _unmount(parentElement, stateNode, singleChild);
        while (bEnd >= 0) {
          result[bEnd] = _mount(parentElement, b[bEnd--].v);
        }
      } else {
        // Step 3
        for (i = start; i <= aEnd; i++) {
          sNode = childrenState[i];
          if (sNode !== null) {
            _unmount(parentElement, sNode, false);
          }
        }

        let opNode;
        if (pos === 1000000) {
          if (moveNode === true) {
            while (--i >= 0) {
              pos = start + i;
              opNode = b[pos].v;
              result[pos] = (sources[i] === -1) ?
                _mount(parentElement, opNode) :
                _update(parentElement, result[pos], opNode, moveNode, false);
            }
          } else {
            const seq = lis(sources);
            j = seq.length - 1;
            i = bLength;
            while (--i >= 0) {
              pos = start + i;
              opNode = b[pos].v;
              if (sources[i] === -1) {
                result[pos] = _mount(parentElement, opNode);
              } else {
                sNode = result[pos];
                if (j < 0 || i !== seq[j]) {
                  moveNode = true;
                } else {
                  --j;
                }
                result[pos] = _update(parentElement, sNode, opNode, moveNode, false);
                moveNode = false;
              }
            }
          }
        } else {
          i = bLength;
          while (--i >= 0) {
            pos = start + i;
            opNode = b[pos].v;
            result[pos] = (sources[i] === -1) ?
              _mount(parentElement, opNode) :
              _update(parentElement, result[pos], opNode, moveNode, false);
          }
        }
      }
    }

    // update nodes from Step 1 (prefix only)
    while (--start >= 0) {
      result[start] = _update(parentElement, childrenState[start], b[start].v, moveNode, false);
    }
  }
  stateNode.children = result;
}

/**
 * Slightly modified Longest Increased Subsequence algorithm, it ignores items that have -1 value, they're representing
 * new items.
 *
 * {@link http://en.wikipedia.org/wiki/Longest_increasing_subsequence}
 *
 * @param a - Array of numbers
 * @returns Longest increasing subsequence
 * @noinline
 */
function lis(a: number[]): number[] {
  const p = a.slice();
  const result: number[] = [];
  result[0] = 0;
  let n = 0;
  let u: number;
  let v: number;
  let j: number;

  for (let i = 0; i < a.length; ++i) {
    const k = a[i];
    if (k === -1) {
      continue;
    }

    j = result[n];
    if (a[j] < k) {
      p[i] = j;
      result[++n] = i;
      continue;
    }

    u = 0;
    v = n;

    while (u < v) {
      j = ((u + v) / 2) | 0;
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

  v = result[n];

  while (n >= 0) {
    result[n--] = v;
    v = p[v];
  }

  return result;
}

/**
 * Update DOM styles.
 *
 * @param element - HTML or SVG Element
 * @param a - Prev styles
 * @param b - Next styles
 */
function updateStyle(
  element: HTMLElement | SVGElement,
  a: CSSStyleProps | undefined,
  b: CSSStyleProps | undefined,
): void {
  const style = element.style;
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
      style.removeProperty(key);
    }
  } else {
    let matchCount = 0;
    for (key in a) {
      bValue = void 0;
      if (objectHasOwnProperty.call(b, key) === true) {
        bValue = b[key];
        matchCount++;
      }
      const aValue = a[key];
      if (aValue !== bValue) {
        if (bValue !== void 0) {
          style.setProperty(key, bValue);
        } else {
          style.removeProperty(key);
        }
      }
    }

    const keys = Object.keys(b);
    for (let i = 0; matchCount < keys.length && i < keys.length; ++i) {
      key = keys[i];
      if (objectHasOwnProperty.call(a, key) === false) {
        style.setProperty(key, b[key]);
        ++matchCount;
      }
    }
  }
}

/**
 * Update DOM attribute.
 *
 * @param element - DOM Element
 * @param key - Attribute name
 * @param prev - Previous value
 * @param next - Next value
 */
function _updateAttr(
  element: Element,
  key: string,
  prev: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined,
  next: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined,
): void {
  if (key !== "style") {
    if (typeof next === "object") {
      next.u(
        element,
        key,
        prev === void 0 ? void 0 : (prev as AttributeDirective<any>).v,
        next.v,
      );
    } else if (prev !== next) {
      if (typeof prev === "object") {
        prev.u(
          element,
          key,
          (prev as AttributeDirective<any>).v,
          void 0,
        );
      } else {
        if (typeof next === "boolean") {
          next = next ? "" : void 0;
        }
        if (next === void 0) {
          /* istanbul ignore else */
          if (DEBUG) {
            element.removeAttribute(key);
          } else {
            elementRemoveAttribute.call(element, key);
          }
        } else {
          /* istanbul ignore else */
          if (DEBUG) {
            element.setAttribute(key, next as string);
          } else {
            elementSetAttribute.call(element, key, next);
          }
        }
      }
    }
  } else if (prev !== next) {
    updateStyle(element as HTMLElement, prev as CSSStyleProps, next as CSSStyleProps);
  }
}

/**
 * Update DOM attributes.
 *
 * @param element - DOM element
 * @param a - Prev DOM attributes
 * @param b - Next DOM attributes
 */
function _updateAttrs(
  element: Element,
  a: { [key: string]: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined } | undefined,
  b: { [key: string]: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined } | undefined,
): void {
  let key: string;

  if (a === void 0) {
    // a is empty, insert all attributes from b.
    for (key in b!) {
      _updateAttr(element, key, void 0, b![key]);
    }
  } else if (b === void 0) {
    // b is empty, remove all attributes from a.
    for (key in a) {
      _updateAttr(element, key, a[key], void 0);
    }
  } else {
    let matchCount = 0;
    for (key in a) {
      let bValue: string | number | boolean | AttributeDirective<any> | CSSStyleProps | undefined = void 0;
      if (objectHasOwnProperty.call(b, key) === true) {
        bValue = b[key];
        matchCount++;
      }
      _updateAttr(element, key, a[key], bValue);
    }

    const keys = Object.keys(b);
    for (let i = 0; matchCount < keys.length && i < keys.length; ++i) {
      key = keys[i];
      if (objectHasOwnProperty.call(a, key) === false) {
        _updateAttr(element, key, void 0, b[key]);
        ++matchCount;
      }
    }
  }
}

// function checkElementChildrenShape(a: RecursiveOpChildrenArray, b: RecursiveOpChildrenArray) {
//   if (a.length !== b.length) {
//     throw new Error(`Invalid element, children array has a dynamic shape`);
//   }
//   for (let i = 0; i < a.length; i++) {
//     const ai = a[i];
//     const bi = b[i];
//     if (ai instanceof Array) {
//       if (!(bi instanceof Array)) {
//         throw new Error(`Invalid element, children array has a dynamic shape`);
//       }
//       checkElementChildrenShape(ai, bi);
//     } else if (bi instanceof Array) {
//       throw new Error(`Invalid element, children array has a dynamic shape`);
//     }
//   }
// }

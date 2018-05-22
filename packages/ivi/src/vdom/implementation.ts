/**
 * DO NOT MOVE THIS FUNCTIONS TO SEPARATE MODULES!
 *
 * There are so many circular dependencies between functions in this module, so just leave it all here instead of
 * creating many circular dependencies between JS modules.
 */

import {
  SVG_NAMESPACE, nodeRemoveChild, nodeInsertBefore, elementSetAttribute, nodeCloneNode, nodeReplaceChild,
} from "ivi-core";
import { autofocus } from "ivi-scheduler";
import { setEventHandlersToDOMNode, syncEvents, attachEvents, detachEvents } from "ivi-events";
import { VNodeFlags, ComponentFlags } from "./flags";
import { VNode, getDOMInstanceFromVNode } from "./vnode";
import { ConnectDescriptor } from "./connect_descriptor";
import { StatefulComponent, StatelessComponent, Component } from "./component";
import { syncDOMAttrs, syncStyle } from "./sync_dom";

/**
 * Removes VNode.
 *
 * @param parent - Parent DOM node
 * @param vnode - Virtual DOM node to remove
 */
export function removeVNode(parent: Node, vnode: VNode): void {
  /* istanbul ignore else */
  if (DEBUG) {
    parent.removeChild(getDOMInstanceFromVNode(vnode)!);
  } else {
    nodeRemoveChild.call(parent, getDOMInstanceFromVNode(vnode)!);
  }
  _detach(vnode);
}

/**
 * Recursively attach all nodes.
 *
 * @param vnode - Virtual DOM node
 */
function _attach(vnode: VNode): void {
  const flags = vnode._f;

  if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ElementPropsEvents)) !== 0) {
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = vnode._c as VNode;
      do {
        _attach(child!);
        child = child._r;
      } while (child !== null);
    }
    if ((flags & VNodeFlags.ElementPropsEvents) !== 0) {
      if (vnode._e !== null) {
        attachEvents(vnode._e);
      }
    }
  } else if (
    (flags & (
      VNodeFlags.StatelessComponent |
      VNodeFlags.StatefulComponent |
      VNodeFlags.Connect |
      VNodeFlags.UpdateContext
    )) !== 0) {
    if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      (vnode._i as Component<any>).attached();
    }
    _attach(vnode._c as VNode);
  }
}

/**
 * Recursively detach all nodes.
 *
 * @param vnode - Virtual DOM node
 */
function _detach(vnode: VNode): void {
  const flags = vnode._f;

  if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ElementPropsEvents)) !== 0) {
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = vnode._c as VNode;
      do {
        _detach(child!);
        child = child._r;
      } while (child !== null);
    }
    if ((flags & VNodeFlags.ElementPropsEvents) !== 0) {
      if (vnode._e !== null) {
        detachEvents(vnode._e);
      }
    }
  } else if ((flags & (
    VNodeFlags.StatelessComponent |
    VNodeFlags.StatefulComponent |
    VNodeFlags.Connect |
    VNodeFlags.UpdateContext
  )) !== 0) {
    _detach(vnode._c as VNode);
    if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      const component = vnode._i as Component<any>;
      component.flags |= ComponentFlags.Detached;
      component.detached();
    }
  }
}

/**
 * Recursively perform dirty checking.
 *
 * @param parent - Parent DOM Node
 * @param vnode - VNode
 * @param context - Current context
 * @param dirtyContext - Context is dirty
 */
export function dirtyCheck(parent: Node, vnode: VNode, context: {}, dirtyContext: boolean): number {
  const flags = vnode._f;
  let deepUpdate = 0;
  let children: VNode | null | undefined;
  let instance: Node | Component<any> | {} | undefined;

  if ((flags & (
    VNodeFlags.StopDirtyChecking | // StopDirtyChecking will convert this value to -value
    VNodeFlags.ChildrenVNode |
    VNodeFlags.StatelessComponent |
    VNodeFlags.StatefulComponent |
    VNodeFlags.Connect |
    VNodeFlags.UpdateContext
  )) > 0) {
    children = vnode._c as VNode;
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      instance = vnode._i as Node;
      do {
        deepUpdate |= dirtyCheck(instance as Node, children, context, dirtyContext);
        children = children._r;
      } while (children !== null);
    } else if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      instance = vnode._i as Component<any>;
      if (((instance as Component<any>).flags & ComponentFlags.Dirty) !== 0) {
        syncVNode(
          parent,
          children,
          vnode._c = DEBUG ?
            shouldBeSingleVNode((instance as Component<any>).render()) :
            /* istanbul ignore next */(instance as Component<any>).render(),
          context,
          dirtyContext,
        );
        (instance as Component<any>).flags &= ~ComponentFlags.Dirty;
        (instance as Component<any>).updated(true);
        deepUpdate = 1;
      } else {
        deepUpdate = dirtyCheck(parent, children, context, dirtyContext);
        if (deepUpdate !== 0) {
          (instance as Component<any>).updated(false);
        }
      }
    } else { // (flags & (VNodeFlags.StatelessComponent | VNodeFlags.Connect | VNodeFlags.UpdateContext))
      if ((flags & VNodeFlags.Connect) !== 0) {
        const connect = vnode._t as ConnectDescriptor<any, any, {}>;
        instance = vnode._i as {};
        const selectData = connect.select(instance, vnode._p, context);
        if (instance === selectData) {
          deepUpdate = dirtyCheck(parent, children, context, dirtyContext);
        } else {
          deepUpdate = 1;
          vnode._i = selectData;
          syncVNode(
            parent,
            children,
            vnode._c = DEBUG ?
              shouldBeSingleVNode(connect.render(selectData)) :
              /* istanbul ignore next */connect.render(selectData),
            context,
            dirtyContext,
          );
        }
      } else {
        if ((flags & VNodeFlags.UpdateContext) !== 0) {
          if (dirtyContext === true) {
            vnode._i = { ...context, ...vnode._p };
          }
          context = vnode._i as {};
        }
        deepUpdate = dirtyCheck(parent, children, context, dirtyContext);
      }
    }
  }
  return deepUpdate;
}

/**
 * Remove all children.
 *
 * `detach()` lifecycle methods will be invoked for all children and their subtrees.
 *
 * @param parent - Parent DOM element
 * @param firstVNode - First Virtual DOM node
 */
function _removeAllChildren(parent: Node, firstVNode: VNode): void {
  parent.textContent = "";
  let vnode: VNode | null = firstVNode;
  do {
    _detach(vnode);
    vnode = vnode._r;
  } while (vnode !== null);
}

/**
 * Set value for `HTMLInputElement`.
 *
 * When value has a string type it is assigned to `value` property, otherwise it is assigned to `checked` property.
 *
 * @param input - HTMLInputElement
 * @param value - Value
 */
function _setInputValue(input: HTMLInputElement, value: string | boolean): void {
  if (typeof value === "string") {
    input.value = value;
  } else {
    input.checked = value;
  }
}

/**
 * Render virtual DOM node.
 *
 * @param parent - Parent DOM element
 * @param vnode - Virtual DOM node to render
 * @param context - Current context
 * @returns Rendered DOM Node
 */
function _render(parent: Node, vnode: VNode, context: {}): Node {
  /* istanbul ignore else */
  if (DEBUG) {
    if (vnode._i !== null) {
      throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
        "clone VNode with `cloneVNode`.");
    }
  }

  const flags = vnode._f;
  let instance: Node | Component<any> | null = null;
  let node: Node;

  if ((flags & VNodeFlags.Text) !== 0) {
    instance = node = document.createTextNode(vnode._c as string);
  } else {
    const tag = vnode._t;
    if ((flags & (VNodeFlags.Element | VNodeFlags.StatefulComponent)) !== 0) {
      if ((flags & VNodeFlags.Element) !== 0) {
        const svg = (flags & VNodeFlags.SvgElement) !== 0;
        if ((flags & VNodeFlags.ElementFactory) === 0) {
          node = svg ?
            document.createElementNS(SVG_NAMESPACE, tag as string) :
            document.createElement(tag as string);
        } else {
          if ((tag as VNode)._i === null) {
            _render(parent, (tag as VNode), context);
          }
          /* istanbul ignore else */
          if (DEBUG) {
            node = ((tag as VNode)._i as Node).cloneNode(false);
          } else {
            node = nodeCloneNode.call((tag as VNode)._i as Node, false);
          }
        }

        if (vnode._cs !== void 0) {
          /**
           * SVGElement.className returns `SVGAnimatedString`
           */
          if (svg === true) {
            /* istanbul ignore else */
            if (DEBUG) {
              (node as Element).setAttribute("class", vnode._cs);
            } else {
              elementSetAttribute.call(node as Element, "class", vnode._cs);
            }
          } else {
            (node as Element).className = vnode._cs;
          }
        }

        if (vnode._p !== null) {
          syncDOMAttrs(node as Element, svg, null, vnode._p);
        }
        if (vnode._s !== null) {
          syncStyle(node as HTMLElement, null, vnode._s);
        }
        if (vnode._e !== null) {
          setEventHandlersToDOMNode(node as Element, vnode._e);
        }

        let children = vnode._c;
        if (children !== null) {
          if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
            children = children as VNode;
            do {
              /* istanbul ignore else */
              if (DEBUG) {
                node.insertBefore(_render(node, children, context), null);
              } else {
                nodeInsertBefore.call(node, _render(node, children, context), null);
              }
              children = children._r;
            } while (children !== null);
          } else if ((flags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement)) !== 0) {
            /**
             * #quirks
             *
             * It is important that input value is assigned after all properties. It prevents some issues with
             * rounding, etc. `value` should be assigned after `step`, `min` and `max` properties.
             */
            _setInputValue(node as HTMLInputElement, children as string | boolean);
          } else { // (flags & VNodeFlags.UnsafeHTML)
            (node as Element).innerHTML = children as string;
          }
        }

        instance = node;
      } else { // ((flags & VNodeFlags.StatefulComponent) !== 0)
        const component = instance = new (tag as StatefulComponent<any>)(vnode._p);
        const root = vnode._c = DEBUG ?
          shouldBeSingleVNode(component.render()) :
          /* istanbul ignore next */component.render();
        node = _render(parent, root, context);
      }
    } else { // ((flags & (VNodeFlags.StatelessComponent | VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0)
      if ((flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
        if ((flags & VNodeFlags.Connect) !== 0) {
          const connect = (tag as ConnectDescriptor<any, any, {}>);
          const selectData = instance = connect.select(null, vnode._p, context);
          vnode._c = DEBUG ?
            shouldBeSingleVNode(connect.render(selectData)) :
            /* istanbul ignore next */connect.render(selectData);
        } else {
          context = instance = { ...context, ...vnode._p };
        }
      } else {
        vnode._c = DEBUG ?
          shouldBeSingleVNode((tag as StatelessComponent<any>).render(vnode._p)) :
          /* istanbul ignore next */(tag as StatelessComponent<any>).render(vnode._p);
      }
      node = _render(parent, vnode._c as VNode, context);
    }

    if ((flags & VNodeFlags.Autofocus) !== 0) {
      autofocus(node as Element);
    }
  }

  vnode._i = instance;

  return node;
}

/**
 * Render virtual DOM node into container and invoke `attached()` lifecycle methods after node is inserted into
 * container.
 *
 * It is important that `attached()` methods are invoked only after DOM nodes have been inserted into container, so it
 * goes twice through the entire vnode tree, first time when everything is rendered and the second time when
 * `attached()` methods are invoked.
 *
 * @param parent - Parent DOM element
 * @param refChild - Reference to the next DOM node, when it is `null` child will be inserted at the end
 * @param vnode - Virtual DOM node
 * @param context - Current context
 * @returns Rendered DOM Node
 */
export function renderVNode(
  parent: Node,
  refChild: Node | null,
  vnode: VNode,
  context: {},
): Node {
  const node = _render(parent, vnode, context);
  /* istanbul ignore else */
  if (DEBUG) {
    parent.insertBefore(node, refChild);
  } else {
    nodeInsertBefore.call(parent, node, refChild);
  }
  _attach(vnode);
  return node;
}

/**
 * Check if two virtual DOM node has equal keys.
 *
 * @param a - Virtual DOM node
 * @param b - Virtual DOM node
 * @returns `true` when virtual DOM nodes has equal keys
 */
function _eqKeys(a: VNode, b: VNode): boolean {
  return (
    (a._k === b._k) &&
    ((a._f ^ b._f) & VNodeFlags.Key) === 0
  );
}

/**
 * Sync virtual DOM nodes.
 *
 * When node `a` is synced with node `b`, `a` node should be considered as destroyed, and any access to it after sync
 * is an undefined behavior.
 *
 * @param parent - Parent DOM element
 * @param a - Previous virtual DOM node
 * @param b - Next virtual DOM node
 * @param context - Current context
 * @param dirtyContext - Context is dirty
 */
export function syncVNode(
  parent: Node,
  a: VNode,
  b: VNode,
  context: {},
  dirtyContext: boolean,
): void {
  if (a === b) {
    dirtyCheck(parent, b, context, dirtyContext);
    return;
  }

  /* istanbul ignore else */
  if (DEBUG) {
    if (b._i !== null) {
      throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times");
    }
  }

  let instance;
  const aFlags = a._f;
  const bFlags = b._f;
  if (
    (((aFlags ^ bFlags) & VNodeFlags.Syncable) === 0) &&
    (
      (aFlags & (
        VNodeFlags.ElementFactory |
        VNodeFlags.StatelessComponent |
        VNodeFlags.StatefulComponent |
        VNodeFlags.Connect
      )) === 0 ||
      a._t === b._t
    ) &&
    a._k === b._k
  ) {
    b._i = instance = a._i;

    if ((bFlags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
      const aChild = a._c;
      let bChild = b._c;
      if ((bFlags & VNodeFlags.Text) !== 0) {
        if (aChild !== bChild) {
          (instance as Text).data = bChild as string;
        }
      } else { // (flags & VNodeFlags.Element)
        const svg = (bFlags & VNodeFlags.SvgElement) !== 0;

        if (a._cs !== b._cs) {
          const className = b._cs === void 0 ? "" : b._cs;
          if (svg === true) {
            /* istanbul ignore else */
            if (DEBUG) {
              (instance as Element).setAttribute("class", className);
            } else {
              elementSetAttribute.call(instance, "class", className);
            }
          } else {
            (instance as Element).className = className;
          }
        }

        if (a._p !== b._p) {
          syncDOMAttrs(instance as Element, svg, a._p, b._p);
        }
        if (a._s !== b._s) {
          syncStyle(instance as HTMLElement, a._s, b._s);
        }
        if (a._e !== b._e) {
          syncEvents(a._e, b._e);
          setEventHandlersToDOMNode(instance as Element, b._e);
        }

        if (aChild !== bChild) {
          if (aChild === null) {
            if ((bFlags & VNodeFlags.ChildrenVNode) !== 0) {
              bChild = bChild as VNode;
              do {
                renderVNode(instance as Element, null, bChild, context);
                bChild = bChild._r!;
              } while (bChild !== null);
            } else if ((bFlags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement)) !== 0) {
              _setInputValue(instance as HTMLInputElement, bChild as string | boolean);
            } else { // (bParentFlags & VNodeFlags.UnsafeHTML)
              (instance as Element).innerHTML = bChild as string;
            }
          } else if (bChild === null) {
            if ((aFlags & VNodeFlags.ChildrenVNode) !== 0) {
              _removeAllChildren(instance as Element, aChild as VNode);
            } else if ((aFlags & VNodeFlags.UnsafeHTML) !== 0) {
              (instance as Element).textContent = "";
            } else { // (bParentFlags & VNodeFlags.InputElement)
              /**
               * When value/checked isn't specified, we should just ignore it.
               */
            }
          } else {
            if ((aFlags & VNodeFlags.ChildrenVNode) !== 0) {
              _syncChildrenTrackByKeys(instance as Element, aChild as VNode, bChild as VNode, context, dirtyContext);
            } else if ((aFlags & VNodeFlags.UnsafeHTML) !== 0) {
              (instance as Element).innerHTML = bChild as string;
            } else { // (aParentFlags & VNodeFlags.InputElement)
              /**
               * Input elements has an internal state with a `value` property, so it should be checked before an
               * assignment to prevent unnecessary events when `value` is the same as the `value` in the internal
               * state.
               *
               * In general we don't want to override behaviour of DOM Elements with an internal state. Assigning props
               * to such elements should be treated as a one-time assignment, so it works almost like `value` attribute,
               * except when a new value is passed down, it can override previous value when it doesn't match the
               * previous one. There is absolutely no reasons to overcomplicate such behaviour just to make it more
               * beatiful like it is a declarative assignment and can't be changed, because in real applications,
               * component that controls this element will always track changes, and when it changes it will invalidate
               * its representation, so everything will stay in-sync.
               */
              if (typeof bChild === "string") {
                if ((instance as HTMLInputElement).value !== bChild) {
                  (instance as HTMLInputElement).value = bChild;
                }
              } else {
                (instance as HTMLInputElement).checked = bChild as boolean;
              }
            }
          }
        }
      }
    } else { // (flags & VNodeFlags.Component)
      if ((bFlags & VNodeFlags.StatefulComponent) !== 0) {
        const component = instance as Component<any>;
        // Update component props
        const oldProps = a._p;
        const newProps = b._p;
        if (oldProps !== newProps) {
          // There is no reason to call `newPropsReceived` when props aren't changed, even when they are
          // reassigned later to reduce memory usage.
          component.newPropsReceived(oldProps, newProps);
        }
        // Reassign props even when they aren't changed to reduce overall memory usage.
        //
        // New value always stays alive because it is referenced from virtual dom tree, so instead of keeping
        // in memory two values even when they are the same, we just always reassign it to the new value.
        component.props = newProps;

        if (
          ((component.flags & ComponentFlags.Dirty) !== 0) ||
          (component.shouldUpdate(oldProps, newProps) === true)
        ) {
          syncVNode(
            parent,
            a._c as VNode,
            b._c = DEBUG ?
              shouldBeSingleVNode(component.render()) :
              /* istanbul ignore next */component.render(),
            context,
            dirtyContext,
          );
          component.flags &= ~ComponentFlags.Dirty;
          component.updated(true);
        } else {
          if (dirtyCheck(parent, b._c = a._c as VNode, context, dirtyContext) !== 0) {
            component.updated(false);
          }
        }
      } else { // (flags & VNodeFlags.ComponentFunction)
        if ((bFlags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
          if ((bFlags & VNodeFlags.Connect) !== 0) {
            const connect = b._t as ConnectDescriptor<any, any, {}>;
            const prevSelectData = instance;
            const selectData = b._i = connect.select(prevSelectData, b._p, context);
            if (prevSelectData === selectData) {
              dirtyCheck(parent, b._c = a._c as VNode, context, dirtyContext);
            } else {
              syncVNode(
                parent,
                a._c as VNode,
                b._c = DEBUG ?
                  shouldBeSingleVNode(connect.render(selectData)) :
                  /* istanbul ignore next */connect.render(selectData),
                context,
                dirtyContext,
              );
            }
          } else {
            if (a._p !== b._p) {
              dirtyContext = true;
            }
            b._i = context = (dirtyContext === true) ?
              { ...context, ...b._p } :
              instance as {};
            syncVNode(parent, a._c as VNode, b._c as VNode, context, dirtyContext);
          }
        } else {
          const sc = b._t as StatelessComponent<any>;
          if (
            (a._p !== b._p) &&
            ((bFlags & VNodeFlags.ShouldUpdateHint) === 0 || sc.shouldUpdate!(a._p, b._p) === true)
          ) {
            syncVNode(
              parent,
              a._c as VNode,
              b._c = DEBUG ?
                shouldBeSingleVNode(sc.render(b._p)) :
                /* istanbul ignore next */sc.render(b._p),
              context,
              dirtyContext,
            );
          } else {
            dirtyCheck(parent, b._c = a._c as VNode, context, dirtyContext);
          }
        }
      }
    }
  } else {
    instance = _render(parent, b, context);
    /* istanbul ignore else */
    if (DEBUG) {
      parent.replaceChild(instance, getDOMInstanceFromVNode(a)!);
    } else {
      nodeReplaceChild.call(parent, instance, getDOMInstanceFromVNode(a)!);
    }
    _detach(a);
    _attach(b);
  }
}

/**
 * Sync children.
 *
 * High-level overview of the algorithm that is implemented in this function (this overview doesn't include some details
 * how it handles nodes with implicit keys and many small tricks to reduce memory allocations and unnecessary work).
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
 * @param parent - Parent DOM element
 * @param aStartVNode - Previous virtual DOM node
 * @param bStartVNode - Next virtual DOM node
 * @param context - Current context
 * @param dirtyContext - Context is dirty
 */
function _syncChildrenTrackByKeys(
  parent: Node,
  aStartVNode: VNode,
  bStartVNode: VNode,
  context: {},
  dirtyContext: boolean,
): void;
function _syncChildrenTrackByKeys(
  parent: Node,
  aStartVNode: VNode | null, // should not be null, it is a workaroud to slightly reduce code size
  bStartVNode: VNode | null, // should not be null, it is a workaroud to slightly reduce code size
  context: {},
  dirtyContext: boolean,
): void {
  let aEndVNode: VNode = aStartVNode!._l!;
  let bEndVNode: VNode = bStartVNode!._l!;
  let vnode: VNode | null; // temporary vnode
  let i: number | undefined = 0;
  let step1Synced = 0;

  // Step 1
  outer: while (true) {
    // Sync nodes with the same key at the beginning.
    while (_eqKeys(aStartVNode!, bStartVNode!) === true) {
      syncVNode(parent, aStartVNode!, bStartVNode!, context, dirtyContext);
      step1Synced++;
      if (aStartVNode === aEndVNode) {
        i = 1;
      } else {
        aStartVNode = aStartVNode!._r;
      }
      if (bStartVNode === bEndVNode) {
        i |= 2;
      } else {
        bStartVNode = bStartVNode!._r;
      }
      if (i) {
        break outer;
      }
    }

    // Sync nodes with the same key at the end.
    while (_eqKeys(aEndVNode, bEndVNode) === true) {
      syncVNode(parent, aEndVNode, bEndVNode, context, dirtyContext);
      step1Synced++;
      if (aStartVNode === aEndVNode) {
        i = 1;
      } else {
        aEndVNode = aEndVNode._l;
      }
      if (bStartVNode === bEndVNode) {
        i |= 2;
      } else {
        bEndVNode = bEndVNode._l;
      }
      if (i) {
        break outer;
      }
    }

    break;
  }

  if (i) {
    if (i < 3) {
      if (i < 2) {
        // All nodes from a are synced, insert the rest from b.
        const next = nextNode(bEndVNode);
        while (1) {
          renderVNode(parent, next, bStartVNode!, context);
          if (bStartVNode === bEndVNode) {
            break;
          }
          bStartVNode = bStartVNode!._r;
        }
      } else {
        // All nodes from b are synced, remove the rest from a.
        vnode = aEndVNode._r;
        while (1) {
          removeVNode(parent, aStartVNode!);
          if (aStartVNode === aEndVNode) {
            break;
          }
          aStartVNode = aStartVNode!._r;
        }
      }
    }
  } else { // Step 2
    // Inner length after prefix/suffix optimization.
    let aInnerLength = 0;
    let bInnerLength = 0;

    // When lastPosition === 1000000000, it means that one of the nodes in the wrong position.
    let lastPosition = 0;

    // Reverse indexes for keys.
    let explicitKeyIndex: Map<any, number> | undefined;
    let implicitKeyIndex: Map<number, number> | undefined;
    let key;

    vnode = bStartVNode;
    while (1) {
      key = vnode!._k;
      if (vnode!._f & VNodeFlags.Key) {
        if (explicitKeyIndex === void 0) {
          explicitKeyIndex = new Map<any, number>();
        }
        explicitKeyIndex.set(key, bInnerLength++);
      } else {
        if (implicitKeyIndex === void 0) {
          implicitKeyIndex = new Map<number, number>();
        }
        implicitKeyIndex.set(key, bInnerLength++);
      }
      if (vnode === bEndVNode) {
        break;
      }
      vnode = vnode!._r;
    }

    // Mark all nodes as inserted (-1).
    const prevPositionsForB = new Array<number>(bInnerLength).fill(-1);

    const bInnerArray = new Array<VNode>(bInnerLength);
    vnode = bStartVNode;
    for (i = 0; i < bInnerLength; i++) {
      bInnerArray[i] = vnode!;
      vnode = vnode!._r;
    }

    let step2Synced = 0;
    vnode = aStartVNode;
    while (1) {
      key = vnode!._k;
      if (vnode!._f & VNodeFlags.Key) {
        i = explicitKeyIndex ? explicitKeyIndex.get(key) : void 0;
      } else {
        i = implicitKeyIndex ? implicitKeyIndex.get(key) : void 0;
      }

      if (i === void 0) {
        vnode!._k = null;
      } else {
        lastPosition = (lastPosition > i) ? 1000000000 : i;
        prevPositionsForB[i] = aInnerLength;
        syncVNode(parent, vnode!, bInnerArray[i], context, dirtyContext);
        step2Synced++;
      }
      aInnerLength++;
      if (vnode === aEndVNode) {
        break;
      }
      vnode = vnode!._r;
    }

    if (!step1Synced && !step2Synced) {
      // Noone is synced, remove all children with one dom op.
      _removeAllChildren(parent, aStartVNode!);
      do {
        renderVNode(parent, null, bStartVNode!, context);
        bStartVNode = bStartVNode!._r;
      } while (bStartVNode !== null);
    } else {
      i = aInnerLength - step2Synced;
      while (i > 0) {
        if (aStartVNode!._k === null) {
          removeVNode(parent, aStartVNode!);
          i--;
        }
        aStartVNode = aStartVNode!._r;
      }

      // Step 3
      if (lastPosition === 1000000000) {
        const seq = lis(prevPositionsForB);
        i = seq.length - 1;
        while (bInnerLength > 0) {
          if (prevPositionsForB[--bInnerLength] < 0) {
            renderVNode(parent, nextNode(bEndVNode), bEndVNode, context);
          } else {
            if (i < 0 || bInnerLength !== seq[i]) {
              /* istanbul ignore else */
              if (DEBUG) {
                parent.insertBefore(getDOMInstanceFromVNode(bEndVNode)!, nextNode(bEndVNode));
              } else {
                nodeInsertBefore.call(parent, getDOMInstanceFromVNode(bEndVNode)!, nextNode(bEndVNode));
              }
            } else {
              i--;
            }
          }
          bEndVNode = bEndVNode._l;
        }
      } else if (step2Synced !== bInnerLength) {
        while (bInnerLength > 0) {
          if (prevPositionsForB[--bInnerLength] < 0) {
            renderVNode(parent, nextNode(bEndVNode), bEndVNode, context);
          }
          bEndVNode = bEndVNode._l;
        }
      }
    }
  }
}

/**
 * Retrieves a next DOM node from a virtual DOM node.
 *
 * @param vnode - Virtual DOM node
 * @returns Next DOM node
 */
function nextNode(vnode: VNode): Node | null {
  const next = vnode._r;
  return next === null ? null : getDOMInstanceFromVNode(next);
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
  result.push(0);
  let u: number;
  let v: number;
  let j: number;

  for (let i = 0; i < a.length; ++i) {
    const k = a[i];
    if (k === -1) {
      continue;
    }

    j = result[result.length - 1];
    if (a[j] < k) {
      p[i] = j;
      result.push(i);
      continue;
    }

    u = 0;
    v = result.length - 1;

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

  u = result.length;
  v = result[u - 1];

  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }

  return result;
}

/**
 * Check virtual DOM node returned from a `render()` function in `DEBUG` mode.
 *
 * @param vnode - Virtual DOM node
 * @return `vnode`
 */
function shouldBeSingleVNode<T extends VNode>(vnode: T): T {
  if (vnode._l !== vnode) {
    throw new Error("Invalid render function. Render function should return singular VNode.");
  }
  return vnode;
}

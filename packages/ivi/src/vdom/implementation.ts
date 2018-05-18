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
 * Remove VNode entry point.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
export function removeVNode(parent: Node, node: VNode): void {
  /* istanbul ignore else */
  if (DEBUG) {
    parent.removeChild(getDOMInstanceFromVNode(node)!);
  } else {
    nodeRemoveChild.call(parent, getDOMInstanceFromVNode(node)!);
  }
  _detach(node);
}

/**
 * Recursively attach all nodes.
 *
 * @param vnode VNode.
 */
function _attach(vnode: VNode): void {
  const flags = vnode.flags;

  if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ElementPropsEvents)) !== 0) {
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = vnode.children as VNode;
      do {
        _attach(child!);
        child = child.next;
      } while (child !== null);
    }
    if ((flags & VNodeFlags.ElementPropsEvents) !== 0) {
      if (vnode.events !== null) {
        attachEvents(vnode.events);
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
      (vnode.instance as Component<any>).attached();
    }
    _attach(vnode.children as VNode);
  }
}

/**
 * Recursively detach all nodes.
 *
 * @param vnode VNode.
 */
function _detach(vnode: VNode): void {
  const flags = vnode.flags;

  if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ElementPropsEvents)) !== 0) {
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = vnode.children as VNode;
      do {
        _detach(child!);
        child = child.next;
      } while (child !== null);
    }
    if ((flags & VNodeFlags.ElementPropsEvents) !== 0) {
      if (vnode.events !== null) {
        detachEvents(vnode.events);
      }
    }
  } else if ((flags & (
    VNodeFlags.StatelessComponent |
    VNodeFlags.StatefulComponent |
    VNodeFlags.Connect |
    VNodeFlags.UpdateContext
  )) !== 0) {
    _detach(vnode.children as VNode);
    if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      const component = vnode.instance as Component<any>;
      component.flags |= ComponentFlags.Detached;
      component.detached();
    }
  }
}

/**
 * Recursively perform dirty checking.
 *
 * @param parent Parent DOM Node.
 * @param vnode VNode.
 * @param context New context.
 * @param dirtyContext Dirty context.
 */
export function dirtyCheck(parent: Node, vnode: VNode, context: {}, dirtyContext: boolean): number {
  const flags = vnode.flags;
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
    children = vnode.children as VNode;
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      instance = vnode.instance as Node;
      do {
        deepUpdate |= dirtyCheck(instance as Node, children, context, dirtyContext);
        children = children.next;
      } while (children !== null);
    } else if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      instance = vnode.instance as Component<any>;
      if (((instance as Component<any>).flags & ComponentFlags.Dirty) !== 0) {
        syncVNode(
          parent,
          children,
          vnode.children = DEBUG ?
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
        const connect = vnode.tag as ConnectDescriptor<any, any, {}>;
        instance = vnode.instance as {};
        const selectData = connect.select(instance, vnode.props, context);
        if (instance === selectData) {
          deepUpdate = dirtyCheck(parent, children, context, dirtyContext);
        } else {
          deepUpdate = 1;
          vnode.instance = selectData;
          syncVNode(
            parent,
            children,
            vnode.children = DEBUG ?
              shouldBeSingleVNode(connect.render(selectData)) :
              /* istanbul ignore next */connect.render(selectData),
            context,
            dirtyContext,
          );
        }
      } else {
        if ((flags & VNodeFlags.UpdateContext) !== 0) {
          if (dirtyContext === true) {
            vnode.instance = { ...context, ...vnode.props };
          }
          context = vnode.instance as {};
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
 * `detach` lifecycle methods will be invoked for all children and their subtrees.
 *
 * @param parent Parent DOM node.
 * @param firstNode Arrays of VNodes to remove.
 */
function _removeAllChildren(parent: Node, firstNode: VNode): void {
  parent.textContent = "";
  let node: VNode | null = firstNode;
  do {
    _detach(node);
    node = node.next;
  } while (node !== null);
}

/**
 * Set value for HTMLInputElement.
 *
 * When value has a string type it is assigned to `value` property, otherwise it is assigned to `checked` property.
 *
 * @param input HTMLInputElement.
 * @param value Value.
 */
function _setInputValue(input: HTMLInputElement, value: string | boolean): void {
  if (typeof value === "string") {
    input.value = value;
  } else {
    input.checked = value;
  }
}

/**
 * Render VNode.
 *
 * @param parent Parent DOM Node.
 * @param vnode VNode to render.
 * @param context Current context.
 * @returns Rendered DOM Node.
 */
function _render(parent: Node, vnode: VNode, context: {}): Node {
  /* istanbul ignore else */
  if (DEBUG) {
    if (vnode.instance !== null) {
      throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
        "clone VNode with `cloneVNode`.");
    }
  }

  const flags = vnode.flags;
  let instance: Node | Component<any> | null = null;
  let node: Node;

  if ((flags & VNodeFlags.Text) !== 0) {
    instance = node = document.createTextNode(vnode.children as string);
  } else {
    if ((flags & (VNodeFlags.Element | VNodeFlags.StatefulComponent)) !== 0) {
      if ((flags & VNodeFlags.Element) !== 0) {
        const svg = (flags & VNodeFlags.SvgElement) !== 0;
        if ((flags & VNodeFlags.ElementFactory) === 0) {
          const tagName = vnode.tag as string;
          node = svg ?
            document.createElementNS(SVG_NAMESPACE, tagName) :
            document.createElement(tagName);
        } else {
          const factory = vnode.tag as VNode;
          if (factory.instance === null) {
            _render(parent, factory, context);
          }
          /* istanbul ignore else */
          if (DEBUG) {
            node = (factory.instance as Node).cloneNode(false);
          } else {
            node = nodeCloneNode.call(factory.instance as Node, false);
          }
        }

        if (vnode.className !== void 0) {
          /**
           * SVGElement.className returns `SVGAnimatedString`
           */
          if (svg === true) {
            /* istanbul ignore else */
            if (DEBUG) {
              (node as Element).setAttribute("class", vnode.className);
            } else {
              elementSetAttribute.call(node as Element, "class", vnode.className);
            }
          } else {
            (node as Element).className = vnode.className;
          }
        }

        if (vnode.props !== null) {
          syncDOMAttrs(node as Element, svg, null, vnode.props);
        }
        if (vnode.style !== null) {
          syncStyle(node as HTMLElement, null, vnode.style);
        }
        if (vnode.events !== null) {
          setEventHandlersToDOMNode(node as Element, vnode.events);
        }

        let children = vnode.children;
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
              children = children.next;
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
        const component = instance = new (vnode.tag as StatefulComponent<any>)(vnode.props);
        const root = vnode.children = DEBUG ?
          shouldBeSingleVNode(component.render()) :
          /* istanbul ignore next */component.render();
        node = _render(parent, root, context);
      }
    } else { // ((flags & (VNodeFlags.StatelessComponent | VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0)
      if ((flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
        if ((flags & VNodeFlags.Connect) !== 0) {
          const connect = (vnode.tag as ConnectDescriptor<any, any, {}>);
          const selectData = instance = connect.select(null, vnode.props, context);
          vnode.children = DEBUG ?
            shouldBeSingleVNode(connect.render(selectData)) :
            /* istanbul ignore next */connect.render(selectData);
        } else {
          context = instance = { ...context, ...vnode.props };
        }
      } else {
        vnode.children = DEBUG ?
          shouldBeSingleVNode((vnode.tag as StatelessComponent<any>).render(vnode.props)) :
          /* istanbul ignore next */(vnode.tag as StatelessComponent<any>).render(vnode.props);
      }
      node = _render(parent, vnode.children as VNode, context);
    }

    if ((flags & VNodeFlags.Autofocus) !== 0) {
      autofocus(node as Element);
    }
  }

  vnode.instance = instance;

  return node;
}

/**
 * Render VNode into container and invoke `attached` lifecycle methods after VNode is inserted into container.
 *
 * It is important that `attached` methods are invoked only after DOM Nodes have been inserted into container, so it
 * goes twice through the entire vnode tree, first time when everything is rendered and the second time when `attached`
 * methods are invoked.
 *
 * @param parent Parent DOM Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @returns Rendered DOM Node.
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
 * Check if two nodes has equal keys.
 *
 * @param a VNode.
 * @param b VNode.
 * @returns true if nodes has equal keys.
 */
function _eqKeys(a: VNode, b: VNode): boolean {
  return (
    (a.key === b.key) &&
    ((a.flags ^ b.flags) & VNodeFlags.Key) === 0
  );
}

/**
 * Sync two VNodes.
 *
 * When node `a` is synced with node `b`, `a` node should be considered as destroyed, and any access to it after sync
 * is an undefined behavior.
 *
 * @param parent Parent node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param dirtyContext Dirty context.
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
    if (b.instance !== null) {
      throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times");
    }
  }

  let instance;
  const aFlags = a.flags;
  const bFlags = b.flags;
  if (
    (((aFlags ^ bFlags) & VNodeFlags.Syncable) === 0) &&
    (
      (aFlags & (
        VNodeFlags.ElementFactory |
        VNodeFlags.StatelessComponent |
        VNodeFlags.StatefulComponent |
        VNodeFlags.Connect
      )) === 0 ||
      a.tag === b.tag
    ) &&
    a.key === b.key
  ) {
    b.instance = instance = a.instance;

    if ((bFlags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
      if ((bFlags & VNodeFlags.Text) !== 0) {
        if (a.children !== b.children) {
          (instance as Text).data = b.children as string;
        }
      } else { // (flags & VNodeFlags.Element)
        const svg = (bFlags & VNodeFlags.SvgElement) !== 0;

        if (a.className !== b.className) {
          const className = b.className === void 0 ? "" : b.className;
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

        if (a.props !== b.props) {
          syncDOMAttrs(instance as Element, svg, a.props, b.props);
        }
        if (a.style !== b.style) {
          syncStyle(instance as HTMLElement, a.style, b.style);
        }
        if (a.events !== b.events) {
          syncEvents(a.events, b.events);
          setEventHandlersToDOMNode(instance as Element, b.events);
        }

        const aChild = a.children;
        let bChild = b.children;
        if (aChild !== bChild) {
          if (aChild === null) {
            if ((bFlags & VNodeFlags.ChildrenVNode) !== 0) {
              bChild = bChild as VNode;
              do {
                renderVNode(instance as Element, null, bChild, context);
                bChild = bChild.next!;
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
        const oldProps = a.props;
        const newProps = b.props;
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
            a.children as VNode,
            b.children = DEBUG ?
              shouldBeSingleVNode(component.render()) :
              /* istanbul ignore next */component.render(),
            context,
            dirtyContext,
          );
          component.flags &= ~ComponentFlags.Dirty;
          component.updated(true);
        } else {
          if (dirtyCheck(parent, b.children = a.children as VNode, context, dirtyContext) !== 0) {
            component.updated(false);
          }
        }
      } else { // (flags & VNodeFlags.ComponentFunction)
        if ((bFlags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
          if ((bFlags & VNodeFlags.Connect) !== 0) {
            const connect = b.tag as ConnectDescriptor<any, any, {}>;
            const prevSelectData = instance;
            const selectData = b.instance = connect.select(prevSelectData, b.props, context);
            if (prevSelectData === selectData) {
              dirtyCheck(parent, b.children = a.children as VNode, context, dirtyContext);
            } else {
              syncVNode(
                parent,
                a.children as VNode,
                b.children = DEBUG ?
                  shouldBeSingleVNode(connect.render(selectData)) :
                  /* istanbul ignore next */connect.render(selectData),
                context,
                dirtyContext,
              );
            }
          } else {
            if (a.props !== b.props) {
              dirtyContext = true;
            }
            b.instance = context = (dirtyContext === true) ?
              { ...context, ...b.props } :
              instance as {};
            syncVNode(parent, a.children as VNode, b.children as VNode, context, dirtyContext);
          }
        } else {
          const sc = b.tag as StatelessComponent<any>;
          if (
            (a.props !== b.props) &&
            ((bFlags & VNodeFlags.ShouldUpdateHint) === 0 || sc.shouldUpdate!(a.props, b.props) === true)
          ) {
            syncVNode(
              parent,
              a.children as VNode,
              b.children = DEBUG ?
                shouldBeSingleVNode(sc.render(b.props)) :
                /* istanbul ignore next */sc.render(b.props),
              context,
              dirtyContext,
            );
          } else {
            dirtyCheck(parent, b.children = a.children as VNode, context, dirtyContext);
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
 * @param parent Parent node.
 * @param aFirstNode Old VNode list.
 * @param bFirstNode New VNode list.
 * @param context Current context.
 * @param dirtyContext Dirty context.
 */
function _syncChildrenTrackByKeys(
  parent: Node,
  aFirstNode: VNode,
  bFirstNode: VNode,
  context: {},
  dirtyContext: boolean,
): void {
  const aLastNode = aFirstNode.prev!;
  const bLastNode = bFirstNode.prev!;
  let aStartNode: VNode<any> | null = aFirstNode;
  let bStartNode: VNode<any> | null = bFirstNode;
  let aEndNode: VNode<any> = aLastNode;
  let bEndNode: VNode<any> = bLastNode;
  let aNode: VNode<any> | null;
  let bNode: VNode<any> | null;
  let i: number;
  let j: number | undefined;
  let next: Node | null;
  let synced = 0;
  let finished = 0;

  // Step 1
  outer: while (true) {
    // Sync nodes with the same key at the beginning.
    while (_eqKeys(aStartNode!, bStartNode!) === true) {
      syncVNode(parent, aStartNode!, bStartNode!, context, dirtyContext);
      synced++;
      if (aStartNode === aEndNode) {
        finished |= 1;
      } else {
        aStartNode = aStartNode!.next;
      }
      if (bStartNode === bEndNode) {
        finished |= 2;
      } else {
        bStartNode = bStartNode!.next;
      }
      if (finished) {
        break outer;
      }
    }

    // Sync nodes with the same key at the end.
    while (_eqKeys(aEndNode, bEndNode) === true) {
      syncVNode(parent, aEndNode, bEndNode, context, dirtyContext);
      synced++;
      if (aStartNode === aEndNode) {
        finished |= 1;
      } else {
        aEndNode = aEndNode.prev;
      }
      if (bStartNode === bEndNode) {
        finished |= 2;
      } else {
        bEndNode = bEndNode.prev;
      }
      if (finished) {
        break outer;
      }
    }

    break;
  }

  if (finished) {
    if (finished !== 3) {
      if (finished === 1) {
        // All nodes from a are synced, insert the rest from b.
        next = nextNode(bEndNode);
        do {
          renderVNode(parent, next, bStartNode!, context);
          bStartNode = bStartNode!.next;
        } while (bStartNode !== bEndNode.next);
      } else {
        // All nodes from b are synced, remove the rest from a.
        do {
          removeVNode(parent, aStartNode!);
          aStartNode = aStartNode!.next;
        } while (aStartNode !== aEndNode.next);
      }
    }
  } else { // Step 2
    // Inner length after prefix/suffix optimization.
    let aInnerLength = 0;
    let bInnerLength = 0;

    // When pos === 1000000000, it means that one of the nodes in the wrong position.
    let moved = 0;

    // Reverse indexes for keys.
    let explicitKeyIndex: Map<any, number> | undefined;
    let implicitKeyIndex: Map<number, number> | undefined;

    bNode = bStartNode;
    do {
      if (bNode!.flags & VNodeFlags.Key) {
        if (explicitKeyIndex === undefined) {
          explicitKeyIndex = new Map<any, number>();
        }
        explicitKeyIndex.set(bNode!.key, bInnerLength);
      } else {
        if (implicitKeyIndex === undefined) {
          implicitKeyIndex = new Map<number, number>();
        }
        implicitKeyIndex.set(bNode!.key, bInnerLength);
      }
      bInnerLength++;
      bNode = bNode!.next;
    } while (bNode !== bEndNode.next);

    // Mark all nodes as inserted.
    const bArray = new Array<VNode<any>>(bInnerLength);
    const sources = new Array<number>(bInnerLength).fill(-1);

    bNode = bStartNode;
    for (i = 0; i < bInnerLength; i++) {
      bArray[i] = bNode!;
      bNode = bNode!.next;
    }

    let innerSynced = 0;
    aNode = aStartNode;
    do {
      if (aNode!.flags & VNodeFlags.Key) {
        j = explicitKeyIndex ? explicitKeyIndex.get(aNode!.key) : undefined;
      } else {
        j = implicitKeyIndex ? implicitKeyIndex.get(aNode!.key) : undefined;
      }

      if (j === undefined) {
        aNode!.key = null;
      } else {
        sources[j] = aInnerLength;
        moved = (moved > j) ? 1000000000 : j;
        bNode = bArray[j];
        syncVNode(parent, aNode!, bNode, context, dirtyContext);
        innerSynced++;
      }
      aInnerLength++;
      aNode = aNode!.next;
    } while (aNode !== aEndNode.next);

    if (!synced && !innerSynced) {
      // Noone is synced, remove all children with one dom op.
      _removeAllChildren(parent, aFirstNode);
      while (bStartNode !== bEndNode.next) {
        renderVNode(parent, null, bStartNode!, context);
        bStartNode = bStartNode!.next;
      }
    } else {
      i = aInnerLength - innerSynced;
      while (i > 0) {
        if (aStartNode!.key === null) {
          removeVNode(parent, aStartNode!);
          i--;
        }
        aStartNode = aStartNode!.next;
      }

      // Step 3
      if (moved === 1000000000) {
        const seq = lis(sources);
        j = seq.length - 1;
        bNode = bEndNode;
        for (i = bInnerLength - 1; i >= 0; i--) {
          if (sources[i] < 0) {
            renderVNode(parent, nextNode(bNode), bNode!, context);
          } else {
            if (j < 0 || i !== seq[j]) {
              /* istanbul ignore else */
              if (DEBUG) {
                parent.insertBefore(getDOMInstanceFromVNode(bNode)!, nextNode(bNode));
              } else {
                nodeInsertBefore.call(parent, getDOMInstanceFromVNode(bNode)!, nextNode(bNode));
              }
            } else {
              j--;
            }
          }
          bNode = bNode.prev;
        }
      } else if (innerSynced !== bInnerLength) {
        bNode = bEndNode;
        for (i = bInnerLength - 1; i >= 0; i--) {
          if (sources[i] < 0) {
            renderVNode(parent, nextNode(bNode), bNode, context);
          }
          bNode = bNode.prev;
        }
      }
    }
  }
}

/**
 * Retrieves a next DOM node from a virtual DOM node.
 *
 * @param vnode - Virtual DOM node.
 * @returns Next DOM node.
 */
function nextNode(vnode: VNode): Node | null {
  const next = vnode.next;
  return next === null ? null : getDOMInstanceFromVNode(next);
}

/**
 * Slightly modified Longest Increased Subsequence algorithm, it ignores items that have -1 value, they're representing
 * new items.
 *
 * http://en.wikipedia.org/wiki/Longest_increasing_subsequence
 *
 * @param a Array of numbers.
 * @returns Longest increasing subsequence.
 * @noinline
 */
function lis(a: number[]): number[] {
  const p = a.slice();
  const result: number[] = [];
  result.push(0);
  let u: number;
  let v: number;

  for (let i = 0, il = a.length; i < il; ++i) {
    if (a[i] === -1) {
      continue;
    }

    const j = result[result.length - 1];
    if (a[j] < a[i]) {
      p[i] = j;
      result.push(i);
      continue;
    }

    u = 0;
    v = result.length - 1;

    while (u < v) {
      const c = ((u + v) / 2) | 0;
      if (a[result[c]] < a[i]) {
        u = c + 1;
      } else {
        v = c;
      }
    }

    if (a[i] < a[result[u]]) {
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

function shouldBeSingleVNode<T extends VNode>(vnode: T): T {
  if (vnode.prev !== vnode) {
    throw new Error("Invalid render function. Render function should return singular VNode.");
  }
  return vnode;
}

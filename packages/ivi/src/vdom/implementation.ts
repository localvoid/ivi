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
import {
  setInitialNestingState, pushNestingState, restoreNestingState, checkNestingViolation, nestingStateAncestorFlags,
  nestingStateParentTagName,
} from "../dev_mode/html_nesting_rules";
import { VNodeFlags, ComponentFlags } from "./flags";
import { VNode, getDOMInstanceFromVNode } from "./vnode";
import { ConnectDescriptor } from "./connect_descriptor";
import { StatefulComponent, StatelessComponent, Component } from "./component";
import { syncDOMAttrs, syncStyle } from "./sync_dom";

/**
 * Render VNode entry point tryCatch wrapper.
 *
 * @param parent Parent DOM Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @returns Rendered DOM Node.
 */
export function renderVNode(parent: Node, refChild: Node | null, vnode: VNode, context: {}): Node {
  if (DEBUG) {
    setInitialNestingState(parent as Element);
  }
  return _renderVNode(parent, refChild, vnode, context);
}

/**
 * Render VNode entry point. Renders VNode into container and invokes `attached` lifecycle methods after VNode is
 * inserted into container.
 *
 * @param parent Parent DOM Node.
 * @param refChild Reference to the next Node, when it is `null` child will be inserted at the end.
 * @param vnode VNode.
 * @param context Current context.
 * @returns Rendered DOM Node.
 */
function _renderVNode(parent: Node, refChild: Node | null, vnode: VNode, context: {}): Node {
  return _renderIntoAndAttach(parent, refChild, vnode, context);
}

/**
 * Sync VNode entry point tryCatch wrapper.
 *
 * @param parent Parent DOM node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param dirtyContext Dirty context.
 */
export function syncVNode(parent: Node, a: VNode, b: VNode, context: {}, dirtyContext: boolean): void {
  if (DEBUG) {
    setInitialNestingState(parent as Element);
  }
  _syncVNode(parent, a, b, context, dirtyContext);
}

/**
 * Sync VNode entry point. Sync VNode with a new one or replace when they aren't compatible.
 *
 * @param parent Parent node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param dirtyContext Dirty context.
 */
function _syncVNode(parent: Node, a: VNode, b: VNode, context: {}, dirtyContext: boolean): void {
  _sync(parent, a, b, context, dirtyContext, true);
}

/**
 * Remove VNode entry point tryCatch wrapper.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
export function removeVNode(parent: Node, node: VNode): void {
  _removeVNode(parent, node);
}

/**
 * Remove VNode entry point.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
function _removeVNode(parent: Node, node: VNode): void {
  nodeRemoveChild(parent, getDOMInstanceFromVNode(node)!);
  _detach(node);
}

/**
 * Dirty checking entry point.
 *
 * @param parent Parent DOM Node.
 * @param vnode Virtual DOM Node.
 * @param context Context.
 * @param dirtyContext Dirty context.
 */
export function dirtyCheck(parent: Node, vnode: VNode, context: {}, dirtyContext: boolean): void {
  if (DEBUG) {
    setInitialNestingState(parent as Element);
  }
  _dirtyCheck(parent, vnode, context, dirtyContext);
}

/**
 * Recursively attach all nodes.
 *
 * @param vnode VNode.
 */
function _attach(vnode: VNode): void {
  const flags = vnode._flags;

  if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ElementPropsEvents)) !== 0) {
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = vnode._children as VNode;
      do {
        _attach(child!);
        child = child._next;
      } while (child !== null);
    }
    if ((flags & VNodeFlags.ElementPropsEvents) !== 0) {
      attachEvents(vnode._events!);
    }
  } else if ((flags & VNodeFlags.Component) !== 0) {
    if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      (vnode._instance as Component<any>).attached();
    }
    _attach(vnode._children as VNode);
  }
}

/**
 * Recursively detach all nodes.
 *
 * @param vnode VNode.
 */
function _detach(vnode: VNode): void {
  const flags = vnode._flags;

  if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ElementPropsEvents)) !== 0) {
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = vnode._children as VNode;
      do {
        _detach(child!);
        child = child._next;
      } while (child !== null);
    }
    if ((flags & VNodeFlags.ElementPropsEvents) !== 0) {
      detachEvents(vnode._events!);
    }
  } else if ((flags & VNodeFlags.Component) !== 0) {
    _detach(vnode._children as VNode);
    if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      const component = vnode._instance as Component<any>;
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
function _dirtyCheck(parent: Node, vnode: VNode, context: {}, dirtyContext: boolean): number {
  const flags = vnode._flags;
  let deepUpdate = 0;
  let children: VNode | null | undefined;
  let instance: Node | Component<any> | {} | undefined;

  if ((flags & (VNodeFlags.DisabledDirtyChecking | VNodeFlags.ChildrenVNode | VNodeFlags.Component)) > 0) {
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      instance = vnode._instance as Node;
      children = vnode._children as VNode;
      do {
        deepUpdate |= _dirtyCheck(instance as Node, children, context, dirtyContext);
        children = children._next;
      } while (children !== null);
    } else {
      if ((flags & VNodeFlags.StatefulComponent) !== 0) {
        instance = vnode._instance as Component<any>;
        children = vnode._children as VNode;
        if (((instance as Component<any>).flags & ComponentFlags.Dirty) !== 0) {
          const newRoot = vnode._children = (instance as Component<any>).render();
          _sync(parent, children, newRoot, context, dirtyContext, true);
          (instance as Component<any>).flags &= ~ComponentFlags.Dirty;
          (instance as Component<any>).updated(true);
          deepUpdate = 1;
        } else {
          deepUpdate = _dirtyCheck(parent, children, context, dirtyContext);
          if (deepUpdate !== 0) {
            (instance as Component<any>).updated(false);
          }
        }
      } else { // (flags & VNodeFlags.ComponentFunction)
        if ((flags & VNodeFlags.Connect) !== 0) {
          const connect = vnode._tag as ConnectDescriptor<any, any, {}>;
          instance = vnode._instance as {};
          const selectData = connect.select(instance, vnode._props, context);
          children = vnode._children as VNode;
          if (instance === selectData) {
            deepUpdate = _dirtyCheck(
              parent,
              children as VNode,
              context,
              dirtyContext,
            );
          } else {
            deepUpdate = 1;
            vnode._children = connect.render(selectData);
            vnode._instance = selectData;
            _sync(
              parent,
              children as VNode,
              vnode._children as VNode,
              context,
              dirtyContext,
              true,
            );
          }
        } else {
          if ((flags & VNodeFlags.UpdateContext) !== 0) {
            if (dirtyContext === true) {
              vnode._instance = Object.assign({}, context, vnode._props);
            }
            context = vnode._instance as {};
          }
          deepUpdate = _dirtyCheck(
            parent,
            vnode._children as VNode,
            context,
            dirtyContext,
          );
        }
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
    node = node._next;
  } while (node !== null);
}

/**
 * Remove child.
 *
 * `detach` lifecycle methods will be invoked for removed node and its subtree.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
function _removeChild(parent: Node, node: VNode): void {
  nodeRemoveChild(parent, getDOMInstanceFromVNode(node)!);
  _detach(node);
}

/**
 * Set value for HTMLInputElement.
 *
 * When value has a string type it is assigned to `value` property, otherwise it is assigned to `checked` property.
 *
 * @param input HTMLInputElement.
 * @param value Value.
 */
function _setInputValue(input: HTMLInputElement, value: string | boolean | null): void {
  if (typeof value === "string") {
    input.value = value;
  } else {
    input.checked = value as boolean;
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
  if (DEBUG) {
    if (vnode._instance !== null) {
      throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
        "clone VNode with `cloneVNode`.");
    }
  }

  const flags = vnode._flags;
  let instance: Node | Component<any> | null = null;
  let node: Node;

  if ((flags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
    // Push nesting state and check for nesting violation.
    const _prevNestingStateParentTagName = nestingStateParentTagName();
    const _prevNestingStateAncestorFlags = nestingStateAncestorFlags();

    if ((flags & VNodeFlags.Text) !== 0) {
      if (DEBUG) {
        pushNestingState("$t");
        checkNestingViolation();
      }
      node = document.createTextNode(vnode._children as string);
    } else { // (flags & VNodeFlags.Element)
      const svg = (flags & VNodeFlags.SvgElement) !== 0;
      if ((flags & VNodeFlags.ElementFactory) === 0) {
        const tagName = vnode._tag as string;
        if (DEBUG) {
          pushNestingState(tagName);
          checkNestingViolation();
        }

        if ((flags & (VNodeFlags.InputElement | VNodeFlags.ButtonElement | VNodeFlags.SvgElement)) !== 0) {
          if (svg === true) {
            node = document.createElementNS(SVG_NAMESPACE, tagName);
          } else {
            node = document.createElement(((flags & VNodeFlags.InputElement) !== 0) ? "input" : "button");
            /**
             * Default value for input element type is "text", so we can just ignore assigning it for text inputs.
             * Factory function for input text has an empty string as a tag value.
             */
            if (tagName !== "") {
              /**
               * #quirks
               *
               * It is important that we assign `type` before any other properties. IE11 will remove assigned
               * `value` when `type` is assigned.
               */
              (node as HTMLInputElement).type = tagName;
            }
          }
        } else {
          node = document.createElement(tagName);
        }
      } else {
        const factory = vnode._tag as VNode;
        if (DEBUG) {
          pushNestingState(factory._tag as string);
          checkNestingViolation();
        }

        if (factory._instance === null) {
          _render(parent, factory, context);
        }
        node = nodeCloneNode(factory._instance as Node);
      }

      if ((flags & VNodeFlags.Autofocus) !== 0) {
        autofocus(node as Element);
      }

      if (vnode._className !== void 0) {
        /**
         * SVGElement.className returns `SVGAnimatedString`
         */
        if (svg === true) {
          elementSetAttribute(node as Element, "class", vnode._className);
        } else {
          (node as Element).className = vnode._className;
        }
      }

      if (vnode._props !== null) {
        syncDOMAttrs(node as Element, svg, null, vnode._props);
      }
      if (vnode._style !== null) {
        syncStyle(node as HTMLElement, null, vnode._style);
      }
      if (vnode._events !== null) {
        setEventHandlersToDOMNode(node as Element, vnode._events);
      }

      let children = vnode._children;
      if (children !== null) {
        if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
          children = children as VNode;
          do {
            nodeInsertBefore(node, _render(node, children, context), null);
            children = children._next;
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
    }

    instance = node;
    if (DEBUG) {
      restoreNestingState(_prevNestingStateParentTagName, _prevNestingStateAncestorFlags);
    }
  } else { // (flags & VNodeFlags.Component)
    if ((flags & VNodeFlags.StatefulComponent) !== 0) {
      const component = instance = new (vnode._tag as StatefulComponent<any>)(vnode._props);
      const root = vnode._children = component.render();
      node = _render(parent, root, context);
    } else { // (flags & VNodeFlags.ComponentFunction)
      if ((flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
        if ((flags & VNodeFlags.Connect) !== 0) {
          const connect = (vnode._tag as ConnectDescriptor<any, any, {}>);
          const selectData = instance = connect.select(null, vnode._props, context);
          vnode._children = connect.render(selectData);
        } else {
          context = instance = Object.assign({}, context, vnode._props);
        }
      } else {
        vnode._children = (vnode._tag as StatelessComponent<any>).render(vnode._props);
      }
      node = _render(
        parent,
        vnode._children as VNode,
        context,
      );
    }
  }

  vnode._instance = instance;

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
function _renderIntoAndAttach(
  parent: Node,
  refChild: Node | null,
  vnode: VNode,
  context: {},
): Node {
  const node = _render(parent, vnode, context);
  nodeInsertBefore(parent, node, refChild);
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
    (a._key === b._key) &&
    ((a._flags ^ b._flags) & VNodeFlags.Key) === 0
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
 * @param checkKeys Check vnode keys.
 */
function _sync(parent: Node, a: VNode, b: VNode, context: {}, dirtyContext: boolean, checkKeys: boolean): void {
  if (a === b) {
    _dirtyCheck(parent, b, context, dirtyContext);
    return;
  }

  if (DEBUG) {
    if (b._instance !== null) {
      throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times");
    }
  }

  let instance;
  const bFlags = b._flags;
  if (
    (((a._flags ^ b._flags) & VNodeFlags.Syncable) === 0) &&
    (
      (a._flags & (
        VNodeFlags.ElementFactory |
        VNodeFlags.StatelessComponent |
        VNodeFlags.StatefulComponent |
        VNodeFlags.Connect
      )) === 0 ||
      a._tag === b._tag
    ) &&
    (checkKeys === false || a._key === b._key)
  ) {
    b._instance = instance = a._instance;

    if ((bFlags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
      if ((bFlags & VNodeFlags.Text) !== 0) {
        if (a._children !== b._children) {
          (instance as Text).nodeValue = b._children as string;
        }
      } else { // (flags & VNodeFlags.Element)
        const svg = (bFlags & VNodeFlags.SvgElement) !== 0;

        if (a._className !== b._className) {
          const className = b._className === void 0 ? "" : b._className;
          if (svg === true) {
            elementSetAttribute(instance as Element, "class", className);
          } else {
            (instance as Element).className = className;
          }
        }

        if (a._props !== b._props) {
          syncDOMAttrs(instance as Element, svg, a._props, b._props);
        }
        if (a._style !== b._style) {
          syncStyle(instance as HTMLElement, a._style, b._style);
        }
        if (a._events !== b._events) {
          syncEvents(a._events, b._events);
          setEventHandlersToDOMNode(instance as Element, b._events);
        }

        const aChild = a._children;
        let bChild = b._children;
        if (aChild !== bChild) {
          const aFlags = a._flags;
          if (aChild === null) {
            if ((bFlags & VNodeFlags.ChildrenVNode) !== 0) {
              bChild = bChild as VNode;
              do {
                _renderIntoAndAttach(instance as Element, null, bChild, context);
                bChild = bChild._next!;
              } while (bChild !== null);
            } else if ((bFlags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement)) !== 0) {
              _setInputValue(instance as Element as HTMLInputElement, bChild as string | boolean);
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
        const oldProps = a._props;
        const newProps = b._props;
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

        const oldRoot = a._children as VNode;
        if (
          ((component.flags & ComponentFlags.Dirty) !== 0) ||
          (component.shouldUpdate(oldProps, newProps) === true)
        ) {
          const newRoot = b._children = component.render();
          _sync(parent, oldRoot, newRoot, context, dirtyContext, true);
          component.flags &= ~ComponentFlags.Dirty;
          component.updated(true);
        } else {
          b._children = a._children;
          if (_dirtyCheck(parent, oldRoot, context, dirtyContext) !== 0) {
            component.updated(false);
          }
        }
      } else { // (flags & VNodeFlags.ComponentFunction)
        const sc = b._tag as StatelessComponent<any>;

        if ((bFlags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
          if ((bFlags & VNodeFlags.Connect) !== 0) {
            const connect = b._tag as ConnectDescriptor<any, any, {}>;
            const prevSelectData = instance;
            const selectData = connect.select(prevSelectData, b._props, context);
            b._instance = selectData;
            if (prevSelectData === selectData) {
              b._children = a._children;
              _dirtyCheck(
                parent,
                b,
                context,
                dirtyContext,
              );
            } else {
              b._children = connect.render(selectData);
              _sync(
                parent,
                a._children as VNode,
                b._children as VNode,
                context,
                dirtyContext,
                true,
              );
            }
          } else {
            if ((dirtyContext === true) || (a._props !== b._props)) {
              dirtyContext = true;
              context = b._instance = Object.assign({}, context, b._props);
            } else {
              context = b._instance = instance as {};
            }
            _sync(
              parent,
              a._children as VNode,
              b._children as VNode,
              context,
              dirtyContext,
              true,
            );
          }
        } else {
          if (
            (a._props !== b._props) &&
            ((bFlags & VNodeFlags.ShouldUpdateHint) === 0 || sc.shouldUpdate!(a._props, b._props) === true)
          ) {
            const oldRoot = a._children as VNode;
            const newRoot = b._children = sc.render(b._props);
            _sync(parent, oldRoot, newRoot, context, dirtyContext, true);
          } else {
            b._children = a._children;
            _dirtyCheck(parent, b._children as VNode, context, dirtyContext);
          }
        }
      }
    }
  } else {
    instance = _render(parent, b, context);
    nodeReplaceChild(parent, instance, getDOMInstanceFromVNode(a)!);
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
 * @param a Old VNode list.
 * @param b New VNode list.
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
  const aLastNode = aFirstNode._prev!;
  const bLastNode = bFirstNode._prev!;
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
      _sync(parent, aStartNode!, bStartNode!, context, dirtyContext, false);
      synced++;
      if (aStartNode === aEndNode) {
        finished |= 1;
      } else {
        aStartNode = aStartNode!._next;
      }
      if (bStartNode === bEndNode) {
        finished |= 2;
      } else {
        bStartNode = bStartNode!._next;
      }
      if (finished) {
        break outer;
      }
    }

    // Sync nodes with the same key at the end.
    while (_eqKeys(aEndNode, bEndNode) === true) {
      _sync(parent, aEndNode, bEndNode, context, dirtyContext, false);
      synced++;
      if (aStartNode === aEndNode) {
        finished |= 1;
      } else {
        aEndNode = aEndNode._prev;
      }
      if (bStartNode === bEndNode) {
        finished |= 2;
      } else {
        bEndNode = bEndNode._prev;
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
        next = bEndNode._next === null ? null : getDOMInstanceFromVNode(bEndNode._next!);
        do {
          _renderIntoAndAttach(parent, next, bStartNode!, context);
          bStartNode = bStartNode!._next;
        } while (bStartNode !== bEndNode._next);
      } else {
        // All nodes from b are synced, remove the rest from a.
        do {
          _removeChild(parent, aStartNode!);
          aStartNode = aStartNode!._next;
        } while (aStartNode !== aEndNode._next);
      }
    }
  } else { // Step 2
    // Inner length after prefix/suffix optimization.
    let aInnerLength = 0;
    let bInnerLength = 0;

    // Flag indicating that some node should be moved.
    let moved = false;

    // Reverse indexes for keys.
    let keyIndex: Map<any, number> | undefined;
    let positionKeyIndex: Map<number, number> | undefined;

    bNode = bStartNode;
    do {
      if (bNode!._flags & VNodeFlags.Key) {
        if (keyIndex === undefined) {
          keyIndex = new Map<any, number>();
        }
        keyIndex.set(bNode!._key, bInnerLength);
      } else {
        if (positionKeyIndex === undefined) {
          positionKeyIndex = new Map<number, number>();
        }
        positionKeyIndex.set(bNode!._key, bInnerLength);
      }
      bInnerLength++;
      bNode = bNode!._next;
    } while (bNode !== bEndNode._next);

    // Mark all nodes as inserted.
    const bArray = new Array<VNode<any>>(bInnerLength);
    const sources = new Array<number>(bInnerLength).fill(-1);

    bNode = bStartNode;
    for (i = 0; i < bInnerLength; i++) {
      bArray[i] = bNode!;
      bNode = bNode!._next;
    }

    let innerSynced = 0;
    i = 0;
    aNode = aStartNode;
    do {
      if (aNode!._flags & VNodeFlags.Key) {
        j = keyIndex ? keyIndex.get(aNode!._key) : undefined;
      } else {
        j = positionKeyIndex ? positionKeyIndex.get(aNode!._key) : undefined;
      }

      if (j === undefined) {
        aNode!._key = null;
      } else {
        sources[j] = aInnerLength;
        if (i > j) {
          moved = true;
        } else {
          i = j;
        }
        bNode = bArray[j];
        _sync(parent, aNode!, bNode, context, dirtyContext, false);
        innerSynced++;
      }
      aInnerLength++;
      aNode = aNode!._next;
    } while (aNode !== aEndNode._next);

    if (!synced && !innerSynced) {
      // Noone is synced, remove all children with one dom op.
      _removeAllChildren(parent, aFirstNode);
      while (bStartNode !== bEndNode._next) {
        _renderIntoAndAttach(parent, null, bStartNode!, context);
        bStartNode = bStartNode!._next;
      }
    } else {
      i = aInnerLength - innerSynced;
      while (i > 0) {
        if (aStartNode!._key === null) {
          _removeChild(parent, aStartNode!);
          i--;
        }
        aStartNode = aStartNode!._next;
      }

      // Step 3
      if (moved) {
        const seq = lis(sources);
        j = seq.length - 1;
        bNode = bEndNode;
        for (i = bInnerLength - 1; i >= 0; i--) {
          if (sources[i] === -1) {
            next = bNode._next === null ? null : getDOMInstanceFromVNode(bNode._next);
            _renderIntoAndAttach(parent, next, bNode!, context);
          } else {
            if (j < 0 || i !== seq[j]) {
              next = bNode._next === null ? null : getDOMInstanceFromVNode(bNode._next);
              nodeInsertBefore(parent, getDOMInstanceFromVNode(bNode)!, next);
            } else {
              j--;
            }
          }
          bNode = bNode._prev;
        }
      } else if (innerSynced !== bInnerLength) {
        bNode = bEndNode;
        for (i = bInnerLength - 1; i >= 0; i--) {
          if (sources[i] === -1) {
            next = bNode._next === null ? null : getDOMInstanceFromVNode(bNode._next);
            _renderIntoAndAttach(parent, next, bNode, context);
          }
          bNode = bNode._prev;
        }
      }
    }
  }
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

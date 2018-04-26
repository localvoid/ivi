/**
 * DO NOT MOVE THIS FUNCTIONS TO SEPARATE MODULES!
 *
 * There are so many circular dependencies between functions in this module, so just leave it all here instead of
 * creating many circular dependencies between JS modules.
 */

import { DEV } from "ivi-vars";
import { SVG_NAMESPACE } from "ivi-core";
import {
  setInnerHTML, nodeRemoveChild, nodeInsertBefore, nodeReplaceChild, elementSetAttribute,
  nodeCloneNode,
} from "ivi-dom";
import { autofocus } from "ivi-scheduler";
import { setEventHandlersToDOMNode, syncEvents, attachEvents, detachEvents } from "ivi-events";
import {
  setInitialNestingState, pushNestingState, restoreNestingState, checkNestingViolation, nestingStateAncestorFlags,
  nestingStateParentTagName,
} from "../dev_mode/html_nesting_rules";
import {
  stackTracePushComponent, stackTracePopComponent, stackTraceReset, stackTraceAugment,
} from "../dev_mode/stack_trace";
import { VNodeFlags, ComponentFlags, SyncFlags } from "./flags";
import { VNode, getDOMInstanceFromVNode } from "./vnode";
import { ConnectDescriptor } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";
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
  if (DEV) {
    setInitialNestingState(parent as Element);

    try {
      return _renderVNode(parent, refChild, vnode, context);
    } catch (e) {
      stackTraceAugment(e);
      stackTraceReset();
      throw e;
    }
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
  return vNodeRenderIntoAndAttach(parent, refChild, vnode, context, SyncFlags.Attached);
}

/**
 * Sync VNode entry point tryCatch wrapper.
 *
 * @param parent Parent DOM node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param syncFlags Sync flags.
 */
export function syncVNode(parent: Node, a: VNode, b: VNode, context: {}, syncFlags: SyncFlags): void {
  if (DEV) {
    setInitialNestingState(parent as Element);

    try {
      _syncVNode(parent, a, b, context, syncFlags);
      return;
    } catch (e) {
      stackTraceAugment(e);
      stackTraceReset();
      throw e;
    }
  }
  _syncVNode(parent, a, b, context, syncFlags);
}

/**
 * Sync VNode entry point. Sync VNode with a new one or replace when they aren't compatible.
 *
 * @param parent Parent node.
 * @param a Old VNode.
 * @param b New VNode.
 * @param context Current context.
 * @param syncFlags Sync flags.
 */
function _syncVNode(parent: Node, a: VNode, b: VNode, context: {}, syncFlags: SyncFlags): void {
  vNodeSync(parent, a, b, context, syncFlags);
}

/**
 * Remove VNode entry point tryCatch wrapper.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 */
export function removeVNode(parent: Node, node: VNode): void {
  if (DEV) {
    try {
      _removeVNode(parent, node);
      return;
    } catch (e) {
      stackTraceAugment(e);
      stackTraceReset();
      throw e;
    }
  }
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
  vNodeDetach(node, SyncFlags.Dispose | SyncFlags.Attached);
}

/**
 * Update Components entry point.
 *
 * @param parent Parent DOM Node.
 * @param vnode Virtual DOM Node.
 * @param context Context.
 * @param syncFlags Sync Flags.
 */
export function updateComponents(parent: Node, vnode: VNode, context: {}, syncFlags: SyncFlags): void {
  if (DEV) {
    setInitialNestingState(parent as Element);

    try {
      vNodeDirtyCheck(parent, vnode, context, syncFlags | SyncFlags.DirtyComponent);
      return;
    } catch (e) {
      stackTraceAugment(e);
      stackTraceReset();
      throw e;
    }
  }
  vNodeDirtyCheck(parent, vnode, context, syncFlags | SyncFlags.DirtyComponent);
}

/**
 * Recursively attach all nodes.
 *
 * @param vnode VNode.
 */
function vNodeAttach(vnode: VNode): void {
  const flags = vnode._flags;

  if ((flags & VNodeFlags.Element) !== 0) {
    if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
      let children = vnode._children;
      if ((flags & VNodeFlags.ChildrenArray) !== 0) {
        children = children as VNode[];
        for (let i = 0; i < children.length; ++i) {
          vNodeAttach(children[i]);
        }
      } else {
        vNodeAttach(children as VNode);
      }
    }
    if ((flags & VNodeFlags.ElementPropsEvents) !== 0) {
      attachEvents(vnode._events!);
    }
  } else if ((flags & VNodeFlags.Component) !== 0) {
    stackTracePushComponent(vnode);
    if ((flags & VNodeFlags.ComponentClass) !== 0) {
      const component = vnode._instance as Component<any>;

      if (DEV) {
        if ((component.flags & ComponentFlags.Attached) !== 0) {
          throw new Error("Failed to attach Component: component is already attached.");
        }
      }

      component.flags |= ComponentFlags.Attached;
      component.attached();
    }
    vNodeAttach(vnode._children as VNode);
    stackTracePopComponent();
  }
}

/**
 * Recursively detach all nodes.
 *
 * @param vnode VNode.
 * @param syncFlags Sync flags.
 */
function vNodeDetach(vnode: VNode, syncFlags: SyncFlags): void {
  const flags = vnode._flags;

  if ((flags & VNodeFlags.Element) !== 0) {
    if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
      const children = vnode._children;
      if ((flags & VNodeFlags.ChildrenArray) !== 0) {
        vNodeDetachAll(children as VNode[], syncFlags);
      } else {
        vNodeDetach(children as VNode, syncFlags);
      }
    }
    if ((flags & VNodeFlags.ElementPropsEvents) !== 0) {
      detachEvents(vnode._events!);
    }
  } else if ((flags & VNodeFlags.Component) !== 0) {
    stackTracePushComponent(vnode);
    if ((flags & VNodeFlags.KeepAlive) !== 0 &&
      (syncFlags & SyncFlags.Dispose) !== 0 &&
      ((vnode._tag as KeepAliveHandler)(vnode._children as VNode, vnode._props)) !== null) {
      if ((syncFlags & SyncFlags.Attached) !== 0) {
        const node = getDOMInstanceFromVNode(vnode._children as VNode)!;
        const parentNode = node.parentNode;
        if (parentNode !== null) {
          nodeRemoveChild(parentNode, node);
        }
        vNodeDetach(vnode._children as VNode, syncFlags ^ SyncFlags.Dispose);
      }
    } else {
      vNodeDetach(vnode._children as VNode, syncFlags);
      if ((flags & VNodeFlags.ComponentClass) !== 0 &&
        (syncFlags & SyncFlags.Attached) !== 0) {
        const component = vnode._instance as Component<any>;

        if (DEV) {
          if ((component.flags & ComponentFlags.Attached) === 0) {
            throw new Error("Failed to detach Component: component is already detached.");
          }
        }
        component.flags &= ~ComponentFlags.Attached;
        component.detached();
      }
    }
    stackTracePopComponent();
  }
}

/**
 * Detach all nodes and its subtrees.
 *
 * @param vnodes Array of VNodes.
 */
function vNodeDetachAll(vnodes: VNode[], syncFlags: SyncFlags): void {
  for (let i = 0; i < vnodes.length; ++i) {
    vNodeDetach(vnodes[i], syncFlags);
  }
}

/**
 * Recursively perform dirty checking.
 *
 * @param parent Parent DOM Node.
 * @param vnode VNode.
 * @param context New context.
 * @param syncFlags Sync flags.
 */
function vNodeDirtyCheck(parent: Node, vnode: VNode, context: {}, syncFlags: SyncFlags): number {
  const flags = vnode._flags;
  let deepUpdate = 0;
  let children: VNode | VNode[] | undefined;
  let instance: Node | Component<any> | {} | undefined;

  if ((flags & (
    VNodeFlags.DisabledDirtyChecking |
    VNodeFlags.ChildrenVNode |
    VNodeFlags.ChildrenArray |
    VNodeFlags.Component
  )) > 0) {
    if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
      instance = vnode._instance as Node;
      children = vnode._children as VNode | VNode[];
      if ((flags & VNodeFlags.ChildrenArray) !== 0) {
        children = children as VNode[];
        for (let i = 0; i < children.length; ++i) {
          deepUpdate |= vNodeDirtyCheck(instance as Node, children[i], context, syncFlags);
        }
      } else {
        deepUpdate = vNodeDirtyCheck(instance as Node, children as VNode, context, syncFlags);
      }
    } else {
      stackTracePushComponent(vnode);
      if ((flags & VNodeFlags.ComponentClass) !== 0) {
        instance = vnode._instance as Component<any>;
        children = vnode._children as VNode;
        if (((instance as Component<any>).flags & ComponentFlags.Dirty) !== 0) {
          const newRoot = vnode._children = (instance as Component<any>).render();
          vNodeSync(parent, children, newRoot, context, syncFlags);
          (instance as Component<any>).flags &= ~ComponentFlags.Dirty;
          (instance as Component<any>).updated(true);
          deepUpdate = 1;
        } else {
          deepUpdate = vNodeDirtyCheck(parent, children, context, syncFlags);
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
            deepUpdate = vNodeDirtyCheck(
              parent,
              children as VNode,
              context,
              syncFlags,
            );
          } else {
            deepUpdate = 1;
            vnode._children = connect.render(selectData);
            vnode._instance = selectData;
            vNodeSync(
              parent,
              children as VNode,
              vnode._children as VNode,
              context,
              syncFlags,
            );
          }
        } else {
          if ((flags & VNodeFlags.UpdateContext) !== 0) {
            if ((syncFlags & SyncFlags.DirtyContext) !== 0) {
              vnode._instance = Object.assign({}, context, vnode._props);
            }
            context = vnode._instance as {};
          }
          deepUpdate = vNodeDirtyCheck(
            parent,
            vnode._children as VNode,
            context,
            syncFlags,
          );
        }
      }
      stackTracePopComponent();
    }
  }
  return deepUpdate;
}

/**
 * Move node.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to move.
 * @param nextRef Reference to the next node, if it is null, node will be moved to the end.
 */
function vNodeMoveChild(parent: Node, node: VNode, nextRef: Node | null): void {
  nodeInsertBefore(parent, getDOMInstanceFromVNode(node)!, nextRef!);
}

/**
 * Remove all children.
 *
 * `detach` lifecycle methods will be invoked for all children and their subtrees.
 *
 * @param parent Parent DOM node.
 * @param nodes Arrays of VNodes to remove.
 * @param syncFlags Sync flags.
 */
function vNodeRemoveAllChildren(parent: Node, nodes: VNode[], syncFlags: SyncFlags): void {
  parent.textContent = "";
  vNodeDetachAll(nodes, syncFlags | SyncFlags.Dispose);
}

/**
 * Remove child.
 *
 * `detach` lifecycle methods will be invoked for removed node and its subtree.
 *
 * @param parent Parent DOM node.
 * @param node VNode element to remove.
 * @param syncFlags Sync flags.
 */
function vNodeRemoveChild(parent: Node, node: VNode, syncFlags: SyncFlags): void {
  nodeRemoveChild(parent, getDOMInstanceFromVNode(node)!);
  vNodeDetach(node, syncFlags | SyncFlags.Dispose);
}

/**
 * Set value for HTMLInputElement.
 *
 * When value has a string type it is assigned to `value` property, otherwise it is assigned to `checked` property.
 *
 * @param input HTMLInputElement.
 * @param value Value.
 */
function setHTMLInputValue(input: HTMLInputElement, value: string | boolean | null): void {
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
function vNodeRender(parent: Node, vnode: VNode, context: {}): Node {
  if (DEV) {
    if (vnode._instance !== null) {
      throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
        "clone VNode with `cloneVNode`.");
    }
  }

  const flags = vnode._flags;
  let instance: Node | Component<any> | null = null;
  let node: Node;
  let i: number;

  if ((flags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
    // Push nesting state and check for nesting violation.
    const _prevNestingStateParentTagName = nestingStateParentTagName();
    const _prevNestingStateAncestorFlags = nestingStateAncestorFlags();

    if ((flags & VNodeFlags.Text) !== 0) {
      pushNestingState("$t");
      checkNestingViolation();
      node = document.createTextNode(vnode._children as string);
    } else { // (flags & VNodeFlags.Element)
      pushNestingState(vnode._tag as string);
      checkNestingViolation();

      if ((flags & VNodeFlags.ElementFactory) === 0) {
        if ((flags & (VNodeFlags.InputElement | VNodeFlags.ButtonElement | VNodeFlags.SvgElement)) !== 0) {
          if ((flags & VNodeFlags.SvgElement) !== 0) {
            node = document.createElementNS(SVG_NAMESPACE, vnode._tag as string);
          } else {
            if ((flags & VNodeFlags.InputElement) !== 0) {
              node = document.createElement("input");
            } else {
              node = document.createElement("button");
            }
            /**
             * Default value for input element type is "text", so we can just ignore assigning it for text inputs.
             * Factory function for input text has an empty string as a tag value.
             */
            if (vnode._tag !== "") {
              /**
               * #quirks
               *
               * It is important that we assign `type` before any other properties. IE11 will remove assigned
               * `value` when `type` is assigned.
               */
              (node as HTMLInputElement).type = vnode._tag as string;
            }
          }
        } else {
          node = document.createElement(vnode._tag as string);
        }
      } else {
        const factory = vnode._tag as VNode;
        if (factory._instance === null) {
          vNodeRender(parent, factory, context);
        }
        node = nodeCloneNode(factory._instance as Node);
      }

      if ((flags & VNodeFlags.Autofocus) !== 0) {
        autofocus(node as Element);
      }

      if (vnode._className !== null) {
        /**
         * SVGElement.className returns `SVGAnimatedString`
         */
        if ((flags & VNodeFlags.SvgElement) === 0) {
          (node as Element).className = vnode._className;
        } else {
          elementSetAttribute(node as Element, "class", vnode._className);
        }
      }

      if (vnode._props !== null) {
        syncDOMAttrs(node as Element, flags, null, vnode._props);
      }
      if (vnode._style !== null) {
        syncStyle(node as HTMLElement, null, vnode._style);
      }
      if (vnode._events !== null) {
        setEventHandlersToDOMNode(node as Element, vnode._events);
      }

      let children = vnode._children;
      if (children !== null) {
        if ((flags & (VNodeFlags.ChildrenBasic | VNodeFlags.ChildrenArray)) !== 0) {
          if ((flags & VNodeFlags.ChildrenBasic) !== 0) {
            node.textContent = children as string;
          } else {
            children = children as VNode[];
            for (i = 0; i < children.length; ++i) {
              nodeInsertBefore(node, vNodeRender(node, children[i], context), null);
            }
          }
        } else if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
          nodeInsertBefore(node, vNodeRender(node, children as VNode, context), null);
        } else if ((flags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement)) !== 0) {
          /**
           * #quirks
           *
           * It is important that input value is assigned after all properties. It prevents some issues with
           * rounding, etc. `value` should be assigned after `step`, `min` and `max` properties.
           */
          setHTMLInputValue(node as HTMLInputElement, children as string | boolean);
        } else { // (flags & VNodeFlags.UnsafeHTML)
          if (children) {
            setInnerHTML((node as Element), children as string, (flags & VNodeFlags.SvgElement) !== 0);
          }
        }
      }
    }

    instance = node;
    restoreNestingState(_prevNestingStateParentTagName, _prevNestingStateAncestorFlags);
  } else { // (flags & VNodeFlags.Component)
    if ((flags & VNodeFlags.ComponentClass) !== 0) {
      const component = instance = new (vnode._tag as StatefulComponent<any>)(vnode._props);
      stackTracePushComponent(vnode, instance);
      const root = vnode._children = component.render();
      node = vNodeRender(parent, root, context);
    } else { // (flags & VNodeFlags.ComponentFunction)
      stackTracePushComponent(vnode);
      if ((flags & VNodeFlags.KeepAlive) !== 0) {
        const keepAlive = vnode._tag as KeepAliveHandler;
        const prev = keepAlive(null, vnode._props);
        if (prev !== null) {
          vNodeSync(
            parent,
            prev as VNode,
            vnode._children as VNode,
            context,
            SyncFlags.DirtyContext,
          );
          node = getDOMInstanceFromVNode(vnode._children as VNode)!;
        } else {
          node = vNodeRender(
            parent,
            vnode._children as VNode,
            context,
          );
        }
      } else {
        if ((flags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
          if ((flags & VNodeFlags.Connect) !== 0) {
            const connect = (vnode._tag as ConnectDescriptor<any, any, {}>);
            const selectData = vnode._instance = connect.select(null, vnode._props, context);
            vnode._children = connect.render(selectData);
          } else {
            context = instance = Object.assign({}, context, vnode._props);
          }
        } else {
          vnode._children = (vnode._tag as StatelessComponent<any>).render(vnode._props);
        }
        node = vNodeRender(
          parent,
          vnode._children as VNode,
          context,
        );
      }
    }
    stackTracePopComponent();
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
 * @param syncFlags Sync flags.
 * @returns Rendered DOM Node.
 */
function vNodeRenderIntoAndAttach(
  parent: Node,
  refChild: Node | null,
  vnode: VNode,
  context: {},
  syncFlags: SyncFlags,
): Node {
  const node = vNodeRender(parent, vnode, context);
  nodeInsertBefore(parent, node, refChild);
  if ((syncFlags & SyncFlags.Attached) !== 0) {
    vNodeAttach(vnode);
  }
  return node;
}

/**
 * Check if two nodes can be synced.
 *
 * Two nodes can be synced when their flags and tags are identical.
 *
 * @param a Old VNode.
 * @param b New VNode.
 * @returns true if nodes can be synced.
 */
function vNodeCanSync(a: VNode, b: VNode): boolean {
  return (
    (((a._flags ^ b._flags) & VNodeFlags.Syncable) === 0) &&
    (
      (a._flags & (
        VNodeFlags.ElementFactory |
        VNodeFlags.ComponentFunction |
        VNodeFlags.ComponentClass |
        VNodeFlags.Connect |
        VNodeFlags.KeepAlive
      )) === 0 ||
      a._tag === b._tag
    ) &&
    a._key === b._key
  );
}

/**
 * Check if two nodes has equal keys.
 *
 * @param a VNode.
 * @param b VNode.
 * @returns true if nodes has equal keys.
 */
function vNodeEqualKeys(a: VNode, b: VNode): boolean {
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
 * @param syncFlags Sync flags.
 */
function vNodeSync(parent: Node, a: VNode, b: VNode, context: {}, syncFlags: SyncFlags): void {
  if (a === b) {
    vNodeDirtyCheck(parent, b, context, syncFlags);
    return;
  }

  if (DEV) {
    if (b._instance !== null) {
      throw new Error("VNode is already have a reference to an instance. VNodes can't be used mutliple times, " +
        "clone VNode with `cloneVNode` function.");
    }
  }

  let instance;
  const bFlags = b._flags;
  if (vNodeCanSync(a, b) === true) {
    b._instance = instance = a._instance;

    if ((bFlags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
      if ((bFlags & VNodeFlags.Text) !== 0) {
        if (a._children !== b._children) {
          (instance as Text).nodeValue = b._children as string;
        }
      } else { // (flags & VNodeFlags.Element)
        if (a._className !== b._className) {
          const className = b._className === null ? "" : b._className;
          if ((bFlags & VNodeFlags.SvgElement) === 0) {
            (instance as Element).className = className;
          } else {
            elementSetAttribute(instance as Element, "class", className);
          }
        }

        if (a._props !== b._props) {
          syncDOMAttrs(instance as Element, bFlags, a._props, b._props);
        }
        if (a._style !== b._style) {
          syncStyle(instance as HTMLElement, a._style, b._style);
        }
        if (a._events !== b._events) {
          if ((syncFlags & SyncFlags.Attached) !== 0) {
            syncEvents(a._events, b._events);
          }
          setEventHandlersToDOMNode(instance as Element, b._events);
        }

        if (a._children !== b._children) {
          syncChildren(
            instance as Element,
            a._flags,
            bFlags,
            a._children as VNode[] | VNode | string | number | boolean,
            b._children as VNode[] | VNode | string | number | boolean,
            context,
            syncFlags,
          );
        }
      }
    } else { // (flags & VNodeFlags.Component)
      stackTracePushComponent(b);
      if ((bFlags & VNodeFlags.ComponentClass) !== 0) {
        const component = instance as Component<any>;
        // Update component props
        const oldProps = a._props;
        const newProps = b._props;
        let propsChanged = 0;
        if (component.isPropsChanged(oldProps, newProps) === true) {
          propsChanged = 1;
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
        if ((propsChanged | (component.flags & ComponentFlags.Dirty)) !== 0) {
          const newRoot = b._children = component.render();
          vNodeSync(parent, oldRoot, newRoot, context, syncFlags);
          component.flags &= ~ComponentFlags.Dirty;
          component.updated(true);
        } else {
          b._children = a._children;
          if (vNodeDirtyCheck(parent, oldRoot, context, syncFlags) !== 0) {
            component.updated(false);
          }
        }
      } else { // (flags & VNodeFlags.ComponentFunction)
        const sc = b._tag as StatelessComponent<any>;

        if ((bFlags & (VNodeFlags.UpdateContext | VNodeFlags.Connect | VNodeFlags.KeepAlive)) !== 0) {
          if ((bFlags & VNodeFlags.Connect) !== 0) {
            const connect = b._tag as ConnectDescriptor<any, any, {}>;
            const prevSelectData = instance;
            const selectData = connect.select(prevSelectData, b._props, context);
            b._instance = selectData;
            if (prevSelectData === selectData) {
              b._children = a._children;
              vNodeDirtyCheck(
                parent,
                b,
                context,
                syncFlags,
              );
            } else {
              b._children = connect.render(selectData);
              vNodeSync(
                parent,
                a._children as VNode,
                b._children as VNode,
                context,
                syncFlags,
              );
            }
          } else {
            if ((bFlags & VNodeFlags.UpdateContext) !== 0) {
              if ((syncFlags & SyncFlags.DirtyContext) !== 0 ||
                (a._props !== b._props)) {
                syncFlags |= SyncFlags.DirtyContext;
                context = b._instance = Object.assign({}, context, b._props);
              } else {
                context = b._instance = instance as {};
              }
            }
            vNodeSync(
              parent,
              a._children as VNode,
              b._children as VNode,
              context,
              syncFlags,
            );
          }
        } else {
          if (
            ((bFlags & VNodeFlags.CheckChangedProps) === 0 && a._props !== b._props) ||
            ((bFlags & VNodeFlags.CheckChangedProps) !== 0 && sc.isPropsChanged!(a._props, b._props) === true)
          ) {
            const oldRoot = a._children as VNode;
            const newRoot = b._children = sc.render(b._props);
            vNodeSync(parent, oldRoot, newRoot, context, syncFlags);
          } else {
            b._children = a._children;
            vNodeDirtyCheck(parent, b._children as VNode, context, syncFlags);
          }
        }
      }
      stackTracePopComponent();
    }
  } else {
    instance = vNodeRender(parent, b, context);
    nodeReplaceChild(parent, instance, getDOMInstanceFromVNode(a)!);
    if ((syncFlags & SyncFlags.Attached) !== 0) {
      vNodeDetach(a, syncFlags | SyncFlags.Dispose);
      vNodeAttach(b);
    }
  }
}

/**
 * Sync old children list with the new one.
 *
 * @param parent Parent node.
 * @param aParentFlags Old parent VNode flags.
 * @param bParentFlags New parent VNode flags.
 * @param a Old VNode list.
 * @param b New VNode list.
 * @param context Current context.
 * @param syncFlags Sync flags.
 */
function syncChildren(
  parent: Node,
  aParentFlags: VNodeFlags,
  bParentFlags: VNodeFlags,
  a: VNode[] | VNode | string | number | boolean,
  b: VNode[] | VNode | string | number | boolean,
  context: {},
  syncFlags: SyncFlags,
): void {
  let i = 0;
  let synced;
  let node;

  if (a === null) {
    if ((bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.ChildrenArray)) !== 0) {
      if ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0) {
        parent.textContent = b as string;
      } else {
        b = b as VNode[];
        for (; i < b.length; ++i) {
          vNodeRenderIntoAndAttach(parent, null, b[i], context, syncFlags);
        }
      }
    } else if ((bParentFlags & VNodeFlags.ChildrenVNode) !== 0) {
      vNodeRenderIntoAndAttach(parent, null, b as VNode, context, syncFlags);
    } else if ((bParentFlags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement)) !== 0) {
      setHTMLInputValue(parent as HTMLInputElement, b as string | boolean);
    } else { // (bParentFlags & VNodeFlags.UnsafeHTML)
      if (b) {
        setInnerHTML(parent as Element, b as string, (bParentFlags & VNodeFlags.SvgElement) !== 0);
      }
    }
  } else if (b === null) {
    if ((aParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) !== 0) {
      parent.textContent = "";
    } else if ((aParentFlags & VNodeFlags.ChildrenArray) !== 0) {
      vNodeRemoveAllChildren(parent, a as VNode[], syncFlags);
    } else if ((aParentFlags & VNodeFlags.ChildrenVNode) !== 0) {
      vNodeRemoveChild(parent, a as VNode, syncFlags);
    } else { // (bParentFlags & VNodeFlags.InputElement)
      /**
       * When value/checked isn't specified, we should just ignore it.
       */
    }
  } else {
    if ((aParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) !== 0) {
      if ((bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) !== 0) {
        if ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0) {
          const c = parent.firstChild;
          if (c !== null) {
            c.nodeValue = b as string;
          } else {
            parent.textContent = b as string;
          }
        } else {
          if (b) {
            setInnerHTML((parent as Element), b as string, (bParentFlags & VNodeFlags.SvgElement) !== 0);
          } else {
            parent.textContent = "";
          }
        }
      } else {
        parent.textContent = "";
        if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
          b = b as VNode[];
          for (; i < b.length; ++i) {
            vNodeRenderIntoAndAttach(parent, null, b[i], context, syncFlags);
          }
        } else {
          vNodeRenderIntoAndAttach(parent, null, b as VNode, context, syncFlags);
        }
      }
    } else if ((aParentFlags & VNodeFlags.ChildrenArray) !== 0) {
      a = a as VNode[];
      if ((bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) !== 0) {
        if ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0 || !b) {
          parent.textContent = b as string;
        } else {
          setInnerHTML(parent as Element, b as string, (bParentFlags & VNodeFlags.SvgElement) !== 0);
        }
        vNodeDetachAll(a, syncFlags | SyncFlags.Dispose);
      } else if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
        syncChildrenTrackByKeys(parent, a, b as VNode[], context, syncFlags);
      } else {
        b = b as VNode;
        synced = -1;
        for (i = 0; i < a.length; ++i) {
          node = a[i];
          if (vNodeEqualKeys(node, b) === true) {
            vNodeSync(parent, node, b, context, syncFlags);
            synced = i;
            break;
          }
        }
        if (synced > -1) {
          for (i = 0; i < synced; ++i) {
            vNodeRemoveChild(parent, a[i], syncFlags);
          }
          for (i = synced + 1; i < a.length; ++i) {
            vNodeRemoveChild(parent, a[i], syncFlags);
          }
        } else {
          vNodeRemoveAllChildren(parent, a, syncFlags);
          vNodeRenderIntoAndAttach(parent, null, b, context, syncFlags);
        }
      }
    } else if ((aParentFlags & VNodeFlags.ChildrenVNode) !== 0) {
      a = a as VNode;
      if ((bParentFlags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) !== 0) {
        if ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0 || !b) {
          parent.textContent = b as string;
        } else {
          setInnerHTML(parent as Element, b as string, (bParentFlags & VNodeFlags.SvgElement) !== 0);
        }
        vNodeDetach(a, syncFlags | SyncFlags.Dispose);
      } else if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
        b = b as VNode[];
        synced = -1;
        for (i = 0; i < b.length; ++i) {
          node = b[i];
          if (vNodeEqualKeys(a, node) === true) {
            vNodeSync(parent, a, node, context, syncFlags);
            synced = i;
            break;
          }
        }
        if (synced > -1) {
          const next = getDOMInstanceFromVNode(a);
          for (i = 0; i < synced; ++i) {
            vNodeRenderIntoAndAttach(parent, next, b[i], context, syncFlags);
          }
          for (i = synced + 1; i < b.length; ++i) {
            vNodeRenderIntoAndAttach(parent, null, b[i], context, syncFlags);
          }
        } else {
          vNodeRemoveChild(parent, a, syncFlags);
          for (i = 0; i < b.length; ++i) {
            vNodeRenderIntoAndAttach(parent, null, b[i], context, syncFlags);
          }
        }
      } else {
        vNodeSync(parent, a, b as VNode, context, syncFlags);
      }
    } else { // (aParentFlags & VNodeFlags.InputElement)
      /**
       * Input elements has an internal state with a `value` property, so it should be checked before an
       * assignment to prevent unnecessary events when `value` is the same as the `value` in the internal
       * state.
       *
       * In general we don't want to override behaviour of DOM Elements with an internal state. Assigning props
       * to such elements should be treated as a one-time assignment, so it works almost like `value` attribute,
       * except when a new value is passed down, it can override previous value when it doesn't match the previous
       * one. There is absolutely no reasons to overcomplicate such behaviour just to make it more beatiful like
       * it is a declarative assignment and can't be changed, because in real applications, component that
       * controls this element will always track changes, and when it changes it will invalidate its
       * representation, so everything will stay in-sync.
       */
      if (typeof b === "string") {
        if ((parent as HTMLInputElement).value !== b) {
          (parent as HTMLInputElement).value = b;
        }
      } else {
        (parent as HTMLInputElement).checked = b as boolean;
      }
    }
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
 * @param syncFlags Sync flags.
 */
function syncChildrenTrackByKeys(parent: Node, a: VNode[], b: VNode[], context: {}, syncFlags: SyncFlags): void {
  let aStart = 0;
  let bStart = 0;
  let aEnd = a.length - 1;
  let bEnd = b.length - 1;
  let aStartNode = a[aStart];
  let bStartNode = b[bStart];
  let aEndNode = a[aEnd];
  let bEndNode = b[bEnd];
  let i: number;
  let j: number | undefined;
  let k: number;
  let next: Node | null;
  let aNode: VNode | null;
  let bNode: VNode;

  // Step 1
  outer: while (true) {
    // Sync nodes with the same key at the beginning.
    while (vNodeEqualKeys(aStartNode, bStartNode) === true) {
      vNodeSync(parent, aStartNode, bStartNode, context, syncFlags);
      ++aStart;
      ++bStart;
      if (aStart > aEnd || bStart > bEnd) {
        break outer;
      }
      aStartNode = a[aStart];
      bStartNode = b[bStart];
    }

    // Sync nodes with the same key at the end.
    while (vNodeEqualKeys(aEndNode, bEndNode) === true) {
      vNodeSync(parent, aEndNode, bEndNode, context, syncFlags);
      --aEnd;
      --bEnd;
      if (aStart > aEnd || bStart > bEnd) {
        break outer;
      }
      aEndNode = a[aEnd];
      bEndNode = b[bEnd];
    }

    break;
  }

  if (aStart > aEnd) {
    // All nodes from a are synced, insert the rest from b.
    if (bStart <= bEnd) {
      k = bEnd + 1;
      next = k < b.length ? getDOMInstanceFromVNode(b[k]) : null;
      do {
        vNodeRenderIntoAndAttach(parent, next, b[bStart++], context, syncFlags);
      } while (bStart <= bEnd);
    }
  } else if (bStart > bEnd) {
    // All nodes from b are synced, remove the rest from a.
    do {
      vNodeRemoveChild(parent, a[aStart++], syncFlags);
    } while (aStart <= aEnd);
    // Step 2
  } else {
    const aLength = aEnd - aStart + 1;
    const bLength = bEnd - bStart + 1;

    const aNullable = a as Array<VNode | null>; // will be removed by js optimizing compilers.
    // Mark all nodes as inserted.
    const sources = new Array(bLength);
    for (i = 0; i < bLength; ++i) {
      sources[i] = -1;
    }
    // When lists are small, perform a linear search instead of building an index.
    // 0 - unitialized (lazy initialization)
    // 1 - linear search
    // 2 - hashmap search
    let matchKeyMode = 0;

    let bPositionKeyStart = bStart;
    // When pos === 2147483647, it means that one of the nodes in the wrong position.
    let pos = 0;
    let synced = 0;

    let keyIndex: Map<any, number> | undefined;

    for (i = aStart; i <= aEnd && synced < bLength; ++i) {
      aNode = a[i];

      if ((aNode._flags & VNodeFlags.Key) !== 0) {
        if (matchKeyMode === 0) {
          if ((aLength | bLength) < 32 || bLength < 4) {
            matchKeyMode = 1;
          } else {
            matchKeyMode = 2;
            // Build an index that maps keys to their locations in the new children list.
            for (j = bStart; j <= bEnd; ++j) {
              bNode = b[j];
              if ((bNode._flags & VNodeFlags.Key) !== 0) {
                if (keyIndex === undefined) {
                  keyIndex = new Map<any, number>();
                }
                keyIndex.set(bNode._key, j);
              }
            }
          }
        }
        if (matchKeyMode === 1) {
          for (j = bStart; j <= bEnd; ++j) {
            k = j - bStart;
            if (sources[k] === -1) {
              bNode = b[j];
              if ((bNode._flags & VNodeFlags.Key) !== 0 && aNode._key === bNode._key) {
                pos = (pos > j) ? 2147483647 : j;
                ++synced;
                sources[k] = i;
                aNullable[i] = null;
                vNodeSync(parent, aNode, bNode, context, syncFlags);
                break;
              }
            }
          }
        } else if (keyIndex !== undefined) {
          j = keyIndex.get(aNode._key);
          if (j !== undefined) {
            pos = (pos > j) ? 2147483647 : j;
            ++synced;
            bNode = b[j];
            sources[j - bStart] = i;
            aNullable[i] = null;
            vNodeSync(parent, aNode, bNode, context, syncFlags);
          }
        }
      } else {
        // Matching nodes with implicit keys is always performed with linear search.
        // Because position keys are always in a sorted order, we can just start from the last position and search
        // until implicit key of the new node is larger or equal.
        while (bPositionKeyStart <= bEnd) {
          k = bPositionKeyStart - bStart;
          if (sources[k] === -1) {
            bNode = b[bPositionKeyStart];
            if ((bNode._flags & VNodeFlags.Key) === 0) {
              if (bNode._key >= aNode._key) {
                if (bNode._key === aNode._key) {
                  pos = (pos > bPositionKeyStart) ? 2147483647 : bPositionKeyStart;
                  ++synced;
                  ++bPositionKeyStart;
                  sources[k] = i;
                  aNullable[i] = null;
                  vNodeSync(parent, aNode, bNode, context, syncFlags);
                }
                break;
              }
            }
          }
          ++bPositionKeyStart;
        }
      }
    }

    if (aLength === a.length && synced === 0) {
      // Noone is synced, remove all children with one dom op.
      vNodeRemoveAllChildren(parent, a, syncFlags);
      for (; bStart < bLength; ++bStart) {
        vNodeRenderIntoAndAttach(parent, null, b[bStart], context, syncFlags);
      }
    } else {
      i = aLength - synced;
      while (i > 0) {
        aNode = aNullable[aStart++];
        if (aNode !== null) {
          vNodeRemoveChild(parent, aNode, syncFlags);
          i--;
        }
      }

      // Step 3
      if (pos === 2147483647) {
        const seq = lis(sources);
        j = seq.length - 1;
        k = b.length;
        for (i = bLength - 1; i >= 0; --i) {
          if (sources[i] === -1) {
            pos = i + bStart;
            bNode = b[pos++];
            next = pos < k ? getDOMInstanceFromVNode(b[pos]) : null;
            vNodeRenderIntoAndAttach(parent, next, bNode, context, syncFlags);
          } else {
            if (j < 0 || i !== seq[j]) {
              pos = i + bStart;
              bNode = b[pos++];
              next = pos < k ? getDOMInstanceFromVNode(b[pos]) : null;
              vNodeMoveChild(parent, bNode, next);
            } else {
              --j;
            }
          }
        }
      } else if (synced !== bLength) {
        k = b.length;
        for (i = bLength - 1; i >= 0; --i) {
          if (sources[i] === -1) {
            pos = i + bStart;
            bNode = b[pos++];
            next = pos < k ? getDOMInstanceFromVNode(b[pos]) : null;
            vNodeRenderIntoAndAttach(parent, next, bNode, context, syncFlags);
          }
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

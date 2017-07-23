import { VNodeFlags, SyncFlags } from "../../src/vdom/flags";
import { VNode, getDOMInstanceFromVNode } from "../../src/vdom/vnode";
import { renderVNode, syncVNode, augmentVNode } from "../../src/vdom/implementation";
import { expect } from "iko";

const DEFAULT_CONTEXT = {};

export function frag() {
  return document.createDocumentFragment();
}

export function checkRefs(n: Node, v: VNode<any>) {
  const flags = v._flags;

  expect(getDOMInstanceFromVNode(v)).toBeEqual(n);

  if (flags & VNodeFlags.Component) {
    if (flags & VNodeFlags.ComponentClass) {
      expect(getDOMInstanceFromVNode(v)).toBeEqual(n);
      const root = v._children as VNode<any>;
      if (root) {
        checkRefs(n, root);
      }
    } else {
      const root = v._children as VNode<any>;
      if (root) {
        checkRefs(n, root);
      }
    }
  } else {
    let i = 0;
    let child = n.firstChild;
    if (child) {
      expect(!!(flags & VNodeFlags.Element)).toBeEqual(true);
    }
    while (child) {
      if (flags & VNodeFlags.ChildrenArray) {
        checkRefs(child, (v._children as VNode<any>[])[i++]);
      } else if (flags & VNodeFlags.ChildrenVNode) {
        checkRefs(child, v._children as VNode<any>);
        expect(child.nextSibling).toBeNull();
      }
      child = child.nextSibling;
    }
  }
}

export function startRender(
  fn: (render: (n: VNode<any>) => Node) => void,
  container?: Element | DocumentFragment,
  disableCheckRefs?: boolean,
): void {
  function r(n: VNode<any>): Node {
    return render(n, container, disableCheckRefs);
  }

  if (container === undefined) {
    container = document.createDocumentFragment();
  }

  fn(r);
}

export function render<T extends Node>(
  node: VNode<any>,
  container?: Element | DocumentFragment,
  disableCheckRefs?: boolean,
): T {
  if (!container) {
    container = document.createDocumentFragment();
  }

  const oldRoot = (container as any).__ivi_root as VNode<any> | undefined;
  (container as any).__ivi_root = node;
  if (oldRoot) {
    syncVNode(container, oldRoot, node, DEFAULT_CONTEXT, SyncFlags.Attached);
  } else {
    renderVNode(container, null, node, DEFAULT_CONTEXT);
  }

  const result = getDOMInstanceFromVNode(node) as T;

  if (!disableCheckRefs) {
    checkRefs(result, node);
  }

  return result;
}

export function augment(node: VNode<any>, innerHTML: string, container?: Element): Element {
  if (!container) {
    container = document.createElement("div");
  }

  (container as any).__ivi_root = node;
  container.innerHTML = innerHTML;
  augmentVNode(container, container.firstChild, node, DEFAULT_CONTEXT);
  checkRefs(container.firstChild!, node);

  return container;
}

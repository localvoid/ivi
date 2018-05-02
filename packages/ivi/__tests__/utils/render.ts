import { VNodeFlags } from "../../src/vdom/flags";
import { VNode, getDOMInstanceFromVNode } from "../../src/vdom/vnode";
import { renderVNode, syncVNode } from "../../src/vdom/implementation";

const DEFAULT_CONTEXT = {};

export function frag() {
  return document.createDocumentFragment();
}

export function checkRefs(n: Node, v: VNode) {
  const flags = v._flags;

  expect(getDOMInstanceFromVNode(v)).toBe(n);

  if (flags & VNodeFlags.Component) {
    if (flags & VNodeFlags.StatefulComponent) {
      expect(getDOMInstanceFromVNode(v)).toBe(n);
      const root = v._children as VNode;
      if (root) {
        checkRefs(n, root);
      }
    } else {
      const root = v._children as VNode;
      if (root) {
        checkRefs(n, root);
      }
    }
  } else {
    let i = 0;
    let child = n.firstChild;
    if (child) {
      expect(!!(flags & VNodeFlags.Element)).toBe(true);
    }
    while (child) {
      if (flags & VNodeFlags.ChildrenArray) {
        checkRefs(child, (v._children as VNode[])[i++]);
      } else if (flags & VNodeFlags.ChildrenVNode) {
        checkRefs(child, v._children as VNode);
        expect(child.nextSibling).toBeNull();
      }
      child = child.nextSibling;
    }
  }
}

export function startRender(
  fn: (render: (n: VNode) => Node) => void,
  container?: Element | DocumentFragment,
  disableCheckRefs?: boolean,
): void {
  function r(n: VNode): Node {
    return render(n, container, disableCheckRefs);
  }

  if (container === undefined) {
    container = document.createDocumentFragment();
  }

  fn(r);
}

export function render<T extends Node>(
  node: VNode,
  container?: Element | DocumentFragment,
  disableCheckRefs?: boolean,
): T {
  if (!container) {
    container = document.createDocumentFragment();
  }

  const oldRoot = (container as any).__ivi_root as VNode | undefined;
  (container as any).__ivi_root = node;
  if (oldRoot) {
    syncVNode(container, oldRoot, node, DEFAULT_CONTEXT, false);
  } else {
    renderVNode(container, null, node, DEFAULT_CONTEXT);
  }

  const result = getDOMInstanceFromVNode(node) as T;

  if (!disableCheckRefs) {
    checkRefs(result, node);
  }

  return result;
}

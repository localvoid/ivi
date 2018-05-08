import { VNode, render, getDOMInstanceFromVNode } from "ivi";

export function startRender<T extends Node>(
  fn: (render: (n: VNode) => T) => void,
): void {
  const container = document.createElement("div");
  container.setAttribute("test-container", "");
  document.body.appendChild(container);

  try {
    fn((n: VNode) => {
      render(n, container);
      return getDOMInstanceFromVNode(n) as T;
    });
  } catch (e) {
    throw e;
  } finally {
    try {
      render(null, container);
    } finally {
      container.remove();
    }
  }
}

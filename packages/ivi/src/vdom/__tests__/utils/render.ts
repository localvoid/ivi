import { VNode, render, getDOMNode, setupScheduler, invalidateHandler } from "ivi";

export function startRender<T extends Node>(
  fn: (render: (n: VNode) => T) => void,
): void {
  setupScheduler(invalidateHandler);
  const container = document.createElement("div");
  container.setAttribute("test-container", "");
  document.body.appendChild(container);

  try {
    fn((n: VNode) => {
      render(n, container);
      return getDOMNode(n) as T;
    });
  } finally {
    try {
      render(null, container);
    } finally {
      container.remove();
    }
  }
}

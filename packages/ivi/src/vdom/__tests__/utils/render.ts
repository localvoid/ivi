import { VNode, render, getDOMNode, withNextFrame } from "ivi";

export function startRender<T extends Node>(
  fn: (render: (n: VNode) => T) => void,
): void {
  const container = document.createElement("div");
  container.setAttribute("test-container", "");
  document.body.appendChild(container);

  try {
    fn((n: VNode) => {
      withNextFrame(() => { render(n, container); })();
      return getDOMNode(n) as T;
    });
  } finally {
    try {
      withNextFrame(() => { render(null, container); })();
    } finally {
      container.remove();
    }
  }
}

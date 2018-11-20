import { OpNode, render, withNextFrame } from "ivi";

export function startRender<T extends ChildNode>(
  fn: (render: (n: OpNode | string | number | null) => T) => void,
): void {
  const container = document.createElement("div");
  container.setAttribute("test-container", "");
  document.body.appendChild(container);

  try {
    fn((n: OpNode | string | number | null) => {
      withNextFrame(() => { render(n, container); })();
      return container.firstChild as T;
    });
  } finally {
    try {
      withNextFrame(() => { render(null, container); })();
    } finally {
      container.remove();
    }
  }
}

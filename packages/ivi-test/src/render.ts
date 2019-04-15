import { Op, OpState, render as iviRender, requestDirtyCheck, withNextFrame, box, getDOMNode, Ref } from "ivi";

export function render<T = Node>(op: Op, container: Element) {
  const root = box<OpState | null>(null);
  withNextFrame(() => {
    iviRender(Ref(root, op), container);
  })();

  const stateNode = root.v;

  return {
    stateNode,
    domNode: stateNode === null ? null : getDOMNode(stateNode) as T | null,
  };
}

export function testRender(
  fn: (
    render: (op: Op) => OpState | null,
    dirtyCheck: () => void,
    container: HTMLDivElement,
  ) => void,
): void {
  const root = box<OpState | null>(null);
  const container = document.createElement("div");
  container.setAttribute("test-container", "");
  document.body.appendChild(container);

  try {
    fn(
      (op: Op) => {
        withNextFrame(() => {
          iviRender(
            Ref(root, op),
            container,
          );
        })();
        return root.v;
      },
      withNextFrame(requestDirtyCheck),
      container,
    );
  } finally {
    try {
      withNextFrame(() => {
        iviRender(null, container);
      })();
    } finally {
      document.body.removeChild(container);
    }
  }
}

export function testRenderDOM<T extends ChildNode>(
  fn: (
    render: (op: Op) => T | null,
    dirtyCheck: () => void,
    container: HTMLDivElement,
  ) => void,
): void {
  testRender((r, d, c) => {
    fn(
      (op: Op) => {
        const s = r(op);
        if (s === null) {
          return null;
        }
        return getDOMNode(s) as T | null;
      },
      d,
      c,
    );
  });
}

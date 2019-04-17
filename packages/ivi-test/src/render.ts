import { Op, OpState, render as iviRender, withNextFrame, box, getDOMNode, Ref } from "ivi";

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

import { OpNodeState, box, Ref, findDOMNode } from "ivi";
import { div } from "ivi-html";
import { startRender } from "./utils";

test(`Ref should assign op node state`, () => {
  startRender<HTMLButtonElement>(r => {
    const _ref = box<OpNodeState | null>(null);
    const n = r(
      Ref(
        _ref,
        div(),
      )
    );

    expect(findDOMNode(_ref)).toBe(n);
  });
});

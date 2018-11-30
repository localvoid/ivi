import { OpState, box, Ref, findDOMNode } from "ivi";
import { div } from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`Ref should assign op node state`, () => {
  testRenderDOM<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    const n = r(
      Ref(
        _ref,
        div(),
      )
    );

    expect(_ref).not.toBeNull();
    expect(findDOMNode(_ref)).toBe(n);
  });
});

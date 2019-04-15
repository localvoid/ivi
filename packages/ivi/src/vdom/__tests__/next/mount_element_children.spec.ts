import { useResetModules, useModule, useDOMElement, useDOMOpsCounters } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const domOps = useDOMOpsCounters();
const h = useModule<typeof import("ivi-html")>("ivi-html");
const t = useModule<typeof import("ivi-test")>("ivi-test");
const _ = void 0;

describe("mount element children", () => {
  test("null child", () => {
    const { domNode } = t.render(h.div(_, _, null), c());
    expect(domNode).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("single child", () => {
    const { domNode } = t.render(h.div(_, _, "abc"), c());
    expect(domNode).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });
});

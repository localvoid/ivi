import { useResetModules, useModule, useDOMElement, useDOMOpsCounters } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const domOps = useDOMOpsCounters();
const h = useModule<typeof import("ivi-html")>("ivi-html");
const t = useModule<typeof import("ivi-test")>("ivi-test");

describe("mount fragment", () => {
  test("empty", () => {
    const { domNode } = t.render([], c());
    expect(domNode).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("single child", () => {
    const { domNode } = t.render([h.h1()], c());
    expect(domNode).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("two children", () => {
    const { domNode } = t.render([h.h1(), h.h2()], c());
    expect(domNode).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("null between two children", () => {
    const { domNode } = t.render([h.h1(), null, h.h2()], c());
    expect(domNode).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });
});

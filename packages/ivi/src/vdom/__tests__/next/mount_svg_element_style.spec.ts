import { useResetModules, useModule, useDOMElement } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const s = useModule<typeof import("ivi-svg")>("ivi-svg");
const t = useModule<typeof import("ivi-test")>("ivi-test");
const _ = void 0;

describe("mount element style", () => {
  test("undefined", () => {
    const { domNode } = t.render(s.circle(_, { style: void 0 }), c());
    expect(domNode).toMatchSnapshot();
  });

  test("property with undefined value", () => {
    const { domNode } = t.render(s.circle(_, { style: { top: void 0 } }), c());
    expect(domNode).toMatchSnapshot();
  });

  test("one property", () => {
    const { domNode } = t.render(s.circle(_, { style: { top: "10px" } }), c());
    expect(domNode).toMatchSnapshot();
  });

  test("two properties", () => {
    const { domNode } = t.render(s.circle(_, { style: { top: "10px", left: "20px" } }), c());
    expect(domNode).toMatchSnapshot();
  });
});

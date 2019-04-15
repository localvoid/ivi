import { useResetModules, useModule, useDOMElement } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const h = useModule<typeof import("ivi-html")>("ivi-html");
const t = useModule<typeof import("ivi-test")>("ivi-test");

describe("mount element", () => {
  test("div", () => {
    const { domNode } = t.render(h.div(), c());
    expect(domNode).toMatchSnapshot();
  });
});

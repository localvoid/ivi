import { useResetModules, useModule, useDOMElement } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const ivi = useModule<typeof import("ivi")>("ivi");
const s = useModule<typeof import("ivi-svg")>("ivi-svg");
const t = useModule<typeof import("ivi-test")>("ivi-test");

describe("mount svg element", () => {
  test("circle", () => {
    const { domNode } = t.render<SVGElement>(s.circle(), c());
    expect(domNode!.namespaceURI).toBe(ivi.SVG_NAMESPACE);
    expect(domNode).toMatchSnapshot();
  });
});

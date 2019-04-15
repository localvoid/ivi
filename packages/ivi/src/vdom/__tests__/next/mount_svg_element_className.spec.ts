import { useResetModules, useModule, useDOMElement } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const s = useModule<typeof import("ivi-svg")>("ivi-svg");
const t = useModule<typeof import("ivi-test")>("ivi-test");

describe("mount svg element with class name", () => {
  test("no class name", () => {
    const { domNode } = t.render<SVGElement>(s.circle(), c());
    expect(domNode!.getAttributeNode("class")).toBeNull();
  });

  test("undefined", () => {
    const { domNode } = t.render<SVGElement>(s.circle(void 0), c());
    expect(domNode!.getAttributeNode("class")).toBeNull();
  });

  test("empty string", () => {
    const { domNode } = t.render<SVGElement>(s.circle(""), c());
    expect(domNode!.getAttributeNode("class")).toBeNull();
  });

  test("one class", () => {
    const { domNode } = t.render<SVGElement>(s.circle("a"), c());
    expect(domNode!.classList.length).toBe(1);
    expect(domNode!.classList.contains("a")).toBe(true);
  });

  test("two classes", () => {
    const { domNode } = t.render<SVGElement>(s.circle("a b"), c());
    expect(domNode!.classList.length).toBe(2);
    expect(domNode!.classList.contains("a")).toBe(true);
    expect(domNode!.classList.contains("b")).toBe(true);
  });
});

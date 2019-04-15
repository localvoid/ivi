import { useResetModules, useDOMElement, useModule } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const h = useModule<typeof import("ivi-html")>("ivi-html");
const t = useModule<typeof import("ivi-test")>("ivi-test");

describe("mount element with class name", () => {
  test("no class name", () => {
    const { domNode } = t.render<HTMLElement>(h.div(), c());
    expect(domNode!.getAttributeNode("class")).toBeNull();
  });

  test("undefined", () => {
    const { domNode } = t.render<HTMLElement>(h.div(void 0), c());
    expect(domNode!.getAttributeNode("class")).toBeNull();
  });

  test("empty string", () => {
    const { domNode } = t.render<HTMLElement>(h.div(""), c());
    expect(domNode!.getAttributeNode("class")).toBeNull();
  });

  test("one class", () => {
    const { domNode } = t.render<HTMLElement>(h.div("a"), c());
    expect(domNode!.classList.length).toBe(1);
    expect(domNode!.classList.contains("a")).toBe(true);
  });

  test("two classes", () => {
    const { domNode } = t.render<HTMLElement>(h.div("a b"), c());
    expect(domNode!.classList.length).toBe(2);
    expect(domNode!.classList.contains("a")).toBe(true);
    expect(domNode!.classList.contains("b")).toBe(true);
  });
});

import { useResetDOM, useSpyOn, useDOMElement, useHTML, useSVG, useTest } from "ivi-jest";

useResetDOM();
const root = useDOMElement();
const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
const setClassName = useSpyOn(() => Element.prototype, "className", "set");
const t = useTest();

describe("element className", () => {
  describe("HTML", () => {
    const setter = setClassName;
    const h = useHTML();
    const r = (className?: string) => t.render<HTMLDivElement>(h.div(className), root()).domNode!;

    describe("mount", () => {
      test("undefined", () => {
        const n = r();
        expect(n.getAttribute("class")).toBeNull();
        expect(setter.mock.calls.length).toBe(0);
      });

      test("empty string", () => {
        const n = r("");
        expect(n.getAttribute("class")).toBeNull();
        expect(setter.mock.calls.length).toBe(0);
      });

      test("class", () => {
        const n = r("a");
        expect(n.getAttribute("class")).toBe("a");
        expect(setter.mock.calls.length).toBe(1);
      });
    });

    describe("update", () => {
      test("undefined to undefined", () => {
        r();
        const n = r();
        expect(n.getAttribute("class")).toBeNull();
        expect(setter.mock.calls.length).toBe(0);
      });

      test("undefined to empty string", () => {
        r();
        const n = r("");
        expect(n.getAttribute("class")).toBe("");
        expect(setter.mock.calls.length).toBe(1);
      });

      test("undefined to class", () => {
        r();
        const n = r("a");
        expect(n.getAttribute("class")).toBe("a");
        expect(setter.mock.calls.length).toBe(1);
      });

      test("empty string to undefined", () => {
        r("");
        const n = r();
        expect(n.getAttribute("class")).toBe("");
        expect(setter.mock.calls.length).toBe(1);
      });

      test("empty string to class", () => {
        r("");
        const n = r("a");
        expect(n.getAttribute("class")).toBe("a");
        expect(setter.mock.calls.length).toBe(1);
      });

      test("empty string to empty string", () => {
        r("");
        const n = r("");
        expect(n.getAttribute("class")).toBeNull();
        expect(setter.mock.calls.length).toBe(0);
      });

      test("class to undefined", () => {
        r("a");
        const n = r();
        expect(n.getAttribute("class")).toBe("");
        expect(setter.mock.calls.length).toBe(2);
      });

      test("class to empty string", () => {
        r("a");
        const n = r("");
        expect(n.getAttribute("class")).toBe("");
        expect(setter.mock.calls.length).toBe(2);
      });

      test("class to class", () => {
        r("a");
        const n = r("a");
        expect(n.getAttribute("class")).toBe("a");
        expect(setter.mock.calls.length).toBe(1);
      });
    });
  });

  describe("SVG", () => {
    const setter = setAttribute;
    const s = useSVG();
    const r = (className?: string) => t.render<SVGCircleElement>(s.circle(className), root()).domNode!;

    describe("mount", () => {
      test("undefined", () => {
        const n = r();
        expect(n.getAttribute("class")).toBeNull();
        expect(setter.mock.calls.length).toBe(0);
      });

      test("empty string", () => {
        const n = r("");
        expect(n.getAttribute("class")).toBeNull();
        expect(setter.mock.calls.length).toBe(0);
      });

      test("class", () => {
        const n = r("a");
        expect(n.getAttribute("class")).toBe("a");
        expect(setter.mock.calls.length).toBe(1);
      });
    });

    describe("update", () => {
      test("undefined to undefined", () => {
        r();
        const n = r();
        expect(n.getAttribute("class")).toBeNull();
        expect(setter.mock.calls.length).toBe(0);
      });

      test("undefined to empty string", () => {
        r();
        const n = r("");
        expect(n.getAttribute("class")).toBe("");
        expect(setter.mock.calls.length).toBe(1);
      });

      test("undefined to class", () => {
        r();
        const n = r("a");
        expect(n.getAttribute("class")).toBe("a");
        expect(setter.mock.calls.length).toBe(1);
      });

      test("empty string to undefined", () => {
        r("");
        const n = r();
        expect(n.getAttribute("class")).toBe("");
        expect(setter.mock.calls.length).toBe(1);
      });

      test("empty string to class", () => {
        r("");
        const n = r("a");
        expect(n.getAttribute("class")).toBe("a");
        expect(setter.mock.calls.length).toBe(1);
      });

      test("empty string to empty string", () => {
        r("");
        const n = r("");
        expect(n.getAttribute("class")).toBeNull();
        expect(setter.mock.calls.length).toBe(0);
      });

      test("class to undefined", () => {
        r("a");
        const n = r();
        expect(n.getAttribute("class")).toBe("");
        expect(setter.mock.calls.length).toBe(2);
      });

      test("class to empty string", () => {
        r("a");
        const n = r("");
        expect(n.getAttribute("class")).toBe("");
        expect(setter.mock.calls.length).toBe(2);
      });

      test("class to class", () => {
        r("a");
        const n = r("a");
        expect(n.getAttribute("class")).toBe("a");
        expect(setter.mock.calls.length).toBe(1);
      });
    });
  });
});

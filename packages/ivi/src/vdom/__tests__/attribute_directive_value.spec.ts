import { useResetDOM, useSpyOn, useDOMElement, useHTML, useTest } from "ivi-jest";

useResetDOM();
const root = useDOMElement();
const setValue = useSpyOn(() => HTMLInputElement.prototype, "value", "set");
const h = useHTML();
const t = useTest();
const _ = void 0;
const r = (value?: string) => (
  t.render<HTMLInputElement>(
    h.input(_, value === void 0 ? void 0 : { value: h.VALUE(value) }),
    root(),
  ).domNode!
);

describe("attribute directive VALUE", () => {
  describe("mount", () => {
    test("empty string", () => {
      const n = r("");
      expect(n.value).toBe("");
      expect(setValue.mock.calls.length).toBe(0);
    });

    test("string", () => {
      const n = r("abc");
      expect(n.value).toBe("abc");
      expect(setValue.mock.calls.length).toBe(1);
    });
  });

  describe("update", () => {
    test("undefined to empty string", () => {
      r();
      const n = r("");
      expect(n.value).toBe("");
      expect(setValue.mock.calls.length).toBe(0);
    });

    test("undefined to string", () => {
      r();
      const n = r("abc");
      expect(n.value).toBe("abc");
      expect(setValue.mock.calls.length).toBe(1);
    });

    test("empty string to empty string", () => {
      r("");
      const n = r("");
      expect(n.value).toBe("");
      expect(setValue.mock.calls.length).toBe(0);
    });

    test("empty string to undefined", () => {
      r("");
      const n = r();
      expect(n.value).toBe("");
      expect(setValue.mock.calls.length).toBe(0);
    });

    test("empty string to string", () => {
      r("");
      const n = r("abc");
      expect(n.value).toBe("abc");
      expect(setValue.mock.calls.length).toBe(1);
    });

    test("string to same string", () => {
      r("abc");
      const n = r("abc");
      expect(n.value).toBe("abc");
      expect(setValue.mock.calls.length).toBe(1);
    });

    test("string to different string", () => {
      r("abc");
      const n = r("def");
      expect(n.value).toBe("def");
      expect(setValue.mock.calls.length).toBe(2);
    });

    test("string to empty string", () => {
      r("abc");
      const n = r("");
      expect(n.value).toBe("");
      expect(setValue.mock.calls.length).toBe(2);
    });

    test("string to undefined", () => {
      r("abc");
      const n = r();
      expect(n.value).toBe("abc");
      expect(setValue.mock.calls.length).toBe(1);
    });
  });
});

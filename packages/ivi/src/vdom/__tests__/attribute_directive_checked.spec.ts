import { useResetDOM, useResetModules, useSpyOn, useDOMElement, useHTML, useTest } from "ivi-jest";

useResetDOM();
useResetModules();
const setValue = useSpyOn(() => HTMLInputElement.prototype, "checked", "set");
const c = useDOMElement();
const h = useHTML();
const t = useTest();
const _ = void 0;
const r = (value?: boolean) => (
  t.render<HTMLInputElement>(
    h.input(_, value === void 0 ? void 0 : { checked: h.CHECKED(value) }),
    c(),
  ).domNode!
);

describe("attribute directive CHECKED", () => {
  describe("mount", () => {
    test("false", () => {
      const n = r(false);
      expect(n.checked).toBe(false);
      expect(setValue.mock.calls.length).toBe(0);
    });

    test("true", () => {
      const n = r(true);
      expect(n.checked).toBe(true);
      expect(setValue.mock.calls.length).toBe(1);
    });
  });

  describe("update", () => {
    test("undefined to false", () => {
      r();
      const n = r(false);
      expect(n.checked).toBe(false);
      expect(setValue.mock.calls.length).toBe(0);
    });

    test("undefined to true", () => {
      r();
      const n = r(true);
      expect(n.checked).toBe(true);
      expect(setValue.mock.calls.length).toBe(1);
    });

    test("false to undefined", () => {
      r(false);
      const n = r();
      expect(n.checked).toBe(false);
      expect(setValue.mock.calls.length).toBe(0);
    });

    test("false to true", () => {
      r(false);
      const n = r(true);
      expect(n.checked).toBe(true);
      expect(setValue.mock.calls.length).toBe(1);
    });

    test("true to undefined", () => {
      r(true);
      const n = r();
      expect(n.checked).toBe(true);
      expect(setValue.mock.calls.length).toBe(1);
    });

    test("true to false", () => {
      r(true);
      const n = r(false);
      expect(n.checked).toBe(false);
      expect(setValue.mock.calls.length).toBe(2);
    });
  });
});

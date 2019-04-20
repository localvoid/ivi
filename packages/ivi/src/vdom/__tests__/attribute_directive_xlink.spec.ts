import { useResetDOM, useSpyOn, useDOMElement, useIVI, useSVG, useTest } from "ivi-jest";

useResetDOM();
const root = useDOMElement();
const setAttributeNS = useSpyOn(() => Element.prototype, "setAttributeNS");
const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");
const ivi = useIVI();
const s = useSVG();
const t = useTest();
const _ = void 0;
const r = (value?: string | number) => (
  t.render<SVGElement>(
    s.circle(_, value === void 0 ? void 0 : { "href": s.XLINK_ATTR(value) }),
    root(),
  ).domNode!
);

describe("attribute directive XLINK_ATTR", () => {
  describe("mount", () => {
    test("empty string", () => {
      const n = r("");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("");
      expect(setAttributeNS.mock.calls.length).toBe(1);
    });

    test("string", () => {
      const n = r("abc");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("abc");
      expect(setAttributeNS.mock.calls.length).toBe(1);
    });

    test("zero number", () => {
      const n = r(0);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("0");
      expect(setAttributeNS.mock.calls.length).toBe(1);
    });

    test("number", () => {
      const n = r(123);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("123");
      expect(setAttributeNS.mock.calls.length).toBe(1);
    });
  });

  describe("update", () => {
    test("undefined to empty string", () => {
      r();
      const n = r("");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("");
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("undefined to string", () => {
      r();
      const n = r("abc");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("abc");
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("undefined to zero number", () => {
      r();
      const n = r(0);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("0");
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("undefined to number", () => {
      r();
      const n = r(123);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("123");
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("empty string to empty string", () => {
      r("");
      const n = r("");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("");
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("empty string to undefined", () => {
      r("");
      const n = r();
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBeNull();
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(1);
    });

    test("empty string to string", () => {
      r("");
      const n = r("abc");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("abc");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("empty string to zero number", () => {
      r("");
      const n = r(0);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("0");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("empty string to number", () => {
      r("");
      const n = r(123);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("123");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("string to same string", () => {
      r("abc");
      const n = r("abc");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("abc");
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("string to different string", () => {
      r("abc");
      const n = r("def");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("def");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("string to empty string", () => {
      r("abc");
      const n = r("");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("string to undefined", () => {
      r("abc");
      const n = r();
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBeNull();
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(1);
    });

    test("string to zero number", () => {
      r("abc");
      const n = r(0);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("0");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("string to number", () => {
      r("abc");
      const n = r(123);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("123");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("zero number to zero number", () => {
      r(0);
      const n = r(0);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("0");
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("zero number to empty string", () => {
      r(0);
      const n = r("");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("zero number to string", () => {
      r(0);
      const n = r("abc");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("abc");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("zero number to undefined", () => {
      r(0);
      const n = r();
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBeNull();
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(1);
    });

    test("zero number to number", () => {
      r(0);
      const n = r(123);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("123");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("number to same number", () => {
      r(123);
      const n = r(123);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("123");
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("number to different number", () => {
      r(123);
      const n = r(456);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("456");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("number to empty string", () => {
      r(123);
      const n = r("");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("number to string", () => {
      r(123);
      const n = r("abc");
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("abc");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("number to zero number", () => {
      r(123);
      const n = r(0);
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBe("0");
      expect(setAttributeNS.mock.calls.length).toBe(2);
      expect(removeAttribute.mock.calls.length).toBe(0);
    });

    test("number to undefined", () => {
      r(123);
      const n = r();
      expect(n.getAttributeNS(ivi.XLINK_NAMESPACE, "href")).toBeNull();
      expect(setAttributeNS.mock.calls.length).toBe(1);
      expect(removeAttribute.mock.calls.length).toBe(1);
    });
  });
});

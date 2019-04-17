import { useResetJSDOM, useResetModules, useSpyOn, useDOMElement, useHTML, useTest } from "ivi-jest";

useResetJSDOM();
useResetModules();
const root = useDOMElement();
const h = useHTML();
const t = useTest();
const _ = void 0;
const r = (attrs?: {}) => t.render<HTMLElement>(h.div(_, attrs), root()).domNode!;

describe("element attribute", () => {
  describe("mount", () => {
    const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
    const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");

    test("undefined", () => {
      expect(r()).toMatchSnapshot();
      expect(setAttribute().mock.calls).toEqual([]);
      expect(removeAttribute().mock.calls).toEqual([]);
    });

    test("empty attributes object", () => {
      expect(r({})).toMatchSnapshot();
      expect(setAttribute().mock.calls).toEqual([]);
      expect(removeAttribute().mock.calls).toEqual([]);
    });

    test("attribute with undefined value", () => {
      expect(r({ width: void 0 })).toMatchSnapshot();
      expect(setAttribute().mock.calls).toEqual([]);
      expect(removeAttribute().mock.calls).toEqual([]);
    });

    test("attribute with empty string value", () => {
      expect(r({ width: "" })).toMatchSnapshot();
      expect(setAttribute().mock.calls).toEqual([["width", ""]]);
      expect(removeAttribute().mock.calls).toEqual([]);
    });

    test("attribute with string value", () => {
      expect(r({ width: "10px" })).toMatchSnapshot();
      expect(setAttribute().mock.calls).toEqual([["width", "10px"]]);
      expect(removeAttribute().mock.calls).toEqual([]);
    });

    test("two attributes with string values", () => {
      expect(r({ width: "10px", height: "20px" })).toMatchSnapshot();
      expect(setAttribute().mock.calls).toEqual([["width", "10px"], ["height", "20px"]]);
      expect(removeAttribute().mock.calls).toEqual([]);
    });

    test("attribute with true value", () => {
      expect(r({ boolean: true })).toMatchSnapshot();
      expect(setAttribute().mock.calls).toEqual([["boolean", ""]]);
      expect(removeAttribute().mock.calls).toEqual([]);
    });

    test("attribute with false value", () => {
      expect(r({ boolean: false })).toMatchSnapshot();
      expect(setAttribute().mock.calls).toEqual([]);
      expect(removeAttribute().mock.calls).toEqual([]);
    });
  });

  describe("update", () => {
    describe("undefined to", () => {
      beforeEach(() => { r(); });
      const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
      const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");

      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("empty attributes object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with undefined value", () => {
        expect(r({ width: void 0 })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with empty string value", () => {
        expect(r({ width: "" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with string value", () => {
        expect(r({ width: "10px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "10px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with true value", () => {
        expect(r({ boolean: true })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["boolean", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with false value", () => {
        expect(r({ boolean: false })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two attributes with string values", () => {
        expect(r({ width: "10px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "10px"], ["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });
    });

    describe("attribute with undefined value to", () => {
      beforeEach(() => { r({ width: void 0 }); });
      const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
      const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");

      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("empty attribute object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with undefined value", () => {
        expect(r({ width: void 0 })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with empty string value", () => {
        expect(r({ width: "" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with string value", () => {
        expect(r({ width: "10px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "10px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with true value", () => {
        expect(r({ boolean: true })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["boolean", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with false value", () => {
        expect(r({ boolean: false })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("one attribute with same value and one with different", () => {
        expect(r({ width: void 0, height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two attributes with different values", () => {
        expect(r({ width: "30px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "30px"], ["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two different attributes", () => {
        expect(r({ left: "30px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["left", "30px"], ["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });
    });

    describe("attribute with empty string value to", () => {
      beforeEach(() => { r({ width: "" }); });
      const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
      const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");

      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("empty attribute object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("attribute with undefined value", () => {
        expect(r({ width: void 0 })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("attribute with empty string value", () => {
        expect(r({ width: "" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with different value", () => {
        expect(r({ width: "10px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "10px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with true value", () => {
        expect(r({ width: true })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with false value", () => {
        expect(r({ width: false })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("one attribute with same value and one with different", () => {
        expect(r({ width: "", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two attributes with different values", () => {
        expect(r({ width: "30px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "30px"], ["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two different attributes", () => {
        expect(r({ left: "30px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["left", "30px"], ["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });
    });

    describe("attribute with string value to", () => {
      beforeEach(() => { r({ width: "10px" }); });
      const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
      const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");

      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("empty attribute object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("attribute with undefined value", () => {
        expect(r({ width: void 0 })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("attribute with empty string value", () => {
        expect(r({ width: "" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with same value", () => {
        expect(r({ width: "10px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with different value", () => {
        expect(r({ width: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with true value", () => {
        expect(r({ width: true })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with false value", () => {
        expect(r({ width: false })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("one attribute with same value and one with different", () => {
        expect(r({ width: "10px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two attributes with different values", () => {
        expect(r({ width: "30px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "30px"], ["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two different attributes", () => {
        expect(r({ left: "30px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["left", "30px"], ["height", "20px"]]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });
    });

    describe("attribute with false value to", () => {
      beforeEach(() => { r({ width: false }); });
      const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
      const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");

      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("empty attribute object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with undefined value", () => {
        expect(r({ width: void 0 })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with empty string value", () => {
        expect(r({ width: "" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with string value", () => {
        expect(r({ width: "10px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "10px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with true value", () => {
        expect(r({ width: true })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with false value", () => {
        expect(r({ width: false })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });
    });

    describe("attribute with true value to", () => {
      beforeEach(() => { r({ width: true }); });
      const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
      const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");

      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("empty attribute object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("attribute with undefined value", () => {
        expect(r({ width: void 0 })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });

      test("attribute with empty string value", () => {
        expect(r({ width: "" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with string value", () => {
        expect(r({ width: "10px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "10px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with true value", () => {
        expect(r({ width: true })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("attribute with false value", () => {
        expect(r({ width: false })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"]]);
      });
    });

    describe("two attributes with string values to", () => {
      beforeEach(() => { r({ width: "10px", height: "20px" }); });
      const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
      const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");

      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"], ["height"]]);
      });

      test("empty attribute object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"], ["height"]]);
      });

      test("attribute with undefined value", () => {
        expect(r({ width: void 0 })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([["width"], ["height"]]);
      });

      test("attribute with empty string value", () => {
        expect(r({ width: "" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", ""]]);
        expect(removeAttribute().mock.calls).toEqual([["height"]]);
      });

      test("one attribute with different value", () => {
        expect(r({ width: "30px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "30px"]]);
        expect(removeAttribute().mock.calls).toEqual([["height"]]);
      });

      test("two attributes with same values", () => {
        expect(r({ width: "10px", height: "20px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two attributes with different values", () => {
        expect(r({ width: "30px", height: "40px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["width", "30px"], ["height", "40px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("one attribute with same value and one with different", () => {
        expect(r({ width: "10px", height: "30px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["height", "30px"]]);
        expect(removeAttribute().mock.calls).toEqual([]);
      });

      test("two different attributes", () => {
        expect(r({ left: "30px", right: "40px" })).toMatchSnapshot();
        expect(setAttribute().mock.calls).toEqual([["left", "30px"], ["right", "40px"]]);
        expect(removeAttribute().mock.calls).toEqual([["width"], ["height"]]);
      });
    });
  });
});

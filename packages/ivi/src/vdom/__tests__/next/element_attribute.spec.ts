import { useResetJSDOM, useResetModules, useSpyOn, useDOMElement, useHTML, useTest } from "ivi-jest";

useResetJSDOM();
useResetModules();
const setAttribute = useSpyOn(() => Element.prototype, "setAttribute");
const removeAttribute = useSpyOn(() => Element.prototype, "removeAttribute");
const c = useDOMElement();
const h = useHTML();
const t = useTest();
const _ = void 0;
const r = (attrs?: {}) => t.render<HTMLElement>(h.div(_, attrs), c()).domNode!;

describe("element attribute", () => {
  describe("mount", () => {
    test("undefined", () => {
      const n = r();
      expect(n).toMatchSnapshot();
      expect(setAttribute().mock.calls.length).toBe(0);
      expect(removeAttribute().mock.calls.length).toBe(0);
    });

    test("empty attributes object", () => {
      const n = r({});
      expect(n).toMatchSnapshot();
      expect(setAttribute().mock.calls.length).toBe(0);
      expect(removeAttribute().mock.calls.length).toBe(0);
    });

    test("attribute with undefined value", () => {
      const n = r({ width: void 0 });
      expect(n).toMatchSnapshot();
      expect(setAttribute().mock.calls.length).toBe(0);
      expect(removeAttribute().mock.calls.length).toBe(0);
    });

    test("attribute with empty string value", () => {
      const n = r({ width: "" });
      expect(n).toMatchSnapshot();
      expect(setAttribute().mock.calls.length).toBe(1);
      expect(removeAttribute().mock.calls.length).toBe(0);
    });

    test("attribute with string value", () => {
      const n = r({ width: "10px" });
      expect(n).toMatchSnapshot();
      expect(setAttribute().mock.calls.length).toBe(1);
      expect(removeAttribute().mock.calls.length).toBe(0);
    });

    test("two attributes with string values", () => {
      const n = r({ width: "10px", height: "20px" });
      expect(n).toMatchSnapshot();
      expect(setAttribute().mock.calls.length).toBe(2);
      expect(removeAttribute().mock.calls.length).toBe(0);
    });

    test("attribute with true value", () => {
      const n = r({ boolean: true });
      expect(n).toMatchSnapshot();
      expect(setAttribute().mock.calls.length).toBe(1);
      expect(removeAttribute().mock.calls.length).toBe(0);
    });

    test("attribute with false value", () => {
      const n = r({ boolean: false });
      expect(n).toMatchSnapshot();
      expect(setAttribute().mock.calls.length).toBe(0);
      expect(removeAttribute().mock.calls.length).toBe(0);
    });
  });

  describe("update", () => {
    describe("undefined to", () => {
      const initialState = () => r();
      const initialSetAttributeCount = 0;

      test("undefined", () => {
        initialState();
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("empty attributes object", () => {
        initialState();
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with undefined value", () => {
        initialState();
        const n = r({ width: void 0 });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with empty string value", () => {
        initialState();
        const n = r({ width: "" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with string value", () => {
        initialState();
        const n = r({ width: "10px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with true value", () => {
        initialState();
        const n = r({ boolean: true });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with false value", () => {
        initialState();
        const n = r({ boolean: false });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two attributes with string values", () => {
        initialState();
        const n = r({ width: "10px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });
    });

    describe("attribute with undefined value to", () => {
      const initialState = () => r({ width: void 0 });
      const initialSetAttributeCount = 0;

      test("undefined", () => {
        initialState();
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("empty attribute object", () => {
        initialState();
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with undefined value", () => {
        initialState();
        const n = r({ width: void 0 });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with empty string value", () => {
        initialState();
        const n = r({ width: "" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with string value", () => {
        initialState();
        const n = r({ width: "10px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with true value", () => {
        initialState();
        const n = r({ boolean: true });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with false value", () => {
        initialState();
        const n = r({ boolean: false });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("one attribute with same value and one with different", () => {
        initialState();
        const n = r({ width: void 0, height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two attributes with different values", () => {
        initialState();
        const n = r({ width: "30px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two different attributes", () => {
        initialState();
        const n = r({ left: "30px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });
    });

    describe("attribute with empty string value to", () => {
      const initialState = () => r({ width: "" });
      const initialSetAttributeCount = 1;

      test("undefined", () => {
        initialState();
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("empty attribute object", () => {
        initialState();
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("attribute with undefined value", () => {
        initialState();
        const n = r({ width: void 0 });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("attribute with empty string value", () => {
        initialState();
        const n = r({ width: "" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with different value", () => {
        initialState();
        const n = r({ width: "10px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with true value", () => {
        initialState();
        const n = r({ width: true });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with false value", () => {
        initialState();
        const n = r({ width: false });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("one attribute with same value and one with different", () => {
        initialState();
        const n = r({ width: "", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two attributes with different values", () => {
        initialState();
        const n = r({ width: "30px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two different attributes", () => {
        initialState();
        const n = r({ left: "30px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });
    });

    describe("attribute with string value to", () => {
      const initialState = () => r({ width: "10px" });
      const initialSetAttributeCount = 1;

      test("undefined", () => {
        initialState();
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("empty attribute object", () => {
        initialState();
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("attribute with undefined value", () => {
        initialState();
        const n = r({ width: void 0 });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("attribute with empty string value", () => {
        initialState();
        const n = r({ width: "" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with same value", () => {
        initialState();
        const n = r({ width: "10px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with different value", () => {
        initialState();
        const n = r({ width: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with true value", () => {
        initialState();
        const n = r({ width: true });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with false value", () => {
        initialState();
        const n = r({ width: false });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("one attribute with same value and one with different", () => {
        initialState();
        const n = r({ width: "10px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two attributes with different values", () => {
        initialState();
        const n = r({ width: "30px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two different attributes", () => {
        initialState();
        const n = r({ left: "30px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });
    });

    describe("attribute with false value to", () => {
      const initialState = () => r({ width: false });
      const initialSetAttributeCount = 0;

      test("undefined", () => {
        initialState();
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("empty attribute object", () => {
        initialState();
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with undefined value", () => {
        initialState();
        const n = r({ width: void 0 });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with empty string value", () => {
        initialState();
        const n = r({ width: "" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with string value", () => {
        initialState();
        const n = r({ width: "10px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with true value", () => {
        initialState();
        const n = r({ width: true });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with false value", () => {
        initialState();
        const n = r({ width: false });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });
    });

    describe("attribute with true value to", () => {
      const initialState = () => r({ width: true });
      const initialSetAttributeCount = 1;

      test("undefined", () => {
        initialState();
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("empty attribute object", () => {
        initialState();
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("attribute with undefined value", () => {
        initialState();
        const n = r({ width: void 0 });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("attribute with empty string value", () => {
        initialState();
        const n = r({ width: "" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with string value", () => {
        initialState();
        const n = r({ width: "10px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with true value", () => {
        initialState();
        const n = r({ width: true });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("attribute with false value", () => {
        initialState();
        const n = r({ width: false });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });
    });

    describe("two attributes with string values to", () => {
      const initialState = () => r({ width: "10px", height: "20px" });
      const initialSetAttributeCount = 2;

      test("undefined", () => {
        initialState();
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(2);
      });

      test("empty attribute object", () => {
        initialState();
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(2);
      });

      test("attribute with undefined value", () => {
        initialState();
        const n = r({ width: void 0 });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(2);
      });

      test("attribute with empty string value", () => {
        initialState();
        const n = r({ width: "" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("one attribute with different value", () => {
        initialState();
        const n = r({ width: "30px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(1);
      });

      test("two attributes with same values", () => {
        initialState();
        const n = r({ width: "10px", height: "20px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 0);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two attributes with different values", () => {
        initialState();
        const n = r({ width: "30px", height: "40px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("one attribute with same value and one with different", () => {
        initialState();
        const n = r({ width: "10px", height: "30px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 1);
        expect(removeAttribute().mock.calls.length).toBe(0);
      });

      test("two different attributes", () => {
        initialState();
        const n = r({ left: "30px", right: "40px" });
        expect(n).toMatchSnapshot();
        expect(setAttribute().mock.calls.length).toBe(initialSetAttributeCount + 2);
        expect(removeAttribute().mock.calls.length).toBe(2);
      });
    });
  });
});

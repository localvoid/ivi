import { useResetJSDOM, useResetModules, useDOMElement, useIVI, useTest, useHTML, useComputedValue } from "ivi-jest";
import { ElementProtoDescriptor } from "../element_proto";
import { Op } from "ivi";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;
const r = (op: Op) => t.render(op, c()).domNode!;

describe("elementProto", () => {
  describe("factory", () => {
    const proto = useComputedValue(() => h.div());
    const factory = useComputedValue(() => ivi.elementProto(proto()));

    test("flags", () => {
      const op = factory()();
      expect(op.t.f & ~ivi.NodeFlags.ElementProto).toBe(proto().t.f);
    });

    test("descriptor", () => {
      const op = factory()();
      expect((op.t.d as ElementProtoDescriptor).p).toBe(proto());
    });

    test("default className is undefined", () => {
      const op = factory()();
      expect(op.d.n).toBeUndefined();
    });

    test("override className", () => {
      const op = factory()("abc");
      expect(op.d.n).toBe("abc");
    });

    test("throw an error when element proto has children", () => {
      expect(() => ivi.elementProto(h.div(_, _, h.div()))).toThrowError("children");
    });
  });

  describe("mount", () => {
    test("basic element", () => {
      const factory = ivi.elementProto(h.div());
      expect(r(factory())).toMatchSnapshot();
    });

    test("predefined className", () => {
      const factory = ivi.elementProto(h.div("abc"));
      expect(r(factory())).toMatchSnapshot();
    });

    test("override className", () => {
      const factory = ivi.elementProto(h.div("abc"));
      expect(r(factory("def"))).toMatchSnapshot();
    });

    test("predefined attribute", () => {
      const factory = ivi.elementProto(h.div(_, { height: "10px" }));
      expect(r(factory())).toMatchSnapshot();
    });

    test("override attribute", () => {
      const factory = ivi.elementProto(h.div(_, { height: "10px" }));
      expect(r(factory(_, { height: "20px" }))).toMatchSnapshot();
    });
  });

  describe("update", () => {
    test("override attribute", () => {
      const factory = ivi.elementProto(h.div(_, { height: "10px" }));
      r(factory());
      expect(r(factory(_, { height: "20px" }))).toMatchSnapshot();
    });
  });
});

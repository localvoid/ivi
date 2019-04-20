import { useResetDOM, useDOMElement, useIVI, useHTML, useTest } from "ivi-jest";

useResetDOM();
const root = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;

describe("attribute directive PROPERTY", () => {
  test("mount", () => {
    const value = {};
    const { domNode } = t.render<any>(h.div(_, { _custom: ivi.PROPERTY(value) }), root());
    expect(domNode!._custom).toBe(value);
  });

  test("update", () => {
    const value = {};
    t.render<any>(h.div(_, { _custom: ivi.PROPERTY({}) }), root());
    const { domNode } = t.render<any>(h.div(_, { _custom: ivi.PROPERTY(value) }), root());
    expect(domNode!._custom).toBe(value);
  });

  test("update with the same value", () => {
    const value = {};
    t.render<any>(h.div(_, { _custom: ivi.PROPERTY(value) }), root());
    const { domNode } = t.render<any>(h.div(_, { _custom: ivi.PROPERTY(value) }), root());
    expect(domNode!._custom).toBe(value);
  });
});

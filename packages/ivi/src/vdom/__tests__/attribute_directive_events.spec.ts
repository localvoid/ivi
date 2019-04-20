import { useResetDOM, useDOMElement, useMockFn, useIVI, useHTML, useTest } from "ivi-jest";

useResetDOM();
const root = useDOMElement();
const handler1 = useMockFn();
const handler2 = useMockFn();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;

describe("attribute directive EVENTS", () => {
  test("mount", () => {
    const { domNode } = t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), root());
    domNode!.click();
    expect(handler1.mock.calls.length).toBe(1);
  });

  test("update with the same handler", () => {
    t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), root());
    const { domNode } = t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), root());
    domNode!.click();
    expect(handler1.mock.calls.length).toBe(1);
  });

  test("update with different handler", () => {
    t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), root());
    const { domNode } = t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler2) }), root());
    domNode!.click();
    expect(handler1.mock.calls.length).toBe(0);
    expect(handler2.mock.calls.length).toBe(1);
  });

  test("update with undefined", () => {
    t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), root());
    const { domNode } = t.render<HTMLButtonElement>(h.button(), root());
    domNode!.click();
    expect(handler1.mock.calls.length).toBe(0);
  });
});

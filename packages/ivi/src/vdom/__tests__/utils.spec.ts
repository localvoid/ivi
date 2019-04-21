import { useResetDOM, useDOMElement, useIVI, useTest, useHTML } from "ivi-jest";
import { Op } from "ivi";

useResetDOM();
const root = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;

describe("findDOMNode", () => {
  const r = (op: Op) => t.render(op, root()).domNode;
  test("null", () => {
    expect(ivi.findDOMNode(ivi.box(null))).toBeNull();
  });

  test("ref", () => {
    const box = ivi.box(null);
    const n = r(ivi.Ref(box, 1));
    expect(ivi.findDOMNode(box)).toBe(n);
  });
});

describe("containsDOMElement", () => {
  const r = (op: Op) => t.render(op, root()).stateNode;
  const target = () => h.div("target");
  const getTarget = () => root().querySelector(".target");

  test("root", () => {
    const n = r(target());
    expect(ivi.containsDOMElement(n!, getTarget()!)).toBe(true);
  });

  test("deep element", () => {
    const n = r(h.div(_, _, target()));
    expect(ivi.containsDOMElement(n!, getTarget()!)).toBe(true);
  });

  test("fragment", () => {
    const n = r([target()]);
    expect(ivi.containsDOMElement(n!, getTarget()!)).toBe(true);
  });

  test("empty fragment", () => {
    const n = r([]);
    expect(ivi.containsDOMElement(n!, getTarget()!)).toBe(false);
  });
});

describe("hasDOMElementChild", () => {
  const r = (op: Op) => t.render(op, root()).stateNode;
  const target = () => h.div("target");
  const getTarget = () => root().querySelector(".target");

  test("root", () => {
    const n = r(target());
    expect(ivi.hasDOMElementChild(n!, getTarget()!)).toBe(true);
  });

  test("deep element", () => {
    const n = r(h.div(_, _, target()));
    expect(ivi.hasDOMElementChild(n!, getTarget()!)).toBe(false);
  });

  test("fragment", () => {
    const n = r([h.div(_, _, h.div()), target()]);
    expect(ivi.hasDOMElementChild(n!, getTarget()!)).toBe(true);
  });

  test("empty fragment", () => {
    const n = r([]);
    expect(ivi.hasDOMElementChild(n!, getTarget()!)).toBe(false);
  });
});

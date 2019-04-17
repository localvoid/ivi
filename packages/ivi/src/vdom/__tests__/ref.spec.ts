import { useResetDOM, useResetModules, useDOMElement, useIVI, useTest } from "ivi-jest";
import { Op, OpState } from "ivi";

useResetDOM();
useResetModules();
const root = useDOMElement();
const ivi = useIVI();
const t = useTest();
const r = (op: Op) => t.render(op, root()).domNode!;

describe("Ref", () => {
  test("mount", () => {
    const ref = ivi.box<OpState | null>(null);
    const op = ivi.Ref(ref, null);
    r(op);
    expect(ref.v!.o).toBe(op);
  });

  test("unmount", () => {
    const ref = ivi.box<OpState | null>(null);
    r(ivi.Ref(ref, null));
    r(null);
    expect(ref.v).toBeNull();
  });

  test("swap box", () => {
    const r1 = ivi.box<OpState | null>(null);
    const r2 = ivi.box<OpState | null>(null);
    const op1 = ivi.Ref(r1, null);
    const op2 = ivi.Ref(r2, null);
    r(op1);
    r(op2);
    expect(r1.v).toBeNull();
    expect(r2.v!.o).toBe(op2);
  });
});

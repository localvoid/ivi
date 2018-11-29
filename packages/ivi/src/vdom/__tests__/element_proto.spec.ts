import { _, NodeFlags, ElementProtoDescriptor, elementProto } from "ivi";
import * as h from "ivi-html";

const div = h.div();
const divProto = elementProto(div);

describe("Element proto", () => {
  test(`flags`, () => {
    expect(divProto().t.f & ~NodeFlags.ElementProto).toBe(h.div().t.f);
  });

  test(`prototype`, () => {
    expect((divProto().t.d as ElementProtoDescriptor).proto).toBe(div);
  });

  test(`default className = undefined`, () => {
    expect(divProto().d.n).toBeUndefined();
  });

  test(`className = "a"`, () => {
    expect(divProto("a").d.n).toBe("a");
  });

  test(`should throw an error when element proto has children`, () => {
    expect(() => elementProto(h.div(_, _, h.div()))).toThrowError("children");
  });
});

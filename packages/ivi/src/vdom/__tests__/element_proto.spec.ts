import { NodeFlags, ElementProtoDescriptor, elementProto } from "ivi";
import * as h from "ivi-html";

const div = h.div();
const divProto = elementProto(div);

describe("Element proto", () => {
  test(`flags`, () => {
    expect(divProto().type.flags & ~NodeFlags.ElementProto).toBe(h.div().type.flags);
  });

  test(`prototype`, () => {
    expect((divProto().type.descriptor as ElementProtoDescriptor).proto).toBe(div);
  });

  test(`default className = undefined`, () => {
    expect(divProto().data.className).toBeUndefined();
  });

  test(`className = "a"`, () => {
    expect(divProto("a").data.className).toBe("a");
  });
});

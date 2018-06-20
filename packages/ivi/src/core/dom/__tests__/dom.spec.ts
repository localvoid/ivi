import { nodeDepth, firstLeaf, nextSibling } from "ivi";

describe("DOM", () => {
  const a = document.createElement("div");
  const b1 = document.createElement("span");
  const b2 = document.createElement("span");
  a.appendChild(b1);
  a.appendChild(b2);

  describe("nodeDepth", () => {
    test(`nodeDepth(a)`, () => {
      expect(nodeDepth(a)).toBe(1);
    });

    test(`nodeDepth(b1)`, () => {
      expect(nodeDepth(b1)).toBe(2);
    });
  });

  describe(`firstLeaf`, () => {
    test(`firstLeaf(a)`, () => {
      expect(firstLeaf(a)).toBe(b1);
    });

    test(`firstLeaf(b2)`, () => {
      expect(firstLeaf(b2)).toBe(b2);
    });
  });

  describe(`nextSibling`, () => {
    test(`nextSibling(a)`, () => {
      expect(nextSibling(a)).toBeNull();
    });

    test(`nextSibling(b1)`, () => {
      expect(nextSibling(b1)).toBe(b2);
    });

    test(`nextSibling(b2)`, () => {
      expect(nextSibling(b2)).toBeNull();
    });
  });
});

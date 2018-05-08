import { nodeDepth } from "ivi-core";

describe("DOM", () => {
  describe("nodeDepth", () => {
    const a = document.createElement("div");
    const b = document.createElement("div");
    a.appendChild(b);

    test("a: 1", () => {
      expect(nodeDepth(a)).toBe(1);
    });

    test("b: 2", () => {
      expect(nodeDepth(b)).toBe(2);
    });
  });
});

import { nodeDepth } from "../src/traverse";
import { expect } from "iko";

describe("DOM", () => {
  describe("nodeDepth", () => {
    const a = document.createElement("div");
    const b = document.createElement("div");
    a.appendChild(b);

    it("a: 1", () => {
      expect(nodeDepth(a)).toBeEqual(1);
    });

    it("b: 2", () => {
      expect(nodeDepth(b)).toBeEqual(2);
    });
  });
});

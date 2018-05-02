import { SVG_NAMESPACE } from "ivi-core";
import { setInnerHTML } from "../src/innerhtml";

describe("setInnerHTML", () => {
  describe("HTML", () => {
    test("set", () => {
      const c = document.createElement("div");
      setInnerHTML(c, "a", false);
      expect(c.firstChild!.nodeValue).toBe("a");
    });

    test("override", () => {
      const c = document.createElement("div");
      setInnerHTML(c, "a", false);
      setInnerHTML(c, "b", false);
      expect(c.firstChild!.nodeValue).toBe("b");
    });
  });

  describe("SVG", () => {
    test("set", () => {
      const c = document.createElementNS(SVG_NAMESPACE, "svg");
      setInnerHTML(c, "a", false);
      expect(c.firstChild!.nodeValue).toBe("a");
    });

    test("override", () => {
      const c = document.createElementNS(SVG_NAMESPACE, "svg");
      setInnerHTML(c, "a", false);
      setInnerHTML(c, "b", false);
      expect(c.firstChild!.nodeValue).toBe("b");
    });
  });
});

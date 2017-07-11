import { setInnerHTML } from "../src/innerhtml";
import { SVG_NAMESPACE } from "ivi-core";
import { expect } from "chai";

describe("setInnerHTML", () => {
  describe("HTML", () => {
    it("set", () => {
      const c = document.createElement("div");
      setInnerHTML(c, "a", false);
      expect(c.firstChild!.nodeValue).to.equal("a");
    });

    it("override", () => {
      const c = document.createElement("div");
      setInnerHTML(c, "a", false);
      setInnerHTML(c, "b", false);
      expect(c.firstChild!.nodeValue).to.equal("b");
    });
  });

  describe("SVG", () => {
    it("set", () => {
      const c = document.createElementNS(SVG_NAMESPACE, "svg");
      setInnerHTML(c, "a", false);
      expect(c.firstChild!.nodeValue).to.equal("a");
    });

    it("override", () => {
      const c = document.createElementNS(SVG_NAMESPACE, "svg");
      setInnerHTML(c, "a", false);
      setInnerHTML(c, "b", false);
      expect(c.firstChild!.nodeValue).to.equal("b");
    });
  });
});

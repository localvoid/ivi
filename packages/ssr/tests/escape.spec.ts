(global as any).__IVI_BROWSER__ = false;
(global as any).__IVI_DEV__ = true;

import { escapeAttributeValue, escapeText } from "../src/escape";
import { expect } from "chai";

describe("escape", () => {
  describe("attribute values", () => {
    it("& => &amp;", () => {
      expect(escapeAttributeValue("&")).to.equal("&amp;");
    });

    it("&& => &amp;&amp;", () => {
      expect(escapeAttributeValue("&&")).to.equal("&amp;&amp;");
    });

    it("&a& => &amp;a&amp;", () => {
      expect(escapeAttributeValue("&a&")).to.equal("&amp;a&amp;");
    });

    it("a&a& => a&amp;a&amp;", () => {
      expect(escapeAttributeValue("a&a&")).to.equal("a&amp;a&amp;");
    });

    it("a&a&a => a&amp;a&amp;a", () => {
      expect(escapeAttributeValue("a&a&a")).to.equal("a&amp;a&amp;a");
    });

    it("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(escapeAttributeValue("aa&aa&aa")).to.equal("aa&amp;aa&amp;aa");
    });

    it(`" => &quot;`, () => {
      expect(escapeAttributeValue(`"`)).to.equal("&quot;");
    });
  });

  describe("text", () => {
    it("& => &amp;", () => {
      expect(escapeText("&")).to.equal("&amp;");
    });

    it("&& => &amp;&amp;", () => {
      expect(escapeText("&&")).to.equal("&amp;&amp;");
    });

    it("&a& => &amp;a&amp;", () => {
      expect(escapeText("&a&")).to.equal("&amp;a&amp;");
    });

    it("a&a& => a&amp;a&amp;", () => {
      expect(escapeText("a&a&")).to.equal("a&amp;a&amp;");
    });

    it("a&a&a => a&amp;a&amp;a", () => {
      expect(escapeText("a&a&a")).to.equal("a&amp;a&amp;a");
    });

    it("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(escapeText("aa&aa&aa")).to.equal("aa&amp;aa&amp;aa");
    });

    it("< => &lt;", () => {
      expect(escapeText(`<`)).to.equal("&lt;");
    });
  });
});

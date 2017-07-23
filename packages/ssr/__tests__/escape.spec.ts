import { escapeAttributeValue, escapeText } from "../src/escape";
import { expect } from "iko";

describe("escape", () => {
  describe("attribute values", () => {
    it("& => &amp;", () => {
      expect(escapeAttributeValue("&")).toBeEqual("&amp;");
    });

    it("&& => &amp;&amp;", () => {
      expect(escapeAttributeValue("&&")).toBeEqual("&amp;&amp;");
    });

    it("&a& => &amp;a&amp;", () => {
      expect(escapeAttributeValue("&a&")).toBeEqual("&amp;a&amp;");
    });

    it("a&a& => a&amp;a&amp;", () => {
      expect(escapeAttributeValue("a&a&")).toBeEqual("a&amp;a&amp;");
    });

    it("a&a&a => a&amp;a&amp;a", () => {
      expect(escapeAttributeValue("a&a&a")).toBeEqual("a&amp;a&amp;a");
    });

    it("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(escapeAttributeValue("aa&aa&aa")).toBeEqual("aa&amp;aa&amp;aa");
    });

    it(`" => &quot;`, () => {
      expect(escapeAttributeValue(`"`)).toBeEqual("&quot;");
    });
  });

  describe("text", () => {
    it("& => &amp;", () => {
      expect(escapeText("&")).toBeEqual("&amp;");
    });

    it("&& => &amp;&amp;", () => {
      expect(escapeText("&&")).toBeEqual("&amp;&amp;");
    });

    it("&a& => &amp;a&amp;", () => {
      expect(escapeText("&a&")).toBeEqual("&amp;a&amp;");
    });

    it("a&a& => a&amp;a&amp;", () => {
      expect(escapeText("a&a&")).toBeEqual("a&amp;a&amp;");
    });

    it("a&a&a => a&amp;a&amp;a", () => {
      expect(escapeText("a&a&a")).toBeEqual("a&amp;a&amp;a");
    });

    it("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(escapeText("aa&aa&aa")).toBeEqual("aa&amp;aa&amp;aa");
    });

    it("< => &lt;", () => {
      expect(escapeText(`<`)).toBeEqual("&lt;");
    });
  });
});

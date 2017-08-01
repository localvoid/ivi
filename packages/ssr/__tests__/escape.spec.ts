import { escapeAttributeValue, escapeText } from "../src/escape";
import { expect } from "iko";

describe("escape", () => {
  describe("attribute values", () => {
    it("& => &amp;", () => {
      expect(escapeAttributeValue("&")).toBe("&amp;");
    });

    it("&& => &amp;&amp;", () => {
      expect(escapeAttributeValue("&&")).toBe("&amp;&amp;");
    });

    it("&a& => &amp;a&amp;", () => {
      expect(escapeAttributeValue("&a&")).toBe("&amp;a&amp;");
    });

    it("a&a& => a&amp;a&amp;", () => {
      expect(escapeAttributeValue("a&a&")).toBe("a&amp;a&amp;");
    });

    it("a&a&a => a&amp;a&amp;a", () => {
      expect(escapeAttributeValue("a&a&a")).toBe("a&amp;a&amp;a");
    });

    it("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(escapeAttributeValue("aa&aa&aa")).toBe("aa&amp;aa&amp;aa");
    });

    it(`" => &quot;`, () => {
      expect(escapeAttributeValue(`"`)).toBe("&quot;");
    });
  });

  describe("text", () => {
    it("& => &amp;", () => {
      expect(escapeText("&")).toBe("&amp;");
    });

    it("&& => &amp;&amp;", () => {
      expect(escapeText("&&")).toBe("&amp;&amp;");
    });

    it("&a& => &amp;a&amp;", () => {
      expect(escapeText("&a&")).toBe("&amp;a&amp;");
    });

    it("a&a& => a&amp;a&amp;", () => {
      expect(escapeText("a&a&")).toBe("a&amp;a&amp;");
    });

    it("a&a&a => a&amp;a&amp;a", () => {
      expect(escapeText("a&a&a")).toBe("a&amp;a&amp;a");
    });

    it("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(escapeText("aa&aa&aa")).toBe("aa&amp;aa&amp;aa");
    });

    it("< => &lt;", () => {
      expect(escapeText(`<`)).toBe("&lt;");
    });
  });
});

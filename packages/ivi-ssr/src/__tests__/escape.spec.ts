import { escapeAttributeValue, escapeText } from "../escape";

describe("escape", () => {
  describe("attribute values", () => {
    test("& => &amp;", () => {
      expect(escapeAttributeValue("&")).toBe("&amp;");
    });

    test("&& => &amp;&amp;", () => {
      expect(escapeAttributeValue("&&")).toBe("&amp;&amp;");
    });

    test("&a& => &amp;a&amp;", () => {
      expect(escapeAttributeValue("&a&")).toBe("&amp;a&amp;");
    });

    test("a&a& => a&amp;a&amp;", () => {
      expect(escapeAttributeValue("a&a&")).toBe("a&amp;a&amp;");
    });

    test("a&a&a => a&amp;a&amp;a", () => {
      expect(escapeAttributeValue("a&a&a")).toBe("a&amp;a&amp;a");
    });

    test("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(escapeAttributeValue("aa&aa&aa")).toBe("aa&amp;aa&amp;aa");
    });

    test(`" => &quot;`, () => {
      expect(escapeAttributeValue(`"`)).toBe("&quot;");
    });
  });

  describe("text", () => {
    test("& => &amp;", () => {
      expect(escapeText("&")).toBe("&amp;");
    });

    test("&& => &amp;&amp;", () => {
      expect(escapeText("&&")).toBe("&amp;&amp;");
    });

    test("&a& => &amp;a&amp;", () => {
      expect(escapeText("&a&")).toBe("&amp;a&amp;");
    });

    test("a&a& => a&amp;a&amp;", () => {
      expect(escapeText("a&a&")).toBe("a&amp;a&amp;");
    });

    test("a&a&a => a&amp;a&amp;a", () => {
      expect(escapeText("a&a&a")).toBe("a&amp;a&amp;a");
    });

    test("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(escapeText("aa&aa&aa")).toBe("aa&amp;aa&amp;aa");
    });

    test("< => &lt;", () => {
      expect(escapeText(`<`)).toBe("&lt;");
    });
  });
});

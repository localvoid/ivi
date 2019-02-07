import { escapeAttributeValue, escapeText } from "ivi";
import { escapeJavascript } from "../escape";

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
    test("1 => 1", () => {
      expect(escapeText(1)).toBe("1");
    });

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

  describe("javascript", () => {
    test("/ => u002F", () => {
      expect(escapeJavascript(`/`)).toBe("\\u002F");
    });

    test("/a => u002F", () => {
      expect(escapeJavascript(`/a`)).toBe("\\u002Fa");
    });

    test("a/ => u002F", () => {
      expect(escapeJavascript(`a/`)).toBe("a\\u002F");
    });

    test("a/a => u002F", () => {
      expect(escapeJavascript(`a/a`)).toBe("a\\u002Fa");
    });

    test("a/a/ => u002F", () => {
      expect(escapeJavascript(`a/a/`)).toBe("a\\u002Fa\\u002F");
    });

    test("< => u003C", () => {
      expect(escapeJavascript(`<`)).toBe("\\u003C");
    });

    test("> => u003E", () => {
      expect(escapeJavascript(`>`)).toBe("\\u003E");
    });

    test("LS => u2028", () => {
      expect(escapeJavascript(String.fromCharCode(8232))).toBe("\\u2028");
    });

    test("PS => u2029", () => {
      expect(escapeJavascript(String.fromCharCode(8233))).toBe("\\u2029");
    });
  });
});

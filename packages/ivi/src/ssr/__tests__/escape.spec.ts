import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("escape", () => {
  describe("attribute values", () => {
    test("& => &amp;", () => {
      expect(ivi.escapeAttributeValue("&")).toBe("&amp;");
    });

    test("&& => &amp;&amp;", () => {
      expect(ivi.escapeAttributeValue("&&")).toBe("&amp;&amp;");
    });

    test("&a& => &amp;a&amp;", () => {
      expect(ivi.escapeAttributeValue("&a&")).toBe("&amp;a&amp;");
    });

    test("a&a& => a&amp;a&amp;", () => {
      expect(ivi.escapeAttributeValue("a&a&")).toBe("a&amp;a&amp;");
    });

    test("a&a&a => a&amp;a&amp;a", () => {
      expect(ivi.escapeAttributeValue("a&a&a")).toBe("a&amp;a&amp;a");
    });

    test("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(ivi.escapeAttributeValue("aa&aa&aa")).toBe("aa&amp;aa&amp;aa");
    });

    test(`" => &quot;`, () => {
      expect(ivi.escapeAttributeValue(`"`)).toBe("&quot;");
    });
  });

  describe("text", () => {
    test("1 => 1", () => {
      expect(ivi.escapeText(1)).toBe("1");
    });

    test("& => &amp;", () => {
      expect(ivi.escapeText("&")).toBe("&amp;");
    });

    test("&& => &amp;&amp;", () => {
      expect(ivi.escapeText("&&")).toBe("&amp;&amp;");
    });

    test("&a& => &amp;a&amp;", () => {
      expect(ivi.escapeText("&a&")).toBe("&amp;a&amp;");
    });

    test("a&a& => a&amp;a&amp;", () => {
      expect(ivi.escapeText("a&a&")).toBe("a&amp;a&amp;");
    });

    test("a&a&a => a&amp;a&amp;a", () => {
      expect(ivi.escapeText("a&a&a")).toBe("a&amp;a&amp;a");
    });

    test("aa&aa&aa => aa&amp;aa&amp;aa", () => {
      expect(ivi.escapeText("aa&aa&aa")).toBe("aa&amp;aa&amp;aa");
    });

    test("< => &lt;", () => {
      expect(ivi.escapeText(`<`)).toBe("&lt;");
    });
  });

  describe("javascript", () => {
    test("/ => u002F", () => {
      expect(ivi.escapeJavascript(`/`)).toBe("\\u002F");
    });

    test("/a => u002F", () => {
      expect(ivi.escapeJavascript(`/a`)).toBe("\\u002Fa");
    });

    test("a/ => u002F", () => {
      expect(ivi.escapeJavascript(`a/`)).toBe("a\\u002F");
    });

    test("a/a => u002F", () => {
      expect(ivi.escapeJavascript(`a/a`)).toBe("a\\u002Fa");
    });

    test("a/a/ => u002F", () => {
      expect(ivi.escapeJavascript(`a/a/`)).toBe("a\\u002Fa\\u002F");
    });

    test("< => u003C", () => {
      expect(ivi.escapeJavascript(`<`)).toBe("\\u003C");
    });

    test("> => u003E", () => {
      expect(ivi.escapeJavascript(`>`)).toBe("\\u003E");
    });

    test("LS => u2028", () => {
      expect(ivi.escapeJavascript(String.fromCharCode(8232))).toBe("\\u2028");
    });

    test("PS => u2029", () => {
      expect(ivi.escapeJavascript(String.fromCharCode(8233))).toBe("\\u2029");
    });
  });
});

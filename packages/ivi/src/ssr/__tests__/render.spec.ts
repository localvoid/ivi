import { useEnv, useIVI, useHTML, useSVG, useComputedValue } from "ivi-jest";
import { Op } from "ivi";

useEnv("IVI_TARGET", "ssr");
const ivi = useIVI();
const h = useHTML();
const _ = void 0;
const r = (op: Op) => ivi.renderToString(op);

describe("renderToString", () => {
  test("<div>", () => {
    expect(r(h.div())).toBe("<div></div>");
  });

  test("<span>", () => {
    expect(r(h.span())).toBe("<span></span>");
  });

  test("<div> ({} props)", () => {
    expect(r(h.div("", {}))).toBe("<div></div>");
  });

  test("<div tabIndex='1'>", () => {
    expect(r(h.div("", { tabIndex: 1 }))).toBe(`<div tabIndex="1"></div>`);
  });

  test("<div tabIndex='1' title='2'>", () => {
    expect(r(h.div("", { tabIndex: 1, title: "2" }))).toBe(`<div tabIndex="1" title="2"></div>`);
  });

  test("<div data-abc='a'", () => {
    expect(r(h.div("", { "data-abc": "a" }))).toBe(`<div data-abc="a"></div>`);
  });

  test("<div aria-type='button'", () => {
    expect(r(h.div("", { "aria-type": "button" }))).toBe(`<div aria-type="button"></div>`);
  });

  test("<div boolean=false", () => {
    expect(r(h.div("", { boolean: false }))).toBe(`<div></div>`);
  });

  test("<div boolean=true", () => {
    expect(r(h.div("", { boolean: true }))).toBe(`<div boolean></div>`);
  });

  test("<div class=''>", () => {
    expect(r(h.div(""))).toBe(`<div></div>`);
  });

  test("<div class='a'>", () => {
    expect(r(h.div("a"))).toBe(`<div class="a"></div>`);
  });

  test("<div class='a b'>", () => {
    expect(r(h.div("a b"))).toBe(`<div class="a b"></div>`);
  });

  test("<div style={}>", () => {
    expect(r(h.div("", { style: {} }))).toBe(`<div></div>`);
  });

  test("<div style={top: 10px}>", () => {
    expect(r(h.div("", { style: { top: "10px" } }))).toBe(`<div style="top:10px"></div>`);
  });

  test("<div style={top: 10px; left: 20px}>", () => {
    expect(r(h.div("", { style: { top: "10px", left: "20px" } })))
      .toBe(`<div style="top:10px;left:20px"></div>`);
  });

  test("<div>'abc'</div>", () => {
    expect(r(h.div(_, _, "abc"))).toBe(`<div>abc</div>`);
  });

  test("<div>10</div>", () => {
    expect(r(h.div(_, _, 10))).toBe(`<div>10</div>`);
  });

  test("<div><span></div>", () => {
    expect(r(h.div(_, _, h.span()))).toBe(`<div><span></span></div>`);
  });

  test("<div>[]</div>", () => {
    expect(r(h.div(_, _, []))).toBe(`<div></div>`);
  });

  test("<div><span></div>", () => {
    expect(r(h.div(_, _, h.span()))).toBe(`<div><span></span></div>`);
  });

  test("<div><span>, <strong></div>", () => {
    expect(r(h.div(_, _, [h.span(), h.strong()])))
      .toBe(`<div><span></span><strong></strong></div>`);
  });

  test("<div>" +
    "  <div>'hello'</div>," +
    "  <div><span>'world'</span>, <div><span></div></div>," +
    "  <div><div></div>," +
    "  <div>" +
    "</div>", () => {
      expect(r(h.div(_, _, [
        h.div(_, _, "hello"),
        h.div(_, _, [h.span(_, _, "world"), h.div(_, _, h.span())]),
        h.div(_, _, h.div()),
        h.div(),
      ]))).toBe(`<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div>` +
        `</div><div></div></div>`);
    });

  describe("Element Prototype", () => {
    const protoWithClassName = () => ivi.elementProto(h.div("abc"));
    const protoWithAttr = () => ivi.elementProto(h.div(_, { id: "123" }));

    test("predefined className", () => {
      expect(r(protoWithClassName()()))
        .toBe(`<div class="abc"></div>`);
    });

    test("override className", () => {
      expect(r(protoWithClassName()("def")))
        .toBe(`<div class="def"></div>`);
    });

    test("predefined attribute", () => {
      expect(r(protoWithAttr()()))
        .toBe(`<div id="123"></div>`);
    });

    test("override attribute", () => {
      expect(r(protoWithAttr()(_, { id: "456" })))
        .toBe(`<div id="456"></div>`);
    });
  });

  describe("TrackByKey", () => {
    test("empty", () => {
      expect(r(ivi.TrackByKey([])))
        .toBe(``);
    });

    test("several items", () => {
      expect(r(ivi.TrackByKey([ivi.key(0, "a"), ivi.key(1, "b")])))
        .toBe(`ab`);
    });
  });

  describe("Component", () => {
    describe("Stateful", () => {
      const C = useComputedValue(() => ivi.component(() => (op: Op) => op));

      test("null root", () => {
        expect(r(C(null)))
          .toBe("");
      });

      test("text root", () => {
        expect(r(C("abc")))
          .toBe("abc");
      });
    });

    describe("Stateful", () => {
      const C = useComputedValue(() => ivi.statelessComponent((op: Op) => op));

      test("null root", () => {
        expect(r(C(null)))
          .toBe("");
      });

      test("text root", () => {
        expect(r(C("abc")))
          .toBe("abc");
      });
    });
  });

  describe("Context", () => {
    const ContextProvider = useComputedValue(() => ivi.contextValue<number>());
    const ContextValue = useComputedValue(() => ivi.component((c) => () => ContextProvider.get()));

    test("1", () => {
      const s = r(
        ContextProvider.set(10,
          ContextValue(),
        )
      );
      expect(s).toBe("10");
    });

    test("2", () => {
      expect(() => {
        r([
          ContextProvider.set(10,
            ContextValue(),
          ),
          ContextValue(),
        ]);
      }).toThrowError("context");
    });
  });

  describe("Events", () => {
    test("empty event", () => {
      expect(r(ivi.Events(ivi.onClick(() => false), null)))
        .toBe(``);
    });

    test("event with text child", () => {
      expect(r(ivi.Events(ivi.onClick(() => false), "abc")))
        .toBe(`abc`);
    });
  });

  describe("children normalization", () => {
    test("<div><span>, [<strong>, <a>], <span></div>", () => {
      expect(r(h.div(_, _, [h.span(), [h.strong(), h.div()], h.span()])))
        .toBe(`<div><span></span><strong></strong><div></div><span></span></div>`);
    });

    test("<div>'abc', []</div>", () => {
      expect(r(h.div(_, _, ["abc", []]))).toBe(`<div>abc</div>`);
    });

    test("<div><div>, null, <span></div>", () => {
      expect(r(h.div(_, _, [h.div(), null, h.span()])))
        .toBe(`<div><div></div><span></span></div>`);
    });

    test("<div><div>, 'abc', <span></div>", () => {
      expect(r(h.div(_, _, [h.div(), "abc", h.span()])))
        .toBe(`<div><div></div>abc<span></span></div>`);
    });

    test("<div><div>, 123, <span></div>", () => {
      expect(r(h.div(_, _, [h.div(), 123, h.span()])))
        .toBe(`<div><div></div>123<span></span></div>`);
    });
  });

  describe("special cases", () => {
    describe("newline-eating elements", () => {
      test("no newline", () => {
        expect(r(h.textarea(_, _, "hello"))).toBe(`<textarea>hello</textarea>`);
      });

      test("single newline", () => {
        expect(r(h.textarea(_, _, "\n"))).toBe(`<textarea>\n\n</textarea>`);
      });

      test("double newline", () => {
        expect(r(h.textarea(_, _, "\n\n"))).toBe(`<textarea>\n\n\n</textarea>`);
      });
    });

    describe("attribute directives", () => {
      test("property", () => {
        expect(r(h.div(_, { _prop: ivi.PROPERTY("value") }))).toBe(`<div></div>`);
      });

      test("unsafeHTML", () => {
        expect(r(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("&") }))).toBe(`<div>&</div>`);
      });

      test("event", () => {
        expect(r(h.div(_, { click: ivi.EVENT(() => true) }))).toBe(`<div></div>`);
      });

      test("autofocus=true", () => {
        expect(r(h.div(_, { autofocus: ivi.AUTOFOCUS(true) }))).toBe(`<div autofocus></div>`);
      });

      test("autofocus=false", () => {
        expect(r(h.div(_, { autofocus: ivi.AUTOFOCUS(false) }))).toBe(`<div></div>`);
      });

      test("checked=true", () => {
        expect(r(h.input(_, { checked: h.CHECKED(true) }))).toBe(`<input checked />`);
      });

      test("checked=false", () => {
        expect(r(h.input(_, { checked: h.CHECKED(false) }))).toBe(`<input />`);
      });

      test(`value=""`, () => {
        expect(r(h.input(_, { value: h.VALUE("") }))).toBe(`<input />`);
      });

      test(`value="abc"`, () => {
        expect(r(h.input(_, { value: h.VALUE("abc") }))).toBe(`<input value="abc" />`);
      });

      test(`content=""`, () => {
        expect(r(h.textarea(_, { content: h.CONTENT("") }))).toBe(`<textarea></textarea>`);
      });

      test(`content="abc"`, () => {
        expect(r(h.textarea(_, { content: h.CONTENT("abc") }))).toBe(`<textarea>abc</textarea>`);
      });
    });
  });

  describe("SVG", () => {
    const s = useSVG();

    describe("attribute directives", () => {
      describe("XLINK_ATTR", () => {
        test("empty string", () => {
          expect(r(s.a(_, { href: s.XLINK_ATTR("") }))).toBe(`<a xlink:href />`);
        });

        test("string", () => {
          expect(r(s.a(_, { href: s.XLINK_ATTR("abc") }))).toBe(`<a xlink:href="abc" />`);
        });
      });

      describe("XML_ATTR", () => {
        test("empty string", () => {
          expect(r(s.a(_, { text: s.XML_ATTR("") }))).toBe(`<a xml:text />`);
        });

        test("string", () => {
          expect(r(s.a(_, { text: s.XML_ATTR("abc") }))).toBe(`<a xml:text="abc" />`);
        });
      });
    });
  });

  describe("escape", () => {
    test("attribute values", () => {
      expect(r(h.div("", { id: `"&` }))).toBe(`<div id="&quot;&amp;"></div>`);
    });

    test("style values", () => {
      expect(r(h.div("", { style: { color: `"&` } }))).toBe(`<div style="color:&quot;&amp;"></div>`);
    });

    test("single-child text", () => {
      expect(r(h.div(_, _, `<&`))).toBe(`<div>&lt;&amp;</div>`);
    });
  });

  describe("restore global state on error", () => {
    test("context", () => {
      const ContextProvider = useComputedValue(() => ivi.contextValue<number>());
      const ThrowError = ivi.statelessComponent(() => { throw Error(); });

      try {
        r(ContextProvider.set(10, ThrowError()));
      } catch { /**/ }
      expect(ivi.getContext()).toBeNull();
    });
  });
});

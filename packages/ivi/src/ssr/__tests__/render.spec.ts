import { useResetModules, useIVI, useHTML } from "ivi-jest";
import { Op } from "ivi";

process.env.IVI_TARGET = "ssr";

useResetModules();
const ivi = useIVI();
const h = useHTML();
const _ = void 0;

describe("renderToString", () => {
  test("<div>", () => {
    expect(ivi.renderToString(h.div())).toBe("<div></div>");
  });

  test("<span>", () => {
    expect(ivi.renderToString(h.span())).toBe("<span></span>");
  });

  test("<div> ({} props)", () => {
    expect(ivi.renderToString(h.div("", {}))).toBe("<div></div>");
  });

  test("<div tabIndex='1'>", () => {
    expect(ivi.renderToString(h.div("", { tabIndex: 1 }))).toBe(`<div tabIndex="1"></div>`);
  });

  test("<div tabIndex='1' title='2'>", () => {
    expect(ivi.renderToString(h.div("", { tabIndex: 1, title: "2" }))).toBe(`<div tabIndex="1" title="2"></div>`);
  });

  test("<div data-abc='a'", () => {
    expect(ivi.renderToString(h.div("", { "data-abc": "a" }))).toBe(`<div data-abc="a"></div>`);
  });

  test("<div aria-type='button'", () => {
    expect(ivi.renderToString(h.div("", { "aria-type": "button" }))).toBe(`<div aria-type="button"></div>`);
  });

  test("<div boolean=false", () => {
    expect(ivi.renderToString(h.div("", { boolean: false }))).toBe(`<div></div>`);
  });

  test("<div boolean=true", () => {
    expect(ivi.renderToString(h.div("", { boolean: true }))).toBe(`<div boolean></div>`);
  });

  test("<div class=''>", () => {
    expect(ivi.renderToString(h.div(""))).toBe(`<div></div>`);
  });

  test("<div class='a'>", () => {
    expect(ivi.renderToString(h.div("a"))).toBe(`<div class="a"></div>`);
  });

  test("<div class='a b'>", () => {
    expect(ivi.renderToString(h.div("a b"))).toBe(`<div class="a b"></div>`);
  });

  test("<div style={}>", () => {
    expect(ivi.renderToString(h.div("", { style: {} }))).toBe(`<div></div>`);
  });

  test("<div style={top: 10px}>", () => {
    expect(ivi.renderToString(h.div("", { style: { top: "10px" } }))).toBe(`<div style="top:10px"></div>`);
  });

  test("<div style={top: 10px; left: 20px}>", () => {
    expect(ivi.renderToString(h.div("", { style: { top: "10px", left: "20px" } })))
      .toBe(`<div style="top:10px;left:20px"></div>`);
  });

  test("<div>'abc'</div>", () => {
    expect(ivi.renderToString(h.div(_, _, "abc"))).toBe(`<div>abc</div>`);
  });

  test("<div>10</div>", () => {
    expect(ivi.renderToString(h.div(_, _, 10))).toBe(`<div>10</div>`);
  });

  test("<div><span></div>", () => {
    expect(ivi.renderToString(h.div(_, _, h.span()))).toBe(`<div><span></span></div>`);
  });

  test("<div>[]</div>", () => {
    expect(ivi.renderToString(h.div(_, _, []))).toBe(`<div></div>`);
  });

  test("<div><span></div>", () => {
    expect(ivi.renderToString(h.div(_, _, h.span()))).toBe(`<div><span></span></div>`);
  });

  test("<div><span>, <strong></div>", () => {
    expect(ivi.renderToString(h.div(_, _, [h.span(), h.strong()])))
      .toBe(`<div><span></span><strong></strong></div>`);
  });

  test("<div>" +
    "  <div>'hello'</div>," +
    "  <div><span>'world'</span>, <div><span></div></div>," +
    "  <div><div></div>," +
    "  <div>" +
    "</div>", () => {
      expect(ivi.renderToString(h.div(_, _, [
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
      expect(ivi.renderToString(protoWithClassName()()))
        .toBe(`<div class="abc"></div>`);
    });

    test("override className", () => {
      expect(ivi.renderToString(protoWithClassName()("def")))
        .toBe(`<div class="def"></div>`);
    });

    test("predefined attribute", () => {
      expect(ivi.renderToString(protoWithAttr()()))
        .toBe(`<div id="123"></div>`);
    });

    test("override attribute", () => {
      expect(ivi.renderToString(protoWithAttr()(_, { id: "456" })))
        .toBe(`<div id="456"></div>`);
    });
  });

  describe("TrackByKey", () => {
    test("empty", () => {
      expect(ivi.renderToString(ivi.TrackByKey([])))
        .toBe(``);
    });

    test("several items", () => {
      expect(ivi.renderToString(ivi.TrackByKey([ivi.key(0, "a"), ivi.key(1, "b")])))
        .toBe(`ab`);
    });
  });

  describe("Component", () => {
    const Stateful = () => ivi.component(() => (op: Op) => op);

    test("empty stateful", () => {
      expect(ivi.renderToString(Stateful()(null)))
        .toBe(``);
    });

    test("stateful", () => {
      expect(ivi.renderToString(Stateful()("abc")))
        .toBe(`abc`);
    });
  });

  describe("Events", () => {
    test("empty event", () => {
      expect(ivi.renderToString(ivi.Events(ivi.onClick(() => false), null)))
        .toBe(``);
    });

    test("event with text child", () => {
      expect(ivi.renderToString(ivi.Events(ivi.onClick(() => false), "abc")))
        .toBe(`abc`);
    });
  });

  describe("children normalization", () => {
    test("<div><span>, [<strong>, <a>], <span></div>", () => {
      expect(ivi.renderToString(h.div(_, _, [h.span(), [h.strong(), h.div()], h.span()])))
        .toBe(`<div><span></span><strong></strong><div></div><span></span></div>`);
    });

    test("<div>'abc', []</div>", () => {
      expect(ivi.renderToString(h.div(_, _, ["abc", []]))).toBe(`<div>abc</div>`);
    });

    test("<div><div>, null, <span></div>", () => {
      expect(ivi.renderToString(h.div(_, _, [h.div(), null, h.span()])))
        .toBe(`<div><div></div><span></span></div>`);
    });

    test("<div><div>, 'abc', <span></div>", () => {
      expect(ivi.renderToString(h.div(_, _, [h.div(), "abc", h.span()])))
        .toBe(`<div><div></div>abc<span></span></div>`);
    });

    test("<div><div>, 123, <span></div>", () => {
      expect(ivi.renderToString(h.div(_, _, [h.div(), 123, h.span()])))
        .toBe(`<div><div></div>123<span></span></div>`);
    });
  });

  describe("special cases", () => {
    describe("newline-eating elements", () => {
      test("no newline", () => {
        expect(ivi.renderToString(h.textarea(_, _, "hello"))).toBe(`<textarea>hello</textarea>`);
      });

      test("single newline", () => {
        expect(ivi.renderToString(h.textarea(_, _, "\n"))).toBe(`<textarea>\n\n</textarea>`);
      });

      test("double newline", () => {
        expect(ivi.renderToString(h.textarea(_, _, "\n\n"))).toBe(`<textarea>\n\n\n</textarea>`);
      });
    });

    describe("attribute directives", () => {
      test("property", () => {
        expect(ivi.renderToString(h.div(_, { _prop: ivi.PROPERTY("value") }))).toBe(`<div></div>`);
      });

      test("unsafeHTML", () => {
        expect(ivi.renderToString(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("&") }))).toBe(`<div>&</div>`);
      });

      test("event", () => {
        expect(ivi.renderToString(h.div(_, { click: ivi.EVENT(() => true) }))).toBe(`<div></div>`);
      });

      test("autofocus=true", () => {
        expect(ivi.renderToString(h.div(_, { autofocus: ivi.AUTOFOCUS(true) }))).toBe(`<div autofocus></div>`);
      });

      test("autofocus=false", () => {
        expect(ivi.renderToString(h.div(_, { autofocus: ivi.AUTOFOCUS(false) }))).toBe(`<div></div>`);
      });

      test("checked=true", () => {
        expect(ivi.renderToString(h.input(_, { checked: h.CHECKED(true) }))).toBe(`<input checked />`);
      });

      test("checked=false", () => {
        expect(ivi.renderToString(h.input(_, { checked: h.CHECKED(false) }))).toBe(`<input />`);
      });

      test(`value=""`, () => {
        expect(ivi.renderToString(h.input(_, { value: h.VALUE("") }))).toBe(`<input />`);
      });

      test(`value="abc"`, () => {
        expect(ivi.renderToString(h.input(_, { value: h.VALUE("abc") }))).toBe(`<input value="abc" />`);
      });

      test(`content=""`, () => {
        expect(ivi.renderToString(h.textarea(_, { content: h.CONTENT("") }))).toBe(`<textarea></textarea>`);
      });

      test(`content="abc"`, () => {
        expect(ivi.renderToString(h.textarea(_, { content: h.CONTENT("abc") }))).toBe(`<textarea>abc</textarea>`);
      });
    });
  });

  describe("escape", () => {
    test("attribute values", () => {
      expect(ivi.renderToString(h.div("", { id: `"&` }))).toBe(`<div id="&quot;&amp;"></div>`);
    });

    test("style values", () => {
      expect(ivi.renderToString(h.div("", { style: { color: `"&` } }))).toBe(`<div style="color:&quot;&amp;"></div>`);
    });

    test("single-child text", () => {
      expect(ivi.renderToString(h.div(_, _, `<&`))).toBe(`<div>&lt;&amp;</div>`);
    });
  });
});

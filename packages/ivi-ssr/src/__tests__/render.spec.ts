import { _ } from "ivi-shared";
import { div, span, strong } from "ivi-html";
import { renderToString } from "../render";

describe("render", () => {
  test("<div>", () => {
    expect(renderToString(div())).toBe("<div></div>");
  });

  test("<span>", () => {
    expect(renderToString(span())).toBe("<span></span>");
  });

  test("<div> ({} props)", () => {
    expect(renderToString(div("", {}))).toBe("<div></div>");
  });

  test("<div tabIndex='1'>", () => {
    expect(renderToString(div("", { tabIndex: 1 }))).toBe(`<div tabIndex="1"></div>`);
  });

  test("<div tabIndex='1' title='2'>", () => {
    expect(renderToString(div("", { tabIndex: 1, title: "2" }))).toBe(`<div tabIndex="1" title="2"></div>`);
  });

  test("<div data-abc='a'", () => {
    expect(renderToString(div("", { "data-abc": "a" }))).toBe(`<div data-abc="a"></div>`);
  });

  test("<div aria-type='button'", () => {
    expect(renderToString(div("", { "aria-type": "button" }))).toBe(`<div aria-type="button"></div>`);
  });

  test("<div boolean=false", () => {
    expect(renderToString(div("", { boolean: false }))).toBe(`<div></div>`);
  });

  test("<div boolean=true", () => {
    expect(renderToString(div("", { boolean: true }))).toBe(`<div boolean></div>`);
  });

  test("<div class=''>", () => {
    expect(renderToString(div(""))).toBe(`<div></div>`);
  });

  test("<div class='a'>", () => {
    expect(renderToString(div("a"))).toBe(`<div class="a"></div>`);
  });

  test("<div class='a b'>", () => {
    expect(renderToString(div("a b"))).toBe(`<div class="a b"></div>`);
  });

  test("<div style={}>", () => {
    expect(renderToString(div("", { style: {} }))).toBe(`<div></div>`);
  });

  test("<div style={top: 10px}>", () => {
    expect(renderToString(div("", { style: { top: "10px" } }))).toBe(`<div style="top:10px"></div>`);
  });

  test("<div style={top: 10px; left: 20px}>", () => {
    expect(renderToString(div("", { style: { top: "10px", left: "20px" } })))
      .toBe(`<div style="top:10px;left:20px"></div>`);
  });

  test("<div>'abc'</div>", () => {
    expect(renderToString(div(_, _, "abc"))).toBe(`<div>abc</div>`);
  });

  test("<div>10</div>", () => {
    expect(renderToString(div(_, _, 10))).toBe(`<div>10</div>`);
  });

  test("<div><span></div>", () => {
    expect(renderToString(div(_, _, span()))).toBe(`<div><span></span></div>`);
  });

  test("<div>[]</div>", () => {
    expect(renderToString(div(_, _, []))).toBe(`<div></div>`);
  });

  test("<div><span></div>", () => {
    expect(renderToString(div(_, _, span()))).toBe(`<div><span></span></div>`);
  });

  test("<div><span>, <strong></div>", () => {
    expect(renderToString(div(_, _, [span(), strong()])))
      .toBe(`<div><span></span><strong></strong></div>`);
  });

  test("<div>" +
    "  <div>'hello'</div>," +
    "  <div><span>'world'</span>, <div><span></div></div>," +
    "  <div><div></div>," +
    "  <div>" +
    "</div>", () => {
      expect(renderToString(div(_, _, [
        div(_, _, "hello"),
        div(_, _, [span(_, _, "world"), div(_, _, span())]),
        div(_, _, div()),
        div(),
      ]))).toBe(`<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div>` +
        `</div><div></div></div>`);
    });

  describe("children normalization", () => {
    test("<div><span>, [<strong>, <a>], <span></div>", () => {
      expect(renderToString(div(_, _, [span(), [strong(), div()], span()])))
        .toBe(`<div><span></span><strong></strong><div></div><span></span></div>`);
    });

    test("<div>'abc', []</div>", () => {
      expect(renderToString(div(_, _, ["abc", []]))).toBe(`<div>abc</div>`);
    });

    test("<div><div>, null, <span></div>", () => {
      expect(renderToString(div(_, _, [div(), null, span()])))
        .toBe(`<div><div></div><span></span></div>`);
    });

    test("<div><div>, 'abc', <span></div>", () => {
      expect(renderToString(div(_, _, [div(), "abc", span()])))
        .toBe(`<div><div></div>abc<span></span></div>`);
    });

    test("<div><div>, 123, <span></div>", () => {
      expect(renderToString(div(_, _, [div(), 123, span()])))
        .toBe(`<div><div></div>123<span></span></div>`);
    });
  });

  // describe("special cases", () => {
  //   describe("newline-eating elements", () => {
  //     test("no newline", () => {
  //       expect(render(textarea(_, _, "hello"))).toBe(`<textarea>hello</textarea>`);
  //     });

  //     test("single newline", () => {
  //       expect(render(textarea(_, _, "\n"))).toBe(`<textarea>\n\n</textarea>`);
  //     });

  //     test("double newline", () => {
  //       expect(render(textarea(_, _, "\n\n"))).toBe(`<textarea>\n\n\n</textarea>`);
  //     });
  //   });
  // });

  describe("escape", () => {
    test("attribute values", () => {
      expect(renderToString(div("", { id: `"&` }))).toBe(`<div id="&quot;&amp;"></div>`);
    });

    test("style values", () => {
      expect(renderToString(div("", { style: { color: `"&` } }))).toBe(`<div style="color:&quot;&amp;"></div>`);
    });

    test("single-child text", () => {
      expect(renderToString(div(_, _, `<&`))).toBe(`<div>&lt;&amp;</div>`);
    });
  });
});

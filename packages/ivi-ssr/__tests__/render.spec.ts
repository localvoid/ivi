import { VNode, Component, componentFactory, renderToString, createBlueprint } from "../src";
import * as h from "./utils/html";
import { expect } from "iko";

interface TestComponentOptions {
  wrapDepth?: number;
}

class TestComponent extends Component<TestComponentOptions> {
  render(): VNode<any> {
    const { wrapDepth } = this.props;

    if (wrapDepth) {
      return tc({ wrapDepth: wrapDepth - 1 });
    }

    return h.div();
  }
}
const tc = componentFactory(TestComponent);

function StatelessTestComponent(props: TestComponentOptions): VNode<any> {
  const { wrapDepth } = props;

  if (wrapDepth) {
    return stc({ wrapDepth: wrapDepth - 1 });
  }

  return h.div();
}
const stc = componentFactory(StatelessTestComponent);

describe("renderToString", () => {
  it("'abc'", () => {
    expect(renderToString(h.t("abc"))).toBe("abc");
  });

  it("<div>", () => {
    expect(renderToString(h.div())).toBe("<div></div>");
  });

  it("<span>", () => {
    expect(renderToString(h.span())).toBe("<span></span>");
  });

  it("<div> (null props)", () => {
    expect(renderToString(h.div().attrs(null))).toBe("<div></div>");
  });

  it("<div> ({} props)", () => {
    expect(renderToString(h.div().attrs({}))).toBe("<div></div>");
  });

  it("<div tabIndex='1'>", () => {
    expect(renderToString(h.div().attrs({ tabIndex: 1 }))).toBe(`<div tabIndex="1"></div>`);
  });

  it("<div tabIndex='1' title='2'>", () => {
    expect(renderToString(h.div().attrs({ tabIndex: 1, title: "2" }))).toBe(`<div tabIndex="1" title="2"></div>`);
  });

  it("<div data-abc='a'", () => {
    expect(renderToString(h.div().attrs({ "data-abc": "a" }))).toBe(`<div data-abc="a"></div>`);
  });

  it("<div aria-type='button'", () => {
    expect(renderToString(h.div().attrs({ "aria-type": "button" }))).toBe(`<div aria-type="button"></div>`);
  });

  it("<div boolean=false", () => {
    expect(renderToString(h.div().attrs({ boolean: false }))).toBe(`<div></div>`);
  });

  it("<div boolean=true", () => {
    expect(renderToString(h.div().attrs({ boolean: true }))).toBe(`<div boolean></div>`);
  });

  it("<div class=null>", () => {
    expect(renderToString(h.div().className(null))).toBe(`<div></div>`);
  });

  it("<div class=''>", () => {
    expect(renderToString(h.div(""))).toBe(`<div class=""></div>`);
  });

  it("<div class='a'>", () => {
    expect(renderToString(h.div("a"))).toBe(`<div class="a"></div>`);
  });

  it("<div class='a b'>", () => {
    expect(renderToString(h.div("a b"))).toBe(`<div class="a b"></div>`);
  });

  it("<div style=null>", () => {
    expect(renderToString(h.div().style(null))).toBe(`<div></div>`);
  });

  it("<div style={}>", () => {
    expect(renderToString(h.div().style({}))).toBe(`<div></div>`);
  });

  it("<div style={top: 10px}>", () => {
    expect(renderToString(h.div().style({ top: "10px" }))).toBe(`<div style="top:10px"></div>`);
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    expect(renderToString(h.div().style({ top: "10px", left: "20px" })))
      .toBe(`<div style="top:10px;left:20px"></div>`);
  });

  it("<div></div> (null children)", () => {
    expect(renderToString(h.div().children(null))).toBe(`<div></div>`);
  });

  it("<div>'abc'</div>", () => {
    expect(renderToString(h.div().children("abc"))).toBe(`<div>abc</div>`);
  });

  it("<div>10</div>", () => {
    expect(renderToString(h.div().children(10))).toBe(`<div>10</div>`);
  });

  it("<div><span></div>", () => {
    expect(renderToString(h.div().children(h.span()))).toBe(`<div><span></span></div>`);
  });

  it("<div>[]</div>", () => {
    expect(renderToString(h.div().children([]))).toBe(`<div></div>`);
  });

  it("<div><span></div>", () => {
    expect(renderToString(h.div().children(h.span()))).toBe(`<div><span></span></div>`);
  });

  it("<div><span>, <strong></div>", () => {
    expect(renderToString(h.div().children(h.span(), h.strong())))
      .toBe(`<div><span></span><strong></strong></div>`);
  });

  it("<div>" +
    "  <div>'hello'</div>," +
    "  <div><span>'world'</span>, <div><span></div></div>," +
    "  <div><div></div>," +
    "  <div>" +
    "</div>", () => {
      expect(renderToString(h.div().children(
        h.div().children("hello"),
        h.div().children(h.span().children("world"), h.div().children(h.span())),
        h.div().children(h.div()),
        h.div(),
      ))).toBe(`<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div>` +
      `</div><div></div></div>`);
    });

  describe("svg", () => {
    it("<circle>", () => {
      expect(renderToString(h.circle())).toBe(`<circle></circle>`);
    });

    it("<circle class='a'>", () => {
      expect(renderToString(h.circle().className("a"))).toBe(`<circle class="a"></circle>`);
    });

    it("<circle style={top: 10px}>", () => {
      expect(renderToString(h.circle().style({ "top": "10px" }))).toBe(`<circle style="top:10px"></circle>`);
    });

    it("<circle xlink:href='a'>", () => {
      expect(renderToString(h.circle().attrs({ "xlink:href": "a" }))).toBe(`<circle xlink:href="a"></circle>`);
    });

    it("<circle xml:text='a'>", () => {
      expect(renderToString(h.circle().attrs({ "xml:text": "a" }))).toBe(`<circle xml:text="a"></circle>`);
    });
  });

  describe("children normalization", () => {
    it("<div><span>, [<strong>, <a>], <span></div>", () => {
      expect(renderToString(h.div().children(h.span(), [h.strong().key(0), h.div().key(1)], h.span())))
        .toBe(`<div><span></span><strong></strong><div></div><span></span></div>`);
    });

    it("<div>'abc', []</div>", () => {
      expect(renderToString(h.div().children("abc", []))).toBe(`<div>abc</div>`);
    });

    it("<div><div>, null, <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), null, h.span())))
        .toBe(`<div><div></div><span></span></div>`);
    });

    it("<div><div>, 'abc', <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), "abc", h.span())))
        .toBe(`<div><div></div>abc<span></span></div>`);
    });

    it("<div><div>, 123, <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), 123, h.span())))
        .toBe(`<div><div></div>123<span></span></div>`);
    });
  });

  describe("component", () => {
    it("<C><div></C>", () => {
      expect(renderToString(tc({}))).toBe(`<div></div>`);
    });

    it("<C><C><C><div></C></C></C>", () => {
      expect(renderToString(tc({ wrapDepth: 3 }))).toBe(`<div></div>`);
    });

    it("<F><div></F>", () => {
      expect(renderToString(stc({}))).toBe(`<div></div>`);
    });

    it("<F><F><F><div></F></F></F>", () => {
      expect(renderToString(stc({ wrapDepth: 3 }))).toBe(`<div></div>`);
    });
  });

  describe("special cases", () => {
    describe("input", () => {
      it("text", () => {
        expect(renderToString(h.inputText())).toBe(`<input type="text">`);
      });

      it("text with class", () => {
        expect(renderToString(h.inputText("abc"))).toBe(`<input type="text" class="abc">`);
      });

      it("text with class and props", () => {
        expect(renderToString(h.inputText("abc").attrs({ id: "123" })))
          .toBe(`<input type="text" class="abc" id="123">`);
      });

      it("text with class and props and value", () => {
        expect(renderToString(h.inputText("abc").attrs({ id: "123" }).value("val")))
          .toBe(`<input type="text" class="abc" value="val" id="123">`);
      });

      it("checkbox", () => {
        expect(renderToString(h.inputCheckbox())).toBe(`<input type="checkbox">`);
      });

      it("checkbox checked=false", () => {
        expect(renderToString(h.inputCheckbox().checked(false))).toBe(`<input type="checkbox">`);
      });

      it("checkbox checked=true", () => {
        expect(renderToString(h.inputCheckbox().checked(true))).toBe(`<input type="checkbox" checked>`);
      });
    });

    describe("newline-eating elements", () => {
      it("no newline", () => {
        expect(renderToString(h.textarea().children("hello"))).toBe(`<textarea>hello</textarea>`);
      });

      it("single newline", () => {
        expect(renderToString(h.textarea().children("\n"))).toBe(`<textarea>\n\n</textarea>`);
      });

      it("double newline", () => {
        expect(renderToString(h.textarea().children("\n\n"))).toBe(`<textarea>\n\n\n</textarea>`);
      });
    });

    describe("attributes", () => {
      it("accept-charset", () => {
        expect(renderToString(h.div().attrs({ acceptCharset: `utf-8` })))
          .toBe(`<div accept-charset="utf-8"></div>`);
      });

      it("for", () => {
        expect(renderToString(h.div().attrs({ htmlFor: `a` }))).toBe(`<div for="a"></div>`);
      });
    });
  });

  describe("escape", () => {
    it("attribute values", () => {
      expect(renderToString(h.div().attrs({ id: `"&` }))).toBe(`<div id="&quot;&amp;"></div>`);
    });

    it("style values", () => {
      expect(renderToString(h.div().style({ color: `"&` }))).toBe(`<div style="color:&quot;&amp;"></div>`);
    });

    it("single-child text", () => {
      expect(renderToString(h.div().children(`<&`))).toBe(`<div>&lt;&amp;</div>`);
    });

    it("text node content", () => {
      expect(renderToString(h.t(`<&`))).toBe(`&lt;&amp;`);
    });

    it("unsafeHTML", () => {
      expect(renderToString(h.div().unsafeHTML(`<&`))).toBe(`<div><&</div>`);
    });
  });

  describe("diff with blueprint", () => {
    describe("class", () => {
      it(`null => "a"`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div("a"), undefined, bp)).toBe(`<div class="a"></div>`);
      });

      it(`"a" => "a"`, () => {
        const bp = createBlueprint(h.div("a"));
        expect(renderToString(h.div("a"), undefined, bp)).toBe(`<div class="a"></div>`);
      });

      it(`"b" => "a"`, () => {
        const bp = createBlueprint(h.div("b"));
        expect(renderToString(h.div("a"), undefined, bp)).toBe(`<div class="a"></div>`);
      });
    });

    describe("props", () => {
      it(`null => {}`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div().attrs({}), undefined, bp)).toBe(`<div></div>`);
      });

      it(`{} => null`, () => {
        const bp = createBlueprint(h.div().attrs({}));
        expect(renderToString(h.div(), undefined, bp)).toBe(`<div></div>`);
      });

      it(`{} => {}`, () => {
        const bp = createBlueprint(h.div().attrs({}));
        expect(renderToString(h.div().attrs({}), undefined, bp)).toBe(`<div></div>`);
      });

      it(`null => { title: "abc" }`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div().attrs({ title: "abc" }), undefined, bp)).toBe(`<div title="abc"></div>`);
      });

      it(`{} => { title: "abc" }`, () => {
        const bp = createBlueprint(h.div().attrs({}));
        expect(renderToString(h.div().attrs({ title: "abc" }), undefined, bp)).toBe(`<div title="abc"></div>`);
      });

      it(`{ title: "abc" } => { title: "abc" }`, () => {
        const bp = createBlueprint(h.div().attrs({ title: "abc" }));
        expect(renderToString(h.div().attrs({ title: "abc" }), undefined, bp)).toBe(`<div title="abc"></div>`);
      });

      it(`{ title: "a" } => { title: "abc" }`, () => {
        const bp = createBlueprint(h.div().attrs({ title: "a" }));
        expect(renderToString(h.div().attrs({ title: "abc" }), undefined, bp)).toBe(`<div title="abc"></div>`);
      });
    });

    describe("style", () => {
      it(`null => {}`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div().style({}), undefined, bp)).toBe(`<div></div>`);
      });

      it(`{} => null`, () => {
        const bp = createBlueprint(h.div().style({}));
        expect(renderToString(h.div(), undefined, bp)).toBe(`<div></div>`);
      });

      it(`{} => {}`, () => {
        const bp = createBlueprint(h.div().style({}));
        expect(renderToString(h.div().style({}), undefined, bp)).toBe(`<div></div>`);
      });

      it(`null => { color: "green" }`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div().style({ color: "green" }), undefined, bp))
          .toBe(`<div style="color:green"></div>`);
      });

      it(`{} => { color: "green" }`, () => {
        const bp = createBlueprint(h.div().style({}));
        expect(renderToString(h.div().style({ color: "green" }), undefined, bp))
          .toBe(`<div style="color:green"></div>`);
      });

      it(`{ color: "green" } => { color: "green" }`, () => {
        const bp = createBlueprint(h.div().style({ color: "green" }));
        expect(renderToString(h.div().style({ color: "green" }), undefined, bp))
          .toBe(`<div style="color:green"></div>`);
      });

      it(`{color: "red" } => { color: "green" }`, () => {
        const bp = createBlueprint(h.div().style({ color: "red" }));
        expect(renderToString(h.div().style({ color: "green" }), undefined, bp))
          .toBe(`<div style="color:green"></div>`);
      });
    });

    describe("children", () => {
      describe("empty blueprint", () => {
        const bp = createBlueprint(h.div());
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBe(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBe(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBe(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBe(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span>a<strong></strong></div>`);
        });
      });

      describe("blueprint with basic text", () => {
        const bp = createBlueprint(h.div().children("a"));
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBe(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBe(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBe(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBe(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span>a<strong></strong></div>`);
        });
      });

      describe("blueprint with children element", () => {
        const bp = createBlueprint(h.div().children(h.span()));
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBe(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBe(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBe(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBe(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span>a<strong></strong></div>`);
        });

        it("unsafeHTML", () => {
          expect(renderToString(h.div().unsafeHTML("<&"), undefined, bp)).toBe(`<div><&</div>`);
        });
      });

      describe("blueprint with multiple children elements", () => {
        const bp = createBlueprint(h.div().children(h.span(), h.strong()));
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBe(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBe(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBe(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBe(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span>a<strong></strong></div>`);
        });
      });

      describe("blueprint with multiple keyed/non-keyed children elements", () => {
        const bp = createBlueprint(h.div().children(h.span().key(0), "a", h.strong().key(1)));
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBe(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBe(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBe(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBe(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBe(`<div><span></span>a<strong></strong></div>`);
        });

        it("reorder elements 1", () => {
          expect(renderToString(h.div().children(
            h.strong().key(1),
            "a",
            h.span().key(0),
          ), undefined, bp)).toBe(`<div><strong></strong>a<span></span></div>`);
        });
      });
    });
  });
});

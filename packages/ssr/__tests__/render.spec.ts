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
    expect(renderToString(h.t("abc"))).toBeEqual("abc");
  });

  it("<div>", () => {
    expect(renderToString(h.div())).toBeEqual("<div></div>");
  });

  it("<span>", () => {
    expect(renderToString(h.span())).toBeEqual("<span></span>");
  });

  it("<div> (null props)", () => {
    expect(renderToString(h.div().props(null))).toBeEqual("<div></div>");
  });

  it("<div> ({} props)", () => {
    expect(renderToString(h.div().props({}))).toBeEqual("<div></div>");
  });

  it("<div tabIndex='1'>", () => {
    expect(renderToString(h.div().props({ tabIndex: 1 }))).toBeEqual(`<div tabIndex="1"></div>`);
  });

  it("<div tabIndex='1' title='2'>", () => {
    expect(renderToString(h.div().props({ tabIndex: 1, title: "2" }))).toBeEqual(`<div tabIndex="1" title="2"></div>`);
  });

  it("<div data-abc='a'", () => {
    expect(renderToString(h.div().props({ "data-abc": "a" }))).toBeEqual(`<div data-abc="a"></div>`);
  });

  it("<div aria-type='button'", () => {
    expect(renderToString(h.div().props({ "aria-type": "button" }))).toBeEqual(`<div aria-type="button"></div>`);
  });

  it("<div boolean=false", () => {
    expect(renderToString(h.div().props({ boolean: false }))).toBeEqual(`<div></div>`);
  });

  it("<div boolean=true", () => {
    expect(renderToString(h.div().props({ boolean: true }))).toBeEqual(`<div boolean></div>`);
  });

  it("<div class=null>", () => {
    expect(renderToString(h.div().className(null))).toBeEqual(`<div></div>`);
  });

  it("<div class=''>", () => {
    expect(renderToString(h.div(""))).toBeEqual(`<div class=""></div>`);
  });

  it("<div class='a'>", () => {
    expect(renderToString(h.div("a"))).toBeEqual(`<div class="a"></div>`);
  });

  it("<div class='a b'>", () => {
    expect(renderToString(h.div("a b"))).toBeEqual(`<div class="a b"></div>`);
  });

  it("<div style=null>", () => {
    expect(renderToString(h.div().style(null))).toBeEqual(`<div></div>`);
  });

  it("<div style={}>", () => {
    expect(renderToString(h.div().style({}))).toBeEqual(`<div></div>`);
  });

  it("<div style={top: 10px}>", () => {
    expect(renderToString(h.div().style({ top: "10px" }))).toBeEqual(`<div style="top:10px"></div>`);
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    expect(renderToString(h.div().style({ top: "10px", left: "20px" })))
      .toBeEqual(`<div style="top:10px;left:20px"></div>`);
  });

  it("<div></div> (null children)", () => {
    expect(renderToString(h.div().children(null))).toBeEqual(`<div></div>`);
  });

  it("<div>'abc'</div>", () => {
    expect(renderToString(h.div().children("abc"))).toBeEqual(`<div>abc</div>`);
  });

  it("<div>10</div>", () => {
    expect(renderToString(h.div().children(10))).toBeEqual(`<div>10</div>`);
  });

  it("<div><span></div>", () => {
    expect(renderToString(h.div().children(h.span()))).toBeEqual(`<div><span></span></div>`);
  });

  it("<div>[]</div>", () => {
    expect(renderToString(h.div().children([]))).toBeEqual(`<div></div>`);
  });

  it("<div><span></div>", () => {
    expect(renderToString(h.div().children(h.span()))).toBeEqual(`<div><span></span></div>`);
  });

  it("<div><span>, <strong></div>", () => {
    expect(renderToString(h.div().children(h.span(), h.strong())))
      .toBeEqual(`<div><span></span><strong></strong></div>`);
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
      ))).toBeEqual(`<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div>` +
      `</div><div></div></div>`);
    });

  describe("svg", () => {
    it("<circle>", () => {
      expect(renderToString(h.circle())).toBeEqual(`<circle></circle>`);
    });

    it("<circle class='a'>", () => {
      expect(renderToString(h.circle().className("a"))).toBeEqual(`<circle class="a"></circle>`);
    });

    it("<circle style={top: 10px}>", () => {
      expect(renderToString(h.circle().style({ "top": "10px" }))).toBeEqual(`<circle style="top:10px"></circle>`);
    });

    it("<circle xlink:href='a'>", () => {
      expect(renderToString(h.circle().props({ "xlink:href": "a" }))).toBeEqual(`<circle xlink:href="a"></circle>`);
    });

    it("<circle xml:text='a'>", () => {
      expect(renderToString(h.circle().props({ "xml:text": "a" }))).toBeEqual(`<circle xml:text="a"></circle>`);
    });
  });

  describe("children normalization", () => {
    it("<div><span>, [<strong>, <a>], <span></div>", () => {
      expect(renderToString(h.div().children(h.span(), [h.strong().key(0), h.div().key(1)], h.span())))
        .toBeEqual(`<div><span></span><strong></strong><div></div><span></span></div>`);
    });

    it("<div>'abc', []</div>", () => {
      expect(renderToString(h.div().children("abc", []))).toBeEqual(`<div>abc</div>`);
    });

    it("<div><div>, null, <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), null, h.span())))
        .toBeEqual(`<div><div></div><span></span></div>`);
    });

    it("<div><div>, 'abc', <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), "abc", h.span())))
        .toBeEqual(`<div><div></div>abc<span></span></div>`);
    });

    it("<div><div>, 123, <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), 123, h.span())))
        .toBeEqual(`<div><div></div>123<span></span></div>`);
    });
  });

  describe("component", () => {
    it("<C><div></C>", () => {
      expect(renderToString(tc({}))).toBeEqual(`<div></div>`);
    });

    it("<C><C><C><div></C></C></C>", () => {
      expect(renderToString(tc({ wrapDepth: 3 }))).toBeEqual(`<div></div>`);
    });

    it("<F><div></F>", () => {
      expect(renderToString(stc({}))).toBeEqual(`<div></div>`);
    });

    it("<F><F><F><div></F></F></F>", () => {
      expect(renderToString(stc({ wrapDepth: 3 }))).toBeEqual(`<div></div>`);
    });
  });

  describe("special cases", () => {
    describe("input", () => {
      it("text", () => {
        expect(renderToString(h.inputText())).toBeEqual(`<input type="text">`);
      });

      it("text with class", () => {
        expect(renderToString(h.inputText("abc"))).toBeEqual(`<input type="text" class="abc">`);
      });

      it("text with class and props", () => {
        expect(renderToString(h.inputText("abc").props({ id: "123" })))
          .toBeEqual(`<input type="text" class="abc" id="123">`);
      });

      it("text with class and props and value", () => {
        expect(renderToString(h.inputText("abc").props({ id: "123" }).value("val")))
          .toBeEqual(`<input type="text" class="abc" value="val" id="123">`);
      });

      it("checkbox", () => {
        expect(renderToString(h.inputCheckbox())).toBeEqual(`<input type="checkbox">`);
      });

      it("checkbox checked=false", () => {
        expect(renderToString(h.inputCheckbox().checked(false))).toBeEqual(`<input type="checkbox">`);
      });

      it("checkbox checked=true", () => {
        expect(renderToString(h.inputCheckbox().checked(true))).toBeEqual(`<input type="checkbox" checked>`);
      });
    });

    describe("newline-eating elements", () => {
      it("no newline", () => {
        expect(renderToString(h.textarea().children("hello"))).toBeEqual(`<textarea>hello</textarea>`);
      });

      it("single newline", () => {
        expect(renderToString(h.textarea().children("\n"))).toBeEqual(`<textarea>\n\n</textarea>`);
      });

      it("double newline", () => {
        expect(renderToString(h.textarea().children("\n\n"))).toBeEqual(`<textarea>\n\n\n</textarea>`);
      });
    });

    describe("attributes", () => {
      it("accept-charset", () => {
        expect(renderToString(h.div().props({ acceptCharset: `utf-8` })))
          .toBeEqual(`<div accept-charset="utf-8"></div>`);
      });

      it("for", () => {
        expect(renderToString(h.div().props({ htmlFor: `a` }))).toBeEqual(`<div for="a"></div>`);
      });
    });
  });

  describe("escape", () => {
    it("attribute values", () => {
      expect(renderToString(h.div().props({ id: `"&` }))).toBeEqual(`<div id="&quot;&amp;"></div>`);
    });

    it("style values", () => {
      expect(renderToString(h.div().style({ color: `"&` }))).toBeEqual(`<div style="color:&quot;&amp;"></div>`);
    });

    it("single-child text", () => {
      expect(renderToString(h.div().children(`<&`))).toBeEqual(`<div>&lt;&amp;</div>`);
    });

    it("text node content", () => {
      expect(renderToString(h.t(`<&`))).toBeEqual(`&lt;&amp;`);
    });

    it("unsafeHTML", () => {
      expect(renderToString(h.div().unsafeHTML(`<&`))).toBeEqual(`<div><&</div>`);
    });
  });

  describe("diff with blueprint", () => {
    describe("class", () => {
      it(`null => "a"`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div("a"), undefined, bp)).toBeEqual(`<div class="a"></div>`);
      });

      it(`"a" => "a"`, () => {
        const bp = createBlueprint(h.div("a"));
        expect(renderToString(h.div("a"), undefined, bp)).toBeEqual(`<div class="a"></div>`);
      });

      it(`"b" => "a"`, () => {
        const bp = createBlueprint(h.div("b"));
        expect(renderToString(h.div("a"), undefined, bp)).toBeEqual(`<div class="a"></div>`);
      });
    });

    describe("props", () => {
      it(`null => {}`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div().props({}), undefined, bp)).toBeEqual(`<div></div>`);
      });

      it(`{} => null`, () => {
        const bp = createBlueprint(h.div().props({}));
        expect(renderToString(h.div(), undefined, bp)).toBeEqual(`<div></div>`);
      });

      it(`{} => {}`, () => {
        const bp = createBlueprint(h.div().props({}));
        expect(renderToString(h.div().props({}), undefined, bp)).toBeEqual(`<div></div>`);
      });

      it(`null => { title: "abc" }`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div().props({ title: "abc" }), undefined, bp)).toBeEqual(`<div title="abc"></div>`);
      });

      it(`{} => { title: "abc" }`, () => {
        const bp = createBlueprint(h.div().props({}));
        expect(renderToString(h.div().props({ title: "abc" }), undefined, bp)).toBeEqual(`<div title="abc"></div>`);
      });

      it(`{ title: "abc" } => { title: "abc" }`, () => {
        const bp = createBlueprint(h.div().props({ title: "abc" }));
        expect(renderToString(h.div().props({ title: "abc" }), undefined, bp)).toBeEqual(`<div title="abc"></div>`);
      });

      it(`{ title: "a" } => { title: "abc" }`, () => {
        const bp = createBlueprint(h.div().props({ title: "a" }));
        expect(renderToString(h.div().props({ title: "abc" }), undefined, bp)).toBeEqual(`<div title="abc"></div>`);
      });
    });

    describe("style", () => {
      it(`null => {}`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div().style({}), undefined, bp)).toBeEqual(`<div></div>`);
      });

      it(`{} => null`, () => {
        const bp = createBlueprint(h.div().style({}));
        expect(renderToString(h.div(), undefined, bp)).toBeEqual(`<div></div>`);
      });

      it(`{} => {}`, () => {
        const bp = createBlueprint(h.div().style({}));
        expect(renderToString(h.div().style({}), undefined, bp)).toBeEqual(`<div></div>`);
      });

      it(`null => { color: "green" }`, () => {
        const bp = createBlueprint(h.div());
        expect(renderToString(h.div().style({ color: "green" }), undefined, bp))
          .toBeEqual(`<div style="color:green"></div>`);
      });

      it(`{} => { color: "green" }`, () => {
        const bp = createBlueprint(h.div().style({}));
        expect(renderToString(h.div().style({ color: "green" }), undefined, bp))
          .toBeEqual(`<div style="color:green"></div>`);
      });

      it(`{ color: "green" } => { color: "green" }`, () => {
        const bp = createBlueprint(h.div().style({ color: "green" }));
        expect(renderToString(h.div().style({ color: "green" }), undefined, bp))
          .toBeEqual(`<div style="color:green"></div>`);
      });

      it(`{color: "red" } => { color: "green" }`, () => {
        const bp = createBlueprint(h.div().style({ color: "red" }));
        expect(renderToString(h.div().style({ color: "green" }), undefined, bp))
          .toBeEqual(`<div style="color:green"></div>`);
      });
    });

    describe("children", () => {
      describe("empty blueprint", () => {
        const bp = createBlueprint(h.div());
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBeEqual(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBeEqual(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBeEqual(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBeEqual(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span>a<strong></strong></div>`);
        });
      });

      describe("blueprint with basic text", () => {
        const bp = createBlueprint(h.div().children("a"));
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBeEqual(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBeEqual(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBeEqual(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBeEqual(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span>a<strong></strong></div>`);
        });
      });

      describe("blueprint with children element", () => {
        const bp = createBlueprint(h.div().children(h.span()));
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBeEqual(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBeEqual(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBeEqual(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBeEqual(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span>a<strong></strong></div>`);
        });

        it("unsafeHTML", () => {
          expect(renderToString(h.div().unsafeHTML("<&"), undefined, bp)).toBeEqual(`<div><&</div>`);
        });
      });

      describe("blueprint with multiple children elements", () => {
        const bp = createBlueprint(h.div().children(h.span(), h.strong()));
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBeEqual(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBeEqual(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBeEqual(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBeEqual(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span>a<strong></strong></div>`);
        });
      });

      describe("blueprint with multiple keyed/non-keyed children elements", () => {
        const bp = createBlueprint(h.div().children(h.span().key(0), "a", h.strong().key(1)));
        it("basic text", () => {
          expect(renderToString(h.div().children(
            "abc",
          ), undefined, bp)).toBeEqual(`<div>abc</div>`);
        });

        it("basic number", () => {
          expect(renderToString(h.div().children(
            123,
          ), undefined, bp)).toBeEqual(`<div>123</div>`);
        });

        it("adjacent text nodes", () => {
          expect(renderToString(h.div().children(
            "abc",
            "def",
          ), undefined, bp)).toBeEqual(`<div>abcdef</div>`);
        });

        it("element", () => {
          expect(renderToString(h.div().children(
            h.span(),
          ), undefined, bp)).toBeEqual(`<div><span></span></div>`);
        });

        it("elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span><strong></strong></div>`);
        });

        it("mixed elements", () => {
          expect(renderToString(h.div().children(
            h.span(),
            "a",
            h.strong(),
          ), undefined, bp)).toBeEqual(`<div><span></span>a<strong></strong></div>`);
        });

        it("reorder elements 1", () => {
          expect(renderToString(h.div().children(
            h.strong().key(1),
            "a",
            h.span().key(0),
          ), undefined, bp)).toBeEqual(`<div><strong></strong>a<span></span></div>`);
        });
      });
    });
  });
});

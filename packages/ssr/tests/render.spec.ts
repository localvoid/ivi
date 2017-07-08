(global as any).__IVI_BROWSER__ = false;
(global as any).__IVI_DEV__ = true;

import { VNode, Component, componentFactory, renderToString } from "../src";
import * as h from "./utils/html";
import { expect } from "chai";

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
    expect(renderToString(h.t("abc"))).to.equal("abc");
  });

  it("<div>", () => {
    expect(renderToString(h.div())).to.equal("<div></div>");
  });

  it("<span>", () => {
    expect(renderToString(h.span())).to.equal("<span></span>");
  });

  it("<div> (null props)", () => {
    expect(renderToString(h.div().props(null))).to.equal("<div></div>");
  });

  it("<div> ({} props)", () => {
    expect(renderToString(h.div().props({}))).to.equal("<div></div>");
  });

  it("<div tabIndex='1'>", () => {
    expect(renderToString(h.div().props({ tabIndex: 1 }))).to
      .equal(`<div tabIndex="1"></div>`);
  });

  it("<div tabIndex='1' title='2'>", () => {
    expect(renderToString(h.div().props({ tabIndex: 1, title: "2" }))).to
      .equal(`<div tabIndex="1" title="2"></div>`);
  });

  it("<div data-abc='a'", () => {
    expect(renderToString(h.div().props({ "data-abc": "a" }))).to
      .equal(`<div data-abc="a"></div>`);
  });

  it("<div aria-type='button'", () => {
    expect(renderToString(h.div().props({ "aria-type": "button" }))).to
      .equal(`<div aria-type="button"></div>`);
  });

  it("<div boolean=false", () => {
    expect(renderToString(h.div().props({ boolean: false }))).to
      .equal(`<div></div>`);
  });

  it("<div boolean=true", () => {
    expect(renderToString(h.div().props({ boolean: true }))).to
      .equal(`<div boolean></div>`);
  });

  it("<div class=null>", () => {
    expect(renderToString(h.div().className(null))).to
      .equal(`<div></div>`);
  });

  it("<div class=''>", () => {
    expect(renderToString(h.div(""))).to
      .equal(`<div class=""></div>`);
  });

  it("<div class='a'>", () => {
    expect(renderToString(h.div("a"))).to
      .equal(`<div class="a"></div>`);
  });

  it("<div class='a b'>", () => {
    expect(renderToString(h.div("a b"))).to
      .equal(`<div class="a b"></div>`);
  });

  it("<div style=null>", () => {
    expect(renderToString(h.div().style(null))).to
      .equal(`<div></div>`);
  });

  it("<div style={}>", () => {
    expect(renderToString(h.div().style({}))).to
      .equal(`<div></div>`);
  });

  it("<div style={top: 10px}>", () => {
    expect(renderToString(h.div().style({ top: "10px" }))).to
      .equal(`<div style="top:10px"></div>`);
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    expect(renderToString(h.div().style({ top: "10px", left: "20px" }))).to
      .equal(`<div style="top:10px;left:20px"></div>`);
  });

  it("<div></div> (null children)", () => {
    expect(renderToString(h.div().children(null))).to
      .equal(`<div></div>`);
  });

  it("<div>'abc'</div>", () => {
    expect(renderToString(h.div().children("abc"))).to
      .equal(`<div>abc</div>`);
  });

  it("<div>10</div>", () => {
    expect(renderToString(h.div().children(10))).to
      .equal(`<div>10</div>`);
  });

  it("<div><span></div>", () => {
    expect(renderToString(h.div().children(h.span()))).to
      .equal(`<div><span></span></div>`);
  });

  it("<div>[]</div>", () => {
    expect(renderToString(h.div().children([]))).to
      .equal(`<div></div>`);
  });

  it("<div><span></div>", () => {
    expect(renderToString(h.div().children(h.span()))).to
      .equal(`<div><span></span></div>`);
  });

  it("<div><span>, <strong></div>", () => {
    expect(renderToString(h.div().children(h.span(), h.strong()))).to
      .equal(`<div><span></span><strong></strong></div>`);
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
      ))).to
        .equal(`<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div>` +
        `</div><div></div></div>`);
    });

  describe("svg", () => {
    it("<circle>", () => {
      expect(renderToString(h.circle())).to
        .equal(`<circle></circle>`);
    });

    it("<circle class='a'>", () => {
      expect(renderToString(h.circle().className("a"))).to
        .equal(`<circle class="a"></circle>`);
    });

    it("<circle style={top: 10px}>", () => {
      expect(renderToString(h.circle().style({ "top": "10px" }))).to
        .equal(`<circle style="top:10px"></circle>`);
    });

    it("<circle xlink:href='a'>", () => {
      expect(renderToString(h.circle().props({ "xlink:href": "a" }))).to
        .equal(`<circle xlink:href="a"></circle>`);
    });

    it("<circle xml:text='a'>", () => {
      expect(renderToString(h.circle().props({ "xml:text": "a" }))).to
        .equal(`<circle xml:text="a"></circle>`);
    });
  });

  describe("children normalization", () => {
    it("<div><span>, [<strong>, <a>], <span></div>", () => {
      expect(renderToString(h.div().children(h.span(), [h.strong().key(0), h.div().key(1)], h.span()))).to
        .equal(`<div><span></span><strong></strong><div></div><span></span></div>`);
    });

    it("<div>'abc', []</div>", () => {
      expect(renderToString(h.div().children("abc", []))).to
        .equal(`<div>abc</div>`);
    });

    it("<div><div>, null, <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), null, h.span()))).to
        .equal(`<div><div></div><span></span></div>`);
    });

    it("<div><div>, 'abc', <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), "abc", h.span()))).to
        .equal(`<div><div></div>abc<span></span></div>`);
    });

    it("<div><div>, 123, <span></div>", () => {
      expect(renderToString(h.div().children(h.div(), 123, h.span()))).to
        .equal(`<div><div></div>123<span></span></div>`);
    });
  });

  describe("component", () => {
    it("<C><div></C>", () => {
      expect(renderToString(tc({}))).to
        .equal(`<div></div>`);
    });

    it("<C><C><C><div></C></C></C>", () => {
      expect(renderToString(tc({ wrapDepth: 3 }))).to
        .equal(`<div></div>`);
    });

    it("<F><div></F>", () => {
      expect(renderToString(stc({}))).to
        .equal(`<div></div>`);
    });

    it("<F><F><F><div></F></F></F>", () => {
      expect(renderToString(stc({ wrapDepth: 3 }))).to
        .equal(`<div></div>`);
    });
  });

  describe("special cases", () => {
    describe("input", () => {
      it("text", () => {
        expect(renderToString(h.inputText())).to
          .equal(`<input type="text">`);
      });

      it("text with class", () => {
        expect(renderToString(h.inputText("abc"))).to
          .equal(`<input type="text" class="abc">`);
      });

      it("text with class and props", () => {
        expect(renderToString(h.inputText("abc").props({ id: "123" }))).to
          .equal(`<input type="text" class="abc" id="123">`);
      });

      it("text with class and props and value", () => {
        expect(renderToString(h.inputText("abc").props({ id: "123" }).value("val"))).to
          .equal(`<input type="text" class="abc" value="val" id="123">`);
      });

      it("checkbox", () => {
        expect(renderToString(h.inputCheckbox())).to
          .equal(`<input type="checkbox">`);
      });

      it("checkbox checked=false", () => {
        expect(renderToString(h.inputCheckbox().checked(false))).to
          .equal(`<input type="checkbox">`);
      });

      it("checkbox checked=true", () => {
        expect(renderToString(h.inputCheckbox().checked(true))).to
          .equal(`<input type="checkbox" checked>`);
      });
    });

    describe("newline-eating elements", () => {
      it("no newline", () => {
        expect(renderToString(h.textarea().children("hello"))).to
          .equal(`<textarea>hello</textarea>`);
      });

      it("single newline", () => {
        expect(renderToString(h.textarea().children("\n"))).to
          .equal(`<textarea>\n\n</textarea>`);
      });

      it("double newline", () => {
        expect(renderToString(h.textarea().children("\n\n"))).to
          .equal(`<textarea>\n\n\n</textarea>`);
      });
    });

    describe("attributes", () => {
      it("accept-charset", () => {
        expect(renderToString(h.div().props({ acceptCharset: `utf-8` }))).to
          .equal(`<div accept-charset="utf-8"></div>`);
      });

      it("for", () => {
        expect(renderToString(h.div().props({ htmlFor: `a` }))).to
          .equal(`<div for="a"></div>`);
      });
    });
  });

  describe("escape", () => {
    it("attribute values", () => {
      expect(renderToString(h.div().props({ id: `"&` }))).to.equal(`<div id="&quot;&amp;"></div>`);
    });

    it("style values", () => {
      expect(renderToString(h.div().style({ color: `"&` }))).to.equal(`<div style="color:&quot;&amp;"></div>`);
    });

    it("single-child text", () => {
      expect(renderToString(h.div().children(`<&`))).to.equal(`<div>&lt;&amp;</div>`);
    });

    it("text node content", () => {
      expect(renderToString(h.t(`<&`))).to.equal(`&lt;&amp;`);
    });
  });
});

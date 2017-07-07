(global as any).__IVI_BROWSER__ = false;
(global as any).__IVI_DEV__ = true;

import { HTMLDivElementProps, HTMLSpanElementProps, HTMLElementProps, SVGCircleElementProps } from "ivi-core";
import { VNode, VNodeFlags, Component, componentFactory, renderToString } from "../src";
import { expect } from "chai";

function t(content: string | number | null): VNode<null> {
  return new VNode<null>(VNodeFlags.Text, null, null, null, content, null);
}

function div(className?: string): VNode<HTMLDivElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "<div",
    null,
    className === undefined ? null : className,
    null,
    "</div>",
  );
}

function span(className?: string): VNode<HTMLSpanElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "<span",
    null,
    className === undefined ? null : className,
    null,
    "</span>",
  );
}

function strong(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "<strong",
    null,
    className === undefined ? null : className,
    null,
    "</strong>",
  );
}

function circle(className?: string): VNode<SVGCircleElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<circle",
    null,
    className === undefined ? null : className,
    null,
    "</circle>",
  );
}

interface TestComponentOptions {
  wrapDepth?: number;
}

class TestComponent extends Component<TestComponentOptions> {
  render(): VNode<any> {
    const { wrapDepth } = this.props;

    if (wrapDepth) {
      return tc({ wrapDepth: wrapDepth - 1 });
    }

    return div();
  }
}
const tc = componentFactory(TestComponent);

function StatelessTestComponent(props: TestComponentOptions): VNode<any> {
  const { wrapDepth } = props;

  if (wrapDepth) {
    return stc({ wrapDepth: wrapDepth - 1 });
  }

  return div();
}
const stc = componentFactory(StatelessTestComponent);

describe("renderToString", () => {
  it("'abc'", () => {
    expect(renderToString(t("abc"))).to.equal("abc");
  });

  it("<div>", () => {
    expect(renderToString(div())).to.equal("<div></div>");
  });

  it("<span>", () => {
    expect(renderToString(span())).to.equal("<span></span>");
  });

  it("<div> (null props)", () => {
    expect(renderToString(div().props(null))).to.equal("<div></div>");
  });

  it("<div> ({} props)", () => {
    expect(renderToString(div().props({}))).to.equal("<div></div>");
  });

  it("<div tabIndex='1'>", () => {
    expect(renderToString(div().props({ tabIndex: 1 }))).to
      .equal(`<div tabIndex="1"></div>`);
  });

  it("<div tabIndex='1' title='2'>", () => {
    expect(renderToString(div().props({ tabIndex: 1, title: "2" }))).to
      .equal(`<div tabIndex="1" title="2"></div>`);
  });

  it("<div data-abc='a'", () => {
    expect(renderToString(div().props({ "data-abc": "a" }))).to
      .equal(`<div data-abc="a"></div>`);
  });

  it("<div aria-type='button'", () => {
    expect(renderToString(div().props({ "aria-type": "button" }))).to
      .equal(`<div aria-type="button"></div>`);
  });

  it("<div class=null>", () => {
    expect(renderToString(div().className(null))).to
      .equal(`<div></div>`);
  });

  it("<div class=''>", () => {
    expect(renderToString(div(""))).to
      .equal(`<div class=""></div>`);
  });

  it("<div class='a'>", () => {
    expect(renderToString(div("a"))).to
      .equal(`<div class="a"></div>`);
  });

  it("<div class='a b'>", () => {
    expect(renderToString(div("a b"))).to
      .equal(`<div class="a b"></div>`);
  });

  it("<div style=null>", () => {
    expect(renderToString(div().style(null))).to
      .equal(`<div></div>`);
  });

  it("<div style={}>", () => {
    expect(renderToString(div().style({}))).to
      .equal(`<div></div>`);
  });

  it("<div style={top: 10px}>", () => {
    expect(renderToString(div().style({ top: "10px" }))).to
      .equal(`<div style="top:10px"></div>`);
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    expect(renderToString(div().style({ top: "10px", left: "20px" }))).to
      .equal(`<div style="top:10px;left:20px"></div>`);
  });

  it("<div></div> (null children)", () => {
    expect(renderToString(div().children(null))).to
      .equal(`<div></div>`);
  });

  it("<div>'abc'</div>", () => {
    expect(renderToString(div().children("abc"))).to
      .equal(`<div>abc</div>`);
  });

  it("<div>10</div>", () => {
    expect(renderToString(div().children(10))).to
      .equal(`<div>10</div>`);
  });

  it("<div><span></div>", () => {
    expect(renderToString(div().children(span()))).to
      .equal(`<div><span></span></div>`);
  });

  it("<div>[]</div>", () => {
    expect(renderToString(div().children([]))).to
      .equal(`<div></div>`);
  });

  it("<div><span></div>", () => {
    expect(renderToString(div().children(span()))).to
      .equal(`<div><span></span></div>`);
  });

  it("<div><span>, <strong></div>", () => {
    expect(renderToString(div().children(span(), strong()))).to
      .equal(`<div><span></span><strong></strong></div>`);
  });

  it("<div>" +
    "  <div>'hello'</div>," +
    "  <div><span>'world'</span>, <div><span></div></div>," +
    "  <div><div></div>," +
    "  <div>" +
    "</div>", () => {
      expect(renderToString(div().children(
        div().children("hello"),
        div().children(span().children("world"), div().children(span())),
        div().children(div()),
        div(),
      ))).to
        .equal(`<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div>` +
        `</div><div></div></div>`);
    });

  describe("svg", () => {
    it("<circle>", () => {
      expect(renderToString(circle())).to
        .equal(`<circle></circle>`);
    });

    it("<circle class='a'>", () => {
      expect(renderToString(circle().className("a"))).to
        .equal(`<circle class="a"></circle>`);
    });

    it("<circle style={top: 10px}>", () => {
      expect(renderToString(circle().style({ "top": "10px" }))).to
        .equal(`<circle style="top:10px"></circle>`);
    });

    it("<circle xlink:href='a'>", () => {
      expect(renderToString(circle().props({ "xlink:href": "a" }))).to
        .equal(`<circle xlink:href="a"></circle>`);
    });

    it("<circle xml:text='a'>", () => {
      expect(renderToString(circle().props({ "xml:text": "a" }))).to
        .equal(`<circle xml:text="a"></circle>`);
    });
  });

  describe("children normalization", () => {
    it("<div><span>, [<strong>, <a>], <span></div>", () => {
      expect(renderToString(div().children(span(), [strong().key(0), div().key(1)], span()))).to
        .equal(`<div><span></span><strong></strong><div></div><span></span></div>`);
    });

    it("<div>'abc', []</div>", () => {
      expect(renderToString(div().children("abc", []))).to
        .equal(`<div>abc</div>`);
    });

    it("<div><div>, null, <span></div>", () => {
      expect(renderToString(div().children(div(), null, span()))).to
        .equal(`<div><div></div><span></span></div>`);
    });

    it("<div><div>, 'abc', <span></div>", () => {
      expect(renderToString(div().children(div(), "abc", span()))).to
        .equal(`<div><div></div>abc<span></span></div>`);
    });

    it("<div><div>, 123, <span></div>", () => {
      expect(renderToString(div().children(div(), 123, span()))).to
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
});

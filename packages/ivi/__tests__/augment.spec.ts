import { augment, $tc, $tcf, $lc, checkDOMOps } from "./utils";
import * as h from "./utils/html";
import { expect } from "iko";

describe("augment", () => {
  it("'abc'", () => {
    checkDOMOps((c) => {
      augment(h.t("abc"), "abc");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>", () => {
    checkDOMOps((c) => {
      augment(h.div(), "<div></div>");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<span>", () => {
    checkDOMOps((c) => {
      augment(h.span(), "<span></span>");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div> (null props)", () => {
    checkDOMOps((c) => {
      augment(h.div().props(null), "<div></div>");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div> ({} props)", () => {
    checkDOMOps((c) => {
      augment(h.div().props({}), "<div></div>");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div tabIndex='1'>", () => {
    checkDOMOps((c) => {
      augment(h.div().props({ tabIndex: 1 }), `<div tabIndex="1"></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div tabIndex='1' title='2'>", () => {
    checkDOMOps((c) => {
      augment(h.div().props({ tabIndex: 1, title: "2" }), `<div tabIndex="1" title="2"></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div data-abc='a'", () => {
    checkDOMOps((c) => {
      augment(h.div().props({ "data-abc": "a" }), `<div data-abc="a"></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div aria-type='button'", () => {
    checkDOMOps((c) => {
      augment(h.div().props({ "aria-type": "button" }), `<div aria-type="button"></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div class=null>", () => {
    checkDOMOps((c) => {
      augment(h.div().className(null), `<div></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div class=''>", () => {
    checkDOMOps((c) => {
      augment(h.div(""), `<div class=""></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div class='a'>", () => {
    checkDOMOps((c) => {
      augment(h.div("a"), `<div class="a"></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div class='a b'>", () => {
    checkDOMOps((c) => {
      augment(h.div("a b"), `<div class="a b"></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div style=null>", () => {
    checkDOMOps((c) => {
      augment(h.div().style(null), `<div></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div style={}>", () => {
    checkDOMOps((c) => {
      augment(h.div().style({}), `<div></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div style={top: 10px}>", () => {
    checkDOMOps((c) => {
      augment(h.div().style({ top: "10px" }), `<div style="top:10px"></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    checkDOMOps((c) => {
      augment(h.div().style({ top: "10px", left: "20px" }), `<div style="top:10px;left:20px"></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div></div> (null children)", () => {
    checkDOMOps((c) => {
      augment(h.div().children(null), `<div></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>'abc'</div>", () => {
    checkDOMOps((c) => {
      augment(h.div().children("abc"), `<div>abc</div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>10</div>", () => {
    checkDOMOps((c) => {
      augment(h.div().children(10), `<div>10</div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div><span></div>", () => {
    checkDOMOps((c) => {
      augment(h.div().children(h.span()), `<div><span></span></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>[]</div>", () => {
    checkDOMOps((c) => {
      augment(h.div().children([]), `<div></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>[<span>]</div>", () => {
    checkDOMOps((c) => {
      augment(h.div().children(h.span()), `<div><span></span></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>[<span>, <strong>]</div>", () => {
    checkDOMOps((c) => {
      augment(h.div().children(h.span(), h.strong()), `<div><span></span><strong></strong></div>`);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>[" +
    "  <div>'hello'</div>," +
    "  <div>[<span>'world'</span>, <div><span></div>]</div>," +
    "  <div><div></div>," +
    "  <div>" +
    "]</div>", () => {
      checkDOMOps((c) => {
        augment(h.div().children(
          h.div().children("hello"),
          h.div().children(h.span().children("world"), h.div().children(h.span())),
          h.div().children(h.div()),
          h.div(),
        ), `<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div></div>` +
          `<div></div></div>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

  describe("svg", () => {
    it("<circle>", () => {
      checkDOMOps((c) => {
        augment(h.circle(), `<circle></circle>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<circle class='a'>", () => {
      checkDOMOps((c) => {
        augment(h.circle("a"), `<circle class="a"></circle>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<circle style={top: 10px}>", () => {
      checkDOMOps((c) => {
        augment(h.circle().style({ top: "10px" }), `<circle style="top:10px"></circle>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<circle xlink:href='a'>", () => {
      checkDOMOps((c) => {
        augment(h.circle().props({ "xlink:href": "a" }), `<circle xlink:href="a"></circle>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<circle xml:text='a'>", () => {
      checkDOMOps((c) => {
        augment(h.circle().props({ "xml:test": "a" }), `<circle xml:text="a"></circle>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });
  });

  describe("children normalization", () => {
    it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          h.div().children(
            h.span(),
            [h.strong().key("strong"), h.a().key("a")], h.span(),
          ),
          `<div><span></span><strong></strong><a></a><span></span></div>`,
        );
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<div>['abc', []]</div>", () => {
      checkDOMOps((c) => {
        augment(h.div().children("abc", []), `<div>abc</div>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<div>[<div>, null, <span>]</div>", () => {
      checkDOMOps((c) => {
        augment(h.div().children(h.div(), null, h.span()), `<div><div></div><span></span></div>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<div>[<div>, 'abc', <span>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          h.div().children(
            h.div(), "abc", h.span(),
          ),
          `<div><div></div>abc<span></span></div>`,
        );
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<div>[<div>, 123, <span>]</div>", () => {
      checkDOMOps((c) => {
        augment(h.div().children(h.div(), 123, h.span()), `<div><div></div>123<span></span></div>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });
  });

  describe("component", () => {
    it("<C><div></C>", () => {
      checkDOMOps((c) => {
        augment($tc(), `<div></div>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<C>''</C>", () => {
      checkDOMOps((c) => {
        augment($tc(""), ``);
        expect(c).toMatchDOMOps(1, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<C><C><C><div></C></C></C>", () => {
      checkDOMOps((c) => {
        augment($tc(h.div(), 3), `<div></div>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<C><C><C>''</C></C></C>", () => {
      checkDOMOps((c) => {
        augment($tc("", 3), ``);
        expect(c).toMatchDOMOps(1, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><div></F>", () => {
      checkDOMOps((c) => {
        augment($tcf(), `<div></div>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<F>''</F>", () => {
      checkDOMOps((c) => {
        augment($tcf(""), ``);
        expect(c).toMatchDOMOps(1, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><F><F><div></F></F></F>", () => {
      checkDOMOps((c) => {
        augment($tcf(h.div(), 3), `<div></div>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<F><F><F>''</F></F></F>", () => {
      checkDOMOps((c) => {
        augment($tcf("", 3), ``);
        expect(c).toMatchDOMOps(1, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<div><C>''</C></div>", () => {
      checkDOMOps((c) => {
        augment(
          h.div().children($lc("1", h.t(""))),
          `<div><!----></div>`);
        expect(c).toMatchDOMOps(1, 0, 1, 0, 0, 1, 0);
      });
    });

    it("<div>[<C>''</C>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          h.div().children($lc("1", h.t(""))),
          `<div><!----></div>`);
        expect(c).toMatchDOMOps(1, 0, 1, 0, 0, 1, 0);
      });
    });

    it("<div>[<C>''</C><C>''</C>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          h.div().children($lc("1", h.t("")), $lc("2", h.t(""))),
          `<div><!----><!----></div>`);
        expect(c).toMatchDOMOps(1, 0, 2, 0, 0, 2, 0);
      });
    });

    it("<div>[<C>''</C><div><C>''</C>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          h.div().children($lc("1", h.t("")), h.div(), $lc("2", h.t(""))),
          `<div><!----><div></div><!----></div>`);
        expect(c).toMatchDOMOps(1, 0, 2, 0, 0, 2, 0);
      });
    });
  });

  describe("special elements", () => {
    it("<input type='text'>", () => {
      checkDOMOps((c) => {
        augment(h.inputText(), `<input type="text"></input>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<input type='text' value='abc'>", () => {
      checkDOMOps((c) => {
        augment(h.inputText().value("abc"), `<input type="text" value="abc"></input>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<input type='checkbox'>", () => {
      checkDOMOps((c) => {
        augment(h.inputCheckbox(), `<input type="checkbox"></input>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<input type='checkbox' checked='true'>", () => {
      checkDOMOps((c) => {
        augment(h.inputCheckbox().checked(true), `<input type="checkbox" checked="true"></input>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<textarea>", () => {
      checkDOMOps((c) => {
        augment(h.textarea(), `<textarea></textarea>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<textarea>abc</textarea>", () => {
      checkDOMOps((c) => {
        augment(h.textarea().value("abc"), `<textarea>abc</textarea>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<audio>", () => {
      checkDOMOps((c) => {
        augment(h.audio(), `<audio></audio>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<audio volume=0.5>", () => {
      checkDOMOps((c) => {
        augment(h.audio().props({ volume: 0.5 }), `<audio volume="0.5"></audio>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<video volume=0.5>", () => {
      checkDOMOps((c) => {
        augment(h.video().props({ volume: 0.5 }), `<video volume="0.5"></video>`);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });
  });

  describe("shouldAugment = false", () => {
    it("<C shouldAugment=false><div></C> (empty)", () => {
      checkDOMOps((c) => {
        augment($lc("1", { shouldAugment: () => false }, h.div()), ``);
        expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<C shouldAugment=false><div></C>", () => {
      checkDOMOps((c) => {
        augment($lc("1", { shouldAugment: () => false }, h.div()), `<div></div>`);
        expect(c).toMatchDOMOps(2, 0, 0, 0, 0, 1, 0);
      });
    });

    it("<div><C shouldAugment=false><div></C></div>", () => {
      checkDOMOps((c) => {
        augment(
          h.div().children($lc("1", { shouldAugment: () => false }, h.div())),
          `<div><div></div></div>`);
        expect(c).toMatchDOMOps(2, 0, 0, 0, 0, 1, 0);
      });
    });

    it("<div><C shouldAugment=false>''</C></div>", () => {
      checkDOMOps((c) => {
        augment(
          h.div().children($lc("1", { shouldAugment: () => false }, h.t(""))),
          `<div><!----></div>`);
        expect(c).toMatchDOMOps(1, 0, 1, 0, 0, 1, 0);
      });
    });
  });

  describe("Nesting rules violation", () => {
    it("<table><tr></table>", () => {
      expect(() => { augment(h.table().children(h.tr()), `<table><tr></tr></table>`); }).toThrow(Error);
    });

    it("<h1><h2></h1>", () => {
      expect(() => { augment(h.h1().children(h.h2()), `<h1><h2></h2></h1>`); }).toThrow(Error);
    });

    it("<h1><span><h2></span></h1>", () => {
      expect(() => {
        augment(h.h1().children(h.span().children(h.h2())), `<h1><span><h2></h2></span></h1>`);
      }).toThrow(Error);
    });
  });
});

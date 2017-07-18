import { augment, $tc, $tcf, $lc, checkDOMOps, text, html, svg, input, media } from "./utils";
import { expect } from "chai";

describe("augment", () => {
  it("'abc'", () => {
    checkDOMOps((c) => {
      augment(text("abc"), "abc");
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>", () => {
    checkDOMOps((c) => {
      augment(html("div"), "<div></div>");
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<span>", () => {
    checkDOMOps((c) => {
      augment(html("span"), "<span></span>");
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div> (null props)", () => {
    checkDOMOps((c) => {
      augment(html("div").props(null), "<div></div>");
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div> ({} props)", () => {
    checkDOMOps((c) => {
      augment(html("div").props({}), "<div></div>");
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div tabIndex='1'>", () => {
    checkDOMOps((c) => {
      augment(html("div").props({ tabIndex: 1 }), `<div tabIndex="1"></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div tabIndex='1' title='2'>", () => {
    checkDOMOps((c) => {
      augment(html("div").props({ tabIndex: 1, title: "2" }), `<div tabIndex="1" title="2"></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div data-abc='a'", () => {
    checkDOMOps((c) => {
      augment(html("div").props({ "data-abc": "a" }), `<div data-abc="a"></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div aria-type='button'", () => {
    checkDOMOps((c) => {
      augment(html("div").props({ "aria-type": "button" }), `<div aria-type="button"></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div class=null>", () => {
    checkDOMOps((c) => {
      augment(html("div").className(null), `<div></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div class=''>", () => {
    checkDOMOps((c) => {
      augment(html("div", ""), `<div class=""></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div class='a'>", () => {
    checkDOMOps((c) => {
      augment(html("div", "a"), `<div class="a"></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div class='a b'>", () => {
    checkDOMOps((c) => {
      augment(html("div", "a b"), `<div class="a b"></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div style=null>", () => {
    checkDOMOps((c) => {
      augment(html("div").style(null), `<div></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div style={}>", () => {
    checkDOMOps((c) => {
      augment(html("div").style({}), `<div></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div style={top: 10px}>", () => {
    checkDOMOps((c) => {
      augment(html("div").style({ top: "10px" }), `<div style="top:10px"></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    checkDOMOps((c) => {
      augment(html("div").style({ top: "10px", left: "20px" }), `<div style="top:10px;left:20px"></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div></div> (null children)", () => {
    checkDOMOps((c) => {
      augment(html("div").children(null), `<div></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>'abc'</div>", () => {
    checkDOMOps((c) => {
      augment(html("div").children("abc"), `<div>abc</div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>10</div>", () => {
    checkDOMOps((c) => {
      augment(html("div").children(10), `<div>10</div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div><span></div>", () => {
    checkDOMOps((c) => {
      augment(html("div").children(html("span")), `<div><span></span></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>[]</div>", () => {
    checkDOMOps((c) => {
      augment(html("div").children([]), `<div></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>[<span>]</div>", () => {
    checkDOMOps((c) => {
      augment(html("div").children(html("span")), `<div><span></span></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>[<span>, <strong>]</div>", () => {
    checkDOMOps((c) => {
      augment(html("div").children(html("span"), html("strong")), `<div><span></span><strong></strong></div>`);
      expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
    });
  });

  it("<div>[" +
    "  <div>'hello'</div>," +
    "  <div>[<span>'world'</span>, <div><span></div>]</div>," +
    "  <div><div></div>," +
    "  <div>" +
    "]</div>", () => {
      checkDOMOps((c) => {
        augment(html("div").children(
          html("div").children("hello"),
          html("div").children(html("span").children("world"), html("div").children(html("span"))),
          html("div").children(html("div")),
          html("div"),
        ), `<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div></div>` +
          `<div></div></div>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

  describe("svg", () => {
    it("<circle>", () => {
      checkDOMOps((c) => {
        augment(svg("circle"), `<circle></circle>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<circle class='a'>", () => {
      checkDOMOps((c) => {
        augment(svg("circle", "a"), `<circle class="a"></circle>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<circle style={top: 10px}>", () => {
      checkDOMOps((c) => {
        augment(svg("circle").style({ top: "10px" }), `<circle style="top:10px"></circle>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<circle xlink:href='a'>", () => {
      checkDOMOps((c) => {
        augment(svg("circle").props({ "xlink:href": "a" }), `<circle xlink:href="a"></circle>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<circle xml:text='a'>", () => {
      checkDOMOps((c) => {
        augment(svg("circle").props({ "xml:test": "a" }), `<circle xml:text="a"></circle>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });
  });

  describe("children normalization", () => {
    it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          html("div").children(
            html("span"),
            [html("strong").key("strong"), html("a").key("a")], html("span"),
          ),
          `<div><span></span><strong></strong><a></a><span></span></div>`,
        );
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<div>['abc', []]</div>", () => {
      checkDOMOps((c) => {
        augment(html("div").children("abc", []), `<div>abc</div>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<div>[<div>, null, <span>]</div>", () => {
      checkDOMOps((c) => {
        augment(html("div").children(html("div"), null, html("span")), `<div><div></div><span></span></div>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<div>[<div>, 'abc', <span>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          html("div").children(
            html("div"), "abc", html("span"),
          ),
          `<div><div></div>abc<span></span></div>`,
        );
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<div>[<div>, 123, <span>]</div>", () => {
      checkDOMOps((c) => {
        augment(html("div").children(html("div"), 123, html("span")), `<div><div></div>123<span></span></div>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });
  });

  describe("component", () => {
    it("<C><div></C>", () => {
      checkDOMOps((c) => {
        augment($tc(), `<div></div>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<C>''</C>", () => {
      checkDOMOps((c) => {
        augment($tc(""), ``);
        expect(c).to.matchDOMOps(1, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<C><C><C><div></C></C></C>", () => {
      checkDOMOps((c) => {
        augment($tc(html("div"), 3), `<div></div>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<C><C><C>''</C></C></C>", () => {
      checkDOMOps((c) => {
        augment($tc("", 3), ``);
        expect(c).to.matchDOMOps(1, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><div></F>", () => {
      checkDOMOps((c) => {
        augment($tcf(), `<div></div>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<F>''</F>", () => {
      checkDOMOps((c) => {
        augment($tcf(""), ``);
        expect(c).to.matchDOMOps(1, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><F><F><div></F></F></F>", () => {
      checkDOMOps((c) => {
        augment($tcf(html("div"), 3), `<div></div>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<F><F><F>''</F></F></F>", () => {
      checkDOMOps((c) => {
        augment($tcf("", 3), ``);
        expect(c).to.matchDOMOps(1, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<div><C>''</C></div>", () => {
      checkDOMOps((c) => {
        augment(
          html("div").children($lc("1", text(""))),
          `<div><!----></div>`);
        expect(c).to.matchDOMOps(1, 0, 1, 0, 0, 1, 0);
      });
    });

    it("<div>[<C>''</C>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          html("div").children($lc("1", text(""))),
          `<div><!----></div>`);
        expect(c).to.matchDOMOps(1, 0, 1, 0, 0, 1, 0);
      });
    });

    it("<div>[<C>''</C><C>''</C>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          html("div").children($lc("1", text("")), $lc("2", text(""))),
          `<div><!----><!----></div>`);
        expect(c).to.matchDOMOps(1, 0, 2, 0, 0, 2, 0);
      });
    });

    it("<div>[<C>''</C><div><C>''</C>]</div>", () => {
      checkDOMOps((c) => {
        augment(
          html("div").children($lc("1", text("")), html("div"), $lc("2", text(""))),
          `<div><!----><div></div><!----></div>`);
        expect(c).to.matchDOMOps(1, 0, 2, 0, 0, 2, 0);
      });
    });
  });

  describe("special elements", () => {
    it("<input type='text'>", () => {
      checkDOMOps((c) => {
        augment(input("text"), `<input type="text"></input>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<input type='text' value='abc'>", () => {
      checkDOMOps((c) => {
        augment(input("text").value("abc"), `<input type="text" value="abc"></input>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<input type='checkbox'>", () => {
      checkDOMOps((c) => {
        augment(input("checkbox"), `<input type="checkbox"></input>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<input type='checkbox' checked='true'>", () => {
      checkDOMOps((c) => {
        augment(input("checkbox").checked(true), `<input type="checkbox" checked="true"></input>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<textarea>", () => {
      checkDOMOps((c) => {
        augment(input("textarea"), `<textarea></textarea>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<textarea>abc</textarea>", () => {
      checkDOMOps((c) => {
        augment(input("textarea").value("abc"), `<textarea>abc</textarea>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<audio>", () => {
      checkDOMOps((c) => {
        augment(media("audio"), `<audio></audio>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<audio volume=0.5>", () => {
      checkDOMOps((c) => {
        augment(media("audio").props({ volume: 0.5 }), `<audio volume="0.5"></audio>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });

    it("<video volume=0.5>", () => {
      checkDOMOps((c) => {
        augment(media("video").props({ volume: 0.5 }), `<video volume="0.5"></video>`);
        expect(c).to.matchDOMOps(1, 0, 0, 0, 0, 0, 0);
      });
    });
  });

  describe("shouldAugment = false", () => {
    it("<C shouldAugment=false><div></C> (empty)", () => {
      checkDOMOps((c) => {
        augment($lc("1", { shouldAugment: () => false }, html("div")), ``);
        expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<C shouldAugment=false><div></C>", () => {
      checkDOMOps((c) => {
        augment($lc("1", { shouldAugment: () => false }, html("div")), `<div></div>`);
        expect(c).to.matchDOMOps(2, 0, 0, 0, 0, 1, 0);
      });
    });

    it("<div><C shouldAugment=false><div></C></div>", () => {
      checkDOMOps((c) => {
        augment(
          html("div").children($lc("1", { shouldAugment: () => false }, html("div"))),
          `<div><div></div></div>`);
        expect(c).to.matchDOMOps(2, 0, 0, 0, 0, 1, 0);
      });
    });

    it("<div><C shouldAugment=false>''</C></div>", () => {
      checkDOMOps((c) => {
        augment(
          html("div").children($lc("1", { shouldAugment: () => false }, text(""))),
          `<div><!----></div>`);
        expect(c).to.matchDOMOps(1, 0, 1, 0, 0, 1, 0);
      });
    });
  });

  describe("Nesting rules violation", () => {
    it("<table><tr></table>", () => {
      expect(() => { augment(html("table").children(html("tr")), `<table><tr></tr></table>`); }).to.throw(Error);
    });

    it("<h1><h2></h1>", () => {
      expect(() => { augment(html("h1").children(html("h2")), `<h1><h2></h2></h1>`); }).to.throw(Error);
    });

    it("<h1><span><h2></span></h1>", () => {
      expect(() => {
        augment(html("h1").children(html("span").children(html("h2"))), `<h1><span><h2></h2></span></h1>`);
      }).to.throw(Error);
    });
  });
});

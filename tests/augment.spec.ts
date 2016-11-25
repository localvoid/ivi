import { augment, TestComponent, TestComponentFunction } from "./utils";
import { $t, $h, $s, $c, $i, $m } from "../src/vdom/vnode_builder";

const expect = chai.expect;

describe("augment", () => {
    it("'abc'", () => {
        augment($t("abc"), "abc");
    });

    it("<div>", () => {
        augment($h("div"), "<div></div>");
    });

    it("<span>", () => {
        augment($h("span"), "<span></span>");
    });

    it("<div> (null props)", () => {
        augment($h("div").props(null), "<div></div>");
    });

    it("<div> ({} props)", () => {
        augment($h("div").props({}), "<div></div>");
    });

    it("<div tabIndex='1'>", () => {
        augment($h("div").props({ tabIndex: 1 }), `<div tabIndex="1"></div>`);
    });

    it("<div tabIndex='1' title='2'>", () => {
        augment($h("div").props({ tabIndex: 1, title: "2" }), `<div tabIndex="1" title="2"></div>`);
    });

    it("<div data-abc='a'", () => {
        augment($h("div").props({ "data-abc": "a" }), `<div data-abc="a"></div>`);
    });

    it("<div aria-type='button'", () => {
        augment($h("div").props({ "aria-type": "button" }), `<div aria-type="button"></div>`);
    });

    it("<div class=null>", () => {
        augment($h("div").className(null), `<div></div>`);
    });

    it("<div class=''>", () => {
        augment($h("div", ""), `<div class=""></div>`);
    });

    it("<div class='a'>", () => {
        augment($h("div", "a"), `<div class="a"></div>`);
    });

    it("<div class='a b'>", () => {
        augment($h("div", "a b"), `<div class="a b"></div>`);
    });

    it("<div style=null>", () => {
        augment($h("div").style(null), `<div></div>`);
    });

    it("<div style={}>", () => {
        augment($h("div").style(""), `<div></div>`);
    });

    it("<div style={top: 10px}>", () => {
        augment($h("div").style({ top: "10px" }), `<div style="top:10px"></div>`);
    });

    it("<div style={top: 10px; left: 20px}>", () => {
        augment($h("div").style({ top: "10px", left: "20px" }), `<div style="top:10px;left:20px"></div>`);
    });

    it("<div></div> (null children)", () => {
        augment($h("div").children(null), `<div></div>`);
    });

    it("<div>'abc'</div>", () => {
        augment($h("div").children("abc"), `<div>abc</div>`);
    });

    it("<div>10</div>", () => {
        augment($h("div").children(10), `<div>10</div>`);
    });

    it("<div>true</div>", () => {
        augment($h("div").children(true), `<div>true</div>`);
    });

    it("<div><span></div>", () => {
        augment($h("div").children($h("span")), `<div><span></span></div>`);
    });

    it("<div>[]</div>", () => {
        augment($h("div").children([]), `<div></div>`);
    });

    it("<div>[<span>]</div>", () => {
        augment($h("div").children([$h("span")]), `<div><span></span></div>`);
    });

    it("<div>[<span>, <strong>]</div>", () => {
        augment($h("div").children([$h("span"), $h("strong")]), `<div><span></span><strong></strong></div>`);
    });

    it("<div>[" +
        "  <div>'hello'</div>," +
        "  <div>[<span>'world'</span>, <div><span></div>]</div>," +
        "  <div><div></div>," +
        "  <div>" +
        "]</div>", () => {
            augment($h("div").children([
                $h("div").children("hello"),
                $h("div").children([$h("span").children("world"), $h("div").children($h("span"))]),
                $h("div").children($h("div")),
                $h("div"),
            ]), `<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div></div>` +
                `<div></div></div>`);
        });

    describe("svg", () => {
        it("<circle>", () => {
            augment($s("circle"), `<circle></circle>`);
        });

        it("<circle class='a'>", () => {
            augment($s("circle", "a"), `<circle class="a"></circle>`);
        });

        it("<circle style={top: 10px}>", () => {
            augment($s("circle").style({ top: "10px" }), `<circle style="top:10px"></circle>`);
        });

        it("<circle xlink:href='a'>", () => {
            augment($s("circle").props({ "xlink:href": "a" }), `<circle xlink:href="a"></circle>`);
        });

        it("<circle xml:text='a'>", () => {
            augment($s("circle").props({ "xml:test": "a" }), `<circle xml:text="a"></circle>`);
        });
    });

    describe("children normalization", () => {
        it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
            augment($h("div").children([$h("span"), [$h("strong"), $h("a")], $h("span")]),
                `<div><span></span><strong></strong><a></a><span></span></div>`);
        });

        it("<div>['abc', []]</div>", () => {
            augment($h("div").children(["abc", []]), `<div>abc</div>`);
        });

        it("<div>[[[<div>, <span>]]]</div>", () => {
            augment($h("div").children([[[$h("div"), $h("span")]]]), `<div><div></div><span></span></div>`);
        });

        it("<div>[<div>, null, <span>]</div>", () => {
            augment($h("div").children([$h("div"), null, $h("span")]), `<div><div></div><span></span></div>`);
        });

        it("<div>[<div>, 'abc', <span>]</div>", () => {
            augment($h("div").children([$h("div"), "abc", $h("span")]), `<div><div></div>abc<span></span></div>`);
        });

        it("<div>[<div>, 123, <span>]</div>", () => {
            augment($h("div").children([$h("div"), 123, $h("span")]), `<div><div></div>123<span></span></div>`);
        });

        it("<div>[<div>, true, <span>]</div>", () => {
            augment($h("div").children([$h("div"), true, $h("span")]), `<div><div></div>true<span></span></div>`);
        });
    });

    describe("component", () => {
        it("<C><div></C>", () => {
            augment($c(TestComponent, {}), `<div></div>`);
        });

        it("<C>''</C> (render => undefined)", () => {
            augment($c(TestComponent, { returnUndefined: true }), ``);
        });

        it("<C><C><C><div></C></C></C>", () => {
            augment($c(TestComponent, { wrapDepth: 3 }), `<div></div>`);
        });

        it("<C><C><C>''</C></C></C> (render => undefined)", () => {
            augment($c(TestComponent, { returnUndefined: true, wrapDepth: 3 }), ``);
        });

        it("<F><div></F>", () => {
            augment($c(TestComponentFunction, {}), `<div></div>`);
        });

        it("<F>''</F> (render => undefined)", () => {
            augment($c(TestComponentFunction, { returnUndefined: true }), ``);
        });

        it("<F><F><F><div></F></F></F>", () => {
            augment($c(TestComponentFunction, { wrapDepth: 3 }), `<div></div>`);
        });

        it("<F><F><F>''</F></F></F> (render => undefined)", () => {
            augment($c(TestComponentFunction, { returnUndefined: true, wrapDepth: 3 }), ``);
        });
    });

    describe("special elements", () => {
        it("<input type='text'>", () => {
            augment($i("text"), `<input type="text"></input>`);
        });

        it("<input type='text' value='abc'>", () => {
            augment($i("text").value("abc"), `<input type="text" value="abc"></input>`);
        });

        it("<input type='checkbox'>", () => {
            augment($i("checkbox"), `<input type="checkbox"></input>`);
        });

        it("<input type='checkbox' checked='true'>", () => {
            augment($i("checkbox").checked(true), `<input type="checkbox" checked="true"></input>`);
        });

        it("<textarea>", () => {
            augment($i("textarea"), `<textarea></textarea>`);
        });

        it("<textarea>abc</textarea>", () => {
            augment($i("textarea").value("abc"), `<textarea>abc</textarea>`);
        });

        it("<audio>", () => {
            augment($m("audio"), `<audio></audio>`);
        });

        it("<audio volume=0.5>", () => {
            augment($m("audio").props({ volume: 0.5 }), `<audio volume="0.5"></audio>`);
        });

        it("<video volume=0.5>", () => {
            augment($m("video").props({ volume: 0.5 }), `<video volume="0.5"></video>`);
        });
    });

    describe("Nesting rules violation", () => {
        it("<table><tr></table>", () => {
            expect(() => { augment($h("table").children($h("tr")), `<table><tr></tr></table>`); }).to.throw(Error);
        });

        it("<h1><h2></h1>", () => {
            expect(() => { augment($h("h1").children($h("h2")), `<h1><h2></h2></h1>`); }).to.throw(Error);
        });

        it("<h1><span><h2></span></h1>", () => {
            expect(() => {
                augment($h("h1").children($h("span").children($h("h2"))), `<h1><span><h2></h2></span></h1>`);
            }).to.throw(Error);
        });
    });
});

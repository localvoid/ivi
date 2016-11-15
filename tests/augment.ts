import { augment, TestComponent, TestComponentFunction } from "./utils";
import { $t, $h, $s, $c, $i, $m } from "../src/vdom/vnode_builder";

const expect = chai.expect;

describe("augment", () => {
    it("'abc'", () => {
        augment($t("abc"));
    });

    it("<div>", () => {
        augment($h("div"));
    });

    it("<span>", () => {
        augment($h("span"));
    });

    it("<div> (null props)", () => {
        augment($h("div").props(null));
    });

    it("<div> ({} props)", () => {
        augment($h("div").props({}));
    });

    it("<div tabIndex='1'>", () => {
        augment($h("div").props({ tabIndex: 1 }));
    });

    it("<div tabIndex='1' title='2'>", () => {
        augment($h("div").props({ tabIndex: 1, title: "2" }));
    });

    it("<div data-abc='a'", () => {
        augment($h("div").props({ "data-abc": "a" }));
    });

    it("<div aria-type='button'", () => {
        augment($h("div").props({ "aria-type": "button" }));
    });

    it("<div class=null>", () => {
        augment($h("div").className(null));
    });

    it("<div class=''>", () => {
        augment($h("div", ""));
    });

    it("<div class='a'>", () => {
        augment($h("div", "a"));
    });

    it("<div class='a b'>", () => {
        augment($h("div", "a b"));
    });

    it("<div style=null>", () => {
        augment($h("div").style(null));
    });

    it("<div style=''>", () => {
        augment($h("div").style(""));
    });

    it("<div style={}>", () => {
        augment($h("div").style(""));
    });

    it("<div style='top: 10px'>", () => {
        augment($h("div").style("top: 10px"));
    });

    it("<div style={top: 10px}>", () => {
        augment($h("div").style({ top: "10px" }));
    });

    it("<div style={top: 10px; left: 20px}>", () => {
        augment($h("div").style({ top: "10px", left: "20px" }));
    });

    it("<div></div> (null children)", () => {
        augment($h("div").children(null));
    });

    it("<div>'abc'</div>", () => {
        augment($h("div").children("abc"));
    });

    it("<div>10</div>", () => {
        augment($h("div").children(10));
    });

    it("<div>true</div>", () => {
        augment($h("div").children(true));
    });

    it("<div><span></div>", () => {
        augment($h("div").children($h("span")));
    });

    it("<div>[]</div>", () => {
        augment($h("div").children([]));
    });

    it("<div>[<span>]</div>", () => {
        augment($h("div").children([$h("span")]));
    });

    it("<div>[<span>, <strong>]</div>", () => {
        augment($h("div").children([$h("span"), $h("strong")]));
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
            ]));
        });

    describe("svg", () => {
        it("<circle>", () => {
            augment($s("circle"));
        });

        it("<circle class='a'>", () => {
            augment($s("circle", "a"));
        });

        it("<circle style='top: 10px'>", () => {
            augment($s("circle").style("top: 10px"));
        });

        it("<circle style={top: 10px}>", () => {
            augment($s("circle").style({ top: "10px" }));
        });

        it("<circle xlink:href='a'>", () => {
            augment($s("circle").props({ "xlink:href": "a" }));
        });

        it("<circle xml:text='a'>", () => {
            augment($s("circle").props({ "xml:test": "a" }));
        });
    });

    describe("children normalization", () => {
        it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
            augment($h("div").children([$h("span"), [$h("strong"), $h("a")], $h("span")]));
        });

        it("<div>['abc', []]</div>", () => {
            augment($h("div").children(["abc", []]));
        });

        it("<div>[[[<div>, <span>]]]</div>", () => {
            augment($h("div").children([[[$h("div"), $h("span")]]]));
        });

        it("<div>[<div>, null, <span>]</div>", () => {
            augment($h("div").children([$h("div"), null, $h("span")]));
        });

        it("<div>[<div>, 'abc', <span>]</div>", () => {
            augment($h("div").children([$h("div"), "abc", $h("span")]));
        });

        it("<div>[<div>, 123, <span>]</div>", () => {
            augment($h("div").children([$h("div"), 123, $h("span")]));
        });

        it("<div>[<div>, true, <span>]</div>", () => {
            augment($h("div").children([$h("div"), true, $h("span")]));
        });
    });

    describe("component", () => {
        it("<C><div></C>", () => {
            augment($c(TestComponent, {}));
        });

        it("<C>''</C> (render => undefined)", () => {
            augment($c(TestComponent, { returnUndefined: true }));
        });

        it("<C><C><C><div></C></C></C>", () => {
            augment($c(TestComponent, { wrapDepth: 3 }));
        });

        it("<C><C><C>''</C></C></C> (render => undefined)", () => {
            augment($c(TestComponent, { returnUndefined: true, wrapDepth: 3 }));
        });

        it("<F><div></F>", () => {
            augment($c(TestComponentFunction, {}));
        });

        it("<F>''</F> (render => undefined)", () => {
            augment($c(TestComponentFunction, { returnUndefined: true }));
        });

        it("<F><F><F><div></F></F></F>", () => {
            augment($c(TestComponentFunction, { wrapDepth: 3 }));
        });

        it("<F><F><F>''</F></F></F> (render => undefined)", () => {
            augment($c(TestComponentFunction, { returnUndefined: true, wrapDepth: 3 }));
        });
    });

    describe("special elements", () => {
        it("<input type='text'>", () => {
            augment($i("text"));
        });

        it("<input type='text' value='abc'>", () => {
            augment($i("text").value("abc"));
        });

        it("<input type='checkbox'>", () => {
            augment($i("checkbox"));
        });

        it("<input type='checkbox checked=true'>", () => {
            augment($i("checkbox").checked(true));
        });

        it("<textarea>", () => {
            augment($i("textarea"));
        });

        it("<textarea>abc</textarea>", () => {
            augment($i("textarea").value("abc"));
        });

        it("<audio>", () => {
            augment($m("audio"));
        });

        it("<audio volume=0.5>", () => {
            augment($m("audio").props({ volume: 0.5 }));
        });

        it("<video volume=0.5>", () => {
            augment($m("video").props({ volume: 0.5 }));
        });
    });

    describe("Nesting rules violation", () => {
        it("<table><tr></table>", () => {
            expect(() => { augment($h("table").children($h("tr"))); }).to.throw(Error);
        });

        it("<h1><h2></h1>", () => {
            expect(() => { augment($h("h1").children($h("h2"))); }).to.throw(Error);
        });

        it("<h1><span><h2></span></h1>", () => {
            expect(() => { augment($h("h1").children($h("span").children($h("h2")))); }).to.throw(Error);
        });
    });
});

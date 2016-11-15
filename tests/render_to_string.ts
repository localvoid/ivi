import { TestComponent, TestComponentFunction } from "./utils";
import { $t, $h, $s, $c, $i, $m } from "../src/vdom/vnode_builder";
import { renderToString } from "../src/vdom/render_to_string";

const expect = chai.expect;

describe("renderToString", () => {
    it("'abc'", () => {
        expect(renderToString($t("abc"))).to.equal("<!---->abc<!---->");
    });

    it("<div>", () => {
        expect(renderToString($h("div"))).to.equal("<div></div>");
    });

    it("<span>", () => {
        expect(renderToString($h("span"))).to.equal("<span></span>");
    });

    it("<div> (null props)", () => {
        expect(renderToString($h("div").props(null))).to.equal("<div></div>");
    });

    it("<div> ({} props)", () => {
        expect(renderToString($h("div").props({}))).to.equal("<div></div>");
    });

    it("<div tabIndex='1'>", () => {
        expect(renderToString($h("div").props({ tabIndex: 1 }))).to
            .equal(`<div tabIndex="1"></div>`);
    });

    it("<div tabIndex='1' title='2'>", () => {
        expect(renderToString($h("div").props({ tabIndex: 1, title: "2" }))).to
            .equal(`<div tabIndex="1" title="2"></div>`);
    });

    it("<div data-abc='a'", () => {
        expect(renderToString($h("div").props({ "data-abc": "a" }))).to
            .equal(`<div data-abc="a"></div>`);
    });

    it("<div aria-type='button'", () => {
        expect(renderToString($h("div").props({ "aria-type": "button" }))).to
            .equal(`<div aria-type="button"></div>`);
    });

    it("<div class=null>", () => {
        expect(renderToString($h("div").className(null))).to
            .equal(`<div></div>`);
    });

    it("<div class=''>", () => {
        expect(renderToString($h("div").className(""))).to
            .equal(`<div class=""></div>`);
    });

    it("<div class='a'>", () => {
        expect(renderToString($h("div").className("a"))).to
            .equal(`<div class="a"></div>`);
    });

    it("<div class='a b'>", () => {
        expect(renderToString($h("div").className("a b"))).to
            .equal(`<div class="a b"></div>`);
    });

    it("<div style=null>", () => {
        expect(renderToString($h("div").style(null))).to
            .equal(`<div></div>`);
    });

    it("<div style=''>", () => {
        expect(renderToString($h("div").style(""))).to
            .equal(`<div style=""></div>`);
    });

    it("<div style={}>", () => {
        expect(renderToString($h("div").style({}))).to
            .equal(`<div></div>`);
    });

    it("<div style='top: 10px'>", () => {
        expect(renderToString($h("div").style("top:10px"))).to
            .equal(`<div style="top:10px"></div>`);
    });

    it("<div style={top: 10px}>", () => {
        expect(renderToString($h("div").style({ top: "10px" }))).to
            .equal(`<div style="top:10px"></div>`);
    });

    it("<div style={top: 10px; left: 20px}>", () => {
        expect(renderToString($h("div").style({ top: "10px", left: "20px" }))).to
            .equal(`<div style="top:10px;left:20px"></div>`);
    });

    it("<div></div> (null children)", () => {
        expect(renderToString($h("div").children(null))).to
            .equal(`<div></div>`);
    });

    it("<div>'abc'</div>", () => {
        expect(renderToString($h("div").children("abc"))).to
            .equal(`<div>abc</div>`);
    });

    it("<div>10</div>", () => {
        expect(renderToString($h("div").children(10))).to
            .equal(`<div>10</div>`);
    });

    it("<div>true</div>", () => {
        expect(renderToString($h("div").children(true))).to
            .equal(`<div>true</div>`);
    });

    it("<div><span></div>", () => {
        expect(renderToString($h("div").children($h("span")))).to
            .equal(`<div><span></span></div>`);
    });

    it("<div>[]</div>", () => {
        expect(renderToString($h("div").children([]))).to
            .equal(`<div></div>`);
    });

    it("<div>[<span>]</div>", () => {
        expect(renderToString($h("div").children([$h("span")]))).to
            .equal(`<div><span></span></div>`);
    });

    it("<div>[<span>, <strong>]</div>", () => {
        expect(renderToString($h("div").children([$h("span"), $h("strong")]))).to
            .equal(`<div><span></span><strong></strong></div>`);
    });

    it("<div>[" +
        "  <div>'hello'</div>," +
        "  <div>[<span>'world'</span>, <div><span></div>]</div>," +
        "  <div><div></div>," +
        "  <div>" +
        "]</div>", () => {
            expect(renderToString($h("div").children([
                $h("div").children("hello"),
                $h("div").children([$h("span").children("world"), $h("div").children($h("span"))]),
                $h("div").children($h("div")),
                $h("div"),
            ]))).to
                .equal(`<div><div>hello</div><div><span>world</span><div><span></span></div></div><div><div></div>` +
                `</div><div></div></div>`);
        });

    describe("svg", () => {
        it("<circle>", () => {
            expect(renderToString($s("circle"))).to
                .equal(`<circle></circle>`);
        });

        it("<circle class='a'>", () => {
            expect(renderToString($s("circle").className("a"))).to
                .equal(`<circle class="a"></circle>`);
        });

        it("<circle style='top: 10px'>", () => {
            expect(renderToString($s("circle").style("top:10px"))).to
                .equal(`<circle style="top:10px"></circle>`);
        });

        it("<circle style={top: 10px}>", () => {
            expect(renderToString($s("circle").style({ "top": "10px" }))).to
                .equal(`<circle style="top:10px"></circle>`);
        });

        it("<circle xlink:href='a'>", () => {
            expect(renderToString($s("circle").props({ "xlink:href": "a" }))).to
                .equal(`<circle xlink:href="a"></circle>`);
        });

        it("<circle xml:text='a'>", () => {
            expect(renderToString($s("circle").props({ "xml:text": "a" }))).to
                .equal(`<circle xml:text="a"></circle>`);
        });
    });

    describe("children normalization", () => {
        it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
            expect(renderToString($h("div").children([$h("span"), [$h("strong"), $h("a")], $h("span")]))).to
                .equal(`<div><span></span><strong></strong><a></a><span></span></div>`);
        });

        it("<div>['abc', []]</div>", () => {
            expect(renderToString($h("div").children(["abc", []]))).to
                .equal(`<div><!---->abc<!----></div>`);
        });

        it("<div>[[[<div>, <span>]]]</div>", () => {
            expect(renderToString($h("div").children([[[$h("div"), $h("span")]]]))).to
                .equal(`<div><div></div><span></span></div>`);
        });

        it("<div>[<div>, null, <span>]</div>", () => {
            expect(renderToString($h("div").children([$h("div"), null, $h("span")]))).to
                .equal(`<div><div></div><span></span></div>`);
        });

        it("<div>[<div>, 'abc', <span>]</div>", () => {
            expect(renderToString($h("div").children([$h("div"), "abc", $h("span")]))).to
                .equal(`<div><div></div><!---->abc<!----><span></span></div>`);
        });

        it("<div>[<div>, 123, <span>]</div>", () => {
            expect(renderToString($h("div").children([$h("div"), 123, $h("span")]))).to
                .equal(`<div><div></div><!---->123<!----><span></span></div>`);
        });

        it("<div>[<div>, true, <span>]</div>", () => {
            expect(renderToString($h("div").children([$h("div"), true, $h("span")]))).to
                .equal(`<div><div></div><!---->true<!----><span></span></div>`);
        });
    });

    describe("component", () => {
        it("<C><div></C>", () => {
            expect(renderToString($c(TestComponent, {}))).to
                .equal(`<div></div>`);
        });

        it("<C>''</C> (render => undefined)", () => {
            expect(renderToString($c(TestComponent, { returnUndefined: true }))).to
                .equal(``);
        });

        it("<C><C><C><div></C></C></C>", () => {
            expect(renderToString($c(TestComponent, { wrapDepth: 3 }))).to
                .equal(`<div></div>`);
        });

        it("<C><C><C>''</C></C></C> (render => undefined)", () => {
            expect(renderToString($c(TestComponent, { returnUndefined: true, wrapDepth: 3 }))).to
                .equal(``);
        });

        it("<F><div></F>", () => {
            expect(renderToString($c(TestComponentFunction, {}))).to
                .equal(`<div></div>`);
        });

        it("<F>''</F> (render => undefined)", () => {
            expect(renderToString($c(TestComponentFunction, { returnUndefined: true }))).to
                .equal(``);
        });

        it("<F><F><F><div></F></F></F>", () => {
            expect(renderToString($c(TestComponentFunction, { wrapDepth: 3 }))).to
                .equal(`<div></div>`);
        });

        it("<F><F><F>''</F></F></F> (render => undefined)", () => {
            expect(renderToString($c(TestComponentFunction, { returnUndefined: true, wrapDepth: 3 }))).to
                .equal(``);
        });
    });

    describe("special elements", () => {
        it("<input type='text'>", () => {
            expect(renderToString($i("text"))).to.equal(`<input type="text"></input>`);
        });

        it("<input type='text' value='abc'>", () => {
            expect(renderToString($i("text").value("abc"))).to.equal(`<input type="text" value="abc"></input>`);
        });

        it("<input type='checkbox'>", () => {
            expect(renderToString($i("checkbox"))).to.equal(`<input type="checkbox"></input>`);
        });

        it("<input type='checkbox checked=true'>", () => {
            expect(renderToString($i("checkbox").checked(true))).to
                .equal(`<input type="checkbox" checked="true"></input>`);
        });

        it("<textarea>", () => {
            expect(renderToString($i("textarea"))).to.equal(`<textarea></textarea>`);
        });

        it("<textarea>abc</textarea>", () => {
            expect(renderToString($i("textarea").value("abc"))).to.equal(`<textarea>abc</textarea>`);
        });

        it("<audio>", () => {
            expect(renderToString($m("audio"))).to.equal(`<audio></audio>`);
        });

        it("<audio volume=0.5>", () => {
            expect(renderToString($m("audio").props({ volume: 0.5 }))).to.equal(`<audio volume="0.5"></audio>`);
        });

        it("<video volume=0.5>", () => {
            expect(renderToString($m("video").props({ volume: 0.5 }))).to.equal(`<video volume="0.5"></video>`);
        });
    });

    describe("Nesting rules violation", () => {
        it("<table><tr></table>", () => {
            expect(() => { renderToString($h("table").children($h("tr"))); }).to.throw(Error);
        });

        it("<h1><h2></h1>", () => {
            expect(() => { renderToString($h("h1").children($h("h2"))); }).to.throw(Error);
        });

        it("<h1><span><h2></span></h1>", () => {
            expect(() => { renderToString($h("h1").children($h("span").children($h("h2")))); }).to.throw(Error);
        });
    });
});

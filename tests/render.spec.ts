import { SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE } from "../src/common/dom";
import { render, $tc, $tcf, $invalid } from "./utils";
import { $t, $h, $s, $i, $m, cloneVNode } from "../src/vdom/vnode";

const expect = chai.expect;

describe("render", () => {
    it("'abc'", () => {
        const n = render<Text>($t("abc"));
        expect(n.nodeValue).to.equal("abc");
    });

    it("<div>", () => {
        const n = render<HTMLElement>($h("div"));
        expect(n.tagName.toLowerCase()).to.equal("div");
    });

    it("<span>", () => {
        const n = render<HTMLElement>($h("span"));
        expect(n.tagName.toLowerCase()).to.equal("span");
    });

    it("<div> (null props)", () => {
        render<HTMLElement>($h("div").props(null));
    });

    it("<div> ({} props)", () => {
        render<HTMLElement>($h("div").props({}));
    });

    it("<div tabIndex='1'>", () => {
        const n = render<HTMLElement>($h("div").props({ tabIndex: 1 }));
        expect(n.tabIndex).to.equal(1);
    });

    it("<div tabIndex='1' title='2'>", () => {
        const n = render<HTMLElement>($h("div").props({ tabIndex: 1, title: "2" }));
        expect(n.tabIndex).to.equal(1);
        expect(n.title).to.equal("2");
    });

    it("<div data-abc='a'", () => {
        const n = render<HTMLElement>($h("div").props({ "data-abc": "a" }));
        expect(n.getAttribute("data-abc")).to.equal("a");
    });

    it("<div aria-type='button'", () => {
        const n = render<HTMLElement>($h("div").props({ "aria-type": "button" }));
        expect(n.getAttribute("aria-type")).to.equal("button");
    });

    it("<div class=null>", () => {
        const n = render<HTMLElement>($h("div").className(null));
        expect(n.className).to.equal("");
    });

    it("<div class=''>", () => {
        const n = render<HTMLElement>($h("div", ""));
        expect(n.getAttributeNode("class")).to.not.null;
        expect(n.className).to.equal("");
    });

    it("<div class='a'>", () => {
        const n = render<HTMLElement>($h("div", "a"));
        expect(n.classList.length).to.equal(1);
        expect(n.classList.contains("a")).to.true;
    });

    it("<div class='a b'>", () => {
        const n = render<HTMLElement>($h("div", "a b"));
        expect(n.classList.length).to.equal(2);
        expect(n.classList.contains("a")).to.true;
        expect(n.classList.contains("b")).to.true;
    });

    it("<div style=null>", () => {
        const n = render<HTMLElement>($h("div").style(null));
        expect(n.style.cssText).to.equal("");
    });

    it("<div style={top: 10px}>", () => {
        const n = render<HTMLElement>($h("div").style({ top: "10px" }));
        expect(n.style.top).to.equal("10px");
    });

    it("<div style={float: 'left'}>", () => {
        const n = render<HTMLElement>($h("div").style({ cssFloat: "left" }));
        expect(n.style.cssFloat).to.equal("left");
    });

    it("<div style={top: 10px; left: 20px}>", () => {
        const n = render<HTMLElement>($h("div").style({ top: "10px", left: "20px" }));
        expect(n.style.top).to.equal("10px");
        expect(n.style.left).to.equal("20px");
    });

    it("<div></div> (null children)", () => {
        const n = render<HTMLElement>($h("div").children(null));
        expect(n.childNodes.length).to.equal(0);
    });

    it("<div>'abc'</div>", () => {
        const n = render<HTMLElement>($h("div").children("abc"));
        expect(n.childNodes.length).to.equal(1);
        expect(n.firstChild!.nodeValue).to.equal("abc");
    });

    it("<div>10</div>", () => {
        const n = render<HTMLElement>($h("div").children(10));
        expect(n.childNodes.length).to.equal(1);
        expect(n.firstChild!.nodeValue).to.equal("10");
    });

    it("<div>false</div>", () => {
        const n = render<HTMLElement>($h("div").children(false));
        expect(n.childNodes.length).to.equal(0);
    });

    it("<div>true</div>", () => {
        const n = render<HTMLElement>($h("div").children(true));
        expect(n.childNodes.length).to.equal(0);
    });

    it("<div><span></div>", () => {
        const n = render<HTMLElement>($h("div").children($h("span")));
        expect(n.childNodes.length).to.equal(1);
        expect(n.children[0].tagName.toLowerCase()).to.equal("span");
    });

    it("<div>[]</div>", () => {
        const n = render<HTMLElement>($h("div").children([]));
        expect(n.childNodes.length).to.equal(0);
    });

    it("<div>[<span>]</div>", () => {
        const n = render<HTMLElement>($h("div").children([$h("span")]));
        expect(n.childNodes.length).to.equal(1);
        expect(n.children[0].tagName.toLowerCase()).to.equal("span");
    });

    it("<div>[<span>, <strong>]</div>", () => {
        const n = render<HTMLElement>($h("div").children([$h("span"), $h("strong")]));
        expect(n.childNodes.length).to.equal(2);
        expect(n.children[0].tagName.toLowerCase()).to.equal("span");
        expect(n.children[1].tagName.toLowerCase()).to.equal("strong");
    });

    it("<div>[" +
        "  <div>'hello'</div>," +
        "  <div>[<span>'world'</span>, <div><span></div>]</div>," +
        "  <div><div></div>," +
        "  <div>" +
        "]</div>", () => {
            const n = render<HTMLElement>($h("div").children([
                $h("div").children("hello"),
                $h("div").children([$h("span").children("world"), $h("div").children($h("span"))]),
                $h("div").children($h("div")),
                $h("div"),
            ]));
            expect(n.childNodes.length).to.equal(4);
            expect(n.children[0].tagName.toLowerCase()).to.equal("div");
            expect(n.children[1].tagName.toLowerCase()).to.equal("div");
            expect(n.children[2].tagName.toLowerCase()).to.equal("div");
            expect(n.children[3].tagName.toLowerCase()).to.equal("div");

            expect(n.children[0].childNodes.length).to.equal(1);
            expect(n.children[1].childNodes.length).to.equal(2);
            expect(n.children[2].childNodes.length).to.equal(1);
            expect(n.children[3].childNodes.length).to.equal(0);

            expect(n.children[0].firstChild!.nodeValue).to.equal("hello");

            expect(n.children[1].children[0].tagName.toLowerCase()).to.equal("span");
            expect(n.children[1].children[0].firstChild!.nodeValue).to.equal("world");
            expect(n.children[1].children[1].tagName.toLowerCase()).to.equal("div");
            expect(n.children[1].children[1].childNodes.length).to.equal(1);
            expect(n.children[1].children[1].children[0].tagName.toLowerCase()).to.equal("span");

            expect(n.children[2].children[0].tagName.toLowerCase()).to.equal("div");
        });

    describe("svg", () => {
        it("<circle>", () => {
            const n = render<SVGCircleElement>($s("circle"));
            expect(n.tagName.toLowerCase()).to.equal("circle");
            expect(n.namespaceURI).to.equal(SVG_NAMESPACE);
        });

        it("<circle class='a'>", () => {
            const n = render<SVGCircleElement>($s("circle", "a"));
            expect(n.getAttribute("class")).to.equal("a");
        });

        it("<circle style={top: 10px}>", () => {
            const n = render<SVGCircleElement>($s("circle").style({ top: "10px" }));
            expect(n.style.top).to.equal("10px");
        });

        it("<circle xlink:href='a'>", () => {
            const n = render<SVGCircleElement>($s("circle").props({ "xlink:href": "a" }));
            expect(n.getAttributeNS(XLINK_NAMESPACE, "href")).to.equal("a");
        });

        it("<circle xml:text='a'>", () => {
            const n = render<SVGCircleElement>($s("circle").props({ "xml:test": "a" }));
            expect(n.getAttributeNS(XML_NAMESPACE, "test")).to.equal("a");
        });
    });

    describe("children normalization", () => {
        it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
            const n = render<HTMLElement>(
                $h("div").children([$h("span"), [$h("strong").key("strong"), $h("a").key("a")], $h("span")]));
            expect(n.childNodes.length).to.equal(4);
            expect(n.children[0].tagName.toLowerCase()).to.equal("span");
            expect(n.children[1].tagName.toLowerCase()).to.equal("strong");
            expect(n.children[2].tagName.toLowerCase()).to.equal("a");
            expect(n.children[3].tagName.toLowerCase()).to.equal("span");
        });

        it("<div>['abc', []]</div>", () => {
            const n = render<HTMLElement>($h("div").children(["abc", []]));
            expect(n.childNodes.length).to.equal(1);
            expect(n.childNodes[0].nodeType).to.equal(Node.TEXT_NODE);
            expect(n.childNodes[0].nodeValue).to.equal("abc");
        });

        it("<div>[<div>, null, <span>]</div>", () => {
            const n = render<HTMLElement>($h("div").children([$h("div"), null, $h("span")]));
            expect(n.childNodes.length).to.equal(2);
            expect(n.children[0].tagName.toLowerCase()).to.equal("div");
            expect(n.children[1].tagName.toLowerCase()).to.equal("span");
        });

        it("<div>[<div>, 'abc', <span>]</div>", () => {
            const n = render<HTMLElement>($h("div").children([$h("div"), "abc", $h("span")]));
            expect(n.childNodes.length).to.equal(3);
            expect(n.children[0].tagName.toLowerCase()).to.equal("div");
            expect(n.childNodes[1].nodeValue).to.equal("abc");
            expect(n.children[1].tagName.toLowerCase()).to.equal("span");
        });

        it("<div>[<div>, 123, <span>]</div>", () => {
            const n = render<HTMLElement>($h("div").children([$h("div"), 123, $h("span")]));
            expect(n.childNodes.length).to.equal(3);
            expect(n.children[0].tagName.toLowerCase()).to.equal("div");
            expect(n.childNodes[1].nodeValue).to.equal("123");
            expect(n.children[1].tagName.toLowerCase()).to.equal("span");
        });

        it("<div>[<div>, true, <span>]</div>", () => {
            const n = render<HTMLElement>($h("div").children([$h("div"), true, $h("span")]));
            expect(n.childNodes.length).to.equal(2);
            expect(n.children[0].tagName.toLowerCase()).to.equal("div");
            expect(n.children[1].tagName.toLowerCase()).to.equal("span");
        });

        it("<div unsafeHTML='<span>abc</span>'></div>", () => {
            const n = render<HTMLElement>($h("div").unsafeHTML("<span>abc</span>"));
            expect(n.childNodes.length).to.equal(1);
            expect(n.children[0].tagName.toLowerCase()).to.equal("span");
            expect(n.children[0].firstChild!.nodeValue).to.equal("abc");
        });
    });

    describe("component", () => {
        it("<C><div></C>", () => {
            const n = render<HTMLElement>($tc());
            expect(n.tagName.toLowerCase()).to.equal("div");
        });

        it("<C>''</C>", () => {
            const n = render<HTMLElement>($tc(""));
            expect(n.nodeType).to.equal(Node.TEXT_NODE);
            expect(n.nodeValue).to.equal("");
        });

        it("<C><C><C><div></C></C></C>", () => {
            const n = render<HTMLElement>($tc($h("div"), 3));
            expect(n.tagName.toLowerCase()).to.equal("div");
        });

        it("<C><C><C>''</C></C></C>", () => {
            const n = render<HTMLElement>($tc("", 3));
            expect(n.nodeType).to.equal(Node.TEXT_NODE);
            expect(n.nodeValue).to.equal("");
        });

        it("<F><div></F>", () => {
            const n = render<HTMLElement>($tcf());
            expect(n.tagName.toLowerCase()).to.equal("div");
        });

        it("<F>''</F>", () => {
            const n = render<HTMLElement>($tcf(""));
            expect(n.nodeType).to.equal(Node.TEXT_NODE);
            expect(n.nodeValue).to.equal("");
        });

        it("<F><F><F><div></F></F></F>", () => {
            const n = render<HTMLElement>($tcf($h("div"), 3));
            expect(n.tagName.toLowerCase()).to.equal("div");
        });

        it("<F><F><F>''</F></F></F>", () => {
            const n = render<HTMLElement>($tcf("", 3));
            expect(n.nodeType).to.equal(Node.TEXT_NODE);
            expect(n.nodeValue).to.equal("");
        });

        it("<F><C>''</C></F>", () => {
            const n = render<HTMLElement>($tcf($tc("")));
            expect(n.nodeType).to.equal(Node.TEXT_NODE);
            expect(n.nodeValue).to.equal("");
        });

        it("<C><F>''</F></C>", () => {
            const n = render<HTMLElement>($tc($tcf("")));
            expect(n.nodeType).to.equal(Node.TEXT_NODE);
            expect(n.nodeValue).to.equal("");
        });
    });

    describe("special elements", () => {
        it("<input type='text'>", () => {
            const n = render<HTMLInputElement>($i("text"));
            expect(n.tagName.toLowerCase()).to.equal("input");
            expect(n.type).to.equal("text");
        });

        it("<input type='text' value='abc'>", () => {
            const n = render<HTMLInputElement>($i("text").value("abc"));
            expect(n.tagName.toLowerCase()).to.equal("input");
            expect(n.type).to.equal("text");
            expect(n.value).to.equal("abc");
        });

        it("<input type='checkbox'>", () => {
            const n = render<HTMLInputElement>($i("checkbox"));
            expect(n.tagName.toLowerCase()).to.equal("input");
            expect(n.type).to.equal("checkbox");
        });

        it("<input type='checkbox checked=true'>", () => {
            const n = render<HTMLInputElement>($i("checkbox").checked(true));
            expect(n.tagName.toLowerCase()).to.equal("input");
            expect(n.type).to.equal("checkbox");
            expect(n.checked).to.equal(true);
        });

        it("<textarea>", () => {
            const n = render<HTMLTextAreaElement>($i("textarea"));
            expect(n.tagName.toLowerCase()).to.equal("textarea");
        });

        it("<textarea>abc</textarea>", () => {
            const n = render<HTMLTextAreaElement>($i("textarea").value("abc"));
            expect(n.tagName.toLowerCase()).to.equal("textarea");
            expect(n.value).to.equal("abc");
        });

        it("<audio>", () => {
            const n = render<HTMLAudioElement>($m("audio"));
            expect(n.tagName.toLowerCase()).to.equal("audio");
        });

        it("<audio volume=0.5>", () => {
            const n = render<HTMLAudioElement>($m("audio").props({ volume: 0.5 }));
            expect(n.tagName.toLowerCase()).to.equal("audio");
            expect(n.volume).to.equal(0.5);
        });

        it("<video volume=0.5>", () => {
            const n = render<HTMLVideoElement>($m("video").props({ volume: 0.5 }));
            expect(n.tagName.toLowerCase()).to.equal("video");
            expect(n.volume).to.equal(0.5);
        });
    });

    describe("reusing vnodes", () => {
        it("<div>a</div>", () => {
            const v = $h("div").children("a");
            const a = render<HTMLDivElement>(v, undefined, true);
            const b = render<HTMLDivElement>(cloneVNode(v), undefined, true);
            expect(a.childNodes.length).to.equal(1);
            expect(a.firstChild!.nodeValue).to.equal("a");
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("a");
        });
    });

    describe("nesting rules violation", () => {
        it("<table><tr></table>", () => {
            expect(() => { render($h("table").children($h("tr"))); }).to.throw(Error);
        });

        it("<h1><h2></h1>", () => {
            expect(() => { render($h("h1").children($h("h2"))); }).to.throw(Error);
        });

        it("<h1><span><h2></span></h1>", () => {
            expect(() => { render($h("h1").children($h("span").children($h("h2")))); }).to.throw(Error);
        });
    });

    describe("XSS protection", () => {
        it("children", () => {
            const n = render<HTMLElement>($h("div").children($invalid()));
            expect(n.firstChild!.nodeType).to.equal(Node.TEXT_NODE);
        });
    });
});

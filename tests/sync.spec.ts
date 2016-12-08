import { ComponentFlags } from "../src/vdom/flags";
import { VNode } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { updateComponent } from "../src/vdom/implementation";
import { $t, $h, $c, $i, $m } from "../src/vdom/vnode_builder";
import { frag, render, TestComponent, TestComponentFunction } from "./utils";

const expect = chai.expect;

function genVNodes(item: any, keys: boolean): VNode<any> | VNode<any>[] {
    if (typeof item === "number") {
        return keys ? $t(item.toString()).key(item.toString()) : $t(item.toString());
    } else if (Array.isArray(item)) {
        let result: VNode<any>[] = [];
        for (let i = 0; i < item.length; i++) {
            result.push(genVNodes(item[i], keys) as VNode<any>);
        }
        return result;
    } else {
        let e = $h("div").key(item.key);
        if (keys) {
            e.children(genVNodes(item.children, keys) as VNode<any>[]);
        } else {
            e.children(genVNodes(item.children, keys) as VNode<any>[]);
        }
        return e;
    }
}

function checkInnerHtmlEquals(ax: VNode<any>[], bx: VNode<any>[], cx: VNode<any>[], keys: boolean): void {
    const a = $h("div");
    const b = $h("div");
    const c = $h("div");
    if (keys) {
        a.children(ax);
        b.children(bx);
        c.children(cx);
    } else {
        a.children(ax);
        b.children(bx);
        c.children(cx);
    }

    const aDiv = document.createElement("div");
    const bDiv = document.createElement("div");
    render(a, aDiv);
    render(b, bDiv);
    render(c, aDiv);

    expect(aDiv.innerHTML).to.equal(bDiv.innerHTML);
}

describe("sync", () => {
    describe("props", () => {
        it("null => {}", () => {
            const f = frag();
            render<HTMLElement>($h("div"), f);
            render<HTMLElement>($h("div").props({}), f);
        });

        it("{} => null", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({}), f);
            render<HTMLElement>($h("div"), f);
        });

        it("{} => {}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({}), f);
            render<HTMLElement>($h("div").props({}), f);
        });

        it("null => {title: 1}", () => {
            const f = frag();
            render<HTMLElement>($h("div"), f);
            const b = render<HTMLElement>($h("div").props({ title: "2" }), f);
            expect(b.title).to.equal("2");
        });

        it("{} => {title: 1}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({}), f);
            const b = render<HTMLElement>($h("div").props({ title: "2" }), f);
            expect(b.title).to.equal("2");
        });

        it("{title: 1} => {title: 2}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1" }), f);
            const b = render<HTMLElement>($h("div").props({ title: "2" }), f);
            expect(b.title).to.equal("2");
        });

        it("{} => {title: 2, tabIndex: 2}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({}), f);
            const b = render<HTMLElement>($h("div").props({ title: "2", tabIndex: 2 }), f);
            expect(b.title).to.equal("2");
            expect(b.tabIndex).to.equal(2);
        });

        it("{title: 1} => {title: 2, tabIndex: 2}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1" }), f);
            const b = render<HTMLElement>($h("div").props({ title: "2", tabIndex: 2 }), f);
            expect(b.title).to.equal("2");
            expect(b.tabIndex).to.equal(2);
        });

        it("{title: 1, tabIndex: 1} => {title: 2, tabIndex: 2}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1", tabIndex: 1 }), f);
            const b = render<HTMLElement>($h("div").props({ title: "2", tabIndex: 2 }), f);
            expect(b.title).to.equal("2");
            expect(b.tabIndex).to.equal(2);
        });

        it("{title: 1, tabIndex: 1} => {title: 1, tabIndex: 1}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1", tabIndex: 1 }), f);
            const b = render<HTMLElement>($h("div").props({ title: "1", tabIndex: 1 }), f);
            expect(b.title).to.equal("1");
            expect(b.tabIndex).to.equal(1);
        });

        it("{title: 1, tabIndex: 1} => {title: 2}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1", tabIndex: 1 }), f);
            const b = render<HTMLElement>($h("div").props({ title: "2" }), f);
            expect(b.title).to.equal("2");
            expect(b.tabIndex).to.lessThan(1);
        });

        it("{title: 1, tabIndex: 1} => {title: 2, lang: en}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1", tabIndex: 1 }), f);
            const b = render<HTMLElement>($h("div").props({ title: "2", lang: "en" }), f);
            expect(b.title).to.equal("2");
            expect(b.tabIndex).to.lessThan(1);
            expect(b.lang).to.equal("en");
        });

        it("{title: 1, tabIndex: 1} => {lang: en}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1", tabIndex: 1 }), f);
            const b = render<HTMLElement>($h("div").props({ lang: "en" }), f);
            expect(b.title).to.equal("");
            expect(b.tabIndex).to.lessThan(1);
            expect(b.lang).to.equal("en");
        });

        it("{title: 1, tabIndex: 1} => {}", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1", tabIndex: 1 }), f);
            const b = render<HTMLElement>($h("div").props({}), f);
            expect(b.title).to.equal("");
            expect(b.tabIndex).to.lessThan(1);
        });

        it("{title: 1, tabIndex: 1} => null", () => {
            const f = frag();
            render<HTMLElement>($h("div").props({ title: "1", tabIndex: 1 }), f);
            const b = render<HTMLElement>($h("div"), f);
            expect(b.title).to.equal("");
            expect(b.tabIndex).to.lessThan(1);
        });
    });

    describe("className", () => {
        it("null => 'a'", () => {
            const f = frag();
            render<HTMLElement>($h("div"), f);
            const b = render<HTMLElement>($h("div", "a"), f);
            expect(b.classList.length).to.equal(1);
            expect(b.classList.contains("a")).to.true;
        });

        it("'a' => null", () => {
            const f = frag();
            render<HTMLElement>($h("div", "a"), f);
            const b = render<HTMLElement>($h("div"), f);
            expect(b.classList.length).to.equal(0);
        });

        it("'a' => 'a'", () => {
            const f = frag();
            render<HTMLElement>($h("div", "a"), f);
            const b = render<HTMLElement>($h("div", "a"), f);
            expect(b.classList.length).to.equal(1);
            expect(b.classList.contains("a")).to.true;
        });

        it("null => 'a'", () => {
            const f = frag();
            render<HTMLElement>($h("div"), f);
            const b = render<HTMLElement>($h("div", "a b"), f);
            expect(b.classList.length).to.equal(2);
            expect(b.classList.contains("a")).to.true;
            expect(b.classList.contains("b")).to.true;
        });
    });

    describe("style", () => {
        it("{} => null", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({}), f);
            const b = render<HTMLElement>($h("div"), f);
            expect(b.style.cssText).to.equal("");
        });

        it("null => {}", () => {
            const f = frag();
            render<HTMLElement>($h("div"), f);
            const b = render<HTMLElement>($h("div").style({}), f);
            expect(b.style.cssText).to.equal("");
        });

        it("{} => {}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({}), f);
            const b = render<HTMLElement>($h("div").style({}), f);
            expect(b.style.cssText).to.equal("");
        });

        it("null => {top: 10px}", () => {
            const f = frag();
            render<HTMLElement>($h("div"), f);
            const b = render<HTMLElement>($h("div").style({ top: "10px" }), f);
            expect(b.style.top).to.equal("10px");
        });

        it("{} => {top: 10px}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({}), f);
            const b = render<HTMLElement>($h("div").style({ top: "10px" }), f);
            expect(b.style.top).to.equal("10px");
        });

        it("null => {top: 10px, left: 20px}", () => {
            const f = frag();
            render<HTMLElement>($h("div"), f);
            const b = render<HTMLElement>($h("div").style({ top: "10px", left: "20px" }), f);
            expect(b.style.top).to.equal("10px");
            expect(b.style.left).to.equal("20px");
        });

        it("{top: 1px} => {top: 10px, left: 20px}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({ top: "1px" }), f);
            const b = render<HTMLElement>($h("div").style({ top: "10px", left: "20px" }), f);
            expect(b.style.top).to.equal("10px");
            expect(b.style.left).to.equal("20px");
        });

        it("{top: 1px, left: 1px} => {top: 10px, left: 20px}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({ top: "1px", left: "1px" }), f);
            const b = render<HTMLElement>($h("div").style({ top: "10px", left: "20px" }), f);
            expect(b.style.top).to.equal("10px");
            expect(b.style.left).to.equal("20px");
        });

        it("{top: 1px, left: 1px} => {top: 10px, left: 20px, right: 30px}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({ top: "1px", left: "1px" }), f);
            const b = render<HTMLElement>($h("div").style({ top: "10px", left: "20px", right: "30px" }), f);
            expect(b.style.top).to.equal("10px");
            expect(b.style.left).to.equal("20px");
            expect(b.style.right).to.equal("30px");
        });

        it("{top: 1px, left: 1px} => {top: 10px, right: 30px}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({ top: "1px", left: "1px" }), f);
            const b = render<HTMLElement>($h("div").style({ top: "10px", right: "30px" }), f);
            expect(b.style.top).to.equal("10px");
            expect(b.style.left).to.equal("");
            expect(b.style.right).to.equal("30px");
        });

        it("{top: 1px, left: 1px} => {right: 30px}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({ top: "1px", left: "1px" }), f);
            const b = render<HTMLElement>($h("div").style({ right: "30px" }), f);
            expect(b.style.top).to.equal("");
            expect(b.style.left).to.equal("");
            expect(b.style.right).to.equal("30px");
        });

        it("{top: 1px, left: 1px} => {top: 1px}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({ top: "1px", left: "1px" }), f);
            const b = render<HTMLElement>($h("div").style({ top: "1px" }), f);
            expect(b.style.top).to.equal("1px");
            expect(b.style.left).to.equal("");
        });

        it("{top: 1px, left: 1px} => {}", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({ top: "1px", left: "1px" }), f);
            const b = render<HTMLElement>($h("div").style({}), f);
            expect(b.style.top).to.equal("");
            expect(b.style.left).to.equal("");
        });

        it("{top: 1px, left: 1px} => null", () => {
            const f = frag();
            render<HTMLElement>($h("div").style({ top: "1px", left: "1px" }), f);
            const b = render<HTMLElement>($h("div"), f);
            expect(b.style.top).to.equal("");
            expect(b.style.left).to.equal("");
        });
    });

    describe("children", () => {
        const TESTS = [
            [[0], [0]],
            [[0, 1, 2], [0, 1, 2]],

            [[], [1]],
            [[], [4, 9]],
            [[], [9, 3, 6, 1, 0]],

            [[999], [1]],
            [[999], [1, 999]],
            [[999], [999, 1]],
            [[999], [4, 9, 999]],
            [[999], [999, 4, 9]],
            [[999], [9, 3, 6, 1, 0, 999]],
            [[999], [999, 9, 3, 6, 1, 0]],
            [[999], [0, 999, 1]],
            [[999], [0, 3, 999, 1, 4]],
            [[999], [0, 999, 1, 4, 5]],

            [[998, 999], [1, 998, 999]],
            [[998, 999], [998, 999, 1]],
            [[998, 999], [998, 1, 999]],
            [[998, 999], [1, 2, 998, 999]],
            [[998, 999], [998, 999, 1, 2]],
            [[998, 999], [1, 998, 999, 2]],
            [[998, 999], [1, 998, 2, 999, 3]],
            [[998, 999], [1, 4, 998, 2, 5, 999, 3, 6]],
            [[998, 999], [1, 998, 2, 999]],
            [[998, 999], [998, 1, 999, 2]],
            [[998, 999], [1, 2, 998, 3, 4, 999]],
            [[998, 999], [998, 1, 2, 999, 3, 4]],
            [[998, 999], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 998, 999]],
            [[998, 999], [998, 999, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
            [[998, 999], [0, 1, 2, 3, 4, 998, 999, 5, 6, 7, 8, 9]],
            [[998, 999], [0, 1, 2, 998, 3, 4, 5, 6, 999, 7, 8, 9]],
            [[998, 999], [0, 1, 2, 3, 4, 998, 5, 6, 7, 8, 9, 999]],
            [[998, 999], [998, 0, 1, 2, 3, 4, 999, 5, 6, 7, 8, 9]],

            [[1], []],
            [[1, 2], [2]],
            [[1, 2], [1]],
            [[1, 2, 3], [2, 3]],
            [[1, 2, 3], [1, 2]],
            [[1, 2, 3], [1, 3]],
            [[1, 2, 3, 4, 5], [2, 3, 4, 5]],
            [[1, 2, 3, 4, 5], [1, 2, 3, 4]],
            [[1, 2, 3, 4, 5], [1, 2, 4, 5]],

            [[1, 2], []],
            [[1, 2, 3], [3]],
            [[1, 2, 3], [1]],
            [[1, 2, 3, 4], [3, 4]],
            [[1, 2, 3, 4], [1, 2]],
            [[1, 2, 3, 4], [1, 4]],
            [[1, 2, 3, 4, 5, 6], [2, 3, 4, 5]],
            [[1, 2, 3, 4, 5, 6], [2, 3, 5, 6]],
            [[1, 2, 3, 4, 5, 6], [1, 2, 3, 5]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7, 8, 9]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 6, 7, 8, 9]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 6, 7, 8]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 4, 6, 7, 8, 9]],

            [[0, 1], [1, 0]],
            [[0, 1, 2, 3], [3, 2, 1, 0]],
            [[0, 1, 2, 3, 4], [1, 2, 3, 4, 0]],
            [[0, 1, 2, 3, 4], [4, 0, 1, 2, 3]],
            [[0, 1, 2, 3, 4], [1, 0, 2, 3, 4]],
            [[0, 1, 2, 3, 4], [2, 0, 1, 3, 4]],
            [[0, 1, 2, 3, 4], [0, 1, 4, 2, 3]],
            [[0, 1, 2, 3, 4], [0, 1, 3, 4, 2]],
            [[0, 1, 2, 3, 4], [0, 1, 3, 2, 4]],
            [[0, 1, 2, 3, 4, 5, 6], [2, 1, 0, 3, 4, 5, 6]],
            [[0, 1, 2, 3, 4, 5, 6], [0, 3, 4, 1, 2, 5, 6]],
            [[0, 1, 2, 3, 4, 5, 6], [0, 2, 3, 5, 6, 1, 4]],
            [[0, 1, 2, 3, 4, 5, 6], [0, 1, 5, 3, 2, 4, 6]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [8, 1, 3, 4, 5, 6, 0, 7, 2, 9]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [9, 5, 0, 7, 1, 2, 3, 4, 6, 8]],

            [[0, 1], [2, 1, 0]],
            [[0, 1], [1, 0, 2]],
            [[0, 1, 2], [3, 0, 2, 1]],
            [[0, 1, 2], [0, 2, 1, 3]],
            [[0, 1, 2], [0, 2, 3, 1]],
            [[0, 1, 2], [1, 2, 3, 0]],
            [[0, 1, 2, 3, 4], [5, 4, 3, 2, 1, 0]],
            [[0, 1, 2, 3, 4], [5, 4, 3, 6, 2, 1, 0]],
            [[0, 1, 2, 3, 4], [5, 4, 3, 6, 2, 1, 0, 7]],

            [[0, 1, 2], [1, 0]],
            [[2, 0, 1], [1, 0]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [7, 5, 4, 8, 3, 2, 1, 0]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 8, 3, 2, 1, 0, 9]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [7, 5, 4, 3, 2, 1, 0, 9]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 3, 2, 1, 0, 9]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 3, 2, 1, 0]],

            [[0], [1]],
            [[0], [1, 2]],
            [[0, 2], [1]],
            [[0, 2], [1, 2]],
            [[0, 2], [2, 1]],
            [[0, 1, 2], [3, 4, 5]],
            [[0, 1, 2], [2, 4, 5]],
            [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11]],
            [[0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 4, 8]],
            [[0, 1, 2, 3, 4, 5], [6, 7, 3, 8]],

            [[0, 1, 2], [3, 2, 1]],
            [[0, 1, 2], [2, 1, 3]],
            [[1, 2, 0], [2, 1, 3]],
            [[1, 2, 0], [3, 2, 1]],
            [[0, 1, 2, 3, 4, 5], [6, 1, 3, 2, 4, 7]],
            [[0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 2, 4]],
            [[0, 1, 2, 3, 4, 5], [6, 7, 3, 2, 4]],
            [[0, 2, 3, 4, 5], [6, 1, 7, 3, 2, 4]],

            [[{ key: 0, children: [0] }],
            [{ key: 0, children: [] }]],

            [[0, 1, { children: [0], key: 2 }],
            [{ key: 2, children: [] }]],

            [[{ key: 0, children: [] }],
            [1, 2, { key: 0, children: [0] }]],

            [[0, { key: 1, children: [0, 1] }, 2],
            [3, 2, { key: 1, children: [1, 0] }]],

            [[0, { key: 1, children: [0, 1] }, 2],
            [2, { key: 1, children: [1, 0] }, 3]],

            [[{ key: 1, children: [0, 1] }, { key: 2, children: [0, 1] }, 0],
            [{ key: 2, children: [1, 0] }, { key: 1, children: [1, 0] }, 3]],

            [[{ key: 1, children: [0, 1] }, { key: 2, children: [] }, 0],
            [3, { key: 2, children: [1, 0] }, { key: 1, children: [] }]],

            [[0, { key: 1, children: [] }, 2, { key: 3, children: [1, 0] }, 4, 5],
            [6, { key: 1, children: [0, 1] }, { key: 3, children: [] }, 2, 4, 7]],

            [[0,
                { key: 1, children: [] },
                { key: 2, children: [] },
                { key: 3, children: [] },
                { key: 4, children: [] }, 5],
            [{ key: 6, children: [{ key: 1, children: [1] }] },
                7,
            { key: 3, children: [1] },
            { key: 2, children: [1] },
            { key: 4, children: [1] }]],

            [[0, 1, { key: 2, children: [0] }, 3, { key: 4, children: [0] }, 5],
            [6, 7, 3, { key: 2, children: [] }, { key: 4, children: [] }]],
        ];

        describe("syncChildren", () => {
            it("null => 'abc'", () => {
                const f = frag();
                render<HTMLElement>($h("div"), f);
                const b = render<HTMLElement>($h("div").children("abc"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("abc");
            });

            it("null => 10", () => {
                const f = frag();
                render<HTMLElement>($h("div"), f);
                const b = render<HTMLElement>($h("div").children(10), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("10");
            });

            it("null => false", () => {
                const f = frag();
                render<HTMLElement>($h("div"), f);
                const b = render<HTMLElement>($h("div").children(false), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("null => true", () => {
                const f = frag();
                render<HTMLElement>($h("div"), f);
                const b = render<HTMLElement>($h("div").children(true), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("'abc' => null", () => {
                const f = frag();
                render<HTMLElement>($h("div").children("abc"), f);
                const b = render<HTMLElement>($h("div"), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("10 => null", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(10), f);
                const b = render<HTMLElement>($h("div"), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("true => null", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(true), f);
                const b = render<HTMLElement>($h("div"), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("'abc' => 'abc'", () => {
                const f = frag();
                render<HTMLElement>($h("div").children("abc"), f);
                const b = render<HTMLElement>($h("div").children("abc"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("abc");
            });

            it("10 => 10", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(10), f);
                const b = render<HTMLElement>($h("div").children(10), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("10");
            });

            it("true => true", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(true), f);
                const b = render<HTMLElement>($h("div").children(true), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("true => false", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(true), f);
                const b = render<HTMLElement>($h("div").children(false), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("false => true", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(false), f);
                const b = render<HTMLElement>($h("div").children(true), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("'abc' => 'cde'", () => {
                const f = frag();
                render<HTMLElement>($h("div").children("abc"), f);
                const b = render<HTMLElement>($h("div").children("cde"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("cde");
            });

            it("'' => 'cde'", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(""), f);
                const b = render<HTMLElement>($h("div").children("cde"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("cde");
            });

            it("'abc' => 10", () => {
                const f = frag();
                render<HTMLElement>($h("div").children("abc"), f);
                const b = render<HTMLElement>($h("div").children(10), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("10");
            });

            it("'abc' => true", () => {
                const f = frag();
                render<HTMLElement>($h("div").children("abc"), f);
                const b = render<HTMLElement>($h("div").children(true), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("10 => 'abc'", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(10), f);
                const b = render<HTMLElement>($h("div").children("abc"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("abc");
            });

            it("10 => true", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(10), f);
                const b = render<HTMLElement>($h("div").children(true), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("true => 'abc'", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(true), f);
                const b = render<HTMLElement>($h("div").children("abc"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("abc");
            });

            it("true => 10", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(true), f);
                const b = render<HTMLElement>($h("div").children(10), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("10");
            });

            it("null => <div>", () => {
                const f = frag();
                render<HTMLElement>($h("div"), f);
                const b = render<HTMLElement>($h("div").children($h("div")), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            });

            it("<div> => 'cde'", () => {
                const f = frag();
                render<HTMLElement>($h("div").children($h("div")), f);
                const b = render<HTMLElement>($h("div").children("cde"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("cde");
            });

            it("'cde' => <div>", () => {
                const f = frag();
                render<HTMLElement>($h("div").children("cde"), f);
                const b = render<HTMLElement>($h("div").children($h("div")), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            });

            it("null => [<div>]", () => {
                const f = frag();
                render<HTMLElement>($h("div"), f);
                const b = render<HTMLElement>($h("div").children([$h("div")]), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            });

            it("<div> => null", () => {
                const f = frag();
                render<HTMLElement>($h("div").children($h("div")), f);
                const b = render<HTMLElement>($h("div"), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("[<div>] => null", () => {
                const f = frag();
                render<HTMLElement>($h("div").children([$h("div")]), f);
                const b = render<HTMLElement>($h("div"), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("[<div>] => null", () => {
                const f = frag();
                render<HTMLElement>($h("div").children([$h("div")]), f);
                const b = render<HTMLElement>($h("div").children(null), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("[<div>] => null", () => {
                const f = frag();
                render<HTMLElement>($h("div").children([$h("div")]), f);
                const b = render<HTMLElement>($h("div").children(null), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("null => [<div>, <div>]", () => {
                const f = frag();
                render<HTMLElement>($h("div"), f);
                const b = render<HTMLElement>($h("div").children([$h("div"), $h("div")]), f);
                expect(b.childNodes.length).to.equal(2);
                expect(b.children[0].tagName.toLowerCase()).to.equal("div");
                expect(b.children[1].tagName.toLowerCase()).to.equal("div");
            });

            it("[<div>, <div>] => null", () => {
                const f = frag();
                render<HTMLElement>($h("div").children([$h("div"), $h("div")]), f);
                const b = render<HTMLElement>($h("div"), f);
                expect(b.childNodes.length).to.equal(0);
            });

            it("null => unsafeHTML('abc')", () => {
                const f = frag();
                render<HTMLElement>($h("div"), f);
                const b = render<HTMLElement>($h("div").unsafeHTML("abc"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("abc");
            });

            it("123 => unsafeHTML('abc')", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(123), f);
                const b = render<HTMLElement>($h("div").unsafeHTML("abc"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("abc");
            });

            it("123 => [<h1><h2>]", () => {
                const f = frag();
                render<HTMLElement>($h("div").children(123), f);
                const b = render<HTMLElement>($h("div").children([$h("h1"), $h("h2")]), f);
                expect(b.childNodes.length).to.equal(2);
                expect(b.children[0].tagName.toLowerCase()).to.equal("h1");
                expect(b.children[1].tagName.toLowerCase()).to.equal("h2");
            });

            it("[<h1><h2>] => 123", () => {
                const f = frag();
                render<HTMLElement>($h("div").children([$h("h1"), $h("h2")]), f);
                const b = render<HTMLElement>($h("div").children(123), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("123");
            });

            it("[<h1><h2>] => unsafeHTML('abc')", () => {
                const f = frag();
                render<HTMLElement>($h("div").children([$h("h1"), $h("h2")]), f);
                const b = render<HTMLElement>($h("div").unsafeHTML("abc"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("abc");
            });

            it("[<h1><h2>] => <div>", () => {
                const f = frag();
                render<HTMLElement>($h("div").children([$h("h1"), $h("h2")]), f);
                const b = render<HTMLElement>($h("div").children($h("div")), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            });

            it("[] => <div>", () => {
                const f = frag();
                render<HTMLElement>($h("div").children([]), f);
                const b = render<HTMLElement>($h("div").children($h("div")), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            });

            it("<div> => unsafeHTML('abc')", () => {
                const f = frag();
                render<HTMLElement>($h("div").children($h("div")), f);
                const b = render<HTMLElement>($h("div").unsafeHTML("abc"), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("abc");
            });

            it("<h1> => <h2>", () => {
                const f = frag();
                render<HTMLElement>($h("div").children($h("h1")), f);
                const b = render<HTMLElement>($h("div").children($h("h2")), f);
                expect(b.childNodes.length).to.equal(1);
                expect(b.children[0].tagName.toLowerCase()).to.equal("h2");
            });

            it("<div> => [<h1><h2>]", () => {
                const f = frag();
                render<HTMLElement>($h("div").children($h("div")), f);
                const b = render<HTMLElement>($h("div").children([$h("h1"), $h("h2")]), f);
                expect(b.childNodes.length).to.equal(2);
                expect(b.children[0].tagName.toLowerCase()).to.equal("h1");
                expect(b.children[1].tagName.toLowerCase()).to.equal("h2");
            });

            it("<div> => []", () => {
                const f = frag();
                render<HTMLElement>($h("div").children($h("div")), f);
                const b = render<HTMLElement>($h("div").children([]), f);
                expect(b.childNodes.length).to.equal(0);
            });

        });

        describe("with trackByKey", () => {
            TESTS.forEach((t) => {
                const name = JSON.stringify(t[0]) + " => " + JSON.stringify(t[1]);
                const testFn = () => {
                    checkInnerHtmlEquals(genVNodes(t[0], true) as VNode<any>[],
                        genVNodes(t[1], true) as VNode<any>[],
                        genVNodes(t[1], true) as VNode<any>[],
                        true);
                };
                it(name, testFn);
            });
        });

        describe("without trackByKey and without keys", () => {
            TESTS.forEach((t) => {
                const name = JSON.stringify(t[0]) + " => " + JSON.stringify(t[1]);
                const testFn = () => {
                    checkInnerHtmlEquals(genVNodes(t[0], false) as VNode<any>[],
                        genVNodes(t[1], false) as VNode<any>[],
                        genVNodes(t[1], false) as VNode<any>[],
                        false);
                };
                it(name, testFn);
            });
        });
    });

    describe("components", () => {
        it("<span> => <C><div></C>", () => {
            const f = frag();
            render<HTMLElement>($h("span"), f);
            const b = render<HTMLElement>($c(TestComponent, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
        });

        it("<C><div></C> => <div>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponent, {}), f);
            const b = render<HTMLElement>($h("div"), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.not.equal(b);
        });

        it("<div> => <C><div></C>", () => {
            const f = frag();
            const a = render<HTMLElement>($h("div"), f);
            const b = render<HTMLElement>($c(TestComponent, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.not.equal(b);
        });

        it("<C><div></C> => <span>", () => {
            const f = frag();
            render<HTMLElement>($c(TestComponent, {}), f);
            const b = render<HTMLElement>($h("span"), f);
            expect(b.tagName.toLowerCase()).to.equal("span");
        });

        it("<C><div></C> => <C><div></C>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponent, {}), f);
            const b = render<HTMLElement>($c(TestComponent, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.equal(b);
        });

        it("<C><div></C> => <C>''</C>", () => {
            const f = frag();
            render<HTMLElement>($c(TestComponent, {}), f);
            const b = render<HTMLElement>($c(TestComponent, { returnUndefined: true }), f);
            expect(b.nodeType).to.equal(Node.TEXT_NODE);
            expect(b.nodeValue).to.equal("");
        });

        it("<C>''</C> => <C><div></C>", () => {
            const f = frag();
            render<HTMLElement>($c(TestComponent, { returnUndefined: true }), f);
            const b = render<HTMLElement>($c(TestComponent, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
        });

        it("<C><C><C><div></C></C></C> => <span>", () => {
            const f = frag();
            render<HTMLElement>($c(TestComponent, { wrapDepth: 3 }), f);
            const b = render<HTMLElement>($h("span"), f);
            expect(b.tagName.toLowerCase()).to.equal("span");
        });

        it("<span> => <C><C><C><div></C></C></C>", () => {
            const f = frag();
            render<HTMLElement>($h("span"), f);
            const b = render<HTMLElement>($c(TestComponent, { wrapDepth: 3 }), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
        });

        it("<C><C><C><div></C></C></C> => <C><C><C><div></C></C></C>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponent, { wrapDepth: 3 }), f);
            const b = render<HTMLElement>($c(TestComponent, { wrapDepth: 3 }), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.equal(b);
        });

        it("<span> => <F><div></F>", () => {
            const f = frag();
            render<HTMLElement>($h("span"), f);
            const b = render<HTMLElement>($c(TestComponentFunction, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
        });

        it("<F><div></F> => <div>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponentFunction, {}), f);
            const b = render<HTMLElement>($h("div"), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.not.equal(b);
        });

        it("<div> => <F><div></F>", () => {
            const f = frag();
            const a = render<HTMLElement>($h("div"), f);
            const b = render<HTMLElement>($c(TestComponentFunction, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.not.equal(b);
        });

        it("<F><div></F> => <span>", () => {
            const f = frag();
            render<HTMLElement>($c(TestComponentFunction, {}), f);
            const b = render<HTMLElement>($h("span"), f);
            expect(b.tagName.toLowerCase()).to.equal("span");
        });

        it("<F><div></F> => <F><div></F>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponentFunction, {}), f);
            const b = render<HTMLElement>($c(TestComponentFunction, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.equal(b);
        });

        it("<F><div></F> => <F>''</F>", () => {
            const f = frag();
            render<HTMLElement>($c(TestComponent, {}), f);
            const b = render<HTMLElement>($c(TestComponentFunction, { returnUndefined: true }), f);
            expect(b.nodeType).to.equal(Node.TEXT_NODE);
            expect(b.nodeValue).to.equal("");
        });

        it("<F>''</F> => <F><div></F>", () => {
            const f = frag();
            render<HTMLElement>($c(TestComponentFunction, { returnUndefined: true }), f);
            const b = render<HTMLElement>($c(TestComponentFunction, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
        });

        it("<F><F><F><div></F></F></F> => <span>", () => {
            const f = frag();
            render<HTMLElement>($c(TestComponentFunction, { wrapDepth: 3 }), f);
            const b = render<HTMLElement>($h("span"), f);
            expect(b.tagName.toLowerCase()).to.equal("span");
        });

        it("<span> => <F><F><F><div></F></F></F>", () => {
            const f = frag();
            render<HTMLElement>($h("span"), f);
            const b = render<HTMLElement>($c(TestComponentFunction, { wrapDepth: 3 }), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
        });

        it("<F><F><F><div></F></F></F> => <F><F><F><div></F></F></F>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponentFunction, { wrapDepth: 3 }), f);
            const b = render<HTMLElement>($c(TestComponentFunction, { wrapDepth: 3 }), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.equal(b);
        });

        it("<C><div></C> => <F><div></F>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponent, {}), f);
            const b = render<HTMLElement>($c(TestComponentFunction, { wrapDepth: 3 }), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.not.equal(b);
        });

        it("<F><div></F> => <C><div></C>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponentFunction, { wrapDepth: 3 }), f);
            const b = render<HTMLElement>($c(TestComponent, {}), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.not.equal(b);
        });

        it("<C><C><C><div></C></C></C> => <F><F><F><div></F></F></F>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponent, { wrapDepth: 3 }), f);
            const b = render<HTMLElement>($c(TestComponentFunction, { wrapDepth: 3 }), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.not.equal(b);
        });

        it("<F><F><F><div></F></F></F> => <C><C><C><div></C></C></C>", () => {
            const f = frag();
            const a = render<HTMLElement>($c(TestComponentFunction, { wrapDepth: 3 }), f);
            const b = render<HTMLElement>($c(TestComponent, { wrapDepth: 3 }), f);
            expect(b.tagName.toLowerCase()).to.equal("div");
            expect(a).to.not.equal(b);
        });
    });

    describe("special elements", () => {
        it("<input type='text'> => <input type='checkbox'>", () => {
            const f = frag();
            render<HTMLInputElement>($i("text"), f);
            const b = render<HTMLInputElement>($i("checkbox"), f);
            expect(b.tagName.toLowerCase()).to.equal("input");
            expect(b.type).to.equal("checkbox");
        });

        it("<input type='text'> => <input type='text' value='cde'>", () => {
            const f = frag();
            render<HTMLInputElement>($i("text"), f);
            const b = render<HTMLInputElement>($i("text").value("cde"), f);
            expect(b.tagName.toLowerCase()).to.equal("input");
            expect(b.type).to.equal("text");
            expect(b.value).to.equal("cde");
        });

        it("<input type='text' value='abc'> => <input type='text' value='cde'>", () => {
            const f = frag();
            render<HTMLInputElement>($i("text").value("abc"), f);
            const b = render<HTMLInputElement>($i("text").value("cde"), f);
            expect(b.tagName.toLowerCase()).to.equal("input");
            expect(b.type).to.equal("text");
            expect(b.value).to.equal("cde");
        });

        it("<input type='text' value='abc'> => <input type='text'>", () => {
            const f = frag();
            render<HTMLInputElement>($i("text").value("abc"), f);
            const b = render<HTMLInputElement>($i("text"), f);
            expect(b.tagName.toLowerCase()).to.equal("input");
            expect(b.type).to.equal("text");
            expect(b.value).to.equal("abc");
        });

        it("<input type='checkbox'> => <input type='checkbox checked=true'>", () => {
            const f = frag();
            render<HTMLInputElement>($i("checkbox"), f);
            const b = render<HTMLInputElement>($i("checkbox").checked(true), f);
            expect(b.tagName.toLowerCase()).to.equal("input");
            expect(b.type).to.equal("checkbox");
            expect(b.checked).to.equal(true);
        });

        it("<input type='checkbox' checked=true> => <input type='checkbox checked=false'>", () => {
            const f = frag();
            render<HTMLInputElement>($i("checkbox").checked(true), f);
            const b = render<HTMLInputElement>($i("checkbox").checked(false), f);
            expect(b.tagName.toLowerCase()).to.equal("input");
            expect(b.type).to.equal("checkbox");
            expect(b.checked).to.equal(false);
        });

        it("<input type='checkbox' checked=true> => <input type='checkbox'>", () => {
            const f = frag();
            render<HTMLInputElement>($i("checkbox").checked(true), f);
            const b = render<HTMLInputElement>($i("checkbox"), f);
            expect(b.tagName.toLowerCase()).to.equal("input");
            expect(b.type).to.equal("checkbox");
            expect(b.checked).to.equal(true);
        });

        it("<input type='text'> => <textarea>", () => {
            const f = frag();
            render<HTMLInputElement>($i("text"), f);
            const b = render<HTMLTextAreaElement>($i("textarea"), f);
            expect(b.tagName.toLowerCase()).to.equal("textarea");
        });

        it("<textarea> => <input type='text'>", () => {
            const f = frag();
            render<HTMLTextAreaElement>($i("textarea"), f);
            const b = render<HTMLInputElement>($i("text"), f);
            expect(b.tagName.toLowerCase()).to.equal("input");
            expect(b.type).to.equal("text");
        });

        it("<textarea></textarea> => <textarea>cde</textarea>", () => {
            const f = frag();
            render<HTMLTextAreaElement>($i("textarea"), f);
            const b = render<HTMLTextAreaElement>($i("textarea").value("cde"), f);
            expect(b.tagName.toLowerCase()).to.equal("textarea");
            expect(b.value).to.equal("cde");
        });

        it("<textarea>abc</textarea> => <textarea>cde</textarea>", () => {
            const f = frag();
            render<HTMLTextAreaElement>($i("textarea").value("abc"), f);
            const b = render<HTMLTextAreaElement>($i("textarea").value("cde"), f);
            expect(b.tagName.toLowerCase()).to.equal("textarea");
            expect(b.value).to.equal("cde");
        });

        it("<textarea>abc</textarea> => <textarea></textarea>", () => {
            const f = frag();
            render<HTMLTextAreaElement>($i("textarea").value("abc"), f);
            const b = render<HTMLTextAreaElement>($i("textarea"), f);
            expect(b.tagName.toLowerCase()).to.equal("textarea");
            expect(b.value).to.equal("abc");
        });

        it("<audio> => <video>", () => {
            const f = frag();
            render<HTMLAudioElement>($m("audio"), f);
            const b = render<HTMLVideoElement>($m("video"), f);
            expect(b.tagName.toLowerCase()).to.equal("video");
        });

        it("<audio> => <audio volume=0.5>", () => {
            const f = frag();
            render<HTMLAudioElement>($m("audio"), f);
            const b = render<HTMLAudioElement>($m("audio").props({ volume: 0.5 }), f);
            expect(b.volume).to.equal(0.5);
        });

        it("<audio volume=0.3> => <audio volume=0.5>", () => {
            const f = frag();
            render<HTMLAudioElement>($m("audio").props({ volume: 0.3 }), f);
            const b = render<HTMLAudioElement>($m("audio").props({ volume: 0.5 }), f);
            expect(b.volume).to.equal(0.5);
        });

        it("<audio volume=0.3> => <audio>", () => {
            const f = frag();
            render<HTMLAudioElement>($m("audio").props({ volume: 0.3 }), f);
            const b = render<HTMLAudioElement>($m("audio"), f);
            expect(b.volume).to.equal(0.3);
        });
    });

    describe("complex transformations", () => {
        /**
         * When component is an entry point for update and it completely changes a root node, refs to DOM Nodes on
         * parent vnodes should be updated, or parent vnodes shouldn't rely on this refs and use another way to find
         * DOM Nodes.
         */

        class A extends Component<number> {
            state = this.props;

            isPropsChanged() {
                return false;
            }

            render() {
                if (this.state === 1) {
                    return $h("span").children(1);
                }
                return $h("div").children(0);
            }

            syncUpdate(state: number) {
                this.state = state;
                this.flags |= ComponentFlags.DirtyState;
                updateComponent(this);
            }
        }

        class B extends Component<VNode<any>> {
            render() {
                return this.props;
            }
        }

        it("<h1><A.0> => <h1><A.1> => <A.1><h1>", () => {
            const f = frag();
            let c: A | null = null;
            function ref(r: A | null) {
                c = r;
            }

            render<HTMLDivElement>($h("div").children([
                $h("h1").key(0),
                $c(A, 0).key(1).ref(ref),
            ]), f);
            c!.syncUpdate(1);
            const n = render<HTMLDivElement>($h("div").children([
                $c(A, 1).key(1).ref(ref),
                $h("h1").key(0),
            ]), f);
            expect(n.children[0].tagName.toLowerCase()).to.equal("span");
            expect(n.children[0].firstChild!.nodeValue).to.equal("1");
        });

        it("<h1><B><A.0></B> => <h1><B><A.1></B> => <B><A.1></B><h1>", () => {
            const f = frag();
            let c: A | null = null;
            function ref(r: A | null) {
                c = r;
            }

            render<HTMLDivElement>($h("div").children([
                $h("h1").key(0),
                $c(B, $c(A, 0).ref(ref)).key(1),
            ]), f);
            c!.syncUpdate(1);
            const n = render<HTMLDivElement>($h("div").children([
                $c(B, $c(A, 1).ref(ref)).key(1),
                $h("h1").key(0),
            ]), f);
            expect(n.children[0].tagName.toLowerCase()).to.equal("span");
            expect(n.children[0].firstChild!.nodeValue).to.equal("1");
        });

        // same tests in the opposite direction
        it("<A.0><h1> => <A.1><h1> => <h1><A.1>", () => {
            const f = frag();
            let c: A | null = null;
            function ref(r: A | null) {
                c = r;
            }

            render<HTMLDivElement>($h("div").children([
                $c(A, 0).key(1).ref(ref),
                $h("h1").key(0),
            ]), f);
            c!.syncUpdate(1);
            const n = render<HTMLDivElement>($h("div").children([
                $h("h1").key(0),
                $c(A, 1).key(1).ref(ref),
            ]), f);
            expect(n.children[1].tagName.toLowerCase()).to.equal("span");
            expect(n.children[1].firstChild!.nodeValue).to.equal("1");
        });

        it("<B><A.0></B><h1> => <B><A.1></B><h1> => <h1><B><A.1></B>", () => {
            const f = frag();
            let c: A | null = null;
            function ref(r: A | null) {
                c = r;
            }

            render<HTMLDivElement>($h("div").children([
                $c(B, $c(A, 0).ref(ref)).key(1),
                $h("h1").key(0),
            ]), f);
            c!.syncUpdate(1);
            const n = render<HTMLDivElement>($h("div").children([
                $h("h1").key(0),
                $c(B, $c(A, 1).ref(ref)).key(1),
            ]), f);
            expect(n.children[1].tagName.toLowerCase()).to.equal("span");
            expect(n.children[1].firstChild!.nodeValue).to.equal("1");
        });
    });

    describe("keyed+non-keyed", () => {
        it("<div>.0#0#1.1</div> => <div>.0#0#1#2.1</div>", () => {
            const f = frag();
            render<HTMLDivElement>($h("div").children([
                $t("a"), $t("b").key(0), $t("c").key(1), $t("d"),
            ]), f);
            const b = render<HTMLDivElement>($h("div").children([
                $t("a"), $t("b").key(0), $t("c").key(1), $t("e").key(2), $t("d"),
            ]), f);
            expect(b.childNodes[0].nodeValue).to.equal("a");
            expect(b.childNodes[1].nodeValue).to.equal("b");
            expect(b.childNodes[2].nodeValue).to.equal("c");
            expect(b.childNodes[3].nodeValue).to.equal("e");
            expect(b.childNodes[4].nodeValue).to.equal("d");
        });

        it("<div>.0#0#1.1</div> => <div>.0#0.1</div>", () => {
            const f = frag();
            render<HTMLDivElement>($h("div").children([
                $t("a"), $t("b").key(0), $t("c").key(1), $t("d"),
            ]), f);
            const b = render<HTMLDivElement>($h("div").children([
                $t("a"), $t("b").key(0), $t("d"),
            ]), f);
            expect(b.childNodes[0].nodeValue).to.equal("a");
            expect(b.childNodes[1].nodeValue).to.equal("b");
            expect(b.childNodes[2].nodeValue).to.equal("d");
        });

        it("<div>.0#0#1.1</div> => <div>.0#1#0.1</div>", () => {
            const f = frag();
            render<HTMLDivElement>($h("div").children([
                $t("a"), $t("b").key(0), $t("c").key(1), $t("d"),
            ]), f);
            const b = render<HTMLDivElement>($h("div").children([
                $t("a"), $t("c").key(1), $t("b").key(0), $t("d"),
            ]), f);
            expect(b.childNodes[0].nodeValue).to.equal("a");
            expect(b.childNodes[1].nodeValue).to.equal("c");
            expect(b.childNodes[2].nodeValue).to.equal("b");
            expect(b.childNodes[3].nodeValue).to.equal("d");
        });

        it("<div>.0#0.1#1.2</div> => <div>.0#1.1#0.2</div>", () => {
            const f = frag();
            render<HTMLDivElement>($h("div").children([
                $t("a"), $t("b").key(0), $t("e"), $t("c").key(1), $t("d"),
            ]), f);
            const b = render<HTMLDivElement>($h("div").children([
                $t("a"), $t("c").key(1), $t("e"), $t("b").key(0), $t("d"),
            ]), f);
            expect(b.childNodes[0].nodeValue).to.equal("a");
            expect(b.childNodes[1].nodeValue).to.equal("c");
            expect(b.childNodes[2].nodeValue).to.equal("e");
            expect(b.childNodes[3].nodeValue).to.equal("b");
            expect(b.childNodes[4].nodeValue).to.equal("d");
        });

        it("<div><div />.0#0.1#1.2<div /></div> => <div>.0#1.1#0.2</div>", () => {
            const f = frag();
            render<HTMLDivElement>($h("div").children([
                $h("div"), $t("a"), $t("b").key(0), $t("e"), $t("c").key(1), $t("d"), $h("div"),
            ]), f);
            const b = render<HTMLDivElement>($h("div").children([
                $t("a"), $t("c").key(1), $t("e"), $t("b").key(0), $t("d"),
            ]), f);
            expect(b.childNodes[0].nodeValue).to.equal("a");
            expect(b.childNodes[1].nodeValue).to.equal("c");
            expect(b.childNodes[2].nodeValue).to.equal("e");
            expect(b.childNodes[3].nodeValue).to.equal("b");
            expect(b.childNodes[4].nodeValue).to.equal("d");
        });
    });
});

/* tslint:disable:no-unused-expression */

import { ComponentFlags } from "../src/vdom/flags";
import { VNode, getComponentInstanceFromVNode } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { component } from "../src/vdom/vnode_factories";
import {
    render, startRender, checkDOMOps, expectDOMOps, DOMOpsCounter, $tc, $tcf, text, html, input, media,
} from "./utils";
import { expect } from "chai";

function genVNodes(item: any, keys: boolean): VNode<any> | VNode<any>[] {
    if (typeof item === "number") {
        return keys ? text(item.toString()).key(item.toString()) : text(item.toString());
    } else if (Array.isArray(item)) {
        const result: VNode<any>[] = [];
        for (let i = 0; i < item.length; i++) {
            result.push(genVNodes(item[i], keys) as VNode<any>);
        }
        return result;
    } else {
        const e = keys ? html("div").key(item.key) : html("div");
        if (keys) {
            e.children.apply(e, genVNodes(item.children, keys) as VNode<any>[]);
        } else {
            e.children.apply(e, genVNodes(item.children, keys) as VNode<any>[]);
        }
        return e;
    }
}

function checkInnerHtmlEquals(ax: VNode<any>[], bx: VNode<any>[], cx: VNode<any>[], keys: boolean,
    counter: DOMOpsCounter): void {
    const a = html("div");
    const b = html("div");
    const c = html("div");
    if (keys) {
        a.children.apply(a, ax);
        b.children.apply(b, bx);
        c.children.apply(c, cx);
    } else {
        a.children.apply(a, ax);
        b.children.apply(b, bx);
        c.children.apply(c, cx);
    }

    const aDiv = document.createElement("div");
    const bDiv = document.createElement("div");
    render(a, aDiv);
    render(b, bDiv);

    counter.reset();
    render(c, aDiv);

    expect(aDiv.innerHTML).to.equal(bDiv.innerHTML);
}

describe("sync", () => {
    describe("props", () => {
        it("null => {}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div"));
                    r(html("div").props({}));
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{} => null", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({}));
                    r(html("div"));
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{} => {}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({}));
                    r(html("div").props({}));
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("null => {title: 1}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div"));
                    const b = r(html("div").props({ title: "1" })) as HTMLElement;
                    expect(b.title).to.equal("1");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{} => {title: 1}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({}));
                    const b = r(html("div").props({ title: "1" })) as HTMLElement;
                    expect(b.title).to.equal("1");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1} => {title: 2}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1" }));
                    const b = r(html("div").props({ title: "2" })) as HTMLElement;
                    expect(b.title).to.equal("2");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{} => {title: 2, tabIndex: 2}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({}));
                    const b = r(html("div").props({ title: "2", tabIndex: 2 })) as HTMLElement;
                    expect(b.title).to.equal("2");
                    expect(b.tabIndex).to.equal(2);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1} => {title: 2, tabIndex: 2}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1" }));
                    const b = r(html("div").props({ title: "2", tabIndex: 2 })) as HTMLElement;
                    expect(b.title).to.equal("2");
                    expect(b.tabIndex).to.equal(2);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1, tabIndex: 1} => {title: 2, tabIndex: 2}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1", tabIndex: 1 }));
                    const b = r(html("div").props({ title: "2", tabIndex: 2 })) as HTMLElement;
                    expect(b.title).to.equal("2");
                    expect(b.tabIndex).to.equal(2);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1, tabIndex: 1} => {title: 1, tabIndex: 1}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1", tabIndex: 1 }));
                    const b = r(html("div").props({ title: "1", tabIndex: 1 })) as HTMLElement;
                    expect(b.title).to.equal("1");
                    expect(b.tabIndex).to.equal(1);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1, tabIndex: 1} => {title: 2}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1", tabIndex: 1 }));
                    const b = r(html("div").props({ title: "2" })) as HTMLElement;
                    expect(b.title).to.equal("2");
                    expect(b.tabIndex).to.lessThan(1);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1, tabIndex: 1} => {title: 2, lang: en}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1", tabIndex: 1 }));
                    const b = r(html("div").props({ title: "2", lang: "en" })) as HTMLElement;
                    expect(b.title).to.equal("2");
                    expect(b.tabIndex).to.lessThan(1);
                    expect(b.lang).to.equal("en");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1, tabIndex: 1} => {lang: en}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1", tabIndex: 1 }));
                    const b = r(html("div").props({ lang: "en" })) as HTMLElement;
                    expect(b.title).to.equal("");
                    expect(b.tabIndex).to.lessThan(1);
                    expect(b.lang).to.equal("en");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1, tabIndex: 1} => {}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1", tabIndex: 1 }));
                    const b = r(html("div").props({})) as HTMLElement;
                    expect(b.title).to.equal("");
                    expect(b.tabIndex).to.lessThan(1);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{title: 1, tabIndex: 1} => null", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").props({ title: "1", tabIndex: 1 }));
                    const b = r(html("div")) as HTMLElement;
                    expect(b.title).to.equal("");
                    expect(b.tabIndex).to.lessThan(1);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });
    });

    describe("className", () => {
        it("null => 'a'", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div"));
                    const b = r(html("div", "a")) as HTMLElement;
                    expect(b.classList.length).to.equal(1);
                    expect(b.classList.contains("a")).to.true;
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("'a' => null", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div", "a"));
                    const b = r(html("div")) as HTMLElement;
                    expect(b.classList.length).to.equal(0);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("'a' => 'a'", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div", "a"));
                    const b = r(html("div", "a")) as HTMLElement;
                    expect(b.classList.length).to.equal(1);
                    expect(b.classList.contains("a")).to.true;
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("null => 'a'", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div"));
                    const b = r(html("div", "a b")) as HTMLElement;
                    expect(b.classList.length).to.equal(2);
                    expect(b.classList.contains("a")).to.true;
                    expect(b.classList.contains("b")).to.true;
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });
    });

    describe("style", () => {
        it("{} => null", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({}));
                    const b = r(html("div")) as HTMLElement;
                    expect(b.style.cssText).to.equal("");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("null => {}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div"));
                    const b = r(html("div").style({})) as HTMLElement;
                    expect(b.style.cssText).to.equal("");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{} => {}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({}));
                    const b = r(html("div").style({})) as HTMLElement;
                    expect(b.style.cssText).to.equal("");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("null => {top: 10px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div"));
                    const b = r(html("div").style({ top: "10px" })) as HTMLElement;
                    expect(b.style.top).to.equal("10px");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{} => {top: 10px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({}));
                    const b = r(html("div").style({ top: "10px" })) as HTMLElement;
                    expect(b.style.top).to.equal("10px");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("null => {top: 10px, left: 20px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div"));
                    const b = r(html("div").style({ top: "10px", left: "20px" })) as HTMLElement;
                    expect(b.style.top).to.equal("10px");
                    expect(b.style.left).to.equal("20px");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{top: 1px} => {top: 10px, left: 20px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({ top: "1px" }));
                    const b = r(html("div").style({ top: "10px", left: "20px" })) as HTMLElement;
                    expect(b.style.top).to.equal("10px");
                    expect(b.style.left).to.equal("20px");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{top: 1px, left: 1px} => {top: 10px, left: 20px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({ top: "1px", left: "1px" }));
                    const b = r(html("div").style({ top: "10px", left: "20px" })) as HTMLElement;
                    expect(b.style.top).to.equal("10px");
                    expect(b.style.left).to.equal("20px");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{top: 1px, left: 1px} => {top: 10px, left: 20px, right: 30px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({ top: "1px", left: "1px" }));
                    const b = r(html("div").style({ top: "10px", left: "20px", right: "30px" })) as HTMLElement;
                    expect(b.style.top).to.equal("10px");
                    expect(b.style.left).to.equal("20px");
                    expect(b.style.right).to.equal("30px");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{top: 1px, left: 1px} => {top: 10px, right: 30px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({ top: "1px", left: "1px" }));
                    const b = r(html("div").style({ top: "10px", right: "30px" })) as HTMLElement;
                    expect(b.style.top).to.equal("10px");
                    expect(b.style.left).to.equal("");
                    expect(b.style.right).to.equal("30px");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{top: 1px, left: 1px} => {right: 30px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({ top: "1px", left: "1px" }));
                    const b = r(html("div").style({ right: "30px" })) as HTMLElement;
                    expect(b.style.top).to.equal("");
                    expect(b.style.left).to.equal("");
                    expect(b.style.right).to.equal("30px");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{top: 1px, left: 1px} => {top: 1px}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({ top: "1px", left: "1px" }));
                    const b = r(html("div").style({ top: "1px" })) as HTMLElement;
                    expect(b.style.top).to.equal("1px");
                    expect(b.style.left).to.equal("");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{top: 1px, left: 1px} => {}", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({ top: "1px", left: "1px" }));
                    const b = r(html("div").style({})) as HTMLElement;
                    expect(b.style.top).to.equal("");
                    expect(b.style.left).to.equal("");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("{top: 1px, left: 1px} => null", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").style({ top: "1px", left: "1px" }));
                    const b = r(html("div")) as HTMLElement;
                    expect(b.style.top).to.equal("");
                    expect(b.style.left).to.equal("");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });
    });

    describe("children", () => {
        const TESTS = [
            [[0], [0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2], [0, 1, 2], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],

            [[], [1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[], [4, 9], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[], [9, 3, 6, 1, 0], [0, 0, 5, 0, 5, 0, 0], [0, 0, 5, 0, 5, 0, 0]],

            [[999], [1], [0, 0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[999], [1, 999], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[999], [999, 1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[999], [4, 9, 999], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[999], [999, 4, 9], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[999], [9, 3, 6, 1, 0, 999], [0, 0, 5, 0, 5, 0, 0], [0, 0, 5, 0, 5, 0, 0]],
            [[999], [999, 9, 3, 6, 1, 0], [0, 0, 5, 0, 5, 0, 0], [0, 0, 5, 0, 5, 0, 0]],
            [[999], [0, 999, 1], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[999], [0, 3, 999, 1, 4], [0, 0, 4, 0, 4, 0, 0], [0, 0, 4, 0, 4, 0, 0]],
            [[999], [0, 999, 1, 4, 5], [0, 0, 4, 0, 4, 0, 0], [0, 0, 4, 0, 4, 0, 0]],

            [[998, 999], [1, 998, 999], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[998, 999], [998, 999, 1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[998, 999], [998, 1, 999], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[998, 999], [1, 2, 998, 999], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[998, 999], [998, 999, 1, 2], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[998, 999], [1, 998, 999, 2], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[998, 999], [1, 998, 2, 999, 3], [0, 0, 3, 0, 3, 0, 0], [0, 0, 3, 0, 3, 0, 0]],
            [[998, 999], [1, 4, 998, 2, 5, 999, 3, 6], [0, 0, 6, 0, 6, 0, 0], [0, 0, 6, 0, 6, 0, 0]],
            [[998, 999], [1, 998, 2, 999], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[998, 999], [998, 1, 999, 2], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[998, 999], [1, 2, 998, 3, 4, 999], [0, 0, 4, 0, 4, 0, 0], [0, 0, 4, 0, 4, 0, 0]],
            [[998, 999], [998, 1, 2, 999, 3, 4], [0, 0, 4, 0, 4, 0, 0], [0, 0, 4, 0, 4, 0, 0]],
            [[998, 999], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 998, 999], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
            [[998, 999], [998, 999, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
            [[998, 999], [0, 1, 2, 3, 4, 998, 999, 5, 6, 7, 8, 9], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
            [[998, 999], [0, 1, 2, 998, 3, 4, 5, 6, 999, 7, 8, 9], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
            [[998, 999], [0, 1, 2, 3, 4, 998, 5, 6, 7, 8, 9, 999], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
            [[998, 999], [998, 0, 1, 2, 3, 4, 999, 5, 6, 7, 8, 9], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],

            [[1], [], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[1, 2], [2], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[1, 2], [1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[1, 2, 3], [2, 3], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[1, 2, 3], [1, 2], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[1, 2, 3], [1, 3], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[1, 2, 3, 4, 5], [2, 3, 4, 5], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[1, 2, 3, 4, 5], [1, 2, 3, 4], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[1, 2, 3, 4, 5], [1, 2, 4, 5], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],

            [[1, 2], [], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[1, 2, 3], [3], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[1, 2, 3], [1], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[1, 2, 3, 4], [3, 4], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[1, 2, 3, 4], [1, 2], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[1, 2, 3, 4], [1, 4], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[1, 2, 3, 4, 5, 6], [2, 3, 4, 5], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[1, 2, 3, 4, 5, 6], [2, 3, 5, 6], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[1, 2, 3, 4, 5, 6], [1, 2, 3, 5], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 6, 7, 8, 9], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 6, 7, 8], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 4, 6, 7, 8, 9], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],

            [[0, 1], [1, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3], [3, 2, 1, 0], [0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4], [1, 2, 3, 4, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4], [4, 0, 1, 2, 3], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4], [1, 0, 2, 3, 4], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4], [2, 0, 1, 3, 4], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4], [0, 1, 4, 2, 3], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4], [0, 1, 3, 4, 2], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4], [0, 1, 3, 2, 4], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5, 6], [2, 1, 0, 3, 4, 5, 6], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5, 6], [0, 3, 4, 1, 2, 5, 6], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5, 6], [0, 2, 3, 5, 6, 1, 4], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5, 6], [0, 1, 5, 3, 2, 4, 6], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [8, 1, 3, 4, 5, 6, 0, 7, 2, 9],
            [0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [9, 5, 0, 7, 1, 2, 3, 4, 6, 8],
            [0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],

            [[0, 1], [2, 1, 0], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[0, 1], [1, 0, 2], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[0, 1, 2], [3, 0, 2, 1], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[0, 1, 2], [0, 2, 1, 3], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[0, 1, 2], [0, 2, 3, 1], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[0, 1, 2], [1, 2, 3, 0], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[0, 1, 2, 3, 4], [5, 4, 3, 2, 1, 0], [0, 0, 1, 0, 5, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
            [[0, 1, 2, 3, 4], [5, 4, 3, 6, 2, 1, 0], [0, 0, 2, 0, 6, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
            [[0, 1, 2, 3, 4], [5, 4, 3, 6, 2, 1, 0, 7], [0, 0, 3, 0, 7, 0, 0], [0, 0, 3, 0, 3, 0, 0]],

            [[0, 1, 2], [1, 0], [0, 0, 0, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[2, 0, 1], [1, 0], [0, 0, 0, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [7, 5, 4, 8, 3, 2, 1, 0], [0, 0, 0, 0, 5, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 8, 3, 2, 1, 0, 9], [0, 0, 0, 0, 5, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [7, 5, 4, 3, 2, 1, 0, 9], [0, 0, 0, 0, 5, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 3, 2, 1, 0, 9], [0, 0, 0, 0, 5, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
            [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 3, 2, 1, 0], [0, 0, 0, 0, 5, 0, 3], [0, 0, 0, 0, 0, 0, 3]],

            [[0], [1], [0, 0, 1, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0], [1, 2], [0, 0, 2, 0, 2, 0, 1], [0, 0, 1, 0, 1, 0, 0]],
            [[0, 2], [1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1]],
            [[0, 2], [1, 2], [0, 0, 1, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 2], [2, 1], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2], [3, 4, 5], [0, 0, 3, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2], [2, 4, 5], [0, 0, 2, 0, 3, 0, 2], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [0, 0, 6, 0, 6, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 4, 8], [0, 0, 3, 0, 3, 0, 3], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5], [6, 7, 3, 8], [0, 0, 3, 0, 3, 0, 5], [0, 0, 0, 0, 0, 0, 2]],

            [[0, 1, 2], [3, 2, 1], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2], [2, 1, 3], [0, 0, 1, 0, 3, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
            [[1, 2, 0], [2, 1, 3], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
            [[1, 2, 0], [3, 2, 1], [0, 0, 1, 0, 3, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5], [6, 1, 3, 2, 4, 7], [0, 0, 2, 0, 3, 0, 2], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 2, 4], [0, 0, 2, 0, 3, 0, 2], [0, 0, 0, 0, 0, 0, 0]],
            [[0, 1, 2, 3, 4, 5], [6, 7, 3, 2, 4], [0, 0, 2, 0, 3, 0, 3], [0, 0, 0, 0, 0, 0, 1]],
            [[0, 2, 3, 4, 5], [6, 1, 7, 3, 2, 4], [0, 0, 3, 0, 4, 0, 2], [0, 0, 1, 0, 1, 0, 0]],

            [[{ key: 0, children: [0] }],
            [{ key: 0, children: [] }],
            [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],

            [[0, 1, { children: [0], key: 2 }],
            [{ key: 2, children: [] }],
            [0, 0, 0, 0, 0, 0, 3], [1, 0, 0, 0, 0, 1, 2]],

            [[{ key: 0, children: [] }],
            [1, 2, { key: 0, children: [0] }],
            [0, 0, 3, 0, 3, 0, 0], [1, 0, 3, 0, 3, 1, 0]],

            [[0, { key: 1, children: [0, 1] }, 2],
            [3, 2, { key: 1, children: [1, 0] }],
            [0, 0, 1, 0, 3, 0, 1], [1, 0, 3, 0, 2, 2, 0]],

            [[0, { key: 1, children: [0, 1] }, 2],
            [2, { key: 1, children: [1, 0] }, 3],
            [0, 0, 1, 0, 4, 0, 1], [0, 0, 0, 0, 0, 0, 0]],

            [[{ key: 1, children: [0, 1] }, { key: 2, children: [0, 1] }, 0],
            [{ key: 2, children: [1, 0] }, { key: 1, children: [1, 0] }, 3],
            [0, 0, 1, 0, 4, 0, 1], [0, 0, 0, 0, 0, 0, 0]],

            [[{ key: 1, children: [0, 1] }, { key: 2, children: [] }, 0],
            [3, { key: 2, children: [1, 0] }, { key: 1, children: [] }],
            [0, 0, 3, 0, 5, 0, 1], [1, 0, 3, 0, 2, 2, 0]],

            [[0, { key: 1, children: [] }, 2, { key: 3, children: [1, 0] }, 4, 5],
            [6, { key: 1, children: [0, 1] }, { key: 3, children: [] }, 2, 4, 7],
            [0, 0, 4, 0, 5, 0, 2], [1, 0, 3, 0, 2, 2, 0]],

            [[0,
                { key: 1, children: [] },
                { key: 2, children: [] },
                { key: 3, children: [] },
                { key: 4, children: [] }, 5],
            [{ key: 6, children: [{ key: 1, children: [1] }] },
                7,
            { key: 3, children: [1] },
            { key: 2, children: [1] },
            { key: 4, children: [1] }],
            [2, 0, 5, 0, 8, 0, 3], [2, 0, 5, 0, 5, 2, 1]],

            [[0, 1, { key: 2, children: [0] }, 3, { key: 4, children: [0] }, 5],
            [6, 7, 3, { key: 2, children: [] }, { key: 4, children: [] }],
            [0, 0, 2, 0, 3, 0, 5], [1, 0, 1, 0, 0, 2, 2]],
        ];

        describe("syncChildren", () => {
            it("null => 'abc'", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div"));
                        const b = r(html("div").children("abc"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("abc");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("null => 10", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div"));
                        const b = r(html("div").children(10));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("10");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("'abc' => null", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children("abc"));
                        const b = r(html("div"));
                        expect(b.childNodes.length).to.equal(0);
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("10 => null", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(10));
                        const b = r(html("div"));
                        expect(b.childNodes.length).to.equal(0);
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("'abc' => 'abc'", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children("abc"));
                        const b = r(html("div").children("abc"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("abc");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("10 => 10", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(10));
                        const b = r(html("div").children(10));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("10");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("'abc' => 'cde'", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children("abc"));
                        const b = r(html("div").children("cde"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("cde");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("'' => 'cde'", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(""));
                        const b = r(html("div").children("cde"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("cde");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("'abc' => 10", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children("abc"));
                        const b = r(html("div").children(10));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("10");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("10 => 'abc'", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(10));
                        const b = r(html("div").children("abc"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("abc");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("null => <div>", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div"));
                        const b = r(html("div").children(html("div"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("div");
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
                    });
                });
            });

            it("<div> => 'cde'", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("div")));
                        const b = r(html("div").children("cde"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("cde");
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
                    });
                });
            });

            it("'cde' => <div>", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children("cde"));
                        const b = r(html("div").children(html("div"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("div");
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
                    });
                });
            });

            it("null => [<div>]", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div"));
                        const b = r(html("div").children(html("div"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("div");
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
                    });
                });
            });

            it("<div> => null", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("div")));
                        const b = r(html("div"));
                        expect(b.childNodes.length).to.equal(0);
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 1);
                    });
                });
            });

            it("[<div>] => null", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children([html("div")]));
                        const b = r(html("div"));
                        expect(b.childNodes.length).to.equal(0);
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 1);
                    });
                });
            });

            it("[<div>] => null", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("div")));
                        const b = r(html("div").children(null));
                        expect(b.childNodes.length).to.equal(0);
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 1);
                    });
                });
            });

            it("null => [<div>, <div>]", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div"));
                        const b = r(html("div").children(html("div"), html("div"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(2);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("div");
                        expect(b.children[1].tagName.toLowerCase()).to.equal("div");
                        expectDOMOps(c, 3, 0, 0, 0, 3, 0, 0);
                    });
                });
            });

            it("[<div>, <div>] => null", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("div"), html("div")));
                        const b = r(html("div"));
                        expect(b.childNodes.length).to.equal(0);
                        expectDOMOps(c, 3, 0, 0, 0, 3, 0, 0);
                    });
                });
            });

            it("null => unsafeHTML('abc')", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div"));
                        const b = r(html("div").unsafeHTML("abc"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("abc");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("123 => unsafeHTML('abc')", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(123));
                        const b = r(html("div").unsafeHTML("abc"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("abc");
                        expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                    });
                });
            });

            it("123 => [<h1><h2>]", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(123));
                        const b = r(html("div").children(html("h1"), html("h2"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(2);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("h1");
                        expect(b.children[1].tagName.toLowerCase()).to.equal("h2");
                        expectDOMOps(c, 3, 0, 0, 0, 3, 0, 0);
                    });
                });
            });

            it("[<h1><h2>] => 123", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("h1"), html("h2")));
                        const b = r(html("div").children(123));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("123");
                        expectDOMOps(c, 3, 0, 0, 0, 3, 0, 0);
                    });
                });
            });

            it("[<h1><h2>] => unsafeHTML('abc')", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("h1"), html("h2")));
                        const b = r(html("div").unsafeHTML("abc"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("abc");
                        expectDOMOps(c, 3, 0, 0, 0, 3, 0, 0);
                    });
                });
            });

            it("[<h1><h2>] => <div>", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("h1"), html("h2")));
                        const b = r(html("div").children(html("div"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("div");
                        expectDOMOps(c, 4, 0, 0, 0, 3, 1, 1);
                    });
                });
            });

            it("[] => <div>", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children([]));
                        const b = r(html("div").children(html("div"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("div");
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
                    });
                });
            });

            it("<div> => unsafeHTML('abc')", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("div")));
                        const b = r(html("div").unsafeHTML("abc"));
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.firstChild!.nodeValue).to.equal("abc");
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
                    });
                });
            });

            it("<h1> => <h2>", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("h1")));
                        const b = r(html("div").children(html("h2"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(1);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("h2");
                        expectDOMOps(c, 3, 0, 0, 0, 2, 1, 0);
                    });
                });
            });

            it("<div> => [<h1><h2>]", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("div")));
                        const b = r(html("div").children(html("h1"), html("h2"))) as HTMLElement;
                        expect(b.childNodes.length).to.equal(2);
                        expect(b.children[0].tagName.toLowerCase()).to.equal("h1");
                        expect(b.children[1].tagName.toLowerCase()).to.equal("h2");
                        expectDOMOps(c, 4, 0, 0, 0, 3, 1, 0);
                    });
                });
            });

            it("<div> => []", () => {
                startRender((r) => {
                    checkDOMOps((c) => {
                        r(html("div").children(html("div")));
                        const b = r(html("div").children([]));
                        expect(b.childNodes.length).to.equal(0);
                        expectDOMOps(c, 2, 0, 0, 0, 2, 0, 1);
                    });
                });
            });
        });

        describe("with keys", () => {
            TESTS.forEach((t) => {
                const name = JSON.stringify(t[0]) + " => " + JSON.stringify(t[1]);
                const testFn = () => {
                    checkDOMOps((c) => {
                        checkInnerHtmlEquals(genVNodes(t[0], true) as VNode<any>[],
                            genVNodes(t[1], true) as VNode<any>[],
                            genVNodes(t[1], true) as VNode<any>[],
                            true,
                            c);
                        expectDOMOps.apply(undefined, [c, ...t[2]]);
                    });
                };
                it(name, testFn);
            });
        });

        describe("without keys", () => {
            TESTS.forEach((t) => {
                const name = JSON.stringify(t[0]) + " => " + JSON.stringify(t[1]);
                const testFn = () => {
                    checkDOMOps((c) => {
                        checkInnerHtmlEquals(genVNodes(t[0], false) as VNode<any>[],
                            genVNodes(t[1], false) as VNode<any>[],
                            genVNodes(t[1], false) as VNode<any>[],
                            false,
                            c);
                        expectDOMOps.apply(undefined, [c, ...t[3]]);
                    });
                };
                it(name, testFn);
            });
        });
    });

    describe("components", () => {
        it("<span> => <C><div></C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("span"));
                    const b = r($tc()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<C><div></C> => <div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tc());
                    const b = r(html("div")) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.not.equal(b);
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<div> => <C><div></C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r(html("div"));
                    const b = r($tc()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.not.equal(b);
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<C><div></C> => <span>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r($tc());
                    const b = r(html("span")) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("span");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<C><div></C> => <C><div></C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tc());
                    const b = r($tc()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.equal(b);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<C><div></C> => <C>''</C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r($tc());
                    const b = r($tc(""));
                    expect(b.nodeType).to.equal(Node.TEXT_NODE);
                    expect(b.nodeValue).to.equal("");
                    expectDOMOps(c, 1, 0, 1, 0, 1, 1, 0);
                });
            });
        });

        it("<C>''</C> => <C><div></C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r($tc(""));
                    const b = r($tc()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expectDOMOps(c, 1, 0, 1, 0, 1, 1, 0);
                });
            });
        });

        it("<C><C><C><div></C></C></C> => <span>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r($tc(html("div"), 3));
                    const b = r(html("span")) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("span");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<span> => <C><C><C><div></C></C></C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("span"));
                    const b = r($tc(html("div"), 3)) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<C><C><C><div></C></C></C> => <C><C><C><div></C></C></C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tc(html("div"), 3));
                    const b = r($tc(html("div"), 3)) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.equal(b);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<span> => <F><div></F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("span"));
                    const b = r($tcf()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<F><div></F> => <div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tcf());
                    const b = r(html("div")) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.not.equal(b);
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<div> => <F><div></F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r(html("div"));
                    const b = r($tcf()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.not.equal(b);
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<F><div></F> => <span>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r($tcf());
                    const b = r(html("span")) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("span");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<F><div></F> => <F><div></F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tcf());
                    const b = r($tcf()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.equal(b);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<F><div></F> => <F>''</F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r($tcf());
                    const b = r($tcf("")) as HTMLElement;
                    expect(b.nodeType).to.equal(Node.TEXT_NODE);
                    expect(b.nodeValue).to.equal("");
                    expectDOMOps(c, 1, 0, 1, 0, 1, 1, 0);
                });
            });
        });

        it("<F>''</F> => <F><div></F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r($tcf(""));
                    const b = r($tcf()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expectDOMOps(c, 1, 0, 1, 0, 1, 1, 0);
                });
            });
        });

        it("<F><F><F><div></F></F></F> => <span>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r($tcf(html("div"), 3));
                    const b = r(html("span")) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("span");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<span> => <F><F><F><div></F></F></F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("span"));
                    const b = r($tcf(html("div"), 3)) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<F><F><F><div></F></F></F> => <F><F><F><div></F></F></F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tcf(html("div"), 3));
                    const b = r($tcf(html("div"), 3)) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.equal(b);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<C><div></C> => <F><div></F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tc());
                    const b = r($tcf()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.not.equal(b);
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<F><div></F> => <C><div></C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tcf());
                    const b = r($tc()) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.not.equal(b);
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<C><C><C><div></C></C></C> => <F><F><F><div></F></F></F>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tc(html("div"), 3));
                    const b = r($tcf(html("div"), 3)) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.not.equal(b);
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<F><F><F><div></F></F></F> => <C><C><C><div></C></C></C>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = r($tcf(html("div"), 3));
                    const b = r($tc(html("div"), 3)) as HTMLElement;
                    expect(b.tagName.toLowerCase()).to.equal("div");
                    expect(a).to.not.equal(b);
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });
    });

    describe("special elements", () => {
        it("<input type='text'> => <input type='checkbox'>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("text"));
                    const b = r(input("checkbox")) as HTMLInputElement;
                    expect(b.tagName.toLowerCase()).to.equal("input");
                    expect(b.type).to.equal("checkbox");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<input type='text'> => <input type='text' value='cde'>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("text"));
                    const b = r(input("text").value("cde")) as HTMLInputElement;
                    expect(b.tagName.toLowerCase()).to.equal("input");
                    expect(b.type).to.equal("text");
                    expect(b.value).to.equal("cde");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<input type='text' value='abc'> => <input type='text' value='cde'>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("text").value("abc"));
                    const b = r(input("text").value("cde")) as HTMLInputElement;
                    expect(b.tagName.toLowerCase()).to.equal("input");
                    expect(b.type).to.equal("text");
                    expect(b.value).to.equal("cde");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<input type='text' value='abc'> => <input type='text'>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("text").value("abc"));
                    const b = r(input("text")) as HTMLInputElement;
                    expect(b.tagName.toLowerCase()).to.equal("input");
                    expect(b.type).to.equal("text");
                    expect(b.value).to.equal("abc");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<input type='checkbox'> => <input type='checkbox checked=true'>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("checkbox"));
                    const b = r(input("checkbox").checked(true)) as HTMLInputElement;
                    expect(b.tagName.toLowerCase()).to.equal("input");
                    expect(b.type).to.equal("checkbox");
                    expect(b.checked).to.equal(true);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<input type='checkbox' checked=true> => <input type='checkbox checked=false'>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("checkbox").checked(true));
                    const b = r(input("checkbox").checked(false)) as HTMLInputElement;
                    expect(b.tagName.toLowerCase()).to.equal("input");
                    expect(b.type).to.equal("checkbox");
                    expect(b.checked).to.equal(false);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<input type='checkbox' checked=true> => <input type='checkbox'>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("checkbox").checked(true));
                    const b = r(input("checkbox")) as HTMLInputElement;
                    expect(b.tagName.toLowerCase()).to.equal("input");
                    expect(b.type).to.equal("checkbox");
                    expect(b.checked).to.equal(true);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<input type='text'> => <textarea>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("text"));
                    const b = r(input("textarea")) as HTMLTextAreaElement;
                    expect(b.tagName.toLowerCase()).to.equal("textarea");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<textarea> => <input type='text'>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("textarea"));
                    const b = r(input("text")) as HTMLInputElement;
                    expect(b.tagName.toLowerCase()).to.equal("input");
                    expect(b.type).to.equal("text");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<textarea></textarea> => <textarea>cde</textarea>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("textarea"));
                    const b = r(input("textarea").value("cde")) as HTMLTextAreaElement;
                    expect(b.tagName.toLowerCase()).to.equal("textarea");
                    expect(b.value).to.equal("cde");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<textarea>abc</textarea> => <textarea>cde</textarea>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("textarea").value("abc"));
                    const b = r(input("textarea").value("cde")) as HTMLTextAreaElement;
                    expect(b.tagName.toLowerCase()).to.equal("textarea");
                    expect(b.value).to.equal("cde");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<textarea>abc</textarea> => <textarea></textarea>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(input("textarea").value("abc"));
                    const b = r(input("textarea")) as HTMLTextAreaElement;
                    expect(b.tagName.toLowerCase()).to.equal("textarea");
                    expect(b.value).to.equal("abc");
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<audio> => <video>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(media("audio"));
                    const b = r(media("video")) as HTMLMediaElement;
                    expect(b.tagName.toLowerCase()).to.equal("video");
                    expectDOMOps(c, 2, 0, 0, 0, 1, 1, 0);
                });
            });
        });

        it("<audio> => <audio volume=0.5>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(media("audio"));
                    const b = r(media("audio").props({ volume: 0.5 })) as HTMLMediaElement;
                    expect(b.volume).to.equal(0.5);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<audio volume=0.3> => <audio volume=0.5>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(media("audio").props({ volume: 0.3 }));
                    const b = r(media("audio").props({ volume: 0.5 })) as HTMLMediaElement;
                    expect(b.volume).to.equal(0.5);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
        });

        it("<audio volume=0.3> => <audio>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(media("audio").props({ volume: 0.3 }));
                    const b = r(media("audio")) as HTMLMediaElement;
                    expect(b.volume).to.equal(0.3);
                    expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
                });
            });
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
                    return html("span").children(1);
                }
                return html("div").children(0);
            }

            updateState(state: number) {
                this.state = state;
                this.flags |= ComponentFlags.DirtyState;
            }
        }

        class B extends Component<VNode<any>> {
            render() {
                return this.props;
            }
        }

        it("<h1><A.0> => <h1><A.1> => <A.1><h1>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = component(A, 0).key(1);
                    r(html("div").children(
                        html("h1").key(0),
                        a,
                    ));
                    getComponentInstanceFromVNode<A>(a)!.updateState(1);
                    const n = r(html("div").children(
                        component(A, 1).key(1),
                        html("h1").key(0),
                    )) as HTMLDivElement;
                    expect(n.children[0].tagName.toLowerCase()).to.equal("span");
                    expect(n.children[0].firstChild!.nodeValue).to.equal("1");
                    expectDOMOps(c, 4, 0, 0, 0, 4, 1, 0);
                });
            });
        });

        it("<h1><B><A.0></B> => <h1><B><A.1></B> => <B><A.1></B><h1>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = component(A, 0);
                    r(html("div").children(
                        html("h1").key(0),
                        component(B, a).key(1),
                    ));
                    getComponentInstanceFromVNode<A>(a)!.updateState(1);
                    const n = r(html("div").children(
                        component(B, component(A, 1)).key(1),
                        html("h1").key(0),
                    )) as HTMLDivElement;
                    expect(n.children[0].tagName.toLowerCase()).to.equal("span");
                    expect(n.children[0].firstChild!.nodeValue).to.equal("1");
                    expectDOMOps(c, 4, 0, 0, 0, 4, 1, 0);
                });
            });
        });

        // same tests in the opposite direction
        it("<A.0><h1> => <A.1><h1> => <h1><A.1>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = component(A, 0).key(1);
                    r(html("div").children(
                        a,
                        html("h1").key(0),
                    ));
                    getComponentInstanceFromVNode<A>(a)!.updateState(1);
                    const n = r(html("div").children(
                        html("h1").key(0),
                        component(A, 1).key(1),
                    )) as HTMLDivElement;
                    expect(n.children[1].tagName.toLowerCase()).to.equal("span");
                    expect(n.children[1].firstChild!.nodeValue).to.equal("1");
                    expectDOMOps(c, 4, 0, 0, 0, 4, 1, 0);
                });
            });
        });

        it("<B><A.0></B><h1> => <B><A.1></B><h1> => <h1><B><A.1></B>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    const a = component(A, 0);
                    r(html("div").children(
                        component(B, a).key(1),
                        html("h1").key(0),
                    ));
                    getComponentInstanceFromVNode<A>(a)!.updateState(1);
                    const n = r(html("div").children(
                        html("h1").key(0),
                        component(B, component(A, 1)).key(1),
                    )) as HTMLDivElement;
                    expect(n.children[1].tagName.toLowerCase()).to.equal("span");
                    expect(n.children[1].firstChild!.nodeValue).to.equal("1");
                    expectDOMOps(c, 4, 0, 0, 0, 4, 1, 0);
                });
            });
        });
    });

    describe("keyed+non-keyed", () => {
        it("<div>.0#0#1.1</div> => <div>.0#0#1#2.1</div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").children(
                        text("a"), text("b").key(0), text("c").key(1), text("d"),
                    ));
                    const b = r(html("div").children(
                        text("a"), text("b").key(0), text("c").key(1), text("e").key(2), text("d"),
                    ));
                    expect(b.childNodes[0].nodeValue).to.equal("a");
                    expect(b.childNodes[1].nodeValue).to.equal("b");
                    expect(b.childNodes[2].nodeValue).to.equal("c");
                    expect(b.childNodes[3].nodeValue).to.equal("e");
                    expect(b.childNodes[4].nodeValue).to.equal("d");
                    expectDOMOps(c, 1, 0, 6, 0, 7, 0, 1);
                });
            });
        });

        it("<div>.0#0#1.1</div> => <div>.0#0.1</div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").children(
                        text("a"), text("b").key(0), text("c").key(1), text("d"),
                    ));
                    const b = r(html("div").children(
                        text("a"), text("b").key(0), text("d"),
                    ));
                    expect(b.childNodes[0].nodeValue).to.equal("a");
                    expect(b.childNodes[1].nodeValue).to.equal("b");
                    expect(b.childNodes[2].nodeValue).to.equal("d");
                    expectDOMOps(c, 1, 0, 5, 0, 6, 0, 2);
                });
            });
        });

        it("<div>.0#0#1.1</div> => <div>.0#1#0.1</div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").children(
                        text("a"), text("b").key(0), text("c").key(1), text("d"),
                    ));
                    const b = r(html("div").children(
                        text("a"), text("c").key(1), text("b").key(0), text("d"),
                    ));
                    expect(b.childNodes[0].nodeValue).to.equal("a");
                    expect(b.childNodes[1].nodeValue).to.equal("c");
                    expect(b.childNodes[2].nodeValue).to.equal("b");
                    expect(b.childNodes[3].nodeValue).to.equal("d");
                    expectDOMOps(c, 1, 0, 4, 0, 6, 0, 0);
                });
            });
        });

        it("<div>.0#0.1#1.2</div> => <div>.0#1.1#0.2</div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").children(
                        text("a"), text("b").key(0), text("e"), text("c").key(1), text("d"),
                    ));
                    const b = r(html("div").children(
                        text("a"), text("c").key(1), text("e"), text("b").key(0), text("d"),
                    ));
                    expect(b.childNodes[0].nodeValue).to.equal("a");
                    expect(b.childNodes[1].nodeValue).to.equal("c");
                    expect(b.childNodes[2].nodeValue).to.equal("e");
                    expect(b.childNodes[3].nodeValue).to.equal("b");
                    expect(b.childNodes[4].nodeValue).to.equal("d");
                    expectDOMOps(c, 1, 0, 5, 0, 8, 0, 0);
                });
            });
        });

        it("<div>#0.1.2#1</div> => <div>.1.2</div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").children(
                        text("a").key(0), text("b"), text("c"), text("d").key(1),
                    ));
                    const b = r(html("div").children(
                        null, text("b"), text("c"), null,
                    ));
                    expect(b.childNodes[0].nodeValue).to.equal("b");
                    expect(b.childNodes[1].nodeValue).to.equal("c");
                    expectDOMOps(c, 1, 0, 4, 0, 5, 0, 2);
                });
            });
        });

        it("<div>.1.2</div> => <div>#0.1.2#1</div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").children(
                        null, text("b"), text("c"), null,
                    ));
                    const b = r(html("div").children(
                        text("a").key(0), text("b"), text("c"), text("d").key(1),
                    ));
                    expect(b.childNodes[0].nodeValue).to.equal("a");
                    expect(b.childNodes[1].nodeValue).to.equal("b");
                    expect(b.childNodes[2].nodeValue).to.equal("c");
                    expect(b.childNodes[3].nodeValue).to.equal("d");
                    expectDOMOps(c, 1, 0, 4, 0, 5, 0, 0);
                });
            });
        });

        it("<div>.1.2</div> => <div>#0.1.2#1#2#3#4#5#6#7#8#9</div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").children(
                        null, text("b"), text("c"), null,
                    ));
                    const b = r(html("div").children(
                        text("a").key(0), text("b"), text("c"),
                        text("d").key(1), text("e").key(2), text("f").key(3), text("g").key(4), text("h").key(5),
                        text("i").key(6),
                        text("j").key(7), text("k").key(8), text("l").key(9),
                    ));
                    expect(b.childNodes[0].nodeValue).to.equal("a");
                    expect(b.childNodes[1].nodeValue).to.equal("b");
                    expect(b.childNodes[2].nodeValue).to.equal("c");
                    expect(b.childNodes[3].nodeValue).to.equal("d");
                    expect(b.childNodes[4].nodeValue).to.equal("e");
                    expect(b.childNodes[5].nodeValue).to.equal("f");
                    expect(b.childNodes[6].nodeValue).to.equal("g");
                    expect(b.childNodes[7].nodeValue).to.equal("h");
                    expect(b.childNodes[8].nodeValue).to.equal("i");
                    expect(b.childNodes[9].nodeValue).to.equal("j");
                    expect(b.childNodes[10].nodeValue).to.equal("k");
                    expect(b.childNodes[11].nodeValue).to.equal("l");
                    expectDOMOps(c, 1, 0, 12, 0, 13, 0, 0);
                });
            });
        });

        it("<div><div />.0#0.1#1.2<div /></div> => <div>.0#1.1#0.2</div>", () => {
            startRender((r) => {
                checkDOMOps((c) => {
                    r(html("div").children(
                        html("div"), text("a"), text("b").key(0), text("e"), text("c").key(1), text("d"), html("div"),
                    ));
                    const b = r(html("div").children(
                        text("a"), text("c").key(1), text("e"), text("b").key(0), text("d"),
                    ));
                    expect(b.childNodes[0].nodeValue).to.equal("a");
                    expect(b.childNodes[1].nodeValue).to.equal("c");
                    expect(b.childNodes[2].nodeValue).to.equal("e");
                    expect(b.childNodes[3].nodeValue).to.equal("b");
                    expect(b.childNodes[4].nodeValue).to.equal("d");
                    expectDOMOps(c, 3, 0, 8, 0, 11, 1, 4);
                });
            });
        });
    });
});

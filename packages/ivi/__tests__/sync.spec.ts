/* tslint:disable:no-unused-expression */

import { ComponentFlags } from "../src/vdom/flags";
import { VNode, getComponentInstanceFromVNode } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { componentFactory } from "../src/vdom/vnode_factories";
import { render, startRender, checkDOMOps, DOMOpsCounter, $tc, $tcf } from "./utils";
import * as h from "./utils/html";
import { expect } from "chai";

function genVNodes(item: any, keys: boolean): VNode<any> | VNode<any>[] {
  if (typeof item === "number") {
    return keys ? h.t(item.toString()).key(item.toString()) : h.t(item.toString());
  } else if (Array.isArray(item)) {
    const result: VNode<any>[] = [];
    for (let i = 0; i < item.length; i++) {
      result.push(genVNodes(item[i], keys) as VNode<any>);
    }
    return result;
  } else {
    const e = keys ? h.div().key(item.key) : h.div();
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
  const a = h.div();
  const b = h.div();
  const c = h.div();
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
          r(h.div());
          r(h.div().props({}));
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({}));
          r(h.div());
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({}));
          r(h.div().props({}));
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => {title: 1}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div().props({ title: "1" })) as HTMLElement;
          expect(b.title).to.equal("1");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {title: 1}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({}));
          const b = r(h.div().props({ title: "1" })) as HTMLElement;
          expect(b.title).to.equal("1");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1} => {title: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1" }));
          const b = r(h.div().props({ title: "2" })) as HTMLElement;
          expect(b.title).to.equal("2");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {title: 2, tabIndex: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({}));
          const b = r(h.div().props({ title: "2", tabIndex: 2 })) as HTMLElement;
          expect(b.title).to.equal("2");
          expect(b.tabIndex).to.equal(2);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1} => {title: 2, tabIndex: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1" }));
          const b = r(h.div().props({ title: "2", tabIndex: 2 })) as HTMLElement;
          expect(b.title).to.equal("2");
          expect(b.tabIndex).to.equal(2);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {title: 2, tabIndex: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1", tabIndex: 1 }));
          const b = r(h.div().props({ title: "2", tabIndex: 2 })) as HTMLElement;
          expect(b.title).to.equal("2");
          expect(b.tabIndex).to.equal(2);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {title: 1, tabIndex: 1}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1", tabIndex: 1 }));
          const b = r(h.div().props({ title: "1", tabIndex: 1 })) as HTMLElement;
          expect(b.title).to.equal("1");
          expect(b.tabIndex).to.equal(1);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {title: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1", tabIndex: 1 }));
          const b = r(h.div().props({ title: "2" })) as HTMLElement;
          expect(b.title).to.equal("2");
          expect(b.tabIndex).to.lessThan(1);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {title: 2, lang: en}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1", tabIndex: 1 }));
          const b = r(h.div().props({ title: "2", lang: "en" })) as HTMLElement;
          expect(b.title).to.equal("2");
          expect(b.tabIndex).to.lessThan(1);
          expect(b.lang).to.equal("en");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {lang: en}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1", tabIndex: 1 }));
          const b = r(h.div().props({ lang: "en" })) as HTMLElement;
          expect(b.title).to.equal("");
          expect(b.tabIndex).to.lessThan(1);
          expect(b.lang).to.equal("en");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1", tabIndex: 1 }));
          const b = r(h.div().props({})) as HTMLElement;
          expect(b.title).to.equal("");
          expect(b.tabIndex).to.lessThan(1);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().props({ title: "1", tabIndex: 1 }));
          const b = r(h.div()) as HTMLElement;
          expect(b.title).to.equal("");
          expect(b.tabIndex).to.lessThan(1);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });
  });

  describe("className", () => {
    it("null => 'a'", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div("a")) as HTMLElement;
          expect(b.classList.length).to.equal(1);
          expect(b.classList.contains("a")).to.true;
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("'a' => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div("a"));
          const b = r(h.div()) as HTMLElement;
          expect(b.classList.length).to.equal(0);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("'a' => 'a'", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div("a"));
          const b = r(h.div("a")) as HTMLElement;
          expect(b.classList.length).to.equal(1);
          expect(b.classList.contains("a")).to.true;
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => 'a'", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div("a b")) as HTMLElement;
          expect(b.classList.length).to.equal(2);
          expect(b.classList.contains("a")).to.true;
          expect(b.classList.contains("b")).to.true;
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });
  });

  describe("style", () => {
    it("{} => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({}));
          const b = r(h.div()) as HTMLElement;
          expect(b.style.cssText).to.equal("");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div().style({})) as HTMLElement;
          expect(b.style.cssText).to.equal("");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({}));
          const b = r(h.div().style({})) as HTMLElement;
          expect(b.style.cssText).to.equal("");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => {top: 10px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div().style({ top: "10px" })) as HTMLElement;
          expect(b.style.top).to.equal("10px");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {top: 10px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({}));
          const b = r(h.div().style({ top: "10px" })) as HTMLElement;
          expect(b.style.top).to.equal("10px");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => {top: 10px, left: 20px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div().style({ top: "10px", left: "20px" })) as HTMLElement;
          expect(b.style.top).to.equal("10px");
          expect(b.style.left).to.equal("20px");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px} => {top: 10px, left: 20px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({ top: "1px" }));
          const b = r(h.div().style({ top: "10px", left: "20px" })) as HTMLElement;
          expect(b.style.top).to.equal("10px");
          expect(b.style.left).to.equal("20px");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {top: 10px, left: 20px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({ top: "1px", left: "1px" }));
          const b = r(h.div().style({ top: "10px", left: "20px" })) as HTMLElement;
          expect(b.style.top).to.equal("10px");
          expect(b.style.left).to.equal("20px");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {top: 10px, left: 20px, right: 30px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({ top: "1px", left: "1px" }));
          const b = r(h.div().style({ top: "10px", left: "20px", right: "30px" })) as HTMLElement;
          expect(b.style.top).to.equal("10px");
          expect(b.style.left).to.equal("20px");
          expect(b.style.right).to.equal("30px");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {top: 10px, right: 30px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({ top: "1px", left: "1px" }));
          const b = r(h.div().style({ top: "10px", right: "30px" })) as HTMLElement;
          expect(b.style.top).to.equal("10px");
          expect(b.style.left).to.equal("");
          expect(b.style.right).to.equal("30px");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {right: 30px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({ top: "1px", left: "1px" }));
          const b = r(h.div().style({ right: "30px" })) as HTMLElement;
          expect(b.style.top).to.equal("");
          expect(b.style.left).to.equal("");
          expect(b.style.right).to.equal("30px");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {top: 1px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({ top: "1px", left: "1px" }));
          const b = r(h.div().style({ top: "1px" })) as HTMLElement;
          expect(b.style.top).to.equal("1px");
          expect(b.style.left).to.equal("");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({ top: "1px", left: "1px" }));
          const b = r(h.div().style({})) as HTMLElement;
          expect(b.style.top).to.equal("");
          expect(b.style.left).to.equal("");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().style({ top: "1px", left: "1px" }));
          const b = r(h.div()) as HTMLElement;
          expect(b.style.top).to.equal("");
          expect(b.style.left).to.equal("");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
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
            r(h.div());
            const b = r(h.div().children("abc"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("abc");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("null => 10", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().children(10));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("10");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'abc' => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children("abc"));
            const b = r(h.div());
            expect(b.childNodes.length).to.equal(0);
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("10 => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(10));
            const b = r(h.div());
            expect(b.childNodes.length).to.equal(0);
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'abc' => 'abc'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children("abc"));
            const b = r(h.div().children("abc"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("abc");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("10 => 10", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(10));
            const b = r(h.div().children(10));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("10");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'abc' => 'cde'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children("abc"));
            const b = r(h.div().children("cde"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("cde");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'' => 'cde'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(""));
            const b = r(h.div().children("cde"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("cde");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'abc' => 10", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children("abc"));
            const b = r(h.div().children(10));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("10");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("10 => 'abc'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(10));
            const b = r(h.div().children("abc"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("abc");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("null => <div>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().children(h.div())) as HTMLElement;
            expect(b.childNodes.length).to.equal(1);
            expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("<div> => 'cde'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.div()));
            const b = r(h.div().children("cde"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("cde");
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("'cde' => <div>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children("cde"));
            const b = r(h.div().children(h.div())) as HTMLElement;
            expect(b.childNodes.length).to.equal(1);
            expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("null => [<div>]", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().children(h.div())) as HTMLElement;
            expect(b.childNodes.length).to.equal(1);
            expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("<div> => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.div()));
            const b = r(h.div());
            expect(b.childNodes.length).to.equal(0);
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 1);
          });
        });
      });

      it("[<div>] => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children([h.div()]));
            const b = r(h.div());
            expect(b.childNodes.length).to.equal(0);
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 1);
          });
        });
      });

      it("[<div>] => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.div()));
            const b = r(h.div().children(null));
            expect(b.childNodes.length).to.equal(0);
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 1);
          });
        });
      });

      it("null => [<div>, <div>]", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().children(h.div(), h.div())) as HTMLElement;
            expect(b.childNodes.length).to.equal(2);
            expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            expect(b.children[1].tagName.toLowerCase()).to.equal("div");
            expect(c).to.matchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("[<div>, <div>] => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.div(), h.div()));
            const b = r(h.div());
            expect(b.childNodes.length).to.equal(0);
            expect(c).to.matchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("null => unsafeHTML('abc')", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().unsafeHTML("abc"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("abc");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("123 => unsafeHTML('abc')", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(123));
            const b = r(h.div().unsafeHTML("abc"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("abc");
            expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("123 => [<h1><h2>]", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(123));
            const b = r(h.div().children(h.h1(), h.h2())) as HTMLElement;
            expect(b.childNodes.length).to.equal(2);
            expect(b.children[0].tagName.toLowerCase()).to.equal("h1");
            expect(b.children[1].tagName.toLowerCase()).to.equal("h2");
            expect(c).to.matchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("[<h1><h2>] => 123", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.h1(), h.h2()));
            const b = r(h.div().children(123));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("123");
            expect(c).to.matchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("[<h1><h2>] => unsafeHTML('abc')", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.h1(), h.h2()));
            const b = r(h.div().unsafeHTML("abc"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("abc");
            expect(c).to.matchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("[<h1><h2>] => <div>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.h1(), h.h2()));
            const b = r(h.div().children(h.div())) as HTMLElement;
            expect(b.childNodes.length).to.equal(1);
            expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            expect(c).to.matchDOMOps(4, 0, 0, 0, 3, 1, 1);
          });
        });
      });

      it("[] => <div>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children([]));
            const b = r(h.div().children(h.div())) as HTMLElement;
            expect(b.childNodes.length).to.equal(1);
            expect(b.children[0].tagName.toLowerCase()).to.equal("div");
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("<div> => unsafeHTML('abc')", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.div()));
            const b = r(h.div().unsafeHTML("abc"));
            expect(b.childNodes.length).to.equal(1);
            expect(b.firstChild!.nodeValue).to.equal("abc");
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("<h1> => <h2>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.h1()));
            const b = r(h.div().children(h.h2())) as HTMLElement;
            expect(b.childNodes.length).to.equal(1);
            expect(b.children[0].tagName.toLowerCase()).to.equal("h2");
            expect(c).to.matchDOMOps(3, 0, 0, 0, 2, 1, 0);
          });
        });
      });

      it("<div> => [<h1><h2>]", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.div()));
            const b = r(h.div().children(h.h1(), h.h2())) as HTMLElement;
            expect(b.childNodes.length).to.equal(2);
            expect(b.children[0].tagName.toLowerCase()).to.equal("h1");
            expect(b.children[1].tagName.toLowerCase()).to.equal("h2");
            expect(c).to.matchDOMOps(4, 0, 0, 0, 3, 1, 0);
          });
        });
      });

      it("<div> => []", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().children(h.div()));
            const b = r(h.div().children([]));
            expect(b.childNodes.length).to.equal(0);
            expect(c).to.matchDOMOps(2, 0, 0, 0, 2, 0, 1);
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
            const e = expect(c).to;
            e.matchDOMOps.apply(e, t[2]);
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
            const e = expect(c).to;
            e.matchDOMOps.apply(e, t[3]);
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
          r(h.span());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><div></C> => <div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r(h.div()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(a).to.not.equal(b);
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<div> => <C><div></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r(h.div());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(a).to.not.equal(b);
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><div></C> => <span>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc());
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("span");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
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
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
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
          expect(c).to.matchDOMOps(1, 0, 1, 0, 1, 1, 0);
        });
      });
    });

    it("<C>''</C> => <C><div></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc(""));
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(c).to.matchDOMOps(1, 0, 1, 0, 1, 1, 0);
        });
      });
    });

    it("<C><C><C><div></C></C></C> => <span>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc(h.div(), 3));
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("span");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<span> => <C><C><C><div></C></C></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><C><C><div></C></C></C> => <C><C><C><div></C></C></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc(h.div(), 3));
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(a).to.equal(b);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<span> => <F><div></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><div></F> => <div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r(h.div()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(a).to.not.equal(b);
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<div> => <F><div></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r(h.div());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(a).to.not.equal(b);
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><div></F> => <span>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf());
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("span");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
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
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
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
          expect(c).to.matchDOMOps(1, 0, 1, 0, 1, 1, 0);
        });
      });
    });

    it("<F>''</F> => <F><div></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf(""));
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(c).to.matchDOMOps(1, 0, 1, 0, 1, 1, 0);
        });
      });
    });

    it("<F><F><F><div></F></F></F> => <span>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf(h.div(), 3));
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("span");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<span> => <F><F><F><div></F></F></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><F><F><div></F></F></F> => <F><F><F><div></F></F></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf(h.div(), 3));
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(a).to.equal(b);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
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
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
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
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><C><C><div></C></C></C> => <F><F><F><div></F></F></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc(h.div(), 3));
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(a).to.not.equal(b);
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><F><F><div></F></F></F> => <C><C><C><div></C></C></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf(h.div(), 3));
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).to.equal("div");
          expect(a).to.not.equal(b);
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });
  });

  describe("special elements", () => {
    it("<input type='text'> => <input type='checkbox'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText());
          const b = r(h.inputCheckbox()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).to.equal("input");
          expect(b.type).to.equal("checkbox");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<input type='text'> => <input type='text' value='cde'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText());
          const b = r(h.inputText().value("cde")) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).to.equal("input");
          expect(b.type).to.equal("text");
          expect(b.value).to.equal("cde");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='text' value='abc'> => <input type='text' value='cde'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText().value("abc"));
          const b = r(h.inputText().value("cde")) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).to.equal("input");
          expect(b.type).to.equal("text");
          expect(b.value).to.equal("cde");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='text' value='abc'> => <input type='text'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText().value("abc"));
          const b = r(h.inputText()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).to.equal("input");
          expect(b.type).to.equal("text");
          expect(b.value).to.equal("abc");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='checkbox'> => <input type='checkbox checked=true'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox());
          const b = r(h.inputCheckbox().checked(true)) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).to.equal("input");
          expect(b.type).to.equal("checkbox");
          expect(b.checked).to.equal(true);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='checkbox' checked=true> => <input type='checkbox checked=false'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox().checked(true));
          const b = r(h.inputCheckbox().checked(false)) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).to.equal("input");
          expect(b.type).to.equal("checkbox");
          expect(b.checked).to.equal(false);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='checkbox' checked=true> => <input type='checkbox'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox().checked(true));
          const b = r(h.inputCheckbox()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).to.equal("input");
          expect(b.type).to.equal("checkbox");
          expect(b.checked).to.equal(true);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='text'> => <textarea>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText());
          const b = r(h.textarea()) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).to.equal("textarea");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<textarea> => <input type='text'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea());
          const b = r(h.inputText()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).to.equal("input");
          expect(b.type).to.equal("text");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<textarea></textarea> => <textarea>cde</textarea>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea());
          const b = r(h.textarea().value("cde")) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).to.equal("textarea");
          expect(b.value).to.equal("cde");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<textarea>abc</textarea> => <textarea>cde</textarea>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea().value("abc"));
          const b = r(h.textarea().value("cde")) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).to.equal("textarea");
          expect(b.value).to.equal("cde");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<textarea>abc</textarea> => <textarea></textarea>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea().value("abc"));
          const b = r(h.textarea()) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).to.equal("textarea");
          expect(b.value).to.equal("abc");
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<audio> => <video>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.audio());
          const b = r(h.video()) as HTMLMediaElement;
          expect(b.tagName.toLowerCase()).to.equal("video");
          expect(c).to.matchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<audio> => <audio volume=0.5>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.audio());
          const b = r(h.audio().props({ volume: 0.5 })) as HTMLMediaElement;
          expect(b.volume).to.equal(0.5);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<audio volume=0.3> => <audio volume=0.5>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.audio().props({ volume: 0.3 }));
          const b = r(h.audio().props({ volume: 0.5 })) as HTMLMediaElement;
          expect(b.volume).to.equal(0.5);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<audio volume=0.3> => <audio>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.audio().props({ volume: 0.3 }));
          const b = r(h.audio()) as HTMLMediaElement;
          expect(b.volume).to.equal(0.3);
          expect(c).to.matchDOMOps(1, 0, 0, 0, 1, 0, 0);
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
          return h.span().children(1);
        }
        return h.div().children(0);
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

    const ca = componentFactory(A);
    const cb = componentFactory(B);

    it("<h1><A.0> => <h1><A.1> => <A.1><h1>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0).key(1);
          r(h.div().children(
            h.h1().key(0),
            a,
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().children(
            ca(1).key(1),
            h.h1().key(0),
          )) as HTMLDivElement;
          expect(n.children[0].tagName.toLowerCase()).to.equal("span");
          expect(n.children[0].firstChild!.nodeValue).to.equal("1");
          expect(c).to.matchDOMOps(4, 0, 0, 0, 4, 1, 0);
        });
      });
    });

    it("<h1><B><A.0></B> => <h1><B><A.1></B> => <B><A.1></B><h1>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0);
          r(h.div().children(
            h.h1().key(0),
            cb(a).key(1),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().children(
            cb(ca(1)).key(1),
            h.h1().key(0),
          )) as HTMLDivElement;
          expect(n.children[0].tagName.toLowerCase()).to.equal("span");
          expect(n.children[0].firstChild!.nodeValue).to.equal("1");
          expect(c).to.matchDOMOps(4, 0, 0, 0, 4, 1, 0);
        });
      });
    });

    // same tests in the opposite direction
    it("<A.0><h1> => <A.1><h1> => <h1><A.1>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0).key(1);
          r(h.div().children(
            a,
            h.h1().key(0),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().children(
            h.h1().key(0),
            ca(1).key(1),
          )) as HTMLDivElement;
          expect(n.children[1].tagName.toLowerCase()).to.equal("span");
          expect(n.children[1].firstChild!.nodeValue).to.equal("1");
          expect(c).to.matchDOMOps(4, 0, 0, 0, 4, 1, 0);
        });
      });
    });

    it("<B><A.0></B><h1> => <B><A.1></B><h1> => <h1><B><A.1></B>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0);
          r(h.div().children(
            cb(a).key(1),
            h.h1().key(0),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().children(
            h.h1().key(0),
            cb(ca(1)).key(1),
          )) as HTMLDivElement;
          expect(n.children[1].tagName.toLowerCase()).to.equal("span");
          expect(n.children[1].firstChild!.nodeValue).to.equal("1");
          expect(c).to.matchDOMOps(4, 0, 0, 0, 4, 1, 0);
        });
      });
    });
  });

  describe("keyed+non-keyed", () => {
    it("<div>.0#0#1.1</div> => <div>.0#0#1#2.1</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().children(
            h.t("a"), h.t("b").key(0), h.t("c").key(1), h.t("d"),
          ));
          const b = r(h.div().children(
            h.t("a"), h.t("b").key(0), h.t("c").key(1), h.t("e").key(2), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).to.equal("a");
          expect(b.childNodes[1].nodeValue).to.equal("b");
          expect(b.childNodes[2].nodeValue).to.equal("c");
          expect(b.childNodes[3].nodeValue).to.equal("e");
          expect(b.childNodes[4].nodeValue).to.equal("d");
          expect(c).to.matchDOMOps(1, 0, 6, 0, 7, 0, 1);
        });
      });
    });

    it("<div>.0#0#1.1</div> => <div>.0#0.1</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().children(
            h.t("a"), h.t("b").key(0), h.t("c").key(1), h.t("d"),
          ));
          const b = r(h.div().children(
            h.t("a"), h.t("b").key(0), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).to.equal("a");
          expect(b.childNodes[1].nodeValue).to.equal("b");
          expect(b.childNodes[2].nodeValue).to.equal("d");
          expect(c).to.matchDOMOps(1, 0, 5, 0, 6, 0, 2);
        });
      });
    });

    it("<div>.0#0#1.1</div> => <div>.0#1#0.1</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().children(
            h.t("a"), h.t("b").key(0), h.t("c").key(1), h.t("d"),
          ));
          const b = r(h.div().children(
            h.t("a"), h.t("c").key(1), h.t("b").key(0), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).to.equal("a");
          expect(b.childNodes[1].nodeValue).to.equal("c");
          expect(b.childNodes[2].nodeValue).to.equal("b");
          expect(b.childNodes[3].nodeValue).to.equal("d");
          expect(c).to.matchDOMOps(1, 0, 4, 0, 6, 0, 0);
        });
      });
    });

    it("<div>.0#0.1#1.2</div> => <div>.0#1.1#0.2</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().children(
            h.t("a"), h.t("b").key(0), h.t("e"), h.t("c").key(1), h.t("d"),
          ));
          const b = r(h.div().children(
            h.t("a"), h.t("c").key(1), h.t("e"), h.t("b").key(0), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).to.equal("a");
          expect(b.childNodes[1].nodeValue).to.equal("c");
          expect(b.childNodes[2].nodeValue).to.equal("e");
          expect(b.childNodes[3].nodeValue).to.equal("b");
          expect(b.childNodes[4].nodeValue).to.equal("d");
          expect(c).to.matchDOMOps(1, 0, 5, 0, 8, 0, 0);
        });
      });
    });

    it("<div>#0.1.2#1</div> => <div>.1.2</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().children(
            h.t("a").key(0), h.t("b"), h.t("c"), h.t("d").key(1),
          ));
          const b = r(h.div().children(
            null, h.t("b"), h.t("c"), null,
          ));
          expect(b.childNodes[0].nodeValue).to.equal("b");
          expect(b.childNodes[1].nodeValue).to.equal("c");
          expect(c).to.matchDOMOps(1, 0, 4, 0, 5, 0, 2);
        });
      });
    });

    it("<div>.1.2</div> => <div>#0.1.2#1</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().children(
            null, h.t("b"), h.t("c"), null,
          ));
          const b = r(h.div().children(
            h.t("a").key(0), h.t("b"), h.t("c"), h.t("d").key(1),
          ));
          expect(b.childNodes[0].nodeValue).to.equal("a");
          expect(b.childNodes[1].nodeValue).to.equal("b");
          expect(b.childNodes[2].nodeValue).to.equal("c");
          expect(b.childNodes[3].nodeValue).to.equal("d");
          expect(c).to.matchDOMOps(1, 0, 4, 0, 5, 0, 0);
        });
      });
    });

    it("<div>.1.2</div> => <div>#0.1.2#1#2#3#4#5#6#7#8#9</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().children(
            null, h.t("b"), h.t("c"), null,
          ));
          const b = r(h.div().children(
            h.t("a").key(0), h.t("b"), h.t("c"),
            h.t("d").key(1), h.t("e").key(2), h.t("f").key(3), h.t("g").key(4), h.t("h").key(5),
            h.t("i").key(6),
            h.t("j").key(7), h.t("k").key(8), h.t("l").key(9),
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
          expect(c).to.matchDOMOps(1, 0, 12, 0, 13, 0, 0);
        });
      });
    });

    it("<div><div />.0#0.1#1.2<div /></div> => <div>.0#1.1#0.2</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().children(
            h.div(), h.t("a"), h.t("b").key(0), h.t("e"), h.t("c").key(1), h.t("d"), h.div(),
          ));
          const b = r(h.div().children(
            h.t("a"), h.t("c").key(1), h.t("e"), h.t("b").key(0), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).to.equal("a");
          expect(b.childNodes[1].nodeValue).to.equal("c");
          expect(b.childNodes[2].nodeValue).to.equal("e");
          expect(b.childNodes[3].nodeValue).to.equal("b");
          expect(b.childNodes[4].nodeValue).to.equal("d");
          expect(c).to.matchDOMOps(3, 0, 8, 0, 11, 1, 4);
        });
      });
    });
  });
});

import { ComponentFlags } from "../src/vdom/flags";
import { VNode, getComponentInstanceFromVNode } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { componentFactory } from "../src/vdom/vnode_factories";
import { render, startRender, checkDOMOps, DOMOpsCounter, $tc, $tcf } from "./utils";
import * as h from "./utils/html";
import { expect } from "iko";

function genVNodes(item: any, keys: boolean): VNode | VNode[] {
  if (typeof item === "number") {
    return keys ? h.t(item.toString()).k(item.toString()) : h.t(item.toString());
  } else if (Array.isArray(item)) {
    const result: VNode[] = [];
    for (let i = 0; i < item.length; i++) {
      result.push(genVNodes(item[i], keys) as VNode);
    }
    return result;
  } else {
    const e = keys ? h.div().k(item.key) : h.div();
    if (keys) {
      e.c(...genVNodes(item.children, keys) as VNode[]);
    } else {
      e.c(...genVNodes(item.children, keys) as VNode[]);
    }
    return e;
  }
}

function checkInnerHtmlEquals(ax: VNode[], bx: VNode[], cx: VNode[], keys: boolean, counter: DOMOpsCounter): void {
  const a = h.div();
  const b = h.div();
  const c = h.div();
  if (keys) {
    a.c(...ax);
    b.c(...bx);
    c.c(...cx);
  } else {
    a.c(...ax);
    b.c(...bx);
    c.c(...cx);
  }

  const aDiv = document.createElement("div");
  const bDiv = document.createElement("div");
  render(a, aDiv);
  render(b, bDiv);

  counter.reset();
  render(c, aDiv);

  expect(aDiv.innerHTML).toBe(bDiv.innerHTML);
}

describe("sync", () => {
  describe("props", () => {
    it("null => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          r(h.div().a({}));
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({}));
          r(h.div());
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({}));
          r(h.div().a({}));
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => {title: 1}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div().a({ title: "1" })) as HTMLElement;
          expect(b.title).toBe("1");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {title: 1}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({}));
          const b = r(h.div().a({ title: "1" })) as HTMLElement;
          expect(b.title).toBe("1");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1} => {title: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1" }));
          const b = r(h.div().a({ title: "2" })) as HTMLElement;
          expect(b.title).toBe("2");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {title: 2, tabIndex: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({}));
          const b = r(h.div().a({ title: "2", tabIndex: 2 })) as HTMLElement;
          expect(b.title).toBe("2");
          expect(b.tabIndex).toBe(2);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1} => {title: 2, tabIndex: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1" }));
          const b = r(h.div().a({ title: "2", tabIndex: 2 })) as HTMLElement;
          expect(b.title).toBe("2");
          expect(b.tabIndex).toBe(2);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {title: 2, tabIndex: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1", tabIndex: 1 }));
          const b = r(h.div().a({ title: "2", tabIndex: 2 })) as HTMLElement;
          expect(b.title).toBe("2");
          expect(b.tabIndex).toBe(2);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {title: 1, tabIndex: 1}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1", tabIndex: 1 }));
          const b = r(h.div().a({ title: "1", tabIndex: 1 })) as HTMLElement;
          expect(b.title).toBe("1");
          expect(b.tabIndex).toBe(1);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {title: 2}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1", tabIndex: 1 }));
          const b = r(h.div().a({ title: "2" })) as HTMLElement;
          expect(b.title).toBe("2");
          expect(b.tabIndex).toBeLessThan(1);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {title: 2, lang: en}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1", tabIndex: 1 }));
          const b = r(h.div().a({ title: "2", lang: "en" })) as HTMLElement;
          expect(b.title).toBe("2");
          expect(b.tabIndex).toBeLessThan(1);
          expect(b.lang).toBe("en");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {lang: en}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1", tabIndex: 1 }));
          const b = r(h.div().a({ lang: "en" })) as HTMLElement;
          expect(b.title).toBe("");
          expect(b.tabIndex).toBeLessThan(1);
          expect(b.lang).toBe("en");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1", tabIndex: 1 }));
          const b = r(h.div().a({})) as HTMLElement;
          expect(b.title).toBe("");
          expect(b.tabIndex).toBeLessThan(1);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{title: 1, tabIndex: 1} => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().a({ title: "1", tabIndex: 1 }));
          const b = r(h.div()) as HTMLElement;
          expect(b.title).toBe("");
          expect(b.tabIndex).toBeLessThan(1);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
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
          expect(b.classList.length).toBe(1);
          expect(b.classList.contains("a")).toBe(true);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("'a' => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div("a"));
          const b = r(h.div()) as HTMLElement;
          expect(b.classList.length).toBe(0);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("'a' => 'a'", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div("a"));
          const b = r(h.div("a")) as HTMLElement;
          expect(b.classList.length).toBe(1);
          expect(b.classList.contains("a")).toBe(true);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => 'a'", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div("a b")) as HTMLElement;
          expect(b.classList.length).toBe(2);
          expect(b.classList.contains("a")).toBe(true);
          expect(b.classList.contains("b")).toBe(true);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });
  });

  describe("style", () => {
    it("{} => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({}));
          const b = r(h.div()) as HTMLElement;
          expect(b.style.cssText).toBe("");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div().s({})) as HTMLElement;
          expect(b.style.cssText).toBe("");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({}));
          const b = r(h.div().s({})) as HTMLElement;
          expect(b.style.cssText).toBe("");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => {top: 10px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div().s({ top: "10px" })) as HTMLElement;
          expect(b.style.top).toBe("10px");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{} => {top: 10px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({}));
          const b = r(h.div().s({ top: "10px" })) as HTMLElement;
          expect(b.style.top).toBe("10px");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("null => {top: 10px, left: 20px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div());
          const b = r(h.div().s({ top: "10px", left: "20px" })) as HTMLElement;
          expect(b.style.top).toBe("10px");
          expect(b.style.left).toBe("20px");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px} => {top: 10px, left: 20px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({ top: "1px" }));
          const b = r(h.div().s({ top: "10px", left: "20px" })) as HTMLElement;
          expect(b.style.top).toBe("10px");
          expect(b.style.left).toBe("20px");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {top: 10px, left: 20px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({ top: "1px", left: "1px" }));
          const b = r(h.div().s({ top: "10px", left: "20px" })) as HTMLElement;
          expect(b.style.top).toBe("10px");
          expect(b.style.left).toBe("20px");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {top: 10px, left: 20px, right: 30px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({ top: "1px", left: "1px" }));
          const b = r(h.div().s({ top: "10px", left: "20px", right: "30px" })) as HTMLElement;
          expect(b.style.top).toBe("10px");
          expect(b.style.left).toBe("20px");
          expect(b.style.right).toBe("30px");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {top: 10px, right: 30px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({ top: "1px", left: "1px" }));
          const b = r(h.div().s({ top: "10px", right: "30px" })) as HTMLElement;
          expect(b.style.top).toBe("10px");
          expect(b.style.left).toBe("");
          expect(b.style.right).toBe("30px");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {right: 30px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({ top: "1px", left: "1px" }));
          const b = r(h.div().s({ right: "30px" })) as HTMLElement;
          expect(b.style.top).toBe("");
          expect(b.style.left).toBe("");
          expect(b.style.right).toBe("30px");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {top: 1px}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({ top: "1px", left: "1px" }));
          const b = r(h.div().s({ top: "1px" })) as HTMLElement;
          expect(b.style.top).toBe("1px");
          expect(b.style.left).toBe("");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => {}", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({ top: "1px", left: "1px" }));
          const b = r(h.div().s({})) as HTMLElement;
          expect(b.style.top).toBe("");
          expect(b.style.left).toBe("");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("{top: 1px, left: 1px} => null", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().s({ top: "1px", left: "1px" }));
          const b = r(h.div()) as HTMLElement;
          expect(b.style.top).toBe("");
          expect(b.style.left).toBe("");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
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
      [[0, 2], [2, 1], [0, 0, 1, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2], [3, 4, 5], [0, 0, 3, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2], [2, 4, 5], [0, 0, 2, 0, 2, 0, 2], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [0, 0, 6, 0, 6, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 4, 8], [0, 0, 3, 0, 3, 0, 3], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 7, 3, 8], [0, 0, 3, 0, 3, 0, 5], [0, 0, 0, 0, 0, 0, 2]],

      [[0, 1, 2], [3, 2, 1], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2], [2, 1, 3], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[1, 2, 0], [2, 1, 3], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[1, 2, 0], [3, 2, 1], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
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
      [0, 0, 1, 0, 3, 0, 1], [0, 0, 0, 0, 0, 0, 0]],

      [[{ key: 1, children: [0, 1] }, { key: 2, children: [0, 1] }, 0],
      [{ key: 2, children: [1, 0] }, { key: 1, children: [1, 0] }, 3],
      [0, 0, 1, 0, 4, 0, 1], [0, 0, 0, 0, 0, 0, 0]],

      [[{ key: 1, children: [0, 1] }, { key: 2, children: [] }, 0],
      [3, { key: 2, children: [1, 0] }, { key: 1, children: [] }],
      [0, 0, 3, 0, 4, 0, 1], [1, 0, 3, 0, 2, 2, 0]],

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
            const b = r(h.div().c("abc"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("abc");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("null => 10", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().c(10));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("10");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'abc' => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c("abc"));
            const b = r(h.div());
            expect(b.childNodes.length).toBe(0);
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("10 => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(10));
            const b = r(h.div());
            expect(b.childNodes.length).toBe(0);
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'abc' => 'abc'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c("abc"));
            const b = r(h.div().c("abc"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("abc");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("10 => 10", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(10));
            const b = r(h.div().c(10));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("10");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'abc' => 'cde'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c("abc"));
            const b = r(h.div().c("cde"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("cde");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'' => 'cde'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(""));
            const b = r(h.div().c("cde"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("cde");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("'abc' => 10", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c("abc"));
            const b = r(h.div().c(10));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("10");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("10 => 'abc'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(10));
            const b = r(h.div().c("abc"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("abc");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("null => <div>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().c(h.div())) as HTMLElement;
            expect(b.childNodes.length).toBe(1);
            expect(b.children[0].tagName.toLowerCase()).toBe("div");
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("<div> => 'cde'", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.div()));
            const b = r(h.div().c("cde"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("cde");
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("'cde' => <div>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c("cde"));
            const b = r(h.div().c(h.div())) as HTMLElement;
            expect(b.childNodes.length).toBe(1);
            expect(b.children[0].tagName.toLowerCase()).toBe("div");
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("null => [<div>]", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().c(h.div())) as HTMLElement;
            expect(b.childNodes.length).toBe(1);
            expect(b.children[0].tagName.toLowerCase()).toBe("div");
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("<div> => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.div()));
            const b = r(h.div());
            expect(b.childNodes.length).toBe(0);
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 1);
          });
        });
      });

      it("[<div>] => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c([h.div()]));
            const b = r(h.div());
            expect(b.childNodes.length).toBe(0);
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 1);
          });
        });
      });

      it("[<div>] => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.div()));
            const b = r(h.div().c(null));
            expect(b.childNodes.length).toBe(0);
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 1);
          });
        });
      });

      it("null => [<div>, <div>]", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().c(h.div(), h.div())) as HTMLElement;
            expect(b.childNodes.length).toBe(2);
            expect(b.children[0].tagName.toLowerCase()).toBe("div");
            expect(b.children[1].tagName.toLowerCase()).toBe("div");
            expect(c).toMatchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("[<div>, <div>] => null", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.div(), h.div()));
            const b = r(h.div());
            expect(b.childNodes.length).toBe(0);
            expect(c).toMatchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("null => unsafeHTML('abc')", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div());
            const b = r(h.div().unsafeHTML("abc"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("abc");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("123 => unsafeHTML('abc')", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(123));
            const b = r(h.div().unsafeHTML("abc"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("abc");
            expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
          });
        });
      });

      it("123 => [<h1><h2>]", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(123));
            const b = r(h.div().c(h.h1(), h.h2())) as HTMLElement;
            expect(b.childNodes.length).toBe(2);
            expect(b.children[0].tagName.toLowerCase()).toBe("h1");
            expect(b.children[1].tagName.toLowerCase()).toBe("h2");
            expect(c).toMatchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("[<h1><h2>] => 123", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.h1(), h.h2()));
            const b = r(h.div().c(123));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("123");
            expect(c).toMatchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("[<h1><h2>] => unsafeHTML('abc')", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.h1(), h.h2()));
            const b = r(h.div().unsafeHTML("abc"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("abc");
            expect(c).toMatchDOMOps(3, 0, 0, 0, 3, 0, 0);
          });
        });
      });

      it("[<h1><h2>] => <div>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.h1(), h.h2()));
            const b = r(h.div().c(h.div())) as HTMLElement;
            expect(b.childNodes.length).toBe(1);
            expect(b.children[0].tagName.toLowerCase()).toBe("div");
            expect(c).toMatchDOMOps(4, 0, 0, 0, 3, 1, 1);
          });
        });
      });

      it("[] => <div>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c([]));
            const b = r(h.div().c(h.div())) as HTMLElement;
            expect(b.childNodes.length).toBe(1);
            expect(b.children[0].tagName.toLowerCase()).toBe("div");
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("<div> => unsafeHTML('abc')", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.div()));
            const b = r(h.div().unsafeHTML("abc"));
            expect(b.childNodes.length).toBe(1);
            expect(b.firstChild!.nodeValue).toBe("abc");
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
          });
        });
      });

      it("<h1> => <h2>", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.h1()));
            const b = r(h.div().c(h.h2())) as HTMLElement;
            expect(b.childNodes.length).toBe(1);
            expect(b.children[0].tagName.toLowerCase()).toBe("h2");
            expect(c).toMatchDOMOps(3, 0, 0, 0, 2, 1, 0);
          });
        });
      });

      it("<div> => [<h1><h2>]", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.div()));
            const b = r(h.div().c(h.h1(), h.h2())) as HTMLElement;
            expect(b.childNodes.length).toBe(2);
            expect(b.children[0].tagName.toLowerCase()).toBe("h1");
            expect(b.children[1].tagName.toLowerCase()).toBe("h2");
            expect(c).toMatchDOMOps(4, 0, 0, 0, 3, 1, 0);
          });
        });
      });

      it("<div> => []", () => {
        startRender((r) => {
          checkDOMOps((c) => {
            r(h.div().c(h.div()));
            const b = r(h.div().c([]));
            expect(b.childNodes.length).toBe(0);
            expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 1);
          });
        });
      });
    });

    describe("with keys", () => {
      TESTS.forEach((t) => {
        const name = JSON.stringify(t[0]) + " => " + JSON.stringify(t[1]);
        const testFn = () => {
          checkDOMOps((c) => {
            checkInnerHtmlEquals(genVNodes(t[0], true) as VNode[],
              genVNodes(t[1], true) as VNode[],
              genVNodes(t[1], true) as VNode[],
              true,
              c);
            const e = expect(c);
            e.toMatchDOMOps.apply(e, t[2]);
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
            checkInnerHtmlEquals(genVNodes(t[0], false) as VNode[],
              genVNodes(t[1], false) as VNode[],
              genVNodes(t[1], false) as VNode[],
              false,
              c);
            const e = expect(c);
            e.toMatchDOMOps.apply(e, t[3]);
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
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><div></C> => <div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r(h.div()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).notToBe(b);
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<div> => <C><div></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r(h.div());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).notToBe(b);
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><div></C> => <span>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc());
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><div></C> => <C><div></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<C><div></C> => <C>''</C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc());
          const b = r($tc(""));
          expect(b.nodeType).toBe(Node.TEXT_NODE);
          expect(b.nodeValue).toBe("");
          expect(c).toMatchDOMOps(1, 0, 1, 0, 1, 1, 0);
        });
      });
    });

    it("<C>''</C> => <C><div></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc(""));
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toMatchDOMOps(1, 0, 1, 0, 1, 1, 0);
        });
      });
    });

    it("<C><C><C><div></C></C></C> => <span>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc(h.div(), 3));
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<span> => <C><C><C><div></C></C></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><C><C><div></C></C></C> => <C><C><C><div></C></C></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc(h.div(), 3));
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<span> => <F><div></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><div></F> => <div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r(h.div()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).notToBe(b);
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<div> => <F><div></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r(h.div());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).notToBe(b);
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><div></F> => <span>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf());
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><div></F> => <F><div></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<F><div></F> => <F>''</F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf());
          const b = r($tcf("")) as HTMLElement;
          expect(b.nodeType).toBe(Node.TEXT_NODE);
          expect(b.nodeValue).toBe("");
          expect(c).toMatchDOMOps(1, 0, 1, 0, 1, 1, 0);
        });
      });
    });

    it("<F>''</F> => <F><div></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf(""));
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toMatchDOMOps(1, 0, 1, 0, 1, 1, 0);
        });
      });
    });

    it("<F><F><F><div></F></F></F> => <span>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf(h.div(), 3));
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<span> => <F><F><F><div></F></F></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><F><F><div></F></F></F> => <F><F><F><div></F></F></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf(h.div(), 3));
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<C><div></C> => <F><div></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).notToBe(b);
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><div></F> => <C><div></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).notToBe(b);
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<C><C><C><div></C></C></C> => <F><F><F><div></F></F></F>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc(h.div(), 3));
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).notToBe(b);
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<F><F><F><div></F></F></F> => <C><C><C><div></C></C></C>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf(h.div(), 3));
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).notToBe(b);
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
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
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("checkbox");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<input type='text'> => <input type='text' value='cde'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText());
          const b = r(h.inputText().value("cde")) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("text");
          expect(b.value).toBe("cde");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='text' value='abc'> => <input type='text' value='cde'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText().value("abc"));
          const b = r(h.inputText().value("cde")) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("text");
          expect(b.value).toBe("cde");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='text' value='abc'> => <input type='text'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText().value("abc"));
          const b = r(h.inputText()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("text");
          expect(b.value).toBe("abc");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='checkbox'> => <input type='checkbox checked=true'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox());
          const b = r(h.inputCheckbox().checked(true)) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("checkbox");
          expect(b.checked).toBe(true);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='checkbox' checked=true> => <input type='checkbox checked=false'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox().checked(true));
          const b = r(h.inputCheckbox().checked(false)) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("checkbox");
          expect(b.checked).toBe(false);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='checkbox' checked=true> => <input type='checkbox'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox().checked(true));
          const b = r(h.inputCheckbox()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("checkbox");
          expect(b.checked).toBe(true);
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<input type='text'> => <textarea>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputText());
          const b = r(h.textarea()) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<textarea> => <input type='text'>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea());
          const b = r(h.inputText()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("text");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
        });
      });
    });

    it("<textarea></textarea> => <textarea>cde</textarea>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea());
          const b = r(h.textarea().value("cde")) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("cde");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<textarea>abc</textarea> => <textarea>cde</textarea>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea().value("abc"));
          const b = r(h.textarea().value("cde")) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("cde");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<textarea>abc</textarea> => <textarea></textarea>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea().value("abc"));
          const b = r(h.textarea()) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("abc");
          expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
        });
      });
    });

    it("<audio> => <video>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.audio());
          const b = r(h.video()) as HTMLMediaElement;
          expect(b.tagName.toLowerCase()).toBe("video");
          expect(c).toMatchDOMOps(2, 0, 0, 0, 1, 1, 0);
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
          return h.span().c(1);
        }
        return h.div().c(0);
      }

      updateState(state: number) {
        this.state = state;
        this.flags |= ComponentFlags.DirtyState;
      }
    }

    class B extends Component<VNode> {
      render() {
        return this.props;
      }
    }

    const ca = componentFactory(A);
    const cb = componentFactory(B);

    it("<h1><A.0> => <h1><A.1> => <A.1><h1>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0).k(1);
          r(h.div().c(
            h.h1().k(0),
            a,
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().c(
            ca(1).k(1),
            h.h1().k(0),
          )) as HTMLDivElement;
          expect(n.children[0].tagName.toLowerCase()).toBe("span");
          expect(n.children[0].firstChild!.nodeValue).toBe("1");
          expect(c).toMatchDOMOps(4, 0, 0, 0, 4, 1, 0);
        });
      });
    });

    it("<h1><B><A.0></B> => <h1><B><A.1></B> => <B><A.1></B><h1>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0);
          r(h.div().c(
            h.h1().k(0),
            cb(a).k(1),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().c(
            cb(ca(1)).k(1),
            h.h1().k(0),
          )) as HTMLDivElement;
          expect(n.children[0].tagName.toLowerCase()).toBe("span");
          expect(n.children[0].firstChild!.nodeValue).toBe("1");
          expect(c).toMatchDOMOps(4, 0, 0, 0, 4, 1, 0);
        });
      });
    });

    // same tests in the opposite direction
    it("<A.0><h1> => <A.1><h1> => <h1><A.1>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0).k(1);
          r(h.div().c(
            a,
            h.h1().k(0),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().c(
            h.h1().k(0),
            ca(1).k(1),
          )) as HTMLDivElement;
          expect(n.children[1].tagName.toLowerCase()).toBe("span");
          expect(n.children[1].firstChild!.nodeValue).toBe("1");
          expect(c).toMatchDOMOps(4, 0, 0, 0, 4, 1, 0);
        });
      });
    });

    it("<B><A.0></B><h1> => <B><A.1></B><h1> => <h1><B><A.1></B>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0);
          r(h.div().c(
            cb(a).k(1),
            h.h1().k(0),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().c(
            h.h1().k(0),
            cb(ca(1)).k(1),
          )) as HTMLDivElement;
          expect(n.children[1].tagName.toLowerCase()).toBe("span");
          expect(n.children[1].firstChild!.nodeValue).toBe("1");
          expect(c).toMatchDOMOps(4, 0, 0, 0, 4, 1, 0);
        });
      });
    });
  });

  describe("keyed+non-keyed", () => {
    it("<div>.0#0#1.1</div> => <div>.0#0#1#2.1</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().c(
            h.t("a"), h.t("b").k(0), h.t("c").k(1), h.t("d"),
          ));
          const b = r(h.div().c(
            h.t("a"), h.t("b").k(0), h.t("c").k(1), h.t("e").k(2), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).toBe("a");
          expect(b.childNodes[1].nodeValue).toBe("b");
          expect(b.childNodes[2].nodeValue).toBe("c");
          expect(b.childNodes[3].nodeValue).toBe("e");
          expect(b.childNodes[4].nodeValue).toBe("d");
          expect(c).toMatchDOMOps(1, 0, 6, 0, 7, 0, 1);
        });
      });
    });

    it("<div>.0#0#1.1</div> => <div>.0#0.1</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().c(
            h.t("a"), h.t("b").k(0), h.t("c").k(1), h.t("d"),
          ));
          const b = r(h.div().c(
            h.t("a"), h.t("b").k(0), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).toBe("a");
          expect(b.childNodes[1].nodeValue).toBe("b");
          expect(b.childNodes[2].nodeValue).toBe("d");
          expect(c).toMatchDOMOps(1, 0, 5, 0, 6, 0, 2);
        });
      });
    });

    it("<div>.0#0#1.1</div> => <div>.0#1#0.1</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().c(
            h.t("a"), h.t("b").k(0), h.t("c").k(1), h.t("d"),
          ));
          const b = r(h.div().c(
            h.t("a"), h.t("c").k(1), h.t("b").k(0), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).toBe("a");
          expect(b.childNodes[1].nodeValue).toBe("c");
          expect(b.childNodes[2].nodeValue).toBe("b");
          expect(b.childNodes[3].nodeValue).toBe("d");
          expect(c).toMatchDOMOps(1, 0, 4, 0, 6, 0, 0);
        });
      });
    });

    it("<div>.0#0.1#1.2</div> => <div>.0#1.1#0.2</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().c(
            h.t("a"), h.t("b").k(0), h.t("e"), h.t("c").k(1), h.t("d"),
          ));
          const b = r(h.div().c(
            h.t("a"), h.t("c").k(1), h.t("e"), h.t("b").k(0), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).toBe("a");
          expect(b.childNodes[1].nodeValue).toBe("c");
          expect(b.childNodes[2].nodeValue).toBe("e");
          expect(b.childNodes[3].nodeValue).toBe("b");
          expect(b.childNodes[4].nodeValue).toBe("d");
          expect(c).toMatchDOMOps(1, 0, 5, 0, 8, 0, 0);
        });
      });
    });

    it("<div>#0.1.2#1</div> => <div>.1.2</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().c(
            h.t("a").k(0), h.t("b"), h.t("c"), h.t("d").k(1),
          ));
          const b = r(h.div().c(
            null, h.t("b"), h.t("c"), null,
          ));
          expect(b.childNodes[0].nodeValue).toBe("b");
          expect(b.childNodes[1].nodeValue).toBe("c");
          expect(c).toMatchDOMOps(1, 0, 4, 0, 5, 0, 2);
        });
      });
    });

    it("<div>.1.2</div> => <div>#0.1.2#1</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().c(
            null, h.t("b"), h.t("c"), null,
          ));
          const b = r(h.div().c(
            h.t("a").k(0), h.t("b"), h.t("c"), h.t("d").k(1),
          ));
          expect(b.childNodes[0].nodeValue).toBe("a");
          expect(b.childNodes[1].nodeValue).toBe("b");
          expect(b.childNodes[2].nodeValue).toBe("c");
          expect(b.childNodes[3].nodeValue).toBe("d");
          expect(c).toMatchDOMOps(1, 0, 4, 0, 5, 0, 0);
        });
      });
    });

    it("<div>.1.2</div> => <div>#0.1.2#1#2#3#4#5#6#7#8#9</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().c(
            null, h.t("b"), h.t("c"), null,
          ));
          const b = r(h.div().c(
            h.t("a").k(0), h.t("b"), h.t("c"),
            h.t("d").k(1), h.t("e").k(2), h.t("f").k(3), h.t("g").k(4), h.t("h").k(5),
            h.t("i").k(6),
            h.t("j").k(7), h.t("k").k(8), h.t("l").k(9),
          ));
          expect(b.childNodes[0].nodeValue).toBe("a");
          expect(b.childNodes[1].nodeValue).toBe("b");
          expect(b.childNodes[2].nodeValue).toBe("c");
          expect(b.childNodes[3].nodeValue).toBe("d");
          expect(b.childNodes[4].nodeValue).toBe("e");
          expect(b.childNodes[5].nodeValue).toBe("f");
          expect(b.childNodes[6].nodeValue).toBe("g");
          expect(b.childNodes[7].nodeValue).toBe("h");
          expect(b.childNodes[8].nodeValue).toBe("i");
          expect(b.childNodes[9].nodeValue).toBe("j");
          expect(b.childNodes[10].nodeValue).toBe("k");
          expect(b.childNodes[11].nodeValue).toBe("l");
          expect(c).toMatchDOMOps(1, 0, 12, 0, 13, 0, 0);
        });
      });
    });

    it("<div><div />.0#0.1#1.2<div /></div> => <div>.0#1.1#0.2</div>", () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.div().c(
            h.div(), h.t("a"), h.t("b").k(0), h.t("e"), h.t("c").k(1), h.t("d"), h.div(),
          ));
          const b = r(h.div().c(
            h.t("a"), h.t("c").k(1), h.t("e"), h.t("b").k(0), h.t("d"),
          ));
          expect(b.childNodes[0].nodeValue).toBe("a");
          expect(b.childNodes[1].nodeValue).toBe("c");
          expect(b.childNodes[2].nodeValue).toBe("e");
          expect(b.childNodes[3].nodeValue).toBe("b");
          expect(b.childNodes[4].nodeValue).toBe("d");
          expect(c).toMatchDOMOps(3, 0, 8, 0, 11, 1, 4);
        });
      });
    });
  });
});

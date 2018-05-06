import { ComponentFlags } from "../src/vdom/flags";
import { VNode, getComponentInstanceFromVNode } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { component } from "../src/vdom/vnode_factories";
import { startRender, $tc, $tcf, checkDOMOps, domOps } from "./utils";
import * as h from "./utils/html";

describe("sync", () => {
  describe("components", () => {
    test(`<span> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><div></C> => <div>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r(h.div()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<div> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r(h.div());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><div></C> => <span>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc());
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><div></C> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<C><div></C> => <C>''</C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc());
          const b = r($tc(""));
          expect(b.nodeType).toBe(Node.TEXT_NODE);
          expect(b.nodeValue).toBe("");
          expect(c).toEqual(domOps(1, 0, 1, 0, 1, 1, 0));
        });
      });
    });

    test(`<C>''</C> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc(""));
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(1, 0, 1, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><C><C><div></C></C></C> => <span>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc(h.div(), 3));
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<span> => <C><C><C><div></C></C></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><C><C><div></C></C></C> => <C><C><C><div></C></C></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc(h.div(), 3));
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<span> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><div></F> => <div>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r(h.div()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<div> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r(h.div());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><div></F> => <span>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf());
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><div></F> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<F><div></F> => <F>''</F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf());
          const b = r($tcf("")) as HTMLElement;
          expect(b.nodeType).toBe(Node.TEXT_NODE);
          expect(b.nodeValue).toBe("");
          expect(c).toEqual(domOps(1, 0, 1, 0, 1, 1, 0));
        });
      });
    });

    test(`<F>''</F> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf(""));
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(1, 0, 1, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><F><F><div></F></F></F> => <span>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf(h.div(), 3));
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<span> => <F><F><F><div></F></F></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><F><F><div></F></F></F> => <F><F><F><div></F></F></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf(h.div(), 3));
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<C><div></C> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><div></F> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><C><C><div></C></C></C> => <F><F><F><div></F></F></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc(h.div(), 3));
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><F><F><div></F></F></F> => <C><C><C><div></C></C></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf(h.div(), 3));
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });
  });

  describe("special elements", () => {
    test(`<textarea></textarea> => <textarea>cde</textarea>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea());
          const b = r(h.textarea().value("cde")) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("cde");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<textarea>abc</textarea> => <textarea>cde</textarea>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea().value("abc"));
          const b = r(h.textarea().value("cde")) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("cde");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<textarea>abc</textarea> => <textarea></textarea>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea().value("abc"));
          const b = r(h.textarea()) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("abc");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<audio> => <video>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.audio());
          const b = r(h.video()) as HTMLMediaElement;
          expect(b.tagName.toLowerCase()).toBe("video");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
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

    const ca = component(A);
    const cb = component(B);

    test(`<h1><A.0> => <h1><A.1> => <A.1><h1>`, () => {
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
          expect(c).toEqual(domOps(4, 0, 2, 0, 6, 1, 0));
        });
      });
    });

    test(`<h1><B><A.0></B> => <h1><B><A.1></B> => <B><A.1></B><h1>`, () => {
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
          expect(c).toEqual(domOps(4, 0, 2, 0, 6, 1, 0));
        });
      });
    });

    // same tests in the opposite direction
    test(`<A.0><h1> => <A.1><h1> => <h1><A.1>`, () => {
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
          expect(c).toEqual(domOps(4, 0, 2, 0, 6, 1, 0));
        });
      });
    });

    test(`<B><A.0></B><h1> => <B><A.1></B><h1> => <h1><B><A.1></B>`, () => {
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
          expect(c).toEqual(domOps(4, 0, 2, 0, 6, 1, 0));
        });
      });
    });
  });
});

import { Component, VNode, statefulComponent, getComponentInstanceFromVNode } from "ivi";
import { startRender, checkDOMOps, domOps } from "./utils";
import * as h from "ivi-html";

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
    this.invalidate();
  }
}

class B extends Component<VNode> {
  render() {
    return this.props;
  }
}

const ca = statefulComponent(A);
const cb = statefulComponent(B);

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

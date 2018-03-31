import { BlueprintNode, createBlueprint } from "../src/blueprint";
import { VNodeFlags } from "../src/vnode";
import { context } from "../src/vnode_factories";
import { ComponentClass, StatelessComponent } from "../src/component";
import * as h from "./utils/html";
import * as c from "./utils/components";
import { expect } from "iko";

class BlueprintObserver {
  node: BlueprintNode;
  parent: BlueprintNode | undefined;
  childrenIndex: number;

  constructor(node: BlueprintNode, parent?: BlueprintNode, childrenIndex = -1) {
    this.node = node;
    this.parent = parent;
    this.childrenIndex = childrenIndex;
  }

  firstChild() {
    if (this.node.children !== null) {
      if (Array.isArray(this.node.children)) {
        return new BlueprintObserver(this.node.children[0], this.node, 0);
      } else if (typeof this.node.children !== "string") {
        return new BlueprintObserver(this.node.children as BlueprintNode, this.node);
      }
    }

    throw Error("Blueprint doesn't have any children.");
  }

  nextSibling() {
    if (this.childrenIndex > -1) {
      const nextIndex = this.childrenIndex + 1;
      return new BlueprintObserver(
        (this.parent!.children as BlueprintNode[])[nextIndex],
        this.parent,
        nextIndex,
      );
    }

    throw new Error("Blueprint node doesn't have next sibling.");
  }

  expectNoDeepConnect() {
    expect((this.node.flags & VNodeFlags.DeepConnect) !== 0).toBeFalsy();
    return this;
  }

  expectDeepConnect() {
    expect((this.node.flags & VNodeFlags.DeepConnect) !== 0).toBeTruthy();
    return this;
  }

  expectNoChildren() {
    expect(this.node.children).toBeNull();
    return this;
  }

  expectChildren(children: BlueprintNode[] | BlueprintNode | string | number | boolean | null) {
    expect(this.node.children).toBe(children);
    return this;
  }

  expectString(s: string) {
    expect(this.node.string).toBe(s);
    return this;
  }

  expectText(content: string) {
    expect((this.node.flags & VNodeFlags.Text) !== 0).toBeTruthy();
    expect(this.node.vnode._children).toBe(content);
    return this;
  }

  expectElement(tag: string) {
    expect((this.node.flags & VNodeFlags.Element) !== 0).toBeTruthy();
    expect((this.node.vnode._tag as string).slice(1)).toBe(tag);
    return this;
  }

  expectComponent(cls: ComponentClass<any>) {
    expect((this.node.flags & VNodeFlags.ComponentClass) !== 0).toBeTruthy();
    expect(this.node.vnode._tag).toBe(cls);
    return this;
  }

  expectStatelessComponent(fn: StatelessComponent<any>) {
    expect((this.node.flags & VNodeFlags.ComponentFunction) !== 0).toBeTruthy();
    expect(this.node.vnode._tag).toBe(fn);
    return this;
  }

  expectConnect() {
    expect((this.node.flags & VNodeFlags.Connect) !== 0).toBeTruthy();
    return this;
  }

  expectUpdateContext() {
    expect((this.node.flags & VNodeFlags.UpdateContext) !== 0).toBeTruthy();
    return this;
  }
}

function observeBlueprint(node: BlueprintNode) {
  return new BlueprintObserver(node);
}

function _createBlueprintIndex(index: Set<BlueprintNode>, node: BlueprintNode) {
  index.add(node);
  if (node.children !== null) {
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        _createBlueprintIndex(index, child);
      }
    } else if (typeof node.children !== "string") {
      _createBlueprintIndex(index, node.children as BlueprintNode);
    }
  }
}

function createBlueprintIndex(node: BlueprintNode) {
  const index = new Set<BlueprintNode>();
  _createBlueprintIndex(index, node);
  return index;
}

describe("blueprint", () => {
  describe("create", () => {
    it(`abc`, () => {
      observeBlueprint(createBlueprint(h.t("abc")))
        .expectText("abc")
        .expectString(`abc`);
    });

    it(`<div>`, () => {
      observeBlueprint(createBlueprint(h.div()))
        .expectElement("div")
        .expectString(`<div>`);
    });

    it(`<div class="abc">`, () => {
      observeBlueprint(createBlueprint(h.div("abc")))
        .expectElement("div")
        .expectString(`<div class="abc">`);
    });

    it(`<div id="123">`, () => {
      observeBlueprint(createBlueprint(h.div().a({
        id: "123",
      })))
        .expectElement("div")
        .expectString(`<div id="123">`);
    });

    it(`<div id="123" title="qwe">`, () => {
      observeBlueprint(createBlueprint(h.div().a({
        id: "123",
        title: "qwe",
      })))
        .expectElement("div")
        .expectString(`<div id="123" title="qwe">`);
    });

    it(`<div class="abc" id="123">`, () => {
      observeBlueprint(createBlueprint(h.div("abc").a({
        id: "123",
      })))
        .expectElement("div")
        .expectString(`<div class="abc" id="123">`);
    });

    it(`<div style="color:green">`, () => {
      observeBlueprint(createBlueprint(h.div().s({
        color: "green",
      })))
        .expectElement("div")
        .expectString(`<div style="color:green">`);
    });

    it(`<div style="color:green;font-size:1">`, () => {
      observeBlueprint(createBlueprint(h.div().s({
        color: "green",
        "font-size": 1,
      })))
        .expectElement("div")
        .expectString(`<div style="color:green;font-size:1">`);
    });

    it(`<div class="abc" style="color:green">`, () => {
      observeBlueprint(createBlueprint(h.div("abc").s({
        color: "green",
      })))
        .expectElement("div")
        .expectString(`<div class="abc" style="color:green">`);
    });

    it(`<div id="123" style="color:green">`, () => {
      observeBlueprint(createBlueprint(h.div().a({
        id: "123",
      }).s({
        color: "green",
      })))
        .expectElement("div")
        .expectString(`<div id="123" style="color:green">`);
    });

    it(`<div class="abc" id="123" style="color:green">`, () => {
      observeBlueprint(createBlueprint(h.div("abc").a({
        id: "123",
      }).s({
        color: "green",
      })))
        .expectElement("div")
        .expectString(`<div class="abc" id="123" style="color:green">`);
    });

    it(`<C><div><C>`, () => {
      observeBlueprint(createBlueprint(c.rc(h.div())))
        .expectComponent(c.RenderChild)
        .expectString(`<div></div>`);
    });

    it(`<C><C><div></C><C>`, () => {
      const a = observeBlueprint(createBlueprint(c.rc(c.rc(h.div()))))
        .expectComponent(c.RenderChild)
        .expectString(`<div></div>`);

      a.firstChild()
        .expectString(`<div></div>`);
    });

    it(`<C><div><C><span></C></div><C>`, () => {
      const a = observeBlueprint(createBlueprint(c.rc(h.div().c(c.rc(h.span())))))
        .expectComponent(c.RenderChild)
        .expectString(`<div><span></span></div>`);

      a.firstChild()
        .firstChild()
        .expectString(`<span></span>`);
    });

    it(`<SC><div><SC>`, () => {
      observeBlueprint(createBlueprint(c.src(h.div())))
        .expectStatelessComponent(c.StatelessRenderChild)
        .expectString(`<div></div>`);
    });

    it(`<SC><SC><div></SC><SC>`, () => {
      const a = observeBlueprint(createBlueprint(c.src(c.src(h.div()))))
        .expectStatelessComponent(c.StatelessRenderChild)
        .expectString(`<div></div>`);

      a.firstChild()
        .expectString(`<div></div>`);
    });

    it(`<SC><div><SC><span></SC></div><SC>`, () => {
      const a = observeBlueprint(createBlueprint(c.src(h.div().c(c.src(h.span())))))
        .expectStatelessComponent(c.StatelessRenderChild)
        .expectString(`<div><span></span></div>`);

      a.firstChild()
        .firstChild()
        .expectString(`<span></span>`);
    });

    it(`<ctx><div></ctx>`, () => {
      observeBlueprint(createBlueprint(context({}, h.div())))
        .firstChild()
        .expectString(`<div>`);
    });

    it(`<span><cc></span>`, () => {
      const ctx = { child: h.strong() };
      const a = observeBlueprint(createBlueprint(h.div().c(
        context(ctx, h.span().c(c.cc())),
      )))
        .expectString(`<div>`);

      a
        .firstChild() // context
        .firstChild() // span
        .expectString(`<span>`)
        .firstChild() // connect
        .firstChild() // strong
        .expectString(`<strong>`);
    });

    it(`<span><ccp></span>`, () => {
      const a = observeBlueprint(createBlueprint(h.div().c(
        h.span().c(c.ccp(h.strong())),
      )))
        .expectString(`<div>`);

      a
        .firstChild() // span
        .expectString(`<span>`)
        .firstChild() // connect
        .firstChild() // strong
        .expectString(`<strong>`);
    });

    it(`unsafeHTML shouldn't be escaped`, () => {
      observeBlueprint(createBlueprint(h.div().unsafeHTML("<&")))
        .expectChildren("<&");
    });
  });

  describe("reuse nodes", () => {
    describe("basics", () => {
      it(`identical`, () => {
        const n = h.div();
        const a = createBlueprint(n);
        const b = createBlueprint(n, undefined, a);
        expect(a).toBe(b);
        observeBlueprint(b)
          .expectNoDeepConnect();
      });

      it(`div`, () => {
        const a = createBlueprint(h.div());
        const b = createBlueprint(h.div(), undefined, a);
        observeBlueprint(b)
          .expectNoDeepConnect();
        expect(a).toBe(b);
      });

      it(`div with same class`, () => {
        const a = createBlueprint(h.div("abc"));
        const b = createBlueprint(h.div("abc"), undefined, a);
        expect(a).toBe(b);
      });

      it(`div with diff class`, () => {
        const a = createBlueprint(h.div("abc"));
        const b = createBlueprint(h.div("def"), undefined, a);
        expect(a).notToBe(b);
      });

      it(`div with same props`, () => {
        const a = createBlueprint(h.div().a({ a: "123" }));
        const b = createBlueprint(h.div().a({ a: "123" }), undefined, a);
        expect(a).toBe(b);
      });

      it(`div with diff props`, () => {
        const a = createBlueprint(h.div().a({ a: "123" }));
        const b = createBlueprint(h.div().a({ a: "456" }), undefined, a);
        expect(a).notToBe(b);
      });

      it(`div with same style`, () => {
        const a = createBlueprint(h.div().s({ color: "green" }));
        const b = createBlueprint(h.div().s({ color: "green" }), undefined, a);
        expect(a).toBe(b);
      });

      it(`div with diff style`, () => {
        const a = createBlueprint(h.div().s({ color: "green" }));
        const b = createBlueprint(h.div().s({ color: "red" }), undefined, a);
        expect(a).notToBe(b);
      });

      it(`div with same class/props diff style`, () => {
        const a = createBlueprint(h.div("abc").a({ a: "123" }).s({ color: "green" }));
        const b = createBlueprint(h.div("abc").a({ a: "123" }).s({ color: "red" }), undefined, a);
        expect(a).notToBe(b);
      });

      it(`div with same class/style diff props`, () => {
        const a = createBlueprint(h.div("abc").a({ a: "123" }).s({ color: "green" }));
        const b = createBlueprint(h.div("abc").a({ a: "456" }).s({ color: "green" }), undefined, a);
        expect(a).notToBe(b);
      });

      it(`div with same props/style diff class`, () => {
        const a = createBlueprint(h.div("abc").a({ a: "123" }).s({ color: "green" }));
        const b = createBlueprint(h.div("def").a({ a: "123" }).s({ color: "green" }), undefined, a);
        expect(a).notToBe(b);
      });

      it(`same children`, () => {
        const a = createBlueprint(h.div().c(h.span()));
        const b = createBlueprint(h.div().c(h.span()), undefined, a);
        expect(a).toBe(b);
        observeBlueprint(b)
          .expectNoDeepConnect();
      });

      it(`same multiple children`, () => {
        const a = createBlueprint(h.div().c(h.span(), h.div(), h.span()));
        const b = createBlueprint(h.div().c(h.span(), h.div(), h.span()), undefined, a);
        expect(a).toBe(b);
        observeBlueprint(b)
          .expectNoDeepConnect();
      });

      it(`diff children`, () => {
        const a = createBlueprint(h.div().c(h.span()));
        const b = createBlueprint(h.div().c(h.div()), undefined, a);
        expect(a).notToBe(b);
        observeBlueprint(b)
          .expectNoDeepConnect();
      });

      it(`diff multiple children`, () => {
        const a = createBlueprint(h.div().c(h.span(), h.div(), h.span()));
        const b = createBlueprint(h.div().c(h.span(), h.span(), h.span()), undefined, a);
        expect(a).notToBe(b);
        observeBlueprint(b)
          .expectNoDeepConnect();
      });
    });

    describe("deep reuse", () => {
      it(`1`, () => {
        const a = createBlueprint(h.div().c(h.span(), h.div(), h.span()));
        const b = createBlueprint(h.div().c(h.span(), h.span(), h.span()), undefined, a);
        const index = createBlueprintIndex(a);
        const o = observeBlueprint(b);
        const c1 = o.firstChild();
        const c2 = c1.nextSibling();
        const c3 = c2.nextSibling();

        expect(index.has(c1.node)).toBeTruthy();
        expect(index.has(c2.node)).toBeFalsy();
        expect(index.has(c3.node)).toBeTruthy();
      });

      it(`children keys`, () => {
        const a = createBlueprint(h.div().c(h.span().k("a"), h.div().k("b"), h.span().k("c")));
        const b = createBlueprint(
          h.div().c(h.span().k("c"), h.span().k("a"), h.div().k("b")),
          undefined,
          a,
        );
        const index = createBlueprintIndex(a);
        const o = observeBlueprint(b);
        const c1 = o.firstChild();
        const c2 = c1.nextSibling();
        const c3 = c2.nextSibling();

        expect(index.has(c1.node)).toBeTruthy();
        expect(index.has(c2.node)).toBeTruthy();
        expect(index.has(c3.node)).toBeTruthy();
      });
    });
  });

  describe("deep connect", () => {
    it(`abc`, () => {
      observeBlueprint(createBlueprint(h.t("abc")))
        .expectNoDeepConnect();
    });

    it(`<div>`, () => {
      observeBlueprint(createBlueprint(h.div()))
        .expectNoDeepConnect();
    });

    it(`<C><div></C>`, () => {
      observeBlueprint(createBlueprint(c.rc(h.div())))
        .expectNoDeepConnect();
    });

    it(`<SC><div></SC>`, () => {
      observeBlueprint(createBlueprint(c.src(h.div())))
        .expectNoDeepConnect();
    });

    it(`<ctx><div></ctx>`, () => {
      const a = observeBlueprint(createBlueprint(context({}, h.div())))
        .expectNoDeepConnect();

      a.firstChild()
        .expectNoDeepConnect();
    });

    it(`<div><cc></div>`, () => {
      const ctx = { child: h.div() };
      const a = observeBlueprint(createBlueprint(h.div().c(
        context(ctx, h.div().c(c.cc())),
      )))
        .expectDeepConnect();

      a
        .firstChild() // context
        .expectDeepConnect()
        .firstChild() // div
        .expectDeepConnect()
        .firstChild() // connect
        .expectDeepConnect()
        .firstChild() // div
        .expectNoDeepConnect();
    });

    it(`<div><div></div><cc></div>`, () => {
      const ctx = { child: h.div() };
      observeBlueprint(createBlueprint(h.div().c(
        context(ctx, h.div().c(h.div(), c.cc())),
      )))
        .expectDeepConnect();
    });
  });
});

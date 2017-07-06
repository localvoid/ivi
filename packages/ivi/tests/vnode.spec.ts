import { EventHandler } from "ivi-events";
import { VNode, ElementProps } from "../src/vdom/vnode";
import { VNodeFlags } from "../src/vdom/flags";
import { statelessComponent, text, html, input, media } from "./utils";
import { expect } from "chai";

function EmptyComponent(): VNode<any> {
  return text("");
}

describe("VNode", () => {
  describe("$t", () => {
    it("init", () => {
      const t = text("abc");
      expect(t._flags & VNodeFlags.Text).to.be.equal(VNodeFlags.Text);
      expect(t._children).to.be.equal("abc");
    });

    it("key", () => {
      const t = text("abc").key("k");
      expect(t._flags & VNodeFlags.Key).to.be.equal(VNodeFlags.Key);
      expect(t._key).to.be.equal("k");
    });

    it("className", () => {
      expect(() => text("abc").className("cls")).to.throw(Error);
    });

    it("style", () => {
      expect(() => text("abc").style({})).to.throw(Error);
    });

    it("events", () => {
      expect(() => text("abc").events([])).to.throw(Error);
    });

    it("children", () => {
      expect(() => text("abc").children("123")).to.throw(Error);
    });

    it("unsafeHTML", () => {
      expect(() => text("abc").unsafeHTML("123")).to.throw(Error);
    });

    it("value", () => {
      expect(() => text("abc").value("123")).to.throw(Error);
    });

    it("checked", () => {
      expect(() => text("abc").checked(true)).to.throw(Error);
    });

    it("mergeStyle", () => {
      expect(() => text("abc").mergeStyle({})).to.throw(Error);
    });

    it("autofocus", () => {
      expect(() => text("abc").autofocus(true)).to.throw(Error);
    });
  });

  describe("$h", () => {
    it("init", () => {
      const e = html("div");
      expect(e._flags & VNodeFlags.Element).to.be.equal(VNodeFlags.Element);
      expect(e._tag).to.be.equal("div");
    });

    it("init className", () => {
      const e = html("div", "cls");
      expect(e._flags & VNodeFlags.Element).to.be.equal(VNodeFlags.Element);
      expect(e._tag).to.be.equal("div");
      expect(e._className).to.be.equal("cls");
    });

    it("key", () => {
      const e = html("div").key("k");
      expect(e._key).to.be.equal("k");
    });

    it("className", () => {
      const e = html("div").className("cls");
      expect(e._className).to.be.equal("cls");
    });

    it("override className", () => {
      const e = html("div", "a").className("cls");
      expect(e._className).to.be.equal("cls");
    });

    it("style", () => {
      const s = { top: "10px" };
      const e = html("div").style(s);
      expect((e._props as ElementProps<any>).style).to.be.equal(s);
    });

    it("events", () => {
      const s = [] as EventHandler[];
      const e = html("div").events(s);
      expect((e._props as ElementProps<any>).events).to.be.equal(s);
    });

    it("props", () => {
      const s = {};
      const e = html("div").props(s);
      expect((e._props as ElementProps<any>).attrs).to.be.equal(s);
    });

    it("children", () => {
      const e = html("div").children("abc");
      expect(e._children).to.be.equal("abc");
    });

    it("children override", () => {
      const e = html("div").children("abc");
      expect(() => e.children("123")).to.throw(Error);
      expect(() => e.unsafeHTML("123")).to.throw(Error);
    });

    it("children: duplicate keys", () => {
      expect(() => html("div").children(text("").key("a"), text("").key("a"))).to.throw(Error);
    });

    it("unsafeHTML", () => {
      const e = html("div").unsafeHTML("abc");
      expect(e._children).to.be.equal("abc");
    });

    it("value", () => {
      expect(() => html("div").value("123")).to.throw(Error);
    });

    it("checked", () => {
      expect(() => html("div").checked(true)).to.throw(Error);
    });

    it("mergeProps: null", () => {
      const e = html("div").props({ title: "abc" }).mergeProps(null);
      expect((e._props as ElementProps<any>).attrs!.title).to.be.equal("abc");
    });

    it("mergeProps", () => {
      const e = html("div").props({ title: "abc" }).mergeProps({ width: "100" });
      expect((e._props as ElementProps<any>).attrs!.title).to.be.equal("abc");
      expect((e._props as ElementProps<any>).attrs!.width).to.be.equal("100");
    });

    it("mergeProps override", () => {
      const e = html("div").props({ title: "abc" }).mergeProps({ title: "100" });
      expect((e._props as ElementProps<any>).attrs!.title).to.be.equal("100");
    });

    it("mergeProps: invalid objects", () => {
      expect(() => html("div").props("abc" as any).mergeProps({})).to.throw(Error);
      expect(() => html("div").props({}).mergeProps("abc" as any)).to.throw(Error);
    });

    it("mergeStyle: null", () => {
      const e = html("div").style({ top: "10px" }).mergeStyle(null);
      expect((e._props as ElementProps<any>).style!.top).to.be.equal("10px");
    });

    it("mergeStyle", () => {
      const e = html("div").style({ top: "10px" }).mergeStyle({ left: "20px" });
      expect((e._props as ElementProps<any>).style!.top).to.be.equal("10px");
      expect((e._props as ElementProps<any>).style!.left).to.be.equal("20px");
    });

    it("mergeStyle override", () => {
      const e = html("div").style({ top: "10px" }).mergeStyle({ top: "20px" });
      expect((e._props as ElementProps<any>).style!.top).to.be.equal("20px");
    });

    it("autofocus", () => {
      const e = html("div").autofocus(true);
      expect(e._flags & VNodeFlags.Autofocus).to.be.equal(VNodeFlags.Autofocus);
    });
  });

  describe("$c", () => {
    it("className", () => {
      expect(() => statelessComponent(EmptyComponent).className("cls")).to.throw(Error);
    });

    it("style", () => {
      expect(() => statelessComponent(EmptyComponent).style({})).to.throw(Error);
    });

    it("events", () => {
      expect(() => statelessComponent(EmptyComponent).events([])).to.throw(Error);
    });

    it("children", () => {
      expect(() => statelessComponent(EmptyComponent).children("123")).to.throw(Error);
    });

    it("unsafeHTML", () => {
      expect(() => statelessComponent(EmptyComponent).unsafeHTML("123")).to.throw(Error);
    });

    it("value", () => {
      expect(() => statelessComponent(EmptyComponent).value("123")).to.throw(Error);
    });

    it("checked", () => {
      expect(() => statelessComponent(EmptyComponent).checked(true)).to.throw(Error);
    });

    it("mergeStyle", () => {
      expect(() => statelessComponent(EmptyComponent).mergeStyle({})).to.throw(Error);
    });

    it("autofocus", () => {
      expect(() => statelessComponent(EmptyComponent).autofocus(true)).to.throw(Error);
    });
  });

  describe("$i", () => {
    it("children", () => {
      expect(() => input("text").children("123")).to.throw(Error);
    });

    it("unsafeHTML", () => {
      expect(() => input("text").unsafeHTML("123")).to.throw(Error);
    });

    it("textarea: children", () => {
      expect(() => input("textarea").children("123")).to.throw(Error);
    });

    it("textarea: unsafeHTML", () => {
      expect(() => input("textarea").unsafeHTML("123")).to.throw(Error);
    });

    it("value", () => {
      const e = input("text").value("abc");
      expect(e._children).to.be.equal("abc");
    });

    it("textarea: value", () => {
      const e = input("textarea").value("abc");
      expect(e._children).to.be.equal("abc");
    });

    it("checked", () => {
      expect(() => input("text").checked(true)).to.throw(Error);
    });

    it("textarea", () => {
      expect(() => input("textarea").checked(true)).to.throw(Error);
    });

    it("checkbox: checked", () => {
      const e = input("checkbox").checked(true);
      expect(e._children).to.be.equal(true);
    });
  });

  describe("$m", () => {
    it("children", () => {
      expect(() => media("audio").children("123")).to.throw(Error);
    });

    it("unsafeHTML", () => {
      expect(() => statelessComponent(EmptyComponent).unsafeHTML("123")).to.throw(Error);
    });
  });
});

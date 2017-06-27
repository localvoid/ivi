import { VNode, ElementProps } from "../src/vdom/vnode";
import { VNodeFlags } from "../src/vdom/flags";
import { $t, $h, $s, $i, $m } from "../src/vdom/vnode_dom";
import { $c } from "../src/vdom/vnode_components";
import { expect } from "chai";

function EmptyComponent(): VNode<any> {
    return $t("");
}

describe("VNode", () => {
    describe("$t", () => {
        it("init", () => {
            const t = $t("abc");
            expect(t._flags & VNodeFlags.Text).to.be.equal(VNodeFlags.Text);
            expect(t._children).to.be.equal("abc");
        });

        it("key", () => {
            const t = $t("abc").key("k");
            expect(t._flags & VNodeFlags.Key).to.be.equal(VNodeFlags.Key);
            expect(t._key).to.be.equal("k");
        });

        it("className", () => {
            expect(() => $t("abc").className("cls")).to.throw(Error);
        });

        it("style", () => {
            expect(() => $t("abc").style({})).to.throw(Error);
        });

        it("events", () => {
            expect(() => $t("abc").events([])).to.throw(Error);
        });

        it("children", () => {
            expect(() => $t("abc").children("123")).to.throw(Error);
        });

        it("unsafeHTML", () => {
            expect(() => $t("abc").unsafeHTML("123")).to.throw(Error);
        });

        it("value", () => {
            expect(() => $t("abc").value("123")).to.throw(Error);
        });

        it("checked", () => {
            expect(() => $t("abc").checked(true)).to.throw(Error);
        });

        it("mergeStyle", () => {
            expect(() => $t("abc").mergeStyle({})).to.throw(Error);
        });

        it("autofocus", () => {
            expect(() => $t("abc").autofocus(true)).to.throw(Error);
        });
    });

    describe("$h", () => {
        it("init", () => {
            const e = $h("div");
            expect(e._flags & VNodeFlags.Element).to.be.equal(VNodeFlags.Element);
            expect(e._tag).to.be.equal("div");
        });

        it("init className", () => {
            const e = $h("div", "cls");
            expect(e._flags & VNodeFlags.Element).to.be.equal(VNodeFlags.Element);
            expect(e._tag).to.be.equal("div");
            expect(e._className).to.be.equal("cls");
        });

        it("key", () => {
            const e = $h("div").key("k");
            expect(e._key).to.be.equal("k");
        });

        it("className", () => {
            const e = $h("div").className("cls");
            expect(e._className).to.be.equal("cls");
        });

        it("override className", () => {
            const e = $h("div", "a").className("cls");
            expect(e._className).to.be.equal("cls");
        });

        it("style", () => {
            const s = { top: "10px" };
            const e = $h("div").style(s);
            expect((e._props as ElementProps<any>).style).to.be.equal(s);
        });

        it("events", () => {
            const s = [];
            const e = $h("div").events(s);
            expect((e._props as ElementProps<any>).events).to.be.equal(s);
        });

        it("props", () => {
            const s = {};
            const e = $h("div").props(s);
            expect((e._props as ElementProps<any>).attrs).to.be.equal(s);
        });

        it("children", () => {
            const e = $h("div").children("abc");
            expect(e._children).to.be.equal("abc");
        });

        it("children override", () => {
            const e = $h("div").children("abc");
            expect(() => e.children("123")).to.throw(Error);
            expect(() => e.unsafeHTML("123")).to.throw(Error);
        });

        it("void elements: children", () => {
            expect(() => $h("br").children("123")).to.throw(Error);
            expect(() => $h("img").children("123")).to.throw(Error);
        });

        it("children: duplicate keys", () => {
            expect(() => $h("div").children($t("").key("a"), $t("").key("a"))).to.throw(Error);
        });

        it("unsafeHTML", () => {
            const e = $h("div").unsafeHTML("abc");
            expect(e._children).to.be.equal("abc");
        });

        it("void elements: unsafeHTML", () => {
            expect(() => $h("br").unsafeHTML("123")).to.throw(Error);
            expect(() => $h("img").unsafeHTML("123")).to.throw(Error);
        });

        it("value", () => {
            expect(() => $h("div").value("123")).to.throw(Error);
        });

        it("checked", () => {
            expect(() => $h("div").checked(true)).to.throw(Error);
        });

        it("mergeProps: null", () => {
            const e = $h("div").props({ title: "abc" }).mergeProps(null);
            expect((e._props as ElementProps<any>).attrs!.title).to.be.equal("abc");
        });

        it("mergeProps", () => {
            const e = $h("div").props({ title: "abc" }).mergeProps({ width: "100" });
            expect((e._props as ElementProps<any>).attrs!.title).to.be.equal("abc");
            expect((e._props as ElementProps<any>).attrs!.width).to.be.equal("100");
        });

        it("mergeProps override", () => {
            const e = $h("div").props({ title: "abc" }).mergeProps({ title: "100" });
            expect((e._props as ElementProps<any>).attrs!.title).to.be.equal("100");
        });

        it("mergeProps: invalid objects", () => {
            expect(() => $h("div").props("abc" as any).mergeProps({})).to.throw(Error);
            expect(() => $h("div").props({}).mergeProps("abc" as any)).to.throw(Error);
        });

        it("mergeStyle: null", () => {
            const e = $h("div").style({ top: "10px" }).mergeStyle(null);
            expect((e._props as ElementProps<any>).style!.top).to.be.equal("10px");
        });

        it("mergeStyle", () => {
            const e = $h("div").style({ top: "10px" }).mergeStyle({ left: "20px" });
            expect((e._props as ElementProps<any>).style!.top).to.be.equal("10px");
            expect((e._props as ElementProps<any>).style!.left).to.be.equal("20px");
        });

        it("mergeStyle override", () => {
            const e = $h("div").style({ top: "10px" }).mergeStyle({ top: "20px" });
            expect((e._props as ElementProps<any>).style!.top).to.be.equal("20px");
        });

        it("autofocus", () => {
            const e = $h("div").autofocus(true);
            expect(e._flags & VNodeFlags.Autofocus).to.be.equal(VNodeFlags.Autofocus);
        });
    });

    describe("$c", () => {
        it("className", () => {
            expect(() => $c(EmptyComponent).className("cls")).to.throw(Error);
        });

        it("style", () => {
            expect(() => $c(EmptyComponent).style({})).to.throw(Error);
        });

        it("events", () => {
            expect(() => $c(EmptyComponent).events([])).to.throw(Error);
        });

        it("children", () => {
            expect(() => $c(EmptyComponent).children("123")).to.throw(Error);
        });

        it("unsafeHTML", () => {
            expect(() => $c(EmptyComponent).unsafeHTML("123")).to.throw(Error);
        });

        it("value", () => {
            expect(() => $c(EmptyComponent).value("123")).to.throw(Error);
        });

        it("checked", () => {
            expect(() => $c(EmptyComponent).checked(true)).to.throw(Error);
        });

        it("mergeStyle", () => {
            expect(() => $c(EmptyComponent).mergeStyle({})).to.throw(Error);
        });

        it("autofocus", () => {
            expect(() => $c(EmptyComponent).autofocus(true)).to.throw(Error);
        });
    });

    describe("$i", () => {
        it("children", () => {
            expect(() => $i("text").children("123")).to.throw(Error);
        });

        it("unsafeHTML", () => {
            expect(() => $i("text").unsafeHTML("123")).to.throw(Error);
        });

        it("textarea: children", () => {
            expect(() => $i("textarea").children("123")).to.throw(Error);
        });

        it("textarea: unsafeHTML", () => {
            expect(() => $i("textarea").unsafeHTML("123")).to.throw(Error);
        });

        it("value", () => {
            const e = $i("text").value("abc");
            expect(e._children).to.be.equal("abc");
        });

        it("textarea: value", () => {
            const e = $i("textarea").value("abc");
            expect(e._children).to.be.equal("abc");
        });

        it("checked", () => {
            expect(() => $i("text").checked(true)).to.throw(Error);
        });

        it("textarea", () => {
            expect(() => $i("textarea").checked(true)).to.throw(Error);
        });

        it("checkbox: checked", () => {
            const e = $i("checkbox").checked(true);
            expect(e._children).to.be.equal(true);
        });
    });

    describe("$m", () => {
        it("children", () => {
            expect(() => $m("audio").children("123")).to.throw(Error);
        });

        it("unsafeHTML", () => {
            expect(() => $c(EmptyComponent).unsafeHTML("123")).to.throw(Error);
        });
    });
});

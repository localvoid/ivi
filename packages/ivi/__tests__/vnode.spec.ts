import { EventHandler } from "ivi-events";
import { mergeAttrs, mergeStyle } from "../src/vdom/vnode";
import { VNodeFlags } from "../src/vdom/flags";
import { statelessComponentFactory } from "../src/vdom/vnode_factories";
import * as h from "./utils/html";
import { expect } from "iko";

const emptyComponent = statelessComponentFactory(() => h.t(""));

describe("VNode", () => {
  describe("$t", () => {
    it("init", () => {
      const t = h.t("abc");
      expect(t._flags & VNodeFlags.Text).toBe(VNodeFlags.Text);
      expect(t._children).toBe("abc");
    });

    it("key", () => {
      const t = h.t("abc").k("k");
      expect(t._flags & VNodeFlags.Key).toBe(VNodeFlags.Key);
      expect(t._key).toBe("k");
    });

    it("style", () => {
      expect(() => h.t("abc").s({})).toThrow(Error);
    });

    it("events", () => {
      expect(() => h.t("abc").e([])).toThrow(Error);
    });

    it("children", () => {
      expect(() => h.t("abc").c("123")).toThrow(Error);
    });

    it("unsafeHTML", () => {
      expect(() => h.t("abc").unsafeHTML("123")).toThrow(Error);
    });

    it("value", () => {
      expect(() => h.t("abc").value("123")).toThrow(Error);
    });

    it("checked", () => {
      expect(() => h.t("abc").checked(true)).toThrow(Error);
    });

    it("mergeStyle", () => {
      expect(() => mergeStyle(h.t("abc"), {})).toThrow(Error);
    });

    it("autofocus", () => {
      expect(() => h.t("abc").autofocus(true)).toThrow(Error);
    });
  });

  describe("$h", () => {
    it("init", () => {
      const e = h.div();
      expect(e._flags & VNodeFlags.Element).toBe(VNodeFlags.Element);
      expect(e._tag).toBe("div");
    });

    it("init className", () => {
      const e = h.div("cls");
      expect(e._flags & VNodeFlags.Element).toBe(VNodeFlags.Element);
      expect(e._tag).toBe("div");
      expect(e._className).toBe("cls");
    });

    it("key", () => {
      const e = h.div().k("k");
      expect(e._key).toBe("k");
    });

    it("style", () => {
      const s = { top: "10px" };
      const e = h.div().s(s);
      expect(e._style).toBe(s);
    });

    it("events", () => {
      const s = [] as EventHandler[];
      const e = h.div().e(s);
      expect(e._events).toBe(s);
    });

    it("props", () => {
      const s = {};
      const e = h.div().a(s);
      expect(e._props).toBe(s);
    });

    it("children", () => {
      const e = h.div().c("abc");
      expect(e._children).toBe("abc");
    });

    it("children override", () => {
      const e = h.div().c("abc");
      expect(() => e.c("123")).toThrow(Error);
      expect(() => e.unsafeHTML("123")).toThrow(Error);
    });

    it("children: duplicate keys", () => {
      expect(() => h.div().c(h.t("").k("a"), h.t("").k("a"))).toThrow(Error);
    });

    it("unsafeHTML", () => {
      const e = h.div().unsafeHTML("abc");
      expect(e._children).toBe("abc");
    });

    it("value", () => {
      expect(() => h.div().value("123")).toThrow(Error);
    });

    it("checked", () => {
      expect(() => h.div().checked(true)).toThrow(Error);
    });

    it("mergeProps: null", () => {
      const e = mergeAttrs(h.div().a({ title: "abc" }), null);
      expect((e._props as any).title).toBe("abc");
    });

    it("mergeProps", () => {
      const e = mergeAttrs(h.div().a({ title: "abc" }), { width: "100" });
      expect((e._props as any).title).toBe("abc");
      expect((e._props as any).width).toBe("100");
    });

    it("mergeProps override", () => {
      const e = mergeAttrs(h.div().a({ title: "abc" }), { title: "100" });
      expect((e._props as any).title).toBe("100");
    });

    it("mergeStyle: null", () => {
      const e = mergeStyle(h.div().s({ top: "10px" }), null);
      expect(e._style!.top).toBe("10px");
    });

    it("mergeStyle", () => {
      const e = mergeStyle(h.div().s({ top: "10px" }), { left: "20px" });
      expect(e._style!.top).toBe("10px");
      expect(e._style!.left).toBe("20px");
    });

    it("mergeStyle override", () => {
      const e = mergeStyle(h.div().s({ top: "10px" }), { top: "20px" });
      expect(e._style!.top).toBe("20px");
    });

    it("autofocus", () => {
      const e = h.div().autofocus(true);
      expect(e._flags & VNodeFlags.Autofocus).toBe(VNodeFlags.Autofocus);
    });
  });

  describe("$c", () => {
    it("style", () => {
      expect(() => emptyComponent().s({})).toThrow(Error);
    });

    it("events", () => {
      expect(() => emptyComponent().e([])).toThrow(Error);
    });

    it("children", () => {
      expect(() => emptyComponent().c("123")).toThrow(Error);
    });

    it("unsafeHTML", () => {
      expect(() => emptyComponent().unsafeHTML("123")).toThrow(Error);
    });

    it("value", () => {
      expect(() => emptyComponent().value("123")).toThrow(Error);
    });

    it("checked", () => {
      expect(() => emptyComponent().checked(true)).toThrow(Error);
    });

    it("mergeStyle", () => {
      expect(() => mergeStyle(emptyComponent(), {})).toThrow(Error);
    });

    it("autofocus", () => {
      expect(() => emptyComponent().autofocus(true)).toThrow(Error);
    });
  });

  describe("$i", () => {
    it("children", () => {
      expect(() => h.input().c("123")).toThrow(Error);
    });

    it("unsafeHTML", () => {
      expect(() => h.input().unsafeHTML("123")).toThrow(Error);
    });

    it("textarea: children", () => {
      expect(() => h.textarea().c("123")).toThrow(Error);
    });

    it("textarea: unsafeHTML", () => {
      expect(() => h.textarea().unsafeHTML("123")).toThrow(Error);
    });

    it("value", () => {
      const e = h.input().value("abc");
      expect(e._children).toBe("abc");
    });

    it("textarea: value", () => {
      const e = h.textarea().value("abc");
      expect(e._children).toBe("abc");
    });

    it("checked", () => {
      expect(() => h.input().checked(true)).toThrow(Error);
    });

    it("textarea", () => {
      expect(() => h.textarea().checked(true)).toThrow(Error);
    });

    it("checkbox: checked", () => {
      const e = h.inputCheckbox().checked(true);
      expect(e._children).toBe(true);
    });
  });

  describe("$m", () => {
    it("children", () => {
      expect(() => h.audio().c("123")).toThrow(Error);
    });

    it("unsafeHTML", () => {
      expect(() => emptyComponent().unsafeHTML("123")).toThrow(Error);
    });
  });
});

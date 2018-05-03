import { EventHandler } from "ivi-events";
import { mergeAttrs, mergeStyle } from "../src/vdom/vnode";
import { VNodeFlags } from "../src/vdom/flags";
import { statelessComponent } from "../src/vdom/vnode_factories";
import * as h from "./utils/html";

const emptyComponent = statelessComponent(() => h.t(""));

describe("VNode", () => {
  describe("$t", () => {
    test("init", () => {
      const t = h.t("abc");
      expect(t._flags & VNodeFlags.Text).toBe(VNodeFlags.Text);
      expect(t._children).toBe("abc");
    });

    test("key", () => {
      const t = h.t("abc").k("k");
      expect(t._flags & VNodeFlags.Key).toBe(VNodeFlags.Key);
      expect(t._key).toBe("k");
    });

    test("style", () => {
      expect(() => h.t("abc").s({})).toThrow(Error);
    });

    test("events", () => {
      expect(() => h.t("abc").e([])).toThrow(Error);
    });

    test("children", () => {
      expect(() => h.t("abc").c("123")).toThrow(Error);
    });

    test("unsafeHTML", () => {
      expect(() => h.t("abc").unsafeHTML("123")).toThrow(Error);
    });

    test("value", () => {
      expect(() => h.t("abc").value("123")).toThrow(Error);
    });

    test("checked", () => {
      expect(() => h.t("abc").checked(true)).toThrow(Error);
    });

    test("mergeStyle", () => {
      expect(() => mergeStyle(h.t("abc"), {})).toThrow(Error);
    });

    test("autofocus", () => {
      expect(() => h.t("abc").autofocus(true)).toThrow(Error);
    });
  });

  describe("$h", () => {
    test("init", () => {
      const e = h.div();
      expect(e._flags & VNodeFlags.Element).toBe(VNodeFlags.Element);
      expect(e._tag).toBe("div");
    });

    test("init className", () => {
      const e = h.div("cls");
      expect(e._flags & VNodeFlags.Element).toBe(VNodeFlags.Element);
      expect(e._tag).toBe("div");
      expect(e._className).toBe("cls");
    });

    test("key", () => {
      const e = h.div().k("k");
      expect(e._key).toBe("k");
    });

    test("style", () => {
      const s = { top: "10px" };
      const e = h.div().s(s);
      expect(e._style).toBe(s);
    });

    test("events", () => {
      const s = [] as EventHandler[];
      const e = h.div().e(s);
      expect(e._events).toBe(s);
    });

    test("props", () => {
      const s = {};
      const e = h.div().a(s);
      expect(e._props).toBe(s);
    });

    test("children", () => {
      const e = h.div().c("abc");
      expect(e._children).toBe("abc");
    });

    test("children override", () => {
      const e = h.div().c("abc");
      expect(() => e.c("123")).toThrow(Error);
      expect(() => e.unsafeHTML("123")).toThrow(Error);
    });

    test("children: duplicate keys", () => {
      expect(() => h.div().c(h.t("").k("a"), h.t("").k("a"))).toThrow(Error);
    });

    test("unsafeHTML", () => {
      const e = h.div().unsafeHTML("abc");
      expect(e._children).toBe("abc");
    });

    test("value", () => {
      expect(() => h.div().value("123")).toThrow(Error);
    });

    test("checked", () => {
      expect(() => h.div().checked(true)).toThrow(Error);
    });

    test("mergeProps: null", () => {
      const e = mergeAttrs(h.div().a({ title: "abc" }), null);
      expect((e._props as any).title).toBe("abc");
    });

    test("mergeProps", () => {
      const e = mergeAttrs(h.div().a({ title: "abc" }), { width: "100" });
      expect((e._props as any).title).toBe("abc");
      expect((e._props as any).width).toBe("100");
    });

    test("mergeProps override", () => {
      const e = mergeAttrs(h.div().a({ title: "abc" }), { title: "100" });
      expect((e._props as any).title).toBe("100");
    });

    test("mergeStyle: null", () => {
      const e = mergeStyle(h.div().s({ top: "10px" }), null);
      expect(e._style!.top).toBe("10px");
    });

    test("mergeStyle", () => {
      const e = mergeStyle(h.div().s({ top: "10px" }), { left: "20px" });
      expect(e._style!.top).toBe("10px");
      expect(e._style!.left).toBe("20px");
    });

    test("mergeStyle override", () => {
      const e = mergeStyle(h.div().s({ top: "10px" }), { top: "20px" });
      expect(e._style!.top).toBe("20px");
    });

    test("autofocus", () => {
      const e = h.div().autofocus(true);
      expect(e._flags & VNodeFlags.Autofocus).toBe(VNodeFlags.Autofocus);
    });
  });

  describe("$c", () => {
    test("style", () => {
      expect(() => emptyComponent().s({})).toThrow(Error);
    });

    test("events", () => {
      expect(() => emptyComponent().e([])).toThrow(Error);
    });

    test("children", () => {
      expect(() => emptyComponent().c("123")).toThrow(Error);
    });

    test("unsafeHTML", () => {
      expect(() => emptyComponent().unsafeHTML("123")).toThrow(Error);
    });

    test("value", () => {
      expect(() => emptyComponent().value("123")).toThrow(Error);
    });

    test("checked", () => {
      expect(() => emptyComponent().checked(true)).toThrow(Error);
    });

    test("mergeStyle", () => {
      expect(() => mergeStyle(emptyComponent(), {})).toThrow(Error);
    });

    test("autofocus", () => {
      expect(() => emptyComponent().autofocus(true)).toThrow(Error);
    });
  });

  describe("$i", () => {
    test("children", () => {
      expect(() => h.input().c("123")).toThrow(Error);
    });

    test("unsafeHTML", () => {
      expect(() => h.input().unsafeHTML("123")).toThrow(Error);
    });

    test("textarea: children", () => {
      expect(() => h.textarea().c("123")).toThrow(Error);
    });

    test("textarea: unsafeHTML", () => {
      expect(() => h.textarea().unsafeHTML("123")).toThrow(Error);
    });

    test("value", () => {
      const e = h.input().value("abc");
      expect(e._children).toBe("abc");
    });

    test("textarea: value", () => {
      const e = h.textarea().value("abc");
      expect(e._children).toBe("abc");
    });

    test("checked", () => {
      expect(() => h.input().checked(true)).toThrow(Error);
    });

    test("textarea", () => {
      expect(() => h.textarea().checked(true)).toThrow(Error);
    });

    test("checkbox: checked", () => {
      const e = h.inputCheckbox().checked(true);
      expect(e._children).toBe(true);
    });
  });

  describe("$m", () => {
    test("children", () => {
      expect(() => h.audio().c("123")).toThrow(Error);
    });

    test("unsafeHTML", () => {
      expect(() => emptyComponent().unsafeHTML("123")).toThrow(Error);
    });
  });
});

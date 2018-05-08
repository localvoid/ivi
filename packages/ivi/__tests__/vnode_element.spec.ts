import { EventHandler } from "ivi-events";
import { VNodeFlags, VNode, getComponentInstanceFromVNode } from "ivi";
import * as h from "ivi-html";

test(`element flags`, () => {
  const v = h.div();
  expect(v._flags & VNodeFlags.Element).toBeTruthy();
});

test(`tagName`, () => {
  const v = h.div();
  expect(v._tag).toBe("div");
});

test(`default className should be undefined`, () => {
  const v = h.div();
  expect(v._className).toBeUndefined();
});

test(`className=undefined`, () => {
  const v = h.div(undefined);
  expect(v._className).toBeUndefined();
});

test(`className="cls"`, () => {
  const v = h.div("cls");
  expect(v._className).toBe("cls");
});

test(`explicit key`, () => {
  const v = h.div().k("k");
  expect(v._flags & VNodeFlags.Key).toBeTruthy();
  expect(v._key).toBe("k");
});

test(`style`, () => {
  const s = { top: "10px" };
  const v = h.div().s(s);
  expect(v._style).toBe(s);
});

test(`events`, () => {
  const s: EventHandler[] = [];
  const v = h.div().e(s);
  expect(v._events).toBe(s);
});

test(`attributes`, () => {
  const s = {};
  const v = h.div().a(s);
  expect(v._props).toBe(s);
});

test(`children`, () => {
  const v = h.div().c("abc");
  expect((v._children as VNode)._children as string).toBe("abc");
});

test(`overwriting children should raise an exception`, () => {
  const v = h.div().c("abc");
  expect(() => v.c("123")).toThrow(Error);
});

test(`overwriting children with unsafeHTML should raise an exception`, () => {
  const e = h.div().c("abc");
  expect(() => e.unsafeHTML("123")).toThrow(Error);
});

test(`children with duplicate keys should raise an exception`, () => {
  expect(() => (
    h.div().c(
      h.t("").k("a"),
      h.t("").k("a"),
    )
  )).toThrow(Error);
});

test(`unsafeHTML flags`, () => {
  const v = h.div().unsafeHTML("abc");
  expect(v._flags & VNodeFlags.UnsafeHTML).toBeTruthy();
});

test(`unsafeHTML children`, () => {
  const v = h.div().unsafeHTML("abc");
  expect(v._children).toBe("abc");
});

test(`assigning input value to div should raise an exception`, () => {
  expect(() => h.div().value("123")).toThrow(Error);
});

test(`assigning checked value to div should raise an exception`, () => {
  expect(() => h.div().checked(true)).toThrow(Error);
});

test(`autofocus`, () => {
  const e = h.div().autofocus(true);
  expect(e._flags & VNodeFlags.Autofocus).toBe(VNodeFlags.Autofocus);
});

test(`getComponentInstanceFromVNode should raise an exception when it is invoked on a non-component node`, () => {
  expect(() => getComponentInstanceFromVNode(h.div())).toThrowError();
});

import { EventHandler } from "ivi-events";
import { VNodeFlags, VNode, getComponentInstanceFromVNode, autofocus } from "ivi";
import * as h from "ivi-html";

test(`element flags`, () => {
  const v = h.div();
  expect(v.flags & VNodeFlags.Element).toBeTruthy();
});

test(`tagName`, () => {
  const v = h.div();
  expect(v.tag).toBe("div");
});

test(`default className should be undefined`, () => {
  const v = h.div();
  expect(v.className).toBeUndefined();
});

test(`className=undefined`, () => {
  const v = h.div(undefined);
  expect(v.className).toBeUndefined();
});

test(`className="cls"`, () => {
  const v = h.div("cls");
  expect(v.className).toBe("cls");
});

test(`explicit key`, () => {
  const v = h.div().k("k");
  expect(v.flags & VNodeFlags.Key).toBeTruthy();
  expect(v.key).toBe("k");
});

test(`style`, () => {
  const s = { top: "10px" };
  const v = h.div().s(s);
  expect(v.style).toBe(s);
});

test(`events`, () => {
  const s: EventHandler[] = [];
  const v = h.div().e(s);
  expect(v.events).toBe(s);
});

test(`attributes`, () => {
  const s = {};
  const v = h.div().a(s);
  expect(v.props).toBe(s);
});

test(`children`, () => {
  const v = h.div().c("abc");
  expect((v.children as VNode).children as string).toBe("abc");
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
  expect(v.flags & VNodeFlags.UnsafeHTML).toBeTruthy();
});

test(`unsafeHTML children`, () => {
  const v = h.div().unsafeHTML("abc");
  expect(v.children).toBe("abc");
});

test(`assigning input value to div should raise an exception`, () => {
  expect(() => h.div().value("123")).toThrow(Error);
});

test(`assigning checked value to div should raise an exception`, () => {
  expect(() => h.div().value(true)).toThrow(Error);
});

test(`autofocus`, () => {
  const e = autofocus(h.div());
  expect(e.flags & VNodeFlags.Autofocus).toBe(VNodeFlags.Autofocus);
});

test(`getComponentInstanceFromVNode should raise an exception when it is invoked on a non-component node`, () => {
  expect(() => getComponentInstanceFromVNode(h.div())).toThrowError();
});

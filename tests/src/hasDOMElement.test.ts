import { ok } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset } from "@ivi/mock-dom/global";
import {
  type VAny, hasDOMElement, component, context, List,
} from "ivi";
import { createRoot } from "ivi/test";
import { htm } from "ivi";

describe("hasDOMElement", () => {
  beforeEach(reset);

  const ROOT = (ref: (element: Element) => void) => htm`
    <div &=${ref}>
      <span/>
    </div>
  `;

  const DEEP = (ref: (element: Element) => void) => htm`
    <div>
      <span &=${ref}/>
    </div>
  `;

  test(`null`, () => {
    const root = createRoot();
    const el = document.createElement("div");
    root.update(null);
    ok(!hasDOMElement(root.root, el));
  });

  test(`element 1`, () => {
    const root = createRoot();
    const el = document.createElement("div");
    root.update(htm`<div/>`);
    ok(!hasDOMElement(root.root, el));
  });

  test(`element 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update(DEEP(ref));
    ok(!hasDOMElement(root.root, el!));
  });

  test(`element 3`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update(ROOT(ref));
    ok(hasDOMElement(root.root, el!));
  });

  test(`array 1`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update([
      "a",
      DEEP(ref),
      "b",
    ]);
    ok(!hasDOMElement(root.root, el!));
  });

  test(`array 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update([
      "a",
      ROOT(ref),
      "b",
    ]);
    ok(hasDOMElement(root.root, el!));
  });

  test(`component 1`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const T = component<VAny>(() => (child) => child);
    root.update(T(DEEP(ref)));
    ok(!hasDOMElement(root.root, el!));
  });

  test(`component 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const T = component<VAny>(() => (child) => child);
    root.update(T(ROOT(ref)));
    ok(hasDOMElement(root.root, el!));
  });

  test(`context 1`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const [_, provider] = context<number>();
    root.update(provider(1, DEEP(ref)));
    ok(!hasDOMElement(root.root, el!));
  });

  test(`context 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const [_, provider] = context<number>();
    root.update(provider(1, ROOT(ref)));
    ok(hasDOMElement(root.root, el!));
  });

  test(`List 1`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const r = (c: VAny) => c;
    root.update(
      List([
        1,
        DEEP(ref),
        2,
      ], r, r),
    );
    ok(!hasDOMElement(root.root, el!));
  });

  test(`List 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const r = (c: VAny) => c;
    root.update(
      List([
        1,
        ROOT(ref),
        2,
      ], r, r),
    );
    ok(hasDOMElement(root.root, el!));
  });
});

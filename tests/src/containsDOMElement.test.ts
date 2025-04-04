import { ok } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset } from "@ivi/mock-dom/global";
import {
  type VAny, containsDOMElement, component, context, List,
} from "ivi";
import { createRoot } from "ivi/test";
import { html } from "ivi";

describe("containsDOMElement", () => {
  beforeEach(reset);

  const DEEP = (ref: (element: Element) => void) => html`
    <div>
      <span &=${ref}/>
    </div>
  `;

  test(`null`, () => {
    const root = createRoot();
    const el = document.createElement("div");
    root.update(null);
    ok(!containsDOMElement(root.root, el));
  });

  test(`element 1`, () => {
    const root = createRoot();
    const el = document.createElement("div");
    root.update(html`<div/>`);
    ok(!containsDOMElement(root.root, el));
  });

  test(`element 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update(DEEP(ref));
    ok(containsDOMElement(root.root, el!));
  });

  test(`array`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update([
      "a",
      DEEP(ref),
      "b",
    ]);
    ok(containsDOMElement(root.root, el!));
  });

  test(`component`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const T = component<VAny>(() => (child) => child);
    root.update(T(DEEP(ref)));
    ok(containsDOMElement(root.root, el!));
  });

  test(`context`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const [_, provider] = context<number>();
    root.update(provider(1, DEEP(ref)));
    ok(containsDOMElement(root.root, el!));
  });

  test(`List`, () => {
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
    ok(containsDOMElement(root.root, el!));
  });
});

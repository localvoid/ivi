import { ok } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset } from "@ivi/mock-dom/global";
import {
  type VAny, hasDOMElement, component, context, List,
} from "ivi";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("hasDOMElement", () => {
  beforeEach(reset);

  test(`null`, () => {
    const root = createRoot();
    const el = document.createElement("div");
    root.update(
      null,
    );
    ok(!hasDOMElement(root.root, el));
  });

  test(`element 1`, () => {
    const root = createRoot();
    const el = document.createElement("div");
    root.update(
      htm`<div/>`,
    );
    ok(!hasDOMElement(root.root, el));
  });

  test(`element 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update(
      htm`
        <div>
          <span ${ref}/>
        </div>
      `,
    );
    ok(!hasDOMElement(root.root, el!));
  });

  test(`element 3`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update(
      htm`
        <div ${ref} />
      `,
    );
    ok(hasDOMElement(root.root, el!));
  });

  test(`array 1`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    root.update([
      "a",
      htm`
        <div>
          <span ${ref}/>
        </div>
      `,
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
      htm`
        <div ${ref} />
      `,
      "b",
    ]);
    ok(hasDOMElement(root.root, el!));
  });

  test(`component 1`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const T = component<VAny>(() => (child) => child);
    root.update(
      T(htm`
        <div>
          <span ${ref}/>
        </div>
      `,
      ),
    );
    ok(!hasDOMElement(root.root, el!));
  });

  test(`component 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const T = component<VAny>(() => (child) => child);
    root.update(
      T(htm`
        <div ${ref} />
      `,
      ),
    );
    ok(hasDOMElement(root.root, el!));
  });

  test(`context 1`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const [_, provider] = context<number>();
    root.update(
      provider(1,
        htm`
        <div>
          <span ${ref}/>
        </div>
      `,
      ),
    );
    ok(!hasDOMElement(root.root, el!));
  });

  test(`context 2`, () => {
    const root = createRoot();
    let el: Element;
    const ref = (element: Element) => { el = element; };
    const [_, provider] = context<number>();
    root.update(
      provider(1,
        htm`
        <div ${ref} />
      `,
      ),
    );
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
        htm`
        <div>
          <span ${ref}/>
        </div>
        `,
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
        htm`
        <div ${ref} />
        `,
        2,
      ], r, r),
    );
    ok(hasDOMElement(root.root, el!));
  });
});

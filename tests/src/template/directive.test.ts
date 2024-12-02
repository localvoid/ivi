import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { html } from "ivi";
import { type ElementDirective } from "ivi";

describe("directive", () => {
  beforeEach(reset);
  const T = (directive: ElementDirective) => html`<div ${directive} />`;

  test(`root element`, () => {
    let e: any;
    let h: boolean | undefined;
    const d = (element: Element, hydrate?: boolean) => {
      e = element;
      h = hydrate;
    };
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(d)); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
    strictEqual((e as any).uid, 2);
    strictEqual(h, void 0);
  });

  test(`deep element`, () => {
    let e: any;
    let h: boolean | undefined;
    const d = (element: Element, hydrate?: boolean) => {
      e = element;
      h = hydrate;
    };

    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(html`<div><span ${d} /></div>`); }),
      [
        `[-7] Template.innerHTML = "<div><span></span></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[5] Node.firstChild => 6`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
    strictEqual((e as any).uid, 6);
    strictEqual(h, void 0);
  });

  test(`reuse`, () => {
    let _trace: string[] = [];
    const d = (element: Element) => {
      _trace.push(`directive(${(element as any).uid})`);
    };
    const root = createRoot();
    root.update(T(d));
    deepStrictEqual(
      _trace,
      [
        `directive(2)`,
      ],
    );
    _trace = [];
    deepStrictEqual(
      trace(() => { root.update(T(d)); }),
      [],
    );
    deepStrictEqual(
      _trace,
      [],
    );
  });

  test(`update`, () => {
    let _trace: string[] = [];
    const d1 = (element: Element) => {
      _trace.push(`directive1(${(element as any).uid})`);
    };
    const d2 = (element: Element) => {
      _trace.push(`directive2(${(element as any).uid})`);
    };
    const root = createRoot();
    root.update(T(d1));
    deepStrictEqual(
      _trace,
      [
        `directive1(2)`,
      ],
    );
    _trace = [];
    deepStrictEqual(
      trace(() => { root.update(T(d2)); }),
      [],
    );
    deepStrictEqual(
      _trace,
      [
        `directive2(2)`,
      ],
    );
  });
});

import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";
import { type ElementDirective } from "ivi";

describe("@ivi/htm directive", () => {
  beforeEach(reset);
  const T = (directive: ElementDirective) => htm`<div ${directive} />`;

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
      trace(() => { root.update(htm`<div><span ${d} /></div>`); }),
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
    const d = (element: Element, hydrate?: boolean) => {
      _trace.push(`directive(${(element as any).uid}, ${hydrate})`);
    };
    const root = createRoot();
    root.update(T(d));
    deepStrictEqual(
      _trace,
      [
        `directive(2, undefined)`,
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
    const d1 = (element: Element, hydrate?: boolean) => {
      _trace.push(`directive1(${(element as any).uid}, ${hydrate})`);
    };
    const d2 = (element: Element, hydrate?: boolean) => {
      _trace.push(`directive2(${(element as any).uid}, ${hydrate})`);
    };
    const root = createRoot();
    root.update(T(d1));
    deepStrictEqual(
      _trace,
      [
        `directive1(2, undefined)`,
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
        `directive2(2, undefined)`,
      ],
    );
  });
});

import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "bun:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { html } from "ivi";

describe("@ivi/htm textContent", () => {
  beforeEach(reset);

  const T = (v: undefined | null | false | string | number) => html`<div .textContent=${v} />`;

  test(`undefined`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(void 0)); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`null`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(null)); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`false`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(false)); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`""`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T("")); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`0`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(0)); }),
      [
        `createElement("div") => 2`,
        `[2] Node.textContent = 0`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`"0"`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T("0")); }),
      [
        `createElement("div") => 2`,
        `[2] Node.textContent = "0"`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`empty transitions`, () => {
    const root = createRoot();
    root.update(T(void 0));
    deepStrictEqual(trace(() => { root.update(T(null)); }), []);
    deepStrictEqual(trace(() => { root.update(T(void 0)); }), []);
    deepStrictEqual(trace(() => { root.update(T(false)); }), []);
    deepStrictEqual(trace(() => { root.update(T(void 0)); }), []);
    deepStrictEqual(trace(() => { root.update(T("")); }), []);

    deepStrictEqual(trace(() => { root.update(T(null)); }), []);
    deepStrictEqual(trace(() => { root.update(T(false)); }), []);
    deepStrictEqual(trace(() => { root.update(T(null)); }), []);
    deepStrictEqual(trace(() => { root.update(T("")); }), []);

    deepStrictEqual(trace(() => { root.update(T(false)); }), []);
    deepStrictEqual(trace(() => { root.update(T("")); }), []);
    deepStrictEqual(trace(() => { root.update(T(void 0)); }), []);
  });

  test(`undefined => "a" => undefined`, () => {
    const root = createRoot();
    root.update(T(void 0));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Node.textContent = "a"`],
    );
    deepStrictEqual(trace(() => { root.update(T(void 0)); }),
      [`[2] Node.textContent = ""`],
    );
  });

  test(`null => "a" => null`, () => {
    const root = createRoot();
    root.update(T(null));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Node.textContent = "a"`],
    );
    deepStrictEqual(trace(() => { root.update(T(null)); }),
      [`[2] Node.textContent = ""`],
    );
  });

  test(`false => "a" => false`, () => {
    const root = createRoot();
    root.update(T(null));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Node.textContent = "a"`],
    );
    deepStrictEqual(trace(() => { root.update(T(false)); }),
      [`[2] Node.textContent = ""`],
    );
  });

  test(`"" => "a" => ""`, () => {
    const root = createRoot();
    root.update(T(""));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Node.textContent = "a"`],
    );
    deepStrictEqual(trace(() => { root.update(T("")); }),
      [`[2] Node.textContent = ""`],
    );
  });

  test(`"a" => "b"`, () => {
    const root = createRoot();
    root.update(T("a"));
    deepStrictEqual(trace(() => { root.update(T("b")); }),
      [
        `[2] Node.firstChild => 3`,
        `[3] Node.nodeValue = "b"`,
      ],
    );
  });

  test(`"a" => "a"`, () => {
    const root = createRoot();
    root.update(T("a"));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [],
    );
  });
});

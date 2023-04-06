import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm className", () => {
  beforeEach(reset);
  const T = (v: undefined | null | false | string | number) => htm`<div class=${v} />`;

  test(`"a"`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(htm`<div class="a" />`); }),
      [
        `[-7] Template.innerHTML = "<div class="a"></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`"a b"`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(htm`<div class="a b" />`); }),
      [
        `[-7] Template.innerHTML = "<div class="a b"></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`{undefined}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(void 0)); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`{null}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(null)); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`{false}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(false)); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`{""}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T("")); }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`{0}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(0)); }),
      [
        `createElement("div") => 2`,
        `[2] Element.className = 0`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`{"a b"}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T("a b")); }),
      [
        `createElement("div") => 2`,
        `[2] Element.className = "a b"`,
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
      [`[2] Element.className = "a"`],
    );
    deepStrictEqual(trace(() => { root.update(T(void 0)); }),
      [`[2] Element.className = ""`],
    );
  });

  test(`null => "a" => null`, () => {
    const root = createRoot();
    root.update(T(null));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Element.className = "a"`],
    );
    deepStrictEqual(trace(() => { root.update(T(null)); }),
      [`[2] Element.className = ""`],
    );
  });

  test(`false => "a" => false`, () => {
    const root = createRoot();
    root.update(T(false));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Element.className = "a"`],
    );
    deepStrictEqual(trace(() => { root.update(T(false)); }),
      [`[2] Element.className = ""`],
    );
  });

  test(`"" => "a" => ""`, () => {
    const root = createRoot();
    root.update(T(""));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Element.className = "a"`],
    );
    deepStrictEqual(trace(() => { root.update(T("")); }),
      [`[2] Element.className = ""`],
    );
  });

  test(`"a" => "b"`, () => {
    const root = createRoot();
    root.update(T("a"));
    deepStrictEqual(trace(() => { root.update(T("b")); }),
      [`[2] Element.className = "b"`],
    );
  });

  test(`0 => "0"`, () => {
    const root = createRoot();
    root.update(T(0));
    deepStrictEqual(trace(() => { root.update(T("0")); }),
      [`[2] Element.className = "0"`],
    );
  });
});

import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm attribute", () => {
  beforeEach(reset);
  const T = (v: undefined | null | false | string | number) => htm`<div attr=${v} />`;

  test("short form", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(htm`<div attr />`); }),
      [
        `[-7] Template.innerHTML = "<div attr></div>"`,
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
        `[2] Element.setAttribute("attr", "")`,
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
        `[2] Element.setAttribute("attr", 0)`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`{"a"}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T("a")); }),
      [
        `createElement("div") => 2`,
        `[2] Element.setAttribute("attr", "a")`,
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
    deepStrictEqual(trace(() => { root.update(T(null)); }), []);

    deepStrictEqual(trace(() => { root.update(T(false)); }), []);
    deepStrictEqual(trace(() => { root.update(T(null)); }), []);

    deepStrictEqual(trace(() => { root.update(T(false)); }), []);
    deepStrictEqual(trace(() => { root.update(T(void 0)); }), []);
  });

  test(`undefined => "a" => undefined`, () => {
    const root = createRoot();
    root.update(T(void 0));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Element.setAttribute("attr", "a")`],
    );
    deepStrictEqual(trace(() => { root.update(T(void 0)); }),
      [`[2] Element.removeAttribute("attr")`],
    );
  });

  test(`null => "a" => null`, () => {
    const root = createRoot();
    root.update(T(null));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Element.setAttribute("attr", "a")`],
    );
    deepStrictEqual(trace(() => { root.update(T(null)); }),
      [`[2] Element.removeAttribute("attr")`],
    );
  });

  test(`false => "a" => false`, () => {
    const root = createRoot();
    root.update(T(null));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Element.setAttribute("attr", "a")`],
    );
    deepStrictEqual(trace(() => { root.update(T(false)); }),
      [`[2] Element.removeAttribute("attr")`],
    );
  });

  test(`"" => "a"`, () => {
    const root = createRoot();
    root.update(T(""));
    deepStrictEqual(trace(() => { root.update(T("a")); }),
      [`[2] Element.setAttribute("attr", "a")`],
    );
  });

  test(`"a" => ""`, () => {
    const root = createRoot();
    root.update(T("a"));
    deepStrictEqual(trace(() => { root.update(T("")); }),
      [`[2] Element.setAttribute("attr", "")`],
    );
  });

  test(`"a" => "b"`, () => {
    const root = createRoot();
    root.update(T("a"));
    deepStrictEqual(trace(() => { root.update(T("b")); }),
      [`[2] Element.setAttribute("attr", "b")`],
    );
  });

  test(`0 => "0"`, () => {
    const root = createRoot();
    root.update(T(0));
    deepStrictEqual(trace(() => { root.update(T("0")); }),
      [`[2] Element.setAttribute("attr", "0")`],
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

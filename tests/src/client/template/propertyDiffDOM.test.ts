import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm propertyDiffDOM", () => {
  beforeEach(reset);
  const T = (v: any) => htm`<div *a=${v} />`;

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
        `[2] Element.setProperty("a", null)`,
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
        `[2] Element.setProperty("a", false)`,
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
        `[2] Element.setProperty("a", 0)`,
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
        `[2] Element.setProperty("a", "0")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`undefined => undefined => undefined`, () => {
    const root = createRoot();
    root.update(T(void 0));
    deepStrictEqual(
      trace(() => { root.update(T(void 0)); }),
      [`[2] Element.getProperty("a") => undefined`],
    );
    deepStrictEqual(
      trace(() => { root.update(T(void 0)); }),
      [`[2] Element.getProperty("a") => undefined`],
    );
  });

  test(`undefined => "a" => undefined`, () => {
    const root = createRoot();
    root.update(T(void 0));
    deepStrictEqual(
      trace(() => { root.update(T("a")); }),
      [
        `[2] Element.getProperty("a") => undefined`,
        `[2] Element.setProperty("a", "a")`,
      ],
    );
    deepStrictEqual(
      trace(() => { root.update(T(void 0)); }),
      [
        `[2] Element.getProperty("a") => "a"`,
        `[2] Element.setProperty("a", undefined)`,
      ],
    );
  });

  test(`"a" => "b"`, () => {
    const root = createRoot();
    root.update(T("a"));
    deepStrictEqual(
      trace(() => { root.update(T("b")); }),
      [
        `[2] Element.getProperty("a") => "a"`,
        `[2] Element.setProperty("a", "b")`,
      ],
    );
  });

  test(`"a" => "a"`, () => {
    const root = createRoot();
    root.update(T("a"));
    deepStrictEqual(
      trace(() => { root.update(T("a")); }),
      [`[2] Element.getProperty("a") => "a"`],
    );
  });
});

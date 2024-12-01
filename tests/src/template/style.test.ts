import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "ivi";

describe("@ivi/htm style", () => {
  beforeEach(reset);
  const T = (v: undefined | null | false | string | number) => htm`<div ~a=${v} />`;
  const T2 = (
    a: undefined | null | false | string,
    b: undefined | null | false | string,
  ) => htm`<div ~a=${a} ~b=${b} />`;

  test(`~a="0"`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(htm`<div ~a="0" />`); }),
      [
        `[-7] Template.innerHTML = "<div style="a:0"></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`style="a:0" ~b="1"`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(htm`<div style="a:0" ~b="1" />`); }),
      [
        `[-7] Template.innerHTML = "<div style="a:0;b:1"></div>"`,
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
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`{"0"}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T("0")); }),
      [
        `createElement("div") => 2`,
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "0")`,
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

  test(`undefined => "0" => undefined`, () => {
    const root = createRoot();
    root.update(T(void 0));
    deepStrictEqual(trace(() => { root.update(T("0")); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "0")`,
      ],
    );
    deepStrictEqual(trace(() => { root.update(T(void 0)); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.removeProperty("a")`,
      ],
    );
  });

  test(`null => "0" => null`, () => {
    const root = createRoot();
    root.update(T(null));
    deepStrictEqual(trace(() => { root.update(T("0")); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "0")`,
      ],
    );
    deepStrictEqual(trace(() => { root.update(T(null)); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.removeProperty("a")`,
      ],
    );
  });

  test(`false => "0" => false`, () => {
    const root = createRoot();
    root.update(T(false));
    deepStrictEqual(trace(() => { root.update(T("0")); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "0")`,
      ],
    );
    deepStrictEqual(trace(() => { root.update(T(false)); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.removeProperty("a")`,
      ],
    );
  });

  test(`undefined => "0", "1" => undefined`, () => {
    const root = createRoot();
    root.update(T2(void 0, void 0));
    deepStrictEqual(trace(() => { root.update(T2("0", "1")); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "0")`,
        `[2] style.setProperty("b", "1")`,
      ],
    );
    deepStrictEqual(trace(() => { root.update(T2(void 0, void 0)); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.removeProperty("a")`,
        `[2] style.removeProperty("b")`,
      ],
    );
  });

  test(`"" => "0"`, () => {
    const root = createRoot();
    root.update(T(""));
    deepStrictEqual(trace(() => { root.update(T("0")); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "0")`,
      ],
    );
  });

  test(`"0" => ""`, () => {
    const root = createRoot();
    root.update(T("0"));
    deepStrictEqual(trace(() => { root.update(T("")); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "")`,
      ],
    );
  });

  test(`"0" => "0"`, () => {
    const root = createRoot();
    root.update(T("0"));
    deepStrictEqual(trace(() => { root.update(T("0")); }),
      [],
    );
  });

  test(`0 => "0"`, () => {
    const root = createRoot();
    root.update(T(0));
    deepStrictEqual(trace(() => { root.update(T("0")); }),
      [
        `[2] HTMLElement.style`,
        `[2] style.setProperty("a", "0")`,
      ],
    );
  });
});

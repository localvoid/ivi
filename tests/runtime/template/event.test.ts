import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "bun:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { html } from "ivi";

describe("@ivi/htm event", () => {
  beforeEach(reset);
  const T = (h: (() => void) | undefined | null | false) => html`<div @click=${h} />`;
  const onClick = () => { };

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

  test(`{onClick}`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T(onClick)); }),
      [
        `createElement("div") => 2`,
        `[2] Element.addEventListener("click", onClick)`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`undefined => onClick => undefined`, () => {
    const root = createRoot();
    root.update(T(void 0));
    deepStrictEqual(
      trace(() => { root.update(T(onClick)); }),
      [
        `[2] Element.addEventListener("click", onClick)`,
      ],
    );
    deepStrictEqual(
      trace(() => { root.update(T(void 0)); }),
      [
        `[2] Element.removeEventListener("click", onClick)`,
      ],
    );
  });

  test(`null => onClick => null`, () => {
    const root = createRoot();
    root.update(T(null));
    deepStrictEqual(
      trace(() => { root.update(T(onClick)); }),
      [
        `[2] Element.addEventListener("click", onClick)`,
      ],
    );
    deepStrictEqual(
      trace(() => { root.update(T(null)); }),
      [
        `[2] Element.removeEventListener("click", onClick)`,
      ],
    );
  });

  test(`false => onClick => false`, () => {
    const root = createRoot();
    root.update(T(null));
    deepStrictEqual(
      trace(() => { root.update(T(onClick)); }),
      [
        `[2] Element.addEventListener("click", onClick)`,
      ],
    );
    deepStrictEqual(
      trace(() => { root.update(T(null)); }),
      [
        `[2] Element.removeEventListener("click", onClick)`,
      ],
    );
  });

  test(`onClick => onClick2`, () => {
    const onClick2 = () => { };
    const root = createRoot();
    root.update(T(onClick));
    deepStrictEqual(
      trace(() => { root.update(T(onClick2)); }),
      [
        `[2] Element.removeEventListener("click", onClick)`,
        `[2] Element.addEventListener("click", onClick2)`,
      ],
    );
  });

  test(`onClick => onClick`, () => {
    const root = createRoot();
    root.update(T(onClick));
    deepStrictEqual(
      trace(() => { root.update(T(onClick)); }),
      [],
    );
  });
});

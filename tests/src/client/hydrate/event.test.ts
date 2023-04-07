import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("hydrate/event", () => {
  beforeEach(reset);
  const T = (h: (() => void) | undefined | null | false) => htm`<div @click=${h} />`;
  const onClick = () => { };

  test(`{undefined}`, () => {
    document.body.innerHTML = `<div></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(T(void 0)); }),
      [
        `[1] Node.lastChild => 3`,
      ],
    );
  });

  test(`{null}`, () => {
    document.body.innerHTML = `<div></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(T(null)); }),
      [
        `[1] Node.lastChild => 3`,
      ],
    );
  });

  test(`{false}`, () => {
    document.body.innerHTML = `<div></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(T(false)); }),
      [
        `[1] Node.lastChild => 3`,
      ],
    );
  });

  test(`{onClick}`, () => {
    document.body.innerHTML = `<div></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(T(onClick)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Element.addEventListener("click", onClick)`,
      ],
    );
  });
});

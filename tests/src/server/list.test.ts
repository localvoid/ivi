import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { List, renderToString } from "ivi/server";
import { htm } from "./render.js";

describe("ssr: List", () => {
  const r = (i: number) => i;
  const T = (entries: number[]) => htm`<div>${List(entries, r, r)}a</div>`;

  test(`[]`, () => {
    strictEqual(
      renderToString(T([])),
      `<div &="0">a</div>`,
    );
  });

  test(`[1]`, () => {
    strictEqual(
      renderToString(T([1])),
      `<div &="1">1<!>a</div>`,
    );
  });

  test(`[1, 2]`, () => {
    strictEqual(
      renderToString(T([1, 2])),
      `<div &="2">1<!>2<!>a</div>`,
    );
  });
});

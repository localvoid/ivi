import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { renderToString } from "ivi/server";
import { htm } from "../render.js";

describe("ssr: template/directive", () => {
  const T = (d: () => void) => htm`<div ${d} />`;

  test(`should ignore`, () => {
    let _i = 0;
    const d = () => { _i++; };
    strictEqual(
      renderToString(T(d)),
      `<div></div>`,
    );
    strictEqual(_i, 0);
  });
});

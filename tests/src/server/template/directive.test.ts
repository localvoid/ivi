import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { renderToString } from "ivi/server";
import { htm } from "../render.js";

describe("ssr: template/directive", () => {
  const C = (d: () => void) => htm`<div &=${d} />`;
  const S = (d: () => void | string | { a?: string, c?: string; }) => htm`<div &:ssr=${d} />`;

  test(`ignore Client-Side Directives`, () => {
    let _i = 0;
    const d = () => { _i++; };
    strictEqual(
      renderToString(C(d)),
      `<div></div>`,
    );
    strictEqual(_i, 0);
  });

  test(`undefined`, () => {
    let _i = 0;
    const d = () => { _i++; };
    strictEqual(
      renderToString(S(d)),
      `<div></div>`,
    );
    strictEqual(_i, 1);
  });

  test(`"a"`, () => {
    const d = () => "a";
    strictEqual(
      renderToString(S(d)),
      `<div a></div>`,
    );
  });

  test(`{ c: "c" }`, () => {
    const d = () => ({ c: "c" });
    strictEqual(
      renderToString(S(d)),
      `<div>c</div>`,
    );
  });

  test(`{ a: "a", c: "c" }`, () => {
    const d = () => ({ a: "a", c: "c" });
    strictEqual(
      renderToString(S(d)),
      `<div a>c</div>`,
    );
  });
});

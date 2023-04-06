import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { renderToString } from "ivi/server";
import { htm } from "../render.js";

describe("ssr: template/innerHTML", () => {
  const T = (v: undefined | null | false | string | number) => htm`<div .innerHTML=${v} />`;

  test(`undefined`, () => {
    strictEqual(
      renderToString(T(void 0)),
      `<div></div>`,
    );
  });

  test(`null`, () => {
    strictEqual(
      renderToString(T(null)),
      `<div></div>`,
    );
  });

  test(`false`, () => {
    strictEqual(
      renderToString(T(false)),
      `<div></div>`,
    );
  });

  test(`""`, () => {
    strictEqual(
      renderToString(T("")),
      `<div></div>`,
    );
  });

  test(`0`, () => {
    strictEqual(
      renderToString(T(0)),
      `<div>0</div>`,
    );
  });

  test(`"0"`, () => {
    strictEqual(
      renderToString(T("0")),
      `<div>0</div>`,
    );
  });

  test(`"<a></a>"`, () => {
    strictEqual(
      renderToString(T("<a></a>")),
      `<div><a></a></div>`,
    );
  });
});

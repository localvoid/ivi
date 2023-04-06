import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { renderToString } from "ivi/server";
import { htm } from "../render.js";

describe("ssr: template/attribute", () => {
  const T = (v: undefined | null | false | string | number) => htm`<div attr=${v} />`;

  test(`short form`, () => {
    strictEqual(
      renderToString(htm`<div attr />`),
      `<div attr></div>`,
    );
  });

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
      `<div attr></div>`,
    );
  });

  test(`0`, () => {
    strictEqual(
      renderToString(T(0)),
      `<div attr="0"></div>`,
    );
  });

  test(`"0"`, () => {
    strictEqual(
      renderToString(T("0")),
      `<div attr="0"></div>`,
    );
  });

  test(`escape`, () => {
    strictEqual(
      renderToString(T('a"b&c<>d')),
      `<div attr="a&quot;b&amp;c<>d"></div>`,
    );
  });
});

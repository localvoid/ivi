import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { renderToString } from "ivi/server";
import { htm } from "../render.js";

describe("ssr: template/style", () => {
  const T = (v: undefined | null | false | string | number) => htm`<div ~a=${v} />`;

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
      `<div style="a:0;"></div>`,
    );
  });

  test(`"0"`, () => {
    strictEqual(
      renderToString(T("0")),
      `<div style="a:0;"></div>`,
    );
  });

  test(`escape`, () => {
    strictEqual(
      renderToString(T('a"b&c<>d')),
      `<div style="a:a&quot;b&amp;c<>d;"></div>`,
    );
  });

  test(`~a={"0"} ~b={"1"}`, () => {
    strictEqual(
      renderToString(htm`<div ~a=${"0"} ~b=${"1"} />`),
      `<div style="a:0;b:1;"></div>`,
    );
  });

  test(`~a={"0"} style="b:1" ~c={"2"}`, () => {
    strictEqual(
      renderToString(htm`<div ~a=${"0"} style="b:1" ~c=${"2"} />`),
      `<div style="b:1;a:0;c:2;"></div>`,
    );
  });

  test(`~a={"0"} ~b="1" ~c={"2"}`, () => {
    strictEqual(
      renderToString(htm`<div ~a=${"0"} ~b="1" ~c=${"2"} />`),
      `<div style="b:1;a:0;c:2;"></div>`,
    );
  });

  test(`~a={"0"} style={"b:1"} ~c={"2"}`, () => {
    strictEqual(
      renderToString(htm`<div ~a=${"0"} style=${"b:1"} ~c=${"2"} />`),
      `<div style="b:1" style="a:0;c:2;"></div>`,
    );
  });
});

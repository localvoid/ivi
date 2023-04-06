import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { renderToString } from "ivi/server";
import { htm } from "../render.js";

describe("ssr: template/text", () => {
  test(`<div>a</div>`, () => {
    strictEqual(
      renderToString(htm`<div>a</div>`),
      `<div>a</div>`,
    );
  });

  test(`<div>{""}</div>`, () => {
    strictEqual(
      renderToString(htm`<div>${""}</div>`),
      `<div></div>`,
    );
  });

  test(`<div>{"a"}</div>`, () => {
    strictEqual(
      renderToString(htm`<div>${"a"}</div>`),
      `<div>a</div>`,
    );
  });

  test(`<div>a{"b"}</div>`, () => {
    strictEqual(
      renderToString(htm`<div>a${"b"}</div>`),
      `<div>a<!>b</div>`,
    );
  });

  test(`<div>{"a"}b</div>`, () => {
    strictEqual(
      renderToString(htm`<div>${"a"}b</div>`),
      `<div &="1">a<!>b</div>`,
    );
  });

  test(`<div>a{"b"}c</div>`, () => {
    strictEqual(
      renderToString(htm`<div>a${"b"}c</div>`),
      `<div &="1">a<!>b<!>c</div>`,
    );
  });

  test(`<div>a{["b", "c"]}d</div>`, () => {
    strictEqual(
      renderToString(htm`<div>a${["b", "c"]}d</div>`),
      `<div &="2">a<!>b<!>c<!>d</div>`,
    );
  });

  test(`<div>{"a"}{"b"}</div>`, () => {
    strictEqual(
      renderToString(htm`<div>${"a"}${"b"}</div>`),
      `<div>a<!>b</div>`,
    );
  });
});

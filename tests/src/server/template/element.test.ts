import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { renderToString } from "ivi/server";
import { htm } from "../render.js";

describe("ssr: template/element", () => {
  test(`<div/>`, () => {
    strictEqual(
      renderToString(htm`<div/>`),
      `<div></div>`,
    );
  });

  test(`<div><a/></div>`, () => {
    strictEqual(
      renderToString(htm`<div><a/></div>`),
      `<div><a></a></div>`,
    );
  });

  test(`<div><a/><b/></div>`, () => {
    strictEqual(
      renderToString(htm`<div><a/><b/></div>`),
      `<div><a></a><b></b></div>`,
    );
  });

  test(`<div>a<a/>b<b/>c</div>`, () => {
    strictEqual(
      renderToString(htm`<div>a<a/>b<b/>c</div>`),
      `<div>a<a></a>b<b></b>c</div>`,
    );
  });

  test(`<div><a>a</a></div>`, () => {
    strictEqual(
      renderToString(htm`<div><a>a</a></div>`),
      `<div><a>a</a></div>`,
    );
  });

  test(`<div>a{<span/>}b</div>`, () => {
    strictEqual(
      renderToString(htm`<div>a${htm`<span/>`}b</div>`),
      `<div &="1">a<span></span>b</div>`,
    );
  });
});

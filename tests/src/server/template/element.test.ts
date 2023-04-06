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
});

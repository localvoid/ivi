import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import { renderToString } from "ivi/server";
import { htm } from "../render.js";

describe("ssr: template/propertyDiffDOM", () => {
  const T = (v: undefined | null | false | string | number) => htm`<div *a=${v} />`;

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
      `<div></div>`,
    );
  });

  test(`"0"`, () => {
    strictEqual(
      renderToString(T("0")),
      `<div></div>`,
    );
  });

  test(`input value`, () => {
    strictEqual(
      renderToString(htm`<input *value=${"a"} />`),
      `<input value="a">`,
    );
  });

  test(`input checked={true}`, () => {
    strictEqual(
      renderToString(htm`<input *checked=${true} />`),
      `<input checked>`,
    );
  });

  test(`input checked={false}`, () => {
    strictEqual(
      renderToString(htm`<input *checked=${false} />`),
      `<input>`,
    );
  });

  test(`input checked={undefined}`, () => {
    strictEqual(
      renderToString(htm`<input *checked=${void 0} />`),
      `<input>`,
    );
  });

  test(`input checked={null}`, () => {
    strictEqual(
      renderToString(htm`<input *checked=${null} />`),
      `<input>`,
    );
  });

  test(`option selected={true}`, () => {
    strictEqual(
      renderToString(htm`<option *selected=${true} />`),
      `<option selected></option>`,
    );
  });

  test(`option selected={false}`, () => {
    strictEqual(
      renderToString(htm`<option *selected=${false} />`),
      `<option></option>`,
    );
  });

  test(`textarea value={undefined}`, () => {
    strictEqual(
      renderToString(htm`<textarea *value=${void 0} />`),
      `<textarea></textarea>`,
    );
  });

  test(`textarea value={null}`, () => {
    strictEqual(
      renderToString(htm`<textarea *value=${null} />`),
      `<textarea></textarea>`,
    );
  });

  test(`textarea value={""}`, () => {
    strictEqual(
      renderToString(htm`<textarea *value=${""} />`),
      `<textarea></textarea>`,
    );
  });

  test(`textarea value={"<a>&"</a>"}`, () => {
    strictEqual(
      renderToString(htm`<textarea *value=${`<a>&"</a>`} />`),
      `<textarea>&lt;a>&amp;"&lt;/a></textarea>`,
    );
  });
});

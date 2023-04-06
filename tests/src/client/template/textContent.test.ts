import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm textContent", () => {
  beforeEach(reset);

  test(`<div .textContent={"a"}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div .textContent=${"a"}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[2] Node.textContent = "a"`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`.textContent: null => "a"`, () => {
    const test = (s: string | null) => htm`
        <div .textContent=${s}></div>
      `;
    const root = createRoot();
    root.update(test(null));
    deepStrictEqual(
      trace(() => {
        root.update(test("a"));
      }),
      [
        `[2] Node.textContent = "a"`,
      ],
    );
  });

  test(`.textContent: null => ""`, () => {
    const test = (s: string | null) => htm`
        <div .textContent=${s}></div>
      `;
    const root = createRoot();
    root.update(test(null));
    deepStrictEqual(
      trace(() => {
        root.update(test(""));
      }),
      [
      ],
    );
  });

  test(`.textContent: "" => "a"`, () => {
    const test = (s: string) => htm`
        <div .textContent=${s}></div>
      `;
    const root = createRoot();
    root.update(test(""));
    deepStrictEqual(
      trace(() => {
        root.update(test("a"));
      }),
      [
        `[2] Node.textContent = "a"`,
      ],
    );
  });

  test(`.textContent: "a" => "b"`, () => {
    const test = (s: string) => htm`
        <div .textContent=${s}></div>
      `;
    const root = createRoot();
    root.update(test("a"));
    deepStrictEqual(
      trace(() => {
        root.update(test("b"));
      }),
      [
        `[2] Node.firstChild => 3`,
        `[3] Node.nodeValue = "b"`,
      ],
    );
  });
});

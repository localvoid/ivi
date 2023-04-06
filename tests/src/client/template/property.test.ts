import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm property", () => {
  beforeEach(reset);

  test(`<div .a={"0"}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div .a=${"0"}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.setProperty("a", "0")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`.a: undefined => "1"`, () => {
    const test = (s: string | undefined) => htm`
        <div .a=${s}></div>
      `;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(test(void 0));
      }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(test("1"));
      }),
      [
        `[2] Element.setProperty("a", "1")`,
      ],
    );
  });

  test(`.a: "1" => undefined => "2`, () => {
    const test = (s: string | undefined) => htm`
        <div .a=${s}></div>
      `;
    const root = createRoot();
    root.update(test("1"));
    deepStrictEqual(
      trace(() => {
        root.update(test(void 0));
      }),
      [
        `[2] Element.setProperty("a", undefined)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(test("2"));
      }),
      [
        `[2] Element.setProperty("a", "2")`,
      ],
    );
  });
});

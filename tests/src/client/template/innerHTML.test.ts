import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm innerHTML", () => {
  beforeEach(reset);

  test(`undefined`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div .innerHTML=${void 0}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });
});

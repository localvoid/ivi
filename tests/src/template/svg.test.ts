import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { svg } from "@ivi/htm";

describe("@ivi/htm svg", () => {
  beforeEach(reset);
  const T = (v: undefined | null | false | string | number) => svg`<a ~a=${v} />`;

  test(`~style: "0" => "1"`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(T("0")); }),
      [
        `createElementNS("http://www.w3.org/2000/svg", "a") => 2`,
        `[2] SVGElement.style`,
        `[2] style.setProperty("a", "0")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(T("1")); }),
      [
        `[2] SVGElement.style`,
        `[2] style.setProperty("a", "1")`,
      ],
    );
  });
});

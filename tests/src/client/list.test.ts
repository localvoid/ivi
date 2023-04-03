import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { List } from "ivi";

const r = (i: number) => i;

describe("List", () => {
  beforeEach(reset);

  test(`[]`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0], r, r),
        );
      }),
      [
        `createTextNode(0) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`[0]`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0], r, r),
        );
      }),
      [
        `createTextNode(0) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`[0, 1]`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1], r, r),
        );
      }),
      [
        `createTextNode(1) => 2`,
        `[1] Node.insertBefore(2, null)`,
        `createTextNode(0) => 3`,
        `[1] Node.insertBefore(3, 2)`,
      ],
    );
  });

  test(`[0, 1] => [1, 0]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([1, 0], r, r),
        );
      }),
      [
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });
});

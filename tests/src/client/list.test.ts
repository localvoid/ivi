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

  test(`[] => []`, () => {
    const root = createRoot();
    root.update(
      List([], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([], r, r),
        );
      }),
      [
      ],
    );
  });

  test(`[0] => [0]`, () => {
    const root = createRoot();
    root.update(
      List([0], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0], r, r),
        );
      }),
      [
      ],
    );
  });

  test(`[0] => [1]`, () => {
    const root = createRoot();
    root.update(
      List([0], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([1], r, r),
        );
      }),
      [
        `[1] Node.removeChild(2)`,
        `createTextNode(1) => 3`,
        `[1] Node.insertBefore(3, null)`,
      ],
    );
  });

  test(`[0, 1, 2] => [0, 1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2], r, r),
        );
      }),
      [

      ],
    );
  });

  test(`[] => [0]`, () => {
    const root = createRoot();
    root.update(
      List([], r, r),
    );
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

  test(`[] => [0, 1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2], r, r),
        );
      }),
      [
        `createTextNode(2) => 2`,
        `[1] Node.insertBefore(2, null)`,
        `createTextNode(1) => 3`,
        `[1] Node.insertBefore(3, 2)`,
        `createTextNode(0) => 4`,
        `[1] Node.insertBefore(4, 3)`,
      ],
    );
  });

  test(`[1] => [0, 1]`, () => {
    const root = createRoot();
    root.update(
      List([1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1], r, r),
        );
      }),
      [
        `createTextNode(0) => 3`,
        `[1] Node.insertBefore(3, 2)`,
      ],
    );
  });

  test(`[0] => [0, 1]`, () => {
    const root = createRoot();
    root.update(
      List([0], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1], r, r),
        );
      }),
      [
        `createTextNode(1) => 3`,
        `[1] Node.insertBefore(3, null)`,
      ],
    );
  });

  test(`[2] => [0, 1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2], r, r),
        );
      }),
      [
        `createTextNode(1) => 3`,
        `[1] Node.insertBefore(3, 2)`,
        `createTextNode(0) => 4`,
        `[1] Node.insertBefore(4, 3)`,
      ],
    );
  });

  test(`[0] => [0, 1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2], r, r),
        );
      }),
      [
        `createTextNode(2) => 3`,
        `[1] Node.insertBefore(3, null)`,
        `createTextNode(1) => 4`,
        `[1] Node.insertBefore(4, 3)`,
      ],
    );
  });

  test(`[1] => [0, 1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2], r, r),
        );
      }),
      [
        `createTextNode(2) => 3`,
        `[1] Node.insertBefore(3, null)`,
        `createTextNode(0) => 4`,
        `[1] Node.insertBefore(4, 2)`,
      ],
    );
  });

  test(`[2] => [0, 1, 2, 3, 4]`, () => {
    const root = createRoot();
    root.update(
      List([2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3, 4], r, r),
        );
      }),
      [
        `createTextNode(4) => 3`,
        `[1] Node.insertBefore(3, null)`,
        `createTextNode(3) => 4`,
        `[1] Node.insertBefore(4, 3)`,
        `createTextNode(1) => 5`,
        `[1] Node.insertBefore(5, 2)`,
        `createTextNode(0) => 6`,
        `[1] Node.insertBefore(6, 5)`,
      ],
    );
  });

  test(`[1, 2] => [0, 1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([1, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2], r, r),
        );
      }),
      [
        `createTextNode(0) => 4`,
        `[1] Node.insertBefore(4, 3)`,
      ],
    );
  });

  test(`[0, 2] => [0, 1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2], r, r),
        );
      }),
      [
        `createTextNode(1) => 4`,
        `[1] Node.insertBefore(4, 2)`,
      ],
    );
  });

  test(`[2, 3] => [0, 1, 2, 3]`, () => {
    const root = createRoot();
    root.update(
      List([2, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3], r, r),
        );
      }),
      [
        `createTextNode(1) => 4`,
        `[1] Node.insertBefore(4, 3)`,
        `createTextNode(0) => 5`,
        `[1] Node.insertBefore(5, 4)`,
      ],
    );
  });

  test(`[0, 1] => [0, 1, 2, 3]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3], r, r),
        );
      }),
      [
        `createTextNode(3) => 4`,
        `[1] Node.insertBefore(4, null)`,
        `createTextNode(2) => 5`,
        `[1] Node.insertBefore(5, 4)`,
      ],
    );
  });

  test(`[1, 3] => [0, 1, 2, 3, 4]`, () => {
    const root = createRoot();
    root.update(
      List([1, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3, 4], r, r),
        );
      }),
      [
        `createTextNode(4) => 4`,
        `[1] Node.insertBefore(4, null)`,
        `createTextNode(2) => 5`,
        `[1] Node.insertBefore(5, 2)`,
        `createTextNode(0) => 6`,
        `[1] Node.insertBefore(6, 3)`,
      ],
    );
  });

  test(`[2, 5] => [0, 1, 2, 3, 4, 5]`, () => {
    const root = createRoot();
    root.update(
      List([2, 5], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3, 4, 5], r, r),
        );
      }),
      [
        `createTextNode(4) => 4`,
        `[1] Node.insertBefore(4, 2)`,
        `createTextNode(3) => 5`,
        `[1] Node.insertBefore(5, 4)`,
        `createTextNode(1) => 6`,
        `[1] Node.insertBefore(6, 3)`,
        `createTextNode(0) => 7`,
        `[1] Node.insertBefore(7, 6)`,
      ],
    );
  });

  test(`[1, 3] => [0, 1, 2, 3]`, () => {
    const root = createRoot();
    root.update(
      List([1, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3], r, r),
        );
      }),
      [
        `createTextNode(2) => 4`,
        `[1] Node.insertBefore(4, 2)`,
        `createTextNode(0) => 5`,
        `[1] Node.insertBefore(5, 3)`,
      ],
    );
  });

  test(`[0, 2] => [0, 1, 2, 3]`, () => {
    const root = createRoot();
    root.update(
      List([0, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3], r, r),
        );
      }),
      [
        `createTextNode(3) => 4`,
        `[1] Node.insertBefore(4, null)`,
        `createTextNode(1) => 5`,
        `[1] Node.insertBefore(5, 2)`,
      ],
    );
  });

  test(`[2, 5] => [0, 1, 2, 3, 4, 5]`, () => {
    const root = createRoot();
    root.update(
      List([2, 5], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3, 4, 5], r, r),
        );
      }),
      [
        `createTextNode(4) => 4`,
        `[1] Node.insertBefore(4, 2)`,
        `createTextNode(3) => 5`,
        `[1] Node.insertBefore(5, 4)`,
        `createTextNode(1) => 6`,
        `[1] Node.insertBefore(6, 3)`,
        `createTextNode(0) => 7`,
        `[1] Node.insertBefore(7, 6)`,
      ],
    );
  });

  test(`[0, 3] => [0, 1, 2, 3, 4, 5]`, () => {
    const root = createRoot();
    root.update(
      List([0, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 3, 4, 5], r, r),
        );
      }),
      [
        `createTextNode(5) => 4`,
        `[1] Node.insertBefore(4, null)`,
        `createTextNode(4) => 5`,
        `[1] Node.insertBefore(5, 4)`,
        `createTextNode(2) => 6`,
        `[1] Node.insertBefore(6, 2)`,
        `createTextNode(1) => 7`,
        `[1] Node.insertBefore(7, 6)`,
      ],
    );
  });

  test(`[0] => []`, () => {
    const root = createRoot();
    root.update(
      List([0], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([], r, r),
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[0, 1] => [1]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([1], r, r),
        );
      }),
      [
        `[1] Node.removeChild(3)`,
      ],
    );
  });

  test(`[0, 1] => [0]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0], r, r),
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[0, 1, 2] => [1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([1, 2], r, r),
        );
      }),
      [
        `[1] Node.removeChild(4)`,
      ],
    );
  });

  test(`[0, 1, 2] => [0, 1]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1], r, r),
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[0, 1, 2] => [0, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 2], r, r),
        );
      }),
      [
        `[1] Node.removeChild(3)`,
        `[1] Node.removeChild(2)`,
        `createTextNode(2) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test(`[0, 1] => []`, () => {
    const root = createRoot();
    root.update(
      List([0, 1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([], r, r),
        );
      }),
      [
        `[1] Node.removeChild(3)`,
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[0, 1, 2] => [2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([2], r, r),
        );
      }),
      [
        `[1] Node.removeChild(4)`,
        `[1] Node.removeChild(3)`,
      ],
    );
  });

  test(`[0, 1, 2] => [0, 1]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1], r, r),
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[0, 1, 2, 3] => [2, 3]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([2, 3], r, r),
        );
      }),
      [
        `[1] Node.removeChild(5)`,
        `[1] Node.removeChild(4)`,
      ],
    );
  });

  test(`[0, 1, 2, 3] => [0, 1]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1], r, r),
        );
      }),
      [
        `[1] Node.removeChild(3)`,
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[0, 1, 2, 3] => [1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([1, 2], r, r),
        );
      }),
      [
        `[1] Node.removeChild(5)`,
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[0, 1, 2, 3] => [0, 3]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2, 3], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 3], r, r),
        );
      }),
      [
        `[1] Node.removeChild(4)`,
        `[1] Node.removeChild(3)`,
      ],
    );
  });

  test(`[0, 1, 2, 3, 4, 5] => [0, 1, 2, 4]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2, 3, 4, 5], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([0, 1, 2, 4], r, r),
        );
      }),
      [
        `[1] Node.removeChild(4)`,
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[0] => [1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([1, 2], r, r),
        );
      }),
      [
        `[1] Node.removeChild(2)`,
        `createTextNode(2) => 3`,
        `[1] Node.insertBefore(3, null)`,
        `createTextNode(1) => 4`,
        `[1] Node.insertBefore(4, 3)`,
      ],
    );
  });

  test(`[0, 1] => [2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([2], r, r),
        );
      }),
      [
        `[1] Node.removeChild(3)`,
        `[1] Node.removeChild(2)`,
        `createTextNode(2) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`[0, 2] => [1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([1, 2], r, r),
        );
      }),
      [
        `[1] Node.removeChild(3)`,
        `createTextNode(1) => 4`,
        `[1] Node.insertBefore(4, 2)`,
      ],
    );
  });

  test(`[0, 1] => [1, 2]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([1, 2], r, r),
        );
      }),
      [
        `[1] Node.removeChild(3)`,
        `createTextNode(2) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`[0, 1, 2] => [3, 4, 5]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([3, 4, 5], r, r),
        );
      }),
      [
        `[1] Node.removeChild(4)`,
        `[1] Node.removeChild(3)`,
        `[1] Node.removeChild(2)`,
        `createTextNode(5) => 5`,
        `[1] Node.insertBefore(5, null)`,
        `createTextNode(4) => 6`,
        `[1] Node.insertBefore(6, 5)`,
        `createTextNode(3) => 7`,
        `[1] Node.insertBefore(7, 6)`,
      ],
    );
  });

  test(`[0, 1, 2] => [2, 4, 5]`, () => {
    const root = createRoot();
    root.update(
      List([0, 1, 2], r, r),
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          List([2, 4, 5], r, r),
        );
      }),
      [
        `[1] Node.removeChild(4)`,
        `[1] Node.removeChild(3)`,
        `createTextNode(5) => 5`,
        `[1] Node.insertBefore(5, null)`,
        `createTextNode(4) => 6`,
        `[1] Node.insertBefore(6, 5)`,
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
        `[1] Node.insertBefore(2, 3)`,
      ],
    );
  });
});

import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";

describe("hole", () => {
  beforeEach(reset);

  test(`null`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          null,
        );
      }),
      [
      ],
    );
  });

  test(`undefined`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          void 0,
        );
      }),
      [
      ],
    );
  });

  test(`false`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          false,
        );
      }),
      [
      ],
    );
  });

  test(`"a" => null => "b"`, () => {
    const root = createRoot();
    root.update(
      "a",
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          null,
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(
          "b",
        );
      }),
      [
        `createTextNode("b") => 3`,
        `[1] Node.insertBefore(3, null)`,
      ],
    );
  });

  test(`"a" => undefined => "b"`, () => {
    const root = createRoot();
    root.update(
      "a",
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          void 0,
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(
          "b",
        );
      }),
      [
        `createTextNode("b") => 3`,
        `[1] Node.insertBefore(3, null)`,
      ],
    );
  });

  test(`"a" => false => "b"`, () => {
    const root = createRoot();
    root.update(
      "a",
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          false,
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(
          "b",
        );
      }),
      [
        `createTextNode("b") => 3`,
        `[1] Node.insertBefore(3, null)`,
      ],
    );
  });
});

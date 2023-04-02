import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";

describe("arrays", () => {
  beforeEach(reset);

  test(`[]`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          [],
        );
      }),
      [
      ],
    );
  });

  test(`["a"]`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
          ],
        );
      }),
      [
        `createTextNode("a") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`["a", "b"]`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
            "b",
          ],
        );
      }),
      [
        `createTextNode("b") => 2`,
        `[1] Node.insertBefore(2, null)`,
        `createTextNode("a") => 3`,
        `[1] Node.insertBefore(3, 2)`,
      ],
    );
  });

  test(`["a", null, "b"]`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
            null,
            "b",
          ],
        );
      }),
      [
        `createTextNode("b") => 2`,
        `[1] Node.insertBefore(2, null)`,
        `createTextNode("a") => 3`,
        `[1] Node.insertBefore(3, 2)`,
      ],
    );
  });

  test(`[] => []`, () => {
    const root = createRoot();
    root.update(
      [],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [],
        );
      }),
      [
      ],
    );
  });

  test(`[] => null`, () => {
    const root = createRoot();
    root.update(
      [],
    );
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

  test(`["a"] => []`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [],
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`["a", "b"] => []`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
        "b",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [],
        );
      }),
      [
        `[1] Node.removeChild(2)`,
        `[1] Node.removeChild(3)`,
      ],
    );
  });

  test(`["a", null, "b"] => []`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
        null,
        "b",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [],
        );
      }),
      [
        `[1] Node.removeChild(2)`,
        `[1] Node.removeChild(3)`,
      ],
    );
  });

  test(`["a"] => null`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
      ],
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
  });

  test(`["a", "b"] => null`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
        "b",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          null,
        );
      }),
      [
        `[1] Node.removeChild(3)`,
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`["a", null, "b"] => null`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
        null,
        "b",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          null,
        );
      }),
      [
        `[1] Node.removeChild(3)`,
        `[1] Node.removeChild(2)`,
      ],
    );
  });

  test(`[] => ["a"]`, () => {
    const root = createRoot();
    root.update(
      [],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
          ],
        );
      }),
      [
        `createTextNode("a") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`[] => ["a", "b"]`, () => {
    const root = createRoot();
    root.update(
      [],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
            "b",
          ],
        );
      }),
      [
        `createTextNode("b") => 2`,
        `[1] Node.insertBefore(2, null)`,
        `createTextNode("a") => 3`,
        `[1] Node.insertBefore(3, 2)`,
      ],
    );
  });

  test(`[] => ["a", null, "b"]`, () => {
    const root = createRoot();
    root.update(
      [],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
            null,
            "b",
          ],
        );
      }),
      [
        `createTextNode("b") => 2`,
        `[1] Node.insertBefore(2, null)`,
        `createTextNode("a") => 3`,
        `[1] Node.insertBefore(3, 2)`,
      ],
    );
  });

  test(`["a"] => ["a"]`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
          ],
        );
      }),
      [
      ],
    );
  });

  test(`["a", "b"] => ["a", "b"]`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
        "b",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
            "b",
          ],
        );
      }),
      [
      ],
    );
  });

  test(`["a", null, "b"] => ["a", null, "b"]`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
        null,
        "b",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
            null,
            "b",
          ],
        );
      }),
      [
      ],
    );
  });

  test(`["a"] => ["b"]`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "b",
          ],
        );
      }),
      [
        `[2] Node.nodeValue = "b"`,
      ],
    );
  });

  test(`["a", null, "c"] => ["a", "b", "c"]`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
        null,
        "c",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
            "b",
            "c",
          ],
        );
      }),
      [
        `createTextNode("b") => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`["a", null, "c"] => ["a", null]`, () => {
    const root = createRoot();
    root.update(
      [
        "a",
        null,
        "c",
      ],
    );
    deepStrictEqual(
      trace(() => {
        root.update(
          [
            "a",
            null,
          ],
        );
      }),
      [
        `[1] Node.removeChild(2)`,
      ],
    );
  });
});

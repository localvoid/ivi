import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "bun:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";

describe("text", () => {
  beforeEach(reset);

  test(`""`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(""); }),
      [],
    );
  });

  test(`"a"`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update("a"); }),
      [
        `createTextNode("a") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`0`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(0); }),
      [
        `createTextNode(0) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`1`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.update(1); }),
      [
        `createTextNode(1) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`null => "a"`, () => {
    const root = createRoot();
    root.update(null);
    deepStrictEqual(
      trace(() => { root.update("a"); }),
      [
        `createTextNode("a") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`null => 0`, () => {
    const root = createRoot();
    root.update(null);
    deepStrictEqual(
      trace(() => { root.update(0); }),
      [
        `createTextNode(0) => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`"a" => null`, () => {
    const root = createRoot();
    root.update("a");
    deepStrictEqual(
      trace(() => { root.update(null); }),
      [`[1] Node.removeChild(2)`],
    );
  });

  test(`1 => null`, () => {
    const root = createRoot();
    root.update(1);
    deepStrictEqual(
      trace(() => { root.update(null); }),
      [`[1] Node.removeChild(2)`],
    );
  });

  test(`"0" => "0"`, () => {
    const root = createRoot();
    root.update("0");
    deepStrictEqual(
      trace(() => { root.update("0"); }),
      [],
    );
  });

  test(`0 => 0`, () => {
    const root = createRoot();
    root.update(0);
    deepStrictEqual(
      trace(() => { root.update(0); }),
      [],
    );
  });

  test(`"0" => 0`, () => {
    const root = createRoot();
    root.update("0");
    deepStrictEqual(
      trace(() => { root.update(0); }),
      [`[2] Node.nodeValue = 0`],
    );
  });

  test(`0 => "0"`, () => {
    const root = createRoot();
    root.update(0);
    deepStrictEqual(
      trace(() => { root.update("0"); }),
      [`[2] Node.nodeValue = "0"`],
    );
  });

  test(`0 => 1`, () => {
    const root = createRoot();
    root.update(0);
    deepStrictEqual(
      trace(() => { root.update(1); }),
      [`[2] Node.nodeValue = 1`],
    );
  });

  test(`"a" => "b"`, () => {
    const root = createRoot();
    root.update("a");
    deepStrictEqual(
      trace(() => { root.update("b"); }),
      [`[2] Node.nodeValue = "b"`],
    );
  });
});

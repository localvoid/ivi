import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { List } from "ivi";
import { htm } from "@ivi/htm";

describe("hydrate/event", () => {
  beforeEach(reset);

  const r = (i: number) => i;
  const T = (entries: number[]) => htm`<div>${List(entries, r, r)}</div>`;

  test(`[] => [1, 2]`, () => {
    document.body.innerHTML = `<div></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(T([])); }),
      [
        `[1] Node.lastChild => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(T([1, 2])); }),
      [
        `createTextNode(2) => 4`,
        `[3] Node.insertBefore(4, null)`,
        `createTextNode(1) => 5`,
        `[3] Node.insertBefore(5, 4)`,
      ],
    );
  });

  test(`[1, 2] => [2, 1]`, () => {
    document.body.innerHTML = `<div>1<!>2</div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(T([1, 2])); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.lastChild => 6`,
        `[6] Node.nodeType => 3`,
        `[6] Node.previousSibling => 5`,
        `[5] Node.nodeType => 8`,
        `[5] Node.previousSibling => 4`,
        `[5] Node.remove()`,
        `[4] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(T([2, 1])); }),
      [
        `[3] Node.insertBefore(6, 4)`,
      ],
    );
  });
});

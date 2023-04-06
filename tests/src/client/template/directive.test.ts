import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm directive", () => {
  beforeEach(reset);

  test(`<div><span \${onMount}></span></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        let e: any;
        let h: boolean | undefined;
        const onMount = (element: Element, hydrate: boolean) => {
          e = element;
          h = hydrate;
        };
        root.update(htm`
          <div>
            <span ${onMount}></span>
          </div>
        `);
        strictEqual((e as any).uid, 6);
        strictEqual(h, void 0);
      }),
      [
        `[-7] Template.innerHTML = "<div><span></span></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[5] Node.firstChild => 6`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });
});

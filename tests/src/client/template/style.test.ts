import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm style", () => {
  beforeEach(reset);

  test(`<div ~top="10px"></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div ~top="10px"></div>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<div style="top:10px"></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`<div style="left:5px" ~top="10px"></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div style="left:5px" ~top="10px"></div>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<div style="left:5px;top:10px"></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`<div ~top={"10px"}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div ~top=${"10px"}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[2] HTMLElement.style`,
        `[2] style.setProperty("top", "10px")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`style: "1" => undefined`, () => {
    const test = (s: string | undefined) => htm`
        <div ~a=${s}></div>
      `;
    const root = createRoot();
    root.update(test("1"));
    deepStrictEqual(
      trace(() => {
        root.update(test(void 0));
      }),
      [
        `[2] HTMLElement.style`,
        `[2] style.removeProperty("a")`,
      ],
    );
  });
});

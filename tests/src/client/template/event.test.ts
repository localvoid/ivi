import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace, emit } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm style", () => {
  beforeEach(reset);

  test(`<div @click={onClick}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        let clicked = 0;
        const onClick = () => { clicked++; };
        root.update(htm`
          <div @click=${onClick}></div>
        `);
        emit(root.findDOMNode(), "click");
        strictEqual(clicked, 1);
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.addEventListener("click", onClick)`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });
});

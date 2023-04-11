import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("hydrate/text", () => {
  beforeEach(reset);

  test(`1`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        a
        ${[
          a,
          b,
        ]}
        b
      </div>`
    );

    document.body.innerHTML = `<div &="2">a<!>1<!>2<!>b</div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[4] Node.nextSibling => 5`,
        `[3] Element.getAttribute("&") => "2"`,
        `[5] Node.nodeType => 8`,
        `[5] Node.nextSibling => 6`,
        `[5] Node.remove()`,
        `[6] Node.nextSibling => 7`,
        `[7] Node.nodeType => 8`,
        `[7] Node.nextSibling => 8`,
        `[7] Node.remove()`,
        `[8] Node.nextSibling => 9`,
        `[9] Node.nodeType => 8`,
        `[9] Node.nextSibling => 10`,
        `[9] Node.remove()`,
        `[10] Node.previousSibling => 8`,
        `[8] Node.nodeType => 3`,
        `[8] Node.previousSibling => 6`,
        `[6] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[8] Node.nodeValue = 6`,
        `[6] Node.nodeValue = 5`,
      ],
    );
  });
});

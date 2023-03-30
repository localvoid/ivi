import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace, emit, toSnapshot } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "../index.js";
import { component, invalidate } from "ivi";

describe("hydrate", () => {
  beforeEach(() => {
    reset();
  });

  test(`<div></div>`, () => {
    document.body.innerHTML = `<div></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.hydrate(
          htm`<div></div>`,
        );
      }),
      [
        "[1] Node.lastChild",
      ]
    );
    strictEqual(toSnapshot(root.findDOMNode()), `<DIV#3/>`);
  });

  test(`1`, () => {
    const Test = component((c) => {
      let _i = 1;
      const onClick = () => {
        _i++;
        invalidate(c);
      };
      return () => htm`
        <div>
          <span>${_i}</span>
          <button @click=${onClick}></button>
        </div>
      `;
    });

    document.body.innerHTML = `<div><span>1</span><button>Click Me</button></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test()); }),
      [
        `[1] Node.lastChild`,
        `[3] Node.firstChild`,
        `[4] Node.nextSibling`,
        `[6] Element.addEventListener("click", onClick)`,
        `[4] Node.lastChild`,
      ],
    );
    strictEqual(toSnapshot(root.findDOMNode()), `
<DIV#3>
  <SPAN#4>
    <TEXT#5>1</TEXT#5>
  </SPAN#4>
  <BUTTON#6
    @click=[onClick]
  >
    <TEXT#7>Click Me</TEXT#7>
  </BUTTON#6>
</DIV#3>
`.trim());

    emit(document.body.firstChild!.firstChild!.nextSibling!, "click");
    strictEqual(root.isDirty, true);
    deepStrictEqual(
      trace(() => { root.dirtyCheck(); }),
      [
        `[5] Node.nodeValue = 2`,
      ],
    );
    strictEqual(toSnapshot(root.findDOMNode()), `
<DIV#3>
  <SPAN#4>
    <TEXT#5>2</TEXT#5>
  </SPAN#4>
  <BUTTON#6
    @click=[onClick]
  >
    <TEXT#7>Click Me</TEXT#7>
  </BUTTON#6>
</DIV#3>
`.trim());
  });
});

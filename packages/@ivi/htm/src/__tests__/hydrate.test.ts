import { strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import "@ivi/mock-dom/global";
import { reset, emit, toSnapshot } from "@ivi/mock-dom";
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
    root.hydrate(
      htm`<div></div>`,
    );
    strictEqual(toSnapshot(root.findDOMNode()), `<DIV#2/>`);
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
    root.hydrate(Test());
    strictEqual(toSnapshot(root.findDOMNode()), `
<DIV#2>
  <SPAN#3>
    <TEXT#4>
      1
    </TEXT#4>
  </SPAN#3>
  <BUTTON#5
    @click=1
  >
    <TEXT#6>
      Click Me
    </TEXT#6>
  </BUTTON#5>
</DIV#2>
`.trim());

    emit(document.body.firstChild!.firstChild!.nextSibling!, "click");
    strictEqual(root.isDirty, true);
    root.dirtyCheck();
    strictEqual(toSnapshot(root.findDOMNode()), `
<DIV#2>
  <SPAN#3>
    <TEXT#4>
      2
    </TEXT#4>
  </SPAN#3>
  <BUTTON#5
    @click=1
  >
    <TEXT#6>
      Click Me
    </TEXT#6>
  </BUTTON#5>
</DIV#2>
`.trim());
  });
});

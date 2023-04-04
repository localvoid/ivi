import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace, emit } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";
import { component, invalidate } from "ivi";

describe("hydrate", () => {
  beforeEach(reset);

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
        "[1] Node.lastChild => 3",
      ]
    );
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
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[4] Node.nextSibling => 6`,
        `[6] Element.addEventListener("click", onClick)`,
        `[4] Node.lastChild => 5`,
      ],
    );

    emit(document.body.firstChild!.firstChild!.nextSibling!, "click");
    strictEqual(root.isDirty, true);
    deepStrictEqual(
      trace(() => { root.dirtyCheck(); }),
      [
        `[5] Node.nodeValue = 2`,
      ],
    );
  });

  test(`element directive`, () => {
    document.body.innerHTML = `<div></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        let e: any;
        let h: boolean | undefined;
        const directive = (element: Element, hydrate?: boolean) => {
          e = element;
          h = hydrate;
        };
        root.hydrate(
          htm`<div ${directive}></div>`,
        );
        strictEqual(e.uid, 3);
        strictEqual(h, true);
      }),
      [
        "[1] Node.lastChild => 3",
      ]
    );
  });
});

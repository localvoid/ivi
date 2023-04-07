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
        `[5] Node.nodeType => 3`,
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

  test(`2`, () => {
    const Test = (a: number, b: number) => htm`<div>${[a, b]}3</div>`;

    document.body.innerHTML = `<div &="2">1<!>2<!>3</div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[3] Element.getAttribute("&") => "2"`,
        `[4] Node.nextSibling => 5`,
        `[5] Node.nodeType => 8`,
        `[5] Node.nextSibling => 6`,
        `[5] Node.remove()`,
        `[6] Node.nextSibling => 7`,
        `[7] Node.nodeType => 8`,
        `[7] Node.nextSibling => 8`,
        `[7] Node.remove()`,
        `[8] Node.previousSibling => 6`,
        `[6] Node.nodeType => 3`,
        `[6] Node.previousSibling => 4`,
        `[4] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[6] Node.nodeValue = 6`,
        `[4] Node.nodeValue = 5`,
      ],
    );
  });

  test(`3`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        ${[
          htm`<a>${a}</a>`,
          htm`<b>${b}</b>`,
        ]}
        <c/>
      </div>`
    );

    document.body.innerHTML = `<div &="2"><a>1</a><b>2</b><c></c></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[3] Element.getAttribute("&") => "2"`,
        `[4] Node.nextSibling => 6`,
        `[6] Node.nodeType => 1`,
        `[6] Node.nextSibling => 8`,
        `[8] Node.nodeType => 1`,
        `[8] Node.previousSibling => 6`,
        `[6] Node.lastChild => 7`,
        `[7] Node.nodeType => 3`,
        `[6] Node.previousSibling => 4`,
        `[4] Node.lastChild => 5`,
        `[5] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[7] Node.nodeValue = 6`,
        `[5] Node.nodeValue = 5`,
      ],
    );
  });

  test(`4`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        ${"a"}
        ${[
          htm`<a>${a}</a>`,
          htm`<b>${b}</b>`,
        ]}
        <c/>
      </div>`
    );

    document.body.innerHTML = `<div &="3">a<a>1</a><b>2</b><c></c></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[3] Element.getAttribute("&") => "3"`,
        `[4] Node.nextSibling => 5`,
        `[5] Node.nodeType => 1`,
        `[5] Node.nextSibling => 7`,
        `[7] Node.nodeType => 1`,
        `[7] Node.nextSibling => 9`,
        `[9] Node.nodeType => 1`,
        `[9] Node.previousSibling => 7`,
        `[7] Node.lastChild => 8`,
        `[8] Node.nodeType => 3`,
        `[7] Node.previousSibling => 5`,
        `[5] Node.lastChild => 6`,
        `[6] Node.nodeType => 3`,
        `[5] Node.previousSibling => 4`,
        `[4] Node.nodeType => 3`,
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

  test(`5`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        ${a}
        <a/>
        ${b}
      </div>`
    );

    document.body.innerHTML = `<div &="1">1<a></a>2</div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[3] Element.getAttribute("&") => "1"`,
        `[4] Node.nextSibling => 5`,
        `[5] Node.nodeType => 1`,
        `[3] Node.lastChild => 6`,
        `[6] Node.nodeType => 3`,
        `[5] Node.previousSibling => 4`,
        `[4] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[6] Node.nodeValue = 6`,
        `[4] Node.nodeValue = 5`,
      ],
    );
  });

  test(`6`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        ${htm`
          ${a}
          <a/>
          ${b}
          <b/>
        `
        }
      </div>
      `
    );

    document.body.innerHTML = `<div>1<a></a>2<b></b></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.lastChild => 7`,
        `[7] Node.previousSibling => 6`,
        `[6] Node.nodeType => 3`,
        `[6] Node.previousSibling => 5`,
        `[5] Node.previousSibling => 4`,
        `[4] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[6] Node.nodeValue = 6`,
        `[4] Node.nodeValue = 5`,
      ],
    );
  });

  test(`7`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        ${["", a, "", b]}
        <b/>
      </div>`
    );

    document.body.innerHTML = `<div &="2">1<!>2<b></b></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[3] Element.getAttribute("&") => "2"`,
        `[4] Node.nextSibling => 5`,
        `[5] Node.nodeType => 8`,
        `[5] Node.nextSibling => 6`,
        `[5] Node.remove()`,
        `[6] Node.nextSibling => 7`,
        `[7] Node.nodeType => 1`,
        `[7] Node.previousSibling => 6`,
        `[6] Node.nodeType => 3`,
        `[6] Node.previousSibling => 4`,
        `[4] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[6] Node.nodeValue = 6`,
        `[4] Node.nodeValue = 5`,
      ],
    );
  });

  test(`8`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        ${[false, a, false, b]}
        <b/>
      </div>`
    );

    document.body.innerHTML = `<div &="2">1<!>2<b></b></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[3] Element.getAttribute("&") => "2"`,
        `[4] Node.nextSibling => 5`,
        `[5] Node.nodeType => 8`,
        `[5] Node.nextSibling => 6`,
        `[5] Node.remove()`,
        `[6] Node.nextSibling => 7`,
        `[7] Node.nodeType => 1`,
        `[7] Node.previousSibling => 6`,
        `[6] Node.nodeType => 3`,
        `[6] Node.previousSibling => 4`,
        `[4] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[6] Node.nodeValue = 6`,
        `[4] Node.nodeValue = 5`,
      ],
    );
  });

  test(`9`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        ${[null, a, null, b]}
        <b/>
      </div>`
    );

    document.body.innerHTML = `<div &="2">1<!>2<b></b></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[3] Element.getAttribute("&") => "2"`,
        `[4] Node.nextSibling => 5`,
        `[5] Node.nodeType => 8`,
        `[5] Node.nextSibling => 6`,
        `[5] Node.remove()`,
        `[6] Node.nextSibling => 7`,
        `[7] Node.nodeType => 1`,
        `[7] Node.previousSibling => 6`,
        `[6] Node.nodeType => 3`,
        `[6] Node.previousSibling => 4`,
        `[4] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[6] Node.nodeValue = 6`,
        `[4] Node.nodeValue = 5`,
      ],
    );
  });

  test(`10`, () => {
    const Test = (a: number, b: number) => (
      htm`
      <div>
        ${[void 0, a, void 0, b]}
        <b/>
      </div>`
    );

    document.body.innerHTML = `<div &="2">1<!>2<b></b></div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => { root.hydrate(Test(1, 2)); }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Node.firstChild => 4`,
        `[3] Element.getAttribute("&") => "2"`,
        `[4] Node.nextSibling => 5`,
        `[5] Node.nodeType => 8`,
        `[5] Node.nextSibling => 6`,
        `[5] Node.remove()`,
        `[6] Node.nextSibling => 7`,
        `[7] Node.nodeType => 1`,
        `[7] Node.previousSibling => 6`,
        `[6] Node.nodeType => 3`,
        `[6] Node.previousSibling => 4`,
        `[4] Node.nodeType => 3`,
      ],
    );

    deepStrictEqual(
      trace(() => { root.update(Test(5, 6)); }),
      [
        `[6] Node.nodeValue = 6`,
        `[4] Node.nodeValue = 5`,
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

  test(`input #1`, () => {
    document.body.innerHTML = `<input value="abc">`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.hydrate(
          htm`<input *value=${"abc"} />`,
        );
      }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Element.getProperty("value") => "abc"`,
      ]
    );
  });

  test(`input #2`, () => {
    document.body.innerHTML = `<input value="abc">`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.hydrate(
          htm`<input *value=${"def"} />`,
        );
      }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Element.getProperty("value") => "abc"`,
        `[3] Element.setProperty("value", "def")`,
      ]
    );
  });

  test(`textarea #1`, () => {
    document.body.innerHTML = `<textarea>abc</textarea>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.hydrate(
          htm`<textarea *value=${"abc"} />`,
        );
      }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Element.getProperty("value") => "abc"`,
      ]
    );
  });

  test(`textarea #2`, () => {
    document.body.innerHTML = `<textarea>abc</textarea>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.hydrate(
          htm`<textarea *value=${"def"} />`,
        );
      }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Element.getProperty("value") => "abc"`,
        `[3] Element.setProperty("value", "def")`,
      ]
    );
  });
});

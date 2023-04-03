import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace, emit } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "../index.js";

describe("htm", () => {
  beforeEach(reset);

  test("<h1/>", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1/>
        `);
      }),
      [
        `createElement("h1") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test("<h1></h1>", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1></h1>
        `);
      }),
      [
        `createElement("h1") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test("<h1>a</h1>", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>a</h1>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<h1>a</h1>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test("whitespace 1", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>
          </h1>
        `);
      }),
      [
        `createElement("h1") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test("whitespace 2", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>

          </h1>
        `);
      }),
      [
        `createElement("h1") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test("whitespace 3", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>  </h1>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<h1> </h1>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test("whitespace 4", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div>
            <h2></h2>
            <h2></h2>
          </div>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<div><h2></h2><h2></h2></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 6`,
        `[1] Node.insertBefore(6, null)`,
      ],
    );
  });

  test("whitespace 5", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>
            ab
          </h1>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<h1>ab</h1>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test("whitespace 6", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>
            ab
            cd
          </h1>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<h1>ab cd</h1>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test("whitespace 7", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>
            ab  cd
          </h1>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<h1>ab cd</h1>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test("whitespace 8", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>  ab  cd  </h1>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<h1> ab cd </h1>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test("whitespace 9", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>
            \vab
          </h1>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<h1> ab</h1>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test("whitespace 10", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <h1>
            ab\v
          </h1>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<h1>ab </h1>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 5`,
        `[1] Node.insertBefore(5, null)`,
      ],
    );
  });

  test("whitespace 11", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div>
            a
            <span>
              b
            </span>
          </div>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<div>a<span>b</span></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 7`,
        `[1] Node.insertBefore(7, null)`,
      ],
    );
  });

  test(`<div class="a b"></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div class="a b"></div>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<div class="a b"></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test("attr 1", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div attr></div>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<div attr></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test("attr 2", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div
            attr
          ></div>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<div attr></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`attr 3`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div attr="a"></div>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<div attr="a"></div>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 4`,
        `[1] Node.insertBefore(4, null)`,
      ],
    );
  });

  test(`<div class={"a b"}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div class=${"a b"}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.className = "a b"`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`<div attr={"a"}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div attr=${"a"}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.setAttribute("attr", "a")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`<div .a={"0"}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div .a=${"0"}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.setProperty("a", "0")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`<div *a={"1"}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div *a=${"1"}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.setProperty("a", "1")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

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
        `[2] style.setProperty(top, "10px")`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

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

  test(`<div .textContent={"a"}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div .textContent=${"a"}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[2] Node.textContent = "a"`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`<div><span \${onMount}></span></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        let e;
        const onMount = (element: Element) => { e = element; };
        root.update(htm`
          <div>
            <span ${onMount}></span>
          </div>
        `);
        strictEqual((e as any).uid, 6);
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

  test(`.textContent: "" => "a"`, () => {
    const test = (s: string) => htm`
        <div .textContent=${s}></div>
      `;
    const root = createRoot();
    root.update(test(""));
    deepStrictEqual(
      trace(() => {
        root.update(test("a"));
      }),
      [
        `[2] Node.firstChild => null`,
        `[2] Node.textContent = "a"`,
      ],
    );
  });

  test(`.textContent: "a" => "b"`, () => {
    const test = (s: string) => htm`
        <div .textContent=${s}></div>
      `;
    const root = createRoot();
    root.update(test("a"));
    deepStrictEqual(
      trace(() => {
        root.update(test("b"));
      }),
      [
        `[2] Node.firstChild => 3`,
        `[3] Node.nodeValue = "b"`,
      ],
    );
  });
});

import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "bun:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { html } from "ivi";

describe("@ivi/htm", () => {
  beforeEach(reset);

  test("<h1/>", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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

  test("void elements", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(html`
          <a>
            <audio>
            <video>
            <embed>
            <input>
            <param>
            <source>
            <track>
            <area>
            <base>
            <link>
            <meta>
            <br>
            <col>
            <hr>
            <img>
            <wbr>
          </a>
        `);
      }),
      [
        `[-7] Template.innerHTML = "<a><audio><video><embed><input><param><source><track><area><base><link><meta><br><col><hr><img><wbr></a>"`,
        `[-6] Node.firstChild => 3`,
        `[3] Node.cloneNode(true) => 20`,
        `[1] Node.insertBefore(20, null)`,
      ],
    );
  });

  test("whitespace 1", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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
        root.update(html`
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

  test("whitespace 12", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(html`
          <div>
            ${"a"} ${"b"} ${"c"}
          </div>
        `);
      }),
      [
        '[-7] Template.innerHTML = "<div> <!> </div>"',
        '[-6] Node.firstChild => 3',
        '[3] Node.cloneNode(true) => 7',
        '[7] Node.firstChild => 8',
        '[8] Node.nextSibling => 9',
        '[9] Node.nextSibling => 10',
        '[9] Node.remove()',
        'createTextNode("c") => 11',
        '[7] Node.insertBefore(11, null)',
        'createTextNode("b") => 12',
        '[7] Node.insertBefore(12, 10)',
        'createTextNode("a") => 13',
        '[7] Node.insertBefore(13, 8)',
        '[1] Node.insertBefore(7, null)',
      ],
    );
  });

  test("whitespace 13", () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(html`
          <div>
            ${"a"}\v
            ${"b"}\v
            ${"c"}
          </div>
        `);
      }),
      [
        '[-7] Template.innerHTML = "<div> <!> </div>"',
        '[-6] Node.firstChild => 3',
        '[3] Node.cloneNode(true) => 7',
        '[7] Node.firstChild => 8',
        '[8] Node.nextSibling => 9',
        '[9] Node.nextSibling => 10',
        '[9] Node.remove()',
        'createTextNode("c") => 11',
        '[7] Node.insertBefore(11, null)',
        'createTextNode("b") => 12',
        '[7] Node.insertBefore(12, 10)',
        'createTextNode("a") => 13',
        '[7] Node.insertBefore(13, 8)',
        '[1] Node.insertBefore(7, null)',
      ],
    );
  });
});

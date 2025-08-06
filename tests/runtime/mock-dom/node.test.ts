import { deepStrictEqual, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "bun:test";
import { reset, trace } from "@ivi/mock-dom/global";

describe("mock-dom/node", () => {
  beforeEach(reset);
  test("append child", () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        parent.appendChild(a);
        strictEqual(parent.firstChild, a);
        strictEqual(parent.lastChild, a);
        strictEqual(a.parentNode, parent);
        strictEqual(a.previousSibling, null);
        strictEqual(a.nextSibling, null);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `[2] Node.appendChild(3)`,
        `[2] Node.firstChild => 3`,
        `[2] Node.lastChild => 3`,
        `[3] Node.parentNode => 2`,
        `[3] Node.previousSibling => null`,
        `[3] Node.nextSibling => null`,
      ],
    );
  });

  test("append 2 child", () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        const b = document.createElement("span");
        parent.appendChild(a);
        parent.appendChild(b);
        strictEqual(parent.firstChild, a);
        strictEqual(parent.lastChild, b);
        strictEqual(a.parentNode, parent);
        strictEqual(b.parentNode, parent);

        strictEqual(a.previousSibling, null);
        strictEqual(a.nextSibling, b);
        strictEqual(b.previousSibling, a);
        strictEqual(b.nextSibling, null);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `createElement("span") => 4`,
        `[2] Node.appendChild(3)`,
        `[2] Node.appendChild(4)`,
        `[2] Node.firstChild => 3`,
        `[2] Node.lastChild => 4`,
        `[3] Node.parentNode => 2`,
        `[4] Node.parentNode => 2`,
        `[3] Node.previousSibling => null`,
        `[3] Node.nextSibling => 4`,
        `[4] Node.previousSibling => 3`,
        `[4] Node.nextSibling => null`,
      ],
    );
  });

  test("insertBefore before 1 node", () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        const b = document.createElement("span");
        parent.insertBefore(a, null);
        parent.insertBefore(b, a);
        strictEqual(parent.firstChild, b);
        strictEqual(parent.lastChild, a);
        strictEqual(a.parentNode, parent);
        strictEqual(b.parentNode, parent);

        strictEqual(a.previousSibling, b);
        strictEqual(a.nextSibling, null);
        strictEqual(b.previousSibling, null);
        strictEqual(b.nextSibling, a);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `createElement("span") => 4`,
        `[2] Node.insertBefore(3, null)`,
        `[2] Node.insertBefore(4, 3)`,
        `[2] Node.firstChild => 4`,
        `[2] Node.lastChild => 3`,
        `[3] Node.parentNode => 2`,
        `[4] Node.parentNode => 2`,
        `[3] Node.previousSibling => 4`,
        `[3] Node.nextSibling => null`,
        `[4] Node.previousSibling => null`,
        `[4] Node.nextSibling => 3`,
      ],
    );
  });

  test("insertBefore between 2 nodes", () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        const b = document.createElement("span");
        const c = document.createElement("span");
        parent.insertBefore(a, null);
        parent.insertBefore(b, null);
        parent.insertBefore(c, b);
        strictEqual(parent.firstChild, a);
        strictEqual(parent.lastChild, b);
        strictEqual(a.parentNode, parent);
        strictEqual(b.parentNode, parent);
        strictEqual(c.parentNode, parent);

        strictEqual(a.previousSibling, null);
        strictEqual(a.nextSibling, c);
        strictEqual(b.previousSibling, c);
        strictEqual(b.nextSibling, null);
        strictEqual(c.previousSibling, a);
        strictEqual(c.nextSibling, b);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `createElement("span") => 4`,
        `createElement("span") => 5`,
        `[2] Node.insertBefore(3, null)`,
        `[2] Node.insertBefore(4, null)`,
        `[2] Node.insertBefore(5, 4)`,
        `[2] Node.firstChild => 3`,
        `[2] Node.lastChild => 4`,
        `[3] Node.parentNode => 2`,
        `[4] Node.parentNode => 2`,
        `[5] Node.parentNode => 2`,
        `[3] Node.previousSibling => null`,
        `[3] Node.nextSibling => 5`,
        `[4] Node.previousSibling => 5`,
        `[4] Node.nextSibling => null`,
        `[5] Node.previousSibling => 3`,
        `[5] Node.nextSibling => 4`,
      ],
    );
  });

  test("remove first node", () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        const b = document.createElement("span");
        const c = document.createElement("span");
        parent.insertBefore(a, null);
        parent.insertBefore(b, null);
        parent.insertBefore(c, null);
        parent.removeChild(a);

        strictEqual(parent.firstChild, b);
        strictEqual(parent.lastChild, c);

        strictEqual(a.previousSibling, null);
        strictEqual(a.nextSibling, null);
        strictEqual(b.previousSibling, null);
        strictEqual(b.nextSibling, c);
        strictEqual(c.previousSibling, b);
        strictEqual(c.nextSibling, null);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `createElement("span") => 4`,
        `createElement("span") => 5`,
        `[2] Node.insertBefore(3, null)`,
        `[2] Node.insertBefore(4, null)`,
        `[2] Node.insertBefore(5, null)`,
        `[2] Node.removeChild(3)`,
        `[2] Node.firstChild => 4`,
        `[2] Node.lastChild => 5`,
        `[3] Node.previousSibling => null`,
        `[3] Node.nextSibling => null`,
        `[4] Node.previousSibling => null`,
        `[4] Node.nextSibling => 5`,
        `[5] Node.previousSibling => 4`,
        `[5] Node.nextSibling => null`,
      ],
    );
  });

  test("remove middle node", () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        const b = document.createElement("span");
        const c = document.createElement("span");
        parent.insertBefore(a, null);
        parent.insertBefore(b, null);
        parent.insertBefore(c, null);
        parent.removeChild(b);

        strictEqual(parent.firstChild, a);
        strictEqual(parent.lastChild, c);

        strictEqual(a.previousSibling, null);
        strictEqual(a.nextSibling, c);
        strictEqual(b.previousSibling, null);
        strictEqual(b.nextSibling, null);
        strictEqual(c.previousSibling, a);
        strictEqual(c.nextSibling, null);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `createElement("span") => 4`,
        `createElement("span") => 5`,
        `[2] Node.insertBefore(3, null)`,
        `[2] Node.insertBefore(4, null)`,
        `[2] Node.insertBefore(5, null)`,
        `[2] Node.removeChild(4)`,
        `[2] Node.firstChild => 3`,
        `[2] Node.lastChild => 5`,
        `[3] Node.previousSibling => null`,
        `[3] Node.nextSibling => 5`,
        `[4] Node.previousSibling => null`,
        `[4] Node.nextSibling => null`,
        `[5] Node.previousSibling => 3`,
        `[5] Node.nextSibling => null`,
      ],
    );
  });

  test("remove last node", () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        const b = document.createElement("span");
        const c = document.createElement("span");
        parent.insertBefore(a, null);
        parent.insertBefore(b, null);
        parent.insertBefore(c, null);
        parent.removeChild(c);

        strictEqual(parent.firstChild, a);
        strictEqual(parent.lastChild, b);

        strictEqual(a.previousSibling, null);
        strictEqual(a.nextSibling, b);
        strictEqual(b.previousSibling, a);
        strictEqual(b.nextSibling, null);
        strictEqual(c.previousSibling, null);
        strictEqual(c.nextSibling, null);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `createElement("span") => 4`,
        `createElement("span") => 5`,
        `[2] Node.insertBefore(3, null)`,
        `[2] Node.insertBefore(4, null)`,
        `[2] Node.insertBefore(5, null)`,
        `[2] Node.removeChild(5)`,
        `[2] Node.firstChild => 3`,
        `[2] Node.lastChild => 4`,
        `[3] Node.previousSibling => null`,
        `[3] Node.nextSibling => 4`,
        `[4] Node.previousSibling => 3`,
        `[4] Node.nextSibling => null`,
        `[5] Node.previousSibling => null`,
        `[5] Node.nextSibling => null`,
      ],
    );
  });

  test("move node", () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        const b = document.createElement("span");
        const c = document.createElement("span");
        parent.insertBefore(a, null);
        parent.insertBefore(b, null);
        parent.insertBefore(c, b);
        parent.insertBefore(b, a);

        strictEqual(parent.firstChild, b);
        strictEqual(parent.lastChild, c);

        strictEqual(b.previousSibling, null);
        strictEqual(b.nextSibling, a);
        strictEqual(a.previousSibling, b);
        strictEqual(a.nextSibling, c);
        strictEqual(c.previousSibling, a);
        strictEqual(c.nextSibling, null);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `createElement("span") => 4`,
        `createElement("span") => 5`,
        `[2] Node.insertBefore(3, null)`,
        `[2] Node.insertBefore(4, null)`,
        `[2] Node.insertBefore(5, 4)`,
        `[2] Node.insertBefore(4, 3)`,
        `[2] Node.firstChild => 4`,
        `[2] Node.lastChild => 5`,
        `[4] Node.previousSibling => null`,
        `[4] Node.nextSibling => 3`,
        `[3] Node.previousSibling => 4`,
        `[3] Node.nextSibling => 5`,
        `[5] Node.previousSibling => 3`,
        `[5] Node.nextSibling => null`,
      ],
    );
  });

  test("move node between different element", () => {
    deepStrictEqual(
      trace(() => {
        const parentA = document.createElement("div");
        const parentB = document.createElement("div");
        const a = document.createElement("span");
        parentA.insertBefore(a, null);
        strictEqual(parentA.firstChild, a);
        strictEqual(a.parentNode, parentA);

        parentB.insertBefore(a, null);
        strictEqual(parentA.firstChild, null);
        strictEqual(parentA.lastChild, null);
        strictEqual(parentB.firstChild, a);
        strictEqual(parentB.lastChild, a);
        strictEqual(a.parentNode, parentB);
      }),
      [
        `createElement("div") => 2`,
        `createElement("div") => 3`,
        `createElement("span") => 4`,
        `[2] Node.insertBefore(4, null)`,
        `[2] Node.firstChild => 4`,
        `[4] Node.parentNode => 2`,
        `[3] Node.insertBefore(4, null)`,
        `[2] Node.firstChild => null`,
        `[2] Node.lastChild => null`,
        `[3] Node.firstChild => 4`,
        `[3] Node.lastChild => 4`,
        `[4] Node.parentNode => 3`,
      ],
    );
  });

  test(`textContent=""`, () => {
    deepStrictEqual(
      trace(() => {
        const parent = document.createElement("div");
        const a = document.createElement("span");
        const b = document.createElement("span");
        const c = document.createElement("span");
        parent.insertBefore(a, null);
        parent.insertBefore(b, null);
        parent.insertBefore(c, null);

        strictEqual(a.parentNode, parent);
        strictEqual(b.parentNode, parent);
        strictEqual(c.parentNode, parent);

        parent.textContent = "";

        strictEqual(parent.firstChild, null);
        strictEqual(parent.lastChild, null);

        strictEqual(a.parentNode, null);
        strictEqual(b.parentNode, null);
        strictEqual(c.parentNode, null);
      }),
      [
        `createElement("div") => 2`,
        `createElement("span") => 3`,
        `createElement("span") => 4`,
        `createElement("span") => 5`,
        `[2] Node.insertBefore(3, null)`,
        `[2] Node.insertBefore(4, null)`,
        `[2] Node.insertBefore(5, null)`,
        `[3] Node.parentNode => 2`,
        `[4] Node.parentNode => 2`,
        `[5] Node.parentNode => 2`,
        `[2] Node.textContent = ""`,
        `[2] Node.firstChild => null`,
        `[2] Node.lastChild => null`,
        `[3] Node.parentNode => null`,
        `[4] Node.parentNode => null`,
        `[5] Node.parentNode => null`,
      ],
    );
  });
});

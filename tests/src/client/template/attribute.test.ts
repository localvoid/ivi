import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";

describe("@ivi/htm attribute", () => {
  beforeEach(reset);

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

  test(`<div attr={undefined}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div attr=${void 0}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`<div attr={null}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div attr=${null}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );
  });

  test(`<div attr={false}></div>`, () => {
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(htm`
          <div attr=${false}></div>
        `);
      }),
      [
        `createElement("div") => 2`,
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

  test(`attr: undefined => "1"`, () => {
    const test = (s: string | undefined) => htm`
        <div a=${s}></div>
      `;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(test(void 0));
      }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(test("1"));
      }),
      [
        `[2] Element.setAttribute("a", "1")`,
      ],
    );
  });

  test(`attr: false => "1"`, () => {
    const test = (s: string | false) => htm`
        <div a=${s}></div>
      `;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(test(false));
      }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(test("1"));
      }),
      [
        `[2] Element.setAttribute("a", "1")`,
      ],
    );
  });

  test(`attr: null => "1"`, () => {
    const test = (s: string | null) => htm`
        <div a=${s}></div>
      `;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.update(test(null));
      }),
      [
        `createElement("div") => 2`,
        `[1] Node.insertBefore(2, null)`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(test("1"));
      }),
      [
        `[2] Element.setAttribute("a", "1")`,
      ],
    );
  });

  test(`attr: "1" => undefined => false => null => "2`, () => {
    const test = (s: string | null | undefined | false) => htm`
        <div a=${s}></div>
      `;
    const root = createRoot();
    root.update(test("1"));
    deepStrictEqual(
      trace(() => {
        root.update(test(void 0));
      }),
      [
        `[2] Element.removeAttribute("a")`,
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(test(false));
      }),
      [
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(test(null));
      }),
      [
      ],
    );

    deepStrictEqual(
      trace(() => {
        root.update(test("2"));
      }),
      [
        `[2] Element.setAttribute("a", "2")`,
      ],
    );
  });
});

import { deepStrictEqual, ok, strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { type HTMLElement } from "../index.js";
import { reset, trace, emit } from "../global.js";

describe("mock-dom/element", () => {
  beforeEach(() => { reset(); });

  test("attributes", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElement("div");
        strictEqual(n.getAttribute("a"), null);
        n.setAttribute("a", "1");
        strictEqual(n.getAttribute("a"), "1");
        n.setAttribute("b", "2");
        strictEqual(n.getAttribute("b"), "2");
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.getAttribute("a") => null`,
        `[2] Element.setAttribute("a", "1")`,
        `[2] Element.getAttribute("a") => "1"`,
        `[2] Element.setAttribute("b", "2")`,
        `[2] Element.getAttribute("b") => "2"`,
      ],
    );
  });

  test("className", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElement("div");
        strictEqual(n.className, "");
        n.className = "a b";
        strictEqual(n.className, "a b");
        strictEqual(n.getAttribute("class"), "a b");
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.className => ""`,
        `[2] Element.className = "a b"`,
        `[2] Element.className => "a b"`,
        `[2] Element.getAttribute("class") => "a b"`,
      ],
    );
  });

  test("style", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElement("div") as HTMLElement;
        const style = n.style;
        ok(style instanceof CSSStyleDeclaration);
        strictEqual(style.getPropertyValue("a"), "");
        style.setProperty("a", "1");
        strictEqual(style.getPropertyValue("a"), "1");
        style.setProperty("b", "2");
        strictEqual(style.getPropertyValue("b"), "2");
        style.removeProperty("a");
        strictEqual(style.getPropertyValue("a"), "");
      }),
      [
        `createElement("div") => 2`,
        `[2] HTMLElement.style`,
        `[2] style.getPropertyValue(a) => ""`,
        `[2] style.setProperty("a", "1")`,
        `[2] style.getPropertyValue(a) => "1"`,
        `[2] style.setProperty("b", "2")`,
        `[2] style.getPropertyValue(b) => "2"`,
        `[2] style.removeProperty("a")`,
        `[2] style.getPropertyValue(a) => ""`,
      ],
    );
  });

  test("events", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElement("div");
        let i = 0;
        const test = () => {
          i++;
        };
        n.addEventListener("test", test);
        emit(n, "test");
        strictEqual(i, 1);
        emit(n, "test");
        strictEqual(i, 2);
        n.removeEventListener("test", test);
        emit(n, "test");
        strictEqual(i, 2);
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.addEventListener("test", test)`,
        `[2] Element.removeEventListener("test", test)`,
      ],
    );
  });

  test("properties", () => {
    deepStrictEqual(
      trace(() => {
        const n = document.createElement("div") as any;
        strictEqual(n["a"], void 0);
        (n as any)["a"] = 123;
        strictEqual(n["a"], 123);
      }),
      [
        `createElement("div") => 2`,
        `[2] Element.getProperty("a") => undefined`,
        `[2] Element.setProperty("a", 123)`,
        `[2] Element.getProperty("a") => 123`,
      ],
    );
  });
});

import { deepStrictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, trace } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/htm";
import { context, component } from "ivi";

describe("hydrate/context", () => {
  beforeEach(reset);

  const [get1, provider1] = context<number>();
  const [get2, provider2] = context<number>();
  const T = component((c) => {
    const v1 = get1(c);
    const v2 = get2(c);
    return () => (
      htm`
        <div .a=${v1} .b=${v2} />
      `
    );
  });

  test(`undefined|undefined`, () => {
    document.body.innerHTML = `<div>undefined|undefined</div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.hydrate(T());
      }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Element.getProperty("a") => undefined`,
        `[3] Element.getProperty("b") => undefined`,
      ]
    );
  });

  test(`1|2`, () => {
    document.body.innerHTML = `<div>1|2</div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.hydrate(
          provider1(1,
            provider2(2,
              T(),
            ),
          ),
        );
      }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Element.getProperty("a") => undefined`,
        `[3] Element.setProperty("a", 1)`,
        `[3] Element.getProperty("b") => undefined`,
        `[3] Element.setProperty("b", 2)`,
      ]
    );
  });

  test(`nested 1`, () => {
    document.body.innerHTML = `<div>1|undefined</div>`;
    const root = createRoot();
    deepStrictEqual(
      trace(() => {
        root.hydrate(
          provider1(2,
            provider1(1,
              T(),
            ),
          ),
        );
      }),
      [
        `[1] Node.lastChild => 3`,
        `[3] Element.getProperty("a") => undefined`,
        `[3] Element.setProperty("a", 1)`,
        `[3] Element.getProperty("b") => undefined`,
      ]
    );
  });
});

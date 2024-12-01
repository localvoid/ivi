import { strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset } from "@ivi/mock-dom/global";
import { component, context, List } from "ivi";
import { createRoot } from "ivi/test";
import { htm } from "ivi";

describe("findDOMNode", () => {
  beforeEach(reset);

  test(`null`, () => {
    const root = createRoot();
    root.update(
      null,
    );
    strictEqual(root.findDOMNode(), null);
  });

  test(`"1"`, () => {
    const root = createRoot();
    root.update(
      "1",
    );
    strictEqual((root.findDOMNode() as any).uid, 2);
  });

  test(`[]`, () => {
    const root = createRoot();
    root.update(
      [],
    );
    strictEqual(root.findDOMNode(), null);
  });

  test(`[0, 1]`, () => {
    const root = createRoot();
    root.update(
      [0, 1],
    );
    strictEqual((root.findDOMNode() as any).uid, 3);
  });

  test(`[0, null, 1]`, () => {
    const root = createRoot();
    root.update(
      [0, null, 1],
    );
    strictEqual((root.findDOMNode() as any).uid, 3);
  });

  test(`div`, () => {
    const root = createRoot();
    root.update(
      htm`<div/>`,
    );
    strictEqual((root.findDOMNode() as any).uid, 2);
  });

  test(`component`, () => {
    const root = createRoot();
    const T = component(() => () => 1);
    root.update(
      T(),
    );
    strictEqual((root.findDOMNode() as any).uid, 2);
  });

  test(`context`, () => {
    const root = createRoot();
    const [_, provider] = context<number>();
    root.update(
      provider(0, 1),
    );
    strictEqual((root.findDOMNode() as any).uid, 2);
  });

  test(`List`, () => {
    const root = createRoot();
    const r = (i: number) => i;
    root.update(
      List([0, 1], r, r),
    );
    strictEqual((root.findDOMNode() as any).uid, 3);
  });
});

import { OpState, box, Ref, visitNodes } from "ivi";
import { div } from "ivi-html";
import { startRender } from "./utils";
import { NodeFlags } from "../node_flags";

test(`should visit element node`, () => {
  startRender<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    const n = r(
      Ref(
        _ref,
        div(),
      )
    );

    visitNodes(_ref.v!, NodeFlags.Element, (node) => {
      expect(node.state).toBe(n);
    });
  });
});

test(`should ignore non-element node`, () => {
  startRender<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        div(),
      )
    );
    let i = 0;
    visitNodes(_ref.v!, NodeFlags.Text, (node) => {
      i++;
    });
    expect(i).toBe(0);
  });
});

test(`should visit all element nodes in a fragment`, () => {
  startRender<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        [div(), div()],
      )
    );
    let i = 0;
    visitNodes(_ref.v!, NodeFlags.Element, (node) => {
      i++;
    });
    expect(i).toBe(2);
  });
});

test(`should ignore non-element nodes in a fragment`, () => {
  startRender<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        [div(), 123, div()],
      )
    );
    let i = 0;
    visitNodes(_ref.v!, NodeFlags.Element, (node) => {
      i++;
    });
    expect(i).toBe(2);
  });
});

test(`should ignore null nodes in a fragment`, () => {
  startRender<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        [div(), null, div()],
      )
    );
    let i = 0;
    visitNodes(_ref.v!, NodeFlags.Element, (node) => {
      i++;
    });
    expect(i).toBe(2);
  });
});

test(`should stop when visitor returns true`, () => {
  startRender<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        [div(), div()],
      )
    );
    let i = 0;
    visitNodes(_ref.v!, NodeFlags.Element, (node) => {
      i++;
      return true;
    });
    expect(i).toBe(1);
  });
});

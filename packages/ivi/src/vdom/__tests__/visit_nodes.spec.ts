import { _, NodeFlags, OpState, box, Ref, VisitNodesFlags, visitNodes } from "ivi";
import { div } from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`should visit all nodes`, () => {
  testRenderDOM<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        [div(_, _, [div()]), div(_, _, [div()])],
      )
    );
    let i = 0;
    visitNodes(_ref.v!, (node) => {
      if (node.f & NodeFlags.Element) {
        i++;
      }
      return VisitNodesFlags.Continue;
    });
    expect(i).toBe(4);
  });
});

test(`should ignore null nodes`, () => {
  testRenderDOM<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        [div(), null, div()],
      )
    );
    let i = 0;
    visitNodes(_ref.v!, (node) => {
      i++;
      return VisitNodesFlags.Continue;
    });
    expect(i).toBe(4);
  });
});

test(`should stop immediately when visitor returns StopImmediate`, () => {
  testRenderDOM<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        [
          [div(), div()],
          [div(), div()],
        ]
      )
    );
    let i = 0;
    visitNodes(_ref.v!, (node) => {
      if (node.f & NodeFlags.Element) {
        i++;
        return VisitNodesFlags.StopImmediate;
      }
      return VisitNodesFlags.Continue;
    });
    expect(i).toBe(1);
  });
});

test(`should stop when visitor returns Stop`, () => {
  testRenderDOM<HTMLButtonElement>(r => {
    const _ref = box<OpState | null>(null);
    r(
      Ref(
        _ref,
        [
          [div(_, _, [div()]), div(_, _, [div()])],
          [div(_, _, [div()]), div(_, _, [div()])],
        ]
      )
    );
    let i = 0;
    visitNodes(_ref.v!, (node) => {
      if (node.f & NodeFlags.Element) {
        i++;
        return VisitNodesFlags.Stop;
      }
      return VisitNodesFlags.Continue;
    });
    expect(i).toBe(4);
  });
});

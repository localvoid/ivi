import { useResetDOM, useDOMElement, useIVI, useHTML, useTest, useMockFn } from "ivi-jest";
import { Op } from "ivi";

useResetDOM();
const root = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;
const r = (op: Op) => t.render(op, root()).stateNode!;

describe("visitNodes", () => {
  const visited: Op[] = [];
  beforeEach(() => {
    visited.length = 0;
  });

  describe("visit all nodes", () => {
    const visitAll = useMockFn((fn) => {
      fn.mockImplementation((node) => {
        visited.push(node.o);
        return ivi.VisitNodesDirective.Continue;
      });
    });

    test("fragment", () => {
      const o1 = h.div();
      const o2 = h.div();
      const o3 = [o1, o2];
      const n = r(o3);

      ivi.visitNodes(n, visitAll);
      expect(visited.length).toBe(4);
      expect(visited[0]).toBe(n.o);
      expect(visited[1]).toBe(o3);
      expect(visited[2]).toBe(o1);
      expect(visited[3]).toBe(o2);
    });

    test("skip null nodes", () => {
      const o1 = h.div();
      const o2 = h.div();
      const o3 = [o1, null, o2];
      const n = r(o3);

      ivi.visitNodes(n, visitAll);
      expect(visited.length).toBe(4);
      expect(visited[0]).toBe(n.o);
      expect(visited[1]).toBe(o3);
      expect(visited[2]).toBe(o1);
      expect(visited[3]).toBe(o2);
    });
  });

  describe("stop", () => {
    const visitStopAt = (stopAt: Op[]) => {
      return jest.fn((node) => {
        visited.push(node.o);
        if (stopAt.includes(node.o)) {
          return ivi.VisitNodesDirective.Stop;
        }
        return ivi.VisitNodesDirective.Continue;
      });
    };

    test("fragment", () => {
      const o1 = h.span();
      const o2 = h.div(_, _, h.span());
      const o3 = h.div(_, _, o1);
      const o4 = [o2, o3];
      const n = r(o4);

      ivi.visitNodes(n, visitStopAt([o2]));
      expect(visited.length).toBe(5);
      expect(visited[0]).toBe(n.o);
      expect(visited[1]).toBe(o4);
      expect(visited[2]).toBe(o2);
      expect(visited[3]).toBe(o3);
      expect(visited[4]).toBe(o1);
    });
  });

  describe("stop immediately", () => {
    const visitStopImmediatelyAt = (stopAt: Op) => {
      return jest.fn((node) => {
        visited.push(node.o);
        if (node.o === stopAt) {
          return ivi.VisitNodesDirective.StopImmediate;
        }
        return ivi.VisitNodesDirective.Continue;
      });
    };

    test("fragment", () => {
      const o1 = h.span();
      const o2 = h.div(_, _, h.span());
      const o3 = h.div(_, _, o1);
      const o4 = [o2, o3];
      const n = r(o4);

      ivi.visitNodes(n, visitStopImmediatelyAt(o2));
      expect(visited.length).toBe(3);
      expect(visited[0]).toBe(n.o);
      expect(visited[1]).toBe(o4);
      expect(visited[2]).toBe(o2);
    });
  });
});

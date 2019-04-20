import { useResetDOM, useDOMElement, useHTML, useTest, useModule, useComputedValue } from "ivi-jest";
import { Op } from "ivi";

useResetDOM();
const c = useDOMElement();
const h = useHTML();
const portal = useModule<typeof import("ivi-portal")>("ivi-portal");
const t = useTest();
const _ = void 0;
const r = (op: Op) => t.render(op, c()).domNode;

describe("portal", () => {
  describe("root decorator", () => {
    test("default", () => {
      const P = portal.portal();
      r(P.root);
      expect(c()).toMatchSnapshot();
    });
  });

  describe("decorated", () => {
    const P = useComputedValue(() => portal.portal((op) => h.div("portal-root", _, op)));

    describe("mount", () => {
      test("one entry", () => {
        r([P.root, h.div("main", _, P.entry(1))]);

        expect(c()).toMatchSnapshot();
      });

      test("two entries", () => {
        r([P.root, h.div("main", _, [P.entry(1), P.entry(2)])]);

        expect(c()).toMatchSnapshot();
      });
    });

    describe("unmount", () => {
      test("one entry", () => {
        r([P.root, h.div("main", _, P.entry(1))]);
        r([P.root, h.div("main")]);

        expect(c()).toMatchSnapshot();
      });

      test("two entries", () => {
        r([P.root, h.div("main", _, [P.entry(1), P.entry(2)])]);
        r([P.root, h.div("main")]);

        expect(c()).toMatchSnapshot();
      });
    });

    describe("update", () => {
      test("one entry", () => {
        r([P.root, h.div("main", _, P.entry(1))]);
        r([P.root, h.div("main", _, P.entry(2))]);

        expect(c()).toMatchSnapshot();
      });
    });
  });
});

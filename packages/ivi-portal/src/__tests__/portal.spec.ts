import { useResetDOM, useDOMElement, useHTML, useTest, useModule, useComputedValue, useIVI } from "ivi-jest";
import { Op } from "ivi";

useResetDOM();
const root = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const portal = useModule<typeof import("ivi-portal")>("ivi-portal");
const t = useTest();
const _ = void 0;
const r = (op: Op) => t.render(op, root()).domNode;

describe("portal", () => {
  describe("root decorator", () => {
    test("default", () => {
      const P = portal.portal();
      r(P.root);
      expect(root()).toMatchSnapshot();
    });
  });

  describe("decorated", () => {
    const P = useComputedValue(() => portal.portal((op) => h.div("portal-root", _, op)));

    describe("mount", () => {
      test("one entry", () => {
        r([P.root, h.div("main", _, P.entry(1))]);

        expect(root()).toMatchSnapshot();
      });

      test("two entries", () => {
        r([P.root, h.div("main", _, [P.entry(1), P.entry(2)])]);

        expect(root()).toMatchSnapshot();
      });
    });

    describe("unmount", () => {
      test("one entry", () => {
        r([P.root, h.div("main", _, P.entry(1))]);
        r([P.root, h.div("main")]);

        expect(root()).toMatchSnapshot();
      });

      test("two entries", () => {
        r([P.root, h.div("main", _, [P.entry(1), P.entry(2)])]);
        r([P.root, h.div("main")]);

        expect(root()).toMatchSnapshot();
      });
    });

    describe("update", () => {
      test("one entry", () => {
        r([P.root, h.div("main", _, P.entry(1))]);
        r([P.root, h.div("main", _, P.entry(2))]);

        expect(root()).toMatchSnapshot();
      });

      test("context", () => {
        const ContextProvider = ivi.contextValue<number>();
        const ContextValue = ivi.component(() => () => ContextProvider.get());

        r(ContextProvider.set(2, [P.root, h.div("main", _, P.entry(ContextValue()))]));
        r(ContextProvider.set(1, [P.root, h.div("main", _, P.entry(ContextValue()))]));
        expect(root()).toMatchSnapshot();
      });
    });
  });
});

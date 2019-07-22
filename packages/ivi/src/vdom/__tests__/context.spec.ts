import { useResetDOM, useDOMElement, useIVI, useTest, useComputedValue, useMockFn, useHTML } from "ivi-jest";
import { Op } from "ivi";

useResetDOM();
const root = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const ContextProvider = useComputedValue(() => ivi.contextValue<number>());
const getContext = useMockFn((fn) => { fn.mockImplementation(() => ContextProvider.get()); });
const ContextValue = useComputedValue(() => ivi.component(() => () => getContext()));
const _ = void 0;
const r = (op: Op) => t.render(op, root()).domNode;

describe("context", () => {
  test("error when used outside of a reconciliation", () => {
    expect(() => ContextProvider.get()).toThrowError("context");
  });

  describe("mount", () => {
    test("1", () => {
      r(ContextProvider.set(10, ContextValue()));
      expect(getContext).toBeCalledTimes(1);
      expect(getContext).toHaveLastReturnedWith(10);
    });

    test("2", () => {
      const InnerContext = ivi.contextValue<number>();
      r(ContextProvider.set(10, InnerContext.set(20, ContextValue())));
      expect(getContext).toBeCalledTimes(1);
      expect(getContext).toHaveLastReturnedWith(10);
    });
  });

  describe("update", () => {
    test("basic", () => {
      r(ContextProvider.set(10, ContextValue()));
      r(ContextProvider.set(20, ContextValue()));
      expect(getContext).toBeCalledTimes(2);
      expect(getContext).toHaveLastReturnedWith(20);
    });

    describe("strictly equal op", () => {
      test("component", () => {
        const op = ContextValue();
        r(ContextProvider.set(10, op));
        r(ContextProvider.set(20, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith(20);
      });

      test("element", () => {
        const op = h.div(_, _, ContextValue());
        r(ContextProvider.set(10, op));
        r(ContextProvider.set(20, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith(20);
      });

      test("fragment", () => {
        const op = [ContextValue()];
        r(ContextProvider.set(10, op));
        r(ContextProvider.set(20, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith(20);
      });

      test("TrackByKey", () => {
        const op = ivi.TrackByKey([ivi.key(0, ContextValue())]);
        r(ContextProvider.set(10, op));
        r(ContextProvider.set(20, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith(20);
      });

      test("Events", () => {
        const op = ivi.Events(null, ContextValue());
        r(ContextProvider.set(10, op));
        r(ContextProvider.set(20, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith(20);
      });

      test("Context", () => {
        const op = ContextProvider.set(30, ContextValue());
        r(ContextProvider.set(10, op));
        r(ContextProvider.set(20, op));
        expect(getContext).toBeCalledTimes(1);
        expect(getContext).toHaveLastReturnedWith(30);
      });
    });

    test("through static component", () => {
      const Static = ivi.component(() => (op: Op) => op, () => true);

      r(ContextProvider.set(10, Static(ContextValue())));
      r(ContextProvider.set(20, Static(ContextValue())));
      expect(getContext).toBeCalledTimes(2);
      expect(getContext).toHaveLastReturnedWith(20);
    });
  });
});

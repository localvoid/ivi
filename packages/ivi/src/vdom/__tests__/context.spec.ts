import {
  useResetDOM, useResetModules, useDOMElement, useIVI, useTest, useComputedValue, useMockFn, useHTML,
} from "ivi-jest";
import { Op } from "ivi";

useResetDOM();
useResetModules();
const root = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const getContext = useMockFn((fn) => { fn.mockImplementation(() => ivi.context()); });
const ContextValue = useComputedValue(() => ivi.component((c) => {
  const selector = ivi.useSelect<number>(c, () => getContext().value);
  return () => selector();
}));
const _ = void 0;
const r = (op: Op) => t.render(op, root()).domNode;

describe("context", () => {
  test("error when used outside of a reconcilation", () => {
    expect(() => ivi.context()).toThrowError("context");
  });

  test("mount", () => {
    r(ivi.Context({ value: 10 }, ContextValue()));
    expect(getContext).toBeCalledTimes(1);
    expect(getContext).toHaveLastReturnedWith({ value: 10 });
  });

  describe("update", () => {
    test("basic", () => {
      r(ivi.Context({ value: 10 }, ContextValue()));
      r(ivi.Context({ value: 20 }, ContextValue()));
      expect(getContext).toBeCalledTimes(2);
      expect(getContext).toHaveLastReturnedWith({ value: 20 });
    });

    describe("strictly equal op", () => {
      test("component", () => {
        const op = ContextValue();
        r(ivi.Context({ value: 10 }, op));
        r(ivi.Context({ value: 20 }, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith({ value: 20 });
      });

      test("element", () => {
        const op = h.div(_, _, ContextValue());
        r(ivi.Context({ value: 10 }, op));
        r(ivi.Context({ value: 20 }, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith({ value: 20 });
      });

      test("fragment", () => {
        const op = [ContextValue()];
        r(ivi.Context({ value: 10 }, op));
        r(ivi.Context({ value: 20 }, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith({ value: 20 });
      });

      test("TrackByKey", () => {
        const op = ivi.TrackByKey([ivi.key(0, ContextValue())]);
        r(ivi.Context({ value: 10 }, op));
        r(ivi.Context({ value: 20 }, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith({ value: 20 });
      });

      test("Events", () => {
        const op = ivi.Events(null, ContextValue());
        r(ivi.Context({ value: 10 }, op));
        r(ivi.Context({ value: 20 }, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith({ value: 20 });
      });

      test("Context", () => {
        const op = ivi.Context({ value: 30 }, ContextValue());
        r(ivi.Context({ value: 10 }, op));
        r(ivi.Context({ value: 20 }, op));
        expect(getContext).toBeCalledTimes(2);
        expect(getContext).toHaveLastReturnedWith({ value: 30 });
      });
    });

    test("through static component", () => {
      const Static = ivi.component(() => (op: Op) => op, () => false);

      r(ivi.Context({ value: 10 }, Static(ContextValue())));
      r(ivi.Context({ value: 20 }, Static(ContextValue())));
      expect(getContext).toBeCalledTimes(2);
      expect(getContext).toHaveLastReturnedWith({ value: 20 });
    });
  });
});

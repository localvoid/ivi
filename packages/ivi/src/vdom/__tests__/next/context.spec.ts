import {
  useResetJSDOM, useResetModules, useDOMElement, useIVI, useTest, useComputedValue, useMockFn,
} from "ivi-jest";
import { Op } from "../../operations";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const ivi = useIVI();
const t = useTest();
const getContext = useMockFn((fn) => { fn.mockImplementation(() => ivi.context()); });
const ContextValue = useComputedValue(() => ivi.component((h) => {
  const selector = ivi.useSelect<number>(h, () => getContext().value);
  return () => selector();
}));
const r = (op: Op) => t.render(op, c()).domNode;

describe("context", () => {
  test("mount", () => {
    r(ivi.Context({ value: 10 }, ContextValue()()));
    expect(getContext.mock.calls.length).toBe(1);
    expect(getContext.mock.results[0].value).toEqual({ value: 10 });
  });

  test("update", () => {
    r(ivi.Context({ value: 10 }, ContextValue()()));
    r(ivi.Context({ value: 20 }, ContextValue()()));
    expect(getContext.mock.calls.length).toBe(2);
    expect(getContext.mock.results[1].value).toEqual({ value: 20 });
  });

  test("update through static component", () => {
    const Static = ivi.component(() => (op: Op) => op, () => false);

    r(ivi.Context({ value: 10 }, Static(ContextValue()())));
    r(ivi.Context({ value: 20 }, Static(ContextValue()())));
    expect(getContext.mock.calls.length).toBe(2);
    expect(getContext.mock.results[1].value).toEqual({ value: 20 });
  });

  test("update through strictly identical op", () => {
    const op = ContextValue()();
    r(ivi.Context({ value: 10 }, op));
    r(ivi.Context({ value: 20 }, op));
    expect(getContext.mock.calls.length).toBe(2);
    expect(getContext.mock.results[1].value).toEqual({ value: 20 });
  });
});

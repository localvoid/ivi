import {
  useResetJSDOM, useResetModules, useDOMElement, useIVI, useTest, useComputedValue,
} from "ivi-jest";
import { Op } from "../../operations";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const ivi = useIVI();
const t = useTest();
const r = (op: Op) => t.render(op, c()).domNode;
const Stateful = useComputedValue(() => ivi.component(() => (op: Op) => op));

describe("component", () => {
  describe("mount", () => {
    test("null root node", () => {
      const n = r(Stateful()(null));
      expect(n).toMatchSnapshot();
    });

    test("basic root node", () => {
      const n = r(Stateful()(123));
      expect(n).toMatchSnapshot();
    });

    test("component root node", () => {
      const n = r(Stateful()(Stateful()(123)));
      expect(n).toMatchSnapshot();
    });

    test("fragment root node", () => {
      const n = r(Stateful()([1, 2, 3]));
      expect(n).toMatchSnapshot();
    });
  });

  describe("hooks", () => {
    describe("shouldUpdate", () => {
      test("props", () => {
        const shouldUpdate = jest.fn(() => true);
        const component = ivi.component(() => () => null, shouldUpdate);

        r(component(1));
        r(component(2));

        expect(shouldUpdate.mock.calls).toEqual([[1, 2]]);
      });
    });
  });
});

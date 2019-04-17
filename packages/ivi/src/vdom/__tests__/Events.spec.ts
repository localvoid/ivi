import {
  useResetJSDOM, useResetModules, useDOMElement, useIVI, useHTML, useTest, useMockFn,
} from "ivi-jest";
import { Op } from "ivi";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const r = (op: Op) => t.render(op, c()).domNode!;
const target = () => h.div("target");
const dispatch = (event: Event) => {
  const targets = c().getElementsByClassName("target");
  for (let i = 0; i < targets.length; i++) {
    targets[i].dispatchEvent(event);
  }
};
function createMouseEvent(type: string = "click"): MouseEvent {
  if (document.createEvent) {
    const ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null!);
    return ev;
  }
  return new MouseEvent(type);
}

describe("Events", () => {
  describe("basic", () => {
    const handler = useMockFn();

    test("1", () => {
      r(ivi.Events(ivi.onClick(handler), target()));
      dispatch(createMouseEvent());
      expect(handler.mock.calls.length).toBe(1);
    });

    test("2", () => {
      r(ivi.Events(ivi.onClick(handler), [target(), target()]));
      dispatch(createMouseEvent());
      expect(handler.mock.calls.length).toBe(2);
    });
  });

  describe("multiple handlers", () => {
    const handler1 = useMockFn();
    const handler2 = useMockFn();

    test("1", () => {
      r(ivi.Events([ivi.onClick(handler1), ivi.onClick(handler2)], target()));
      dispatch(createMouseEvent());
      expect(handler1.mock.calls.length).toBe(1);
      expect(handler2.mock.calls.length).toBe(1);
    });

    test("2", () => {
      r(ivi.Events([ivi.onMouseDown(handler1), ivi.onClick(handler2)], target()));
      dispatch(createMouseEvent());
      expect(handler1.mock.calls.length).toBe(0);
      expect(handler2.mock.calls.length).toBe(1);
    });

    test("3", () => {
      r(ivi.Events([ivi.onClick(handler1), ivi.onMouseDown(handler2)], target()));
      dispatch(createMouseEvent());
      expect(handler1.mock.calls.length).toBe(1);
      expect(handler2.mock.calls.length).toBe(0);
    });

    test("4", () => {
      r(ivi.Events([ivi.onClick(handler1), null], target()));
      dispatch(createMouseEvent());
      expect(handler1.mock.calls.length).toBe(1);
    });

    test("5", () => {
      r(ivi.Events([null, ivi.onClick(handler1)], target()));
      dispatch(createMouseEvent());
      expect(handler1.mock.calls.length).toBe(1);
    });

    test("6", () => {
      r(ivi.Events([null, [ivi.onClick(handler1)]], target()));
      dispatch(createMouseEvent());
      expect(handler1.mock.calls.length).toBe(1);
    });

    test("7", () => {
      r(
        ivi.Events(ivi.onClick(handler1),
          ivi.Events(ivi.onClick(handler2),
            target(),
          ),
        ),
      );
      dispatch(createMouseEvent());
      expect(handler1.mock.calls.length).toBe(1);
      expect(handler2.mock.calls.length).toBe(1);
    });
  });
});

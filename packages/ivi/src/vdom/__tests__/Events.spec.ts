import {
  useResetDOM, useResetModules, useDOMElement, useIVI, useHTML, useTest, useMockFn,
} from "ivi-jest";
import { Op } from "ivi";

useResetDOM();
useResetModules();
const c = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;
const r = (op: Op) => t.render(op, c()).domNode!;
const target = () => h.div("target");
const dispatch = (event: Event) => {
  const targets = c().getElementsByClassName("target");
  for (let i = 0; i < targets.length; i++) {
    targets[i].dispatchEvent(event);
  }
};
const click = () => new MouseEvent("click");
const error = () => new ErrorEvent("error");

describe("Events", () => {
  describe("basic", () => {
    const handler = useMockFn();

    test("1", () => {
      r(ivi.Events(ivi.onClick(handler), target()));
      dispatch(click());
      expect(handler).toBeCalledTimes(1);
    });

    test("2", () => {
      r(ivi.Events(ivi.onClick(handler), [target(), target()]));
      dispatch(click());
      expect(handler).toBeCalledTimes(2);
    });
  });

  describe("multiple handlers", () => {
    const handler1 = useMockFn();
    const handler2 = useMockFn();

    test("1", () => {
      r(ivi.Events([ivi.onClick(handler1), ivi.onClick(handler2)], target()));
      dispatch(click());
      expect(handler1).toBeCalledTimes(1);
      expect(handler2).toBeCalledTimes(1);
    });

    test("2", () => {
      r(ivi.Events([ivi.onMouseDown(handler1), ivi.onClick(handler2)], target()));
      dispatch(click());
      expect(handler1).toBeCalledTimes(0);
      expect(handler2).toBeCalledTimes(1);
    });

    test("3", () => {
      r(ivi.Events([ivi.onClick(handler1), ivi.onMouseDown(handler2)], target()));
      dispatch(click());
      expect(handler1).toBeCalledTimes(1);
      expect(handler2).toBeCalledTimes(0);
    });

    test("4", () => {
      r(ivi.Events([ivi.onClick(handler1), null], target()));
      dispatch(click());
      expect(handler1).toBeCalledTimes(1);
    });

    test("5", () => {
      r(ivi.Events([null, ivi.onClick(handler1)], target()));
      dispatch(click());
      expect(handler1).toBeCalledTimes(1);
    });

    test("6", () => {
      r(ivi.Events([null, [ivi.onClick(handler1)]], target()));
      dispatch(click());
      expect(handler1).toBeCalledTimes(1);
    });

    test("7", () => {
      r(
        ivi.Events(ivi.onClick(handler1),
          ivi.Events(ivi.onClick(handler2),
            target(),
          ),
        ),
      );
      dispatch(click());
      expect(handler1).toBeCalledTimes(1);
      expect(handler2).toBeCalledTimes(1);
    });
  });

  describe("flow", () => {
    const handlerStop = useMockFn((fn) => { fn.mockReturnValue(true); });
    const handler = useMockFn();

    test("1", () => {
      r(
        ivi.Events(ivi.onClick(handler),
          ivi.Events(ivi.onClick(handlerStop),
            target(),
          ),
        ),
      );
      dispatch(click());
      expect(handlerStop).toBeCalledTimes(1);
      expect(handler).toBeCalledTimes(0);
    });

    test("2", () => {
      r(
        ivi.Events(ivi.onClick(handlerStop, true),
          ivi.Events(ivi.onClick(handler, true),
            target(),
          ),
        ),
      );
      dispatch(click());
      expect(handlerStop).toBeCalledTimes(1);
      expect(handler).toBeCalledTimes(0);
    });

    test("3", () => {
      r(
        ivi.Events(ivi.onClick(handlerStop, true),
          ivi.Events(ivi.onClick(handler),
            target(),
          ),
        ),
      );
      dispatch(click());
      expect(handlerStop).toBeCalledTimes(1);
      expect(handler).toBeCalledTimes(0);
    });

    test("4", () => {
      r(
        ivi.Events(ivi.onClick(handler),
          ivi.Events(ivi.onClick(handlerStop, true),
            target(),
          ),
        ),
      );
      dispatch(click());
      expect(handlerStop).toBeCalledTimes(1);
      expect(handler).toBeCalledTimes(0);
    });

    test("5", () => {
      r(
        ivi.Events(ivi.onClick(handler, true),
          ivi.Events(ivi.onClick(handlerStop),
            target(),
          ),
        ),
      );
      dispatch(click());
      expect(handlerStop).toBeCalledTimes(1);
      expect(handler).toBeCalledTimes(1);
    });

    test("6", () => {
      r(
        ivi.Events([ivi.onClick(handler), ivi.onClick(handlerStop)],
          target(),
        ),
      );
      dispatch(click());
      expect(handlerStop).toBeCalledTimes(1);
      expect(handler).toBeCalledTimes(0);
    });

    test("7", () => {
      r(
        ivi.Events([ivi.onClick(handlerStop, true), ivi.onClick(handler, true)],
          target(),
        ),
      );
      dispatch(click());
      expect(handlerStop).toBeCalledTimes(1);
      expect(handler).toBeCalledTimes(0);
    });
  });

  describe("error event", () => {
    const handler = useMockFn();

    test("bubble", () => {
      r(
        ivi.Events(ivi.onError(handler),
          h.div(_, _, target()),
        ),
      );

      dispatch(error());
      expect(handler).toBeCalledTimes(1);
    });
  });

  describe("update", () => {
    test("children", () => {
      r(ivi.Events(null, 1));
      const n = r(ivi.Events(null, 2));
      expect(n).toMatchSnapshot();
    });
  });
});

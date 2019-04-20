import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("catchError", () => {
  test("handler should not be invoked when it is added", () => {
    const handler = jest.fn();
    ivi.addErrorHandler(handler);

    expect(handler).not.toBeCalled();
  });

  test("handler should be invoked with an error raised from inside", () => {
    const handler = jest.fn();
    ivi.addErrorHandler(handler);

    const e = Error();
    try {
      ivi.catchError(() => { throw e; })();
    } catch (e) {
      //
    }

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(e);
  });

  test("arguments should be passed to the wrapped function", () => {
    const fn = jest.fn();
    ivi.catchError(fn)(1, 2);

    expect(fn).toHaveBeenCalledWith(1, 2);
  });
});

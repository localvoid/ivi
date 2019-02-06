import { addErrorHandler, catchError } from "ivi";

const handler = jest.fn();
addErrorHandler(handler);

test(`handler should not be invoked when it is added`, () => {
  expect(handler.mock.calls.length).toBe(0);
});

describe(`catchError`, () => {
  beforeEach(() => {
    handler.mockReset();
  });

  test(`handler should be invoked with an error raised from inside`, () => {
    const e = new Error();
    try {
      catchError(() => { throw e; })();
    } catch (e) {
      //
    }

    expect(handler.mock.calls.length).toBe(1);
    expect(handler.mock.calls[0][0]).toBe(e);
  });

  test(`arguments should be passed to the wrapped function`, () => {
    const fn = jest.fn();
    catchError(fn)(1, 2);

    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[0][1]).toBe(2);
  });
});

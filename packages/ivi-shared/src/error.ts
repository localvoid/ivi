const ERROR_HANDLERS: Array<(e: any) => void> = [];

/**
 * addErrorHandler adds an error handler for errors catched by functions decorated with `catchError()`.
 *
 * @param handler error handler.
 */
export function addErrorHandler(handler: (e: any) => void): void {
  ERROR_HANDLERS.push(handler);
}

/**
 * catchError is a decorator that catches exceptions and invokes error handlers registered with `addErrorHandler()`.
 *
 * @noinline
 * @throws
 * @param fn - Function to decorate
 * @returns function decorated with a catchError
 */
export function catchError<T>(fn: (...args: any[]) => T): (...args: any[]) => T;
export function catchError<T>(fn: Function): (...args: any[]) => T {
  return function () {
    try {
      return fn.apply(void 0, arguments);
    } catch (e) {
      ERROR_HANDLERS.forEach((h) => { h(e); });
      throw e;
    }
  };
}

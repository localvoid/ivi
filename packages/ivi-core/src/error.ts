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
export function catchError<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
  return (...args: any[]) => {
    try {
      return fn(...args);
    } catch (e) {
      for (const handler of ERROR_HANDLERS) {
        handler(e);
      }
      throw e;
    }
  };
}

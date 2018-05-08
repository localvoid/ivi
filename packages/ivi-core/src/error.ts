const _errorHandlers: Array<(e: any) => void> = [];

/**
 * addErrorHandler adds an error handler for errors catched by functions decorated with `catchError()`.
 *
 * @param handler error handler.
 */
export function addErrorHandler(handler: (e: any) => void): void {
  _errorHandlers.push(handler);
}

export function catchError(fn: (...args: any[]) => void): (...args: any[]) => any;
/**
 * catchError is a decorator that catches exceptions and invokes error handlers registered with `addErrorHandler()`.
 *
 * @noinline
 * @throws
 * @param fn function to decorate.
 * @returns function decorated with a catchError.
 */
export function catchError(fn: () => void): () => any {
  return function () {
    try {
      return fn.apply(null, arguments);
    } catch (e) {
      for (let i = 0; i < _errorHandlers.length; ++i) {
        _errorHandlers[i](e);
      }
      throw e;
    }
  };
}

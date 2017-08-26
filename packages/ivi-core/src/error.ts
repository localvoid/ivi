const _errorHandlers: Array<(e: any) => void> = [];

export function addErrorHandler(handler: (e: any) => void): void {
  _errorHandlers.push(handler);
}

export function catchError(fn: () => void): void {
  try {
    fn();
  } catch (e) {
    for (let i = 0; i < _errorHandlers.length; ++i) {
      _errorHandlers[i](e);
    }
    throw e;
  }
}

/**
 * Print warning to the console and throw local exception.
 *
 * Local exception is thrown so that we can break on caught errors.
 *
 * @param message Warning message.
 */
export function printWarn(message: string): void {
  console.warn(message);
  try {
    throw new Error(message);
  } catch {
    /* tslint:disable:no-empty */
    /* tslint:enable:no-empty */
  }
}

let _printedWarnings: Set<string>;

/**
 * Print warning just once.
 *
 * @param key Unique key for a warning.
 * @param message Warning message.
 */
export function printWarnOnce(key: string, message: string): void {
  if (!_printedWarnings) {
    _printedWarnings = new Set();
  }
  if (!_printedWarnings.has(key)) {
    _printedWarnings.add(key);
    console.warn(message);
    try {
      throw new Error(message);
    } catch {
      /* tslint:disable:no-empty */
      /* tslint:enable:no-empty */
    }
  }
}

import { DEV } from "ivi-vars";
import { printComponentStackTrace } from "./stack_trace";

/**
 * Print error to the console and throw local exception.
 *
 * Local exception is thrown so that we can break on caught errors.
 *
 * @param message Error message.
 */
export function printError(message: string): void {
  if (DEV) {
    console.error(message);
    printComponentStackTrace();
    try {
      throw new Error(message);
    } catch (_) {
      /* tslint:disable:no-empty */
      /* tslint:enable:no-empty */
    }
  }
}

/**
 * Print warning to the console and throw local exception.
 *
 * Local exception is thrown so that we can break on caught errors.
 *
 * @param message Warning message.
 */
export function printWarn(message: string): void {
  if (DEV) {
    console.warn(message);
    printComponentStackTrace();
    try {
      throw new Error(message);
    } catch (_) {
      /* tslint:disable:no-empty */
      /* tslint:enable:no-empty */
    }
  }
}

let _printedWarnings: Set<string>;

/**
 * Print warning just once.
 *
 * @param key unique key for a warning.
 * @param message Warning message.
 */
export function printWarnOnce(key: string, message: string): void {
  if (DEV) {
    if (!_printedWarnings) {
      _printedWarnings = new Set();
    }
    if (!_printedWarnings.has(key)) {
      _printedWarnings.add(key);
      console.warn(message);
      printComponentStackTrace();
      try {
        throw new Error(message);
      } catch (_) {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
      }
    }
  }
}

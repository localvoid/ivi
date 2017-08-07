/**
 * Development Mode.
 *
 * Development Mode is enabled when global variable `__IVI_DEV__` is `true`.
 *
 * Development Mode can be configured via query parameters:
 *   _nv=false   Disable Nesting Validation.
 *   _st=false   Disable Stack Trace Augmentation.
 *   _typos=true Enable Checking for Typos.
 *   _perf=true  Enable Component Performance Profiling.
 *
 * Development Mode global export variable can be changed via query parameter:
 *   _export=<name>
 */
import { printComponentStackTrace } from "./stack_trace";

/**
 * Version number in string format.
 */
export const VERSION = "0.8.0";

/**
 * Dev Mode Flags.
 *
 * `setDevModeFlags` function is used to set Dev Mode flags.
 */
export const enum DevModeFlags {
  /**
   * Disable Nesting Validation.
   */
  DisableNestingValidation = 1,
  /**
   * Disable Stack Trace Augmentation.
   */
  DisableStackTraceAugmentation = 1 << 1,
  /**
   * Disable Checking for Typos.
   */
  DisableCheckingForTypos = 1 << 2,
  /**
   * Disable Warnings for Unsupported Features.
   */
  DisableWarningsForUnsupportedFeatures = 1 << 3,
  /**
   * Enable Component Performance Profiling.
   */
  EnableComponentPerformanceProfiling = 1 << 4,
}

/**
 * Dev Mode Flags. See `DevModeFlags` for details.
 */
export let DEV_MODE: DevModeFlags = 0;

/**
 * Name of the global variable that will be used to export `ivi` Dev Mode API.
 */
export let GLOBAL_EXPORT: string;

/**
 * Set `DevModeFlags`.
 *
 * @param flags See `DevModeFlags` for details.
 */
export function setDevModeFlags(flags: DevModeFlags): void {
  if (__IVI_DEV__) {
    DEV_MODE |= flags;
  }
}

/**
 * Debug Id counter.
 */
let _nextDebugId = 0;

/**
 * Debug Id generator.
 *
 * @return unique debug id.
 */
export function nextDebugId(): number {
  if (__IVI_DEV__) {
    return _nextDebugId++;
  }
  return 0;
}

/**
 * Print error to the console and throw local exception.
 *
 * Local exception is thrown so that we can break on caught errors.
 *
 * @param message Error message.
 */
export function printError(message: string): void {
  if (__IVI_DEV__) {
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
  if (__IVI_DEV__) {
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
  if (__IVI_DEV__) {
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

/* tslint:disable:ban-types */
/**
 * Get function name.
 *
 * @param fn Function.
 * @returns Function name.
 */
export function getFunctionName(fn: Function): string {
  return fn.displayName || fn.name || "(anonymous function)";
}
/* tslint:enable:ban-types */

/**
 * Begin mark perf.
 *
 * @param markName
 */
export function perfMarkBegin(markName: string): void {
  if (__IVI_DEV__) {
    performance.mark(markName);
  }
}

/**
 * End mark perf.
 *
 * @param measureName
 * @param markName
 */
export function perfMarkEnd(measureName: string, markName: string): void {
  if (__IVI_DEV__) {
    performance.measure(measureName, markName);
    performance.clearMarks(markName);
    performance.clearMeasures(measureName);
  }
}

/**
 * Parse query string.
 *
 * @param query Query string.
 * @returns object with key-value
 */
function parseQueryString(query: string): { [key: string]: string } {
  const params = query.substr(1).split("&");

  if (params.length === 0) {
    return {};
  }

  const b: { [key: string]: string } = {};
  for (const kv of params) {
    const p = kv.split("=", 2);
    if (p.length === 1) {
      b[p[0]] = "";
    } else {
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
  }
  return b;
}

if (__IVI_DEV__) {
  const query = parseQueryString(window.location.search);

  if (query["_nv"] === "false") {
    DEV_MODE |= DevModeFlags.DisableNestingValidation;
  }
  if (query["_st"] === "false") {
    DEV_MODE |= DevModeFlags.DisableStackTraceAugmentation;
  }
  if (query["_typos"] === "false") {
    DEV_MODE |= DevModeFlags.DisableCheckingForTypos;
  }
  if (query["_perf"] === "true") {
    DEV_MODE |= DevModeFlags.EnableComponentPerformanceProfiling;
  }
  if (query["_export"] !== undefined) {
    GLOBAL_EXPORT = query["_export"];
  }
}

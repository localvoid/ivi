/**
 * Development Mode.
 *
 * Development Mode is enabled when global variable `__IVI_DEV__` is `true`.
 *
 * Development Mode can be configured via query parameters:
 *   _nv=false  Disable Nesting Validation.
 *   _st=false  Disable Stack Trace Augmentation.
 *   _sod=false Disable Screen of Death.
 *   _geh=false Disable Screen of Death Global Event Handler.
 *   _perf=true Enable Component Performance Profiling.
 *
 * Development Mode global export variable can be changed via query parameter:
 *   _export=<name>
 */
import { FeatureFlags, FEATURES } from "./feature_detection";

/**
 * Version number in string format.
 */
export const VERSION = __IVI_VERSION__;

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
     * Disable Screen of Death.
     */
    DisableScreenOfDeath = 1 << 2,
    /**
     * Disable global `window.addEventListener("error", ...)` error handler.
     */
    DisableScreenOfDeathGlobalErrorHandling = 1 << 3,
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
    console.error(message);
    try {
        throw new Error(message);
    } catch (_) {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }
}

/**
 * Get function name.
 *
 * @param fn Function.
 * @returns Function name.
 */
export function getFunctionName(fn: Function): string {
    return fn.name || "(anonymous function)";
}

/**
 * Begin mark perf.
 *
 * @param markName
 */
export function perfMarkBegin(markName: string): void {
    if (__IVI_DEV__) {
        if (FEATURES & FeatureFlags.DevModePerfMarks) {
            performance.mark(markName);
        }
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
        if (FEATURES & FeatureFlags.DevModePerfMarks) {
            performance.measure(measureName, markName);
            performance.clearMarks(markName);
            performance.clearMeasures(measureName);
        }
    }
}

let VOID_ELEMENTS: { [key: string]: number };
if (__IVI_DEV__) {
    VOID_ELEMENTS = {
        "area": 0,
        "base": 0,
        "br": 0,
        "col": 0,
        "embed": 0,
        "hr": 0,
        "img": 0,
        "input": 0,
        "keygen": 0,
        "link": 0,
        "meta": 0,
        "param": 0,
        "source": 0,
        "track": 0,
        "wbr": 0,
        "menuitem": 0,
    };
}

/**
 * Is element can contain any children.
 *
 * @param tag Tag name.
 * @returns `true` when element can't contain any children.
 */
export function isVoidElement(tag: string): boolean {
    if (__IVI_DEV__) {
        return VOID_ELEMENTS[tag] !== undefined;
    }
    return false;
}

/**
 * Is tag valid.
 *
 * @param tag Tag name.
 * @returns `true` when tag name is valid.
 */
export function isValidTag(tag: string): boolean {
    if (__IVI_DEV__) {
        return /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/.test(tag);
    }
    return true;
}

/**
 * Parse query string.
 *
 * @param query Query string.
 * @returns object with key-value
 */
function parseQueryString(query: string): { [key: string]: string } {
    const a = query.substr(1).split("&");

    if (a.length === 0) {
        return {};
    }

    const b: { [key: string]: string } = {};
    for (let i = 0; i < a.length; ++i) {
        const p = a[i].split("=", 2);
        if (p.length === 1) {
            b[p[0]] = "";
        } else {
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
    }
    return b;
}

if (__IVI_DEV__ && __IVI_BROWSER__) {
    const query = parseQueryString(window.location.search);

    if (query["_nv"] === "false") {
        DEV_MODE |= DevModeFlags.DisableNestingValidation;
    }
    if (query["_st"] === "false") {
        DEV_MODE |= DevModeFlags.DisableStackTraceAugmentation;
    }
    if (query["_sod"] === "false") {
        DEV_MODE |= DevModeFlags.DisableScreenOfDeath;
    }
    if (query["_geh"] === "false") {
        DEV_MODE |= DevModeFlags.DisableScreenOfDeathGlobalErrorHandling;
    }
    if (query["_perf"] === "true") {
        DEV_MODE |= DevModeFlags.EnableComponentPerformanceProfiling;
    }
    if (query["_export"] !== undefined) {
        GLOBAL_EXPORT = query["_export"];
    }
}

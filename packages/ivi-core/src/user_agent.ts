/**
 * User Agent detection is used to fix some quirks like iOS event bubbling, etc.
 *
 * NOTE: Do not implement any browser detection that aren't used in `ivi` library.
 */

const ua = navigator.userAgent;

/**
 * iOS User Agent.
 */
export const IOS_UA = (TARGET !== "electron") && (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window));

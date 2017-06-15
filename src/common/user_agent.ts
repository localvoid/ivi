/**
 * User Agent detection is used to fix some quirks like iOS event bubbling, etc.
 *
 * NOTE: Do not implement any browser detection that aren't used in `ivi` library.
 */

const ua = __IVI_BROWSER__ && navigator ? navigator.userAgent : "";

/**
 * User Agent Flags.
 */
export const enum UserAgentFlags {
    /**
     * iOS browser (iPad, iPhone, iPod).
     */
    iOS = 1,
    /**
     * iOS full screen mode.
     */
    iOSStandalone = 1 << 1,
    /**
     * Android browser.
     */
    Android = 1 << 2,
}

/**
 * User Agent, see `UserAgentFlags` for details.
 */
export let USER_AGENT: UserAgentFlags = 0;

if (__IVI_BROWSER__) {
    if (/iPad|iPhone|iPod/.test(ua) && !("MSStream" in window)) {
        USER_AGENT |= ("standalone" in navigator) ?
            UserAgentFlags.iOS | UserAgentFlags.iOSStandalone :
            UserAgentFlags.iOS;
    }

    if (ua.indexOf("Android") > -1) {
        USER_AGENT |= UserAgentFlags.Android;
    }
}

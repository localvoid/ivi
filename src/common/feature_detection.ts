/**
 * Feature Detection is used to implement polyfills or just disable some features when browser doesn't support them.
 * For example, when browser doesn't support passive events, we can just ignore it and always use active events.
 *
 * NOTE: Do not implement feature detection for features that aren't used in `ivi` library.
 */

/**
 * Feature Flags.
 */
export const enum FeatureFlags {
    /**
     * Passive event listeners are a new feature in the DOM spec that enable developers to opt-in to better scroll
     * performance by eliminating the need for scrolling to block on touch and wheel event listeners. Developers can
     * annotate touch and wheel listeners with {passive: true} to indicate that they will never invoke preventDefault.
     *
     * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
     */
    PassiveEvents = 1,
    /**
     * The `performance.mark()` method creates a timestamp in the browser's performance entry buffer with the given
     * name.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark
     */
    DevModePerfMarks = 1 << 1,
    /**
     * IE and some Edge versions doesn't support `innerHTML` on SVG elements.
     */
    SVGInnerHTML = 1 << 2,
    /**
     * `key` property on KeyboardEvent instances.
     */
    KeyboardEventKey = 1 << 3,
    /**
     * Browser supports native promises.
     *
     * IE11 and Android 4.4 doesn't support native promises.
     */
    // NativePromise = 1 << 4,
    /**
     * Pointer Events support.
     */
    PointerEvents = 1 << 5,
    /**
     * Touch Events support.
     */
    TouchEvents = 1 << 6,
    /**
     * Device with a touchscreen.
     *
     * `navigator.maxTouchPoints > 0`
     */
    PointerEventsTouch = 1 << 7,
    /**
     * Multitouch-capable device.
     *
     * `navigator.maxTouchPoints > 1`
     */
    PointerEventsMultiTouch = 1 << 8,
    /**
     * InputDeviceCapabilities.
     */
    InputDeviceCapabilities = 1 << 9,
}

/**
 * Supported Features, see `FeatureFlags` for details.
 */
export let FEATURES: FeatureFlags = 0;

if (__IVI_BROWSER__) {
    /**
     * Passive Events:
     *
     * https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
     */
    try {
        // Test via a getter in the options object to see if the passive property is accessed
        const opts = Object.defineProperty({}, "passive", {
            get() {
                FEATURES |= FeatureFlags.PassiveEvents;
            },
        });
        window.addEventListener("test", null as any as (ev: Event) => void, opts);
    } catch (e) {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Check `performance.mark` availability.
     */
    if (__IVI_DEV__) {
        if (performance && performance.mark && performance.measure) {
            FEATURES |= FeatureFlags.DevModePerfMarks;
        }
    }

    /**
     * Check `innerHTML` availability in `SVGElement`s.
     */
    if ("innerHTML" in SVGElement.prototype) {
        FEATURES |= FeatureFlags.SVGInnerHTML;
    }

    /**
     * Check `key` availability in `KeyboardEvent`s.
     */
    if ("key" in KeyboardEvent.prototype) {
        FEATURES |= FeatureFlags.KeyboardEventKey;
    }

    /**
     * Check native `Promise` availability.
     */
    // if (typeof Promise !== "undefined" && Promise.toString().indexOf("native code") > -1) {
    //     FEATURES |= FeatureFlags.NativePromise;
    // }

    /**
     * Check PointerEvents and TouchEvents support.
     *
     * Prefer PointerEvents over TouchEvents when both are available.
     */
    if ("PointerEvent" in window) {
        FEATURES |= FeatureFlags.PointerEvents;
        /**
         * Touch/Multitouch detection.
         */
        if (navigator.maxTouchPoints > 0) {
            FEATURES |= FeatureFlags.PointerEventsTouch;
            if (navigator.maxTouchPoints > 1) {
                FEATURES |= FeatureFlags.PointerEventsMultiTouch;
            }
        }
    } else if ("ontouchstart" in window) {
        FEATURES |= FeatureFlags.TouchEvents;
    }

    if ("sourceCapabilities" in UIEvent.prototype) {
        FEATURES |= FeatureFlags.InputDeviceCapabilities;
    }
}

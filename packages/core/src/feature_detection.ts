/**
 * Feature Detection is used to implement polyfills or just disable some features when browser doesn't support them.
 * For example, when browser doesn't support passive events, we can just ignore it and always use active events.
 *
 * NOTE: Do not implement feature detection for features that aren't used in `ivi` libraries.
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
   * IE and some Edge versions doesn't support `innerHTML` on SVG elements.
   */
  SVGInnerHTML = 1 << 1,
  /**
   * `key` property on KeyboardEvent instances.
   */
  KeyboardEventKey = 1 << 2,
  /**
   * MouseEvent.buttons property.
   */
  MouseEventButtons = 1 << 3,
  /**
   * Touch Events support.
   */
  TouchEvents = 1 << 4,
  /**
   * Pointer Events support.
   */
  PointerEvents = 1 << 5,
  /**
   * Device with a touchscreen.
   *
   * `navigator.maxTouchPoints > 0`
   */
  PointerEventsTouch = 1 << 6,
  /**
   * Multitouch-capable device.
   *
   * `navigator.maxTouchPoints > 1`
   */
  PointerEventsMultiTouch = 1 << 7,
  /**
   * InputDeviceCapabilities.
   */
  InputDeviceCapabilities = 1 << 8,
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
   * Check `innerHTML` property in `SVGElement`.
   */
  if ("innerHTML" in SVGElement.prototype) {
    FEATURES |= FeatureFlags.SVGInnerHTML;
  }

  /**
   * Check `key` property in `KeyboardEvent`.
   */
  if ("key" in KeyboardEvent.prototype) {
    FEATURES |= FeatureFlags.KeyboardEventKey;
  }

  /**
   * Check `buttons` property in `MouseEvent`.
   */
  if ("buttons" in MouseEvent.prototype) {
    FEATURES |= FeatureFlags.MouseEventButtons;
  }

  /**
   * Check touch events API.
   */
  if ("ontouchstart" in window) {
    FEATURES |= FeatureFlags.TouchEvents;
  }

  /**
   * Check pointer events API.
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
  }

  /**
   * Check `sourceCapabilities` property in UIEvent.
   */
  if ("sourceCapabilities" in UIEvent.prototype) {
    FEATURES |= FeatureFlags.InputDeviceCapabilities;
  }
}

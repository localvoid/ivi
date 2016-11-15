import { XML_NAMESPACE, XLINK_NAMESPACE } from "../common/dom";
import { VNodeFlags } from "./flags";
import { CSSStyleProps } from "./dom_props";

/**
 * Sync DOM class names.
 *
 * @param node HTML or SVG Element.
 * @param flags VNode flags.
 * @param a Old className.
 * @param b New className.
 */
export function syncClassName(node: Element, flags: VNodeFlags, a: string | null, b: string | null): void {
    if (!b) {
        b = "";
    }
    if (flags & VNodeFlags.SvgElement) {
        node.setAttribute("class", b);
    } else {
        node.className = b;
    }
}

/**
 * Sync DOM styles.
 *
 * When styles are synced, and style from the old list is missing in the new one, its value will be reassigned with a
 * `null` value.
 *
 *    a: { backgroundColor: "#333", color: "#fff" }
 *    b: { backgroundColor: "#333" }
 *
 * In this example `color` style will receive a `null` value.
 *
 * DOM style syncing also supports `string` values, and they can be used interchangeably.
 *
 *    a: "backgroundColor: #333; color: #fff"
 *    b: { backgroundColor: "#333" }
 *
 * Implementation detail: Syncing algorithm has an optimization with an early detection of object shape changes.
 * Objects with static shape will make syncing algorithm slightly faster because it doesn't need to check which
 * properties didn't existed before, so it is possible to just use the static object shapes, and use `undefined` values
 * when you want to remove property and have the same object shape.
 *
 * @param node HTML or SVG Element.
 * @param a Old styles.
 * @param b New styles.
 */
export function syncStyle(
    node: HTMLElement | SVGStylable,
    a: CSSStyleProps | string | null,
    b: CSSStyleProps | string | null,
): void {
    let i: number;
    let keys: string[];
    let key: string;
    let style: CSSStyleDeclaration;

    if (a === null) {
        if (b !== null) {
            // a is empty, insert all styles from b.
            style = node.style;
            if (typeof b === "string") {
                style.cssText = b;
            } else {
                keys = Object.keys(b);
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    (style as any)[key] = (b as any)[key];
                }
            }
        }
    } else if (b === null) {
        // b is empty, remove all styles from a.
        style = node.style;
        if (typeof a === "string") {
            style.cssText = "";
        } else {
            keys = Object.keys(a);
            for (i = 0; i < keys.length; i++) {
                (style as any)[keys[i]] = null;
            }
        }
    } else {
        style = node.style;
        if (typeof b === "string") {
            style.cssText = b;
        } else {
            if (typeof a === "string") {
                style.cssText = "";
                keys = Object.keys(b);
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    (style as any)[key] = (b as any)[key];
                }
            } else {
                let matchCount = 0;

                keys = Object.keys(a);
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    const bValue = (b as any)[key];

                    if (bValue !== undefined) {
                        const aValue = (a as any)[key];
                        if (aValue !== bValue) {
                            (style as any)[key] = bValue;
                        }
                        matchCount++;
                    } else {
                        (style as any)[key] = null;
                    }
                }

                keys = Object.keys(b);
                i = 0;
                while (matchCount < keys.length && i < keys.length) {
                    key = keys[i++];
                    if (!a.hasOwnProperty(key)) {
                        (style as any)[key] = (b as any)[key];
                        matchCount++;
                    }
                }
            }
        }
    }
}

/**
 * Set DOM property.
 *
 * @param node HTML or SVG Element.
 * @param isSVG node is an SVG Element.
 * @param key Attribute name.
 * @param value Attribute value.
 */
function setDOMProperty(node: Element, flags: VNodeFlags, key: string, value?: any, prevValue?: any): void {
    if (flags & VNodeFlags.MediaElement) {
        /**
         * HTMLMediaElements has an internal state with a `volume` property, so it should be checked before an
         * assignment to prevent unnecessary events when `volume` value is the same as the `volume` in the internal
         * state.
         *
         * In general we don't want to override behaviour of DOM Elements with an internal state. Assigning props
         * to such elements should be treated as a one-time assignment, so it works almost like `volume` attribute,
         * except when a new value is passed down, it can override previous value when it doesn't match the previous
         * one. There is absolutely no reasons to overcomplicate such behaviour just to make it more beatiful like it
         * is a declarative assignment and can't be changed, because in real applications, component that controls this
         * element will always track changes to propagate them into its own state or an external state, and when it
         * changes it will invalidate its representation, so everything stays in-sync.
         */
        if (key === "volume") {
            if ((node as HTMLMediaElement).volume !== value) {
                (node as HTMLMediaElement).volume = value === undefined ? null : value;
            }
            return;
        }
    }

    if (value === undefined) {
        /**
         * Because there is no generic way to assign a default value for a property when it is removed, it is always
         * removed with `removeAttribute` method.
         */
        node.removeAttribute(key);
    } else {
        if (key.length > 5) {
            if (key.charCodeAt(0) === 120 &&
                (key.charCodeAt(3) === 58 || key.charCodeAt(5) === 58)) { // 58 === ":" "xml:", "xlink:"
                if (key.charCodeAt(1) === 109 && key.charCodeAt(2) === 108) { // [109, 108] === "ml"
                    /**
                     * All attributes that starts with an "xml:" prefix will be assigned with XML namespace.
                     */
                    node.setAttributeNS(XML_NAMESPACE, key, value);
                    return;
                } else if (key.charCodeAt(1) === 108 &&
                    key.charCodeAt(2) === 105 &&
                    key.charCodeAt(3) === 110 &&
                    key.charCodeAt(4) === 107) { // [108, 105, 110, 107] === "link"
                    /**
                     * All attributes that starts with an "xlink:" prefix will be assigned with XLINK namespace.
                     */
                    node.setAttributeNS(XLINK_NAMESPACE, key, value);
                    return;
                }
            } else if (key.charCodeAt(4) === 45) { // 45 === "-" "data-", "aria-"
                /**
                 * Attributes that has "-" character at the 4th position will be assigned with a `setAttribute` method.
                 * It should work with "data-" and "aria-" attributes. Otherwise just use property assignment instead
                 * of `setAttribute`.
                 */
                node.setAttribute(key, value);
                return;
            }
        }

        (node as any)[key] = value;
    }
}

/**
 * Sync DOM properties.
 *
 * Implementation detail: Syncing algorithm has an optimization with an early detection of object shape changes.
 * Objects with static shape will make syncing algorithm slightly faster because it doesn't need to check which
 * properties didn't existed before, so it is possible to just use the static object shapes, and use `undefined` values
 * when you want to remove property and have the same object shape.
 *
 * @param node HTML or SVG Element.
 * @param flags VNode flags.
 * @param a Old DOM properties.
 * @param b New DOM properties.
 */
export function syncDOMProps(
    node: Element,
    flags: VNodeFlags,
    a: { [key: string]: any } | null,
    b: { [key: string]: any } | null,
): void {
    let i: number;
    let keys: string[];
    let key: string;

    if (a === null) {
        if (b !== null) {
            // a is empty, insert all attributes from b.
            keys = Object.keys(b);
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                setDOMProperty(node, flags, key, b[key]);
            }
        }
    } else if (b === null) {
        // b is empty, remove all attributes from a.
        keys = Object.keys(a);
        for (i = 0; i < keys.length; i++) {
            setDOMProperty(node, flags, keys[i]);
        }
    } else {
        let matchCount = 0;

        // Remove and update attributes.
        keys = Object.keys(a);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            const bValue = b[key];
            if (bValue === undefined) {
                setDOMProperty(node, flags, key);
            } else {
                const aValue = a[key];
                if (aValue !== bValue) {
                    setDOMProperty(node, flags, key, bValue, aValue);
                }
                matchCount++;
            }
        }

        // Insert new attributes.
        keys = Object.keys(b);
        i = 0;
        while (matchCount < keys.length && i < keys.length) {
            key = keys[i++];
            if (!a.hasOwnProperty(key)) {
                setDOMProperty(node, flags, key, b[key]);
                matchCount++;
            }
        }
    }
}

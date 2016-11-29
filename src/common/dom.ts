/**
 * Miscellaneous DOM related stuff.
 */
import { FeatureFlags, FEATURES } from "./feature_detection";

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
export const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";

/**
 * Mouse Buttons.
 *
 * @quirks
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
 */
export const enum MouseButtons {
    Left = 1,
    Right = 1 << 1,
    /**
     * Wheel or middle button.
     */
    Middle = 1 << 2,
    /**
     * Typically the "Browser Back" button.
     */
    Fourh = 1 << 3,
    /**
     * Typically the "Browser Forward" button.
     */
    Fifth = 1 << 4,
}

/**
 * Gets target element from an Event.
 *
 * #quirks
 *
 * @param ev Event.
 * @returns Target Element.
 */
export function getEventTarget(ev: Event): EventTarget {
    let target = ev.target || window;

    /**
     * Fix for `SVGUseElement` in old browsers.
     */
    if ((target as any).correspondingUseElement) {
        target = (target as any).correspondingUseElement;
    }

    /**
     * Safari fires events on Text Nodes.
     *
     * http://www.quirksmode.org/js/events_properties.html
     */
    return (target as Node).nodeType === 3 ? (target as Node).parentNode! : target;
}

const KEY_CODE_TO_KEY: { [key: number]: string } = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
};

/**
 * Gets a `charCode` from a KeyboardEvent.
 *
 * #quirks
 *
 * @param ev Keyboard Event
 * @returns A char code.
 */
export function getEventCharCode(ev: KeyboardEvent): number {
    const keyCode = ev.keyCode;
    let charCode = ev.charCode;

    if (charCode === 0 && keyCode === 13) {
        charCode = 13;
    }

    if (charCode >= 32 || charCode === 13) {
        return charCode;
    }

    return 0;
}

/**
 * Gets a `key` from a KeybordEvent.
 *
 * #quirks
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 *
 * @param ev Keyboard Event.
 * @returns A `key` property.
 */
export function getEventKey(ev: KeyboardEvent): string {
    if (ev.type === "keypress") {
        const charCode = getEventCharCode(ev);
        if (charCode === 13) {
            return "Enter";
        }
        return String.fromCharCode(charCode);
    } else if (ev.type === "keydown" || ev.type === "keyup") {
        const key = KEY_CODE_TO_KEY[ev.keyCode];
        if (key !== undefined) {
            return key;
        }
    }

    return "Unidentified";
}

/**
 * Set inner HTML.
 *
 * #quirks
 *
 * @param element DOM Element.
 * @param content Inner HTML content.
 * @param isSVG Element is SVG.
 */
export function setInnerHTML(element: Element, content: string, isSVG: boolean): void {
    // #msapp
    //
    // innerHTML should be invoked inside an unsafe context `MSApp.execUnsafeLocalFunction`
    // All details here: https://msdn.microsoft.com/en-us/library/windows/apps/hh767331.aspx

    // Doesn't work on SVG Elements in IE. Latest Edge versions are working fine.
    if (!isSVG || FEATURES & FeatureFlags.SVGInnerHTML) {
        element.innerHTML = content;
    } else {
        setInnerSVG(element as SVGElement, content);
    }
}

/**
 * Container for SVG Elements.
 *
 * #quirks
 */
let innerHTMLSVGContainer: HTMLDivElement | undefined;

/**
 * Set innerHTML on SVG elements in browsers that doesn't support innerHTML on SVG elements.
 *
 * #quirks
 *
 * @param element SVG element.
 * @param content Inner HTML content.
 */
function setInnerSVG(element: SVGElement, content: string): void {
    if (!innerHTMLSVGContainer) {
        innerHTMLSVGContainer = document.createElement("div");
    }
    innerHTMLSVGContainer.innerHTML = `<svg>${content}</svg>`;
    const svg = innerHTMLSVGContainer.firstChild;
    while (svg.firstChild) {
        element.appendChild(svg.firstChild);
    }
}

/**
 * Traverses the DOM to the top and calculates DOM Node depth.
 *
 * @param node DOM Node.
 * @returns DOM Node depth.
 */
export function nodeDepth(node: Node | null): number {
    let depth = 0;
    while (node) {
        depth++;
        node = node.parentNode;
    }
    return depth;
}

/**
 * Finds a first leaf node.
 *
 * @param node DOM Node.
 * @return A leaf node.
 */
export function firstLeaf(node: Node): Node {
    while (node && node.firstChild) {
        node = node.firstChild;
    }
    return node;
}

/**
 * Finds a next sibling node.
 *
 * @param node DOM Node.
 * @return Next sibling.
 */
export function nextSibling(node: Node): Node | null {
    while (node) {
        if (node.nextSibling) {
            return node.nextSibling;
        }
        node = node.parentNode;
    }
    return null;
}

export type HTMLTagType =
    "a" |
    "abbr" |
    "acronym" |
    "address" |
    "applet" |
    "area" |
    "article" |
    "aside" |
    "b" |
    "base" |
    "basefont" |
    "bdo" |
    "big" |
    "blockquote" |
    "body" |
    "br" |
    "button" |
    "canvas" |
    "caption" |
    "center" |
    "cite" |
    "code" |
    "col" |
    "colgroup" |
    "datalist" |
    "dd" |
    "del" |
    "dfn" |
    "dir" |
    "div" |
    "dl" |
    "dt" |
    "em" |
    "embed" |
    "fieldset" |
    "figcaption" |
    "figure" |
    "font" |
    "footer" |
    "form" |
    "frame" |
    "frameset" |
    "h1" |
    "h2" |
    "h3" |
    "h4" |
    "h5" |
    "h6" |
    "head" |
    "header" |
    "hgroup" |
    "hr" |
    "html" |
    "i" |
    "iframe" |
    "img" |
    "ins" |
    "isindex" |
    "kbd" |
    "keygen" |
    "label" |
    "legend" |
    "li" |
    "link" |
    "listing" |
    "map" |
    "mark" |
    "marquee" |
    "menu" |
    "meta" |
    "meter" |
    "nav" |
    "nextid" |
    "nobr" |
    "noframes" |
    "noscript" |
    "object" |
    "ol" |
    "optgroup" |
    "option" |
    "p" |
    "param" |
    "picture" |
    "plaintext" |
    "pre" |
    "progress" |
    "q" |
    "rt" |
    "ruby" |
    "s" |
    "samp" |
    "script" |
    "section" |
    "select" |
    "small" |
    "source" |
    "span" |
    "strike" |
    "strong" |
    "style" |
    "sub" |
    "sup" |
    "table" |
    "tbody" |
    "td" |
    "template" |
    "textarea" |
    "tfoot" |
    "th" |
    "thead" |
    "title" |
    "tr" |
    "track" |
    "tt" |
    "u" |
    "ul" |
    "var" |
    "wbr" |
    "x-ms-webview" |
    "xmp";

export type SVGTagType =
    "circle" |
    "clippath" |
    "defs" |
    "desc" |
    "ellipse" |
    "feblend" |
    "fecolormatrix" |
    "fecomponenttransfer" |
    "fecomposite" |
    "feconvolvematrix" |
    "fediffuselighting" |
    "fedisplacementmap" |
    "fedistantlight" |
    "feflood" |
    "fefunca" |
    "fefuncb" |
    "fefuncg" |
    "fefuncr" |
    "fegaussianblur" |
    "feimage" |
    "femerge" |
    "femergenode" |
    "femorphology" |
    "feoffset" |
    "fepointlight" |
    "fespecularlighting" |
    "fespotlight" |
    "fetile" |
    "feturbulence" |
    "filter" |
    "foreignobject" |
    "g" |
    "image" |
    "line" |
    "lineargradient" |
    "marker" |
    "mask" |
    "metadata" |
    "path" |
    "pattern" |
    "polygon" |
    "polyline" |
    "radialgradient" |
    "rect" |
    "stop" |
    "svg" |
    "switch" |
    "symbol" |
    "text" |
    "textpath" |
    "tspan" |
    "use" |
    "view";

export type MediaTagType =
    "audio" |
    "video";

export type InputType =
    "textarea" | // not a real input type, just one exception for textarea elements
    "button" |
    "checkbox" |
    "color" |
    "date" |
    "datetime" |
    "datetime-local" |
    "email" |
    "file" |
    "hidden" |
    "image" |
    "month" |
    "number" |
    "password" |
    "radio" |
    "range" |
    "reset" |
    "search" |
    "submit" |
    "tel" |
    "text" |
    "time" |
    "url" |
    "week";

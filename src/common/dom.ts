/**
 * Miscellaneous DOM related stuff.
 */
import { FeatureFlags, FEATURES } from "./feature_detection";

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
export const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";

/**
 * KeyboardEvent keyCode values.
 */
export const enum KeyCode {
    WinKeyFFLinux = 0,
    MacEnter = 3,
    Backspace = 8,
    Tab = 9,
    NumCenter = 12, // FF and Safari on Mac: NumCenter === NumLock
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    Pause = 19,
    CapsLock = 20,
    Esc = 27,
    Space = 32,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
    NumNorthEast = 33,
    NumSouthEast = 34,
    NumSouthWest = 35,
    NumNorthWest = 36,
    NumWest = 37,
    NumNorth = 38,
    NumEast = 39,
    NumSouth = 40,
    PrintScreen = 44,
    Insert = 45,
    NumInsert = 45,
    Delete = 46,
    NumDelete = 46,
    Zero = 48,
    Ono = 49,
    Two = 50,
    Three = 51,
    Four = 52,
    Five = 53,
    Six = 54,
    Seven = 55,
    Eight = 56,
    Nine = 57,
    FFSemicolon = 59,
    FFEquals = 61,
    /**
     * US keyboard layouts only.
     */
    QuestionMark = 63,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    Meta = 91,
    WinKeyLeft = 91,
    WinKeyRight = 92,
    ContextMenu = 93,
    NumZero = 96,
    NumOne = 97,
    NumTwo = 98,
    NumThree = 99,
    NumFour = 100,
    NumFive = 101,
    NumSix = 102,
    NumSeven = 103,
    NumEight = 104,
    NumNine = 105,
    NumMultiply = 106,
    NumPlus = 107,
    NumMinus = 109,
    NumPeriod = 110,
    NumDivision = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    NumLock = 144,
    ScrollLock = 145,
    /**
     * First OS specific media key.
     */
    FirstMediaKey = 166,
    /**
     * Last OS specific media key.
     */
    LastMediaKey = 183,
    /**
     * US keyboard layouts only.
     */
    Semicolon = 186,
    /**
     * US keyboard layouts only.
     */
    Dash = 189,
    /**
     * US keyboard layouts only.
     */
    Equals = 187,
    /**
     * US keyboard layouts only.
     */
    Comma = 188,
    /**
     * US keyboard layouts only.
     */
    Period = 190,
    /**
     * US keyboard layouts only.
     */
    Slash = 191,
    /**
     * US keyboard layouts only.
     */
    Apostrophe = 192,
    /**
     * US keyboard layouts only.
     */
    Tilde = 192,
    /**
     * US keyboard layouts only.
     */
    SingleQuote = 222,
    /**
     * US keyboard layouts only.
     */
    OpenSquareBracket = 219,
    /**
     * US keyboard layouts only.
     */
    Backslash = 220,
    /**
     * US keyboard layouts only.
     */
    CloseSquareBracket = 221,
    WinKey = 224,
    MacFFMeta = 224,
    WinIME = 229,
}

/**
 * Flags for MouseEvent buttons property.
 *
 * Buttons property aren't widely supported by all major browsers at this time, and there is no easy way to polyfill
 * it.
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
 * There are still some differences in modern browsers, so we need to get event targets with this function.
 *
 * #quirks
 *
 * @param ev Event.
 * @returns Target Element.
 */
export function getEventTarget(ev: Event): EventTarget {
    let target = ev.target || window;

    /**
     * Some browsers are implementing it according to SVG 1.1 specs:
     *
     * https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7998724/
     *
     * "If event attributes are assigned to referenced elements, then the actual target for the event will be the
     * SVGElementInstance object within the 'instance tree' corresponding to the given referenced element."
     *
     * https://www.w3.org/TR/SVG/struct.html#UseElement
     *
     * SVG 2 redefined the use event handling model:
     *
     * - Removed the SVGElementInstance and SVGElementInstanceList interfaces, and the corresponding attributes on the
     *   SVGUseElement interface.
     * - Changed the ‘use’ element event flow to follow the Shadow DOM spec.
     *
     * https://www.w3.org/TR/SVG2/changes.html#structure
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
    44: "PrintScreen",
    45: "Insert",
    46: "Delete",
    91: "Meta",
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
    224: "Win",
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

export type KeyName =
    "Accept" |
    "Add" |
    "Again" |
    "AllCandidates" |
    "Alphanumeric" |
    "Alt" |
    "AltGraph" |
    "Apps" |
    "Attn" |
    "BrowserBack" |
    "BrowserFavorites" |
    "BrowserForward" |
    "BrowserHome" |
    "BrowserRefresh" |
    "BrowserSearch" |
    "BrowserStop" |
    "Camera" |
    "CapsLock" |
    "Clear" |
    "CodeInput" |
    "Compose" |
    "Control" |
    "Crsel" |
    "Convert" |
    "Copy" |
    "Cut" |
    "Decimal" |
    "Divide" |
    "Down" |
    "DownLeft" |
    "DownRight" |
    "Eject" |
    "End" |
    "Enter" |
    "EraseEof" |
    "Execute" |
    "Exsel" |
    "Fn" |
    "F1" |
    "F2" |
    "F3" |
    "F4" |
    "F5" |
    "F6" |
    "F7" |
    "F8" |
    "F9" |
    "F10" |
    "F11" |
    "F12" |
    "F13" |
    "F14" |
    "F15" |
    "F16" |
    "F17" |
    "F18" |
    "F19" |
    "F20" |
    "F21" |
    "F22" |
    "F23" |
    "F24" |
    "FinalMode" |
    "Find" |
    "FullWidth" |
    "HalfWidth" |
    "HangulMode" |
    "HanjaMode" |
    "Help" |
    "Hiragana" |
    "Home" |
    "Insert" |
    "JapaneseHiragana" |
    "JapaneseKatakana" |
    "JapaneseRomaji" |
    "JunjaMode" |
    "KanaMode" |
    "KanjiMode" |
    "Katakana" |
    "LaunchApplication1" |
    "LaunchApplication2" |
    "LaunchMail" |
    "Left" |
    "Menu" |
    "Meta" |
    "MediaNextTrack" |
    "MediaPlayPause" |
    "MediaPreviousTrack" |
    "MediaStop" |
    "ModeChange" |
    "NextCandidate" |
    "Nonconvert" |
    "NumLock" |
    "PageDown" |
    "PageUp" |
    "Paste" |
    "Pause" |
    "Play" |
    "Power" |
    "PreviousCandidate" |
    "PrintScreen" |
    "Process" |
    "Props" |
    "Right" |
    "RomanCharacters" |
    "Scroll" |
    "Select" |
    "SelectMedia" |
    "Separator" |
    "Shift" |
    "Soft1" |
    "Soft2" |
    "Soft3" |
    "Soft4" |
    "Stop" |
    "Subtract" |
    "SymbolLock" |
    "Up" |
    "UpLeft" |
    "UpRight" |
    "Undo" |
    "VolumeDown" |
    "VolumeMute" |
    "VolumeUp" |
    "Win" |
    "Zoom" |
    "Backspace" |
    "Tab" |
    "Cancel" |
    "Esc" |
    "Spacebar" |
    "Del" |
    "DeadGrave" |
    "DeadEacute" |
    "DeadCircumflex" |
    "DeadTilde" |
    "DeadMacron" |
    "DeadBreve" |
    "DeadAboveDot" |
    "DeadUmlaut" |
    "DeadAboveRing" |
    "DeadDoubleacute" |
    "DeadCaron" |
    "DeadCedilla" |
    "DeadOgonek" |
    "DeadIota" |
    "DeadVoicedSound" |
    "DeadSemivoicedSound" |
    "Unidentified";

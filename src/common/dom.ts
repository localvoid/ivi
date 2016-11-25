/**
 * Miscellaneous DOM related stuff.
 */
import { FeatureFlags, FEATURES } from "./feature_detection";

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
export const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";

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

import {
  SVGElementAttrs,
  SVGCircleElementAttrs, SVGClipPathElementAttrs, SVGDefsElementAttrs, SVGDescElementAttrs, SVGEllipseElementAttrs,
  SVGFEBlendElementAttrs, SVGFEColorMatrixElementAttrs, SVGFEComponentTransferElementAttrs,
  SVGFECompositeElementAttrs, SVGFEConvolveMatrixElementAttrs, SVGFEDiffuseLightingElementAttrs,
  SVGFEDisplacementMapElementAttrs, SVGFEDistantLightElementAttrs, SVGFEFloodElementAttrs, SVGFEFuncAElementAttrs,
  SVGFEFuncBElementAttrs, SVGFEFuncGElementAttrs, SVGFEFuncRElementAttrs, SVGFEGaussianBlurElementAttrs,
  SVGFEImageElementAttrs, SVGFEMergeElementAttrs, SVGFEMergeNodeElementAttrs, SVGFEMorphologyElementAttrs,
  SVGFEOffsetElementAttrs, SVGFEPointLightElementAttrs, SVGFESpecularLightingElementAttrs, SVGFESpotLightElementAttrs,
  SVGFETileElementAttrs, SVGFETurbulenceElementAttrs, SVGFilterElementAttrs, SVGForeignObjectElementAttrs,
  SVGGElementAttrs, SVGImageElementAttrs, SVGLinearGradientElementAttrs, SVGLineElementAttrs, SVGMarkerElementAttrs,
  SVGMaskElementAttrs, SVGMetadataElementAttrs, SVGPathElementAttrs, SVGPatternElementAttrs, SVGPolygonElementAttrs,
  SVGPolylineElementAttrs, SVGRadialGradientElementAttrs, SVGRectElementAttrs, SVGStopElementAttrs,
  SVGSVGElementAttrs, SVGSymbolElementAttrs, SVGTextElementAttrs, SVGTextPathElementAttrs,
  SVGTSpanElementAttrs, SVGViewElementAttrs, SVGUseElementAttrs,
  CSSStyleProps,

  elementSetAttributeNS, XML_NAMESPACE, XLINK_NAMESPACE,
  SYNCABLE_VALUE_REMOVE_ATTR_UNDEFINED,

  VNode, VNodeFlags, SyncableValue,
} from "ivi";

const enum TagId {
  A = 1,
  Animate = 2,
  AnimateColor = 3,
  AnimateMotion = 4,
  AnimateTransform = 5,
  Circle = 6,
  ClipPath = 7,
  Defs = 8,
  Desc = 9,
  Discard = 10,
  Ellipse = 11,
  FeBlend = 12,
  FeColorMatrix = 13,
  FeComponentTransfer = 14,
  FeComposite = 15,
  FeConvolveMatrix = 16,
  FeDiffuseLighting = 17,
  FeDisplacementMap = 18,
  FeDistantLight = 19,
  FeDropShadow = 20,
  FeFlood = 21,
  FeFuncA = 22,
  FeFuncB = 23,
  FeFuncG = 24,
  FeFuncR = 25,
  FeGaussianBlur = 26,
  FeImage = 27,
  FeMerge = 28,
  FeMergeNode = 29,
  FeMorphology = 30,
  FeOffset = 31,
  FePointLight = 32,
  FeSpecularLighting = 33,
  FeSpotLight = 34,
  FeTile = 35,
  FeTurbulence = 36,
  Filter = 37,
  ForeignObject = 38,
  G = 39,
  Hatch = 40,
  Hatchpath = 41,
  Image = 42,
  Line = 43,
  LinearGradient = 44,
  Marker = 45,
  Mask = 46,
  Mesh = 47,
  Meshgradient = 48,
  Meshpatch = 49,
  Meshrow = 50,
  Metadata = 51,
  Mpath = 52,
  Path = 53,
  Pattern = 54,
  Polygon = 55,
  Polyline = 56,
  RadialGradient = 57,
  Rect = 58,
  Set = 59,
  Solidcolor = 60,
  Stop = 61,
  Svg = 62,
  Symbol = 63,
  Text = 64,
  TextPath = 65,
  Title = 66,
  Tspan = 67,
  Use = 68,
  View = 69,
}

const SYNCABLE_VALUE_SET_XML_ATTR_EMPTY_STRING = {
  v: "",
  s: (element: Element, key: string, prev: any) => {
    if (prev !== "") {
      elementSetAttributeNS.call(element, XML_NAMESPACE, key, "");
    }
  },
};

const SYNCABLE_VALUE_SET_XLINK_ATTR_EMPTY_STRING = {
  v: "",
  s: (element: Element, key: string, prev: any) => {
    if (prev !== "") {
      elementSetAttributeNS.call(element, XLINK_NAMESPACE, key, "");
    }
  },
};

function syncNSAttr(
  element: Element,
  ns: string,
  key: string,
  prev: string | number | boolean | undefined,
  next: string | number | boolean | undefined,
) {
  if (prev !== next) {
    elementSetAttributeNS.call(element, ns, key, next!);
  }
}

/**
 * Synchronization function for {@link SyncableValue} created with {@link XML_ATTR} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function syncXMLAttr(
  element: Element,
  key: string,
  prev: string | number | boolean | undefined,
  next: string | number | boolean | undefined,
) {
  syncNSAttr(element, XML_NAMESPACE, key, prev, next);
}

/**
 * Synchronization function for {@link SyncableValue} created with {@link XLINK_ATTR} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function syncXLinkAttr(
  element: Element,
  key: string,
  prev: string | number | boolean | undefined,
  next: string | number | boolean | undefined,
) {
  syncNSAttr(element, XLINK_NAMESPACE, key, prev, next);
}

/**
 * Helper function that creates a {@link SyncableValue} for namespaced attribute.
 *
 * @param v - Attribute value
 * @param emptyString - Syncable value that should be used for empty strings
 * @param s - Synchronization function
 */
function NS_ATTR(
  v: string | number | boolean | undefined,
  emptyString: SyncableValue<string | number | boolean>,
  s: (
    element: Element,
    key: string,
    prev: string | number | boolean | undefined,
    next: string | number | boolean | undefined,
  ) => void,
): SyncableValue<string | number | boolean> {
  if (typeof v === "boolean") {
    if (v) {
      return emptyString;
    }
    v = void 0;
  }
  return (v === void 0) ? SYNCABLE_VALUE_REMOVE_ATTR_UNDEFINED : { v, s };
}

/**
 * XML_ATTR function creates a {@link SyncableValue} that assigns an attribute from XML namespace, attribute name is
 * derived from the `key`.
 *
 * `undefined` values are removed.
 *
 * @example
 *
 *   const e = circle("", { "xml:text": XML_ATTR("abc") });
 *
 * @param v - Value
 * @returns {@link SyncableValue}
 */
export function XML_ATTR(v: string | number | boolean | undefined): SyncableValue<string | number | boolean> {
  return NS_ATTR(v, SYNCABLE_VALUE_SET_XML_ATTR_EMPTY_STRING, syncXMLAttr);
}

/**
 * XLINK_ATTR function creates a {@link SyncableValue} that assigns an attribute from XLINK namespace, attribute name is
 * derived from the `key`.
 *
 * `undefined` values are removed.
 *
 * @example
 *
 *   const e = circle("", { "xlink:text": XLINK_ATTR("abc") });
 *
 * @param v - Value
 * @returns {@link SyncableValue}
 */
export function XLINK_ATTR(v: string | number | boolean | undefined): SyncableValue<string | number | boolean> {
  return NS_ATTR(v, SYNCABLE_VALUE_SET_XLINK_ATTR_EMPTY_STRING, syncXLinkAttr);
}

/* tslint:disable:max-line-length */
/**
 * Creates Virtual DOM SVG element <a>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <a>
 */
export function a(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <animate>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <animate>
 */
export function animate(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Animate << VNodeFlags.ElementIdOffset),
    "animate",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <animateColor>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateColor}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <animateColor>
 */
export function animateColor(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateColor << VNodeFlags.ElementIdOffset),
    "animateColor",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <animateMotion>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <animateMotion>
 */
export function animateMotion(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateMotion << VNodeFlags.ElementIdOffset),
    "animateMotion",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <animateTransform>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <animateTransform>
 */
export function animateTransform(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateTransform << VNodeFlags.ElementIdOffset),
    "animateTransform",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <circle>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <circle>
 */
export function circle(className?: string, attrs?: SVGCircleElementAttrs, css?: CSSStyleProps): VNode<SVGCircleElementAttrs | undefined, SVGCircleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Circle << VNodeFlags.ElementIdOffset),
    "circle",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <clipPath>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <clipPath>
 */
export function clipPath(className?: string, attrs?: SVGClipPathElementAttrs, css?: CSSStyleProps): VNode<SVGClipPathElementAttrs | undefined, SVGClipPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ClipPath << VNodeFlags.ElementIdOffset),
    "clipPath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <defs>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <defs>
 */
export function defs(className?: string, attrs?: SVGDefsElementAttrs, css?: CSSStyleProps): VNode<SVGDefsElementAttrs | undefined, SVGDefsElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Defs << VNodeFlags.ElementIdOffset),
    "defs",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <desc>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <desc>
 */
export function desc(className?: string, attrs?: SVGDescElementAttrs, css?: CSSStyleProps): VNode<SVGDescElementAttrs | undefined, SVGDescElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Desc << VNodeFlags.ElementIdOffset),
    "desc",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <discard>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/discard}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <discard>
 */
export function discard(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Discard << VNodeFlags.ElementIdOffset),
    "discard",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <ellipse>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <ellipse>
 */
export function ellipse(className?: string, attrs?: SVGEllipseElementAttrs, css?: CSSStyleProps): VNode<SVGEllipseElementAttrs | undefined, SVGEllipseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Ellipse << VNodeFlags.ElementIdOffset),
    "ellipse",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feBlend>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feBlend}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feBlend>
 */
export function feBlend(className?: string, attrs?: SVGFEBlendElementAttrs, css?: CSSStyleProps): VNode<SVGFEBlendElementAttrs | undefined, SVGFEBlendElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeBlend << VNodeFlags.ElementIdOffset),
    "feBlend",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feColorMatrix>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feColorMatrix>
 */
export function feColorMatrix(className?: string, attrs?: SVGFEColorMatrixElementAttrs, css?: CSSStyleProps): VNode<SVGFEColorMatrixElementAttrs | undefined, SVGFEColorMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeColorMatrix << VNodeFlags.ElementIdOffset),
    "feColorMatrix",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feComponentTransfer>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feComponentTransfer>
 */
export function feComponentTransfer(className?: string, attrs?: SVGFEComponentTransferElementAttrs, css?: CSSStyleProps): VNode<SVGFEComponentTransferElementAttrs | undefined, SVGFEComponentTransferElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComponentTransfer << VNodeFlags.ElementIdOffset),
    "feComponentTransfer",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feComposite>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComposite}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feComposite>
 */
export function feComposite(className?: string, attrs?: SVGFECompositeElementAttrs, css?: CSSStyleProps): VNode<SVGFECompositeElementAttrs | undefined, SVGFECompositeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComposite << VNodeFlags.ElementIdOffset),
    "feComposite",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feConvolveMatrix>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feConvolveMatrix>
 */
export function feConvolveMatrix(className?: string, attrs?: SVGFEConvolveMatrixElementAttrs, css?: CSSStyleProps): VNode<SVGFEConvolveMatrixElementAttrs | undefined, SVGFEConvolveMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeConvolveMatrix << VNodeFlags.ElementIdOffset),
    "feConvolveMatrix",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feDiffuseLighting>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDiffuseLighting}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feDiffuseLighting>
 */
export function feDiffuseLighting(className?: string, attrs?: SVGFEDiffuseLightingElementAttrs, css?: CSSStyleProps): VNode<SVGFEDiffuseLightingElementAttrs | undefined, SVGFEDiffuseLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDiffuseLighting << VNodeFlags.ElementIdOffset),
    "feDiffuseLighting",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feDisplacementMap>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feDisplacementMap>
 */
export function feDisplacementMap(className?: string, attrs?: SVGFEDisplacementMapElementAttrs, css?: CSSStyleProps): VNode<SVGFEDisplacementMapElementAttrs | undefined, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDisplacementMap << VNodeFlags.ElementIdOffset),
    "feDisplacementMap",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feDistantLight>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDistantLight}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feDistantLight>
 */
export function feDistantLight(className?: string, attrs?: SVGFEDistantLightElementAttrs, css?: CSSStyleProps): VNode<SVGFEDistantLightElementAttrs | undefined, SVGFEDistantLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDistantLight << VNodeFlags.ElementIdOffset),
    "feDistantLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feDropShadow>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDropShadow}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feDropShadow>
 */
export function feDropShadow(className?: string, attrs?: SVGFEDisplacementMapElementAttrs, css?: CSSStyleProps): VNode<SVGFEDisplacementMapElementAttrs | undefined, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDropShadow << VNodeFlags.ElementIdOffset),
    "feDropShadow",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feFlood>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFlood}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feFlood>
 */
export function feFlood(className?: string, attrs?: SVGFEFloodElementAttrs, css?: CSSStyleProps): VNode<SVGFEFloodElementAttrs | undefined, SVGFEFloodElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFlood << VNodeFlags.ElementIdOffset),
    "feFlood",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feFuncA>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncA}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feFuncA>
 */
export function feFuncA(className?: string, attrs?: SVGFEFuncAElementAttrs, css?: CSSStyleProps): VNode<SVGFEFuncAElementAttrs | undefined, SVGFEFuncAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncA << VNodeFlags.ElementIdOffset),
    "feFuncA",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feFuncB>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncB}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feFuncB>
 */
export function feFuncB(className?: string, attrs?: SVGFEFuncBElementAttrs, css?: CSSStyleProps): VNode<SVGFEFuncBElementAttrs | undefined, SVGFEFuncBElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncB << VNodeFlags.ElementIdOffset),
    "feFuncB",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feFuncG>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncG}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feFuncG>
 */
export function feFuncG(className?: string, attrs?: SVGFEFuncGElementAttrs, css?: CSSStyleProps): VNode<SVGFEFuncGElementAttrs | undefined, SVGFEFuncGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncG << VNodeFlags.ElementIdOffset),
    "feFuncG",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feFuncR>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncR}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feFuncR>
 */
export function feFuncR(className?: string, attrs?: SVGFEFuncRElementAttrs, css?: CSSStyleProps): VNode<SVGFEFuncRElementAttrs | undefined, SVGFEFuncRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncR << VNodeFlags.ElementIdOffset),
    "feFuncR",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feGaussianBlur>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feGaussianBlur>
 */
export function feGaussianBlur(className?: string, attrs?: SVGFEGaussianBlurElementAttrs, css?: CSSStyleProps): VNode<SVGFEGaussianBlurElementAttrs | undefined, SVGFEGaussianBlurElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeGaussianBlur << VNodeFlags.ElementIdOffset),
    "feGaussianBlur",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feImage>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feImage}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feImage>
 */
export function feImage(className?: string, attrs?: SVGFEImageElementAttrs, css?: CSSStyleProps): VNode<SVGFEImageElementAttrs | undefined, SVGFEImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeImage << VNodeFlags.ElementIdOffset),
    "feImage",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feMerge>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMerge}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feMerge>
 */
export function feMerge(className?: string, attrs?: SVGFEMergeElementAttrs, css?: CSSStyleProps): VNode<SVGFEMergeElementAttrs | undefined, SVGFEMergeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMerge << VNodeFlags.ElementIdOffset),
    "feMerge",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feMergeNode>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMergeNode}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feMergeNode>
 */
export function feMergeNode(className?: string, attrs?: SVGFEMergeNodeElementAttrs, css?: CSSStyleProps): VNode<SVGFEMergeNodeElementAttrs | undefined, SVGFEMergeNodeElementAttrs> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMergeNode << VNodeFlags.ElementIdOffset),
    "feMergeNode",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feMorphology>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMorphology}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feMorphology>
 */
export function feMorphology(className?: string, attrs?: SVGFEMorphologyElementAttrs, css?: CSSStyleProps): VNode<SVGFEMorphologyElementAttrs | undefined, SVGFEMorphologyElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMorphology << VNodeFlags.ElementIdOffset),
    "feMorphology",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feOffset>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feOffset}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feOffset>
 */
export function feOffset(className?: string, attrs?: SVGFEOffsetElementAttrs, css?: CSSStyleProps): VNode<SVGFEOffsetElementAttrs | undefined, SVGFEOffsetElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeOffset << VNodeFlags.ElementIdOffset),
    "feOffset",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <fePointLight>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/fePointLight}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <fePointLight>
 */
export function fePointLight(className?: string, attrs?: SVGFEPointLightElementAttrs, css?: CSSStyleProps): VNode<SVGFEPointLightElementAttrs | undefined, SVGFEPointLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FePointLight << VNodeFlags.ElementIdOffset),
    "fePointLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feSpecularLighting>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feSpecularLighting>
 */
export function feSpecularLighting(className?: string, attrs?: SVGFESpecularLightingElementAttrs, css?: CSSStyleProps): VNode<SVGFESpecularLightingElementAttrs | undefined, SVGFESpecularLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpecularLighting << VNodeFlags.ElementIdOffset),
    "feSpecularLighting",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feSpotLight>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpotLight}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feSpotLight>
 */
export function feSpotLight(className?: string, attrs?: SVGFESpotLightElementAttrs, css?: CSSStyleProps): VNode<SVGFESpotLightElementAttrs | undefined, SVGFESpotLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpotLight << VNodeFlags.ElementIdOffset),
    "feSpotLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feTile>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTile}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feTile>
 */
export function feTile(className?: string, attrs?: SVGFETileElementAttrs, css?: CSSStyleProps): VNode<SVGFETileElementAttrs | undefined, SVGFETileElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTile << VNodeFlags.ElementIdOffset),
    "feTile",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <feTurbulence>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <feTurbulence>
 */
export function feTurbulence(className?: string, attrs?: SVGFETurbulenceElementAttrs, css?: CSSStyleProps): VNode<SVGFETurbulenceElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTurbulence << VNodeFlags.ElementIdOffset),
    "feTurbulence",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <filter>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <filter>
 */
export function filter(className?: string, attrs?: SVGFilterElementAttrs, css?: CSSStyleProps): VNode<SVGFilterElementAttrs | undefined, SVGFilterElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Filter << VNodeFlags.ElementIdOffset),
    "filter",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <foreignObject>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <foreignObject>
 */
export function foreignObject(className?: string, attrs?: SVGForeignObjectElementAttrs, css?: CSSStyleProps): VNode<SVGForeignObjectElementAttrs | undefined, SVGForeignObjectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ForeignObject << VNodeFlags.ElementIdOffset),
    "foreignObject",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <g>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <g>
 */
export function g(className?: string, attrs?: SVGGElementAttrs, css?: CSSStyleProps): VNode<SVGGElementAttrs | undefined, SVGGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.G << VNodeFlags.ElementIdOffset),
    "g",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <hatch>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/hatch}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <hatch>
 */
export function hatch(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatch << VNodeFlags.ElementIdOffset),
    "hatch",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <hatchpath>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/hatchpath}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <hatchpath>
 */
export function hatchpath(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatchpath << VNodeFlags.ElementIdOffset),
    "hatchpath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <image>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <image>
 */
export function image(className?: string, attrs?: SVGImageElementAttrs, css?: CSSStyleProps): VNode<SVGImageElementAttrs | undefined, SVGImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Image << VNodeFlags.ElementIdOffset),
    "image",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <line>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <line>
 */
export function line(className?: string, attrs?: SVGLineElementAttrs, css?: CSSStyleProps): VNode<SVGLineElementAttrs | undefined, SVGLineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Line << VNodeFlags.ElementIdOffset),
    "line",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <linearGradient>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <linearGradient>
 */
export function linearGradient(className?: string, attrs?: SVGLinearGradientElementAttrs, css?: CSSStyleProps): VNode<SVGLinearGradientElementAttrs | undefined, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.LinearGradient << VNodeFlags.ElementIdOffset),
    "linearGradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <marker>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <marker>
 */
export function marker(className?: string, attrs?: SVGMarkerElementAttrs, css?: CSSStyleProps): VNode<SVGMarkerElementAttrs | undefined, SVGMarkerElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Marker << VNodeFlags.ElementIdOffset),
    "marker",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <mask>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <mask>
 */
export function mask(className?: string, attrs?: SVGMaskElementAttrs, css?: CSSStyleProps): VNode<SVGMaskElementAttrs | undefined, SVGMaskElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mask << VNodeFlags.ElementIdOffset),
    "mask",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <mesh>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mesh}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <mesh>
 */
export function mesh(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mesh << VNodeFlags.ElementIdOffset),
    "mesh",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <meshgradient>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/meshgradient}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <meshgradient>
 */
export function meshgradient(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshgradient << VNodeFlags.ElementIdOffset),
    "meshgradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <meshpatch>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/meshpatch}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <meshpatch>
 */
export function meshpatch(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshpatch << VNodeFlags.ElementIdOffset),
    "meshpatch",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <meshrow>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/meshrow}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <meshrow>
 */
export function meshrow(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshrow << VNodeFlags.ElementIdOffset),
    "meshrow",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <metadata>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/metadata}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <metadata>
 */
export function metadata(className?: string, attrs?: SVGMetadataElementAttrs, css?: CSSStyleProps): VNode<SVGMetadataElementAttrs | undefined, SVGMetadataElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Metadata << VNodeFlags.ElementIdOffset),
    "metadata",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <mpath>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mpath}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <mpath>
 */
export function mpath(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mpath << VNodeFlags.ElementIdOffset),
    "mpath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <path>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <path>
 */
export function path(className?: string, attrs?: SVGPathElementAttrs, css?: CSSStyleProps): VNode<SVGPathElementAttrs | undefined, SVGPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Path << VNodeFlags.ElementIdOffset),
    "path",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <pattern>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <pattern>
 */
export function pattern(className?: string, attrs?: SVGPatternElementAttrs, css?: CSSStyleProps): VNode<SVGPatternElementAttrs | undefined, SVGPatternElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Pattern << VNodeFlags.ElementIdOffset),
    "pattern",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <polygon>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <polygon>
 */
export function polygon(className?: string, attrs?: SVGPolygonElementAttrs, css?: CSSStyleProps): VNode<SVGPolygonElementAttrs | undefined, SVGPolygonElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polygon << VNodeFlags.ElementIdOffset),
    "polygon",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <polyline>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <polyline>
 */
export function polyline(className?: string, attrs?: SVGPolylineElementAttrs, css?: CSSStyleProps): VNode<SVGPolylineElementAttrs | undefined, SVGPolylineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polyline << VNodeFlags.ElementIdOffset),
    "polyline",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <radialGradient>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <radialGradient>
 */
export function radialGradient(className?: string, attrs?: SVGRadialGradientElementAttrs, css?: CSSStyleProps): VNode<SVGRadialGradientElementAttrs | undefined, SVGRadialGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.RadialGradient << VNodeFlags.ElementIdOffset),
    "radialGradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <rect>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <rect>
 */
export function rect(className?: string, attrs?: SVGRectElementAttrs, css?: CSSStyleProps): VNode<SVGRectElementAttrs | undefined, SVGRectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Rect << VNodeFlags.ElementIdOffset),
    "rect",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <set>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/set}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <set>
 */
export function set(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Set << VNodeFlags.ElementIdOffset),
    "set",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <solidcolor>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/solidcolor}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <solidcolor>
 */
export function solidcolor(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Solidcolor << VNodeFlags.ElementIdOffset),
    "solidcolor",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <stop>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <stop>
 */
export function stop(className?: string, attrs?: SVGStopElementAttrs, css?: CSSStyleProps): VNode<SVGStopElementAttrs | undefined, SVGStopElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Stop << VNodeFlags.ElementIdOffset),
    "stop",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <svg>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <svg>
 */
export function svg(className?: string, attrs?: SVGSVGElementAttrs, css?: CSSStyleProps): VNode<SVGSVGElementAttrs | undefined, SVGSVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Svg << VNodeFlags.ElementIdOffset),
    "svg",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <symbol>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <symbol>
 */
export function symbol(className?: string, attrs?: SVGSymbolElementAttrs, css?: CSSStyleProps): VNode<SVGSymbolElementAttrs | undefined, SVGSymbolElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Symbol << VNodeFlags.ElementIdOffset),
    "symbol",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <text>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <text>
 */
export function text(className?: string, attrs?: SVGTextElementAttrs, css?: CSSStyleProps): VNode<SVGTextElementAttrs | undefined, SVGTextElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Text << VNodeFlags.ElementIdOffset),
    "text",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <textPath>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <textPath>
 */
export function textPath(className?: string, attrs?: SVGTextPathElementAttrs, css?: CSSStyleProps): VNode<SVGTextPathElementAttrs | undefined, SVGTextPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.TextPath << VNodeFlags.ElementIdOffset),
    "textPath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <title>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <title>
 */
export function title(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGTitleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <tspan>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <tspan>
 */
export function tspan(className?: string, attrs?: SVGTSpanElementAttrs, css?: CSSStyleProps): VNode<SVGTSpanElementAttrs | undefined, SVGTSpanElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Tspan << VNodeFlags.ElementIdOffset),
    "tspan",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <use>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <use>
 */
export function use(className?: string, attrs?: SVGUseElementAttrs, css?: CSSStyleProps): VNode<SVGUseElementAttrs | undefined, SVGUseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Use << VNodeFlags.ElementIdOffset),
    "use",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

/**
 * Creates Virtual DOM SVG element <view>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/view}
 *
 * @param className - Class name
 * @param attrs - Attributes
 * @param css - Styles
 * @returns Virtual DOM SVG element <view>
 */
export function view(className?: string, attrs?: SVGViewElementAttrs, css?: CSSStyleProps): VNode<SVGViewElementAttrs | undefined, SVGViewElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.View << VNodeFlags.ElementIdOffset),
    "view",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

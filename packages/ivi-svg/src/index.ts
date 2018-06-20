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
  AltGlyph = 2,
  AltGlyphDef = 3,
  AltGlyphItem = 4,
  Animate = 5,
  AnimateColor = 6,
  AnimateMotion = 7,
  AnimateTransform = 8,
  Circle = 9,
  ClipPath = 10,
  ColorProfile = 11,
  Cursor = 12,
  Defs = 13,
  Desc = 14,
  Discard = 15,
  Ellipse = 16,
  FeBlend = 17,
  FeColorMatrix = 18,
  FeComponentTransfer = 19,
  FeComposite = 20,
  FeConvolveMatrix = 21,
  FeDiffuseLighting = 22,
  FeDisplacementMap = 23,
  FeDistantLight = 24,
  FeDropShadow = 25,
  FeFlood = 26,
  FeFuncA = 27,
  FeFuncB = 28,
  FeFuncG = 29,
  FeFuncR = 30,
  FeGaussianBlur = 31,
  FeImage = 32,
  FeMerge = 33,
  FeMergeNode = 34,
  FeMorphology = 35,
  FeOffset = 36,
  FePointLight = 37,
  FeSpecularLighting = 38,
  FeSpotLight = 39,
  FeTile = 40,
  FeTurbulence = 41,
  Filter = 42,
  Font = 43,
  FontFace = 44,
  FontFaceFormat = 45,
  FontFaceName = 46,
  FontFaceSrc = 47,
  FontFaceUri = 48,
  ForeignObject = 49,
  G = 50,
  Glyph = 51,
  GlyphRef = 52,
  Hatch = 53,
  Hatchpath = 54,
  Hkern = 55,
  Image = 56,
  Line = 57,
  LinearGradient = 58,
  Marker = 59,
  Mask = 60,
  Mesh = 61,
  Meshgradient = 62,
  Meshpatch = 63,
  Meshrow = 64,
  Metadata = 65,
  MissingGlyph = 66,
  Mpath = 67,
  Path = 68,
  Pattern = 69,
  Polygon = 70,
  Polyline = 71,
  RadialGradient = 72,
  Rect = 73,
  Set = 74,
  Solidcolor = 75,
  Stop = 76,
  Svg = 77,
  Switch = 78,
  Symbol = 79,
  Text = 80,
  TextPath = 81,
  Title = 82,
  Tref = 83,
  Tspan = 84,
  Use = 85,
  View = 86,
  Vkern = 87,
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
export function a(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function altGlyph(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyph << VNodeFlags.ElementIdOffset),
    "altGlyph",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function altGlyphDef(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyphDef << VNodeFlags.ElementIdOffset),
    "altGlyphDef",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function altGlyphItem(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyphItem << VNodeFlags.ElementIdOffset),
    "altGlyphItem",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function animate(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Animate << VNodeFlags.ElementIdOffset),
    "animate",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function animateColor(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateColor << VNodeFlags.ElementIdOffset),
    "animateColor",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function animateMotion(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateMotion << VNodeFlags.ElementIdOffset),
    "animateMotion",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function animateTransform(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateTransform << VNodeFlags.ElementIdOffset),
    "animateTransform",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function circle(className?: string, attrs?: SVGCircleElementAttrs, css?: CSSStyleProps): VNode<SVGCircleElementAttrs | undefined, SVGCircleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Circle << VNodeFlags.ElementIdOffset),
    "circle",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function clipPath(className?: string, attrs?: SVGClipPathElementAttrs, css?: CSSStyleProps): VNode<SVGClipPathElementAttrs | undefined, SVGClipPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ClipPath << VNodeFlags.ElementIdOffset),
    "clipPath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function colorProfile(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ColorProfile << VNodeFlags.ElementIdOffset),
    "color-profile",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function cursor(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Cursor << VNodeFlags.ElementIdOffset),
    "cursor",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function defs(className?: string, attrs?: SVGDefsElementAttrs, css?: CSSStyleProps): VNode<SVGDefsElementAttrs | undefined, SVGDefsElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Defs << VNodeFlags.ElementIdOffset),
    "defs",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function desc(className?: string, attrs?: SVGDescElementAttrs, css?: CSSStyleProps): VNode<SVGDescElementAttrs | undefined, SVGDescElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Desc << VNodeFlags.ElementIdOffset),
    "desc",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function discard(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Discard << VNodeFlags.ElementIdOffset),
    "discard",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function ellipse(className?: string, attrs?: SVGEllipseElementAttrs, css?: CSSStyleProps): VNode<SVGEllipseElementAttrs | undefined, SVGEllipseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Ellipse << VNodeFlags.ElementIdOffset),
    "ellipse",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feBlend(className?: string, attrs?: SVGFEBlendElementAttrs, css?: CSSStyleProps): VNode<SVGFEBlendElementAttrs | undefined, SVGFEBlendElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeBlend << VNodeFlags.ElementIdOffset),
    "feBlend",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feColorMatrix(className?: string, attrs?: SVGFEColorMatrixElementAttrs, css?: CSSStyleProps): VNode<SVGFEColorMatrixElementAttrs | undefined, SVGFEColorMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeColorMatrix << VNodeFlags.ElementIdOffset),
    "feColorMatrix",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feComponentTransfer(className?: string, attrs?: SVGFEComponentTransferElementAttrs, css?: CSSStyleProps): VNode<SVGFEComponentTransferElementAttrs | undefined, SVGFEComponentTransferElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComponentTransfer << VNodeFlags.ElementIdOffset),
    "feComponentTransfer",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feComposite(className?: string, attrs?: SVGFECompositeElementAttrs, css?: CSSStyleProps): VNode<SVGFECompositeElementAttrs | undefined, SVGFECompositeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComposite << VNodeFlags.ElementIdOffset),
    "feComposite",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feConvolveMatrix(className?: string, attrs?: SVGFEConvolveMatrixElementAttrs, css?: CSSStyleProps): VNode<SVGFEConvolveMatrixElementAttrs | undefined, SVGFEConvolveMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeConvolveMatrix << VNodeFlags.ElementIdOffset),
    "feConvolveMatrix",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feDiffuseLighting(className?: string, attrs?: SVGFEDiffuseLightingElementAttrs, css?: CSSStyleProps): VNode<SVGFEDiffuseLightingElementAttrs | undefined, SVGFEDiffuseLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDiffuseLighting << VNodeFlags.ElementIdOffset),
    "feDiffuseLighting",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feDisplacementMap(className?: string, attrs?: SVGFEDisplacementMapElementAttrs, css?: CSSStyleProps): VNode<SVGFEDisplacementMapElementAttrs | undefined, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDisplacementMap << VNodeFlags.ElementIdOffset),
    "feDisplacementMap",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feDistantLight(className?: string, attrs?: SVGFEDistantLightElementAttrs, css?: CSSStyleProps): VNode<SVGFEDistantLightElementAttrs | undefined, SVGFEDistantLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDistantLight << VNodeFlags.ElementIdOffset),
    "feDistantLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feDropShadow(className?: string, attrs?: SVGFEDisplacementMapElementAttrs, css?: CSSStyleProps): VNode<SVGFEDisplacementMapElementAttrs | undefined, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDropShadow << VNodeFlags.ElementIdOffset),
    "feDropShadow",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFlood(className?: string, attrs?: SVGFEFloodElementAttrs, css?: CSSStyleProps): VNode<SVGFEFloodElementAttrs | undefined, SVGFEFloodElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFlood << VNodeFlags.ElementIdOffset),
    "feFlood",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFuncA(className?: string, attrs?: SVGFEFuncAElementAttrs, css?: CSSStyleProps): VNode<SVGFEFuncAElementAttrs | undefined, SVGFEFuncAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncA << VNodeFlags.ElementIdOffset),
    "feFuncA",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFuncB(className?: string, attrs?: SVGFEFuncBElementAttrs, css?: CSSStyleProps): VNode<SVGFEFuncBElementAttrs | undefined, SVGFEFuncBElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncB << VNodeFlags.ElementIdOffset),
    "feFuncB",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFuncG(className?: string, attrs?: SVGFEFuncGElementAttrs, css?: CSSStyleProps): VNode<SVGFEFuncGElementAttrs | undefined, SVGFEFuncGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncG << VNodeFlags.ElementIdOffset),
    "feFuncG",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFuncR(className?: string, attrs?: SVGFEFuncRElementAttrs, css?: CSSStyleProps): VNode<SVGFEFuncRElementAttrs | undefined, SVGFEFuncRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncR << VNodeFlags.ElementIdOffset),
    "feFuncR",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feGaussianBlur(className?: string, attrs?: SVGFEGaussianBlurElementAttrs, css?: CSSStyleProps): VNode<SVGFEGaussianBlurElementAttrs | undefined, SVGFEGaussianBlurElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeGaussianBlur << VNodeFlags.ElementIdOffset),
    "feGaussianBlur",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feImage(className?: string, attrs?: SVGFEImageElementAttrs, css?: CSSStyleProps): VNode<SVGFEImageElementAttrs | undefined, SVGFEImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeImage << VNodeFlags.ElementIdOffset),
    "feImage",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feMerge(className?: string, attrs?: SVGFEMergeElementAttrs, css?: CSSStyleProps): VNode<SVGFEMergeElementAttrs | undefined, SVGFEMergeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMerge << VNodeFlags.ElementIdOffset),
    "feMerge",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feMergeNode(className?: string, attrs?: SVGFEMergeNodeElementAttrs, css?: CSSStyleProps): VNode<SVGFEMergeNodeElementAttrs | undefined, SVGFEMergeNodeElementAttrs> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMergeNode << VNodeFlags.ElementIdOffset),
    "feMergeNode",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feMorphology(className?: string, attrs?: SVGFEMorphologyElementAttrs, css?: CSSStyleProps): VNode<SVGFEMorphologyElementAttrs | undefined, SVGFEMorphologyElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMorphology << VNodeFlags.ElementIdOffset),
    "feMorphology",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feOffset(className?: string, attrs?: SVGFEOffsetElementAttrs, css?: CSSStyleProps): VNode<SVGFEOffsetElementAttrs | undefined, SVGFEOffsetElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeOffset << VNodeFlags.ElementIdOffset),
    "feOffset",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fePointLight(className?: string, attrs?: SVGFEPointLightElementAttrs, css?: CSSStyleProps): VNode<SVGFEPointLightElementAttrs | undefined, SVGFEPointLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FePointLight << VNodeFlags.ElementIdOffset),
    "fePointLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feSpecularLighting(className?: string, attrs?: SVGFESpecularLightingElementAttrs, css?: CSSStyleProps): VNode<SVGFESpecularLightingElementAttrs | undefined, SVGFESpecularLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpecularLighting << VNodeFlags.ElementIdOffset),
    "feSpecularLighting",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feSpotLight(className?: string, attrs?: SVGFESpotLightElementAttrs, css?: CSSStyleProps): VNode<SVGFESpotLightElementAttrs | undefined, SVGFESpotLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpotLight << VNodeFlags.ElementIdOffset),
    "feSpotLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feTile(className?: string, attrs?: SVGFETileElementAttrs, css?: CSSStyleProps): VNode<SVGFETileElementAttrs | undefined, SVGFETileElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTile << VNodeFlags.ElementIdOffset),
    "feTile",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feTurbulence(className?: string, attrs?: SVGFETurbulenceElementAttrs, css?: CSSStyleProps): VNode<SVGFETurbulenceElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTurbulence << VNodeFlags.ElementIdOffset),
    "feTurbulence",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function filter(className?: string, attrs?: SVGFilterElementAttrs, css?: CSSStyleProps): VNode<SVGFilterElementAttrs | undefined, SVGFilterElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Filter << VNodeFlags.ElementIdOffset),
    "filter",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function font(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Font << VNodeFlags.ElementIdOffset),
    "font",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFace(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFace << VNodeFlags.ElementIdOffset),
    "font-face",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFaceFormat(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceFormat << VNodeFlags.ElementIdOffset),
    "font-face-format",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFaceName(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceName << VNodeFlags.ElementIdOffset),
    "font-face-name",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFaceSrc(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceSrc << VNodeFlags.ElementIdOffset),
    "font-face-src",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFaceUri(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceUri << VNodeFlags.ElementIdOffset),
    "font-face-uri",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function foreignObject(className?: string, attrs?: SVGForeignObjectElementAttrs, css?: CSSStyleProps): VNode<SVGForeignObjectElementAttrs | undefined, SVGForeignObjectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ForeignObject << VNodeFlags.ElementIdOffset),
    "foreignObject",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function g(className?: string, attrs?: SVGGElementAttrs, css?: CSSStyleProps): VNode<SVGGElementAttrs | undefined, SVGGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.G << VNodeFlags.ElementIdOffset),
    "g",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function glyph(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Glyph << VNodeFlags.ElementIdOffset),
    "glyph",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function glyphRef(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.GlyphRef << VNodeFlags.ElementIdOffset),
    "glyphRef",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function hatch(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatch << VNodeFlags.ElementIdOffset),
    "hatch",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function hatchpath(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatchpath << VNodeFlags.ElementIdOffset),
    "hatchpath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function hkern(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hkern << VNodeFlags.ElementIdOffset),
    "hkern",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function image(className?: string, attrs?: SVGImageElementAttrs, css?: CSSStyleProps): VNode<SVGImageElementAttrs | undefined, SVGImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Image << VNodeFlags.ElementIdOffset),
    "image",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function line(className?: string, attrs?: SVGLineElementAttrs, css?: CSSStyleProps): VNode<SVGLineElementAttrs | undefined, SVGLineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Line << VNodeFlags.ElementIdOffset),
    "line",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function linearGradient(className?: string, attrs?: SVGLinearGradientElementAttrs, css?: CSSStyleProps): VNode<SVGLinearGradientElementAttrs | undefined, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.LinearGradient << VNodeFlags.ElementIdOffset),
    "linearGradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function marker(className?: string, attrs?: SVGMarkerElementAttrs, css?: CSSStyleProps): VNode<SVGMarkerElementAttrs | undefined, SVGMarkerElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Marker << VNodeFlags.ElementIdOffset),
    "marker",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function mask(className?: string, attrs?: SVGMaskElementAttrs, css?: CSSStyleProps): VNode<SVGMaskElementAttrs | undefined, SVGMaskElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mask << VNodeFlags.ElementIdOffset),
    "mask",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function mesh(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mesh << VNodeFlags.ElementIdOffset),
    "mesh",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function meshgradient(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshgradient << VNodeFlags.ElementIdOffset),
    "meshgradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function meshpatch(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshpatch << VNodeFlags.ElementIdOffset),
    "meshpatch",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function meshrow(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshrow << VNodeFlags.ElementIdOffset),
    "meshrow",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function metadata(className?: string, attrs?: SVGMetadataElementAttrs, css?: CSSStyleProps): VNode<SVGMetadataElementAttrs | undefined, SVGMetadataElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Metadata << VNodeFlags.ElementIdOffset),
    "metadata",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function missingGlyph(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.MissingGlyph << VNodeFlags.ElementIdOffset),
    "missing-glyph",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function mpath(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mpath << VNodeFlags.ElementIdOffset),
    "mpath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function path(className?: string, attrs?: SVGPathElementAttrs, css?: CSSStyleProps): VNode<SVGPathElementAttrs | undefined, SVGPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Path << VNodeFlags.ElementIdOffset),
    "path",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function pattern(className?: string, attrs?: SVGPatternElementAttrs, css?: CSSStyleProps): VNode<SVGPatternElementAttrs | undefined, SVGPatternElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Pattern << VNodeFlags.ElementIdOffset),
    "pattern",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function polygon(className?: string, attrs?: SVGPolygonElementAttrs, css?: CSSStyleProps): VNode<SVGPolygonElementAttrs | undefined, SVGPolygonElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polygon << VNodeFlags.ElementIdOffset),
    "polygon",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function polyline(className?: string, attrs?: SVGPolylineElementAttrs, css?: CSSStyleProps): VNode<SVGPolylineElementAttrs | undefined, SVGPolylineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polyline << VNodeFlags.ElementIdOffset),
    "polyline",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function radialGradient(className?: string, attrs?: SVGRadialGradientElementAttrs, css?: CSSStyleProps): VNode<SVGRadialGradientElementAttrs | undefined, SVGRadialGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.RadialGradient << VNodeFlags.ElementIdOffset),
    "radialGradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function rect(className?: string, attrs?: SVGRectElementAttrs, css?: CSSStyleProps): VNode<SVGRectElementAttrs | undefined, SVGRectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Rect << VNodeFlags.ElementIdOffset),
    "rect",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function set(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Set << VNodeFlags.ElementIdOffset),
    "set",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function solidcolor(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Solidcolor << VNodeFlags.ElementIdOffset),
    "solidcolor",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function stop(className?: string, attrs?: SVGStopElementAttrs, css?: CSSStyleProps): VNode<SVGStopElementAttrs | undefined, SVGStopElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Stop << VNodeFlags.ElementIdOffset),
    "stop",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function svg(className?: string, attrs?: SVGSVGElementAttrs, css?: CSSStyleProps): VNode<SVGSVGElementAttrs | undefined, SVGSVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Svg << VNodeFlags.ElementIdOffset),
    "svg",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function svgSwitch(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGSwitchElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Switch << VNodeFlags.ElementIdOffset),
    "switch",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function symbol(className?: string, attrs?: SVGSymbolElementAttrs, css?: CSSStyleProps): VNode<SVGSymbolElementAttrs | undefined, SVGSymbolElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Symbol << VNodeFlags.ElementIdOffset),
    "symbol",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function text(className?: string, attrs?: SVGTextElementAttrs, css?: CSSStyleProps): VNode<SVGTextElementAttrs | undefined, SVGTextElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Text << VNodeFlags.ElementIdOffset),
    "text",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function textPath(className?: string, attrs?: SVGTextPathElementAttrs, css?: CSSStyleProps): VNode<SVGTextPathElementAttrs | undefined, SVGTextPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.TextPath << VNodeFlags.ElementIdOffset),
    "textPath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function title(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGTitleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function tref(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Tref << VNodeFlags.ElementIdOffset),
    "tref",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function tspan(className?: string, attrs?: SVGTSpanElementAttrs, css?: CSSStyleProps): VNode<SVGTSpanElementAttrs | undefined, SVGTSpanElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Tspan << VNodeFlags.ElementIdOffset),
    "tspan",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function use(className?: string, attrs?: SVGUseElementAttrs, css?: CSSStyleProps): VNode<SVGUseElementAttrs | undefined, SVGUseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Use << VNodeFlags.ElementIdOffset),
    "use",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function view(className?: string, attrs?: SVGViewElementAttrs, css?: CSSStyleProps): VNode<SVGViewElementAttrs | undefined, SVGViewElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.View << VNodeFlags.ElementIdOffset),
    "view",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function vkern(className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps): VNode<SVGElementAttrs | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Vkern << VNodeFlags.ElementIdOffset),
    "vkern",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

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
  ATTRIBUTE_DIRECTIVE_REMOVE_ATTR_UNDEFINED,

  VNode, VNodeFlags, AttributeDirective,
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

const ATTRIBUTE_DIRECTIVE_SET_XML_ATTR_EMPTY_STRING = {
  v: "",
  u: (element: Element, key: string, prev: any) => {
    if (prev !== "") {
      elementSetAttributeNS.call(element, XML_NAMESPACE, key, "");
    }
  },
};

const ATTRIBUTE_DIRECTIVE_SET_XLINK_ATTR_EMPTY_STRING = {
  v: "",
  u: (element: Element, key: string, prev: any) => {
    if (prev !== "") {
      elementSetAttributeNS.call(element, XLINK_NAMESPACE, key, "");
    }
  },
};

function updateNSAttr(
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
 * Update function for an {@link AttributeDirective} created with {@link XML_ATTR} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function updateXMLAttr(
  element: Element,
  key: string,
  prev: string | number | boolean | undefined,
  next: string | number | boolean | undefined,
) {
  updateNSAttr(element, XML_NAMESPACE, key, prev, next);
}

/**
 * Update function for an {@link AttributeDirective} created with {@link XLINK_ATTR} function.
 *
 * @param element - Target element
 * @param key - Attribute key
 * @param prev - Previous value
 * @param next - Next value
 */
function updateXLinkAttr(
  element: Element,
  key: string,
  prev: string | number | boolean | undefined,
  next: string | number | boolean | undefined,
) {
  updateNSAttr(element, XLINK_NAMESPACE, key, prev, next);
}

/**
 * Helper function that creates a {@link AttributeDirective} for namespaced attribute.
 *
 * @param v - Attribute value
 * @param emptyString - Attribute directive that should be used for empty strings
 * @param s - Synchronization function
 */
function NS_ATTR(
  v: string | number | boolean | undefined,
  emptyString: AttributeDirective<string | number | boolean>,
  u: (
    element: Element,
    key: string,
    prev: string | number | boolean | undefined,
    next: string | number | boolean | undefined,
  ) => void,
): AttributeDirective<string | number | boolean> {
  if (typeof v === "boolean") {
    if (v) {
      return emptyString;
    }
    v = void 0;
  }
  return (v === void 0) ? ATTRIBUTE_DIRECTIVE_REMOVE_ATTR_UNDEFINED : { v, u };
}

/**
 * XML_ATTR function creates an {@link AttributeDirective} that assigns an attribute from XML namespace, attribute name
 * is derived from the `key`.
 *
 * `undefined` values are removed.
 *
 * @example
 *
 *   const e = circle("", { "xml:text": XML_ATTR("abc") });
 *
 * @param v - Value
 * @returns {@link AttributeDirective}
 */
export function XML_ATTR(v: string | number | boolean | undefined): AttributeDirective<string | number | boolean> {
  return NS_ATTR(v, ATTRIBUTE_DIRECTIVE_SET_XML_ATTR_EMPTY_STRING, updateXMLAttr);
}

/**
 * XLINK_ATTR function creates an {@link AttributeDirective} that assigns an attribute from XLINK namespace, attribute
 * name is derived from the `key`.
 *
 * `undefined` values are removed.
 *
 * @example
 *
 *   const e = circle("", { "xlink:text": XLINK_ATTR("abc") });
 *
 * @param v - Value
 * @returns {@link AttributeDirective}
 */
export function XLINK_ATTR(v: string | number | boolean | undefined): AttributeDirective<string | number | boolean> {
  return NS_ATTR(v, ATTRIBUTE_DIRECTIVE_SET_XLINK_ATTR_EMPTY_STRING, updateXLinkAttr);
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
export const a = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGAElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    attrs,
    className,
    css,
  )
);

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
export const animate = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Animate << VNodeFlags.ElementIdOffset),
    "animate",
    attrs,
    className,
    css,
  )
);

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
export const animateColor = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateColor << VNodeFlags.ElementIdOffset),
    "animateColor",
    attrs,
    className,
    css,
  )
);

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
export const animateMotion = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateMotion << VNodeFlags.ElementIdOffset),
    "animateMotion",
    attrs,
    className,
    css,
  )
);

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
export const animateTransform = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateTransform << VNodeFlags.ElementIdOffset),
    "animateTransform",
    attrs,
    className,
    css,
  )
);

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
export const circle = (className?: string, attrs?: SVGCircleElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGCircleElementAttrs | undefined, SVGCircleElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Circle << VNodeFlags.ElementIdOffset),
    "circle",
    attrs,
    className,
    css,
  )
);

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
export const clipPath = (className?: string, attrs?: SVGClipPathElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGClipPathElementAttrs | undefined, SVGClipPathElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ClipPath << VNodeFlags.ElementIdOffset),
    "clipPath",
    attrs,
    className,
    css,
  )
);

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
export const defs = (className?: string, attrs?: SVGDefsElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGDefsElementAttrs | undefined, SVGDefsElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Defs << VNodeFlags.ElementIdOffset),
    "defs",
    attrs,
    className,
    css,
  )
);

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
export const desc = (className?: string, attrs?: SVGDescElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGDescElementAttrs | undefined, SVGDescElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Desc << VNodeFlags.ElementIdOffset),
    "desc",
    attrs,
    className,
    css,
  )
);

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
export const discard = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Discard << VNodeFlags.ElementIdOffset),
    "discard",
    attrs,
    className,
    css,
  )
);

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
export const ellipse = (className?: string, attrs?: SVGEllipseElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGEllipseElementAttrs | undefined, SVGEllipseElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Ellipse << VNodeFlags.ElementIdOffset),
    "ellipse",
    attrs,
    className,
    css,
  )
);

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
export const feBlend = (className?: string, attrs?: SVGFEBlendElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEBlendElementAttrs | undefined, SVGFEBlendElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeBlend << VNodeFlags.ElementIdOffset),
    "feBlend",
    attrs,
    className,
    css,
  )
);

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
export const feColorMatrix = (className?: string, attrs?: SVGFEColorMatrixElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEColorMatrixElementAttrs | undefined, SVGFEColorMatrixElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeColorMatrix << VNodeFlags.ElementIdOffset),
    "feColorMatrix",
    attrs,
    className,
    css,
  )
);

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
export const feComponentTransfer = (className?: string, attrs?: SVGFEComponentTransferElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEComponentTransferElementAttrs | undefined, SVGFEComponentTransferElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComponentTransfer << VNodeFlags.ElementIdOffset),
    "feComponentTransfer",
    attrs,
    className,
    css,
  )
);

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
export const feComposite = (className?: string, attrs?: SVGFECompositeElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFECompositeElementAttrs | undefined, SVGFECompositeElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComposite << VNodeFlags.ElementIdOffset),
    "feComposite",
    attrs,
    className,
    css,
  )
);

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
export const feConvolveMatrix = (className?: string, attrs?: SVGFEConvolveMatrixElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEConvolveMatrixElementAttrs | undefined, SVGFEConvolveMatrixElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeConvolveMatrix << VNodeFlags.ElementIdOffset),
    "feConvolveMatrix",
    attrs,
    className,
    css,
  )
);

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
export const feDiffuseLighting = (className?: string, attrs?: SVGFEDiffuseLightingElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEDiffuseLightingElementAttrs | undefined, SVGFEDiffuseLightingElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDiffuseLighting << VNodeFlags.ElementIdOffset),
    "feDiffuseLighting",
    attrs,
    className,
    css,
  )
);

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
export const feDisplacementMap = (className?: string, attrs?: SVGFEDisplacementMapElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEDisplacementMapElementAttrs | undefined, SVGFEDisplacementMapElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDisplacementMap << VNodeFlags.ElementIdOffset),
    "feDisplacementMap",
    attrs,
    className,
    css,
  )
);

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
export const feDistantLight = (className?: string, attrs?: SVGFEDistantLightElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEDistantLightElementAttrs | undefined, SVGFEDistantLightElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDistantLight << VNodeFlags.ElementIdOffset),
    "feDistantLight",
    attrs,
    className,
    css,
  )
);

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
export const feDropShadow = (className?: string, attrs?: SVGFEDisplacementMapElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEDisplacementMapElementAttrs | undefined, SVGFEDisplacementMapElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDropShadow << VNodeFlags.ElementIdOffset),
    "feDropShadow",
    attrs,
    className,
    css,
  )
);

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
export const feFlood = (className?: string, attrs?: SVGFEFloodElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEFloodElementAttrs | undefined, SVGFEFloodElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFlood << VNodeFlags.ElementIdOffset),
    "feFlood",
    attrs,
    className,
    css,
  )
);

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
export const feFuncA = (className?: string, attrs?: SVGFEFuncAElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEFuncAElementAttrs | undefined, SVGFEFuncAElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncA << VNodeFlags.ElementIdOffset),
    "feFuncA",
    attrs,
    className,
    css,
  )
);

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
export const feFuncB = (className?: string, attrs?: SVGFEFuncBElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEFuncBElementAttrs | undefined, SVGFEFuncBElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncB << VNodeFlags.ElementIdOffset),
    "feFuncB",
    attrs,
    className,
    css,
  )
);

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
export const feFuncG = (className?: string, attrs?: SVGFEFuncGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEFuncGElementAttrs | undefined, SVGFEFuncGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncG << VNodeFlags.ElementIdOffset),
    "feFuncG",
    attrs,
    className,
    css,
  )
);

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
export const feFuncR = (className?: string, attrs?: SVGFEFuncRElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEFuncRElementAttrs | undefined, SVGFEFuncRElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncR << VNodeFlags.ElementIdOffset),
    "feFuncR",
    attrs,
    className,
    css,
  )
);

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
export const feGaussianBlur = (className?: string, attrs?: SVGFEGaussianBlurElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEGaussianBlurElementAttrs | undefined, SVGFEGaussianBlurElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeGaussianBlur << VNodeFlags.ElementIdOffset),
    "feGaussianBlur",
    attrs,
    className,
    css,
  )
);

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
export const feImage = (className?: string, attrs?: SVGFEImageElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEImageElementAttrs | undefined, SVGFEImageElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeImage << VNodeFlags.ElementIdOffset),
    "feImage",
    attrs,
    className,
    css,
  )
);

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
export const feMerge = (className?: string, attrs?: SVGFEMergeElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEMergeElementAttrs | undefined, SVGFEMergeElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMerge << VNodeFlags.ElementIdOffset),
    "feMerge",
    attrs,
    className,
    css,
  )
);

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
export const feMergeNode = (className?: string, attrs?: SVGFEMergeNodeElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEMergeNodeElementAttrs | undefined, SVGFEMergeNodeElementAttrs>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMergeNode << VNodeFlags.ElementIdOffset),
    "feMergeNode",
    attrs,
    className,
    css,
  )
);

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
export const feMorphology = (className?: string, attrs?: SVGFEMorphologyElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEMorphologyElementAttrs | undefined, SVGFEMorphologyElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMorphology << VNodeFlags.ElementIdOffset),
    "feMorphology",
    attrs,
    className,
    css,
  )
);

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
export const feOffset = (className?: string, attrs?: SVGFEOffsetElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEOffsetElementAttrs | undefined, SVGFEOffsetElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeOffset << VNodeFlags.ElementIdOffset),
    "feOffset",
    attrs,
    className,
    css,
  )
);

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
export const fePointLight = (className?: string, attrs?: SVGFEPointLightElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFEPointLightElementAttrs | undefined, SVGFEPointLightElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FePointLight << VNodeFlags.ElementIdOffset),
    "fePointLight",
    attrs,
    className,
    css,
  )
);

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
export const feSpecularLighting = (className?: string, attrs?: SVGFESpecularLightingElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFESpecularLightingElementAttrs | undefined, SVGFESpecularLightingElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpecularLighting << VNodeFlags.ElementIdOffset),
    "feSpecularLighting",
    attrs,
    className,
    css,
  )
);

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
export const feSpotLight = (className?: string, attrs?: SVGFESpotLightElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFESpotLightElementAttrs | undefined, SVGFESpotLightElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpotLight << VNodeFlags.ElementIdOffset),
    "feSpotLight",
    attrs,
    className,
    css,
  )
);

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
export const feTile = (className?: string, attrs?: SVGFETileElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFETileElementAttrs | undefined, SVGFETileElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTile << VNodeFlags.ElementIdOffset),
    "feTile",
    attrs,
    className,
    css,
  )
);

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
export const feTurbulence = (className?: string, attrs?: SVGFETurbulenceElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFETurbulenceElementAttrs | undefined, SVGFETurbulenceElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTurbulence << VNodeFlags.ElementIdOffset),
    "feTurbulence",
    attrs,
    className,
    css,
  )
);

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
export const filter = (className?: string, attrs?: SVGFilterElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGFilterElementAttrs | undefined, SVGFilterElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Filter << VNodeFlags.ElementIdOffset),
    "filter",
    attrs,
    className,
    css,
  )
);

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
export const foreignObject = (className?: string, attrs?: SVGForeignObjectElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGForeignObjectElementAttrs | undefined, SVGForeignObjectElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ForeignObject << VNodeFlags.ElementIdOffset),
    "foreignObject",
    attrs,
    className,
    css,
  )
);

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
export const g = (className?: string, attrs?: SVGGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGGElementAttrs | undefined, SVGGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.G << VNodeFlags.ElementIdOffset),
    "g",
    attrs,
    className,
    css,
  )
);

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
export const hatch = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatch << VNodeFlags.ElementIdOffset),
    "hatch",
    attrs,
    className,
    css,
  )
);

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
export const hatchpath = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatchpath << VNodeFlags.ElementIdOffset),
    "hatchpath",
    attrs,
    className,
    css,
  )
);

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
export const image = (className?: string, attrs?: SVGImageElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGImageElementAttrs | undefined, SVGImageElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Image << VNodeFlags.ElementIdOffset),
    "image",
    attrs,
    className,
    css,
  )
);

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
export const line = (className?: string, attrs?: SVGLineElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGLineElementAttrs | undefined, SVGLineElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Line << VNodeFlags.ElementIdOffset),
    "line",
    attrs,
    className,
    css,
  )
);

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
export const linearGradient = (className?: string, attrs?: SVGLinearGradientElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGLinearGradientElementAttrs | undefined, SVGLinearGradientElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.LinearGradient << VNodeFlags.ElementIdOffset),
    "linearGradient",
    attrs,
    className,
    css,
  )
);

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
export const marker = (className?: string, attrs?: SVGMarkerElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGMarkerElementAttrs | undefined, SVGMarkerElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Marker << VNodeFlags.ElementIdOffset),
    "marker",
    attrs,
    className,
    css,
  )
);

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
export const mask = (className?: string, attrs?: SVGMaskElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGMaskElementAttrs | undefined, SVGMaskElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mask << VNodeFlags.ElementIdOffset),
    "mask",
    attrs,
    className,
    css,
  )
);

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
export const mesh = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mesh << VNodeFlags.ElementIdOffset),
    "mesh",
    attrs,
    className,
    css,
  )
);

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
export const meshgradient = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGLinearGradientElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshgradient << VNodeFlags.ElementIdOffset),
    "meshgradient",
    attrs,
    className,
    css,
  )
);

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
export const meshpatch = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshpatch << VNodeFlags.ElementIdOffset),
    "meshpatch",
    attrs,
    className,
    css,
  )
);

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
export const meshrow = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshrow << VNodeFlags.ElementIdOffset),
    "meshrow",
    attrs,
    className,
    css,
  )
);

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
export const metadata = (className?: string, attrs?: SVGMetadataElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGMetadataElementAttrs | undefined, SVGMetadataElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Metadata << VNodeFlags.ElementIdOffset),
    "metadata",
    attrs,
    className,
    css,
  )
);

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
export const mpath = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mpath << VNodeFlags.ElementIdOffset),
    "mpath",
    attrs,
    className,
    css,
  )
);

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
export const path = (className?: string, attrs?: SVGPathElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGPathElementAttrs | undefined, SVGPathElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Path << VNodeFlags.ElementIdOffset),
    "path",
    attrs,
    className,
    css,
  )
);

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
export const pattern = (className?: string, attrs?: SVGPatternElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGPatternElementAttrs | undefined, SVGPatternElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Pattern << VNodeFlags.ElementIdOffset),
    "pattern",
    attrs,
    className,
    css,
  )
);

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
export const polygon = (className?: string, attrs?: SVGPolygonElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGPolygonElementAttrs | undefined, SVGPolygonElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polygon << VNodeFlags.ElementIdOffset),
    "polygon",
    attrs,
    className,
    css,
  )
);

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
export const polyline = (className?: string, attrs?: SVGPolylineElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGPolylineElementAttrs | undefined, SVGPolylineElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polyline << VNodeFlags.ElementIdOffset),
    "polyline",
    attrs,
    className,
    css,
  )
);

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
export const radialGradient = (className?: string, attrs?: SVGRadialGradientElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGRadialGradientElementAttrs | undefined, SVGRadialGradientElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.RadialGradient << VNodeFlags.ElementIdOffset),
    "radialGradient",
    attrs,
    className,
    css,
  )
);

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
export const rect = (className?: string, attrs?: SVGRectElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGRectElementAttrs | undefined, SVGRectElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Rect << VNodeFlags.ElementIdOffset),
    "rect",
    attrs,
    className,
    css,
  )
);

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
export const set = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Set << VNodeFlags.ElementIdOffset),
    "set",
    attrs,
    className,
    css,
  )
);

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
export const solidcolor = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Solidcolor << VNodeFlags.ElementIdOffset),
    "solidcolor",
    attrs,
    className,
    css,
  )
);

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
export const stop = (className?: string, attrs?: SVGStopElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGStopElementAttrs | undefined, SVGStopElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Stop << VNodeFlags.ElementIdOffset),
    "stop",
    attrs,
    className,
    css,
  )
);

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
export const svg = (className?: string, attrs?: SVGSVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGSVGElementAttrs | undefined, SVGSVGElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Svg << VNodeFlags.ElementIdOffset),
    "svg",
    attrs,
    className,
    css,
  )
);

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
export const symbol = (className?: string, attrs?: SVGSymbolElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGSymbolElementAttrs | undefined, SVGSymbolElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Symbol << VNodeFlags.ElementIdOffset),
    "symbol",
    attrs,
    className,
    css,
  )
);

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
export const text = (className?: string, attrs?: SVGTextElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGTextElementAttrs | undefined, SVGTextElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Text << VNodeFlags.ElementIdOffset),
    "text",
    attrs,
    className,
    css,
  )
);

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
export const textPath = (className?: string, attrs?: SVGTextPathElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGTextPathElementAttrs | undefined, SVGTextPathElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.TextPath << VNodeFlags.ElementIdOffset),
    "textPath",
    attrs,
    className,
    css,
  )
);

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
export const title = (className?: string, attrs?: SVGElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGElementAttrs | undefined, SVGTitleElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    attrs,
    className,
    css,
  )
);

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
export const tspan = (className?: string, attrs?: SVGTSpanElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGTSpanElementAttrs | undefined, SVGTSpanElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Tspan << VNodeFlags.ElementIdOffset),
    "tspan",
    attrs,
    className,
    css,
  )
);

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
export const use = (className?: string, attrs?: SVGUseElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGUseElementAttrs | undefined, SVGUseElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Use << VNodeFlags.ElementIdOffset),
    "use",
    attrs,
    className,
    css,
  )
);

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
export const view = (className?: string, attrs?: SVGViewElementAttrs, css?: CSSStyleProps) => (
  new VNode<SVGViewElementAttrs | undefined, SVGViewElement>(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.View << VNodeFlags.ElementIdOffset),
    "view",
    attrs,
    className,
    css,
  )
);

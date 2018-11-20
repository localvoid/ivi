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

  elementSetAttributeNS, XML_NAMESPACE, XLINK_NAMESPACE,
  ATTRIBUTE_DIRECTIVE_REMOVE_ATTR_UNDEFINED,

  AttributeDirective, svgElement,
} from "ivi";

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
export const a = svgElement<SVGElementAttrs, SVGAElement>("a");

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
export const animate = svgElement<SVGElementAttrs, SVGElement>("animate");

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
export const animateColor = svgElement<SVGElementAttrs, SVGElement>("animateColor");

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
export const animateMotion = svgElement<SVGElementAttrs, SVGElement>("animateMotion");

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
export const animateTransform = svgElement<SVGElementAttrs, SVGElement>("animateTransform");

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
export const circle = svgElement<SVGCircleElementAttrs, SVGCircleElement>("circle");

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
export const clipPath = svgElement<SVGClipPathElementAttrs, SVGClipPathElement>("clipPath");

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
export const defs = svgElement<SVGDefsElementAttrs, SVGDefsElement>("defs");

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
export const desc = svgElement<SVGDescElementAttrs, SVGDescElement>("desc");

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
export const discard = svgElement<SVGElementAttrs, SVGElement>("discard");

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
export const ellipse = svgElement<SVGEllipseElementAttrs, SVGEllipseElement>("ellipse");

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
export const feBlend = svgElement<SVGFEBlendElementAttrs, SVGFEBlendElement>("feBlend");

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
export const feColorMatrix = svgElement<SVGFEColorMatrixElementAttrs, SVGFEColorMatrixElement>("feColorMatrix");

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
export const feComponentTransfer = svgElement<SVGFEComponentTransferElementAttrs, SVGFEComponentTransferElement>("feComponentTransfer");

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
export const feComposite = svgElement<SVGFECompositeElementAttrs, SVGFECompositeElement>("feComposite");

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
export const feConvolveMatrix = svgElement<SVGFEConvolveMatrixElementAttrs, SVGFEConvolveMatrixElement>("feConvolveMatrix");

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
export const feDiffuseLighting = svgElement<SVGFEDiffuseLightingElementAttrs, SVGFEDiffuseLightingElement>("feDiffuseLighting");

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
export const feDisplacementMap = svgElement<SVGFEDisplacementMapElementAttrs, SVGFEDisplacementMapElement>("feDisplacementMap");

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
export const feDistantLight = svgElement<SVGFEDistantLightElementAttrs, SVGFEDistantLightElement>("feDistantLight");

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
export const feDropShadow = svgElement<SVGFEDisplacementMapElementAttrs, SVGFEDisplacementMapElement>("feDropShadow");

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
export const feFlood = svgElement<SVGFEFloodElementAttrs, SVGFEFloodElement>("feFlood");

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
export const feFuncA = svgElement<SVGFEFuncAElementAttrs, SVGFEFuncAElement>("feFuncA");

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
export const feFuncB = svgElement<SVGFEFuncBElementAttrs, SVGFEFuncBElement>("feFuncB");

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
export const feFuncG = svgElement<SVGFEFuncGElementAttrs, SVGFEFuncGElement>("feFuncG");

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
export const feFuncR = svgElement<SVGFEFuncRElementAttrs, SVGFEFuncRElement>("feFuncR");

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
export const feGaussianBlur = svgElement<SVGFEGaussianBlurElementAttrs, SVGFEGaussianBlurElement>("feGaussianBlur");

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
export const feImage = svgElement<SVGFEImageElementAttrs, SVGFEImageElement>("feImage");

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
export const feMerge = svgElement<SVGFEMergeElementAttrs, SVGFEMergeElement>("feMerge");

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
export const feMergeNode = svgElement<SVGFEMergeNodeElementAttrs, SVGFEMergeNodeElementAttrs>("feMergeNode");

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
export const feMorphology = svgElement<SVGFEMorphologyElementAttrs, SVGFEMorphologyElement>("feMorphology");

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
export const feOffset = svgElement<SVGFEOffsetElementAttrs, SVGFEOffsetElement>("feOffset");

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
export const fePointLight = svgElement<SVGFEPointLightElementAttrs, SVGFEPointLightElement>("fePointLight");

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
export const feSpecularLighting = svgElement<SVGFESpecularLightingElementAttrs, SVGFESpecularLightingElement>("feSpecularLighting");

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
export const feSpotLight = svgElement<SVGFESpotLightElementAttrs, SVGFESpotLightElement>("feSpotLight");

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
export const feTile = svgElement<SVGFETileElementAttrs, SVGFETileElement>("feTile");

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
export const feTurbulence = svgElement<SVGFETurbulenceElementAttrs, SVGFETurbulenceElement>("feTurbulence");

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
export const filter = svgElement<SVGFilterElementAttrs, SVGFilterElement>("filter");

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
export const foreignObject = svgElement<SVGForeignObjectElementAttrs, SVGForeignObjectElement>("foreignObject");

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
export const g = svgElement<SVGGElementAttrs, SVGGElement>("g");

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
export const hatch = svgElement<SVGElementAttrs, SVGElement>("hatch");

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
export const hatchpath = svgElement<SVGElementAttrs, SVGElement>("hatchpath");

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
export const image = svgElement<SVGImageElementAttrs, SVGImageElement>("image");

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
export const line = svgElement<SVGLineElementAttrs, SVGLineElement>("line");

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
export const linearGradient = svgElement<SVGLinearGradientElementAttrs, SVGLinearGradientElement>("linearGradient");

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
export const marker = svgElement<SVGMarkerElementAttrs, SVGMarkerElement>("marker");

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
export const mask = svgElement<SVGMaskElementAttrs, SVGMaskElement>("mask");

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
export const mesh = svgElement<SVGElementAttrs, SVGElement>("mesh");

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
export const meshgradient = svgElement<SVGElementAttrs, SVGLinearGradientElement>("meshgradient");

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
export const meshpatch = svgElement<SVGElementAttrs, SVGElement>("meshpatch");

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
export const meshrow = svgElement<SVGElementAttrs, SVGElement>("meshrow");

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
export const metadata = svgElement<SVGMetadataElementAttrs, SVGMetadataElement>("metadata");

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
export const mpath = svgElement<SVGElementAttrs, SVGElement>("mpath");

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
export const path = svgElement<SVGPathElementAttrs, SVGPathElement>("path");

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
export const pattern = svgElement<SVGPatternElementAttrs, SVGPatternElement>("pattern");

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
export const polygon = svgElement<SVGPolygonElementAttrs, SVGPolygonElement>("polygon");

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
export const polyline = svgElement<SVGPolylineElementAttrs, SVGPolylineElement>("polyline");

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
export const radialGradient = svgElement<SVGRadialGradientElementAttrs, SVGRadialGradientElement>("radialGradient");

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
export const rect = svgElement<SVGRectElementAttrs, SVGRectElement>("rect");

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
export const set = svgElement<SVGElementAttrs, SVGElement>("set");

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
export const solidcolor = svgElement<SVGElementAttrs, SVGElement>("solidcolor");

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
export const stop = svgElement<SVGStopElementAttrs, SVGStopElement>("stop");

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
export const svg = svgElement<SVGSVGElementAttrs, SVGSVGElement>("svg");

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
export const symbol = svgElement<SVGSymbolElementAttrs, SVGSymbolElement>("symbol");

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
export const text = svgElement<SVGTextElementAttrs, SVGTextElement>("text");

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
export const textPath = svgElement<SVGTextPathElementAttrs, SVGTextPathElement>("textPath");

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
export const title = svgElement<SVGElementAttrs, SVGTitleElement>("title");

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
export const tspan = svgElement<SVGTSpanElementAttrs, SVGTSpanElement>("tspan");

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
export const use = svgElement<SVGUseElementAttrs, SVGUseElement>("use");

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
export const view = svgElement<SVGViewElementAttrs, SVGViewElement>("view");

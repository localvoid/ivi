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

  AttributeDirective, svgElementFactory, elementRemoveAttribute,
} from "ivi";

const ATTRIBUTE_DIRECTIVE_SET_XML_ATTR_EMPTY = {
  v: "",
  u: updateXMLAttr,
};

const ATTRIBUTE_DIRECTIVE_SET_XLINK_ATTR_EMPTY = {
  v: "",
  u: updateXLinkAttr,
};

function updateNSAttr(
  element: Element,
  ns: string,
  key: string,
  prev: string | number | boolean | undefined,
  next: string | number | boolean | undefined,
) {
  if (prev !== next) {
    if (next === void 0) {
      elementRemoveAttribute!.call(element, key);
    } else {
      elementSetAttributeNS!.call(element, ns, key, next as string);
    }
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
 * XML_ATTR function creates an {@link AttributeDirective} that assigns an attribute from XML namespace, attribute name
 * is derived from the `key`.
 *
 * @example
 *
 *   const e = circle("", { "xml:text": XML_ATTR("abc") });
 *
 * @param v Value.
 * @returns {@link AttributeDirective}
 */
export const XML_ATTR = (v: string | number): AttributeDirective<string | number> => (
  v === "" ? ATTRIBUTE_DIRECTIVE_SET_XML_ATTR_EMPTY : { v, u: updateXMLAttr }
);

/**
 * XLINK_ATTR function creates an {@link AttributeDirective} that assigns an attribute from XLINK namespace, attribute
 * name is derived from the `key`.
 *
 * @example
 *
 *   const e = circle("", { "xlink:text": XLINK_ATTR("abc") });
 *
 * @param v Value.
 * @returns {@link AttributeDirective}
 */
export const XLINK_ATTR = (v: string | number): AttributeDirective<string | number> => (
  v === "" ? ATTRIBUTE_DIRECTIVE_SET_XLINK_ATTR_EMPTY : { v, u: updateXLinkAttr }
);

/* tslint:disable:max-line-length */
/**
 * Creates OpNode SVG element <a>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <a>
 */
export const a = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGAElement>("a");

/**
 * Creates OpNode SVG element <animate>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <animate>
 */
export const animate = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("animate");

/**
 * Creates OpNode SVG element <animateColor>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateColor}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <animateColor>
 */
export const animateColor = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("animateColor");

/**
 * Creates OpNode SVG element <animateMotion>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <animateMotion>
 */
export const animateMotion = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("animateMotion");

/**
 * Creates OpNode SVG element <animateTransform>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <animateTransform>
 */
export const animateTransform = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("animateTransform");

/**
 * Creates OpNode SVG element <circle>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <circle>
 */
export const circle = /*#__PURE__*/svgElementFactory<SVGCircleElementAttrs, SVGCircleElement>("circle");

/**
 * Creates OpNode SVG element <clipPath>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <clipPath>
 */
export const clipPath = /*#__PURE__*/svgElementFactory<SVGClipPathElementAttrs, SVGClipPathElement>("clipPath");

/**
 * Creates OpNode SVG element <defs>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <defs>
 */
export const defs = /*#__PURE__*/svgElementFactory<SVGDefsElementAttrs, SVGDefsElement>("defs");

/**
 * Creates OpNode SVG element <desc>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <desc>
 */
export const desc = /*#__PURE__*/svgElementFactory<SVGDescElementAttrs, SVGDescElement>("desc");

/**
 * Creates OpNode SVG element <discard>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/discard}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <discard>
 */
export const discard = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("discard");

/**
 * Creates OpNode SVG element <ellipse>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <ellipse>
 */
export const ellipse = /*#__PURE__*/svgElementFactory<SVGEllipseElementAttrs, SVGEllipseElement>("ellipse");

/**
 * Creates OpNode SVG element <feBlend>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feBlend}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feBlend>
 */
export const feBlend = /*#__PURE__*/svgElementFactory<SVGFEBlendElementAttrs, SVGFEBlendElement>("feBlend");

/**
 * Creates OpNode SVG element <feColorMatrix>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feColorMatrix>
 */
export const feColorMatrix = /*#__PURE__*/svgElementFactory<SVGFEColorMatrixElementAttrs, SVGFEColorMatrixElement>("feColorMatrix");

/**
 * Creates OpNode SVG element <feComponentTransfer>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feComponentTransfer>
 */
export const feComponentTransfer = /*#__PURE__*/svgElementFactory<SVGFEComponentTransferElementAttrs, SVGFEComponentTransferElement>("feComponentTransfer");

/**
 * Creates OpNode SVG element <feComposite>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComposite}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feComposite>
 */
export const feComposite = /*#__PURE__*/svgElementFactory<SVGFECompositeElementAttrs, SVGFECompositeElement>("feComposite");

/**
 * Creates OpNode SVG element <feConvolveMatrix>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feConvolveMatrix>
 */
export const feConvolveMatrix = /*#__PURE__*/svgElementFactory<SVGFEConvolveMatrixElementAttrs, SVGFEConvolveMatrixElement>("feConvolveMatrix");

/**
 * Creates OpNode SVG element <feDiffuseLighting>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDiffuseLighting}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feDiffuseLighting>
 */
export const feDiffuseLighting = /*#__PURE__*/svgElementFactory<SVGFEDiffuseLightingElementAttrs, SVGFEDiffuseLightingElement>("feDiffuseLighting");

/**
 * Creates OpNode SVG element <feDisplacementMap>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feDisplacementMap>
 */
export const feDisplacementMap = /*#__PURE__*/svgElementFactory<SVGFEDisplacementMapElementAttrs, SVGFEDisplacementMapElement>("feDisplacementMap");

/**
 * Creates OpNode SVG element <feDistantLight>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDistantLight}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feDistantLight>
 */
export const feDistantLight = /*#__PURE__*/svgElementFactory<SVGFEDistantLightElementAttrs, SVGFEDistantLightElement>("feDistantLight");

/**
 * Creates OpNode SVG element <feDropShadow>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDropShadow}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feDropShadow>
 */
export const feDropShadow = /*#__PURE__*/svgElementFactory<SVGFEDisplacementMapElementAttrs, SVGFEDisplacementMapElement>("feDropShadow");

/**
 * Creates OpNode SVG element <feFlood>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFlood}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feFlood>
 */
export const feFlood = /*#__PURE__*/svgElementFactory<SVGFEFloodElementAttrs, SVGFEFloodElement>("feFlood");

/**
 * Creates OpNode SVG element <feFuncA>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncA}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feFuncA>
 */
export const feFuncA = /*#__PURE__*/svgElementFactory<SVGFEFuncAElementAttrs, SVGFEFuncAElement>("feFuncA");

/**
 * Creates OpNode SVG element <feFuncB>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncB}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feFuncB>
 */
export const feFuncB = /*#__PURE__*/svgElementFactory<SVGFEFuncBElementAttrs, SVGFEFuncBElement>("feFuncB");

/**
 * Creates OpNode SVG element <feFuncG>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncG}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feFuncG>
 */
export const feFuncG = /*#__PURE__*/svgElementFactory<SVGFEFuncGElementAttrs, SVGFEFuncGElement>("feFuncG");

/**
 * Creates OpNode SVG element <feFuncR>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncR}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feFuncR>
 */
export const feFuncR = /*#__PURE__*/svgElementFactory<SVGFEFuncRElementAttrs, SVGFEFuncRElement>("feFuncR");

/**
 * Creates OpNode SVG element <feGaussianBlur>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feGaussianBlur>
 */
export const feGaussianBlur = /*#__PURE__*/svgElementFactory<SVGFEGaussianBlurElementAttrs, SVGFEGaussianBlurElement>("feGaussianBlur");

/**
 * Creates OpNode SVG element <feImage>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feImage}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feImage>
 */
export const feImage = /*#__PURE__*/svgElementFactory<SVGFEImageElementAttrs, SVGFEImageElement>("feImage");

/**
 * Creates OpNode SVG element <feMerge>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMerge}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feMerge>
 */
export const feMerge = /*#__PURE__*/svgElementFactory<SVGFEMergeElementAttrs, SVGFEMergeElement>("feMerge");

/**
 * Creates OpNode SVG element <feMergeNode>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMergeNode}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feMergeNode>
 */
export const feMergeNode = /*#__PURE__*/svgElementFactory<SVGFEMergeNodeElementAttrs, SVGFEMergeNodeElementAttrs>("feMergeNode");

/**
 * Creates OpNode SVG element <feMorphology>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMorphology}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feMorphology>
 */
export const feMorphology = /*#__PURE__*/svgElementFactory<SVGFEMorphologyElementAttrs, SVGFEMorphologyElement>("feMorphology");

/**
 * Creates OpNode SVG element <feOffset>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feOffset}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feOffset>
 */
export const feOffset = /*#__PURE__*/svgElementFactory<SVGFEOffsetElementAttrs, SVGFEOffsetElement>("feOffset");

/**
 * Creates OpNode SVG element <fePointLight>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/fePointLight}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <fePointLight>
 */
export const fePointLight = /*#__PURE__*/svgElementFactory<SVGFEPointLightElementAttrs, SVGFEPointLightElement>("fePointLight");

/**
 * Creates OpNode SVG element <feSpecularLighting>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feSpecularLighting>
 */
export const feSpecularLighting = /*#__PURE__*/svgElementFactory<SVGFESpecularLightingElementAttrs, SVGFESpecularLightingElement>("feSpecularLighting");

/**
 * Creates OpNode SVG element <feSpotLight>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpotLight}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feSpotLight>
 */
export const feSpotLight = /*#__PURE__*/svgElementFactory<SVGFESpotLightElementAttrs, SVGFESpotLightElement>("feSpotLight");

/**
 * Creates OpNode SVG element <feTile>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTile}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feTile>
 */
export const feTile = /*#__PURE__*/svgElementFactory<SVGFETileElementAttrs, SVGFETileElement>("feTile");

/**
 * Creates OpNode SVG element <feTurbulence>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <feTurbulence>
 */
export const feTurbulence = /*#__PURE__*/svgElementFactory<SVGFETurbulenceElementAttrs, SVGFETurbulenceElement>("feTurbulence");

/**
 * Creates OpNode SVG element <filter>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <filter>
 */
export const filter = /*#__PURE__*/svgElementFactory<SVGFilterElementAttrs, SVGFilterElement>("filter");

/**
 * Creates OpNode SVG element <foreignObject>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <foreignObject>
 */
export const foreignObject = /*#__PURE__*/svgElementFactory<SVGForeignObjectElementAttrs, SVGForeignObjectElement>("foreignObject");

/**
 * Creates OpNode SVG element <g>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <g>
 */
export const g = /*#__PURE__*/svgElementFactory<SVGGElementAttrs, SVGGElement>("g");

/**
 * Creates OpNode SVG element <hatch>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/hatch}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <hatch>
 */
export const hatch = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("hatch");

/**
 * Creates OpNode SVG element <hatchpath>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/hatchpath}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <hatchpath>
 */
export const hatchpath = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("hatchpath");

/**
 * Creates OpNode SVG element <image>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <image>
 */
export const image = /*#__PURE__*/svgElementFactory<SVGImageElementAttrs, SVGImageElement>("image");

/**
 * Creates OpNode SVG element <line>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <line>
 */
export const line = /*#__PURE__*/svgElementFactory<SVGLineElementAttrs, SVGLineElement>("line");

/**
 * Creates OpNode SVG element <linearGradient>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <linearGradient>
 */
export const linearGradient = /*#__PURE__*/svgElementFactory<SVGLinearGradientElementAttrs, SVGLinearGradientElement>("linearGradient");

/**
 * Creates OpNode SVG element <marker>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <marker>
 */
export const marker = /*#__PURE__*/svgElementFactory<SVGMarkerElementAttrs, SVGMarkerElement>("marker");

/**
 * Creates OpNode SVG element <mask>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <mask>
 */
export const mask = /*#__PURE__*/svgElementFactory<SVGMaskElementAttrs, SVGMaskElement>("mask");

/**
 * Creates OpNode SVG element <mesh>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mesh}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <mesh>
 */
export const mesh = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("mesh");

/**
 * Creates OpNode SVG element <meshgradient>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/meshgradient}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <meshgradient>
 */
export const meshgradient = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGLinearGradientElement>("meshgradient");

/**
 * Creates OpNode SVG element <meshpatch>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/meshpatch}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <meshpatch>
 */
export const meshpatch = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("meshpatch");

/**
 * Creates OpNode SVG element <meshrow>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/meshrow}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <meshrow>
 */
export const meshrow = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("meshrow");

/**
 * Creates OpNode SVG element <metadata>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/metadata}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <metadata>
 */
export const metadata = /*#__PURE__*/svgElementFactory<SVGMetadataElementAttrs, SVGMetadataElement>("metadata");

/**
 * Creates OpNode SVG element <mpath>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mpath}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <mpath>
 */
export const mpath = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("mpath");

/**
 * Creates OpNode SVG element <path>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <path>
 */
export const path = /*#__PURE__*/svgElementFactory<SVGPathElementAttrs, SVGPathElement>("path");

/**
 * Creates OpNode SVG element <pattern>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <pattern>
 */
export const pattern = /*#__PURE__*/svgElementFactory<SVGPatternElementAttrs, SVGPatternElement>("pattern");

/**
 * Creates OpNode SVG element <polygon>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <polygon>
 */
export const polygon = /*#__PURE__*/svgElementFactory<SVGPolygonElementAttrs, SVGPolygonElement>("polygon");

/**
 * Creates OpNode SVG element <polyline>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <polyline>
 */
export const polyline = /*#__PURE__*/svgElementFactory<SVGPolylineElementAttrs, SVGPolylineElement>("polyline");

/**
 * Creates OpNode SVG element <radialGradient>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <radialGradient>
 */
export const radialGradient = /*#__PURE__*/svgElementFactory<SVGRadialGradientElementAttrs, SVGRadialGradientElement>("radialGradient");

/**
 * Creates OpNode SVG element <rect>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <rect>
 */
export const rect = /*#__PURE__*/svgElementFactory<SVGRectElementAttrs, SVGRectElement>("rect");

/**
 * Creates OpNode SVG element <set>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/set}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <set>
 */
export const set = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("set");

/**
 * Creates OpNode SVG element <solidcolor>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/solidcolor}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <solidcolor>
 */
export const solidcolor = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGElement>("solidcolor");

/**
 * Creates OpNode SVG element <stop>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <stop>
 */
export const stop = /*#__PURE__*/svgElementFactory<SVGStopElementAttrs, SVGStopElement>("stop");

/**
 * Creates OpNode SVG element <svg>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <svg>
 */
export const svg = /*#__PURE__*/svgElementFactory<SVGSVGElementAttrs, SVGSVGElement>("svg");

/**
 * Creates OpNode SVG element <symbol>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <symbol>
 */
export const symbol = /*#__PURE__*/svgElementFactory<SVGSymbolElementAttrs, SVGSymbolElement>("symbol");

/**
 * Creates OpNode SVG element <text>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <text>
 */
export const text = /*#__PURE__*/svgElementFactory<SVGTextElementAttrs, SVGTextElement>("text");

/**
 * Creates OpNode SVG element <textPath>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <textPath>
 */
export const textPath = /*#__PURE__*/svgElementFactory<SVGTextPathElementAttrs, SVGTextPathElement>("textPath");

/**
 * Creates OpNode SVG element <title>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <title>
 */
export const title = /*#__PURE__*/svgElementFactory<SVGElementAttrs, SVGTitleElement>("title");

/**
 * Creates OpNode SVG element <tspan>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <tspan>
 */
export const tspan = /*#__PURE__*/svgElementFactory<SVGTSpanElementAttrs, SVGTSpanElement>("tspan");

/**
 * Creates OpNode SVG element <use>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <use>
 */
export const use = /*#__PURE__*/svgElementFactory<SVGUseElementAttrs, SVGUseElement>("use");

/**
 * Creates OpNode SVG element <view>.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/view}
 *
 * @param className Class name.
 * @param attrs Attributes.
 * @param children Children nodes.
 * @returns OpNode SVG element <view>
 */
export const view = /*#__PURE__*/svgElementFactory<SVGViewElementAttrs, SVGViewElement>("view");

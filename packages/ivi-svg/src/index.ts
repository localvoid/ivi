import {
  SVGElementProps,
  SVGCircleElementProps, SVGClipPathElementProps, SVGDefsElementProps, SVGDescElementProps, SVGEllipseElementProps,
  SVGFEBlendElementProps, SVGFEColorMatrixElementProps, SVGFEComponentTransferElementProps,
  SVGFECompositeElementProps, SVGFEConvolveMatrixElementProps, SVGFEDiffuseLightingElementProps,
  SVGFEDisplacementMapElementProps, SVGFEDistantLightElementProps, SVGFEFloodElementProps, SVGFEFuncAElementProps,
  SVGFEFuncBElementProps, SVGFEFuncGElementProps, SVGFEFuncRElementProps, SVGFEGaussianBlurElementProps,
  SVGFEImageElementProps, SVGFEMergeElementProps, SVGFEMergeNodeElementProps, SVGFEMorphologyElementProps,
  SVGFEOffsetElementProps, SVGFEPointLightElementProps, SVGFESpecularLightingElementProps, SVGFESpotLightElementProps,
  SVGFETileElementProps, SVGFETurbulenceElementProps, SVGFilterElementProps, SVGForeignObjectElementProps,
  SVGGElementProps, SVGImageElementProps, SVGLinearGradientElementProps, SVGLineElementProps, SVGMarkerElementProps,
  SVGMaskElementProps, SVGMetadataElementProps, SVGPathElementProps, SVGPatternElementProps, SVGPolygonElementProps,
  SVGPolylineElementProps, SVGRadialGradientElementProps, SVGRectElementProps, SVGStopElementProps,
  SVGSVGElementProps, SVGSymbolElementProps, SVGTextElementProps, SVGTextPathElementProps,
  SVGTSpanElementProps, SVGViewElementProps, SVGUseElementProps,
  CSSStyleProps,
} from "ivi-core";
import { VNode, VNodeFlags } from "ivi";

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

/* tslint:disable:max-line-length */
export function a(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function altGlyph(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyph << VNodeFlags.ElementIdOffset),
    "altGlyph",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function altGlyphDef(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyphDef << VNodeFlags.ElementIdOffset),
    "altGlyphDef",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function altGlyphItem(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyphItem << VNodeFlags.ElementIdOffset),
    "altGlyphItem",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function animate(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Animate << VNodeFlags.ElementIdOffset),
    "animate",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function animateColor(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateColor << VNodeFlags.ElementIdOffset),
    "animateColor",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function animateMotion(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateMotion << VNodeFlags.ElementIdOffset),
    "animateMotion",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function animateTransform(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateTransform << VNodeFlags.ElementIdOffset),
    "animateTransform",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function circle(className?: string, attrs?: SVGCircleElementProps, css?: CSSStyleProps): VNode<SVGCircleElementProps | undefined, SVGCircleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Circle << VNodeFlags.ElementIdOffset),
    "circle",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function clipPath(className?: string, attrs?: SVGClipPathElementProps, css?: CSSStyleProps): VNode<SVGClipPathElementProps | undefined, SVGClipPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ClipPath << VNodeFlags.ElementIdOffset),
    "clipPath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function colorProfile(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ColorProfile << VNodeFlags.ElementIdOffset),
    "color-profile",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function cursor(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Cursor << VNodeFlags.ElementIdOffset),
    "cursor",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function defs(className?: string, attrs?: SVGDefsElementProps, css?: CSSStyleProps): VNode<SVGDefsElementProps | undefined, SVGDefsElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Defs << VNodeFlags.ElementIdOffset),
    "defs",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function desc(className?: string, attrs?: SVGDescElementProps, css?: CSSStyleProps): VNode<SVGDescElementProps | undefined, SVGDescElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Desc << VNodeFlags.ElementIdOffset),
    "desc",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function discard(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Discard << VNodeFlags.ElementIdOffset),
    "discard",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function ellipse(className?: string, attrs?: SVGEllipseElementProps, css?: CSSStyleProps): VNode<SVGEllipseElementProps | undefined, SVGEllipseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Ellipse << VNodeFlags.ElementIdOffset),
    "ellipse",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feBlend(className?: string, attrs?: SVGFEBlendElementProps, css?: CSSStyleProps): VNode<SVGFEBlendElementProps | undefined, SVGFEBlendElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeBlend << VNodeFlags.ElementIdOffset),
    "feBlend",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feColorMatrix(className?: string, attrs?: SVGFEColorMatrixElementProps, css?: CSSStyleProps): VNode<SVGFEColorMatrixElementProps | undefined, SVGFEColorMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeColorMatrix << VNodeFlags.ElementIdOffset),
    "feColorMatrix",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feComponentTransfer(className?: string, attrs?: SVGFEComponentTransferElementProps, css?: CSSStyleProps): VNode<SVGFEComponentTransferElementProps | undefined, SVGFEComponentTransferElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComponentTransfer << VNodeFlags.ElementIdOffset),
    "feComponentTransfer",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feComposite(className?: string, attrs?: SVGFECompositeElementProps, css?: CSSStyleProps): VNode<SVGFECompositeElementProps | undefined, SVGFECompositeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComposite << VNodeFlags.ElementIdOffset),
    "feComposite",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feConvolveMatrix(className?: string, attrs?: SVGFEConvolveMatrixElementProps, css?: CSSStyleProps): VNode<SVGFEConvolveMatrixElementProps | undefined, SVGFEConvolveMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeConvolveMatrix << VNodeFlags.ElementIdOffset),
    "feConvolveMatrix",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feDiffuseLighting(className?: string, attrs?: SVGFEDiffuseLightingElementProps, css?: CSSStyleProps): VNode<SVGFEDiffuseLightingElementProps | undefined, SVGFEDiffuseLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDiffuseLighting << VNodeFlags.ElementIdOffset),
    "feDiffuseLighting",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feDisplacementMap(className?: string, attrs?: SVGFEDisplacementMapElementProps, css?: CSSStyleProps): VNode<SVGFEDisplacementMapElementProps | undefined, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDisplacementMap << VNodeFlags.ElementIdOffset),
    "feDisplacementMap",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feDistantLight(className?: string, attrs?: SVGFEDistantLightElementProps, css?: CSSStyleProps): VNode<SVGFEDistantLightElementProps | undefined, SVGFEDistantLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDistantLight << VNodeFlags.ElementIdOffset),
    "feDistantLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feDropShadow(className?: string, attrs?: SVGFEDisplacementMapElementProps, css?: CSSStyleProps): VNode<SVGFEDisplacementMapElementProps | undefined, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDropShadow << VNodeFlags.ElementIdOffset),
    "feDropShadow",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFlood(className?: string, attrs?: SVGFEFloodElementProps, css?: CSSStyleProps): VNode<SVGFEFloodElementProps | undefined, SVGFEFloodElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFlood << VNodeFlags.ElementIdOffset),
    "feFlood",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFuncA(className?: string, attrs?: SVGFEFuncAElementProps, css?: CSSStyleProps): VNode<SVGFEFuncAElementProps | undefined, SVGFEFuncAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncA << VNodeFlags.ElementIdOffset),
    "feFuncA",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFuncB(className?: string, attrs?: SVGFEFuncBElementProps, css?: CSSStyleProps): VNode<SVGFEFuncBElementProps | undefined, SVGFEFuncBElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncB << VNodeFlags.ElementIdOffset),
    "feFuncB",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFuncG(className?: string, attrs?: SVGFEFuncGElementProps, css?: CSSStyleProps): VNode<SVGFEFuncGElementProps | undefined, SVGFEFuncGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncG << VNodeFlags.ElementIdOffset),
    "feFuncG",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feFuncR(className?: string, attrs?: SVGFEFuncRElementProps, css?: CSSStyleProps): VNode<SVGFEFuncRElementProps | undefined, SVGFEFuncRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncR << VNodeFlags.ElementIdOffset),
    "feFuncR",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feGaussianBlur(className?: string, attrs?: SVGFEGaussianBlurElementProps, css?: CSSStyleProps): VNode<SVGFEGaussianBlurElementProps | undefined, SVGFEGaussianBlurElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeGaussianBlur << VNodeFlags.ElementIdOffset),
    "feGaussianBlur",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feImage(className?: string, attrs?: SVGFEImageElementProps, css?: CSSStyleProps): VNode<SVGFEImageElementProps | undefined, SVGFEImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeImage << VNodeFlags.ElementIdOffset),
    "feImage",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feMerge(className?: string, attrs?: SVGFEMergeElementProps, css?: CSSStyleProps): VNode<SVGFEMergeElementProps | undefined, SVGFEMergeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMerge << VNodeFlags.ElementIdOffset),
    "feMerge",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feMergeNode(className?: string, attrs?: SVGFEMergeNodeElementProps, css?: CSSStyleProps): VNode<SVGFEMergeNodeElementProps | undefined, SVGFEMergeNodeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMergeNode << VNodeFlags.ElementIdOffset),
    "feMergeNode",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feMorphology(className?: string, attrs?: SVGFEMorphologyElementProps, css?: CSSStyleProps): VNode<SVGFEMorphologyElementProps | undefined, SVGFEMorphologyElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMorphology << VNodeFlags.ElementIdOffset),
    "feMorphology",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feOffset(className?: string, attrs?: SVGFEOffsetElementProps, css?: CSSStyleProps): VNode<SVGFEOffsetElementProps | undefined, SVGFEOffsetElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeOffset << VNodeFlags.ElementIdOffset),
    "feOffset",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fePointLight(className?: string, attrs?: SVGFEPointLightElementProps, css?: CSSStyleProps): VNode<SVGFEPointLightElementProps | undefined, SVGFEPointLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FePointLight << VNodeFlags.ElementIdOffset),
    "fePointLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feSpecularLighting(className?: string, attrs?: SVGFESpecularLightingElementProps, css?: CSSStyleProps): VNode<SVGFESpecularLightingElementProps | undefined, SVGFESpecularLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpecularLighting << VNodeFlags.ElementIdOffset),
    "feSpecularLighting",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feSpotLight(className?: string, attrs?: SVGFESpotLightElementProps, css?: CSSStyleProps): VNode<SVGFESpotLightElementProps | undefined, SVGFESpotLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpotLight << VNodeFlags.ElementIdOffset),
    "feSpotLight",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feTile(className?: string, attrs?: SVGFETileElementProps, css?: CSSStyleProps): VNode<SVGFETileElementProps | undefined, SVGFETileElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTile << VNodeFlags.ElementIdOffset),
    "feTile",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function feTurbulence(className?: string, attrs?: SVGFETurbulenceElementProps, css?: CSSStyleProps): VNode<SVGFETurbulenceElementProps | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTurbulence << VNodeFlags.ElementIdOffset),
    "feTurbulence",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function filter(className?: string, attrs?: SVGFilterElementProps, css?: CSSStyleProps): VNode<SVGFilterElementProps | undefined, SVGFilterElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Filter << VNodeFlags.ElementIdOffset),
    "filter",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function font(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Font << VNodeFlags.ElementIdOffset),
    "font",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFace(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFace << VNodeFlags.ElementIdOffset),
    "font-face",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFaceFormat(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceFormat << VNodeFlags.ElementIdOffset),
    "font-face-format",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFaceName(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceName << VNodeFlags.ElementIdOffset),
    "font-face-name",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFaceSrc(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceSrc << VNodeFlags.ElementIdOffset),
    "font-face-src",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function fontFaceUri(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceUri << VNodeFlags.ElementIdOffset),
    "font-face-uri",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function foreignObject(className?: string, attrs?: SVGForeignObjectElementProps, css?: CSSStyleProps): VNode<SVGForeignObjectElementProps | undefined, SVGForeignObjectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ForeignObject << VNodeFlags.ElementIdOffset),
    "foreignObject",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function g(className?: string, attrs?: SVGGElementProps, css?: CSSStyleProps): VNode<SVGGElementProps | undefined, SVGGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.G << VNodeFlags.ElementIdOffset),
    "g",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function glyph(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Glyph << VNodeFlags.ElementIdOffset),
    "glyph",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function glyphRef(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.GlyphRef << VNodeFlags.ElementIdOffset),
    "glyphRef",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function hatch(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatch << VNodeFlags.ElementIdOffset),
    "hatch",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function hatchpath(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatchpath << VNodeFlags.ElementIdOffset),
    "hatchpath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function hkern(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hkern << VNodeFlags.ElementIdOffset),
    "hkern",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function image(className?: string, attrs?: SVGImageElementProps, css?: CSSStyleProps): VNode<SVGImageElementProps | undefined, SVGImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Image << VNodeFlags.ElementIdOffset),
    "image",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function line(className?: string, attrs?: SVGLineElementProps, css?: CSSStyleProps): VNode<SVGLineElementProps | undefined, SVGLineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Line << VNodeFlags.ElementIdOffset),
    "line",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function linearGradient(className?: string, attrs?: SVGLinearGradientElementProps, css?: CSSStyleProps): VNode<SVGLinearGradientElementProps | undefined, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.LinearGradient << VNodeFlags.ElementIdOffset),
    "linearGradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function marker(className?: string, attrs?: SVGMarkerElementProps, css?: CSSStyleProps): VNode<SVGMarkerElementProps | undefined, SVGMarkerElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Marker << VNodeFlags.ElementIdOffset),
    "marker",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function mask(className?: string, attrs?: SVGMaskElementProps, css?: CSSStyleProps): VNode<SVGMaskElementProps | undefined, SVGMaskElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mask << VNodeFlags.ElementIdOffset),
    "mask",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function mesh(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mesh << VNodeFlags.ElementIdOffset),
    "mesh",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function meshgradient(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshgradient << VNodeFlags.ElementIdOffset),
    "meshgradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function meshpatch(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshpatch << VNodeFlags.ElementIdOffset),
    "meshpatch",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function meshrow(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshrow << VNodeFlags.ElementIdOffset),
    "meshrow",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function metadata(className?: string, attrs?: SVGMetadataElementProps, css?: CSSStyleProps): VNode<SVGMetadataElementProps | undefined, SVGMetadataElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Metadata << VNodeFlags.ElementIdOffset),
    "metadata",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function missingGlyph(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.MissingGlyph << VNodeFlags.ElementIdOffset),
    "missing-glyph",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function mpath(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mpath << VNodeFlags.ElementIdOffset),
    "mpath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function path(className?: string, attrs?: SVGPathElementProps, css?: CSSStyleProps): VNode<SVGPathElementProps | undefined, SVGPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Path << VNodeFlags.ElementIdOffset),
    "path",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function pattern(className?: string, attrs?: SVGPatternElementProps, css?: CSSStyleProps): VNode<SVGPatternElementProps | undefined, SVGPatternElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Pattern << VNodeFlags.ElementIdOffset),
    "pattern",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function polygon(className?: string, attrs?: SVGPolygonElementProps, css?: CSSStyleProps): VNode<SVGPolygonElementProps | undefined, SVGPolygonElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polygon << VNodeFlags.ElementIdOffset),
    "polygon",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function polyline(className?: string, attrs?: SVGPolylineElementProps, css?: CSSStyleProps): VNode<SVGPolylineElementProps | undefined, SVGPolylineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polyline << VNodeFlags.ElementIdOffset),
    "polyline",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function radialGradient(className?: string, attrs?: SVGRadialGradientElementProps, css?: CSSStyleProps): VNode<SVGRadialGradientElementProps | undefined, SVGRadialGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.RadialGradient << VNodeFlags.ElementIdOffset),
    "radialGradient",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function rect(className?: string, attrs?: SVGRectElementProps, css?: CSSStyleProps): VNode<SVGRectElementProps | undefined, SVGRectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Rect << VNodeFlags.ElementIdOffset),
    "rect",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function set(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Set << VNodeFlags.ElementIdOffset),
    "set",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function solidcolor(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Solidcolor << VNodeFlags.ElementIdOffset),
    "solidcolor",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function stop(className?: string, attrs?: SVGStopElementProps, css?: CSSStyleProps): VNode<SVGStopElementProps | undefined, SVGStopElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Stop << VNodeFlags.ElementIdOffset),
    "stop",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function svg(className?: string, attrs?: SVGSVGElementProps, css?: CSSStyleProps): VNode<SVGSVGElementProps | undefined, SVGSVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Svg << VNodeFlags.ElementIdOffset),
    "svg",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function svgSwitch(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGSwitchElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Switch << VNodeFlags.ElementIdOffset),
    "switch",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function symbol(className?: string, attrs?: SVGSymbolElementProps, css?: CSSStyleProps): VNode<SVGSymbolElementProps | undefined, SVGSymbolElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Symbol << VNodeFlags.ElementIdOffset),
    "symbol",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function text(className?: string, attrs?: SVGTextElementProps, css?: CSSStyleProps): VNode<SVGTextElementProps | undefined, SVGTextElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Text << VNodeFlags.ElementIdOffset),
    "text",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function textPath(className?: string, attrs?: SVGTextPathElementProps, css?: CSSStyleProps): VNode<SVGTextPathElementProps | undefined, SVGTextPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.TextPath << VNodeFlags.ElementIdOffset),
    "textPath",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function title(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGTitleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function tref(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Tref << VNodeFlags.ElementIdOffset),
    "tref",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function tspan(className?: string, attrs?: SVGTSpanElementProps, css?: CSSStyleProps): VNode<SVGTSpanElementProps | undefined, SVGTSpanElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Tspan << VNodeFlags.ElementIdOffset),
    "tspan",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function use(className?: string, attrs?: SVGUseElementProps, css?: CSSStyleProps): VNode<SVGUseElementProps | undefined, SVGUseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Use << VNodeFlags.ElementIdOffset),
    "use",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function view(className?: string, attrs?: SVGViewElementProps, css?: CSSStyleProps): VNode<SVGViewElementProps | undefined, SVGViewElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.View << VNodeFlags.ElementIdOffset),
    "view",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

export function vkern(className?: string, attrs?: SVGElementProps, css?: CSSStyleProps): VNode<SVGElementProps | undefined, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Vkern << VNodeFlags.ElementIdOffset),
    "vkern",
    attrs,
    className === void 0 ? "" : className,
    css,
  );
}

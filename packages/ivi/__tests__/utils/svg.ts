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
} from "ivi-core";
import { VNodeFlags } from "../../src/vdom/flags";
import { VNode } from "../../src/vdom/vnode";

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

export function a(className?: string): VNode<SVGElementProps | null, SVGAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.A << VNodeFlags.ElementIdOffset),
    "a",
    null,
    className,
    null,
  );
}

export function altGlyph(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyph << VNodeFlags.ElementIdOffset),
    "altGlyph",
    null,
    className,
    null,
  );
}

export function altGlyphDef(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyphDef << VNodeFlags.ElementIdOffset),
    "altGlyphDef",
    null,
    className,
    null,
  );
}

export function altGlyphItem(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AltGlyphItem << VNodeFlags.ElementIdOffset),
    "altGlyphItem",
    null,
    className,
    null,
  );
}

export function animate(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Animate << VNodeFlags.ElementIdOffset),
    "animate",
    null,
    className,
    null,
  );
}

export function animateColor(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateColor << VNodeFlags.ElementIdOffset),
    "animateColor",
    null,
    className,
    null,
  );
}

export function animateMotion(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateMotion << VNodeFlags.ElementIdOffset),
    "animateMotion",
    null,
    className,
    null,
  );
}

export function animateTransform(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.AnimateTransform << VNodeFlags.ElementIdOffset),
    "animateTransform",
    null,
    className,
    null,
  );
}

export function circle(className?: string): VNode<SVGCircleElementProps | null, SVGCircleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Circle << VNodeFlags.ElementIdOffset),
    "circle",
    null,
    className,
    null,
  );
}

export function clipPath(className?: string): VNode<SVGClipPathElementProps | null, SVGClipPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ClipPath << VNodeFlags.ElementIdOffset),
    "clipPath",
    null,
    className,
    null,
  );
}

export function colorProfile(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ColorProfile << VNodeFlags.ElementIdOffset),
    "color-profile",
    null,
    className,
    null,
  );
}

export function cursor(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Cursor << VNodeFlags.ElementIdOffset),
    "cursor",
    null,
    className,
    null,
  );
}

export function defs(className?: string): VNode<SVGDefsElementProps | null, SVGDefsElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Defs << VNodeFlags.ElementIdOffset),
    "defs",
    null,
    className,
    null,
  );
}

export function desc(className?: string): VNode<SVGDescElementProps | null, SVGDescElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Desc << VNodeFlags.ElementIdOffset),
    "desc",
    null,
    className,
    null,
  );
}

export function discard(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Discard << VNodeFlags.ElementIdOffset),
    "discard",
    null,
    className,
    null,
  );
}

export function ellipse(className?: string): VNode<SVGEllipseElementProps | null, SVGEllipseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Ellipse << VNodeFlags.ElementIdOffset),
    "ellipse",
    null,
    className,
    null,
  );
}

export function feBlend(className?: string): VNode<SVGFEBlendElementProps | null, SVGFEBlendElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeBlend << VNodeFlags.ElementIdOffset),
    "feBlend",
    null,
    className,
    null,
  );
}

export function feColorMatrix(className?: string): VNode<SVGFEColorMatrixElementProps | null, SVGFEColorMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeColorMatrix << VNodeFlags.ElementIdOffset),
    "feColorMatrix",
    null,
    className,
    null,
  );
}

export function feComponentTransfer(className?: string):
  VNode<SVGFEComponentTransferElementProps | null, SVGFEComponentTransferElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComponentTransfer << VNodeFlags.ElementIdOffset),
    "feComponentTransfer",
    null,
    className,
    null,
  );
}

export function feComposite(className?: string): VNode<SVGFECompositeElementProps | null, SVGFECompositeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeComposite << VNodeFlags.ElementIdOffset),
    "feComposite",
    null,
    className,
    null,
  );
}

export function feConvolveMatrix(className?: string):
  VNode<SVGFEConvolveMatrixElementProps | null, SVGFEConvolveMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeConvolveMatrix << VNodeFlags.ElementIdOffset),
    "feConvolveMatrix",
    null,
    className,
    null,
  );
}

export function feDiffuseLighting(className?: string):
  VNode<SVGFEDiffuseLightingElementProps | null, SVGFEDiffuseLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDiffuseLighting << VNodeFlags.ElementIdOffset),
    "feDiffuseLighting",
    null,
    className,
    null,
  );
}

export function feDisplacementMap(className?: string):
  VNode<SVGFEDisplacementMapElementProps | null, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDisplacementMap << VNodeFlags.ElementIdOffset),
    "feDisplacementMap",
    null,
    className,
    null,
  );
}

export function feDistantLight(className?: string):
  VNode<SVGFEDistantLightElementProps | null, SVGFEDistantLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDistantLight << VNodeFlags.ElementIdOffset),
    "feDistantLight",
    null,
    className,
    null,
  );
}

export function feDropShadow(className?: string):
  VNode<SVGFEDisplacementMapElementProps | null, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeDropShadow << VNodeFlags.ElementIdOffset),
    "feDropShadow",
    null,
    className,
    null,
  );
}

export function feFlood(className?: string): VNode<SVGFEFloodElementProps | null, SVGFEFloodElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFlood << VNodeFlags.ElementIdOffset),
    "feFlood",
    null,
    className,
    null,
  );
}

export function feFuncA(className?: string): VNode<SVGFEFuncAElementProps | null, SVGFEFuncAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncA << VNodeFlags.ElementIdOffset),
    "feFuncA",
    null,
    className,
    null,
  );
}

export function feFuncB(className?: string): VNode<SVGFEFuncBElementProps | null, SVGFEFuncBElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncB << VNodeFlags.ElementIdOffset),
    "feFuncB",
    null,
    className,
    null,
  );
}

export function feFuncG(className?: string): VNode<SVGFEFuncGElementProps | null, SVGFEFuncGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncG << VNodeFlags.ElementIdOffset),
    "feFuncG",
    null,
    className,
    null,
  );
}

export function feFuncR(className?: string): VNode<SVGFEFuncRElementProps | null, SVGFEFuncRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeFuncR << VNodeFlags.ElementIdOffset),
    "feFuncR",
    null,
    className,
    null,
  );
}

export function feGaussianBlur(className?: string):
  VNode<SVGFEGaussianBlurElementProps | null, SVGFEGaussianBlurElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeGaussianBlur << VNodeFlags.ElementIdOffset),
    "feGaussianBlur",
    null,
    className,
    null,
  );
}

export function feImage(className?: string): VNode<SVGFEImageElementProps | null, SVGFEImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeImage << VNodeFlags.ElementIdOffset),
    "feImage",
    null,
    className,
    null,
  );
}

export function feMerge(className?: string): VNode<SVGFEMergeElementProps | null, SVGFEMergeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMerge << VNodeFlags.ElementIdOffset),
    "feMerge",
    null,
    className,
    null,
  );
}

export function feMergeNode(className?: string): VNode<SVGFEMergeNodeElementProps | null, SVGFEMergeNodeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMergeNode << VNodeFlags.ElementIdOffset),
    "feMergeNode",
    null,
    className,
    null,
  );
}

export function feMorphology(className?: string): VNode<SVGFEMorphologyElementProps | null, SVGFEMorphologyElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeMorphology << VNodeFlags.ElementIdOffset),
    "feMorphology",
    null,
    className,
    null,
  );
}

export function feOffset(className?: string): VNode<SVGFEOffsetElementProps | null, SVGFEOffsetElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeOffset << VNodeFlags.ElementIdOffset),
    "feOffset",
    null,
    className,
    null,
  );
}

export function fePointLight(className?: string): VNode<SVGFEPointLightElementProps | null, SVGFEPointLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FePointLight << VNodeFlags.ElementIdOffset),
    "fePointLight",
    null,
    className,
    null,
  );
}

export function feSpecularLighting(className?: string):
  VNode<SVGFESpecularLightingElementProps | null, SVGFESpecularLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpecularLighting << VNodeFlags.ElementIdOffset),
    "feSpecularLighting",
    null,
    className,
    null,
  );
}

export function feSpotLight(className?: string): VNode<SVGFESpotLightElementProps | null, SVGFESpotLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeSpotLight << VNodeFlags.ElementIdOffset),
    "feSpotLight",
    null,
    className,
    null,
  );
}

export function feTile(className?: string): VNode<SVGFETileElementProps | null, SVGFETileElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTile << VNodeFlags.ElementIdOffset),
    "feTile",
    null,
    className,
    null,
  );
}

export function feTurbulence(className?: string): VNode<SVGFETurbulenceElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FeTurbulence << VNodeFlags.ElementIdOffset),
    "feTurbulence",
    null,
    className,
    null,
  );
}

export function filter(className?: string): VNode<SVGFilterElementProps | null, SVGFilterElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Filter << VNodeFlags.ElementIdOffset),
    "filter",
    null,
    className,
    null,
  );
}

export function font(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Font << VNodeFlags.ElementIdOffset),
    "font",
    null,
    className,
    null,
  );
}

export function fontFace(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFace << VNodeFlags.ElementIdOffset),
    "font-face",
    null,
    className,
    null,
  );
}

export function fontFaceFormat(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceFormat << VNodeFlags.ElementIdOffset),
    "font-face-format",
    null,
    className,
    null,
  );
}

export function fontFaceName(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceName << VNodeFlags.ElementIdOffset),
    "font-face-name",
    null,
    className,
    null,
  );
}

export function fontFaceSrc(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceSrc << VNodeFlags.ElementIdOffset),
    "font-face-src",
    null,
    className,
    null,
  );
}

export function fontFaceUri(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.FontFaceUri << VNodeFlags.ElementIdOffset),
    "font-face-uri",
    null,
    className,
    null,
  );
}

export function foreignObject(className?: string): VNode<SVGForeignObjectElementProps | null, SVGForeignObjectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.ForeignObject << VNodeFlags.ElementIdOffset),
    "foreignObject",
    null,
    className,
    null,
  );
}

export function g(className?: string): VNode<SVGGElementProps | null, SVGGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.G << VNodeFlags.ElementIdOffset),
    "g",
    null,
    className,
    null,
  );
}

export function glyph(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Glyph << VNodeFlags.ElementIdOffset),
    "glyph",
    null,
    className,
    null,
  );
}

export function glyphRef(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.GlyphRef << VNodeFlags.ElementIdOffset),
    "glyphRef",
    null,
    className,
    null,
  );
}

export function hatch(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatch << VNodeFlags.ElementIdOffset),
    "hatch",
    null,
    className,
    null,
  );
}

export function hatchpath(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hatchpath << VNodeFlags.ElementIdOffset),
    "hatchpath",
    null,
    className,
    null,
  );
}

export function hkern(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Hkern << VNodeFlags.ElementIdOffset),
    "hkern",
    null,
    className,
    null,
  );
}

export function image(className?: string): VNode<SVGImageElementProps | null, SVGImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Image << VNodeFlags.ElementIdOffset),
    "image",
    null,
    className,
    null,
  );
}

export function line(className?: string): VNode<SVGLineElementProps | null, SVGLineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Line << VNodeFlags.ElementIdOffset),
    "line",
    null,
    className,
    null,
  );
}

export function linearGradient(className?: string):
  VNode<SVGLinearGradientElementProps | null, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.LinearGradient << VNodeFlags.ElementIdOffset),
    "linearGradient",
    null,
    className,
    null,
  );
}

export function marker(className?: string): VNode<SVGMarkerElementProps | null, SVGMarkerElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Marker << VNodeFlags.ElementIdOffset),
    "marker",
    null,
    className,
    null,
  );
}

export function mask(className?: string): VNode<SVGMaskElementProps | null, SVGMaskElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mask << VNodeFlags.ElementIdOffset),
    "mask",
    null,
    className,
    null,
  );
}

export function mesh(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mesh << VNodeFlags.ElementIdOffset),
    "mesh",
    null,
    className,
    null,
  );
}

export function meshgradient(className?: string): VNode<SVGElementProps | null, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshgradient << VNodeFlags.ElementIdOffset),
    "meshgradient",
    null,
    className,
    null,
  );
}

export function meshpatch(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshpatch << VNodeFlags.ElementIdOffset),
    "meshpatch",
    null,
    className,
    null,
  );
}

export function meshrow(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Meshrow << VNodeFlags.ElementIdOffset),
    "meshrow",
    null,
    className,
    null,
  );
}

export function metadata(className?: string): VNode<SVGMetadataElementProps | null, SVGMetadataElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Metadata << VNodeFlags.ElementIdOffset),
    "metadata",
    null,
    className,
    null,
  );
}

export function missingGlyph(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.MissingGlyph << VNodeFlags.ElementIdOffset),
    "missing-glyph",
    null,
    className,
    null,
  );
}

export function mpath(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Mpath << VNodeFlags.ElementIdOffset),
    "mpath",
    null,
    className,
    null,
  );
}

export function path(className?: string): VNode<SVGPathElementProps | null, SVGPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Path << VNodeFlags.ElementIdOffset),
    "path",
    null,
    className,
    null,
  );
}

export function pattern(className?: string): VNode<SVGPatternElementProps | null, SVGPatternElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Pattern << VNodeFlags.ElementIdOffset),
    "pattern",
    null,
    className,
    null,
  );
}

export function polygon(className?: string): VNode<SVGPolygonElementProps | null, SVGPolygonElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polygon << VNodeFlags.ElementIdOffset),
    "polygon",
    null,
    className,
    null,
  );
}

export function polyline(className?: string): VNode<SVGPolylineElementProps | null, SVGPolylineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Polyline << VNodeFlags.ElementIdOffset),
    "polyline",
    null,
    className,
    null,
  );
}

export function radialGradient(className?: string):
  VNode<SVGRadialGradientElementProps | null, SVGRadialGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.RadialGradient << VNodeFlags.ElementIdOffset),
    "radialGradient",
    null,
    className,
    null,
  );
}

export function rect(className?: string): VNode<SVGRectElementProps | null, SVGRectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Rect << VNodeFlags.ElementIdOffset),
    "rect",
    null,
    className,
    null,
  );
}

export function set(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Set << VNodeFlags.ElementIdOffset),
    "set",
    null,
    className,
    null,
  );
}

export function solidcolor(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Solidcolor << VNodeFlags.ElementIdOffset),
    "solidcolor",
    null,
    className,
    null,
  );
}

export function stop(className?: string): VNode<SVGStopElementProps | null, SVGStopElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Stop << VNodeFlags.ElementIdOffset),
    "stop",
    null,
    className,
    null,
  );
}

export function svg(className?: string): VNode<SVGSVGElementProps | null, SVGSVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Svg << VNodeFlags.ElementIdOffset),
    "svg",
    null,
    className,
    null,
  );
}

export function svgSwitch(className?: string): VNode<SVGElementProps | null, SVGSwitchElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Switch << VNodeFlags.ElementIdOffset),
    "switch",
    null,
    className,
    null,
  );
}

export function symbol(className?: string): VNode<SVGSymbolElementProps | null, SVGSymbolElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Symbol << VNodeFlags.ElementIdOffset),
    "symbol",
    null,
    className,
    null,
  );
}

export function text(className?: string): VNode<SVGTextElementProps | null, SVGTextElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Text << VNodeFlags.ElementIdOffset),
    "text",
    null,
    className,
    null,
  );
}

export function textPath(className?: string): VNode<SVGTextPathElementProps | null, SVGTextPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.TextPath << VNodeFlags.ElementIdOffset),
    "textPath",
    null,
    className,
    null,
  );
}

export function title(className?: string): VNode<SVGElementProps | null, SVGTitleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Title << VNodeFlags.ElementIdOffset),
    "title",
    null,
    className,
    null,
  );
}

export function tref(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Tref << VNodeFlags.ElementIdOffset),
    "tref",
    null,
    className,
    null,
  );
}

export function tspan(className?: string): VNode<SVGTSpanElementProps | null, SVGTSpanElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Tspan << VNodeFlags.ElementIdOffset),
    "tspan",
    null,
    className,
    null,
  );
}

export function use(className?: string): VNode<SVGUseElementProps | null, SVGUseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Use << VNodeFlags.ElementIdOffset),
    "use",
    null,
    className,
    null,
  );
}

export function view(className?: string): VNode<SVGViewElementProps | null, SVGViewElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.View << VNodeFlags.ElementIdOffset),
    "view",
    null,
    className,
    null,
  );
}

export function vkern(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement | (TagId.Vkern << VNodeFlags.ElementIdOffset),
    "vkern",
    null,
    className,
    null,
  );
}

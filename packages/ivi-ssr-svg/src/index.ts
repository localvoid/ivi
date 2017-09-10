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
import { VNode, VNodeFlags } from "ivi-ssr";

export function a(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<a",
    null,
    className === undefined ? null : className,
    null,
    "</a>",
  );
}

export function altGlyph(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<altGlyph",
    null,
    className === undefined ? null : className,
    null,
    "</altGlyph>",
  );
}

export function altGlyphDef(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<altGlyphDef",
    null,
    className === undefined ? null : className,
    null,
    "</altGlyphDef>",
  );
}

export function altGlyphItem(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<altGlyphItem",
    null,
    className === undefined ? null : className,
    null,
    "</altGlyphItem>",
  );
}

export function animate(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<animate",
    null,
    className === undefined ? null : className,
    null,
    "</animate>",
  );
}

export function animateColor(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<animateColor",
    null,
    className === undefined ? null : className,
    null,
    "</animateColor>",
  );
}

export function animateMotion(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<animateMotion",
    null,
    className === undefined ? null : className,
    null,
    "</animateMotion>",
  );
}

export function animateTransform(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<animateTransform",
    null,
    className === undefined ? null : className,
    null,
    "</animateTransform>",
  );
}

export function circle(className?: string): VNode<SVGCircleElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<circle",
    null,
    className === undefined ? null : className,
    null,
    "</circle>",
  );
}

export function clipPath(className?: string): VNode<SVGClipPathElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<clipPath",
    null,
    className === undefined ? null : className,
    null,
    "</clipPath>",
  );
}

export function colorProfile(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<color-profile",
    null,
    className === undefined ? null : className,
    null,
    "</color-profile>",
  );
}

export function cursor(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<cursor",
    null,
    className === undefined ? null : className,
    null,
    "</cursor>",
  );
}

export function defs(className?: string): VNode<SVGDefsElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<defs",
    null,
    className === undefined ? null : className,
    null,
    "</defs>",
  );
}

export function desc(className?: string): VNode<SVGDescElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<desc",
    null,
    className === undefined ? null : className,
    null,
    "</desc>",
  );
}

export function discard(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<discard",
    null,
    className === undefined ? null : className,
    null,
    "</discard>",
  );
}

export function ellipse(className?: string): VNode<SVGEllipseElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<ellipse",
    null,
    className === undefined ? null : className,
    null,
    "</ellipse>",
  );
}

export function feBlend(className?: string): VNode<SVGFEBlendElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feBlend",
    null,
    className === undefined ? null : className,
    null,
    "</feBlend>",
  );
}

export function feColorMatrix(className?: string): VNode<SVGFEColorMatrixElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feColorMatrix",
    null,
    className === undefined ? null : className,
    null,
    "</feColorMatrix>",
  );
}

export function feComponentTransfer(className?: string):
  VNode<SVGFEComponentTransferElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feComponentTransfer",
    null,
    className === undefined ? null : className,
    null,
    "</feComponentTransfer>",
  );
}

export function feComposite(className?: string): VNode<SVGFECompositeElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feComposite",
    null,
    className === undefined ? null : className,
    null,
    "</feComposite>",
  );
}

export function feConvolveMatrix(className?: string):
  VNode<SVGFEConvolveMatrixElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feConvolveMatrix",
    null,
    className === undefined ? null : className,
    null,
    "</feConvolveMatrix>",
  );
}

export function feDiffuseLighting(className?: string):
  VNode<SVGFEDiffuseLightingElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feDiffuseLighting",
    null,
    className === undefined ? null : className,
    null,
    "</feDiffuseLighting>",
  );
}

export function feDisplacementMap(className?: string):
  VNode<SVGFEDisplacementMapElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feDisplacementMap",
    null,
    className === undefined ? null : className,
    null,
    "</feDisplacementMap>",
  );
}

export function feDistantLight(className?: string):
  VNode<SVGFEDistantLightElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feDistantLight",
    null,
    className === undefined ? null : className,
    null,
    "</feDistantLight>",
  );
}

export function feDropShadow(className?: string):
  VNode<SVGFEDisplacementMapElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feDropShadow",
    null,
    className === undefined ? null : className,
    null,
    "</feDropShadow>",
  );
}

export function feFlood(className?: string): VNode<SVGFEFloodElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feFlood",
    null,
    className === undefined ? null : className,
    null,
    "</feFlood>",
  );
}

export function feFuncA(className?: string): VNode<SVGFEFuncAElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feFuncA",
    null,
    className === undefined ? null : className,
    null,
    "</feFuncA>",
  );
}

export function feFuncB(className?: string): VNode<SVGFEFuncBElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feFuncB",
    null,
    className === undefined ? null : className,
    null,
    "</feFuncB>",
  );
}

export function feFuncG(className?: string): VNode<SVGFEFuncGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feFuncG",
    null,
    className === undefined ? null : className,
    null,
    "</feFuncG>",
  );
}

export function feFuncR(className?: string): VNode<SVGFEFuncRElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feFuncR",
    null,
    className === undefined ? null : className,
    null,
    "</feFuncR>",
  );
}

export function feGaussianBlur(className?: string):
  VNode<SVGFEGaussianBlurElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feGaussianBlur",
    null,
    className === undefined ? null : className,
    null,
    "</feGaussianBlur>",
  );
}

export function feImage(className?: string): VNode<SVGFEImageElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feImage",
    null,
    className === undefined ? null : className,
    null,
    "</feImage>",
  );
}

export function feMerge(className?: string): VNode<SVGFEMergeElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feMerge",
    null,
    className === undefined ? null : className,
    null,
    "</feMerge>",
  );
}

export function feMergeNode(className?: string): VNode<SVGFEMergeNodeElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feMergeNode",
    null,
    className === undefined ? null : className,
    null,
    "</feMergeNode>",
  );
}

export function feMorphology(className?: string): VNode<SVGFEMorphologyElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feMorphology",
    null,
    className === undefined ? null : className,
    null,
    "</feMorphology>",
  );
}

export function feOffset(className?: string): VNode<SVGFEOffsetElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feOffset",
    null,
    className === undefined ? null : className,
    null,
    "</feOffset>",
  );
}

export function fePointLight(className?: string): VNode<SVGFEPointLightElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<fePointLight",
    null,
    className === undefined ? null : className,
    null,
    "</fePointLight>",
  );
}

export function feSpecularLighting(className?: string):
  VNode<SVGFESpecularLightingElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feSpecularLighting",
    null,
    className === undefined ? null : className,
    null,
    "</feSpecularLighting>",
  );
}

export function feSpotLight(className?: string): VNode<SVGFESpotLightElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feSpotLight",
    null,
    className === undefined ? null : className,
    null,
    "</feSpotLight>",
  );
}

export function feTile(className?: string): VNode<SVGFETileElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feTile",
    null,
    className === undefined ? null : className,
    null,
    "</feTile>",
  );
}

export function feTurbulence(className?: string): VNode<SVGFETurbulenceElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<feTurbulence",
    null,
    className === undefined ? null : className,
    null,
    "</feTurbulence>",
  );
}

export function filter(className?: string): VNode<SVGFilterElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<filter",
    null,
    className === undefined ? null : className,
    null,
    "</filter>",
  );
}

export function font(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<font",
    null,
    className === undefined ? null : className,
    null,
    "</font>",
  );
}

export function fontFace(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<font-face",
    null,
    className === undefined ? null : className,
    null,
    "</font-face>",
  );
}

export function fontFaceFormat(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<font-face-format",
    null,
    className === undefined ? null : className,
    null,
    "</font-face-format>",
  );
}

export function fontFaceName(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<font-face-name",
    null,
    className === undefined ? null : className,
    null,
    "</font-face-name>",
  );
}

export function fontFaceSrc(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<font-face-src",
    null,
    className === undefined ? null : className,
    null,
    "</font-face-src>",
  );
}

export function fontFaceUri(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<font-face-uri",
    null,
    className === undefined ? null : className,
    null,
    "</font-face-uri>",
  );
}

export function foreignObject(className?: string): VNode<SVGForeignObjectElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<foreignObject",
    null,
    className === undefined ? null : className,
    null,
    "</foreignObject>",
  );
}

export function g(className?: string): VNode<SVGGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<g",
    null,
    className === undefined ? null : className,
    null,
    "</g>",
  );
}

export function glyph(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<glyph",
    null,
    className === undefined ? null : className,
    null,
    "</glyph>",
  );
}

export function glyphRef(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<glyphRef",
    null,
    className === undefined ? null : className,
    null,
    "</glyphRef>",
  );
}

export function hatch(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<hatch",
    null,
    className === undefined ? null : className,
    null,
    "</hatch>",
  );
}

export function hatchpath(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<hatchpath",
    null,
    className === undefined ? null : className,
    null,
    "</hatchpath>",
  );
}

export function hkern(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<hkern",
    null,
    className === undefined ? null : className,
    null,
    "</hkern>",
  );
}

export function image(className?: string): VNode<SVGImageElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<image",
    null,
    className === undefined ? null : className,
    null,
    "</image>",
  );
}

export function line(className?: string): VNode<SVGLineElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<line",
    null,
    className === undefined ? null : className,
    null,
    "</line>",
  );
}

export function linearGradient(className?: string):
  VNode<SVGLinearGradientElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<linearGradient",
    null,
    className === undefined ? null : className,
    null,
    "</linearGradient>",
  );
}

export function marker(className?: string): VNode<SVGMarkerElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<marker",
    null,
    className === undefined ? null : className,
    null,
    "</marker>",
  );
}

export function mask(className?: string): VNode<SVGMaskElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<mask",
    null,
    className === undefined ? null : className,
    null,
    "</mask>",
  );
}

export function mesh(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<mesh",
    null,
    className === undefined ? null : className,
    null,
    "</mesh>",
  );
}

export function meshgradient(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<meshgradient",
    null,
    className === undefined ? null : className,
    null,
    "</meshgradient>",
  );
}

export function meshpatch(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<meshpatch",
    null,
    className === undefined ? null : className,
    null,
    "</meshpatch>",
  );
}

export function meshrow(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<meshrow",
    null,
    className === undefined ? null : className,
    null,
    "</meshrow>",
  );
}

export function metadata(className?: string): VNode<SVGMetadataElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<metadata",
    null,
    className === undefined ? null : className,
    null,
    "</metadata>",
  );
}

export function missingGlyph(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<missing-glyph",
    null,
    className === undefined ? null : className,
    null,
    "</missing-glyph>",
  );
}

export function mpath(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<mpath",
    null,
    className === undefined ? null : className,
    null,
    "</mpath>",
  );
}

export function path(className?: string): VNode<SVGPathElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<path",
    null,
    className === undefined ? null : className,
    null,
    "</path>",
  );
}

export function pattern(className?: string): VNode<SVGPatternElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<pattern",
    null,
    className === undefined ? null : className,
    null,
    "</pattern>",
  );
}

export function polygon(className?: string): VNode<SVGPolygonElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<polygon",
    null,
    className === undefined ? null : className,
    null,
    "</polygon>",
  );
}

export function polyline(className?: string): VNode<SVGPolylineElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<polyline",
    null,
    className === undefined ? null : className,
    null,
    "</polyline>",
  );
}

export function radialGradient(className?: string):
  VNode<SVGRadialGradientElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<radialGradient",
    null,
    className === undefined ? null : className,
    null,
    "</radialGradient>",
  );
}

export function rect(className?: string): VNode<SVGRectElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<rect",
    null,
    className === undefined ? null : className,
    null,
    "</rect>",
  );
}

export function set(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<set",
    null,
    className === undefined ? null : className,
    null,
    "</set>",
  );
}

export function solidcolor(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<solidcolor",
    null,
    className === undefined ? null : className,
    null,
    "</solidcolor>",
  );
}

export function stop(className?: string): VNode<SVGStopElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<stop",
    null,
    className === undefined ? null : className,
    null,
    "</stop>",
  );
}

export function svg(className?: string): VNode<SVGSVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<svg",
    null,
    className === undefined ? null : className,
    null,
    "</svg>",
  );
}

export function svgSwitch(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<switch",
    null,
    className === undefined ? null : className,
    null,
    "</switch>",
  );
}

export function symbol(className?: string): VNode<SVGSymbolElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<symbol",
    null,
    className === undefined ? null : className,
    null,
    "</symbol>",
  );
}

export function text(className?: string): VNode<SVGTextElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<text",
    null,
    className === undefined ? null : className,
    null,
    "</text>",
  );
}

export function textPath(className?: string): VNode<SVGTextPathElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<textPath",
    null,
    className === undefined ? null : className,
    null,
    "</textPath>",
  );
}

export function title(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<title",
    null,
    className === undefined ? null : className,
    null,
    "</title>",
  );
}

export function tref(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<tref",
    null,
    className === undefined ? null : className,
    null,
    "</tref>",
  );
}

export function tspan(className?: string): VNode<SVGTSpanElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<tspan",
    null,
    className === undefined ? null : className,
    null,
    "</tspan>",
  );
}

export function use(className?: string): VNode<SVGUseElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<use",
    null,
    className === undefined ? null : className,
    null,
    "</use>",
  );
}

export function view(className?: string): VNode<SVGViewElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<view",
    null,
    className === undefined ? null : className,
    null,
    "</view>",
  );
}

export function vkern(className?: string): VNode<SVGElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<vkern",
    null,
    className === undefined ? null : className,
    null,
    "</vkern>",
  );
}

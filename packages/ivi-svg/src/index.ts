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
import { VNode, VNodeFlags } from "ivi";

/*
 * SVG Elements:
 * a
 * altGlyph
 * altGlyphDef
 * altGlyphItem
 * animate
 * animateColor
 * animateMotion
 * animateTransform
 * circle
 * clipPath
 * color-profile
 * cursor
 * defs
 * desc
 * discard
 * ellipse
 * feBlend
 * feColorMatrix
 * feComponentTransfer
 * feComposite
 * feConvolveMatrix
 * feDiffuseLighting
 * feDisplacementMap
 * feDistantLight
 * feDropShadow
 * feFlood
 * feFuncA
 * feFuncB
 * feFuncG
 * feFuncR
 * feGaussianBlur
 * feImage
 * feMerge
 * feMergeNode
 * feMorphology
 * feOffset
 * fePointLight
 * feSpecularLighting
 * feSpotLight
 * feTile
 * feTurbulence
 * filter
 * font
 * font-face
 * font-face-format
 * font-face-name
 * font-face-src
 * font-face-uri
 * foreignObject
 * g
 * glyph
 * glyphRef
 * hatch
 * hatchpath
 * hkern
 * image
 * line
 * linearGradient
 * marker
 * mask
 * mesh
 * meshgradient
 * meshpatch
 * meshrow
 * metadata
 * missing-glyph
 * mpath
 * path
 * pattern
 * polygon
 * polyline
 * radialGradient
 * rect
 * set
 * solidcolor
 * stop
 * svg
 * switch
 * symbol
 * text
 * textPath
 * title
 * tref
 * tspan
 * use
 * view
 * vkern
 *
 * Embeddable HTML elements:
 * audio
 * canvas
 * iframe
 * video
 */

export function a(className?: string): VNode<SVGElementProps | null, SVGAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "a",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function altGlyph(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "altGlyph",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function altGlyphDef(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "altGlyphDef",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function altGlyphItem(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "altGlyphItem",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function animate(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "animate",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function animateColor(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "animateColor",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function animateMotion(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "animateMotion",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function animateTransform(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "animateTransform",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function circle(className?: string): VNode<SVGCircleElementProps | null, SVGCircleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "circle",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function clipPath(className?: string): VNode<SVGClipPathElementProps | null, SVGClipPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "clipPath",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function colorProfile(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "color-profile",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function cursor(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "cursor",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function defs(className?: string): VNode<SVGDefsElementProps | null, SVGDefsElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "defs",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function desc(className?: string): VNode<SVGDescElementProps | null, SVGDescElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "desc",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function discard(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "discard",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function ellipse(className?: string): VNode<SVGEllipseElementProps | null, SVGEllipseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "ellipse",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feBlend(className?: string): VNode<SVGFEBlendElementProps | null, SVGFEBlendElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feBlend",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feColorMatrix(className?: string): VNode<SVGFEColorMatrixElementProps | null, SVGFEColorMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feColorMatrix",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feComponentTransfer(className?: string):
  VNode<SVGFEComponentTransferElementProps | null, SVGFEComponentTransferElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feComponentTransfer",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feComposite(className?: string): VNode<SVGFECompositeElementProps | null, SVGFECompositeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feComposite",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feConvolveMatrix(className?: string):
  VNode<SVGFEConvolveMatrixElementProps | null, SVGFEConvolveMatrixElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feConvolveMatrix",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feDiffuseLighting(className?: string):
  VNode<SVGFEDiffuseLightingElementProps | null, SVGFEDiffuseLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feDiffuseLighting",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feDisplacementMap(className?: string):
  VNode<SVGFEDisplacementMapElementProps | null, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feDisplacementMap",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feDistantLight(className?: string):
  VNode<SVGFEDistantLightElementProps | null, SVGFEDistantLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feDistantLight",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feDropShadow(className?: string):
  VNode<SVGFEDisplacementMapElementProps | null, SVGFEDisplacementMapElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feDropShadow",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feFlood(className?: string): VNode<SVGFEFloodElementProps | null, SVGFEFloodElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feFlood",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feFuncA(className?: string): VNode<SVGFEFuncAElementProps | null, SVGFEFuncAElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feFuncA",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feFuncB(className?: string): VNode<SVGFEFuncBElementProps | null, SVGFEFuncBElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feFuncB",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feFuncG(className?: string): VNode<SVGFEFuncGElementProps | null, SVGFEFuncGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feFuncG",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feFuncR(className?: string): VNode<SVGFEFuncRElementProps | null, SVGFEFuncRElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feFuncR",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feGaussianBlur(className?: string):
  VNode<SVGFEGaussianBlurElementProps | null, SVGFEGaussianBlurElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feGaussianBlur",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feImage(className?: string): VNode<SVGFEImageElementProps | null, SVGFEImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feImage",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feMerge(className?: string): VNode<SVGFEMergeElementProps | null, SVGFEMergeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feMerge",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feMergeNode(className?: string): VNode<SVGFEMergeNodeElementProps | null, SVGFEMergeNodeElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feMergeNode",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feMorphology(className?: string): VNode<SVGFEMorphologyElementProps | null, SVGFEMorphologyElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feMorphology",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feOffset(className?: string): VNode<SVGFEOffsetElementProps | null, SVGFEOffsetElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feOffset",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function fePointLight(className?: string): VNode<SVGFEPointLightElementProps | null, SVGFEPointLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "fePointLight",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feSpecularLighting(className?: string):
  VNode<SVGFESpecularLightingElementProps | null, SVGFESpecularLightingElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feSpecularLighting",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feSpotLight(className?: string): VNode<SVGFESpotLightElementProps | null, SVGFESpotLightElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feSpotLight",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feTile(className?: string): VNode<SVGFETileElementProps | null, SVGFETileElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feTile",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function feTurbulence(className?: string): VNode<SVGFETurbulenceElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "feTurbulence",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function filter(className?: string): VNode<SVGFilterElementProps | null, SVGFilterElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "filter",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function font(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "font",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function fontFace(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "font-face",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function fontFaceFormat(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "font-face-format",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function fontFaceName(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "font-face-name",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function fontFaceSrc(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "font-face-src",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function fontFaceUri(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "font-face-uri",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function foreignObject(className?: string): VNode<SVGForeignObjectElementProps | null, SVGForeignObjectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "foreignObject",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function g(className?: string): VNode<SVGGElementProps | null, SVGGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "g",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function glyph(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "glyph",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function glyphRef(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "glyphRef",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function hatch(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "hatch",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function hatchpath(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "hatchpath",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function hkern(className?: string): VNode<SVGElementProps | null, SVGFETurbulenceElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "hkern",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function image(className?: string): VNode<SVGImageElementProps | null, SVGImageElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "image",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function line(className?: string): VNode<SVGLineElementProps | null, SVGLineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "line",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function linearGradient(className?: string):
  VNode<SVGLinearGradientElementProps | null, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "linearGradient",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function marker(className?: string): VNode<SVGMarkerElementProps | null, SVGMarkerElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "marker",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function mask(className?: string): VNode<SVGMaskElementProps | null, SVGMaskElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "mask",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function mesh(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "mesh",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function meshgradient(className?: string): VNode<SVGElementProps | null, SVGLinearGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "meshgradient",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function meshpatch(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "meshpatch",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function meshrow(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "meshrow",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function metadata(className?: string): VNode<SVGMetadataElementProps | null, SVGMetadataElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "metadata",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function missingGlyph(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "missing-glyph",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function mpath(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "mpath",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function path(className?: string): VNode<SVGPathElementProps | null, SVGPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "path",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function pattern(className?: string): VNode<SVGPatternElementProps | null, SVGPatternElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "pattern",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function polygon(className?: string): VNode<SVGPolygonElementProps | null, SVGPolygonElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "polygon",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function polyline(className?: string): VNode<SVGPolylineElementProps | null, SVGPolylineElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "polyline",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function radialGradient(className?: string):
  VNode<SVGRadialGradientElementProps | null, SVGRadialGradientElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "radialGradient",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function rect(className?: string): VNode<SVGRectElementProps | null, SVGRectElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "rect",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function set(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "set",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function solidcolor(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "solidcolor",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function stop(className?: string): VNode<SVGStopElementProps | null, SVGStopElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "stop",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function svg(className?: string): VNode<SVGSVGElementProps | null, SVGSVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "svg",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function svgSwitch(className?: string): VNode<SVGElementProps | null, SVGSwitchElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "switch",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function symbol(className?: string): VNode<SVGSymbolElementProps | null, SVGSymbolElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "symbol",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function text(className?: string): VNode<SVGTextElementProps | null, SVGTextElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "text",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function textPath(className?: string): VNode<SVGTextPathElementProps | null, SVGTextPathElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "textPath",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function title(className?: string): VNode<SVGElementProps | null, SVGTitleElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "title",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function tref(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "tref",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function tspan(className?: string): VNode<SVGTSpanElementProps | null, SVGTSpanElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "tspan",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function use(className?: string): VNode<SVGUseElementProps | null, SVGUseElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "use",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function view(className?: string): VNode<SVGViewElementProps | null, SVGViewElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "view",
    null,
    className === undefined ? null : className,
    null,
  );
}

export function vkern(className?: string): VNode<SVGElementProps | null, SVGElement> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "vkern",
    null,
    className === undefined ? null : className,
    null,
  );
}

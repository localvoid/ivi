declare global {
  /**
   * Adds missing displayName.
   */
  interface Function {
    displayName: string;
  }

  const DEBUG: boolean;
  const TARGET: string;
}

export { Predicate } from "./types";
export { getFunctionName } from "./function";
export { addErrorHandler, catchError } from "./error";
export {
  objectHasOwnProperty,
  nodeInsertBefore, nodeRemoveChild, nodeReplaceChild, nodeCloneNode, elementRemoveAttribute, elementSetAttribute,
  elementSetAttributeNS,
} from "./shortcuts";

export { SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE, KeyCode, KeyLocation, KeyName, MouseButtons } from "./const";
export {
  CSSStyleProps,

  HTMLAnchorElementProps, HTMLElementProps, HTMLAreaElementProps, HTMLAudioElementProps,
  HTMLBaseElementProps, HTMLBaseFontElementProps, HTMLBodyElementProps, HTMLBRElementProps, HTMLButtonElementProps,
  HTMLCanvasElementProps, HTMLQuoteElementProps, HTMLTableCaptionElementProps, HTMLTableColElementProps,
  HTMLDataListElementProps, HTMLModElementProps, HTMLDirectoryElementProps, HTMLDivElementProps,
  HTMLDListElementProps, HTMLEmbedElementProps, HTMLFieldSetElementProps, HTMLFontElementProps, HTMLFormElementProps,
  HTMLFrameElementProps, HTMLFrameSetElementProps, HTMLHeadElementProps, HTMLHeadingElementProps, HTMLHRElementProps,
  HTMLHtmlElementProps, HTMLIFrameElementProps, HTMLImageElementProps, HTMLInputElementProps, HTMLLabelElementProps,
  HTMLLegendElementProps, HTMLLIElementProps, HTMLLinkElementProps, HTMLMapElementProps,
  HTMLMenuElementProps, HTMLMetaElementProps, HTMLMeterElementProps, HTMLObjectElementProps, HTMLOListElementProps,
  HTMLOptGroupElementProps, HTMLOptionElementProps, HTMLParagraphElementProps, HTMLParamElementProps,
  HTMLPictureElementProps, HTMLPreElementProps, HTMLProgressElementProps, HTMLScriptElementProps,
  HTMLSelectElementProps, HTMLSourceElementProps, HTMLSpanElementProps, HTMLStyleElementProps,
  HTMLTableDataCellElementProps, HTMLTableElementProps, HTMLTableHeaderCellElementProps, HTMLTableRowElementProps,
  HTMLTableSectionElementProps, HTMLTemplateElementProps, HTMLTextAreaElementProps, HTMLTitleElementProps,
  HTMLTrackElementProps, HTMLUListElementProps, HTMLUnknownElementProps, HTMLVideoElementProps, HTMLMediaElementProps,

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
  SVGSVGElementProps, SVGSwitchElementProps, SVGSymbolElementProps, SVGTextElementProps, SVGTextPathElementProps,
  SVGTSpanElementProps, SVGViewElementProps, SVGUseElementProps, SVGElementProps,
} from "./dom_props";

export { append, unorderedArrayDelete } from "./array";
export { NOOP, NOOP_FALSE } from "./noop";
export { RepeatableTaskList, runRepeatableTasks } from "./repeatable_task_list";
export { shallowEqual } from "./equal";

export { IOS_UA } from "./user_agent";
export {
  PASSIVE_EVENTS, KEYBOARD_EVENT_KEY, MOUSE_EVENT_BUTTONS, TOUCH_EVENTS, POINTER_EVENTS, INPUT_DEVICE_CAPABILITIES,
} from "./feature_detection";

export { getEventCharCode, getEventKey, getMouseButtons } from "./dom/input";
export { firstLeaf, nextSibling, nodeDepth } from "./dom/traverse";

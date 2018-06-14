declare global {
  /**
   * Adds missing displayName.
   */
  interface Function {
    displayName: string;
  }

  /**
   * Additional properties available on iOS.
   */
  interface TouchEvent {
    rotation: number;
    scale: number;
  }

  const DEBUG: boolean;
  const TARGET: string;
}

export { getFunctionName } from "./function";
export { debugSub, debugPub } from "./debug";
export { addErrorHandler, catchError } from "./error";
export {
  objectHasOwnProperty,
  nodeInsertBefore, nodeRemoveChild, nodeReplaceChild, nodeCloneNode, elementRemoveAttribute, elementSetAttribute,
  elementSetAttributeNS,
  _,
} from "./shortcuts";
export {
  SyncableValue,
  SYNCABLE_VALUE_SKIP_UNDEFINED, SYNCABLE_VALUE_REMOVE_ATTR_UNDEFINED,
  PROPERTY, UNSAFE_HTML,
} from "./syncable_value";

export { SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE, KeyCode, KeyLocation, KeyName, MouseButtons } from "./const";
export {
  Predicate,

  CSSStyleProps,

  HTMLAnchorElementAttrs, HTMLElementAttrs, HTMLAreaElementAttrs, HTMLAudioElementAttrs,
  HTMLBaseElementAttrs, HTMLBodyElementAttrs, HTMLBRElementAttrs, HTMLButtonElementAttrs,
  HTMLCanvasElementAttrs, HTMLQuoteElementAttrs, HTMLTableCaptionElementAttrs, HTMLTableColElementAttrs,
  HTMLDataListElementAttrs, HTMLModElementAttrs, HTMLDivElementAttrs,
  HTMLDListElementAttrs, HTMLEmbedElementAttrs, HTMLFieldSetElementAttrs, HTMLFormElementAttrs,
  HTMLHeadElementAttrs, HTMLHeadingElementAttrs, HTMLHRElementAttrs,
  HTMLHtmlElementAttrs, HTMLIFrameElementAttrs, HTMLImageElementAttrs, HTMLInputElementAttrs, HTMLLabelElementAttrs,
  HTMLLegendElementAttrs, HTMLLIElementAttrs, HTMLLinkElementAttrs, HTMLMapElementAttrs,
  HTMLMenuElementAttrs, HTMLMetaElementAttrs, HTMLMeterElementAttrs, HTMLObjectElementAttrs, HTMLOListElementAttrs,
  HTMLOptGroupElementAttrs, HTMLOptionElementAttrs, HTMLParagraphElementAttrs, HTMLParamElementAttrs,
  HTMLPictureElementAttrs, HTMLPreElementAttrs, HTMLProgressElementAttrs, HTMLScriptElementAttrs,
  HTMLSelectElementAttrs, HTMLSourceElementAttrs, HTMLSpanElementAttrs, HTMLStyleElementAttrs,
  HTMLTableDataCellElementAttrs, HTMLTableElementAttrs, HTMLTableHeaderCellElementAttrs, HTMLTableRowElementAttrs,
  HTMLTableSectionElementAttrs, HTMLTemplateElementAttrs, HTMLTextAreaElementAttrs, HTMLTitleElementAttrs,
  HTMLTrackElementAttrs, HTMLUListElementAttrs, HTMLUnknownElementAttrs, HTMLVideoElementAttrs, HTMLMediaElementAttrs,

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
  SVGSVGElementAttrs, SVGSwitchElementAttrs, SVGSymbolElementAttrs, SVGTextElementAttrs, SVGTextPathElementAttrs,
  SVGTSpanElementAttrs, SVGViewElementAttrs, SVGUseElementAttrs, SVGElementAttrs,
} from "./types";

export { append, unorderedArrayDelete } from "./array";
export { NOOP, NOOP_FALSE } from "./noop";
export { RepeatableTaskList, runRepeatableTasks } from "./repeatable_task_list";
export { shallowEqual } from "./equal";

export {
  PASSIVE_EVENTS, KEYBOARD_EVENT_KEY, MOUSE_EVENT_BUTTONS, TOUCH_EVENTS, POINTER_EVENTS, INPUT_DEVICE_CAPABILITIES,
  IOS_GESTURE_EVENT,
} from "./feature_detection";

export { getEventCharCode, getEventKey, getMouseButtons } from "./dom/input";
export { firstLeaf, nextSibling, nodeDepth } from "./dom/traverse";

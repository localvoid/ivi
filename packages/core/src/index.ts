/**
 * Global variables.
 */
declare global {
  /* tslint:disable:no-unused-variable */
  /**
   * Global variable that enables Development Mode.
   *
   * @define {boolean}
   */
  const __IVI_DEV__: boolean;

  /**
   * Global variable that indicates that code is executed in a browser environment.
   *
   * @define {boolean}
   */
  const __IVI_BROWSER__: boolean;

  /**
   * Adds missing displayName.
   */
  interface Function {
    displayName: string;
  }
  /* tslint:enable:no-unused-variable */
}

export { Context, MaybeUndefined } from "./types";
export { SelectorData, SelectorDataRef, selectorDataRef, selectorData, memoizeSelector } from "./selector";

export { SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE, KeyCode, KeyLocation, KeyName, MouseButtons } from "./const";
export {
  CSSStyleProps,

  HTMLAnchorElementProps, HTMLElementProps, HTMLAppletElementProps, HTMLAreaElementProps, HTMLAudioElementProps,
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
  MSHTMLWebViewElementProps,

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

export { unorderedArrayDelete, map, mapRange, mapFilterUndefined } from "./array";
export { NOOP, NOOP_FALSE } from "./noop";
export { RepeatableTaskList } from "./repeatable_task_list";
export { shallowEqual } from "./equal";

export { USER_AGENT, UserAgentFlags } from "./user_agent";
export { FEATURES, FeatureFlags } from "./feature_detection";
export {
  DevModeHooks, DEV_HOOKS, devModeAddHook, OnAfterTestHook, OnBeforeTestHook, OnErrorHook, devModeOnError,
} from "./dev_hooks";

import { devModeOnBeforeTest, devModeOnAfterTest } from "./dev_hooks";

declare global {
  interface Window {
    __test_hooks__: undefined | {
      before: () => void;
      after: () => void;
    };
  }
}

if (__IVI_DEV__) {
  if (__IVI_BROWSER__) {
    const hooks = window.__test_hooks__;
    if (hooks !== undefined) {
      hooks.before = devModeOnBeforeTest;
      hooks.after = devModeOnAfterTest;
    }
  }
}

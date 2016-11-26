
export interface CSSStyleProps {
    alignContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch" | null;
    alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch" | null;
    alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch" | null;
    alignmentBaseline?: string | null;
    animation?: string | null;
    animationDelay?: string | null;
    animationDirection?: "normal" | "reverse" | "alternate" | "alternate-reverse" | string | null;
    animationDuration?: string | null;
    animationFillMode?: "none" | "forwards" | "backwards" | "both" | string | null;
    animationIterationCount?: string | number | null;
    animationName?: string | null;
    animationPlayState?: "running" | "paused" | string | null;
    animationTimingFunction?: string | null;
    backfaceVisibility?: "visible" | "hidden" | null;
    background?: string | null;
    backgroundAttachment?: string | null;
    backgroundClip?: "border-box" | "padding-box" | "content-box" | string | null;
    backgroundColor?: string | null;
    backgroundImage?: string | null;
    backgroundOrigin?: "border-box" | "padding-box" | "content-box" | string | null;
    backgroundPosition?: string | null;
    backgroundPositionX?: string | null;
    backgroundPositionY?: string | null;
    backgroundRepeat?: string | null;
    backgroundSize?: string | null;
    baselineShift?: string | null;
    border?: number | string | null;
    borderBottom?: number | string | null;
    borderBottomColor?: string | null;
    borderBottomLeftRadius?: number | string | null;
    borderBottomRightRadius?: number | string | null;
    borderBottomStyle?: string | null;
    borderBottomWidth?: number | string | null;
    borderCollapse?: "collapse" | "separate" | null;
    borderColor?: string | null;
    borderImage?: string | null;
    borderImageOutset?: string | null;
    borderImageRepeat?: string | null;
    borderImageSlice?: string | null;
    borderImageSource?: string | null;
    borderImageWidth?: number | string | null;
    borderLeft?: number | string | null;
    borderLeftColor?: string | null;
    borderLeftStyle?: string | null;
    borderLeftWidth?: number | string | null;
    borderRadius?: number | string | null;
    borderRight?: number | string | null;
    borderRightColor?: number | string | null;
    borderRightStyle?: number | string | null;
    borderRightWidth?: number | string | null;
    borderSpacing?: number | string | null;
    borderStyle?: string | null;
    borderTop?: number | string | null;
    borderTopColor?: string | null;
    borderTopLeftRadius?: number | string | null;
    borderTopRightRadius?: number | string | null;
    borderTopStyle?: string | null;
    borderTopWidth?: number | string | null;
    borderWidth?: number | string | null;
    bottom?: string | null;
    boxDecorationBreak?: "slice" | "clone" | null;
    boxShadow?: string | null;
    boxSizing?: "content-box" | "border-box" | null;
    breakAfter?: string | null;
    breakBefore?: string | null;
    breakInside?: string | null;
    captionSide?: string | null;
    clear?: "none" | "left" | "right" | "both" | "inline-start" | "inline-end" | null;
    clip?: string | null;
    clipPath?: string | null;
    clipRule?: string | null;
    color?: string | null;
    colorInterpolationFilters?: string | null;
    columnCount?: number | string | null;
    columnFill?: string | null;
    columnGap?: any;
    columnRule?: string | null;
    columnRuleColor?: any;
    columnRuleStyle?: string | null;
    columnRuleWidth?: number | string | null;
    columnSpan?: string | null;
    columnWidth?: number | string | null;
    columns?: number | string | null;
    content?: string | null;
    counterIncrement?: string | null;
    counterReset?: string | null;
    cssFloat?: "left" | "right" | "none" | "inline-start" | "inline-end" | null;
    cssText?: string;
    cursor?: string | null;
    direction?: "ltr" | "rtl" | null;
    display?: "none" | "inline" | "block" | "list-item" | "inline-list-item" | "inline-block" | "inline-table" |
    "table" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" |
    "table-row" | "table-row-group" | "flex" | "inline-flex" | "grid" | "inline-grid" | "run-in" | "ruby" |
    "ruby-base" | "ruby-text" | "ruby-base-container" | "ruby-text-container" | "contents" | null;
    dominantBaseline?: string | null;
    emptyCells?: string | null;
    enableBackground?: string | null;
    fill?: string | null;
    fillOpacity?: string | null;
    fillRule?: string | null;
    filter?: string | null;
    flex?: string | null;
    flexBasis?: string | null;
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse" | null;
    flexFlow?: string | null;
    flexGrow?: number | string | null;
    flexShrink?: number | string | null;
    flexWrap?: "nowrap" | "wrap" | "wrap-reverse" | null;
    float?: "left" | "right" | "none" | "inline-start" | "inline-end" | null;
    floodColor?: string | null;
    floodOpacity?: number | string | null;
    font?: string | null;
    fontFamily?: string | null;
    fontFeatureSettings?: string | null;
    fontSize?: number | string | null;
    fontSizeAdjust?: string | null;
    fontStretch?: "normal" | "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" | "semi-expanded" |
    "expanded" | "extra-expanded" | "ultra-expanded" | null;
    fontStyle?: string | null;
    fontVariant?: string | null;
    fontWeight?: number | string | null;
    glyphOrientationHorizontal?: string | null;
    glyphOrientationVertical?: string | null;
    height?: number | string | null;
    imeMode?: "auto" | "normal" | "active" | "inactive" | "disabled" | null;
    isolation?: "auto" | "isolate" | null;
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | null;
    kerning?: string | null;
    left?: number | string | null;
    letterSpacing?: number | string | null;
    lightingColor?: string | null;
    lineBreak?: "auto" | "loose" | "normal" | "strict" | null;
    lineHeight?: number | string | null;
    listStyle?: string | null;
    listStyleImage?: string | null;
    listStylePosition?: string | null;
    listStyleType?: string | null;
    margin?: number | string | null;
    marginBottom?: number | string | null;
    marginLeft?: number | string | null;
    marginRight?: number | string | null;
    marginTop?: number | string | null;
    marker?: string | null;
    markerEnd?: string | null;
    markerMid?: string | null;
    markerStart?: string | null;
    mask?: string | null;
    maxHeight?: number | string | null;
    maxWidth?: number | string | null;
    minHeight?: number | string | null;
    minWidth?: number | string | null;
    msContentZoomChaining?: string | null;
    msContentZoomLimit?: string | null;
    msContentZoomLimitMax?: any;
    msContentZoomLimitMin?: any;
    msContentZoomSnap?: string | null;
    msContentZoomSnapPoints?: string | null;
    msContentZoomSnapType?: string | null;
    msContentZooming?: string | null;
    msFlowFrom?: string | null;
    msFlowInto?: string | null;
    msFontFeatureSettings?: string | null;
    msGridColumn?: any;
    msGridColumnAlign?: string | null;
    msGridColumnSpan?: any;
    msGridColumns?: string | null;
    msGridRow?: any;
    msGridRowAlign?: string | null;
    msGridRowSpan?: any;
    msGridRows?: string | null;
    msHighContrastAdjust?: string | null;
    msHyphenateLimitChars?: string | null;
    msHyphenateLimitLines?: any;
    msHyphenateLimitZone?: any;
    msHyphens?: string | null;
    msImeAlign?: string | null;
    msOverflowStyle?: string | null;
    msScrollChaining?: string | null;
    msScrollLimit?: string | null;
    msScrollLimitXMax?: any;
    msScrollLimitXMin?: any;
    msScrollLimitYMax?: any;
    msScrollLimitYMin?: any;
    msScrollRails?: string | null;
    msScrollSnapPointsX?: string | null;
    msScrollSnapPointsY?: string | null;
    msScrollSnapType?: string | null;
    msScrollSnapX?: string | null;
    msScrollSnapY?: string | null;
    msScrollTranslation?: string | null;
    msTextCombineHorizontal?: string | null;
    msTextSizeAdjust?: any;
    msTouchAction?: string | null;
    msTouchSelect?: string | null;
    msUserSelect?: string | null;
    msWrapFlow?: string;
    msWrapMargin?: any;
    msWrapThrough?: string;
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down" | null;
    opacity?: number | string | null;
    order?: number | string | null;
    orientation?: "auto" | "portrait" | "landscape" | null;
    orphans?: string | null;
    outline?: string | null;
    outlineColor?: string | null;
    outlineStyle?: string | null;
    outlineWidth?: number | string | null;
    overflow?: "visible" | "hidden" | "scroll" | "auto" | null;
    overflowWrap?: "normal" | "break-word" | null;
    overflowX?: "visible" | "hidden" | "scroll" | "auto" | null;
    overflowY?: "visible" | "hidden" | "scroll" | "auto" | null;
    padding?: number | string | null;
    paddingBottom?: number | string | null;
    paddingLeft?: number | string | null;
    paddingRight?: number | string | null;
    paddingTop?: number | string | null;
    pageBreakAfter?: string | null;
    pageBreakBefore?: string | null;
    pageBreakInside?: string | null;
    perspective?: number | string | null;
    perspectiveOrigin?: string | null;
    pointerEvents?: "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" |
    "fill" | "stroke" | "all" | "inherit" | null;
    position?: "static" | "relative" | "absolute" | "sticky" | "fixed" | null;
    quotes?: string | null;
    resize?: "none" | "both" | "horizontal" | "vertical" | null;
    right?: number | string | null;
    rubyAlign?: string | null;
    rubyOverhang?: string | null;
    rubyPosition?: string | null;
    stopColor?: string | null;
    stopOpacity?: number | string | null;
    stroke?: string | null;
    strokeDasharray?: string | null;
    strokeDashoffset?: number | string | null;
    strokeLinecap?: string | null;
    strokeLinejoin?: string | null;
    strokeMiterlimit?: string | null;
    strokeOpacity?: number | string | null;
    strokeWidth?: number | string | null;
    tabSize?: number | string | null;
    tableLayout?: "auto" | "fixed" | null;
    textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent" | null;
    textAlignLast?: "auto" | "start" | "end" | "left" | "right" | "center" | "justify" | null;
    textAnchor?: string | null;
    textDecoration?: string | null;
    textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | "wavy" | null;
    textIndent?: number | string | null;
    textJustify?: string | null;
    textKashida?: string | null;
    textKashidaSpace?: string | null;
    textOrientation?: "mixed" | "upright" | "sideways" | null;
    textOverflow?: string | null;
    textShadow?: string | null;
    textTransform?: string | null;
    textUnderlinePosition?: string | null;
    top?: number | string | null;
    touchAction?: string | null;
    transform?: string | null;
    transformBox?: "mixed" | "upright" | "sideways" | null;
    transformOrigin?: string | null;
    transformStyle?: string | null;
    transition?: string | null;
    transitionDelay?: number | string | null;
    transitionDuration?: number | string | null;
    transitionProperty?: string | null;
    transitionTimingFunction?: string | null;
    unicodeBidi?: string | null;
    verticalAlign?: string | null;
    visibility?: "visible" | "hidden" | "collapse" | null;
    webkitAlignContent?: string | null;
    webkitAlignItems?: string | null;
    webkitAlignSelf?: string | null;
    webkitAnimation?: string | null;
    webkitAnimationDelay?: string | null;
    webkitAnimationDirection?: string | null;
    webkitAnimationDuration?: string | null;
    webkitAnimationFillMode?: string | null;
    webkitAnimationIterationCount?: string | null;
    webkitAnimationName?: string | null;
    webkitAnimationPlayState?: string | null;
    webkitAnimationTimingFunction?: string | null;
    webkitAppearance?: string | null;
    webkitBackfaceVisibility?: string | null;
    webkitBackgroundClip?: string | null;
    webkitBackgroundOrigin?: string | null;
    webkitBackgroundSize?: string | null;
    webkitBorderBottomLeftRadius?: string | null;
    webkitBorderBottomRightRadius?: string | null;
    webkitBorderImage?: string | null;
    webkitBorderRadius?: string | null;
    webkitBorderTopLeftRadius?: string | null;
    webkitBorderTopRightRadius?: string | null;
    webkitBoxAlign?: string | null;
    webkitBoxDirection?: string | null;
    webkitBoxFlex?: string | null;
    webkitBoxOrdinalGroup?: string | null;
    webkitBoxOrient?: string | null;
    webkitBoxPack?: string | null;
    webkitBoxSizing?: string | null;
    webkitColumnBreakAfter?: string | null;
    webkitColumnBreakBefore?: string | null;
    webkitColumnBreakInside?: string | null;
    webkitColumnCount?: any;
    webkitColumnGap?: any;
    webkitColumnRule?: string | null;
    webkitColumnRuleColor?: any;
    webkitColumnRuleStyle?: string | null;
    webkitColumnRuleWidth?: any;
    webkitColumnSpan?: string | null;
    webkitColumnWidth?: any;
    webkitColumns?: string | null;
    webkitFilter?: string | null;
    webkitFlex?: string | null;
    webkitFlexBasis?: string | null;
    webkitFlexDirection?: string | null;
    webkitFlexFlow?: string | null;
    webkitFlexGrow?: string | null;
    webkitFlexShrink?: string | null;
    webkitFlexWrap?: string | null;
    webkitJustifyContent?: string | null;
    webkitOrder?: string | null;
    webkitPerspective?: string | null;
    webkitPerspectiveOrigin?: string | null;
    webkitTapHighlightColor?: string | null;
    webkitTextFillColor?: string | null;
    webkitTextSizeAdjust?: any;
    webkitTransform?: string | null;
    webkitTransformOrigin?: string | null;
    webkitTransformStyle?: string | null;
    webkitTransition?: string | null;
    webkitTransitionDelay?: string | null;
    webkitTransitionDuration?: string | null;
    webkitTransitionProperty?: string | null;
    webkitTransitionTimingFunction?: string | null;
    webkitUserModify?: string | null;
    webkitUserSelect?: string | null;
    webkitWritingMode?: string | null;
    whiteSpace?: "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | null;
    widows?: number | string | null;
    width?: number | string | null;
    wordBreak?: "normal" | "break-all" | "keep-all" | null;
    wordSpacing?: number | string | null;
    wordWrap?: "normal" | "break-word" | null;
    writingMode?: string | null;
    zIndex?: number | string | null;
    zoom?: string | null;
}

export interface NodeProps {
    [key: string]: any;
}

export interface AriaProps {
    // Global States and Properties
    "aria-current"?: string | null;  // state
    "aria-details"?: string | null;
    "aria-disabled"?: string | null; // state
    "aria-hidden"?: string | null;   // state
    "aria-invalid"?: string | null;  // state
    "aria-keyshortcuts"?: string | null;
    "aria-label"?: string | null;
    "aria-roledescription"?: string | null;
    // Widget Attributes
    "aria-autocomplete"?: string | null;
    "aria-checked"?: string | null;
    "aria-expanded"?: string | null;
    "aria-haspopup"?: string | null;
    "aria-level"?: string | null;
    "aria-modal"?: string | null;
    "aria-multiline"?: string | null;
    "aria-multiselectable"?: string | null;
    "aria-orientation"?: string | null;
    "aria-placeholder"?: string | null;
    "aria-pressed"?: string | null;
    "aria-readonly"?: string | null;
    "aria-required"?: string | null;
    "aria-selected"?: string | null;
    "aria-sort"?: string | null;
    "aria-valuemax"?: string | null;
    "aria-valuemin"?: string | null;
    "aria-valuenow"?: string | null;
    "aria-valuetext"?: string | null;
    // Live Region Attributes
    "aria-atomic"?: string | null;
    "aria-busy"?: string | null;
    "aria-live"?: string | null;
    "aria-relevant"?: string | null;
    // Drag-and-Drop Attributes
    "aria-dropeffect"?: string | null;
    "aria-grabbed"?: string | null;
    // Relationship Attributes
    "aria-activedescendant"?: string | null;
    "aria-colcount"?: string | null;
    "aria-colindex"?: string | null;
    "aria-colspan"?: string | null;
    "aria-controls"?: string | null;
    "aria-describedby"?: string | null;
    "aria-errormessage"?: string | null;
    "aria-flowto"?: string | null;
    "aria-labelledby"?: string | null;
    "aria-owns"?: string | null;
    "aria-posinset"?: string | null;
    "aria-rowcount"?: string | null;
    "aria-rowindex"?: string | null;
    "aria-rowspan"?: string | null;
    "aria-setsize"?: string | null;
}

export interface GlobalEventHandlersProps {
    onpointercancel?: (this: this, ev: PointerEvent) => any;
    onpointerdown?: (this: this, ev: PointerEvent) => any;
    onpointerenter?: (this: this, ev: PointerEvent) => any;
    onpointerleave?: (this: this, ev: PointerEvent) => any;
    onpointermove?: (this: this, ev: PointerEvent) => any;
    onpointerout?: (this: this, ev: PointerEvent) => any;
    onpointerover?: (this: this, ev: PointerEvent) => any;
    onpointerup?: (this: this, ev: PointerEvent) => any;
    onwheel?: (this: this, ev: WheelEvent) => any;
}

export interface ElementProps extends NodeProps, GlobalEventHandlersProps {
    id?: string;
    msContentZoomFactor?: number;
    onariarequest?: (this: this, ev: AriaRequestEvent) => any;
    oncommand?: (this: this, ev: CommandEvent) => any;
    ongotpointercapture?: (this: this, ev: PointerEvent) => any;
    onlostpointercapture?: (this: this, ev: PointerEvent) => any;
    onmsgesturechange?: (this: this, ev: MSGestureEvent) => any;
    onmsgesturedoubletap?: (this: this, ev: MSGestureEvent) => any;
    onmsgestureend?: (this: this, ev: MSGestureEvent) => any;
    onmsgesturehold?: (this: this, ev: MSGestureEvent) => any;
    onmsgesturestart?: (this: this, ev: MSGestureEvent) => any;
    onmsgesturetap?: (this: this, ev: MSGestureEvent) => any;
    onmsgotpointercapture?: (this: this, ev: MSPointerEvent) => any;
    onmsinertiastart?: (this: this, ev: MSGestureEvent) => any;
    onmslostpointercapture?: (this: this, ev: MSPointerEvent) => any;
    onmspointercancel?: (this: this, ev: MSPointerEvent) => any;
    onmspointerdown?: (this: this, ev: MSPointerEvent) => any;
    onmspointerenter?: (this: this, ev: MSPointerEvent) => any;
    onmspointerleave?: (this: this, ev: MSPointerEvent) => any;
    onmspointermove?: (this: this, ev: MSPointerEvent) => any;
    onmspointerout?: (this: this, ev: MSPointerEvent) => any;
    onmspointerover?: (this: this, ev: MSPointerEvent) => any;
    onmspointerup?: (this: this, ev: MSPointerEvent) => any;
    ontouchcancel?: (ev: TouchEvent) => any;
    ontouchend?: (ev: TouchEvent) => any;
    ontouchmove?: (ev: TouchEvent) => any;
    ontouchstart?: (ev: TouchEvent) => any;
    onwebkitfullscreenchange?: (this: this, ev: Event) => any;
    onwebkitfullscreenerror?: (this: this, ev: Event) => any;
    scrollLeft?: number;
    scrollTop?: number;
}

export interface HTMLElementProps extends ElementProps {
    accessKey?: string;
    contentEditable?: string;
    dir?: string;
    draggable?: boolean;
    hidden?: boolean;
    hideFocus?: boolean;
    lang?: string;
    onabort?: (this: this, ev: UIEvent) => any;
    onactivate?: (this: this, ev: UIEvent) => any;
    onbeforeactivate?: (this: this, ev: UIEvent) => any;
    onbeforecopy?: (this: this, ev: ClipboardEvent) => any;
    onbeforecut?: (this: this, ev: ClipboardEvent) => any;
    onbeforedeactivate?: (this: this, ev: UIEvent) => any;
    onbeforepaste?: (this: this, ev: ClipboardEvent) => any;
    onblur?: (this: this, ev: FocusEvent) => any;
    oncanplay?: (this: this, ev: Event) => any;
    oncanplaythrough?: (this: this, ev: Event) => any;
    onchange?: (this: this, ev: Event) => any;
    onclick?: (this: this, ev: MouseEvent) => any;
    oncontextmenu?: (this: this, ev: PointerEvent) => any;
    oncopy?: (this: this, ev: ClipboardEvent) => any;
    oncuechange?: (this: this, ev: Event) => any;
    oncut?: (this: this, ev: ClipboardEvent) => any;
    ondblclick?: (this: this, ev: MouseEvent) => any;
    ondeactivate?: (this: this, ev: UIEvent) => any;
    ondrag?: (this: this, ev: DragEvent) => any;
    ondragend?: (this: this, ev: DragEvent) => any;
    ondragenter?: (this: this, ev: DragEvent) => any;
    ondragleave?: (this: this, ev: DragEvent) => any;
    ondragover?: (this: this, ev: DragEvent) => any;
    ondragstart?: (this: this, ev: DragEvent) => any;
    ondrop?: (this: this, ev: DragEvent) => any;
    ondurationchange?: (this: this, ev: Event) => any;
    onemptied?: (this: this, ev: Event) => any;
    onended?: (this: this, ev: MediaStreamErrorEvent) => any;
    onerror?: (this: this, ev: ErrorEvent) => any;
    onfocus?: (this: this, ev: FocusEvent) => any;
    oninput?: (this: this, ev: Event) => any;
    oninvalid?: (this: this, ev: Event) => any;
    onkeydown?: (this: this, ev: KeyboardEvent) => any;
    onkeypress?: (this: this, ev: KeyboardEvent) => any;
    onkeyup?: (this: this, ev: KeyboardEvent) => any;
    onload?: (this: this, ev: Event) => any;
    onloadeddata?: (this: this, ev: Event) => any;
    onloadedmetadata?: (this: this, ev: Event) => any;
    onloadstart?: (this: this, ev: Event) => any;
    onmousedown?: (this: this, ev: MouseEvent) => any;
    onmouseenter?: (this: this, ev: MouseEvent) => any;
    onmouseleave?: (this: this, ev: MouseEvent) => any;
    onmousemove?: (this: this, ev: MouseEvent) => any;
    onmouseout?: (this: this, ev: MouseEvent) => any;
    onmouseover?: (this: this, ev: MouseEvent) => any;
    onmouseup?: (this: this, ev: MouseEvent) => any;
    onmousewheel?: (this: this, ev: WheelEvent) => any;
    onmscontentzoom?: (this: this, ev: UIEvent) => any;
    onmsmanipulationstatechanged?: (this: this, ev: MSManipulationEvent) => any;
    onpaste?: (this: this, ev: ClipboardEvent) => any;
    onpause?: (this: this, ev: Event) => any;
    onplay?: (this: this, ev: Event) => any;
    onplaying?: (this: this, ev: Event) => any;
    onprogress?: (this: this, ev: ProgressEvent) => any;
    onratechange?: (this: this, ev: Event) => any;
    onreset?: (this: this, ev: Event) => any;
    onscroll?: (this: this, ev: UIEvent) => any;
    onseeked?: (this: this, ev: Event) => any;
    onseeking?: (this: this, ev: Event) => any;
    onselect?: (this: this, ev: UIEvent) => any;
    onselectstart?: (this: this, ev: Event) => any;
    onstalled?: (this: this, ev: Event) => any;
    onsubmit?: (this: this, ev: Event) => any;
    onsuspend?: (this: this, ev: Event) => any;
    ontimeupdate?: (this: this, ev: Event) => any;
    onvolumechange?: (this: this, ev: Event) => any;
    onwaiting?: (this: this, ev: Event) => any;
    outerHTML?: string;
    outerText?: string;
    spellcheck?: boolean;
    tabIndex?: number;
    title?: string;
}

export interface HTMLAnchorElementProps extends HTMLElementProps {
    Methods?: string;
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    charset?: string;
    /**
     * Sets or retrieves the coordinates of the object.
     */
    coords?: string;
    download?: string;
    /**
     * Contains the anchor portion of the URL including the hash sign (#).
     */
    hash?: string;
    /**
     * Contains the hostname and port values of the URL.
     */
    host?: string;
    /**
     * Contains the hostname of a URL.
     */
    hostname?: string;
    /**
     * Sets or retrieves a destination URL or an anchor point.
     */
    href?: string;
    /**
     * Sets or retrieves the language code of the object.
     */
    hreflang?: string;
    /**
     * Sets or retrieves the shape of the object.
     */
    name?: string;
    /**
     * Contains the pathname of the URL.
     */
    pathname?: string;
    /**
     * Sets or retrieves the port number associated with a URL.
     */
    port?: string;
    /**
     * Contains the protocol of the URL.
     */
    protocol?: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    rel?: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    rev?: string;
    /**
     * Sets or retrieves the substring of the href property that follows the question mark.
     */
    search?: string;
    /**
     * Sets or retrieves the shape of the object.
     */
    shape?: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target?: string;
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text?: string;
    type?: string;
    urn?: string;
}

export interface HTMLAppletElementProps extends HTMLElementProps {
    align?: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt?: string;
    /**
     * Gets or sets the optional alternative HTML script to execute if the object fails to load.
     */
    altHtml?: string;
    /**
     * Sets or retrieves a character string that can be used to implement your own archive functionality for the
     * object.
     */
    archive?: string;
    border?: string;
    code?: string;
    /**
     * Sets or retrieves the URL of the component.
     */
    codeBase?: string;
    /**
     * Sets or retrieves the Internet media type for the code associated with the object.
     */
    codeType?: string;
    /**
     * Sets or retrieves the URL that references the data of the object.
     */
    data?: string;
    /**
     * Sets or retrieves a character string that can be used to implement your own declare functionality for the
     * object.
     */
    declare?: boolean;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: string;
    hspace?: number;
    /**
     * Sets or retrieves the shape of the object.
     */
    name?: string;
    object?: string | null;
    /**
     * Sets or retrieves a message to be displayed while an object is loading.
     */
    standby?: string;
    /**
     * Returns the content type of the object.
     */
    type?: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    useMap?: string;
    vspace?: number;
    width?: number;
}

export interface HTMLAreaElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt?: string;
    /**
     * Sets or retrieves the coordinates of the object.
     */
    coords?: string;
    download?: string;
    /**
     * Sets or retrieves the subsection of the href property that follows the number sign (#).
     */
    hash?: string;
    /**
     * Sets or retrieves the hostname and port number of the location or URL.
     */
    host?: string;
    /**
     * Sets or retrieves the host name part of the location or URL.
     */
    hostname?: string;
    /**
     * Sets or retrieves a destination URL or an anchor point.
     */
    href?: string;
    /**
     * Sets or gets whether clicks in this region cause action.
     */
    noHref?: boolean;
    /**
     * Sets or retrieves the file name or path specified by the object.
     */
    pathname?: string;
    /**
     * Sets or retrieves the port number associated with a URL.
     */
    port?: string;
    /**
     * Sets or retrieves the protocol portion of a URL.
     */
    protocol?: string;
    rel?: string;
    /**
     * Sets or retrieves the substring of the href property that follows the question mark.
     */
    search?: string;
    /**
     * Sets or retrieves the shape of the object.
     */
    shape?: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target?: string;
    /**
     * Returns a string representation of an object.
     */
}

export interface HTMLMediaElementProps extends HTMLElementProps {
    /**
     * Gets or sets a value that indicates whether to start playing the media automatically.
     */
    autoplay?: boolean;
    /**
     * Gets or sets a flag that indicates whether the client provides a set of controls for the media (in case the
     * developer does not include controls for the player).
     */
    controls?: boolean;
    crossOrigin?: string;
    /**
     * Gets or sets the current playback position, in seconds.
     */
    currentTime?: number;
    defaultMuted?: boolean;
    /**
     * Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio
     * resource.
     */
    defaultPlaybackRate?: number;
    /**
     * Gets or sets a flag to specify whether playback should restart after it completes.
     */
    loop?: boolean;
    /**
     * Specifies the purpose of the audio or video media, such as background audio or alerts.
     */
    msAudioCategory?: string;
    /**
     * Specifies the output device id that the audio will be sent to.
     */
    msAudioDeviceType?: string;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled?: boolean;
    /**
     * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media
     * content, which can be DRM protected, from a different location, such as a cloud media server.
     */
    msPlayToPreferredSourceUri?: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary?: boolean;
    /**
     * Specifies whether or not to enable low-latency playback on the media element.
     */
    msRealTime?: boolean;
    /**
     * Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted.
     */
    muted?: boolean;
    onencrypted?: (this: this, ev: MediaEncryptedEvent) => any;
    onmsneedkey?: (this: this, ev: MSMediaKeyNeededEvent) => any;
    /**
     * Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple
     * of the normal speed of the media resource.
     */
    playbackRate?: number;
    /**
     * Gets or sets the current playback position, in seconds.
     */
    preload?: string;
    readyState?: number;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src?: string;
    srcObject?: MediaStream | null;
    /**
     * Gets or sets the volume level for audio portions of the media element.
     */
    volume?: number;
}

export interface HTMLAudioElementProps extends HTMLMediaElementProps {
}

export interface HTMLBaseElementProps extends HTMLElementProps {
    /**
     * Gets or sets the baseline URL on which relative links are based.
     */
    href?: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target?: string;
}

export interface HTMLBaseFontElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the current typeface family.
     */
    face?: string;
    /**
     * Sets or retrieves the font size of the object.
     */
    size?: number;
}

export interface HTMLQuoteElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves reference information about the object.
     */
    cite?: string;
}

export interface HTMLBodyElementProps extends HTMLElementProps {
    aLink?: any;
    background?: string;
    bgColor?: any;
    bgProperties?: string;
    link?: any;
    noWrap?: boolean;
    onafterprint?: (this: this, ev: Event) => any;
    onbeforeprint?: (this: this, ev: Event) => any;
    onbeforeunload?: (this: this, ev: BeforeUnloadEvent) => any;
    onblur?: (this: this, ev: FocusEvent) => any;
    onerror?: (this: this, ev: ErrorEvent) => any;
    onfocus?: (this: this, ev: FocusEvent) => any;
    onhashchange?: (this: this, ev: HashChangeEvent) => any;
    onload?: (this: this, ev: Event) => any;
    onmessage?: (this: this, ev: MessageEvent) => any;
    onoffline?: (this: this, ev: Event) => any;
    ononline?: (this: this, ev: Event) => any;
    onorientationchange?: (this: this, ev: Event) => any;
    onpagehide?: (this: this, ev: PageTransitionEvent) => any;
    onpageshow?: (this: this, ev: PageTransitionEvent) => any;
    onpopstate?: (this: this, ev: PopStateEvent) => any;
    onresize?: (this: this, ev: UIEvent) => any;
    onstorage?: (this: this, ev: StorageEvent) => any;
    onunload?: (this: this, ev: Event) => any;
    text?: any;
    vLink?: any;
}

export interface HTMLBRElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the side on which floating objects are not to be positioned when any IHTMLBlockElement is
     * inserted into the document.
     */
    clear?: string;
}

export interface HTMLButtonElementProps extends HTMLElementProps {
    /**
     * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and
     * convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true
     * when present on an element, and false when missing.
     */
    autofocus?: boolean;
    disabled?: boolean;
    /**
     * Overrides the action attribute (where the data on a form is sent) on the parent form element.
     */
    formAction?: string;
    /**
     * Used to override the encoding (formEnctype attribute) specified on the form element.
     */
    formEnctype?: string;
    /**
     * Overrides the submit method attribute previously specified on a form element.
     */
    formMethod?: string;
    /**
     * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without
     * validation. This can be used to create a "save draft"-type submit option.
     */
    formNoValidate?: string;
    /**
     * Overrides the target attribute on a form element.
     */
    formTarget?: string;
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    status?: any;
    /**
     * Gets the classification and default behavior of the button.
     */
    type?: string;
    /**
     * Sets or retrieves the default or selected value of the control.
     */
    value?: string;
}

export interface HTMLCanvasElementProps extends HTMLElementProps {
    /**
     * Gets or sets the height of a canvas element on a document.
     */
    height?: number;
    /**
     * Gets or sets the width of a canvas element on a document.
     */
    width?: number;
}

export interface HTMLTableCaptionElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the alignment of the caption or legend.
     */
    align?: string;
    /**
     * Sets or retrieves whether the caption appears at the top or bottom of the table.
     */
    vAlign?: string;
}

export interface HTMLTableAlignmentProps {
    /**
     * Sets or retrieves a value that you can use to implement your own ch functionality for the object.
     */
    ch?: string;
    /**
     * Sets or retrieves a value that you can use to implement your own chOff functionality for the object.
     */
    chOff?: string;
    /**
     * Sets or retrieves how text and other content are vertically aligned within the object that contains them.
     */
    vAlign?: string;
}

export interface HTMLTableColElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
    /**
     * Sets or retrieves the alignment of the object relative to the display or table.
     */
    align?: string;
    /**
     * Sets or retrieves the number of columns in the group.
     */
    span?: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: any;
}

export interface HTMLDataListElementProps extends HTMLElementProps {
    options?: HTMLCollectionOf<HTMLOptionElement>;
}

export interface HTMLModElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves reference information about the object.
     */
    cite?: string;
    /**
     * Sets or retrieves the date and time of a modification to the object.
     */
    dateTime?: string;
}

export interface HTMLDirectoryElementProps extends HTMLElementProps {
    compact?: boolean;
}

export interface HTMLDivElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    /**
     * Sets or retrieves whether the browser automatically performs wordwrap.
     */
    noWrap?: boolean;
}

export interface HTMLDListElementProps extends HTMLElementProps {
    compact?: boolean;
}

export interface HTMLEmbedElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the height of the object.
     */
    height?: string;
    hidden?: any;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled?: boolean;
    /**
     * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the
     * media content, which can be DRM protected, from a different location, such as a cloud media server.
     */
    msPlayToPreferredSourceUri?: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary?: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    src?: string;
    /**
     * Sets or retrieves the height and width units of the embed object.
     */
    units?: string;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: string;
}

export interface HTMLFieldSetElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    disabled?: boolean;
}

export interface HTMLFontElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the current typeface family.
     */
    face?: string;
}

export interface HTMLFormElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves a list of character encodings for input data that must be accepted by the server processing
     * the form.
     */
    acceptCharset?: string;
    /**
     * Sets or retrieves the URL to which the form content is sent for processing.
     */
    action?: string;
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     */
    autocomplete?: string;
    /**
     * Sets or retrieves the MIME encoding for the form.
     */
    encoding?: string;
    /**
     * Sets or retrieves the encoding type for the form.
     */
    enctype?: string;
    /**
     * Sets or retrieves how to send the form data to the server.
     */
    method?: string;
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    /**
     * Designates a form that is not validated when submitted.
     */
    noValidate?: boolean;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target?: string;
    [name: string]: any;
}

export interface HTMLFrameElementProps extends HTMLElementProps {
    /**
     * Specifies the properties of a border drawn around an object.
     */
    border?: string;
    /**
     * Sets or retrieves the border color of the object.
     */
    borderColor?: any;
    /**
     * Sets or retrieves whether to display a border for the frame.
     */
    frameBorder?: string;
    /**
     * Sets or retrieves the amount of additional space between the frames.
     */
    frameSpacing?: any;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: string | number;
    /**
     * Sets or retrieves a URI to a long description of the object.
     */
    longDesc?: string;
    /**
     * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
     */
    marginHeight?: string;
    /**
     * Sets or retrieves the left and right margin widths before displaying the text in a frame.
     */
    marginWidth?: string;
    /**
     * Sets or retrieves the frame name.
     */
    name?: string;
    /**
     * Sets or retrieves whether the user can resize the frame.
     */
    noResize?: boolean;
    /**
     * Raised when the object has been completely received from the server.
     */
    onload?: (this: this, ev: Event) => any;
    /**
     * Sets or retrieves whether the frame can be scrolled.
     */
    scrolling?: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    src?: string;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: string | number;
}

export interface HTMLFrameSetElementProps extends HTMLElementProps {
    border?: string;
    /**
     * Sets or retrieves the border color of the object.
     */
    borderColor?: any;
    /**
     * Sets or retrieves the frame widths of the object.
     */
    cols?: string;
    /**
     * Sets or retrieves whether to display a border for the frame.
     */
    frameBorder?: string;
    /**
     * Sets or retrieves the amount of additional space between the frames.
     */
    frameSpacing?: any;
    name?: string;
    onafterprint?: (this: this, ev: Event) => any;
    onbeforeprint?: (this: this, ev: Event) => any;
    onbeforeunload?: (this: this, ev: BeforeUnloadEvent) => any;
    /**
     * Fires when the object loses the input focus.
     */
    onblur?: (this: this, ev: FocusEvent) => any;
    onerror?: (this: this, ev: ErrorEvent) => any;
    /**
     * Fires when the object receives focus.
     */
    onfocus?: (this: this, ev: FocusEvent) => any;
    onhashchange?: (this: this, ev: HashChangeEvent) => any;
    onload?: (this: this, ev: Event) => any;
    onmessage?: (this: this, ev: MessageEvent) => any;
    onoffline?: (this: this, ev: Event) => any;
    ononline?: (this: this, ev: Event) => any;
    onorientationchange?: (this: this, ev: Event) => any;
    onpagehide?: (this: this, ev: PageTransitionEvent) => any;
    onpageshow?: (this: this, ev: PageTransitionEvent) => any;
    onresize?: (this: this, ev: UIEvent) => any;
    onstorage?: (this: this, ev: StorageEvent) => any;
    onunload?: (this: this, ev: Event) => any;
    /**
     * Sets or retrieves the frame heights of the object.
     */
    rows?: string;
}

export interface HTMLHeadingElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    align?: string;
}

export interface HTMLHeadElementProps extends HTMLElementProps {
    profile?: string;
}

export interface HTMLHRElementProps extends HTMLElement {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    /**
     * Sets or retrieves whether the horizontal rule is drawn with 3-D shading.
     */
    noShade?: boolean;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: number;
}

export interface HTMLHtmlElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the DTD version that governs the current document.
     */
    version?: string;
}


export interface HTMLIFrameElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    allowFullscreen?: boolean;
    /**
     * Specifies the properties of a border drawn around an object.
     */
    border?: string;
    /**
     * Sets or retrieves whether to display a border for the frame.
     */
    frameBorder?: string;
    /**
     * Sets or retrieves the amount of additional space between the frames.
     */
    frameSpacing?: any;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: string;
    /**
     * Sets or retrieves the horizontal margin for the object.
     */
    hspace?: number;
    /**
     * Sets or retrieves a URI to a long description of the object.
     */
    longDesc?: string;
    /**
     * Sets or retrieves the top and bottom margin heights before displaying the text in a frame.
     */
    marginHeight?: string;
    /**
     * Sets or retrieves the left and right margin widths before displaying the text in a frame.
     */
    marginWidth?: string;
    /**
     * Sets or retrieves the frame name.
     */
    name?: string;
    /**
     * Sets or retrieves whether the user can resize the frame.
     */
    noResize?: boolean;
    /**
     * Raised when the object has been completely received from the server.
     */
    onload?: (this: this, ev: Event) => any;
    /**
     * Sets or retrieves whether the frame can be scrolled.
     */
    scrolling?: string;
    /**
     * Sets or retrieves a URL to be loaded by the object.
     */
    src?: string;
    /**
     * Sets or retrieves the vertical margin for the object.
     */
    vspace?: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: string;
}

export interface HTMLImageElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt?: string;
    /**
     * Specifies the properties of a border drawn around an object.
     */
    border?: string;
    crossOrigin?: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: number;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     */
    hspace?: number;
    /**
     * Sets or retrieves whether the image is a server-side image map.
     */
    isMap?: boolean;
    /**
     * Sets or retrieves a Uniform Resource Identifier (URI) to a long description of the object.
     */
    longDesc?: string;
    lowsrc?: string;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled?: boolean;
    msPlayToPreferredSourceUri?: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary?: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    sizes?: string;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src?: string;
    srcset?: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    useMap?: string;
    /**
     * Sets or retrieves the vertical margin for the object.
     */
    vspace?: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: number;
}

export interface HTMLInputElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves a comma-separated list of content types.
     */
    accept?: string;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt?: string;
    /**
     * Specifies whether autocomplete is applied to an editable text field.
     */
    autocomplete?: string;
    /**
     * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and
     * convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true
     * when present on an element, and false when missing.
     */
    autofocus?: boolean;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     */
    border?: string;
    /**
     * Sets or retrieves the state of the check box or radio button.
     */
    checked?: boolean;
    /**
     * Sets or retrieves the state of the check box or radio button.
     */
    defaultChecked?: boolean;
    /**
     * Sets or retrieves the initial contents of the object.
     */
    defaultValue?: string;
    disabled?: boolean;
    /**
     * Overrides the action attribute (where the data on a form is sent) on the parent form element.
     */
    formAction?: string;
    /**
     * Used to override the encoding (formEnctype attribute) specified on the form element.
     */
    formEnctype?: string;
    /**
     * Overrides the submit method attribute previously specified on a form element.
     */
    formMethod?: string;
    /**
     * Overrides any validation or required attributes on a form or form elements to allow it to be submitted without
     * validation. This can be used to create a "save draft"-type submit option.
     */
    formNoValidate?: string;
    /**
     * Overrides the target attribute on a form element.
     */
    formTarget?: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: string;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     */
    hspace?: number;
    indeterminate?: boolean;
    /**
     * Defines the maximum acceptable value for an input element with type="number".When used with the min and step
     * attributes, lets you control the range and increment (such as only even numbers) that the user can enter into
     * an input field.
     */
    max?: string;
    /**
     * Sets or retrieves the maximum number of characters that the user can enter in a text control.
     */
    maxLength?: number;
    /**
     * Defines the minimum acceptable value for an input element with type="number". When used with the max and step
     * attributes, lets you control the range and increment (such as even numbers only) that the user can enter into
     * an input field.
     */
    min?: string;
    /**
     * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
     */
    multiple?: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    /**
     * Gets or sets a string containing a regular expression that the user's input must match.
     */
    pattern?: string;
    /**
     * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or
     * type of information they need to enter.The text appears in an input field until the user puts focus on the
     * field.
     */
    placeholder?: string;
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required?: boolean;
    selectionDirection?: string;
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    selectionEnd?: number;
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    selectionStart?: number;
    size?: number;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src?: string;
    status?: boolean;
    /**
     * Defines an increment or jump between values that you want to allow the user to enter. When used with the max
     * and min attributes, lets you control the range and increment (for example, allow only even numbers) that the
     * user can enter into an input field.
     */
    step?: string;
    /**
     * Returns the content type of the object.
     */
    type?: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    useMap?: string;
    /**
     * Returns the value of the data at the cursor's current position.
     */
    value?: string;
    valueAsDate?: Date;
    /**
     * Returns the input field value as a number.
     */
    valueAsNumber?: number;
    /**
     * Sets or retrieves the vertical margin for the object.
     */
    vspace?: number;
    webkitdirectory?: boolean;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: string;
    minLength?: number;
}

export interface HTMLUnknownElementProps extends HTMLElementProps {
}

export interface HTMLLabelElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the object to which the given label object is assigned.
     */
    htmlFor?: string;
}

export interface HTMLLegendElementProps extends HTMLElementProps {
    /**
     * Retrieves a reference to the form that the object is embedded in.
     */
    align?: string;
}

export interface HTMLLIElementProps extends HTMLElementProps {
    type?: string;
    /**
     * Sets or retrieves the value of a list item.
     */
    value?: number;
}

export interface HTMLLinkElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    charset?: string;
    disabled?: boolean;
    /**
     * Sets or retrieves a destination URL or an anchor point.
     */
    href?: string;
    /**
     * Sets or retrieves the language code of the object.
     */
    hreflang?: string;
    /**
     * Sets or retrieves the media type.
     */
    media?: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    rel?: string;
    /**
     * Sets or retrieves the relationship between the object and the destination of the link.
     */
    rev?: string;
    /**
     * Sets or retrieves the window or frame at which to target content.
     */
    target?: string;
    /**
     * Sets or retrieves the MIME type of the object.
     */
    type?: string;
    import?: Document;
    integrity?: string;
}

export interface HTMLMapElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
}

export interface HTMLMarqueeElementProps extends HTMLElementProps {
    behavior?: string;
    bgColor?: any;
    direction?: string;
    height?: string;
    hspace?: number;
    loop?: number;
    onbounce?: (this: this, ev: Event) => any;
    onfinish?: (this: this, ev: Event) => any;
    onstart?: (this: this, ev: Event) => any;
    scrollAmount?: number;
    scrollDelay?: number;
    trueSpeed?: boolean;
    vspace?: number;
    width?: string;
}

export interface HTMLMediaElementProps extends HTMLElementProps {
    /**
     * Gets or sets a value that indicates whether to start playing the media automatically.
     */
    autoplay?: boolean;
    /**
     * Gets or sets a flag that indicates whether the client provides a set of controls for the media (in case the
     * developer does not include controls for the player).
     */
    controls?: boolean;
    crossOrigin?: string;
    /**
     * Gets or sets the current playback position, in seconds.
     */
    currentTime?: number;
    defaultMuted?: boolean;
    /**
     * Gets or sets the default playback rate when the user is not using fast forward or reverse for a video or audio
     * resource.
     */
    defaultPlaybackRate?: number;
    /**
     * Gets or sets a flag to specify whether playback should restart after it completes.
     */
    loop?: boolean;
    /**
     * Specifies the purpose of the audio or video media, such as background audio or alerts.
     */
    msAudioCategory?: string;
    /**
     * Specifies the output device id that the audio will be sent to.
     */
    msAudioDeviceType?: string;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled?: boolean;
    /**
     * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media
     * content, which can be DRM protected, from a different location, such as a cloud media server.
     */
    msPlayToPreferredSourceUri?: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary?: boolean;
    /**
     * Specifies whether or not to enable low-latency playback on the media element.
     */
    msRealTime?: boolean;
    /**
     * Gets or sets a flag that indicates whether the audio (either audio or the audio track on video media) is muted.
     */
    muted?: boolean;
    /**
     * Gets the current network activity for the element.
     */
    onencrypted?: (this: this, ev: MediaEncryptedEvent) => any;
    onmsneedkey?: (this: this, ev: MSMediaKeyNeededEvent) => any;
    /**
     * Gets or sets the current rate of speed for the media resource to play. This speed is expressed as a multiple of
     * the normal speed of the media resource.
     */
    playbackRate?: number;
    /**
     * Gets or sets the current playback position, in seconds.
     */
    preload?: string;
    readyState?: number;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src?: string;
    srcObject?: MediaStream | null;
    /**
     * Gets or sets the volume level for audio portions of the media element.
     */
    volume?: number;
}

export interface HTMLMenuElementProps extends HTMLElementProps {
    compact?: boolean;
    type?: string;
}

export interface HTMLMetaElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    charset?: string;
    /**
     * Gets or sets meta-information to associate with httpEquiv or name.
     */
    content?: string;
    /**
     * Gets or sets information used to bind the value of a content attribute of a meta element to an HTTP response
     * header.
     */
    httpEquiv?: string;
    /**
     * Sets or retrieves the value specified in the content attribute of the meta object.
     */
    name?: string;
    /**
     * Sets or retrieves a scheme to be used in interpreting the value of a property specified for the object.
     */
    scheme?: string;
    /**
     * Sets or retrieves the URL property that will be loaded after the specified time has elapsed.
     */
    url?: string;
}

export interface HTMLMeterElementProps extends HTMLElementProps {
    high?: number;
    low?: number;
    max?: number;
    min?: number;
    optimum?: number;
    value?: number;
}

export interface HTMLModElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves reference information about the object.
     */
    cite?: string;
    /**
     * Sets or retrieves the date and time of a modification to the object.
     */
    dateTime?: string;
}

export interface HTMLOListElementProps extends HTMLElementProps {
    compact?: boolean;
    /**
     * The starting number.
     */
    start?: number;
    type?: string;
}

export interface HTMLObjectElementProps extends HTMLElementProps {
    /**
     * Retrieves a string of the URL where the object tag can be found. This is often the href of the document that
     * the object is in, or the value set by a base element.
     */
    align?: string;
    /**
     * Sets or retrieves a text alternative to the graphic.
     */
    alt?: string;
    /**
     * Gets or sets the optional alternative HTML script to execute if the object fails to load.
     */
    altHtml?: string;
    /**
     * Sets or retrieves a character string that can be used to implement your own archive functionality for the
     * object.
     */
    archive?: string;
    border?: string;
    /**
     * Sets or retrieves the URL of the file containing the compiled Java class.
     */
    code?: string;
    /**
     * Sets or retrieves the URL of the component.
     */
    codeBase?: string;
    /**
     * Sets or retrieves the Internet media type for the code associated with the object.
     */
    codeType?: string;
    /**
     * Sets or retrieves the URL that references the data of the object.
     */
    data?: string;
    declare?: boolean;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: string;
    hspace?: number;
    /**
     * Gets or sets whether the DLNA PlayTo device is available.
     */
    msPlayToDisabled?: boolean;
    /**
     * Gets or sets the path to the preferred media source. This enables the Play To target device to stream the media
     * content, which can be DRM protected, from a different location, such as a cloud media server.
     */
    msPlayToPreferredSourceUri?: string;
    /**
     * Gets or sets the primary DLNA PlayTo device.
     */
    msPlayToPrimary?: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    /**
     * Sets or retrieves a message to be displayed while an object is loading.
     */
    standby?: string;
    /**
     * Sets or retrieves the MIME type of the object.
     */
    type?: string;
    /**
     * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
     */
    useMap?: string;
    vspace?: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: string;
}

export interface HTMLOptGroupElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the status of an option.
     */
    defaultSelected?: boolean;
    disabled?: boolean;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     */
    label?: string;
    /**
     * Sets or retrieves whether the option in the list box is the default item.
     */
    selected?: boolean;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    value?: string;
}

export interface HTMLOptionElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the status of an option.
     */
    defaultSelected?: boolean;
    disabled?: boolean;
    /**
     * Sets or retrieves a value that you can use to implement your own label functionality for the object.
     */
    label?: string;
    /**
     * Sets or retrieves whether the option in the list box is the default item.
     */
    selected?: boolean;
    /**
     * Sets or retrieves the text string specified by the option tag.
     */
    text?: string;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    value?: string;
}

export interface HTMLParagraphElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    clear?: string;
}

export interface HTMLParamElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the name of an input parameter for an element.
     */
    name?: string;
    /**
     * Sets or retrieves the content type of the resource designated by the value attribute.
     */
    type?: string;
    /**
     * Sets or retrieves the value of an input parameter for an element.
     */
    value?: string;
    /**
     * Sets or retrieves the data type of the value attribute.
     */
    valueType?: string;
}


export interface HTMLPictureElementProps extends HTMLElementProps {
}

export interface HTMLPreElementProps extends HTMLElementProps {
    /**
     * Sets or gets a value that you can use to implement your own width functionality for the object.
     */
    width?: number;
}

export interface HTMLProgressElementProps extends HTMLElementProps {
    /**
     * Defines the maximum, or "done" value for a progress element.
     */
    max?: number;
    /**
     * Sets or gets the current value of a progress element. The value must be a non-negative number between 0 and the
     * max value.
     */
    value?: number;
}

export interface HTMLQuoteElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves reference information about the object.
     */
    cite?: string;
}

export interface HTMLScriptElementProps extends HTMLElementProps {
    async?: boolean;
    /**
     * Sets or retrieves the character set used to encode the object.
     */
    charset?: string;
    /**
     * Sets or retrieves the status of the script.
     */
    defer?: boolean;
    /**
     * Sets or retrieves the event for which the script is written.
     */
    event?: string;
    /**
     * Sets or retrieves the object that is bound to the event script.
     */
    htmlFor?: string;
    /**
     * Retrieves the URL to an external file that contains the source code or data.
     */
    src?: string;
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text?: string;
    /**
     * Sets or retrieves the MIME type for the associated scripting engine.
     */
    type?: string;
    integrity?: string;
}

export interface HTMLSelectElementProps extends HTMLElementProps {
    /**
     * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and
     * convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true
     * when present on an element, and false when missing.
     */
    autofocus?: boolean;
    disabled?: boolean;
    /**
     * Sets or retrieves the number of objects in a collection.
     */
    length?: number;
    /**
     * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
     */
    multiple?: boolean;
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required?: boolean;
    /**
     * Sets or retrieves the index of the selected option in a select object.
     */
    selectedIndex?: number;
    selectedOptions?: HTMLCollectionOf<HTMLOptionElement>;
    /**
     * Sets or retrieves the number of rows in the list box.
     */
    size?: number;
    /**
     * Sets or retrieves the value which is returned to the server when the form control is submitted.
     */
    value?: string;
    [name: string]: any;
}

export interface HTMLSourceElementProps extends HTMLElementProps {
    /**
     * Gets or sets the intended media type of the media source.
     */
    media?: string;
    msKeySystem?: string;
    sizes?: string;
    /**
     * The address or URL of the a media resource that is to be considered.
     */
    src?: string;
    srcset?: string;
    /**
     * Gets or sets the MIME type of a media resource.
     */
    type?: string;
}

export interface HTMLSpanElementProps extends HTMLElementProps {
}

export interface HTMLStyleElementProps extends HTMLElementProps {
    disabled?: boolean;
    /**
     * Sets or retrieves the media type.
     */
    media?: string;
    /**
     * Retrieves the CSS language in which the style sheet is written.
     */
    type?: string;
}

export interface HTMLTableCaptionElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves the alignment of the caption or legend.
     */
    align?: string;
    /**
     * Sets or retrieves whether the caption appears at the top or bottom of the table.
     */
    vAlign?: string;
}

export interface HTMLTableAlignmentProps {
    /**
     * Sets or retrieves a value that you can use to implement your own ch functionality for the object.
     */
    ch?: string;
    /**
     * Sets or retrieves a value that you can use to implement your own chOff functionality for the object.
     */
    chOff?: string;
    /**
     * Sets or retrieves how text and other content are vertically aligned within the object that contains them.
     */
    vAlign?: string;
}

export interface HTMLTableCellElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
    /**
     * Sets or retrieves abbreviated text for the object.
     */
    abbr?: string;
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    /**
     * Sets or retrieves a comma-delimited list of conceptual categories associated with the object.
     */
    axis?: string;
    bgColor?: any;
    /**
     * Sets or retrieves the number columns in the table that the object should span.
     */
    colSpan?: number;
    /**
     * Sets or retrieves a list of header cells that provide information for the object.
     */
    headers?: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: any;
    /**
     * Sets or retrieves whether the browser automatically performs wordwrap.
     */
    noWrap?: boolean;
    /**
     * Sets or retrieves how many rows in a table the cell should span.
     */
    rowSpan?: number;
    /**
     * Sets or retrieves the group of cells in a table to which the object's information applies.
     */
    scope?: string;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: string;
}

export interface HTMLTableColElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
    /**
     * Sets or retrieves the alignment of the object relative to the display or table.
     */
    align?: string;
    /**
     * Sets or retrieves the number of columns in the group.
     */
    span?: number;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: any;
}

export interface HTMLTableDataCellElementProps extends HTMLTableCellElementProps {
}

export interface HTMLTableElementProps extends HTMLElementProps {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    align?: string;
    bgColor?: any;
    /**
     * Sets or retrieves the width of the border to draw around the object.
     */
    border?: string;
    /**
     * Sets or retrieves the border color of the object.
     */
    borderColor?: any;
    /**
     * Retrieves the caption object of a table.
     */
    caption?: HTMLTableCaptionElement;
    /**
     * Sets or retrieves the amount of space between the border of the cell and the content of the cell.
     */
    cellPadding?: string;
    /**
     * Sets or retrieves the amount of space between cells in a table.
     */
    cellSpacing?: string;
    /**
     * Sets or retrieves the number of columns in the table.
     */
    cols?: number;
    /**
     * Sets or retrieves the way the border frame around the table is displayed.
     */
    frame?: string;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: any;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    rows?: HTMLCollectionOf<HTMLTableRowElement>;
    /**
     * Sets or retrieves which dividing lines (inner borders) are displayed.
     */
    rules?: string;
    /**
     * Sets or retrieves a description and/or structure of the object.
     */
    summary?: string;
    /**
     * Retrieves a collection of all tBody objects in the table. Objects in this collection are in source order.
     */
    tBodies?: HTMLCollectionOf<HTMLTableSectionElement>;
    /**
     * Retrieves the tFoot object of the table.
     */
    tFoot?: HTMLTableSectionElement;
    /**
     * Retrieves the tHead object of the table.
     */
    tHead?: HTMLTableSectionElement;
    /**
     * Sets or retrieves the width of the object.
     */
    width?: string;
}

export interface HTMLTableHeaderCellElementProps extends HTMLTableCellElementProps {
    /**
     * Sets or retrieves the group of cells in a table to which the object's information applies.
     */
    scope?: string;
}

export interface HTMLTableRowElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
    /**
     * Sets or retrieves how the object is aligned with adjacent text.
     */
    align?: string;
    bgColor?: any;
    /**
     * Retrieves a collection of all cells in the table row.
     */
    cells?: HTMLCollectionOf<HTMLTableDataCellElement | HTMLTableHeaderCellElement>;
    /**
     * Sets or retrieves the height of the object.
     */
    height?: any;
}

export interface HTMLTableSectionElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
    /**
     * Sets or retrieves a value that indicates the table alignment.
     */
    align?: string;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    rows?: HTMLCollectionOf<HTMLTableRowElement>;
}

export interface HTMLTemplateElementProps extends HTMLElementProps {
}

export interface HTMLTextAreaElementProps extends HTMLElementProps {
    /**
     * Provides a way to direct a user to a specific field when a document loads. This can provide both direction and
     * convenience for a user, reducing the need to click or tab to a field when a page opens. This attribute is true
     * when present on an element, and false when missing.
     */
    autofocus?: boolean;
    /**
     * Sets or retrieves the width of the object.
     */
    cols?: number;
    /**
     * Sets or retrieves the initial contents of the object.
     */
    defaultValue?: string;
    disabled?: boolean;
    /**
     * Sets or retrieves the maximum number of characters that the user can enter in a text control.
     */
    maxLength?: number;
    /**
     * Sets or retrieves the name of the object.
     */
    name?: string;
    /**
     * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or
     * type of information they need to enter.The text appears in an input field until the user puts focus on the
     * field.
     */
    placeholder?: string;
    /**
     * Sets or retrieves the value indicated whether the content of the object is read-only.
     */
    /**
     * When present, marks an element that can't be submitted without a value.
     */
    required?: boolean;
    /**
     * Sets or retrieves the number of horizontal rows contained in the object.
     */
    rows?: number;
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    selectionEnd?: number;
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    selectionStart?: number;
    /**
     * Sets or retrieves the value indicating whether the control is selected.
     */
    status?: any;
    /**
     * Retrieves or sets the text in the entry field of the textArea element.
     */
    value?: string;
    /**
     * Sets or retrieves how to handle wordwrapping in the object.
     */
    wrap?: string;
    minLength?: number;
}

export interface HTMLTitleElementProps extends HTMLElementProps {
    /**
     * Retrieves or sets the text of the object as a string.
     */
    text?: string;
}

export interface HTMLTrackElementProps extends HTMLElementProps {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srclang?: string;
}

export interface HTMLUListElementProps extends HTMLElementProps {
    compact?: boolean;
    type?: string;
}

export interface HTMLVideoElementProps extends HTMLMediaElementProps {
    /**
     * Gets or sets the height of the video element.
     */
    height?: number;
    msHorizontalMirror?: boolean;
    msStereo3DPackingMode?: string;
    msStereo3DRenderMode?: string;
    msZoom?: boolean;
    onMSVideoFormatChanged?: (this: this, ev: Event) => any;
    onMSVideoFrameStepCompleted?: (this: this, ev: Event) => any;
    onMSVideoOptimalLayoutChanged?: (this: this, ev: Event) => any;
    /**
     * Gets or sets a URL of an image to display, for example, like a movie poster. This can be a still frame from the
     * video, or another image if no video data is available.
     */
    poster?: string;
    /**
     * Gets or sets the width of the video element.
     */
    width?: number;
}

export interface MSHTMLWebViewElementProps extends HTMLElementProps {
    height?: number;
    src?: string;
    width?: number;
}

export interface SVGLangSpaceProps {
    xmllang?: string;
    xmlspace?: string;
}

export interface SVGCircleElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGClipPathElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGComponentTransferFunctionElementProps extends SVGElementProps {
}

export interface SVGDefsElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGDescElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGElementProps extends ElementProps {
    onclick?: (this: this, ev: MouseEvent) => any;
    ondblclick?: (this: this, ev: MouseEvent) => any;
    onfocusin?: (this: this, ev: FocusEvent) => any;
    onfocusout?: (this: this, ev: FocusEvent) => any;
    onload?: (this: this, ev: Event) => any;
    onmousedown?: (this: this, ev: MouseEvent) => any;
    onmousemove?: (this: this, ev: MouseEvent) => any;
    onmouseout?: (this: this, ev: MouseEvent) => any;
    onmouseover?: (this: this, ev: MouseEvent) => any;
    onmouseup?: (this: this, ev: MouseEvent) => any;
    xmlbase?: string;
}

export interface SVGEllipseElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGFEBlendElementProps extends SVGElementProps {
}

export interface SVGFEColorMatrixElementProps extends SVGElementProps {
}

export interface SVGFEComponentTransferElementProps extends SVGElementProps {
}

export interface SVGFECompositeElementProps extends SVGElementProps {
}

export interface SVGFEConvolveMatrixElementProps extends SVGElementProps {
}

export interface SVGFEDiffuseLightingElementProps extends SVGElementProps {
}

export interface SVGFEDisplacementMapElementProps extends SVGElementProps {
}

export interface SVGFEDistantLightElementProps extends SVGElementProps {
}

export interface SVGFEFloodElementProps extends SVGElementProps {
}

export interface SVGFEFuncAElementProps extends SVGComponentTransferFunctionElementProps {
}

export interface SVGFEFuncBElementProps extends SVGComponentTransferFunctionElementProps {
}

export interface SVGFEFuncGElementProps extends SVGComponentTransferFunctionElementProps {
}

export interface SVGFEFuncRElementProps extends SVGComponentTransferFunctionElementProps {
}

export interface SVGFEGaussianBlurElementProps extends SVGElementProps {
}

export interface SVGFEImageElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGFEMergeElementProps extends SVGElementProps {
}

export interface SVGFEMergeNodeElementProps extends SVGElementProps {
}

export interface SVGFEMorphologyElementProps extends SVGElementProps {
}

export interface SVGFEOffsetElementProps extends SVGElementProps {
}

export interface SVGFEPointLightElementProps extends SVGElementProps {
}

export interface SVGFESpecularLightingElementProps extends SVGElementProps {
}

export interface SVGFESpotLightElementProps extends SVGElementProps {
}

export interface SVGFETileElementProps extends SVGElementProps {
}

export interface SVGFETurbulenceElementProps extends SVGElementProps {
}

export interface SVGFilterElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGForeignObjectElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGGElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGGradientElementProps extends SVGElementProps {
}

export interface SVGImageElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGLineElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGLinearGradientElementProps extends SVGGradientElementProps {
}

export interface SVGMarkerElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGMaskElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGMetadataElementProps extends SVGElementProps {
}

export interface SVGPathElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGPatternElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGPolygonElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGPolylineElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGRadialGradientElementProps extends SVGGradientElementProps {
}

export interface SVGRectElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGSVGElementProps extends SVGElementProps, SVGLangSpaceProps {
    contentScriptType?: string;
    contentStyleType?: string;
    currentScale?: number;
    onabort?: (this: this, ev: Event) => any;
    onerror?: (this: this, ev: Event) => any;
    onresize?: (this: this, ev: UIEvent) => any;
    onscroll?: (this: this, ev: UIEvent) => any;
    onunload?: (this: this, ev: Event) => any;
    onzoom?: (this: this, ev: SVGZoomEvent) => any;
}

export interface SVGScriptElementProps extends SVGElementProps {
    type?: string;
}

export interface SVGStopElementProps extends SVGElementProps {
}

export interface SVGStyleElementProps extends SVGElementProps, SVGLangSpaceProps {
    disabled?: boolean;
    media?: string;
    title?: string;
    type?: string;
}

export interface SVGSwitchElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGSymbolElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGTSpanElementProps extends SVGTextPositioningElementProps {
}

export interface SVGTextContentElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGTextElementProps extends SVGTextPositioningElementProps {
}

export interface SVGTextPathElementProps extends SVGTextContentElementProps {
}

export interface SVGTextPositioningElementProps extends SVGTextContentElementProps {
}

export interface SVGTitleElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export interface SVGViewElementProps extends SVGElementProps {
}

export interface SVGUseElementProps extends SVGElementProps, SVGLangSpaceProps {
}

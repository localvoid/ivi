/* tslint:disable:max-line-length no-empty-interface */

export declare interface CSSStyleProps {
  /**
   * "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch"
   */
  "align-content"?: string | null;
  /**
   * "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
   */
  "align-items"?: string | null;
  /**
   * "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
   */
  "align-self"?: string | null;
  "alignment-baseline"?: string | null;
  "animation"?: string | null;
  "animation-delay"?: string | null;
  /**
   * "normal" | "reverse" | "alternate" | "alternate-reverse"
   */
  "animation-direction"?: string | null;
  "animation-duration"?: string | null;
  /**
   * "none" | "forwards" | "backwards" | "both"
   */
  "animation-fill-mode"?: string | null;
  "animation-iteration-count"?: string | number | null;
  "animation-name"?: string | null;
  /**
   * "running" | "paused"
   */
  "animation-play-state"?: string | null;
  "animation-timing-function"?: string | null;
  /**
   * "visible" | "hidden"
   */
  "backface-visibility"?: string | null;
  "background"?: string | null;
  "background-attachment"?: string | null;
  /**
   * "border-box" | "padding-box" | "content-box"
   */
  "background-clip"?: string | null;
  "background-color"?: string | null;
  "background-image"?: string | null;
  /**
   * "border-box" | "padding-box" | "content-box"
   */
  "background-origin"?: string | null;
  "background-position"?: string | null;
  "background-position-x"?: string | null;
  "background-position-y"?: string | null;
  "background-repeat"?: string | null;
  "background-size"?: string | null;
  "baseline-shift"?: string | null;
  "border"?: number | string | null;
  "border-bottom"?: number | string | null;
  "border-bottom-color"?: string | null;
  "border-bottom-left-radius"?: number | string | null;
  "border-bottom-right-radius"?: number | string | null;
  "border-bottom-style"?: string | null;
  "border-bottom-width"?: number | string | null;
  /**
   * "collapse" | "separate"
   */
  "border-collapse"?: string | null;
  "border-color"?: string | null;
  "border-image"?: string | null;
  "border-image-outset"?: string | null;
  "border-image-repeat"?: string | null;
  "border-image-slice"?: string | null;
  "border-image-source"?: string | null;
  "border-image-width"?: number | string | null;
  "border-left"?: number | string | null;
  "border-left-color"?: string | null;
  "border-left-style"?: string | null;
  "border-left-width"?: number | string | null;
  "border-radius"?: number | string | null;
  "border-right"?: number | string | null;
  "border-right-color"?: number | string | null;
  "border-right-style"?: number | string | null;
  "border-right-width"?: number | string | null;
  "border-spacing"?: number | string | null;
  "border-style"?: string | null;
  "border-top"?: number | string | null;
  "border-top-color"?: string | null;
  "border-top-left-radius"?: number | string | null;
  "border-top-right-radius"?: number | string | null;
  "border-top-style"?: string | null;
  "border-top-width"?: number | string | null;
  "border-width"?: number | string | null;
  "bottom"?: string | null;
  /**
   * "slice" | "clone"
   */
  "box-decoration-break"?: string | null;
  "box-shadow"?: string | null;
  /**
   * "content-box" | "border-box"
   */
  "box-sizing"?: string | null;
  "break-after"?: string | null;
  "break-before"?: string | null;
  "break-inside"?: string | null;
  "caption-side"?: string | null;
  /**
   * "none" | "left" | "right" | "both" | "inline-start" | "inline-end"
   */
  "clear"?: string | null;
  "clip"?: string | null;
  "clip-path"?: string | null;
  "clip-rule"?: string | null;
  "color"?: string | null;
  "color-interpolation-filters"?: string | null;
  "column-count"?: number | string | null;
  "column-fill"?: string | null;
  "column-gap"?: any;
  "column-rule"?: string | null;
  "column-rule-color"?: any;
  "column-rule-style"?: string | null;
  "column-rule-width"?: number | string | null;
  "column-span"?: string | null;
  "column-width"?: number | string | null;
  "columns"?: number | string | null;
  "content"?: string | null;
  "counter-increment"?: string | null;
  "counter-reset"?: string | null;
  "cursor"?: string | null;
  /**
   * "ltr" | "rtl"
   */
  "direction"?: string | null;
  /**
   * "none" | "inline" | "block" | "list-item" | "inline-list-item" | "inline-block" | "inline-table" |
   * "table" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" |
   * "table-row" | "table-row-group" | "flex" | "inline-flex" | "grid" | "inline-grid" | "run-in" | "ruby" |
   * "ruby-base" | "ruby-text" | "ruby-base-container" | "ruby-text-container" | "contents"
   */
  "display"?: string | null;
  "dominant-baseline"?: string | null;
  "empty-cells"?: string | null;
  "enable-background"?: string | null;
  "fill"?: string | null;
  "fill-opacity"?: string | null;
  "fill-rule"?: string | null;
  "filter"?: string | null;
  "flex"?: string | null;
  "flex-basis"?: string | null;
  /**
   * "row" | "row-reverse" | "column" | "column-reverse"
   */
  "flex-direction"?: string | null;
  "flex-flow"?: string | null;
  "flex-grow"?: number | string | null;
  "flex-shrink"?: number | string | null;
  /**
   * "nowrap" | "wrap" | "wrap-reverse"
   */
  "flex-wrap"?: string | null;
  /**
   * "left" | "right" | "none" | "inline-start" | "inline-end"
   */
  "float"?: string | null;
  "flood-color"?: string | null;
  "flood-opacity"?: number | string | null;
  "font"?: string | null;
  "font-family"?: string | null;
  "font-feature-settings"?: string | null;
  "font-size"?: number | string | null;
  "font-size-adjust"?: string | null;
  /**
   * "normal" | "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" |
   * "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded"
   */
  "font-stretch"?: string | null;
  "font-style"?: string | null;
  "font-variant"?: string | null;
  "font-weight"?: number | string | null;
  "glyph-orientation-horizontal"?: string | null;
  "glyph-orientation-vertical"?: string | null;
  "height"?: number | string | null;
  /**
   * "auto" | "normal" | "active" | "inactive" | "disabled"
   */
  "ime-mode"?: string | null;
  /**
   * "auto" | "isolate"
   */
  "isolation"?: string | null;
  /**
   * "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
   */
  "justify-content"?: string | null;
  "kerning"?: string | null;
  "left"?: number | string | null;
  "letter-spacing"?: number | string | null;
  "lighting-color"?: string | null;
  /**
   * "auto" | "loose" | "normal" | "strict"
   */
  "line-break"?: string | null;
  "line-geight"?: number | string | null;
  "list-style"?: string | null;
  "list-style-image"?: string | null;
  "list-style-position"?: string | null;
  "list-style-type"?: string | null;
  "margin"?: number | string | null;
  "margin-bottom"?: number | string | null;
  "margin-left"?: number | string | null;
  "margin-right"?: number | string | null;
  "margin-top"?: number | string | null;
  "marker"?: string | null;
  "marker-end"?: string | null;
  "marker-mid"?: string | null;
  "marker-start"?: string | null;
  "mask"?: string | null;
  "max-height"?: number | string | null;
  "max-width"?: number | string | null;
  "min-height"?: number | string | null;
  "min-width"?: number | string | null;
  "-ms-content-zoom-chaining"?: string | null;
  "-ms-content-zoom-limit"?: string | null;
  "-ms-content-zoom-limit-max"?: any;
  "-ms-content-zoom-limit-min"?: any;
  "-ms-content-zoom-snap"?: string | null;
  "-ms-content-zoom-snap-points"?: string | null;
  "-ms-content-zoom-snap-type"?: string | null;
  "-ms-content-zooming"?: string | null;
  "-ms-flow-from"?: string | null;
  "-ms-flow-into"?: string | null;
  "-ms-font-feature-settings"?: string | null;
  "-ms-grid-column"?: any;
  "-ms-grid-column-align"?: string | null;
  "-ms-grid-column-span"?: any;
  "-ms-grid-columns"?: string | null;
  "-ms-grid-row"?: any;
  "-ms-grid-row-align"?: string | null;
  "-ms-grid-row-span"?: any;
  "-ms-grid-rows"?: string | null;
  "-ms-high-contrast-adjust"?: string | null;
  "-ms-hyphenate-limit-chars"?: string | null;
  "-ms-hyphenate-limit-lines"?: any;
  "-ms-hyphenate-limit-zone"?: any;
  "-ms-hyphens"?: string | null;
  "-ms-ime-align"?: string | null;
  "-ms-overflow-style"?: string | null;
  "-ms-scroll-chaining"?: string | null;
  "-ms-scroll-limit"?: string | null;
  "-ms-scroll-limit-x-max"?: any;
  "-ms-scroll-limit-x-min"?: any;
  "-ms-scroll-limit-y-max"?: any;
  "-ms-scroll-limit-y-min"?: any;
  "-ms-scroll-rails"?: string | null;
  "-ms-scroll-snap-points-x"?: string | null;
  "-ms-scroll-snap-points-y"?: string | null;
  "-ms-scroll-snap-type"?: string | null;
  "-ms-scroll-snap-x"?: string | null;
  "-ms-scroll-snap-y"?: string | null;
  "-ms-scroll-translation"?: string | null;
  "-ms-text-combine-horizontal"?: string | null;
  "-ms-text-size-adjust"?: any;
  "-ms-touch-action"?: string | null;
  "-ms-touch-select"?: string | null;
  /**
   * "none" | "auto" | "text" | "all"
   */
  "-ms-user-select"?: string | null;
  "-ms-wrap-flow"?: string;
  "-ms-wrap-margin"?: any;
  "-ms-wrap-through"?: string;
  /**
   * "fill" | "contain" | "cover" | "none" | "scale-down"
   */
  "object-fit"?: string | null;
  "opacity"?: number | string | null;
  "order"?: number | string | null;
  /**
   * "auto" | "portrait" | "landscape"
   */
  "orientation"?: string | null;
  "orphans"?: string | null;
  "outline"?: string | null;
  "outline-color"?: string | null;
  "outline-style"?: string | null;
  "outline-width"?: number | string | null;
  /**
   * "visible" | "hidden" | "scroll" | "auto"
   */
  "overflow"?: string | null;
  /**
   * "normal" | "break-word"
   */
  "overflow-wrap"?: string | null;
  /**
   * "visible" | "hidden" | "scroll" | "auto"
   */
  "overflow-x"?: string | null;
  /**
   * "visible" | "hidden" | "scroll" | "auto"
   */
  "overflow-y"?: string | null;
  "padding"?: number | string | null;
  "padding-bottom"?: number | string | null;
  "padding-left"?: number | string | null;
  "padding-right"?: number | string | null;
  "padding-top"?: number | string | null;
  "page-break-after"?: string | null;
  "page-break-before"?: string | null;
  "page-break-inside"?: string | null;
  "perspective"?: number | string | null;
  "perspective-origin"?: string | null;
  /**
   * "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" |
   * "fill" | "stroke" | "all" | "inherit"
   */
  "pointer-events"?: string | null;
  /**
   * "static" | "relative" | "absolute" | "sticky" | "fixed"
   */
  "position"?: string | null;
  "quotes"?: string | null;
  /**
   * "none" | "both" | "horizontal" | "vertical"
   */
  "resize"?: string | null;
  "right"?: number | string | null;
  "ruby-align"?: string | null;
  "ruby-overhang"?: string | null;
  "ruby-position"?: string | null;
  "stop-color"?: string | null;
  "stop-opacity"?: number | string | null;
  "stroke"?: string | null;
  "stroke-dasharray"?: string | null;
  "stroke-dashoffset"?: number | string | null;
  "stroke-linecap"?: string | null;
  "stroke-linejoin"?: string | null;
  "stroke-miterlimit"?: string | null;
  "stroke-opacity"?: number | string | null;
  "stroke-width"?: number | string | null;
  "tab-size"?: number | string | null;
  /**
   * "auto" | "fixed"
   */
  "table-layout"?: string | null;
  /**
   * "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
   */
  "text-align"?: string | null;
  /**
   * "auto" | "start" | "end" | "left" | "right" | "center" | "justify"
   */
  "text-align-last"?: string | null;
  "text-anchor"?: string | null;
  "text-decoration"?: string | null;
  /**
   * "solid" | "double" | "dotted" | "dashed" | "wavy"
   */
  "text-decoration-style"?: string | null;
  "text-indent"?: number | string | null;
  "text-justify"?: string | null;
  "text-kashida"?: string | null;
  "text-kashida-space"?: string | null;
  /**
   * "mixed" | "upright" | "sideways"
   */
  "text-orientation"?: string | null;
  "text-overflow"?: string | null;
  "text-shadow"?: string | null;
  "text-transform"?: string | null;
  "text-underline-position"?: string | null;
  "top"?: number | string | null;
  "touch-action"?: string | null;
  "transform"?: string | null;
  /**
   * "mixed" | "upright" | "sideways"
   */
  "transform-box"?: string | null;
  "transform-origin"?: string | null;
  "transform-style"?: string | null;
  "transition"?: string | null;
  "transition-delay"?: number | string | null;
  "transition-duration"?: number | string | null;
  "transition-property"?: string | null;
  "transition-timing-function"?: string | null;
  "unicode-bidi"?: string | null;
  /**
   * "none" | "auto" | "text" | "all"
   */
  "user-select"?: string | null;
  "vertical-align"?: string | null;
  /**
   * "visible" | "hidden" | "collapse"
   */
  "visibility"?: string | null;
  "-webkit-align-content"?: string | null;
  "-webkit-align-items"?: string | null;
  "-webkit-align-self"?: string | null;
  "-webkit-animation"?: string | null;
  "-webkit-animation-delay"?: string | null;
  "-webkit-animation-direction"?: string | null;
  "-webkit-animation-duration"?: string | null;
  "-webkit-animation-fill-mode"?: string | null;
  "-webkit-animation-iteration-count"?: string | null;
  "-webkit-animation-name"?: string | null;
  "-webkit-animation-play-state"?: string | null;
  "-webkit-animation-timing-function"?: string | null;
  "-webkit-appearance"?: string | null;
  "-webkit-backface-visibility"?: string | null;
  "-webkit-background-clip"?: string | null;
  "-webkit-background-origin"?: string | null;
  "-webkit-background-size"?: string | null;
  "-webkit-border-bottom-left-radius"?: string | null;
  "-webkit-border-bottom-right-radius"?: string | null;
  "-webkit-border-image"?: string | null;
  "-webkit-border-radius"?: string | null;
  "-webkit-border-top-left-radius"?: string | null;
  "-webkit-border-top-right-radius"?: string | null;
  "-webkit-box-align"?: string | null;
  "-webkit-box-direction"?: string | null;
  "-webkit-box-flex"?: string | null;
  "-webkit-box-ordinal-group"?: string | null;
  "-webkit-box-orient"?: string | null;
  "-webkit-box-pack"?: string | null;
  "-webkit-box-sizing"?: string | null;
  "-webkit-column-break-after"?: string | null;
  "-webkit-column-break-before"?: string | null;
  "-webkit-column-break-inside"?: string | null;
  "-webkit-column-count"?: any;
  "-webkit-column-gap"?: any;
  "-webkit-column-rule"?: string | null;
  "-webkit-column-rule-color"?: any;
  "-webkit-column-rule-style"?: string | null;
  "-webkit-column-rule-width"?: any;
  "-webkit-column-span"?: string | null;
  "-webkit-column-width"?: any;
  "-webkit-columns"?: string | null;
  "-webkit-filter"?: string | null;
  "-webkit-flex"?: string | null;
  "-webkit-flex-basis"?: string | null;
  "-webkit-flex-direction"?: string | null;
  "-webkit-flex-flow"?: string | null;
  "-webkit-flex-grow"?: string | null;
  "-webkit-flex-shrink"?: string | null;
  "-webkit-flex-wrap"?: string | null;
  "-webkit-justify-content"?: string | null;
  "-webkit-order"?: string | null;
  "-webkit-perspective"?: string | null;
  "-webkit-perspective-origin"?: string | null;
  "-webkit-tap-highlight-color"?: string | null;
  "-webkit-text-fill-color"?: string | null;
  "-webkit-textSize-adjust"?: any;
  "-webkit-transform"?: string | null;
  "-webkit-transform-origin"?: string | null;
  "-webkit-transform-style"?: string | null;
  "-webkit-transition"?: string | null;
  "-webkit-transition-delay"?: string | null;
  "-webkit-transition-duration"?: string | null;
  "-webkit-transition-property"?: string | null;
  "-webkit-transition-timing-function"?: string | null;
  "-webkit-user-modify"?: string | null;
  /**
   * "none" | "auto" | "text" | "all"
   */
  "-webkit-user-select"?: string | null;
  "-webkit-writing-mode"?: string | null;
  /**
   * "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line"
   */
  "white-space"?: string | null;
  "widows"?: number | string | null;
  "width"?: number | string | null;
  /**
   * "normal" | "break-all" | "keep-all"
   */
  "word-break"?: string | null;
  "word-spacing"?: number | string | null;
  /**
   * "normal" | "break-word"
   */
  "word-wrap"?: string | null;
  "writing-mode"?: string | null;
  "z-index"?: number | string | null;
  "zoom"?: string | null;
}

export declare interface NodeProps {
  [key: string]: any;
}

export declare interface AriaAttrs {
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

export declare interface ElementProps extends NodeProps {
  id?: string;
  msContentZoomFactor?: number;
  scrollLeft?: number;
  scrollTop?: number;
}

export declare interface HTMLElementProps extends ElementProps {
  accessKey?: string;
  contentEditable?: string;
  dir?: string;
  draggable?: boolean;
  hidden?: boolean;
  hideFocus?: boolean;
  lang?: string;
  spellcheck?: boolean;
  tabIndex?: number;
  title?: string;
}

export declare interface HTMLAnchorElementProps extends HTMLElementProps {
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

export declare interface HTMLAreaElementProps extends HTMLElementProps {
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

export declare interface HTMLMediaElementProps extends HTMLElementProps {
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

export declare interface HTMLAudioElementProps extends HTMLMediaElementProps {
}

export declare interface HTMLBaseElementProps extends HTMLElementProps {
  /**
   * Gets or sets the baseline URL on which relative links are based.
   */
  href?: string;
  /**
   * Sets or retrieves the window or frame at which to target content.
   */
  target?: string;
}

export declare interface HTMLBaseFontElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves the current typeface family.
   */
  face?: string;
  /**
   * Sets or retrieves the font size of the object.
   */
  size?: number;
}

export declare interface HTMLQuoteElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves reference information about the object.
   */
  cite?: string;
}

export declare interface HTMLBodyElementProps extends HTMLElementProps {
  aLink?: any;
  background?: string;
  bgColor?: any;
  bgProperties?: string;
  link?: any;
  noWrap?: boolean;
  text?: any;
  vLink?: any;
}

export declare interface HTMLBRElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves the side on which floating objects are not to be positioned when any IHTMLBlockElement is
   * inserted into the document.
   */
  clear?: string;
}

export declare interface HTMLButtonElementProps extends HTMLElementProps {
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

export declare interface HTMLCanvasElementProps extends HTMLElementProps {
  /**
   * Gets or sets the height of a canvas element on a document.
   */
  height?: number;
  /**
   * Gets or sets the width of a canvas element on a document.
   */
  width?: number;
}

export declare interface HTMLTableCaptionElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves the alignment of the caption or legend.
   */
  align?: string;
  /**
   * Sets or retrieves whether the caption appears at the top or bottom of the table.
   */
  vAlign?: string;
}

export declare interface HTMLTableAlignmentProps {
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

export declare interface HTMLTableColElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
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

export declare interface HTMLDataListElementProps extends HTMLElementProps {
}

export declare interface HTMLModElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves reference information about the object.
   */
  cite?: string;
  /**
   * Sets or retrieves the date and time of a modification to the object.
   */
  dateTime?: string;
}

export declare interface HTMLDirectoryElementProps extends HTMLElementProps {
  compact?: boolean;
}

export declare interface HTMLDivElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves how the object is aligned with adjacent text.
   */
  align?: string;
  /**
   * Sets or retrieves whether the browser automatically performs wordwrap.
   */
  noWrap?: boolean;
}

export declare interface HTMLDListElementProps extends HTMLElementProps {
  compact?: boolean;
}

export declare interface HTMLEmbedElementProps extends HTMLElementProps {
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

export declare interface HTMLFieldSetElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves how the object is aligned with adjacent text.
   */
  align?: string;
  disabled?: boolean;
}

export declare interface HTMLFontElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves the current typeface family.
   */
  face?: string;
}

export declare interface HTMLFormElementProps extends HTMLElementProps {
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

export declare interface HTMLFrameElementProps extends HTMLElementProps {
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

export declare interface HTMLFrameSetElementProps extends HTMLElementProps {
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
  /**
   * Sets or retrieves the frame heights of the object.
   */
  rows?: string;
}

export declare interface HTMLHeadingElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves a value that indicates the table alignment.
   */
  align?: string;
}

export declare interface HTMLHeadElementProps extends HTMLElementProps {
  profile?: string;
}

export declare interface HTMLHRElementProps extends HTMLElementProps {
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

export declare interface HTMLHtmlElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves the DTD version that governs the current document.
   */
  version?: string;
}

export declare interface HTMLIFrameElementProps extends HTMLElementProps {
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

export declare interface HTMLImageElementProps extends HTMLElementProps {
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

export declare interface HTMLInputElementProps extends HTMLElementProps {
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

export declare interface HTMLUnknownElementProps extends HTMLElementProps {
}

export declare interface HTMLLabelElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves the object to which the given label object is assigned.
   */
  htmlFor?: string;
}

export declare interface HTMLLegendElementProps extends HTMLElementProps {
  /**
   * Retrieves a reference to the form that the object is embedded in.
   */
  align?: string;
}

export declare interface HTMLLIElementProps extends HTMLElementProps {
  type?: string;
  /**
   * Sets or retrieves the value of a list item.
   */
  value?: number;
}

export declare interface HTMLLinkElementProps extends HTMLElementProps {
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
  integrity?: string;
}

export declare interface HTMLMapElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves the name of the object.
   */
  name?: string;
}

export declare interface HTMLMediaElementProps extends HTMLElementProps {
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

export declare interface HTMLMenuElementProps extends HTMLElementProps {
  compact?: boolean;
  type?: string;
}

export declare interface HTMLMetaElementProps extends HTMLElementProps {
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

export declare interface HTMLMeterElementProps extends HTMLElementProps {
  high?: number;
  low?: number;
  max?: number;
  min?: number;
  optimum?: number;
  value?: number;
}

export declare interface HTMLModElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves reference information about the object.
   */
  cite?: string;
  /**
   * Sets or retrieves the date and time of a modification to the object.
   */
  dateTime?: string;
}

export declare interface HTMLOListElementProps extends HTMLElementProps {
  compact?: boolean;
  /**
   * The starting number.
   */
  start?: number;
  type?: string;
}

export declare interface HTMLObjectElementProps extends HTMLElementProps {
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

export declare interface HTMLOptGroupElementProps extends HTMLElementProps {
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

export declare interface HTMLOptionElementProps extends HTMLElementProps {
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

export declare interface HTMLParagraphElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves how the object is aligned with adjacent text.
   */
  align?: string;
  clear?: string;
}

export declare interface HTMLParamElementProps extends HTMLElementProps {
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

export declare interface HTMLPictureElementProps extends HTMLElementProps {
}

export declare interface HTMLPreElementProps extends HTMLElementProps {
  /**
   * Sets or gets a value that you can use to implement your own width functionality for the object.
   */
  width?: number;
}

export declare interface HTMLProgressElementProps extends HTMLElementProps {
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

export declare interface HTMLQuoteElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves reference information about the object.
   */
  cite?: string;
}

export declare interface HTMLScriptElementProps extends HTMLElementProps {
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

export declare interface HTMLSelectElementProps extends HTMLElementProps {
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

export declare interface HTMLSourceElementProps extends HTMLElementProps {
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

export declare interface HTMLSpanElementProps extends HTMLElementProps {
}

export declare interface HTMLStyleElementProps extends HTMLElementProps {
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

export declare interface HTMLTableCaptionElementProps extends HTMLElementProps {
  /**
   * Sets or retrieves the alignment of the caption or legend.
   */
  align?: string;
  /**
   * Sets or retrieves whether the caption appears at the top or bottom of the table.
   */
  vAlign?: string;
}

export declare interface HTMLTableAlignmentProps {
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

export declare interface HTMLTableCellElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
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

export declare interface HTMLTableColElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
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

export declare interface HTMLTableDataCellElementProps extends HTMLTableCellElementProps {
}

export declare interface HTMLTableElementProps extends HTMLElementProps {
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
   * Sets or retrieves which dividing lines (inner borders) are displayed.
   */
  rules?: string;
  /**
   * Sets or retrieves a description and/or structure of the object.
   */
  summary?: string;
  /**
   * Sets or retrieves the width of the object.
   */
  width?: string;
}

export declare interface HTMLTableHeaderCellElementProps extends HTMLTableCellElementProps {
  /**
   * Sets or retrieves the group of cells in a table to which the object's information applies.
   */
  scope?: string;
}

export declare interface HTMLTableRowElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
  /**
   * Sets or retrieves how the object is aligned with adjacent text.
   */
  align?: string;
}

export declare interface HTMLTableSectionElementProps extends HTMLElementProps, HTMLTableAlignmentProps {
  /**
   * Sets or retrieves a value that indicates the table alignment.
   */
  align?: string;
}

export declare interface HTMLTemplateElementProps extends HTMLElementProps {
}

export declare interface HTMLTextAreaElementProps extends HTMLElementProps {
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

export declare interface HTMLTitleElementProps extends HTMLElementProps {
  /**
   * Retrieves or sets the text of the object as a string.
   */
  text?: string;
}

export declare interface HTMLTrackElementProps extends HTMLElementProps {
  default?: boolean;
  kind?: string;
  label?: string;
  src?: string;
  srclang?: string;
}

export declare interface HTMLUListElementProps extends HTMLElementProps {
  compact?: boolean;
  type?: string;
}

export declare interface HTMLVideoElementProps extends HTMLMediaElementProps {
  /**
   * Gets or sets the height of the video element.
   */
  height?: number;
  msHorizontalMirror?: boolean;
  msStereo3DPackingMode?: string;
  msStereo3DRenderMode?: string;
  msZoom?: boolean;
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

export declare interface MSHTMLWebViewElementProps extends HTMLElementProps {
  height?: number;
  src?: string;
  width?: number;
}

export declare interface SVGLangSpaceProps {
  xmllang?: string;
  xmlspace?: string;
}

export declare interface SVGCircleElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGClipPathElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGComponentTransferFunctionElementProps extends SVGElementProps {
}

export declare interface SVGDefsElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGDescElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGElementProps extends ElementProps {
  xmlbase?: string;
}

export declare interface SVGEllipseElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGFEBlendElementProps extends SVGElementProps {
}

export declare interface SVGFEColorMatrixElementProps extends SVGElementProps {
}

export declare interface SVGFEComponentTransferElementProps extends SVGElementProps {
}

export declare interface SVGFECompositeElementProps extends SVGElementProps {
}

export declare interface SVGFEConvolveMatrixElementProps extends SVGElementProps {
}

export declare interface SVGFEDiffuseLightingElementProps extends SVGElementProps {
}

export declare interface SVGFEDisplacementMapElementProps extends SVGElementProps {
}

export declare interface SVGFEDistantLightElementProps extends SVGElementProps {
}

export declare interface SVGFEFloodElementProps extends SVGElementProps {
}

export declare interface SVGFEFuncAElementProps extends SVGComponentTransferFunctionElementProps {
}

export declare interface SVGFEFuncBElementProps extends SVGComponentTransferFunctionElementProps {
}

export declare interface SVGFEFuncGElementProps extends SVGComponentTransferFunctionElementProps {
}

export declare interface SVGFEFuncRElementProps extends SVGComponentTransferFunctionElementProps {
}

export declare interface SVGFEGaussianBlurElementProps extends SVGElementProps {
}

export declare interface SVGFEImageElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGFEMergeElementProps extends SVGElementProps {
}

export declare interface SVGFEMergeNodeElementProps extends SVGElementProps {
}

export declare interface SVGFEMorphologyElementProps extends SVGElementProps {
}

export declare interface SVGFEOffsetElementProps extends SVGElementProps {
}

export declare interface SVGFEPointLightElementProps extends SVGElementProps {
}

export declare interface SVGFESpecularLightingElementProps extends SVGElementProps {
}

export declare interface SVGFESpotLightElementProps extends SVGElementProps {
}

export declare interface SVGFETileElementProps extends SVGElementProps {
}

export declare interface SVGFETurbulenceElementProps extends SVGElementProps {
}

export declare interface SVGFilterElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGForeignObjectElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGGElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGGradientElementProps extends SVGElementProps {
}

export declare interface SVGImageElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGLineElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGLinearGradientElementProps extends SVGGradientElementProps {
}

export declare interface SVGMarkerElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGMaskElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGMetadataElementProps extends SVGElementProps {
}

export declare interface SVGPathElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGPatternElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGPolygonElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGPolylineElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGRadialGradientElementProps extends SVGGradientElementProps {
}

export declare interface SVGRectElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGSVGElementProps extends SVGElementProps, SVGLangSpaceProps {
  contentScriptType?: string;
  contentStyleType?: string;
  currentScale?: number;
}

export declare interface SVGScriptElementProps extends SVGElementProps {
  type?: string;
}

export declare interface SVGStopElementProps extends SVGElementProps {
}

export declare interface SVGStyleElementProps extends SVGElementProps, SVGLangSpaceProps {
  disabled?: boolean;
  media?: string;
  title?: string;
  type?: string;
}

export declare interface SVGSwitchElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGSymbolElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGTSpanElementProps extends SVGTextPositioningElementProps {
}

export declare interface SVGTextContentElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGTextElementProps extends SVGTextPositioningElementProps {
}

export declare interface SVGTextPathElementProps extends SVGTextContentElementProps {
}

export declare interface SVGTextPositioningElementProps extends SVGTextContentElementProps {
}

export declare interface SVGTitleElementProps extends SVGElementProps, SVGLangSpaceProps {
}

export declare interface SVGViewElementProps extends SVGElementProps {
}

export declare interface SVGUseElementProps extends SVGElementProps, SVGLangSpaceProps {
}

/* tslint:disable:max-line-length no-empty-interface */

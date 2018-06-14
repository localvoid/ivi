export declare interface CSSStyleProps {
  /**
   * "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch"
   */
  "align-content"?: string;
  /**
   * "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
   */
  "align-items"?: string;
  /**
   * "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
   */
  "align-self"?: string;
  "alignment-baseline"?: string;
  "animation"?: string;
  "animation-delay"?: string;
  /**
   * "normal" | "reverse" | "alternate" | "alternate-reverse"
   */
  "animation-direction"?: string;
  "animation-duration"?: string;
  /**
   * "none" | "forwards" | "backwards" | "both"
   */
  "animation-fill-mode"?: string;
  "animation-iteration-count"?: string | number;
  "animation-name"?: string;
  /**
   * "running" | "paused"
   */
  "animation-play-state"?: string;
  "animation-timing-function"?: string;
  /**
   * "visible" | "hidden"
   */
  "backface-visibility"?: string;
  "background"?: string;
  "background-attachment"?: string;
  /**
   * "border-box" | "padding-box" | "content-box"
   */
  "background-clip"?: string;
  "background-color"?: string;
  "background-image"?: string;
  /**
   * "border-box" | "padding-box" | "content-box"
   */
  "background-origin"?: string;
  "background-position"?: string;
  "background-position-x"?: string;
  "background-position-y"?: string;
  "background-repeat"?: string;
  "background-size"?: string;
  "baseline-shift"?: string;
  "border"?: number | string;
  "border-bottom"?: number | string;
  "border-bottom-color"?: string;
  "border-bottom-left-radius"?: number | string;
  "border-bottom-right-radius"?: number | string;
  "border-bottom-style"?: string;
  "border-bottom-width"?: number | string;
  /**
   * "collapse" | "separate"
   */
  "border-collapse"?: string;
  "border-color"?: string;
  "border-image"?: string;
  "border-image-outset"?: string;
  "border-image-repeat"?: string;
  "border-image-slice"?: string;
  "border-image-source"?: string;
  "border-image-width"?: number | string;
  "border-left"?: number | string;
  "border-left-color"?: string;
  "border-left-style"?: string;
  "border-left-width"?: number | string;
  "border-radius"?: number | string;
  "border-right"?: number | string;
  "border-right-color"?: number | string;
  "border-right-style"?: number | string;
  "border-right-width"?: number | string;
  "border-spacing"?: number | string;
  "border-style"?: string;
  "border-top"?: number | string;
  "border-top-color"?: string;
  "border-top-left-radius"?: number | string;
  "border-top-right-radius"?: number | string;
  "border-top-style"?: string;
  "border-top-width"?: number | string;
  "border-width"?: number | string;
  "bottom"?: number | string;
  /**
   * "slice" | "clone"
   */
  "box-decoration-break"?: string;
  "box-shadow"?: string;
  /**
   * "content-box" | "border-box"
   */
  "box-sizing"?: string;
  "break-after"?: string;
  "break-before"?: string;
  "break-inside"?: string;
  "caption-side"?: string;
  /**
   * "none" | "left" | "right" | "both" | "inline-start" | "inline-end"
   */
  "clear"?: string;
  "clip"?: string;
  "clip-path"?: string;
  "clip-rule"?: string;
  "color"?: string;
  "color-interpolation-filters"?: string;
  "column-count"?: number | string;
  "column-fill"?: string;
  "column-gap"?: any;
  "column-rule"?: string;
  "column-rule-color"?: any;
  "column-rule-style"?: string;
  "column-rule-width"?: number | string;
  "column-span"?: string;
  "column-width"?: number | string;
  "columns"?: number | string;
  "content"?: string;
  "counter-increment"?: string;
  "counter-reset"?: string;
  "cursor"?: string;
  /**
   * "ltr" | "rtl"
   */
  "direction"?: string;
  /**
   * "none" | "inline" | "block" | "list-item" | "inline-list-item" | "inline-block" | "inline-table" |
   * "table" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" |
   * "table-row" | "table-row-group" | "flex" | "inline-flex" | "grid" | "inline-grid" | "run-in" | "ruby" |
   * "ruby-base" | "ruby-text" | "ruby-base-container" | "ruby-text-container" | "contents"
   */
  "display"?: string;
  "dominant-baseline"?: string;
  "empty-cells"?: string;
  "enable-background"?: string;
  "fill"?: string;
  "fill-opacity"?: string;
  "fill-rule"?: string;
  "filter"?: string;
  "flex"?: string;
  "flex-basis"?: string;
  /**
   * "row" | "row-reverse" | "column" | "column-reverse"
   */
  "flex-direction"?: string;
  "flex-flow"?: string;
  "flex-grow"?: number | string;
  "flex-shrink"?: number | string;
  /**
   * "nowrap" | "wrap" | "wrap-reverse"
   */
  "flex-wrap"?: string;
  /**
   * "left" | "right" | "none" | "inline-start" | "inline-end"
   */
  "float"?: string;
  "flood-color"?: string;
  "flood-opacity"?: number | string;
  "font"?: string;
  "font-family"?: string;
  "font-feature-settings"?: string;
  "font-size"?: number | string;
  "font-size-adjust"?: string;
  /**
   * "normal" | "ultra-condensed" | "extra-condensed" | "condensed" | "semi-condensed" |
   * "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded"
   */
  "font-stretch"?: string;
  "font-style"?: string;
  "font-variant"?: string;
  "font-weight"?: number | string;
  "glyph-orientation-horizontal"?: string;
  "glyph-orientation-vertical"?: string;
  "height"?: number | string;
  /**
   * "auto" | "normal" | "active" | "inactive" | "disabled"
   */
  "ime-mode"?: string;
  /**
   * "auto" | "isolate"
   */
  "isolation"?: string;
  /**
   * "flex-start" | "flex-end" | "center" | "space-between" | "space-around"
   */
  "justify-content"?: string;
  "kerning"?: string;
  "left"?: number | string;
  "letter-spacing"?: number | string;
  "lighting-color"?: string;
  /**
   * "auto" | "loose" | "normal" | "strict"
   */
  "line-break"?: string;
  "line-geight"?: number | string;
  "list-style"?: string;
  "list-style-image"?: string;
  "list-style-position"?: string;
  "list-style-type"?: string;
  "margin"?: number | string;
  "margin-bottom"?: number | string;
  "margin-left"?: number | string;
  "margin-right"?: number | string;
  "margin-top"?: number | string;
  "marker"?: string;
  "marker-end"?: string;
  "marker-mid"?: string;
  "marker-start"?: string;
  "mask"?: string;
  "max-height"?: number | string;
  "max-width"?: number | string;
  "min-height"?: number | string;
  "min-width"?: number | string;
  "-ms-content-zoom-chaining"?: string;
  "-ms-content-zoom-limit"?: string;
  "-ms-content-zoom-limit-max"?: any;
  "-ms-content-zoom-limit-min"?: any;
  "-ms-content-zoom-snap"?: string;
  "-ms-content-zoom-snap-points"?: string;
  "-ms-content-zoom-snap-type"?: string;
  "-ms-content-zooming"?: string;
  "-ms-flow-from"?: string;
  "-ms-flow-into"?: string;
  "-ms-font-feature-settings"?: string;
  "-ms-grid-column"?: any;
  "-ms-grid-column-align"?: string;
  "-ms-grid-column-span"?: any;
  "-ms-grid-columns"?: string;
  "-ms-grid-row"?: any;
  "-ms-grid-row-align"?: string;
  "-ms-grid-row-span"?: any;
  "-ms-grid-rows"?: string;
  "-ms-high-contrast-adjust"?: string;
  "-ms-hyphenate-limit-chars"?: string;
  "-ms-hyphenate-limit-lines"?: any;
  "-ms-hyphenate-limit-zone"?: any;
  "-ms-hyphens"?: string;
  "-ms-ime-align"?: string;
  "-ms-overflow-style"?: string;
  "-ms-scroll-chaining"?: string;
  "-ms-scroll-limit"?: string;
  "-ms-scroll-limit-x-max"?: any;
  "-ms-scroll-limit-x-min"?: any;
  "-ms-scroll-limit-y-max"?: any;
  "-ms-scroll-limit-y-min"?: any;
  "-ms-scroll-rails"?: string;
  "-ms-scroll-snap-points-x"?: string;
  "-ms-scroll-snap-points-y"?: string;
  "-ms-scroll-snap-type"?: string;
  "-ms-scroll-snap-x"?: string;
  "-ms-scroll-snap-y"?: string;
  "-ms-scroll-translation"?: string;
  "-ms-text-combine-horizontal"?: string;
  "-ms-text-size-adjust"?: any;
  "-ms-touch-action"?: string;
  "-ms-touch-select"?: string;
  /**
   * "none" | "auto" | "text" | "all"
   */
  "-ms-user-select"?: string;
  "-ms-wrap-flow"?: string;
  "-ms-wrap-margin"?: any;
  "-ms-wrap-through"?: string;
  /**
   * "fill" | "contain" | "cover" | "none" | "scale-down"
   */
  "object-fit"?: string;
  "opacity"?: number | string;
  "order"?: number | string;
  /**
   * "auto" | "portrait" | "landscape"
   */
  "orientation"?: string;
  "orphans"?: string;
  "outline"?: string;
  "outline-color"?: string;
  "outline-style"?: string;
  "outline-width"?: number | string;
  /**
   * "visible" | "hidden" | "scroll" | "auto"
   */
  "overflow"?: string;
  /**
   * "normal" | "break-word"
   */
  "overflow-wrap"?: string;
  /**
   * "visible" | "hidden" | "scroll" | "auto"
   */
  "overflow-x"?: string;
  /**
   * "visible" | "hidden" | "scroll" | "auto"
   */
  "overflow-y"?: string;
  "padding"?: number | string;
  "padding-bottom"?: number | string;
  "padding-left"?: number | string;
  "padding-right"?: number | string;
  "padding-top"?: number | string;
  "page-break-after"?: string;
  "page-break-before"?: string;
  "page-break-inside"?: string;
  "perspective"?: number | string;
  "perspective-origin"?: string;
  /**
   * "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" |
   * "fill" | "stroke" | "all" | "inherit"
   */
  "pointer-events"?: string;
  /**
   * "static" | "relative" | "absolute" | "sticky" | "fixed"
   */
  "position"?: string;
  "quotes"?: string;
  /**
   * "none" | "both" | "horizontal" | "vertical"
   */
  "resize"?: string;
  "right"?: number | string;
  "ruby-align"?: string;
  "ruby-overhang"?: string;
  "ruby-position"?: string;
  "stop-color"?: string;
  "stop-opacity"?: number | string;
  "stroke"?: string;
  "stroke-dasharray"?: string;
  "stroke-dashoffset"?: number | string;
  "stroke-linecap"?: string;
  "stroke-linejoin"?: string;
  "stroke-miterlimit"?: string;
  "stroke-opacity"?: number | string;
  "stroke-width"?: number | string;
  "tab-size"?: number | string;
  /**
   * "auto" | "fixed"
   */
  "table-layout"?: string;
  /**
   * "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
   */
  "text-align"?: string;
  /**
   * "auto" | "start" | "end" | "left" | "right" | "center" | "justify"
   */
  "text-align-last"?: string;
  "text-anchor"?: string;
  "text-decoration"?: string;
  /**
   * "solid" | "double" | "dotted" | "dashed" | "wavy"
   */
  "text-decoration-style"?: string;
  "text-indent"?: number | string;
  "text-justify"?: string;
  "text-kashida"?: string;
  "text-kashida-space"?: string;
  /**
   * "mixed" | "upright" | "sideways"
   */
  "text-orientation"?: string;
  "text-overflow"?: string;
  "text-shadow"?: string;
  "text-transform"?: string;
  "text-underline-position"?: string;
  "top"?: number | string;
  "touch-action"?: string;
  "transform"?: string;
  /**
   * "mixed" | "upright" | "sideways"
   */
  "transform-box"?: string;
  "transform-origin"?: string;
  "transform-style"?: string;
  "transition"?: string;
  "transition-delay"?: number | string;
  "transition-duration"?: number | string;
  "transition-property"?: string;
  "transition-timing-function"?: string;
  "unicode-bidi"?: string;
  /**
   * "none" | "auto" | "text" | "all"
   */
  "user-select"?: string;
  "vertical-align"?: string;
  /**
   * "visible" | "hidden" | "collapse"
   */
  "visibility"?: string;
  "-webkit-align-content"?: string;
  "-webkit-align-items"?: string;
  "-webkit-align-self"?: string;
  "-webkit-animation"?: string;
  "-webkit-animation-delay"?: string;
  "-webkit-animation-direction"?: string;
  "-webkit-animation-duration"?: string;
  "-webkit-animation-fill-mode"?: string;
  "-webkit-animation-iteration-count"?: string;
  "-webkit-animation-name"?: string;
  "-webkit-animation-play-state"?: string;
  "-webkit-animation-timing-function"?: string;
  "-webkit-appearance"?: string;
  "-webkit-backface-visibility"?: string;
  "-webkit-background-clip"?: string;
  "-webkit-background-origin"?: string;
  "-webkit-background-size"?: string;
  "-webkit-border-bottom-left-radius"?: string;
  "-webkit-border-bottom-right-radius"?: string;
  "-webkit-border-image"?: string;
  "-webkit-border-radius"?: string;
  "-webkit-border-top-left-radius"?: string;
  "-webkit-border-top-right-radius"?: string;
  "-webkit-box-align"?: string;
  "-webkit-box-direction"?: string;
  "-webkit-box-flex"?: string;
  "-webkit-box-ordinal-group"?: string;
  "-webkit-box-orient"?: string;
  "-webkit-box-pack"?: string;
  "-webkit-box-sizing"?: string;
  "-webkit-column-break-after"?: string;
  "-webkit-column-break-before"?: string;
  "-webkit-column-break-inside"?: string;
  "-webkit-column-count"?: any;
  "-webkit-column-gap"?: any;
  "-webkit-column-rule"?: string;
  "-webkit-column-rule-color"?: any;
  "-webkit-column-rule-style"?: string;
  "-webkit-column-rule-width"?: any;
  "-webkit-column-span"?: string;
  "-webkit-column-width"?: any;
  "-webkit-columns"?: string;
  "-webkit-filter"?: string;
  "-webkit-flex"?: string;
  "-webkit-flex-basis"?: string;
  "-webkit-flex-direction"?: string;
  "-webkit-flex-flow"?: string;
  "-webkit-flex-grow"?: string;
  "-webkit-flex-shrink"?: string;
  "-webkit-flex-wrap"?: string;
  "-webkit-justify-content"?: string;
  "-webkit-order"?: string;
  "-webkit-perspective"?: string;
  "-webkit-perspective-origin"?: string;
  "-webkit-tap-highlight-color"?: string;
  "-webkit-text-fill-color"?: string;
  "-webkit-textSize-adjust"?: any;
  "-webkit-transform"?: string;
  "-webkit-transform-origin"?: string;
  "-webkit-transform-style"?: string;
  "-webkit-transition"?: string;
  "-webkit-transition-delay"?: string;
  "-webkit-transition-duration"?: string;
  "-webkit-transition-property"?: string;
  "-webkit-transition-timing-function"?: string;
  "-webkit-user-modify"?: string;
  /**
   * "none" | "auto" | "text" | "all"
   */
  "-webkit-user-select"?: string;
  "-webkit-writing-mode"?: string;
  /**
   * "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line"
   */
  "white-space"?: string;
  "widows"?: number | string;
  "width"?: number | string;
  /**
   * "normal" | "break-all" | "keep-all"
   */
  "word-break"?: string;
  "word-spacing"?: number | string;
  /**
   * "normal" | "break-word"
   */
  "word-wrap"?: string;
  "writing-mode"?: string;
  "z-index"?: number | string;
  "zoom"?: string;

  [key: string]: any;
}

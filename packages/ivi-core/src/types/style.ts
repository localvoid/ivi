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
  "bottom"?: number | string | null;
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

  [key: string]: any;
}

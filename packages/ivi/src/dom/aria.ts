/**
 * ARIA Attributes.
 *
 * https://www.w3.org/TR/wai-aria-1.1/
 */
export declare interface AriaAttrs {
  // Global States and Properties
  /**
   * Indicates the element that represents the current item within a container or set of related elements.
   */
  "aria-current"?: string;  // state
  /**
   * Identifies the element that provides a detailed, extended description for the object. See related
   * `aria-describedby`.
   */
  "aria-details"?: string;
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. See related
   * `aria-hidden` and `aria-readonly`.
   */
  "aria-disabled"?: string; // state
  /**
   * Indicates whether the element is exposed to an accessibility API. See related `aria-disabled`.
   */
  "aria-hidden"?: string;   // state
  /**
   * Indicates the entered value does not conform to the format expected by the application. See related
   * `aria-errormessage`.
   */
  "aria-invalid"?: string;  // state
  /**
   * Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.
   */
  "aria-keyshortcuts"?: string;
  /**
   * Defines a string value that labels the current element. See related `aria-labelledby`.
   */
  "aria-label"?: string;
  /**
   * Defines a human-readable, author-localized description for the role of an element.
   */
  "aria-roledescription"?: string;

  // Widget Attributes
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for
   * an input and specifies how predictions would be presented if they are made.
   */
  "aria-autocomplete"?: string;
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. See related `aria-pressed`
   * and `aria-selected`.
   */
  "aria-checked"?: string;
  /**
   * Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
   */
  "aria-expanded"?: string;
  /**
   * Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered
   * by an element.
   */
  "aria-haspopup"?: string;
  /**
   * Defines the hierarchical level of an element within a structure.
   */
  "aria-level"?: string;
  /**
   * Indicates whether an element is modal when displayed.
   */
  "aria-modal"?: string;
  /**
   * Indicates whether a text box accepts multiple lines of input or only a single line.
   */
  "aria-multiline"?: string;
  /**
   * Indicates that the user may select more than one item from the current selectable descendants.
   */
  "aria-multiselectable"?: string;
  /**
   * Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.
   */
  "aria-orientation"?: string;
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no
   * value. A hint could be a sample value or a brief description of the expected format.
   */
  "aria-placeholder"?: string;
  /**
   * Indicates the current "pressed" state of toggle buttons. See related `aria-checked` and `aria-selected`.
   */
  "aria-pressed"?: string;
  /**
   * Indicates that the element is not editable, but is otherwise operable. See related `aria-disabled`.
   */
  "aria-readonly"?: string;
  /**
   * Indicates that user input is required on the element before a form may be submitted.
   */
  "aria-required"?: string;
  /**
   * Indicates the current "selected" state of various widgets. See related `aria-checked` and `aria-pressed`.
   */
  "aria-selected"?: string;
  /**
   * Indicates if items in a table or grid are sorted in ascending or descending order.
   */
  "aria-sort"?: string;
  /**
   * Defines the maximum allowed value for a range widget.
   */
  "aria-valuemax"?: string;
  /**
   * Defines the minimum allowed value for a range widget.
   */
  "aria-valuemin"?: string;
  /**
   * Defines the current value for a range widget. See related `aria-valuetext`.
   */
  "aria-valuenow"?: string;
  /**
   * Defines the human readable text alternative of `aria-valuenow` for a range widget.
   */
  "aria-valuetext"?: string;

  // Live Region Attributes
  /**
   * Indicates whether assistive technologies will present all, or only parts of, the changed region based on the
   * change notifications defined by the `aria-relevant` attribute.
   */
  "aria-atomic"?: string;
  /**
   * Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications
   * are complete before exposing them to the user.
   */
  "aria-busy"?: string;
  /**
   * Indicates that an element will be updated, and describes the types of updates the user agents, assistive
   * technologies, and user can expect from the live region.
   */
  "aria-live"?: string;
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is
   * modified. See related `aria-atomic`.
   */
  "aria-relevant"?: string;

  // Drag-and-Drop Attributes
  /**
   * [Deprecated in ARIA 1.1] Indicates what functions can be performed when a dragged object is released on the drop
   * target.
   */
  "aria-dropeffect"?: string;
  /**
   * [Deprecated in ARIA 1.1] Indicates an element's "grabbed" state in a drag-and-drop operation.
   */
  "aria-grabbed"?: string;

  // Relationship Attributes
  /**
   * Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.
   */
  "aria-activedescendant"?: string;
  /**
   * Defines the total number of columns in a table, grid, or treegrid. See related `aria-colindex`.
   */
  "aria-colcount"?: string;
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid,
   * or treegrid. See related `aria-colcount` and `aria-colspan`.
   */
  "aria-colindex"?: string;
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. See related
   * `aria-colindex` and `aria-rowspan`.
   */
  "aria-colspan"?: string;
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element. See
   * related `aria-owns`.
   */
  "aria-controls"?: string;
  /**
   * Identifies the element (or elements) that describes the object. See related `aria-labelledby`.
   */
  "aria-describedby"?: string;
  /**
   * Identifies the element that provides an error message for the object. See related `aria-invalid` and
   * `aria-describedby`.
   */
  "aria-errormessage"?: string;
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's
   * discretion, allows assistive technology to override the general default of reading in document source order.
   */
  "aria-flowto"?: string;
  /**
   * Identifies the element (or elements) that labels the current element. See related `aria-describedby`.
   */
  "aria-labelledby"?: string;
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child
   * relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See
   * related `aria-controls`.
   */
  "aria-owns"?: string;
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all
   * elements in the set are present in the DOM. See related `aria-setsize`.
   */
  "aria-posinset"?: string;
  /**
   * Defines the total number of rows in a table, grid, or treegrid. See related `aria-rowindex`.
   */
  "aria-rowcount"?: string;
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or
   * treegrid. See related `aria-rowcount` and `aria-rowspan`.
   */
  "aria-rowindex"?: string;
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. See related
   * `aria-rowindex` and `aria-colspan`.
   */
  "aria-rowspan"?: string;
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the
   * set are present in the DOM. See related `aria-posinset`.
   */
  "aria-setsize"?: string;
}

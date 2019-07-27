/**
 * Node flags contain flags that are used by operation nodes and state nodes.
 */
export const enum NodeFlags {
  // Text node.
  Text = 1,
  // Element node.
  Element = 1 << 1,
  // Component node.
  Component = 1 << 2,
  // TrackByKey node.
  TrackByKey = 1 << 3,
  // Events node.
  Events = 1 << 4,
  // Context node.
  Context = 1 << 5,
  // Element prototype node.
  ElementProto = 1 << 6,
  // Fragment
  Fragment = 1 << 7,
  // Svg Element.
  Svg = 1 << 8,
  // Component is dirty.
  Dirty = 1 << 9,
  /**
   * Newline eating element <pre> and <textarea>
   *
   * http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody
   * http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre
   */
  NewlineEatingElement = 1 << 10,
  /**
   * Void Element
   *
   * https://www.w3.org/TR/html5/syntax.html#void-elements
   */
  VoidElement = 1 << 11,
  // Set context state.
  SetContextState = 1 << 12,
}

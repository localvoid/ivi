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
  // Stateful Component
  Stateful = 1 << 8,
  // Svg Element.
  Svg = 1 << 9,
  // Component is dirty.
  Dirty = 1 << 10,
  /**
   * Newline eating element <pre> and <textarea>
   *
   * http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody
   * http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre
   */
  NewlineEatingElement = 1 << 11,
  /**
   * Void Element
   *
   * https://www.w3.org/TR/html5/syntax.html#void-elements
   */
  VoidElement = 1 << 12,
  // Node requires dirty checking.
  DirtyCheck = 1 << 12,
  // Node requires unmounting.
  Unmount = 1 << 13,
  // IMPORTANT: DO NOT ADD FLAGS AFTER THIS ONE, LAST FLAGS ARE SHIFTED BY `DeepStateShift`.

  // Flags that should be preserved before updating.
  SelfFlags = Text
  | Element
  | ElementProto
  | Component
  | TrackByKey
  | Events
  | Context
  | ElementProto
  | Fragment
  | Stateful
  | Svg
  // | Dirty // Dirty flag should be erased after update.
  | DirtyCheck
  | Unmount
  | NewlineEatingElement,

  // Flags that were used by the children operations.
  DeepStateFlags = DirtyCheck | Unmount,
  DeepStateShift = 2,
  DeepStateDirtyCheck = DirtyCheck << DeepStateShift,
  DeepStateUnmount = Unmount << DeepStateShift,
}

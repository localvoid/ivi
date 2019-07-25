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
  // Node requires dirty checking state.
  DirtyCheckState = 1 << 13,
  // Node requires dirty checking observable.
  DirtyCheckObservable = 1 << 14,
  // Node requires dirty checking.
  DirtyCheck = DirtyCheckState | DirtyCheckObservable,
  // Node requires unmounting.
  Unmount = 1 << 15,
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
  | Svg
  // | Dirty // Dirty flag should be erased after update.
  | DirtyCheckState
  // | DirtyCheckObservable // DirtyCheckObservable flag should be reassigned after update.
  | Unmount
  | NewlineEatingElement
  | VoidElement
  | SetContextState,

  // Flags that were used by the children operations.
  DeepStateFlags = DirtyCheckState | DirtyCheckObservable | Unmount,
  DeepStateShift = 3,
  DeepStateDirtyCheck = (DirtyCheckState << DeepStateShift) | (DirtyCheckObservable << DeepStateShift),
  DeepStateUnmount = Unmount << DeepStateShift,
}

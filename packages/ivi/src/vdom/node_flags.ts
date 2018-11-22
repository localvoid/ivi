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
  // Ref node.
  Ref = 1 << 7,
  // Svg Element.
  Svg = 1 << 8,
  // Element has multiple children operations.
  MultipleChildren = 1 << 9,
  // Component is dirty.
  Dirty = 1 << 10,
  // Node requires dirty checking.
  DirtyCheck = 1 << 11,
  // Node requires unmounting.
  Unmount = 1 << 12,

  // Flags that should be preserved before updating.
  SelfFlags = Text
  | Element
  | ElementProto
  | Component
  | TrackByKey
  | Events
  | Context
  | ElementProto
  | Ref
  | Svg
  | MultipleChildren
  // | Dirty // Dirty flag should be erased after update.
  | DirtyCheck
  | Unmount,

  // Flags that were used by the children operations.
  DeepStateFlags = DirtyCheck | Unmount,
  DeepStateShift = 2,
  DeepStateDirtyCheck = DirtyCheck << DeepStateShift,
  DeepStateUnmount = Unmount << DeepStateShift,
}

/**
 * Node flags contain flags that are used by operation nodes and state nodes.
 */
export const enum NodeFlags {
  Text = 1,
  Element = 1 << 1,
  Component = 1 << 2,
  TrackByKey = 1 << 3,
  Events = 1 << 4,
  Context = 1 << 5,
  ElementProto = 1 << 6,
  Ref = 1 << 7,
  Svg = 1 << 8,
  // Element has multiple children ops (array)
  MultipleChildren = 1 << 9,
  // Component is dirty
  Dirty = 1 << 10,
  // Node requires dirty checking
  DirtyCheck = 1 << 11,
  // Node requires unmounting
  Unmount = 1 << 12,

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
  // | Dirty
  | DirtyCheck
  | Unmount,

  DeepStateFlags = DirtyCheck | Unmount,
  DeepStateShift = 2,
  DeepStateDirtyCheck = DirtyCheck << DeepStateShift,
  DeepStateUnmount = Unmount << DeepStateShift,
}

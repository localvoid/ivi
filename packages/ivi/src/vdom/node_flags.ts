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
  // Set context state.
  SetContextState = 1 << 10,
}

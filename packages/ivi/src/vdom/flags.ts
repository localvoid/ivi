/**
 * VNode flags.
 */
export const enum VNodeFlags {
  /**
   * VNode represents a Text node.
   */
  Text = 1,
  /**
   * VNode represents an Element node.
   */
  Element = 1 << 1,
  /**
   * VNode is using an element factory to instantiate an Element node.
   */
  ElementFactory = 1 << 2,
  /**
   * VNode represents a component.
   */
  Component = 1 << 3,
  /**
   * VNode represents a stateful component.
   */
  StatefulComponent = 1 << 4,
  /**
   * VNode contains children nodes.
   */
  Children = 1 << 5,
  /**
   * VNode contains a text content.
   */
  TextContent = 1 << 6,
  /**
   * VNode is using an explicit key.
   */
  Key = 1 << 7,
  /**
   * Keyed list.
   */
  KeyedList = 1 << 8,
  /**
   * Element contains events.
   */
  Events = 1 << 9,
  /**
   * VNode is an SVGElement.
   */
  SvgElement = 1 << 10,
  /**
   * Specialized VNode with connect behavior.
   */
  Connect = 1 << 11,
  /**
   * Specialized VNode with an update context behavior.
   */
  UpdateContext = 1 << 12,

  ElementIdMask = 255 << 13,
  ElementIdOffset = 13,
  /**
   * Dirty checking should be stopped at this node.
   *
   * NOTE: It is important that this flag is `1 << 31 === -1`. It allows to use a simple `flags > 0` check in the hot
   * path of the dirty checking instead of using two checks.
   */
  StopDirtyChecking = 1 << 31,

  /**
   * Flags that should match to be compatible for syncing.
   */
  Syncable = 0
  | Text
  | Element
  | ElementFactory
  | Component
  | StatefulComponent
  | Connect
  | UpdateContext
  | TextContent
  | Key
  | SvgElement
  | ElementIdMask,
}

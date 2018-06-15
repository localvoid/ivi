
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
   * VNode represents a stateless component.
   */
  StatelessComponent = 1 << 3,
  /**
   * VNode represents a stateful component.
   */
  StatefulComponent = 1 << 4,
  /**
   * VNode is using an explicit key.
   */
  Key = 1 << 5,
  /**
   * Keyed list.
   */
  KeyedList = 1 << 6,
  /**
   * Element contains events.
   */
  Events = 1 << 7,
  /**
   * VNode is an SVGElement.
   */
  SvgElement = 1 << 8,
  /**
   * Specialized VNode with connect behavior.
   */
  Connect = 1 << 9,
  /**
   * Specialized VNode with an update context behavior.
   */
  UpdateContext = 1 << 10,
  /**
   * Stateless component has custom `shouldUpdate()` hook.
   */
  ShouldUpdateHint = 1 << 11,
  /**
   * VNode element will be automatically focused after instantiation.
   */
  Autofocus = 1 << 12,

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
  | StatelessComponent
  | StatefulComponent
  | Connect
  | UpdateContext
  | Key
  | SvgElement
  | ElementIdMask,
}

/**
 * Component flags.
 */
export const enum ComponentFlags {
  /**
   * Component is detached from the document.
   */
  Detached = 1,
  /**
   * Component has dirty state and should be updated.
   */
  DirtyState = 1 << 1,

  /**
   * Component is dirty and should be updated.
   */
  Dirty = DirtyState,
}

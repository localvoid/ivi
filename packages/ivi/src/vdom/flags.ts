
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
   * Children property contains a child VNode.
   */
  ChildrenVNode = 1 << 5,
  /**
   * Children property contains unsafe HTML.
   */
  UnsafeHTML = 1 << 6,
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
  ElementPropsEvents = 1 << 9,
  /**
   * VNode represents an HTMLInputElement element.
   */
  InputElement = 1 << 10,
  /**
   * VNode represents a HTMLTextAreaElement.
   */
  TextAreaElement = 1 << 11,
  /**
   * VNode represents a HTMLMediaElement.
   */
  MediaElement = 1 << 12,
  /**
   * VNode is an SVGElement.
   */
  SvgElement = 1 << 13,
  /**
   * Specialized VNode with connect functionality.
   */
  Connect = 1 << 14,
  /**
   * Specialized VNode with an update context functionality.
   */
  UpdateContext = 1 << 15,
  /**
   * Stateless component is using `shouldUpdate` hook.
   */
  ShouldUpdateHint = 1 << 16,
  /**
   * VNode element will be automatically focused after instantiation.
   */
  Autofocus = 1 << 17,
  /**
   * VNode element cannot contain any children.
   */
  VoidElement = 1 << 18,

  ElementIdMask = 255 << 19,
  ElementIdOffset = 19,
  /**
   * Dirty checking should be stopped at this node.
   *
   * NOTE: It is important that this flag is `1 << 31 === -1`. It allows to use a simple `flags > 0` check in the hot
   * path of the dirty checking instead of using two checks.
   */
  StopDirtyChecking = 1 << 31,

  /**
   * VNode represents a Component.
   */
  Component = StatelessComponent | StatefulComponent | Connect | UpdateContext,
  /**
   * Flags that should match to be compatible for syncing.
   */
  Syncable = 0
  | Text
  | Element
  | ElementFactory
  | Component
  | UnsafeHTML
  | Key
  | InputElement
  | TextAreaElement
  | MediaElement
  | SvgElement
  | VoidElement
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
   * Component is dirty (state) and should be updated.
   */
  DirtyState = 1 << 1,
  /**
   * Component is animated.
   */
  Animated = 1 << 2,

  /**
   * Component is dirty and should be updated.
   */
  Dirty = DirtyState | Animated,
}

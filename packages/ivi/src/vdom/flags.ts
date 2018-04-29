
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
   * Children property contains a child with a basic type (number|string|boolean).
   */
  ChildrenBasic = 1 << 5,
  /**
   * Children property contains a child VNode.
   */
  ChildrenVNode = 1 << 6,
  /**
   * Children property contains an Array type.
   */
  ChildrenArray = 1 << 7,
  /**
   * Children property contains unsafe HTML.
   */
  UnsafeHTML = 1 << 8,
  /**
   * VNode is using an explicit key.
   */
  Key = 1 << 9,
  /**
   * Element contains events.
   */
  ElementPropsEvents = 1 << 10,
  /**
   * VNode represents an HTMLInputElement element.
   */
  InputElement = 1 << 11,
  /**
   * VNode represents a HTMLTextAreaElement.
   */
  TextAreaElement = 1 << 12,
  /**
   * VNode represents a HTMLButtonElement.
   */
  ButtonElement = 1 << 13,
  /**
   * VNode represents a HTMLMediaElement.
   */
  MediaElement = 1 << 14,
  /**
   * VNode is an SVGElement.
   */
  SvgElement = 1 << 15,
  /**
   * Specialized VNode with connect functionality.
   */
  Connect = 1 << 16,
  /**
   * Specialized VNode with an update context functionality.
   */
  UpdateContext = 1 << 17,
  /**
   * Stateless component is using `isPropsChanged` hook.
   */
  CheckChangedProps = 1 << 19,
  /**
   * VNode element will be automatically focused after instantiation.
   */
  Autofocus = 1 << 20,
  /**
   * VNode element cannot contain any children.
   */
  VoidElement = 1 << 21,

  ElementIdMask = 255 << 22,
  ElementIdOffset = 22,
  /**
   * Dirty checking is disabled for all descendants.
   *
   * NOTE: It is important that this flag is `1 << 31 === -1`. It allows to use a simple `flags > 0` check in the hot
   * path of the dirty checking instead of using two checks.
   */
  DisabledDirtyChecking = 1 << 31,

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
  | Component
  | Key
  | InputElement
  | TextAreaElement
  | ButtonElement
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

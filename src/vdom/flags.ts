
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
     * VNode represents a simple "function" component.
     */
    ComponentFunction = 1 << 2,
    /**
     * VNode represents a component.
     */
    ComponentClass = 1 << 3,
    /**
     * Children property contains a child with a basic type (number/string/boolean).
     */
    ChildrenBasic = 1 << 4,
    /**
     * Children property contains a child VNode.
     */
    ChildrenVNode = 1 << 5,
    /**
     * Children property contains an Array type.
     */
    ChildrenArray = 1 << 6,
    /**
     * Children property contains unsafe HTML.
     */
    UnsafeHTML = 1 << 7,
    /**
     * Children reconciliation algorithm should use `key` property to find same nodes in the old children list.
     */
    TrackByKeyChildren = 1 << 8,
    /**
     * VNode represents an HTMLInputElement(+textarea) element.
     */
    InputElement = 1 << 9,
    /**
     * VNode represents a HTMLTextAreaElement.
     */
    TextAreaElement = 1 << 10,
    /**
     * VNode represents a HTMLMediaElement.
     */
    MediaElement = 1 << 11,
    /**
     * VNode is an SVGElement.
     */
    SvgElement = 1 << 12,
    /**
     * VNode is an Element Descriptor.
     */
    ElementDescriptor = 1 << 13,

    /**
     * VNode represents a Component.
     */
    Component = ComponentFunction | ComponentClass,
    /**
     * Flags that should match to be compatible for syncing.
     */
    Syncable = Text | Element | Component | InputElement | TextAreaElement | MediaElement | SvgElement |
    ElementDescriptor,
}

/**
 * Component flags.
 */
export const enum ComponentFlags {
    /**
     * Component is dirty (props) and should be updated.
     */
    DirtyProps = 1,
    /**
     * Component is dirty (state) and should be updated.
     */
    DirtyState = 1 << 1,
    /**
     * Component is dirty (context) and should be updated.
     */
    DirtyContext = 1 << 2,
    /**
     * Component is attached to the document.
     */
    Mounted = 1 << 3,
    /**
     * Check that component is using context in `render` method.
     */
    CheckUsingContext = 1 << 4,
    /**
     * Component is using context in `render` method.
     *
     * NOTE: UsingContext value should be equal to (CheckUsingContext << 1)
     */
    UsingContext = 1 << 5,
    /**
     * Check that component is using props in `updateContext` method.
     */
    CheckUsingProps = 1 << 6,
    /**
     * Component is using props in `updateContext` method.
     *
     * NOTE: UsingProps value should be equal to (CheckUsingProps << 1)
     */
    ContextUsingProps = 1 << 7,
    /**
     * Component should be updated on each frame.
     */
    UpdateEachFrame = 1 << 8,
    /**
     * Component is registered in update each frame queue, when this flag is off, it will be removed from queue on next
     * frame.
     */
    InUpdateEachFrameQueue = 1 << 9,
    /**
     * Component is registered in scheduler frame task queue for updates.
     */
    InUpdateQueue = 1 << 10,
    /**
     * Component function is using local context.
     */
    ComponentFunctionContext = 1 << 11,

    /**
     * Component is dirty and should be updated.
     */
    Dirty = DirtyProps | DirtyState | DirtyContext,
}

/**
 * Element Descriptor flags.
 */
export const enum ElementDescriptorFlags {
    /**
     * Clone nodes from a base node with `Node.cloneNode(false)` method.
     */
    EnabledCloning = 1,

    // it is important that flags below match `VNodeFlags`, because they will be copied to VNode.
    Element = VNodeFlags.Element,
    InputElement = VNodeFlags.InputElement,
    TextAreaElement = VNodeFlags.TextAreaElement,
    MediaElement = VNodeFlags.MediaElement,
    Svg = VNodeFlags.SvgElement,
    ElementDescriptor = VNodeFlags.ElementDescriptor,

    /**
     * Copy flags to VNode.
     */
    CopyFlags = ElementDescriptorFlags.Element | ElementDescriptorFlags.InputElement |
    ElementDescriptorFlags.TextAreaElement | ElementDescriptorFlags.MediaElement | ElementDescriptorFlags.Svg |
    ElementDescriptorFlags.ElementDescriptor,
}

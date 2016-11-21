import { EventHandlerList } from "../events/event_handler";
import { CSSStyleProps } from "./dom_props";
import { VNodeFlags } from "./flags";
import { ComponentClass, ComponentFunction, Component } from "./component";
import { ElementDescriptor } from "./element_descriptor";

/**
 * VNode object is the core object in ivi Virtual DOM, it can represent any node type.
 */
export interface VNode<P> {
    /**
     * Flags, see `VNodeFlags` for details.
     */
    _flags: VNodeFlags;
    /**
     * Tag name of the element.
     *
     * When VNode represents a Component, tag property should contain reference to a `ComponentClass` if it is a
     * stateful component or `ComponentFunction` for stateless components.
     */
    _tag: string | ComponentClass<any> | ComponentFunction<any> | ElementDescriptor<any> | null;
    /**
     * Children reconciliation algorithm is using key property to find the same node in the previous children array. Key
     * should be unique among its siblings.
     */
    _key: any;
    /**
     * Properties.
     */
    _props: P | null;
    /**
     * Class name.
     */
    _className: string | null;
    /**
     * Style.
     */
    _style: CSSStyleProps | null;
    /**
     * Events.
     */
    _events: EventHandlerList | null;
    /**
     * Children property can contain flat array of children virtual nodes, or text if it contains a single text node
     * child.
     *
     * When virtual node represents an input field, children property will contain input value.
     *
     * When virtual node represents a component, children property will contain a reference to a component instance.
     */
    _children: VNode<any>[] | VNode<any> | string | number | boolean | Component<any> | null | undefined;
    /**
     * Reference to a HTML Node. It will be available after virtual node is created or synced. Each time VNode is
     * synced, reference to the HTML Node is transferred from the old VNode to the new one.
     */
    _dom: Node | null;
    /**
     * Ref callback.
     */
    _ref: ((ref: Node | Component<any> | null) => void) | null;
    /**
     * Unique ID thas is available in Dev Mode.
     */
    _debugId: number;
}

/**
 * Check if VNode is representing a Text node.
 *
 * @param node VNode.
 * @returns true when VNode is representing a Text node.
 */
export function isTextNode(node: VNode<any>): boolean {
    return !!(node._flags & VNodeFlags.Text);
}

/**
 * Check if VNode is representing an Element.
 *
 * @param node VNode.
 * @returns true when VNode is representing an element node.
 */
export function isElementNode(node: VNode<any>): boolean {
    return !!(node._flags & VNodeFlags.Element);
}

/**
 * Check if VNode is representing an SVG Element.
 *
 * @param node VNode.
 * @returns true when VNode is representing a text node.
 */
export function isSVGNode(node: VNode<any>): boolean {
    return !!(node._flags & VNodeFlags.SvgElement);
}

/**
 * Check if VNode is representing a Component.
 *
 * @param node VNode.
 * @returns true when VNode is representing a Component.
 */
export function isComponentNode(node: VNode<any>): boolean {
    return !!(node._flags & VNodeFlags.Component);
}

/**
 * Get reference to a DOM node from a VNode object.
 *
 * @param node VNode which contains reference to a DOM node.
 * @returns null if VNode doesn't have a reference to a DOM node.
 */
export function getDOMRef<T extends Node>(node: VNode<any>): T | null {
    return node._dom as T;
}

/**
 * Get reference to a Component instance from a VNode object.
 *
 * @param node VNode which contains reference to a Component instance.
 * @returns null if VNode doesn't have a reference to a Component instance.
 */
export function getComponentRef<P>(node: VNode<P>): Component<P> | null {
    if (__IVI_DEV__) {
        if (!(node._flags & VNodeFlags.Component)) {
            throw new Error("Failed to get component reference: VNode should represent a Component.");
        }
    }
    return node._children as Component<P> | null;
}

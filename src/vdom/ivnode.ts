import { EventHandler } from "../events/event_handler";
import { Context } from "../common/types";
import { CSSStyleProps } from "../common/dom_props";
import { VNodeFlags } from "./flags";
import { ComponentClass, ComponentFunction, Component } from "./component";
import { ElementDescriptor } from "./element_descriptor";
import { ConnectDescriptor, SelectorData } from "./connect_descriptor";
import { KeepAliveHandler } from "./keep_alive";

/**
 * VNode object is the core object in ivi Virtual DOM, it can represent any node type.
 */
export interface IVNode<P = null> {
    /**
     * Flags, see `VNodeFlags` for details.
     */
    _flags: VNodeFlags;
    /**
     * Children property can contain flat array of children virtual nodes, or text if it contains a single text node
     * child.
     *
     * When virtual node represents an input field, children property will contain input value.
     */
    _children: IVNode<any>[] | IVNode<any> | string | number | boolean | null | undefined;
    /**
     * Tag property contains details about the type of the element.
     *
     * Simple elements has a string type values, components can be a simple functions, constructor, or special
     * descriptors for nodes that change syncing algorithm behavior.
     */
    _tag: string | ComponentClass<any> | ComponentFunction<any> | ElementDescriptor<any> |
    ConnectDescriptor<any, any, any> | KeepAliveHandler | null;
    /**
     * Children syncing algorithm is using key property to find the same node in the previous children array. Key
     * should be unique among its siblings.
     */
    _key: any;
    /**
     * Properties.
     */
    _props: ElementProps<P> | P | null;
    /**
     * Reference to HTML node or Component instance. It will be available after virtual node is created or synced. Each
     * time VNode is synced, reference will be transferred from the old VNode to the new one.
     */
    _instance: Node | Component<any> | SelectorData | Context | null;
    /**
     * Class name.
     */
    _className: string | null;
}

export interface ElementProps<P> {
    /**
     * Attributes.
     */
    attrs: P | null;
    /**
     * Style.
     */
    style: CSSStyleProps | null;
    /**
     * Events.
     */
    events: Array<EventHandler | null> | EventHandler | null;
}

/**
 * Check if VNode is representing a Text node.
 *
 * @param node VNode.
 * @returns true when VNode is representing a Text node.
 */
export function isTextNode(node: IVNode<any>): boolean {
    return !!(node._flags & VNodeFlags.Text);
}

/**
 * Check if VNode is representing an Element.
 *
 * @param node VNode.
 * @returns true when VNode is representing an element node.
 */
export function isElementNode(node: IVNode<any>): boolean {
    return !!(node._flags & VNodeFlags.Element);
}

/**
 * Check if VNode is representing an SVG Element.
 *
 * @param node VNode.
 * @returns true when VNode is representing a text node.
 */
export function isSVGNode(node: IVNode<any>): boolean {
    return !!(node._flags & VNodeFlags.SvgElement);
}

/**
 * Check if VNode is representing a Component.
 *
 * @param node VNode.
 * @returns true when VNode is representing a Component.
 */
export function isComponentNode(node: IVNode<any>): boolean {
    return !!(node._flags & VNodeFlags.Component);
}

/**
 * Get reference to a DOM node from a VNode object.
 *
 * @param node VNode which contains reference to a DOM node.
 * @returns null if VNode doesn't have a reference to a DOM node.
 */
export function getDOMInstanceFromVNode<T extends Node>(node: IVNode<any>): T | null {
    if (node._flags & VNodeFlags.Component) {
        return getDOMInstanceFromVNode<T>(node._children as IVNode<any>);
    }
    return node._instance as T;
}

/**
 * Get reference to a Component instance from a VNode object.
 *
 * @param node VNode which contains reference to a Component instance.
 * @returns null if VNode doesn't have a reference to a Component instance.
 */
export function getComponentInstanceFromVNode<T extends Component<any>>(node: IVNode<any>): T | null {
    if (__IVI_DEV__) {
        if (!(node._flags & VNodeFlags.Component)) {
            throw new Error("Failed to get component instance: VNode should represent a Component.");
        }
    }
    return node._instance as T | null;
}

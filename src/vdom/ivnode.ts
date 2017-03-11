import { EventHandlerList } from "../events/event_handler";
import { Context } from "../common/types";
import { CSSStyleProps } from "../common/dom_props";
import { VNodeFlags } from "./flags";
import { ComponentClass, ComponentFunction, Component } from "./component";
import { ElementDescriptor } from "./element_descriptor";
import { ConnectDescriptor, SelectorData } from "./connect_descriptor";

/**
 * VNode object is the core object in ivi Virtual DOM, it can represent any node type.
 */
export interface IVNode<P = null> {
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
    _tag: string | ComponentClass<any> | ComponentFunction<any> | ElementDescriptor<any> |
    ConnectDescriptor<any, any, any> | null;
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
     */
    _children: IVNode<any>[] | IVNode<any> | string | number | boolean | null | undefined;
    /**
     * Reference to HTML node or Component instance. It will be available after virtual node is created or synced. Each
     * time VNode is synced, reference will be transferred from the old VNode to the new one.
     */
    _instance: Node | Component<any> | SelectorData | Context | null;
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
        if (node._flags & VNodeFlags.ComponentClass) {
            return getDOMInstanceFromVNode<T>((node._instance as Component<any>).root!);
        } else {
            return getDOMInstanceFromVNode<T>(node._children as IVNode<any>);
        }
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

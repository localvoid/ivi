import { IVNode } from "../vdom/ivnode";
import { VNodeFlags } from "../vdom/flags";
import { Component, ComponentFunction } from "../vdom/component";
import { ROOTS } from "../vdom/root";
import { getFunctionName } from "./dev_mode";

export interface DebugNode {
    name: string;
    children?: DebugNode[];
    instance?: Component<any>;
}

interface ComponentInstance extends DebugNode {
    constructor(name: string, instance: Component<any>): ComponentInstance;
    name: string;
    children?: DebugNode[];
    instance?: Component<any>;
}

function ComponentInstance(this: ComponentInstance, name: string, instance: Component<any>): void {
    this.name = name;
    this.instance = instance;
}

interface FunctionalComponent extends DebugNode {
    constructor(name: string): FunctionalComponent;
    name: string;
    children?: DebugNode[];
}

function FunctionalComponent(this: FunctionalComponent, name: string): void {
    this.name = name;
}

function componentTreeVisitElement(node: IVNode<any>): DebugNode[] | null {
    if (node._children !== null) {
        if (node._flags & VNodeFlags.ChildrenArray) {
            let result: DebugNode[] | null = null;
            const children = node._children as IVNode<any>[];
            for (const c of children) {
                const child = componentTreeVisitNode(c);
                if (child) {
                    result = result ? result.concat(child) : child;
                }
            }
            return result;
        } else if (node._flags & VNodeFlags.ChildrenVNode) {
            return componentTreeVisitNode(node._children as IVNode<any>);
        }
    }
    return null;
}

function componentTreeVisitComponent(node: IVNode<any>): DebugNode | null {
    if (node._flags & VNodeFlags.ComponentFunction) {
        const result = new FunctionalComponent(getFunctionName(node._tag as ComponentFunction<any>));

        if (node._children) {
            const children = componentTreeVisitNode(node._children as IVNode<any>);
            if (children) {
                result.children = children;
            }
        }

        return result;
    }

    const component = node._instance as Component<any>;
    const result = new ComponentInstance(getFunctionName(component.constructor), component);

    if (component.root) {
        const children = componentTreeVisitNode(component.root);
        if (children) {
            result.children = children;
        }
    }

    return result;
}

function componentTreeVisitNode(node: IVNode<any>): DebugNode[] | null {
    if (node._flags & VNodeFlags.Element) {
        return componentTreeVisitElement(node);
    } else if (node._flags & VNodeFlags.Component) {
        const component = componentTreeVisitComponent(node);
        if (component) {
            return [component];
        }
    }

    return null;
}

/**
 * Generate a readable component tree representation.
 *
 * @param component Optional paramer that specifies which component should be used as a root, when component isn't
 * specified, all root nodes will be used to generate component tree.
 */
export function componentTree(component?: Component<any>): DebugNode[] | null {
    if (__IVI_DEV__) {
        if (component) {
            const result = new ComponentInstance(getFunctionName(component.constructor), component);
            if (component.root) {
                const children = componentTreeVisitNode(component.root);
                if (children) {
                    result.children = children;
                }
            }

            return [result];
        } else {
            let result: DebugNode[] | null = null;
            for (const root of ROOTS) {
                const child = componentTreeVisitNode(root.currentVNode!);
                if (child) {
                    result = result ? result.concat(child) : child;
                }
            }
            return result;
        }
    }

    return null;
}

function _findComponentByNode(
    node: Node,
    vnode: IVNode<any>,
    owner: Component<any> | null,
): Component<any> | null | undefined {
    if (vnode._flags & (VNodeFlags.Element | VNodeFlags.Text)) {
        if (vnode._instance === node) {
            return owner;
        }
        if (vnode._flags & VNodeFlags.Element) {
            if (vnode._children !== null) {
                if (vnode._flags & VNodeFlags.ChildrenArray) {
                    const children = vnode._children as IVNode<any>[];
                    for (const c of children) {
                        return _findComponentByNode(node, c, owner);
                    }
                } else if (vnode._flags & VNodeFlags.ChildrenVNode) {
                    return _findComponentByNode(node, vnode._children as IVNode<any>, owner);
                }
            }
        }
    } else if (vnode._flags & VNodeFlags.ComponentClass) {
        const component = vnode._instance as Component<any>;
        if (component.root) {
            return _findComponentByNode(node, component.root, component);
        }
    } else if (vnode._flags & VNodeFlags.ComponentFunction) {
        const root = vnode._children as IVNode<any> | null;
        if (root) {
            return _findComponentByNode(node, root, owner);
        }
    }

    return undefined;
}

/**
 * Find component instance that owns DOM node.
 *
 * @param node DOM node.
 * @returns Component instance or `null` if it isn't owned by any component.
 */
export function findComponentByNode(node: Node): Component<any> | null {
    if (__IVI_DEV__) {
        for (const root of ROOTS) {
            const result = _findComponentByNode(node, root.currentVNode!, null);
            if (result !== undefined) {
                return result;
            }
        }
    }
    return null;
}

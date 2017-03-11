import { IVNode, getDOMInstanceFromVNode } from "../vdom/ivnode";
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
    let result;
    if (node._flags & VNodeFlags.ComponentFunction) {
        result = new FunctionalComponent(getFunctionName(node._tag as ComponentFunction<any>));
    } else {
        const component = node._instance as Component<any>;
        result = new ComponentInstance(getFunctionName(component.constructor), component);
    }

    const children = componentTreeVisitNode(node._children as IVNode<any>);
    if (children) {
        result.children = children;
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

function _findVNode(
    match: (vnode: IVNode<any>) => boolean,
    vnode: IVNode<any>,
): IVNode<any> | null {
    if (match(vnode)) {
        return vnode;
    }
    if (vnode._flags & (VNodeFlags.Element | VNodeFlags.Text)) {
        if (vnode._flags & VNodeFlags.Element) {
            if (vnode._children !== null) {
                if (vnode._flags & VNodeFlags.ChildrenArray) {
                    const children = vnode._children as IVNode<any>[];
                    for (const c of children) {
                        return _findVNode(match, c);
                    }
                } else if (vnode._flags & VNodeFlags.ChildrenVNode) {
                    return _findVNode(match, vnode._children as IVNode<any>);
                }
            }
        }
    } else if (vnode._flags & VNodeFlags.Component) {
        return _findVNode(match, vnode._children as IVNode<any>);
    }

    return null;
}

function findVNode(
    match: (vnode: IVNode<any>) => boolean,
): IVNode<any> | null {
    if (__IVI_DEV__) {
        for (const root of ROOTS) {
            const result = _findVNode(match, root.currentVNode!);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

/**
 * Find component instance that owns DOM node.
 *
 * @param node DOM node.
 * @returns Component instance or `null` if it isn't owned by any component.
 */
export function findComponentByNode(node: Node): Component<any> | null {
    if (__IVI_DEV__) {
        function match(vnode: IVNode) {
            if (vnode._flags & VNodeFlags.ComponentClass) {
                return node === getDOMInstanceFromVNode(vnode._children as IVNode<any>);
            }
            return false;
        }
        const result = findVNode(match);
        if (result) {
            return result._instance as Component<any>;
        }
    }
    return null;
}

/**
 * Find component instance by debug ID.
 *
 * @param debugId Debug ID.
 * @returns Component instance or `null`.
 */
export function findComponentByDebugId(id: number): Component<any> | null {
    if (__IVI_DEV__) {
        function match(vnode: IVNode) {
            if (vnode._flags & VNodeFlags.ComponentClass) {
                return id === (vnode._instance as Component<any>)._debugId;
            }
            return false;
        }
        const result = findVNode(match);
        if (result) {
            return result._instance as Component<any>;
        }
    }
    return null;
}

/**
 * Find VNode instance by DOM Node.
 *
 * @param node DOM Node.
 * @returns VNode instance or `null`.
 */
export function findVNodeByNode(node: Node): IVNode<any> | null {
    if (__IVI_DEV__) {
        function match(vnode: IVNode) {
            if (vnode._flags & VNodeFlags.ComponentClass) {
                return node === getDOMInstanceFromVNode(vnode._children as IVNode<any>);
            }
            return false;
        }
        return findVNode(match);
    }
    return null;
}

/**
 * Find VNode instance by component debug ID.
 *
 * @param debugId Debug ID.
 * @returns VNode instance or `null`.
 */
export function findVNodeByComponentDebugId(id: number): IVNode<any> | null {
    if (__IVI_DEV__) {
        function match(vnode: IVNode) {
            if (vnode._flags & VNodeFlags.ComponentClass) {
                return id === (vnode._instance as Component<any>)._debugId;
            }
            return false;
        }
        return findVNode(match);
    }
    return null;
}

export function visitComponents(visitor: (vnode: IVNode<any>) => void, vnode?: IVNode<any>): void {
    if (!vnode) {
        for (const root of ROOTS) {
            visitComponents(visitor, root.currentVNode!);
        }
    } else {
        if (vnode._flags & VNodeFlags.Element) {
            if (vnode._children !== null) {
                if (vnode._flags & VNodeFlags.ChildrenArray) {
                    for (const c of vnode._children as IVNode<any>[]) {
                        visitComponents(visitor, c);
                    }
                } else if (vnode._flags & VNodeFlags.ChildrenVNode) {
                    return visitComponents(visitor, vnode._children as IVNode<any>);
                }
            }
        } else if (vnode._flags & VNodeFlags.Component) {
            visitor(vnode);
        }
    }
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
            function match(vnode: IVNode) {
                if (vnode._flags & VNodeFlags.ComponentClass) {
                    return vnode._instance === component;
                }
                return false;
            }
            const result = findVNode(match);
            if (result) {
                return componentTreeVisitNode(result);
            }
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

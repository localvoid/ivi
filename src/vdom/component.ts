import { NOOP_FALSE } from "../common/noop";
import { getFunctionName, nextDebugId } from "../dev_mode/dev_mode";
import { isPropsNotIdentical, isPropsNotShallowEqual } from "../common/equality";
import { AncestorFlags } from "../dev_mode/html_nesting_rules";
import { ComponentFlags } from "./flags";
import { Context } from "./context";
import { VNode, getDOMInstanceFromVNode } from "./vnode";
import { currentFrame } from "../scheduler/frame";

/**
 * Component function constructor.
 */
export interface ComponentFunction<P> {
    (props: P, context?: Context): VNode<any> | undefined;
    isPropsChanged?: (oldProps: P, newProps: P) => boolean;
}

/**
 * Component class constructor.
 */
export interface ComponentClass<P> {
    new (props: P, context: Context, owner: Component<any> | undefined): Component<P>;
}

/**
 * Component is the main building block that is used to build UI applications.
 *
 * Component class has a parametric type `P` to specify `props` type.
 *
 * Example:
 *
 *     class Hello extends Component<string> {
 *       render() {
 *         return $t(`Hello ${this.props}`);
 *       }
 *     }
 *
 *     render($c(Hello, "world"), document.getElementById("App")!);
 */
export abstract class Component<P> {
    /**
     * Flags, see `ComponentFlags` for details.
     *
     * Lowest 16 bits are reserved for ivi flags, other bits can be used for user flags.
     */
    flags: ComponentFlags;
    /**
     * Depth in the components tree.
     *
     * Depth property is used by scheduler to determine component priority when updating components.
     */
    readonly depth: number;
    /**
     * Component properties.
     */
    _props: P;
    /**
     * Parent context.
     *
     * Context that was used to create this component.
     */
    _parentContext: Context;
    /**
     * Current context.
     */
    _context: Context;
    /**
     * Owner component.
     *
     * Parent component. When owner is an undefined, it means that this component is a root component.
     */
    readonly owner: Component<any> | undefined;
    /**
     * Virtual DOM root node.
     */
    root: VNode<any> | null;
    /**
     * Parent DOM node.
     *
     * It is used because when root node is changed we will need to replace old DOM node with a new one, and right now
     * browsers doesn't provide a nice API that doesn't require to know parent nodes.
     */
    _parentDOMNode: Node | null;
    /**
     * Ancestor Flags are used to check child nesting violations.
     *
     * Dev Mode.
     */
    _ancestorFlags: AncestorFlags;
    /**
     * Component function stack trace.
     *
     * Component functions doesn't have any instances, so we need to store them separately.
     *
     * Dev Mode.
     */
    _stackTrace: ComponentFunction<any>[] | null;
    /**
     * Unique ID.
     *
     * ID generator is using `dev_mode.uniqueId()` function, so it will be unique across all Dev Mode ids.
     *
     * Dev Mode.
     */
    _debugId: number;

    constructor(props: P, context: Context, owner: Component<any> | undefined) {
        this.flags = 0;
        this.depth = owner ? owner.depth + 1 : 0;
        this._props = props;
        this._parentContext = context;
        this._context = context;
        this.owner = owner;
        this.root = null;
        if (__IVI_BROWSER__) {
            this._parentDOMNode = null;
        }
        if (__IVI_DEV__) {
            this._ancestorFlags = 0;
            this._stackTrace = null;
            this._debugId = nextDebugId();
        }
    }

    /**
     * Get current context.
     *
     * @returns Current context.
     */
    get context(): Context {
        this.flags |= ComponentFlags.CheckUsingContext;
        return this._parentContext;
    }

    /**
     * Get props.
     *
     * @returns Current props.
     */
    get props(): P {
        this.flags |= ComponentFlags.CheckUsingProps;
        return this._props;
    }

    /**
     * Is component attached.
     *
     * @returns `true` when Component is attached.
     */
    get isAttached(): boolean {
        return !!(this.flags & ComponentFlags.Attached);
    }

    /**
     * Lifecycle method `isPropsChanged` is used as a hint that can reduce unnecessary updates.
     *
     * By default all props changes returns `true`.
     *
     * @param oldProps Old props.
     * @param newProps New props.
     * @returns `true` when props should be updated.
     */
    isPropsChanged(oldProps: P, newProps: P): boolean {
        return true;
    }

    /**
     * Lifecycle method `newPropsReceived` is invoked after new props are assigned.
     *
     * @param oldProps Old props.
     * @param newProps New props.
     */
    newPropsReceived(oldProps: P, newProps: P): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `didReceiveNewContext` is invoked after new context is assigned.
     *
     * @param oldContext Old context.
     * @param newContext New Context.
     */
    newContextReceived(oldContext: Context, newContext: Context): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `updateContext` is used to modify current context.
     *
     * It will be invoked when component is created, each time when parent context is changed, each time when props are
     * changed, and when component is updated with invalidated context.
     *
     * @returns Context data.
     */
    updateContext<C>(): C | undefined {
        return;
    }

    /**
     * Lifecycle method `attached` is invoked when component is attached to the document.
     */
    attached(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `detached` is invoked when component is detached from the document.
     */
    detached(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `beforeUpdate` is invoked before update.
     */
    beforeUpdate(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `updated` is invoked after update.
     */
    updated(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `invalidated` is invoked after `invalidate` method is invoked.
     */
    invalidated(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * When render method returns `undefined` value, it will create an empty text node.
     */
    render(): VNode<any> | undefined {
        return;
    }

    /**
     * Invalidate view.
     */
    invalidate(): void {
        if (__IVI_BROWSER__) {
            invalidateComponent(this, ComponentFlags.DirtyState);
        }
    }

    /**
     * Invalidate context.
     */
    invalidateContext(): void {
        if (__IVI_BROWSER__) {
            invalidateComponent(this, ComponentFlags.DirtyContext);
        }
    }
}

/**
 * Invalidate Component.
 *
 * @param component
 * @param dirtyFlags
 */
export function invalidateComponent<P>(component: Component<P>, dirtyFlags: number): void {
    if (__IVI_BROWSER__) {
        if (component.flags & ComponentFlags.Attached) {
            component.flags |= dirtyFlags;
            component.invalidated();
            if (!(component.flags & ComponentFlags.InUpdateQueue)) {
                currentFrame().updateComponent(component);
            }
        }
    }
}

/**
 * Global Component registry available in Dev Mode. It is used to find components by their `debugId`.
 */
let COMPONENT_REGISTRY: Map<number, Component<any>>;
if (__IVI_DEV__) {
    COMPONENT_REGISTRY = new Map<number, Component<any>>();
}

/**
 * Register a Component in Component Registry by its `debugId`.
 *
 * @param component Component instance.
 */
export function registerComponent(component: Component<any>): void {
    if (__IVI_DEV__) {
        COMPONENT_REGISTRY.set(component._debugId, component);
    }
}

/**
 * Unregister a Component from Component Registry by its `debugId`.
 *
 * @param component Component instance.
 */
export function unregisterComponent(component: Component<any>): void {
    if (__IVI_DEV__) {
        COMPONENT_REGISTRY.delete(component._debugId);
    }
}

/**
 * Find Component instance by `debugId` in Component Registry.
 *
 * @param debugId Debug ID.
 * @returns Component associtated with `debugId` or an `undefined` if component is missing.
 */
export function findComponentByDebugId(debugId: number): Component<any> | undefined {
    if (__IVI_DEV__) {
        return COMPONENT_REGISTRY.get(debugId);
    }
    return;
}

/**
 * Checks props for identity.
 *
 * This function can be used as a wrapper for function expression, or as a class decorator.
 *
 *     const MyComponent = checkPropsIdentity(function(text: string) {
 *         return $h("div").children(text);
 *     });
 *
 *     @checkPropsIdentity
 *     class MyClassComponent extends Component<string> {
 *         render() {
 *             return $h("div").children(this.props);
 *         }
 *     }
 *
 * @param target Component constructor.
 * @returns Component constructor with identity check.
 */
export function checkPropsIdentity<P extends ComponentClass<any> | ComponentFunction<any>>(target: P): P {
    if (target.prototype.render) {
        target.prototype.isPropsChanged = isPropsNotIdentical;
    } else {
        (target as ComponentFunction<any>).isPropsChanged = isPropsNotIdentical;
    }
    return target;
}

/**
 * Checks props for shallow equality.
 *
 * This function can be used as a wrapper for function expression, or as a class decorator.
 *
 *     const MyComponent = checkPropsShallowEquality(function(props: { text: string }) {
 *         return $h("div").children(props.text);
 *     });
 *
 *     @checkPropsShallowEquality
 *     class MyClassComponent extends Component<{ text: string }> {
 *         render() {
 *             return $h("div").children(this.props.text);
 *         }
 *     }
 *
 * @param target Component constructor.
 * @returns Component constructor with identity check.
 */
export function checkPropsShallowEquality<P extends ComponentClass<any> | ComponentFunction<any>>(target: P): P {
    if (target.prototype.render) {
        target.prototype.isPropsChanged = isPropsNotShallowEqual;
    } else {
        (target as ComponentFunction<any>).isPropsChanged = isPropsNotShallowEqual;
    }
    return target;
}

/**
 * Marks component as static.
 *
 * This function can be used as a wrapper for function expression, or as a class decorator.
 *
 *     const MyComponent = staticComponent(function(props: { text: string }) {
 *         return $h("div").children(props.text);
 *     });
 *
 *     @staticComponent
 *     class MyClassComponent extends Component<{ text: string }> {
 *         render() {
 *             return $h("div").children(this.props.text);
 *         }
 *     }
 *
 * @param target Component constructor.
 * @returns Component constructor with static property.
 */
export function staticComponent<P extends ComponentClass<any> | ComponentFunction<any>>(target: P): P {
    if (target.prototype.render) {
        target.prototype.isPropsChanged = NOOP_FALSE;
    } else {
        (target as ComponentFunction<any>).isPropsChanged = NOOP_FALSE;
    }
    return target;
}

/**
 * Get reference to a DOM node from a Component instance.
 *
 * @param component Component instance.
 * @returns DOM node.
 */
export function getDOMInstanceFromComponent<T extends Node>(component: Component<any>): T {
    if (__IVI_DEV__) {
        if (!component.root) {
            throw new Error("Failed to get DOM instance from component, component is not initialized.");
        }
    }
    return getDOMInstanceFromVNode<T>(component.root!) !;
}

/**
 * Get component name from component instance or component function.
 *
 * @param component Component.
 * @return Component name.
 */
export function getComponentName(component: Component<any> | ComponentFunction<any>): string {
    return getFunctionName(
        (component as Function).prototype.render ?
            (component as Object).constructor :
            component as ComponentFunction<any>,
    );
}

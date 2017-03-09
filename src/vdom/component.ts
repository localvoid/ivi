import { Context } from "../common/types";
import { NOOP_FALSE } from "../common/noop";
import { getFunctionName, nextDebugId } from "../dev_mode/dev_mode";
import { isPropsNotIdentical, isPropsNotShallowEqual } from "../common/equality";
import { ComponentFlags } from "./flags";
import { IVNode, getDOMInstanceFromVNode } from "./ivnode";
import { currentFrame } from "../scheduler/frame";

/**
 * Component function constructor.
 */
export interface ComponentFunction<P = void> {
    (props: P, context?: Context): IVNode<any>;
    isPropsChanged?: (oldProps: P, newProps: P) => boolean;
    shouldAugment?: (props: P, context?: Context) => boolean;
}

/**
 * Component class constructor.
 */
export interface ComponentClass<P = void> {
    new (props: P, context: Context): Component<P>;
}

/**
 * Component is the main building block that is used to build UI applications.
 *
 * Component class has a parametric type `P` to specify `props` type.
 *
 * Example:
 *
 *     class Hello extends Component<string> {
 *         render() {
 *             return $t(`Hello ${this.props}`);
 *         }
 *     }
 *
 *     render($c(Hello, "world"), document.getElementById("App")!);
 */
export abstract class Component<P = void> {
    /**
     * Flags, see `ComponentFlags` for details.
     *
     * Lowest 16 bits are reserved for ivi flags, other bits can be used for user flags.
     */
    flags: ComponentFlags;
    /**
     * Component properties.
     */
    props: P;
    /**
     * Current context.
     */
    _context: Context;
    /**
     * Virtual DOM root node.
     */
    root: IVNode<any> | null;
    /**
     * Unique ID.
     *
     * ID generator is using `dev_mode.uniqueId()` function, so it will be unique across all Dev Mode ids.
     *
     * Dev Mode.
     */
    _debugId: number;

    constructor(props: P, context: Context) {
        this.flags = 0;
        this.props = props;
        this._context = context;
        this.root = null;
        if (__IVI_DEV__) {
            this._debugId = nextDebugId();
        }
    }

    /**
     * Get current context.
     *
     * @returns Current context.
     */
    getContext<T = {}>(): Context<T> {
        this.flags |= ComponentFlags.CheckUsingContext;
        return this._context as Context<T>;
    }

    /**
     * Is component attached.
     *
     * @returns `true` when Component is attached.
     */
    isAttached(): boolean {
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
     * Lifecycle method `shouldAugment` is invoked before augmentation.
     *
     * @returns true when component should be augmented.
     */
    shouldAugment(): boolean {
        return true;
    }

    /**
     * Lifecycle method `newContextReceived` is invoked after new context is assigned.
     *
     * @param oldContext Old context.
     * @param newContext New Context.
     */
    newContextReceived(oldContext: Context, newContext: Context): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
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

    abstract render(): IVNode<any>;

    /**
     * Invalidate view.
     */
    invalidate(): void {
        if (__IVI_BROWSER__) {
            this.flags |= ComponentFlags.DirtyState;
            this.invalidated();
            if (this.flags & ComponentFlags.Attached) {
                currentFrame().updateComponent();
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
 *     checkPropsIdentity(MyComponent);
 *     function MyComponent(text: string) {
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
 *     checkPropsShallowEquality(MyComponent);
 *     function MyComponent(props: { text: string }) {
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
 *     staticComponent(MyComponent);
 *     function MyComponent(props: { text: string }) {
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
    return getDOMInstanceFromVNode<T>(component.root!)!;
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

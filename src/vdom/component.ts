import { getFunctionName, nextDebugId } from "../common/dev_mode";
import { isPropsNotIdentical, isPropsNotShallowEqual } from "../common/equality";
import { AncestorFlags } from "../common/html_nesting_rules";
import { ComponentFlags } from "./flags";
import { Context } from "./context";
import { VNode } from "./vnode";
import { currentFrame } from "../scheduler/scheduler";

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
     * Root DOM node.
     *
     * When component is returning another component, they'll share the same DOM node.
     */
    _rootDOMNode: Node | null;
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
            this._rootDOMNode = null;
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
        return this._context;
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
     * Is Component mounted.
     *
     * `isMounted` should be used only in one case, to prevent unnecessary work in asynchronous tasks.
     *
     * @returns `true` when Component is mounted.
     */
    get isMounted(): boolean {
        return !!(this.flags & ComponentFlags.Mounted);
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
     * Lifecycle method `didReceiveNewProps` is invoked after new props are assigned.
     *
     * @param oldProps Old props.
     * @param newProps New props.
     */
    didReceiveNewProps(oldProps: P, newProps: P): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `didReceiveNewContext` is invoked after new context is assigned.
     *
     * @param oldContext Old context.
     * @param newContext New Context.
     */
    didReceiveNewContext(oldContext: Context, newContext: Context): void {
        // TODO: this lifecycle method might be slightly confusing because it actually works with parent contexts.
        // Maybe rename it to something more appropriate?
        //
        // NOTE: `willReceiveNewContext` will be even more confusing because components provide an API to get current
        // context with `this.context`. `willReceiveNewProps` were changed to `didReceiveNewProps` to make it look like
        // this lifecycle method.

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
     * Lifecycle method `didMount` is invoked when component is mounted to the document.
     */
    didMount(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `didUnmount` is invoked when component is unmounted from the document.
     */
    didUnmount(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `willUpdate` is invoked before update.
     */
    willUpdate(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `updated` is invoked after update.
     */
    didUpdate(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }

    /**
     * Lifecycle method `didInvalidate` is invoked after `invalidate` method is invoked.
     */
    didInvalidate(): void {
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
        if (component.flags & ComponentFlags.Mounted) {
            component.flags |= dirtyFlags;
            component.didInvalidate();
            if (!(component.flags & ComponentFlags.InUpdateQueue)) {
                currentFrame().updateComponent(component);
            }
        }
    }
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

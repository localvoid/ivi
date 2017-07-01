import { NOOP_FALSE, isPropsNotShallowEqual } from "ivi-core";
import { VNode } from "./vnode";

/**
 * Component function constructor.
 */
export interface StatelessComponent<P = void> {
    (props: P): VNode<any>;
    isPropsChanged?: (oldProps: P, newProps: P) => boolean;
    shouldAugment?: (props: P) => boolean;
}

/**
 * Component class constructor.
 */
export interface ComponentClass<P = void> {
    new (props: P): Component<P>;
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
     * Component properties.
     */
    props: P;

    constructor(props: P) {
        this.props = props;
    }

    /**
     * Lifecycle method `isPropsChanged` is used as a hint that can reduce unnecessary updates.
     *
     * By default props checked by their identity.
     *
     * @param oldProps Old props.
     * @param newProps New props.
     * @returns `true` when props should be updated.
     */
    isPropsChanged(oldProps: P, newProps: P): boolean {
        return oldProps !== newProps;
    }

    abstract render(): VNode<any>;

    /**
     * Invalidate view.
     */
    invalidate(): void {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    }
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
export function checkPropsShallowEquality<P extends ComponentClass<any> | StatelessComponent<any>>(target: P): P {
    if (target.prototype.render === undefined) {
        (target as StatelessComponent<any>).isPropsChanged = isPropsNotShallowEqual;
    } else {
        target.prototype.isPropsChanged = isPropsNotShallowEqual;
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
export function staticComponent<P extends ComponentClass<any> | StatelessComponent<any>>(target: P): P {
    if (target.prototype.render === undefined) {
        (target as StatelessComponent<any>).isPropsChanged = NOOP_FALSE;
    } else {
        target.prototype.isPropsChanged = NOOP_FALSE;
    }
    return target;
}

export function isComponentClass(componentClass: any): componentClass is ComponentClass<any> {
    return componentClass.prototype.render !== undefined;
}

/**
 * Is component attached.
 *
 * @returns `true` when Component is attached.
 */
export function isComponentAttached(component: Component<any>): boolean {
    return false;
}

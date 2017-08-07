import { NOOP_FALSE, shallowEqual } from "ivi-core";
import { VNode } from "./vnode";

/**
 * Stateless Component function.
 */
export interface StatelessComponent<P = void> {
  (props: P): VNode<any>;
  isPropsChanged?: (oldProps: P, newProps: P) => boolean;
  shouldAugment?: (props: P) => boolean;
}

/**
 * Component class type.
 */
export interface ComponentClass<P = void> {
  new(props: P): Component<P>;
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
 *             return h.t(`Hello ${this.props}`);
 *         }
 *     }
 *     const hello = componentFactory(Hello);
 *
 *     render(hello("world"), document.getElementById("App")!);
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
    /**
     * Server-side components can't be invalidated.
     */
  }
}

function isPropsNotShallowEqual(a: any, b: any): boolean {
  return !shallowEqual(a, b);
}

/**
 * Checks props for shallow equality.
 *
 * This function can be used as a wrapper for function expression, or as a class decorator.
 *
 *     checkPropsShallowEquality(MyComponent);
 *     function MyComponent(props: { text: string }) {
 *         return h.div().children(props.text);
 *     });
 *
 *     @checkPropsShallowEquality
 *     class MyClassComponent extends Component<{ text: string }> {
 *         render() {
 *             return h.div().children(this.props.text);
 *         }
 *     }
 *
 * @param target Component constructor.
 * @returns Component constructor with identity check.
 */
export function checkPropsShallowEquality<P extends ComponentClass<any> | StatelessComponent<any>>(target: P): P {
  if (isComponentClass(target)) {
    target.prototype.isPropsChanged = isPropsNotShallowEqual;
  } else {
    (target as StatelessComponent<any>).isPropsChanged = isPropsNotShallowEqual;
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
 *         return h.div().children(props.text);
 *     });
 *
 *     @staticComponent
 *     class MyClassComponent extends Component<{ text: string }> {
 *         render() {
 *             return h.div().children(this.props.text);
 *         }
 *     }
 *
 * @param target Component constructor.
 * @returns Component constructor with static property.
 */
export function staticComponent<P extends ComponentClass<any> | StatelessComponent<any>>(target: P): P {
  if (isComponentClass(target)) {
    target.prototype.isPropsChanged = NOOP_FALSE;
  } else {
    (target as StatelessComponent<any>).isPropsChanged = NOOP_FALSE;
  }
  return target;
}

/**
 * isComponentClass returns `true` when object looks like a Component class.
 *
 * @param o Object.
 * @returns `true` when object looks like a Component class.
 */
export function isComponentClass(o: any): o is ComponentClass<any> {
  return o.prototype !== undefined && o.prototype.render !== undefined;
}

/**
 * isComponentAttached returns `true` when component is attached.
 *
 * @returns `true` when component is attached.
 */
export function isComponentAttached(component: Component<any>): boolean {
  return false;
}

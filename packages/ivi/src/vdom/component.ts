import { NOOP_FALSE, isPropsNotShallowEqual } from "ivi-core";
import { currentFrame } from "ivi-scheduler";
import { getFunctionName, nextDebugId } from "../dev_mode/dev_mode";
import { ComponentFlags } from "./flags";
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
   * Unique ID.
   *
   * ID generator is using `dev_mode.uniqueId()` function, so it will be unique across all Dev Mode ids.
   *
   * Dev Mode.
   */
  _debugId: number;

  constructor(props: P) {
    this.flags = 0;
    this.props = props;
    if (__IVI_DEV__) {
      this._debugId = nextDebugId();
    }
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

  abstract render(): VNode<any>;

  /**
   * Invalidate view.
   */
  invalidate(): void {
    this.flags |= ComponentFlags.DirtyState;
    this.invalidated();
    if ((this.flags & ComponentFlags.Attached) !== 0) {
      currentFrame().update();
    }
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

/**
 * Get component name from component instance or component function.
 *
 * @param component Component.
 * @return Component name.
 */
export function getComponentName(component: Component<any> | StatelessComponent<any>): string {
  return getFunctionName(
    (component as StatelessComponent<any>).prototype.render === undefined ?
      component as StatelessComponent<any> :
      (component as StatelessComponent<any>).constructor,
  );
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
  return (component.flags & ComponentFlags.Attached) !== 0;
}

import { currentFrameUpdate } from "ivi-scheduler";
import { getFunctionName } from "../dev_mode/dev_mode";
import { ComponentFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * Stateless Component function.
 */
export interface StatelessComponent<P = void> {
  render: (props: P) => VNode;
  isPropsChanged: ((oldProps: P, newProps: P) => boolean) | undefined;
}

/**
 * Component class type.
 */
export interface StatefulComponent<P = void> {
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
   * Flags, see `ComponentFlags` for details.
   *
   * Lowest 16 bits are reserved for ivi flags, other bits can be used for user flags.
   */
  flags: ComponentFlags;
  /**
   * Component properties.
   */
  props: P;

  constructor(props: P) {
    this.flags = 0;
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
   * Lifecycle method `updated` is invoked after update.
   *
   * @param localUpdates Update was caused by local updates.
   */
  updated(localUpdates: boolean): void {
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

  abstract render(): VNode;

  /**
   * Invalidate view.
   */
  invalidate(): void {
    this.flags |= ComponentFlags.DirtyState;
    this.invalidated();
    if ((this.flags & ComponentFlags.Attached) !== 0) {
      currentFrameUpdate();
    }
  }
}

/**
 * getComponentName retrieves component name from component instance or component function.
 *
 * @param component Component.
 * @return Component name.
 */
export function getComponentName(component: Component<any> | StatelessComponent<any>): string {
  return getFunctionName(
    isStatefulComponent(component) ?
      component.constructor :
      component.render,
  );
}

/**
 * isComponentClass returns `true` when object looks like a Component class.
 *
 * @param o Object.
 * @returns `true` when object looks like a Component class.
 */
export function isStatefulComponent(o: any): o is StatefulComponent<any> {
  return o.prototype !== undefined && o.prototype.render !== undefined;
}

/**
 * isComponentAttached returns `true` when component is attached.
 *
 * @returns `true` when component is attached.
 */
export function isComponentAttached(component: Component<any>): boolean {
  return (component.flags & ComponentFlags.Attached) !== 0;
}

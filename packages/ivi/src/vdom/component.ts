import { currentFrameUpdate } from "ivi-scheduler";
import { ComponentFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * Stateless Component descriptor.
 */
export interface StatelessComponent<P = undefined> {
  render: (props: P) => VNode;
  shouldUpdate: ((oldProps: P, newProps: P) => boolean) | undefined;
}

/**
 * Stateful Component class interface.
 */
export interface StatefulComponent<P = undefined> {
  new(props: P): Component<P>;
}

/**
 * Component is a base class for stateful components.
 *
 * Component class has a parametric type `P` to specify `props` type.
 *
 * Example:
 *
 *     const Hello = component(class extends Component<string> {
 *       render() {
 *         return h.t(`Hello ${this.props}`);
 *       }
 *     });
 *
 *     render(Hello("world"), document.getElementById("App")!);
 */
export abstract class Component<P = undefined> {
  /**
   * Flags, see `ComponentFlags` for details.
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
   * Lifecycle method `shouldUpdate` is used as a hint to reduce unnecessary updates.
   *
   * @param oldProps Old props.
   * @param newProps New props.
   * @returns `true` when changes in props should trigger update.
   */
  shouldUpdate(oldProps: P, newProps: P): boolean {
    return oldProps !== newProps;
  }

  /**
   * Lifecycle method `updated` is invoked after update.
   *
   * @param local `true` when update was caused by local changes.
   */
  updated(local: boolean): void {
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
    if ((this.flags & ComponentFlags.Detached) === 0) {
      currentFrameUpdate();
    }
  }
}

/**
 * isComponentAttached returns `true` when component is attached.
 *
 * @returns `true` when component is attached.
 */
export function isComponentAttached(component: Component<any>): boolean {
  return (component.flags & ComponentFlags.Detached) === 0;
}

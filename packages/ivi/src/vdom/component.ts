import { currentFrameUpdate } from "ivi-scheduler";
import { ComponentFlags } from "./flags";
import { VNode } from "./vnode";

/**
 * Stateless Component descriptor.
 */
export interface StatelessComponent<P = undefined> {
  /**
   * Lifecycle hook `render()` should return virtual DOM representation or the component.
   *
   * @param props - Properties
   * @returns Virtual DOM representation
   */
  render(props: P): VNode;

  /**
   * Lifecycle hook `shouldUpdate()` is used as a hint to reduce unnecessary updates.
   *
   * @param prev - Previous properties
   * @param next - Next properties
   * @returns `true` when changes in props should trigger update
   */
  shouldUpdate: ((prev: P, next: P) => boolean) | null;
}

/**
 * Stateful Component class interface.
 */
export interface StatefulComponent<P = undefined> {
  new(props: P): Component<P>;
}

/**
 * Base class for stateful components.
 *
 * Component class has a parametric type `P` to specify `props` type.
 *
 * @example
 *
 *     const Hello = statefulComponent(class extends Component<string> {
 *       render() {
 *         return div().c(`Hello ${this.props}`);
 *       }
 *     });
 *
 *     render(
 *       Hello("World!"),
 *       document.getElementById("app")!,
 *     );
 */
export abstract class Component<P = undefined> {
  /**
   * Flags, see {@link ComponentFlags} for details.
   */
  flags: ComponentFlags;
  /**
   * Component properties.
   */
  props: P;

  /**
   * Component constructor.
   *
   * Components are instantiated by a virtual DOM engine.
   *
   * @param props - Properties
   */
  constructor(props: P) {
    this.flags = 0;
    this.props = props;
  }

  /**
   * Lifecycle method `propsChanged()` when props are changed.
   *
   * @param prev - Previous properties
   * @param next - Next properties
   */
  propsChanged(prev: P, next: P): void {
    /* tslint:disable:no-empty */
    /* tslint:enable:no-empty */
  }

  /**
   * Lifecycle method `attached()` is invoked when component is attached to the document.
   */
  attached(): void {
    /* tslint:disable:no-empty */
    /* tslint:enable:no-empty */
  }

  /**
   * Lifecycle method `detached()` is invoked when component is detached from the document.
   */
  detached(): void {
    /* tslint:disable:no-empty */
    /* tslint:enable:no-empty */
  }

  /**
   * Lifecycle method `shouldUpdate()` is used as a hint to reduce unnecessary updates.
   *
   * @param prev - Previous properties
   * @param next - Next properties
   * @returns `true` when changes in props should trigger update
   */
  shouldUpdate(prev: P, next: P): boolean {
    return prev !== next;
  }

  /**
   * Lifecycle method `updated()` is invoked after update.
   */
  updated(): void {
    /* tslint:disable:no-empty */
    /* tslint:enable:no-empty */
  }

  /**
   * Lifecycle method `invalidated()` is invoked after `invalidate()` method is invoked.
   */
  invalidated(): void {
    /* tslint:disable:no-empty */
    /* tslint:enable:no-empty */
  }

  /**
   * Lifecycle method `render()` should return virtual DOM representation of the component.
   *
   * @returns Virtual DOM representation
   */
  abstract render(): VNode;

  /**
   * Triggers view invalidation.
   */
  invalidate(): void {
    this.flags |= ComponentFlags.DirtyState;
    this.invalidated();
    currentFrameUpdate();
  }
}

/**
 * `isComponentAttached()` returns `true` when component is attached.
 *
 * @returns `true` when component is attached.
 */
export function isComponentAttached(component: Component<any>): boolean {
  return (component.flags & ComponentFlags.Detached) === 0;
}

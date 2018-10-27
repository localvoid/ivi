import { VNode } from "./vnode";

export type ComponentHook = () => void;

export interface ComponentHandle<P = any> {
  dirty: boolean;
  render: null | ((props: P) => VNode);
  detached: null | ComponentHook | ComponentHook[];
}

export function detached<P>(h: ComponentHandle<P>, hook: ComponentHook): void {
  const hooks = h.detached;
  if (hooks === null) {
    h.detached = hook;
  } else if (typeof hooks === "function") {
    h.detached = [hooks, hook];
  } else {
    hooks.push(hook);
  }
}

/**
 * Component Descriptor.
 */
export interface ComponentDescriptor<P = any> {
  /**
   * Lifecycle hook `render()`.
   */
  render: ((h: ComponentHandle<P>) => (props: P) => VNode) | ((props: P) => VNode);

  /**
   * Lifecycle hook `shouldUpdate()` is used as a hint to reduce unnecessary updates.
   *
   * @param prev - Previous properties
   * @param next - Next properties
   * @returns `true` when changes in props should trigger update
   */
  shouldUpdate: null | ((prev: P, next: P) => boolean);

  /**
   * Lifecycle hook `select()`.
   */
  select: null | Function;
}

export type ConnectorState = any;

export interface ConnectedDescriptor<T = any, P = any, C = any> extends ComponentDescriptor<P> {
  /**
   * Lifecycle hook `select()`.
   *
   * @param prev - Previous selected state
   * @param props - Properties
   * @param context - Current context
   * @returns Current selected state
   */
  select(prev: T | null, props: P, context: C): T;
}

/**
 * Component Descriptor.
 */
export interface StatefulComponentDescriptor<P = any> extends ComponentDescriptor<P> {
  /**
   * Render hook.
   */
  render(h: ComponentHandle<P>): (props: P) => VNode;
}

/**
 * Component Descriptor.
 */
export interface StatelessComponentDescriptor<P = any> extends ComponentDescriptor<P> {
  /**
   * Render hook.
   */
  render(props: P): VNode;
}

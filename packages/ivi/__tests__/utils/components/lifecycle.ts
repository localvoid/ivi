import { Component, componentFactory, VNode } from "../../../src";
import * as h from "../html";
import { lifecycleTouch } from "../lifecycle";

export interface ComponentHooks<P> {
  construct?: (
    this: Component<P>,
    props: P,
  ) => void;
  isPropsChanged?: (
    this: Component<P>,
    oldProps: P,
    newProps: P,
  ) => boolean;
  newPropsReceived?: (
    this: Component<P>,
    oldProps: P,
    newProps: P,
  ) => void;
  attached?: (this: Component<P>) => void;
  detached?: (this: Component<P>) => void;
  beforeUpdate?: (this: Component<P>) => void;
  updated?: (this: Component<P>) => void;
  invalidated?: (this: Component<P>) => void;
  render?: (this: Component<P>) => VNode<any>;
  shouldAugment?: (this: Component<P>) => boolean;
}

export interface LifecycleTesterProps {
  id: string;
  child: VNode<any>;
  hooks: ComponentHooks<LifecycleTesterProps>;
}

export class LifecycleTester extends Component<LifecycleTesterProps> {
  constructor(props: LifecycleTesterProps) {
    super(props);
    lifecycleTouch(props.id, "constructor");
    if (props.hooks.construct) {
      props.hooks.construct.call(this, props);
    }
  }

  isPropsChanged(oldProps: LifecycleTesterProps, newProps: LifecycleTesterProps): boolean {
    lifecycleTouch(newProps.id, "isPropsChanged");
    if (newProps.hooks.isPropsChanged) {
      return newProps.hooks.isPropsChanged.call(this, oldProps, newProps);
    }
    return true;
  }

  newPropsReceived(oldProps: LifecycleTesterProps, newProps: LifecycleTesterProps): void {
    lifecycleTouch(newProps.id, "newPropsReceived");
    if (newProps.hooks.newPropsReceived) {
      newProps.hooks.newPropsReceived.call(this, oldProps, newProps);
    }
  }

  attached(): void {
    lifecycleTouch(this.props.id, "attached");
    if (this.props.hooks.attached) {
      this.props.hooks.attached.call(this);
    }
  }

  detached(): void {
    lifecycleTouch(this.props.id, "detached");
    if (this.props.hooks.detached) {
      this.props.hooks.detached.call(this);
    }
  }

  beforeUpdate(): void {
    lifecycleTouch(this.props.id, "beforeUpdate");
    if (this.props.hooks.beforeUpdate) {
      this.props.hooks.beforeUpdate.call(this);
    }
  }

  updated(): void {
    lifecycleTouch(this.props.id, "updated");
    if (this.props.hooks.updated) {
      this.props.hooks.updated.call(this);
    }
  }

  invalidated(): void {
    lifecycleTouch(this.props.id, "invalidated");
    if (this.props.hooks.invalidated) {
      this.props.hooks.invalidated.call(this);
    }
  }

  render() {
    lifecycleTouch(this.props.id, "render");
    if (this.props.hooks.render) {
      return this.props.hooks.render.call(this);
    }
    return this.props.child;
  }

  shouldAugment() {
    lifecycleTouch(this.props.id, "shouldAugment");
    if (this.props.hooks.shouldAugment) {
      return this.props.hooks.shouldAugment.call(this);
    }
    return true;
  }
}

export const lifecycleTester = componentFactory(LifecycleTester);

export function $lc(
  id: string,
  hooks?: ComponentHooks<LifecycleTesterProps>,
): VNode<LifecycleTesterProps>;
export function $lc(
  id: string,
  child?: VNode<any>,
): VNode<LifecycleTesterProps>;
export function $lc(
  id: string,
  hooks: ComponentHooks<LifecycleTesterProps>,
  child?: VNode<any>,
): VNode<LifecycleTesterProps>;
export function $lc(
  id: string,
  p1?: ComponentHooks<LifecycleTesterProps> | VNode<any>,
  p2?: VNode<any>,
): VNode<LifecycleTesterProps> {
  if (arguments.length === 3) {
    return lifecycleTester({
      id: id,
      child: p2 as VNode<any>,
      hooks: p1 as ComponentHooks<LifecycleTesterProps>,
    });
  } else if (arguments.length === 2) {
    if (p1!.constructor === VNode) {
      return lifecycleTester({
        id: id,
        child: p1 as VNode<any>,
        hooks: {},
      });
    }
    return lifecycleTester({
      id: id,
      child: h.t(""),
      hooks: p1 as ComponentHooks<LifecycleTesterProps>,
    });
  }
  return lifecycleTester({
    id: id,
    child: h.t(""),
    hooks: {},
  });
}

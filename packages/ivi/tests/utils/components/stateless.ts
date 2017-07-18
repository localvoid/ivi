import { StatelessComponent, componentFactory, VNode } from "../../../src";
import * as h from "../html";

export interface TestStatelessComponentHooks<P> {
  render?: (props: P) => VNode<any>;
  isPropsChanged?: (oldProps: P, newProps: P) => boolean;
  shouldAugment?: (props: P) => boolean;
}

export interface TestStatelessComponentProps {
  id: string;
  child: VNode<any>;
  hooks: TestStatelessComponentHooks<TestStatelessComponentProps>;
}

export function TestStatelessComponent(props: TestStatelessComponentProps) {
  if (props.hooks.render) {
    return props.hooks.render(props);
  }

  return props.child;
}
export const testStatelessComponent = componentFactory(TestStatelessComponent);

(TestStatelessComponent as StatelessComponent<TestStatelessComponentProps>).isPropsChanged = function (
  oldProps: TestStatelessComponentProps,
  newProps: TestStatelessComponentProps,
) {
  if (newProps.hooks.isPropsChanged) {
    return newProps.hooks.isPropsChanged(oldProps, newProps);
  }
  return true;
};

(TestStatelessComponent as StatelessComponent<TestStatelessComponentProps>).shouldAugment = function (
  props: TestStatelessComponentProps,
) {
  if (props.hooks.shouldAugment) {
    return props.hooks.shouldAugment(props);
  }
  return true;
};

export function $tfc(
  id: string,
  hooks?: TestStatelessComponentHooks<TestStatelessComponentProps>,
): VNode<TestStatelessComponentProps>;
export function $tfc(
  id: string,
  child?: VNode<any>,
): VNode<TestStatelessComponentProps>;
export function $tfc(
  id: string,
  hooks: TestStatelessComponentHooks<TestStatelessComponentProps>,
  child?: VNode<any>,
): VNode<TestStatelessComponentProps>;
export function $tfc(
  id: string,
  p1?: TestStatelessComponentHooks<TestStatelessComponentProps> | VNode<any>,
  p2?: VNode<any>,
): VNode<TestStatelessComponentProps> {
  if (arguments.length === 3) {
    return testStatelessComponent({
      id: id,
      child: p2 as VNode<any>,
      hooks: p1 as TestStatelessComponentHooks<TestStatelessComponentProps>,
    });
  } else if (arguments.length === 2) {
    if (p1!.constructor === VNode) {
      return testStatelessComponent({
        id: id,
        child: p1 as VNode<any>,
        hooks: {},
      });
    }
    return testStatelessComponent({
      id: id,
      child: h.t(""),
      hooks: p1 as TestStatelessComponentHooks<TestStatelessComponentProps>,
    });
  }
  return testStatelessComponent({
    id: id,
    child: h.t(""),
    hooks: {},
  });
}

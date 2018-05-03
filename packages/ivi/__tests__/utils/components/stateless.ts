import { VNode } from "../../../src/vdom/vnode";
import { statelessComponentFactory } from "../../../src/vdom/vnode_factories";
import * as h from "../html";

export interface TestStatelessComponentHooks<P> {
  render?: (props: P) => VNode;
  isPropsChanged?: (oldProps: P, newProps: P) => boolean;
}

export interface TestStatelessComponentProps {
  id: string;
  child: VNode;
  hooks: TestStatelessComponentHooks<TestStatelessComponentProps>;
}

export const testStatelessComponent = statelessComponentFactory<TestStatelessComponentProps>(
  (props) => {
    if (props.hooks.render) {
      return props.hooks.render(props);
    }
    return props.child;
  },
  (oldProps, newProps) => {
    if (newProps.hooks.isPropsChanged) {
      return newProps.hooks.isPropsChanged(oldProps, newProps);
    }
    return true;
  },
);

export const staticComponent = statelessComponentFactory<VNode>((child) => child, () => false);

export function $tfc(
  id: string,
  hooks?: TestStatelessComponentHooks<TestStatelessComponentProps>,
): VNode<TestStatelessComponentProps>;
export function $tfc(
  id: string,
  child?: VNode,
): VNode<TestStatelessComponentProps>;
export function $tfc(
  id: string,
  hooks: TestStatelessComponentHooks<TestStatelessComponentProps>,
  child?: VNode,
): VNode<TestStatelessComponentProps>;
export function $tfc(
  id: string,
  p1?: TestStatelessComponentHooks<TestStatelessComponentProps> | VNode,
  p2?: VNode,
): VNode<TestStatelessComponentProps> {
  if (arguments.length === 3) {
    return testStatelessComponent({
      id: id,
      child: p2 as VNode,
      hooks: p1 as TestStatelessComponentHooks<TestStatelessComponentProps>,
    });
  } else if (arguments.length === 2) {
    if (p1!.constructor === VNode) {
      return testStatelessComponent({
        id: id,
        child: p1 as VNode,
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

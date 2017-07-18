import { Component, componentFactory, VNode } from "../../src";
import * as h from "./html";

export * from "./components/stateless";
export * from "./components/lifecycle";
export * from "./components/static";

export interface ComponentTesterProps {
  child: VNode<any>;
  wrapDepth?: number;
}

export function StatelessComponentTester(props: ComponentTesterProps): VNode<any> {
  if (props.wrapDepth) {
    return statelessComponentTester({
      child: props.child,
      wrapDepth: props.wrapDepth - 1,
    });
  }

  return props.child;
}
export const statelessComponentTester = componentFactory(StatelessComponentTester);

export class ComponentTester extends Component<ComponentTesterProps> {
  render(): VNode<any> {
    if (this.props.wrapDepth) {
      return componentTester({
        child: this.props.child,
        wrapDepth: this.props.wrapDepth - 1,
      });
    }

    return this.props.child;
  }
}
export const componentTester = componentFactory(ComponentTester);

export function $tcf(
  child: VNode<any> | string = h.div(),
  wrapDepth = 0,
): VNode<ComponentTesterProps> {
  return statelessComponentTester({
    child: typeof child === "string" ? h.t(child) : child,
    wrapDepth: wrapDepth,
  });
}

export function $tc(
  child: VNode<any> | string = h.div(),
  wrapDepth = 0,
): VNode<ComponentTesterProps> {
  return componentTester({
    child: typeof child === "string" ? h.t(child) : child,
    wrapDepth: wrapDepth,
  });
}

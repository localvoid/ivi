import { Component } from "../../src/vdom/component";
import { VNode } from "../../src/vdom/vnode";
import { statelessComponentFactory, componentFactory } from "../../src/vdom/vnode_factories";
import * as h from "./html";

export * from "./components/stateless";
export * from "./components/lifecycle";

export interface ComponentTesterProps {
  child: VNode;
  wrapDepth?: number;
}

export const statelessComponentTester = statelessComponentFactory(
  function StatelessComponentTester(props: ComponentTesterProps): VNode {
    if (props.wrapDepth) {
      return statelessComponentTester({
        child: props.child,
        wrapDepth: props.wrapDepth - 1,
      });
    }

    return props.child;
  },
);

export class ComponentTester extends Component<ComponentTesterProps> {
  render(): VNode {
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
  child: VNode | string = h.div(),
  wrapDepth = 0,
) {
  return statelessComponentTester({
    child: typeof child === "string" ? h.t(child) : child,
    wrapDepth: wrapDepth,
  });
}

export function $tc(
  child: VNode | string = h.div(),
  wrapDepth = 0,
) {
  return componentTester({
    child: typeof child === "string" ? h.t(child) : child,
    wrapDepth: wrapDepth,
  });
}

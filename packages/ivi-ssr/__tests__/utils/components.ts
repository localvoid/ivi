import { Context } from "ivi-core";
import { Component } from "../../src/component";
import { VNode } from "../../src/vnode";
import { componentFactory, connect } from "../../src/vnode_factories";

export class RenderChild extends Component<VNode<any>> {
  render() {
    return this.props;
  }
}
export const rc = componentFactory(RenderChild);

export function StatelessRenderChild(child: VNode<any>) {
  return child;
}
export const src = componentFactory(StatelessRenderChild);

/**
 * Child from context.
 */
export const cc = connect(
  function (props: { child: VNode<any> }) {
    return props.child;
  },
  function (prev, props, context: Context<{ child: VNode<any> }>) {
    const child = context.child;
    if (prev && prev.child === child) {
      return prev;
    }
    return { child };
  },
);

/**
 * Child from props.
 */
export const ccp = connect(
  function (props: { child: VNode<any> }) {
    return props.child;
  },
  function (prev, child: VNode<any>) {
    return { child };
  },
);

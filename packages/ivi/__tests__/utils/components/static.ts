import { Component, staticComponent as sc, componentFactory, VNode } from "../../../src";

sc(StaticStatelessComponen);
export function StaticStatelessComponen(child: VNode) {
  return child;
}
export const staticComponentFunction = componentFactory(StaticStatelessComponen);

export class StaticComponent extends Component<VNode> {
  render() {
    return this.props;
  }
}
sc(StaticComponent);

export const staticComponent = componentFactory(StaticComponent);

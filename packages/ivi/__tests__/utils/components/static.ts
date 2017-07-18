import { Component, staticComponent as sc, componentFactory, VNode } from "../../../src";

sc(StaticStatelessComponen);
export function StaticStatelessComponen(child: VNode<any>) {
  return child;
}
export const staticComponentFunction = componentFactory(StaticStatelessComponen);

export class StaticComponent extends Component<VNode<any>> {
  render() {
    return this.props;
  }
}
sc(StaticComponent);

export const staticComponent = componentFactory(StaticComponent);

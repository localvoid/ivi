import { Component, staticComponent } from "../../../src/vdom/component";
import { VNode } from "../../../src/vdom/vnode";
import { $c } from "../../../src/vdom/vnode_components";

staticComponent(StaticComponentFunctionTest);
export function StaticComponentFunctionTest(child: VNode<any>) {
    return child;
}

export class StaticComponentTest extends Component<VNode<any>> {
    render() {
        return this.props;
    }
}
staticComponent(StaticComponentTest);

export function $sc(c: VNode<any>): VNode<VNode<any>> {
    return $c(StaticComponentTest, c);
}

export function $fsc(c: VNode<any>): VNode<VNode<any>> {
    return $c(StaticComponentFunctionTest, c);
}

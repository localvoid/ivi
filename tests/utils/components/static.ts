import { IVNode } from "../../../src/vdom/ivnode";
import { Component, staticComponent } from "../../../src/vdom/component";
import { VNode, $c } from "../../../src/vdom/vnode";

staticComponent(StaticComponentFunctionTest);
export function StaticComponentFunctionTest(child: IVNode<any>) {
    return child;
}

export class StaticComponentTest extends Component<IVNode<any>> {
    render() {
        return this.props;
    }
}
staticComponent(StaticComponentTest);

export function $sc(c: IVNode<any>): VNode<IVNode<any>> {
    return $c(StaticComponentTest, c);
}

export function $fsc(c: IVNode<any>): VNode<IVNode<any>> {
    return $c(StaticComponentFunctionTest, c);
}

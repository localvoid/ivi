export * from "./components/functional";
export * from "./components/lifecycle";
export * from "./components/static";
export * from "./components/invalid";

import { IVNode } from "../../src/vdom/ivnode";
import { VNode, $h, $t } from "../../src/vdom/vnode";
import { $c } from "../../src/vdom/vnode_components";
import { Component } from "../../src/vdom/component";

export interface TestComponentProps {
    child: IVNode<any>;
    wrapDepth?: number;
}

export function TestComponentFunction(props: TestComponentProps): IVNode<any> {
    if (props.wrapDepth) {
        return $c(TestComponentFunction, {
            child: props.child,
            wrapDepth: props.wrapDepth - 1,
        });
    }

    return props.child;
}

export class TestComponent extends Component<TestComponentProps> {
    render(): IVNode<any> {
        if (this.props.wrapDepth) {
            return $c(TestComponent, {
                child: this.props.child,
                wrapDepth: this.props.wrapDepth - 1,
            });
        }

        return this.props.child;
    }
}

export function $tcf(
    child: IVNode<any> | string = $h("div"),
    wrapDepth = 0,
): VNode<TestComponentProps> {
    return $c(TestComponentFunction, {
        child: typeof child === "string" ? $t(child) : child,
        wrapDepth: wrapDepth,
    });
}

export function $tc(
    child: IVNode<any> | string = $h("div"),
    wrapDepth = 0,
): VNode<TestComponentProps> {
    return $c(TestComponent, {
        child: typeof child === "string" ? $t(child) : child,
        wrapDepth: wrapDepth,
    });
}

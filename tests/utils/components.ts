export * from "./components/functional";
export * from "./components/lifecycle";
export * from "./components/static";

import { VNode } from "../../src/vdom/vnode";
import { $h, $t } from "../../src/vdom/vnode_dom";
import { $c } from "../../src/vdom/vnode_components";
import { Component } from "../../src/vdom/component";

export interface TestComponentProps {
    child: VNode<any>;
    wrapDepth?: number;
}

export function TestComponentFunction(props: TestComponentProps): VNode<any> {
    if (props.wrapDepth) {
        return $c(TestComponentFunction, {
            child: props.child,
            wrapDepth: props.wrapDepth - 1,
        });
    }

    return props.child;
}

export class TestComponent extends Component<TestComponentProps> {
    render(): VNode<any> {
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
    child: VNode<any> | string = $h("div"),
    wrapDepth = 0,
): VNode<TestComponentProps> {
    return $c(TestComponentFunction, {
        child: typeof child === "string" ? $t(child) : child,
        wrapDepth: wrapDepth,
    });
}

export function $tc(
    child: VNode<any> | string = $h("div"),
    wrapDepth = 0,
): VNode<TestComponentProps> {
    return $c(TestComponent, {
        child: typeof child === "string" ? $t(child) : child,
        wrapDepth: wrapDepth,
    });
}

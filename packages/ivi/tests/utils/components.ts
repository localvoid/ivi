export * from "./components/functional";
export * from "./components/lifecycle";
export * from "./components/static";

import { VNode } from "../../src/vdom/vnode";
import { component, statelessComponent } from "../../src/vdom/vnode_factories";
import { Component } from "../../src/vdom/component";
import { html, text } from "./vdom";

export interface TestComponentProps {
    child: VNode<any>;
    wrapDepth?: number;
}

export function TestComponentFunction(props: TestComponentProps): VNode<any> {
    if (props.wrapDepth) {
        return statelessComponent(TestComponentFunction, {
            child: props.child,
            wrapDepth: props.wrapDepth - 1,
        });
    }

    return props.child;
}

export class TestComponent extends Component<TestComponentProps> {
    render(): VNode<any> {
        if (this.props.wrapDepth) {
            return component(TestComponent, {
                child: this.props.child,
                wrapDepth: this.props.wrapDepth - 1,
            });
        }

        return this.props.child;
    }
}

export function $tcf(
    child: VNode<any> | string = html("div"),
    wrapDepth = 0,
): VNode<TestComponentProps> {
    return statelessComponent(TestComponentFunction, {
        child: typeof child === "string" ? text(child) : child,
        wrapDepth: wrapDepth,
    });
}

export function $tc(
    child: VNode<any> | string = html("div"),
    wrapDepth = 0,
): VNode<TestComponentProps> {
    return component(TestComponent, {
        child: typeof child === "string" ? text(child) : child,
        wrapDepth: wrapDepth,
    });
}

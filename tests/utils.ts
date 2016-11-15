import { setInitialNestingState } from "../src/common/html_nesting_rules";
import { VNode } from "../src/vdom/vnode";
import { VNodeFlags } from "../src/vdom/flags";
import { $h, $c } from "../src/vdom/vnode_builder";
import { ROOT_CONTEXT } from "../src/vdom/context";
import { Context } from "../src/vdom/context";
import { Component } from "../src/vdom/component";
import { renderVNode, syncVNode, augmentVNode } from "../src/vdom/implementation";

const expect = chai.expect;

export function frag() {
    return document.createDocumentFragment();
}

export function checkRefs(n: Node, v: VNode<any>) {
    const flags = v._flags;

    expect(v._dom).to.equal(n);

    if (flags & VNodeFlags.Component) {
        if (flags & VNodeFlags.ComponentClass) {
            const component = (v._children as Component<any>);
            expect(component._parentDOMNode).to.equal(n.parentNode);
            expect(component._rootDOMNode).to.equal(n);
            const root = component.root;
            if (root) {
                checkRefs(n, root!);
            }
        } else {
            const root = v._children as VNode<any>;
            if (root) {
                checkRefs(n, root!);
            }
        }
    } else {
        let i = 0;
        let child = n.firstChild;
        if (child) {
            expect(!!(flags & VNodeFlags.Element)).to.true;
        }
        while (child) {
            if (flags & VNodeFlags.ChildrenArray) {
                checkRefs(child, (v._children as VNode<any>[])[i++]);
            } else if (flags & VNodeFlags.ChildrenVNode) {
                checkRefs(child, v._children as VNode<any>);
                expect(child.nextSibling).to.null;
            }
            child = child.nextSibling;
        }
    }
}

export function render<T extends Node>(
    node: VNode<any>,
    container?: Element | DocumentFragment,
    disableCheckRefs?: boolean,
): T {
    if (!container) {
        container = document.createDocumentFragment();
    }

    const oldRoot = (container as any).__ivi_root as VNode<any> | undefined;
    (container as any).__ivi_root = node;
    const result = (oldRoot ?
        syncVNode(container, oldRoot, node, ROOT_CONTEXT) :
        renderVNode(container, null, node, ROOT_CONTEXT)) as T;

    if (!disableCheckRefs) {
        checkRefs(result, node);
    }

    return result;
}

export function augment(node: VNode<any>, innerHTML: string, container?: Element): Element {
    if (!container) {
        container = document.createElement("div");
    }
    if ((container as Element).tagName) {
        setInitialNestingState((container as Element).tagName.toLowerCase(), 0);
    } else {
        setInitialNestingState("", 0);
    }

    (container as any).__ivi_root = node;
    container.innerHTML = innerHTML;
    augmentVNode(container, container.firstChild, node, ROOT_CONTEXT);
    checkRefs(container.firstChild!, node);

    return container;
}

export interface TestComponentOptions {
    returnUndefined?: boolean;
    wrapDepth?: number;
}

export class TestComponent extends Component<TestComponentOptions> {
    render(): VNode<any> | undefined {
        const { returnUndefined, wrapDepth } = this.props;

        if (wrapDepth) {
            return $c(TestComponent, {
                returnUndefined,
                wrapDepth: wrapDepth - 1,
            });
        }
        if (returnUndefined) {
            return;
        }

        return $h("div");
    }
}

export function TestComponentFunction(props: TestComponentOptions): VNode<any> | undefined {
    const { returnUndefined, wrapDepth } = props;

    if (wrapDepth) {
        return $c(TestComponent, {
            returnUndefined,
            wrapDepth: wrapDepth - 1,
        });
    }

    if (returnUndefined) {
        return;
    }

    return $h("div");
}

export class LifecycleCounter {
    value: number;

    constructor() {
        this.value = 0;
    }
}

export class LifecycleMonitor {
    counter: LifecycleCounter;
    construct: number;
    init: number;
    isPropsChanged: number;
    didReceiveNewProps: number;
    didReceiveNewContext: number;
    updateContext: number;
    didMount: number;
    didUnmount: number;
    willUpdate: number;
    didUpdate: number;
    didInvalidate: number;
    render: number;

    constructor(counter: LifecycleCounter) {
        this.counter = counter;
        this.construct = -1;
        this.init = -1;
        this.isPropsChanged = -1;
        this.didReceiveNewProps = -1;
        this.didReceiveNewContext = -1;
        this.updateContext = -1;
        this.didMount = -1;
        this.didUnmount = -1;
        this.willUpdate = -1;
        this.didUpdate = -1;
        this.didInvalidate = -1;
        this.render = -1;
    }

    touch(name: "construct" | "init" | "isPropsChanged" | "didReceiveNewProps" | "didReceiveNewContext" |
        "updateContext" | "didMount" | "didUnmount" | "willUpdate" | "didUpdate" | "didInvalidate" | "render"): void {

        switch (name) {
            case "construct":
                this.construct = this.counter.value++;
                break;
            case "isPropsChanged":
                this.isPropsChanged = this.counter.value++;
                break;
            case "didReceiveNewProps":
                this.didReceiveNewProps = this.counter.value++;
                break;
            case "didReceiveNewContext":
                this.didReceiveNewContext = this.counter.value++;
                break;
            case "updateContext":
                this.updateContext = this.counter.value++;
                break;
            case "didMount":
                this.didMount = this.counter.value++;
                break;
            case "didUnmount":
                this.didUnmount = this.counter.value++;
                break;
            case "willUpdate":
                this.willUpdate = this.counter.value++;
                break;
            case "didUpdate":
                this.didUpdate = this.counter.value++;
                break;
            case "didInvalidate":
                this.didInvalidate = this.counter.value++;
                break;
            case "render":
                this.render = this.counter.value++;
                break;
        }
    }
}

export interface LifecycleTestComponentProps {
    child: VNode<any> | undefined;
    monitor: LifecycleMonitor;
}

export class LifecycleTestComponent extends Component<LifecycleTestComponentProps> {
    constructor(props: LifecycleTestComponentProps, context: Context, owner: Component<any>) {
        super(props, context, owner);
        props.monitor.touch("construct");
    }

    isPropsChanged(oldProps: LifecycleTestComponentProps, newProps: LifecycleTestComponentProps): boolean {
        this.props.monitor.touch("isPropsChanged");
        return true;
    }

    didReceiveNewProps(oldProps: LifecycleTestComponentProps, newProps: LifecycleTestComponentProps): void {
        this.props.monitor.touch("didReceiveNewProps");
    }

    didReceiveNewContext(oldContext: Context, newContext: Context): void {
        this.props.monitor.touch("didReceiveNewContext");
    }

    updateContext<C>(): C | undefined {
        this.props.monitor.touch("updateContext");
        return;
    }

    didMount(): void {
        this.props.monitor.touch("didMount");
    }

    didUnmount(): void {
        this.props.monitor.touch("didUnmount");
    }

    willUpdate(): void {
        this.props.monitor.touch("willUpdate");
    }

    didUpdate(): void {
        this.props.monitor.touch("didUpdate");
    }

    didInvalidate(): void {
        this.props.monitor.touch("didInvalidate");
    }

    render() {
        const { child, monitor } = this.props;
        monitor.touch("render");
        return child;
    }
}

export class StaticComponentTest extends Component<VNode<any>> {
    isPropsChanged(_oldProps: VNode<any>, _newProps: VNode<any>) {
        return false;
    }

    render() {
        return this.props;
    }
}

import { setInitialNestingState } from "../src/dev_mode/html_nesting_rules";
import { VNode, getDOMInstanceFromVNode } from "../src/vdom/vnode";
import { VNodeFlags } from "../src/vdom/flags";
import { $h, $c } from "../src/vdom/vnode_builder";
import { ROOT_CONTEXT } from "../src/vdom/context";
import { Context } from "../src/vdom/context";
import { Component, getDOMInstanceFromComponent, staticComponent } from "../src/vdom/component";
import { renderVNode, syncVNode, augmentVNode } from "../src/vdom/implementation";

const expect = chai.expect;

export function frag() {
    return document.createDocumentFragment();
}

export function checkRefs(n: Node, v: VNode<any>) {
    const flags = v._flags;

    expect(getDOMInstanceFromVNode(v)).to.equal(n);

    if (flags & VNodeFlags.Component) {
        if (flags & VNodeFlags.ComponentClass) {
            const component = (v._instance as Component<any>);
            expect(component._parentDOMNode).to.equal(n.parentNode);
            expect(getDOMInstanceFromComponent(component)).to.equal(n);
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
    if (oldRoot) {
        syncVNode(container, oldRoot, node, ROOT_CONTEXT);
    } else {
        renderVNode(container, null, node, ROOT_CONTEXT);
    }

    const result = getDOMInstanceFromVNode(node) as T;

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
        return $c(TestComponentFunction, {
            returnUndefined,
            wrapDepth: wrapDepth - 1,
        });
    }

    if (returnUndefined) {
        return;
    }

    return $h("div");
}

export function TestComponentFunctionWrapper(props: VNode<any>): VNode<any> {
    return props;
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
    newPropsReceived: number;
    newContextReceived: number;
    updateContext: number;
    attached: number;
    detached: number;
    beforeUpdate: number;
    updated: number;
    invalidated: number;
    render: number;

    constructor(counter: LifecycleCounter) {
        this.counter = counter;
        this.construct = -1;
        this.init = -1;
        this.isPropsChanged = -1;
        this.newPropsReceived = -1;
        this.newContextReceived = -1;
        this.updateContext = -1;
        this.attached = -1;
        this.detached = -1;
        this.beforeUpdate = -1;
        this.updated = -1;
        this.invalidated = -1;
        this.render = -1;
    }

    touch(name: "construct" | "init" | "isPropsChanged" | "newPropsReceived" | "newContextReceived" |
        "updateContext" | "attached" | "detached" | "beforeUpdate" | "updated" | "invalidated" | "render"): void {

        switch (name) {
            case "construct":
                this.construct = this.counter.value++;
                break;
            case "isPropsChanged":
                this.isPropsChanged = this.counter.value++;
                break;
            case "newPropsReceived":
                this.newPropsReceived = this.counter.value++;
                break;
            case "newContextReceived":
                this.newContextReceived = this.counter.value++;
                break;
            case "updateContext":
                this.updateContext = this.counter.value++;
                break;
            case "attached":
                this.attached = this.counter.value++;
                break;
            case "detached":
                this.detached = this.counter.value++;
                break;
            case "beforeUpdate":
                this.beforeUpdate = this.counter.value++;
                break;
            case "updated":
                this.updated = this.counter.value++;
                break;
            case "invalidated":
                this.invalidated = this.counter.value++;
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

    newPropsReceived(oldProps: LifecycleTestComponentProps, newProps: LifecycleTestComponentProps): void {
        this.props.monitor.touch("newPropsReceived");
    }

    newContextReceived(oldContext: Context, newContext: Context): void {
        this.props.monitor.touch("newContextReceived");
    }

    updateContext<C>(): C | undefined {
        this.props.monitor.touch("updateContext");
        return;
    }

    attached(): void {
        this.props.monitor.touch("attached");
    }

    detached(): void {
        this.props.monitor.touch("detached");
    }

    beforeUpdate(): void {
        this.props.monitor.touch("beforeUpdate");
    }

    updated(): void {
        this.props.monitor.touch("updated");
    }

    invalidated(): void {
        this.props.monitor.touch("invalidated");
    }

    render() {
        const { child, monitor } = this.props;
        monitor.touch("render");
        return child;
    }
}

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

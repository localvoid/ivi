import { IVNode, getDOMInstanceFromVNode } from "../src/vdom/ivnode";
import { VNodeFlags } from "../src/vdom/flags";
import { VNode, $h, $c, $t } from "../src/vdom/vnode";
import { Component, getDOMInstanceFromComponent, staticComponent } from "../src/vdom/component";
import { renderVNode, syncVNode, augmentVNode } from "../src/vdom/implementation";
export * from "./lifecycle";

const expect = chai.expect;

const DEFAULT_CONTEXT = {};

export function frag() {
    return document.createDocumentFragment();
}

export function checkRefs(n: Node, v: IVNode<any>) {
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
            const root = v._children as IVNode<any>;
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
                checkRefs(child, (v._children as IVNode<any>[])[i++]);
            } else if (flags & VNodeFlags.ChildrenVNode) {
                checkRefs(child, v._children as IVNode<any>);
                expect(child.nextSibling).to.null;
            }
            child = child.nextSibling;
        }
    }
}

export function startRender(
    fn: (render: (n: IVNode<any>) => Node) => void,
    container?: Element | DocumentFragment,
    disableCheckRefs?: boolean,
): void {
    function r(n: IVNode<any>): Node {
        return render(n, container, disableCheckRefs);
    }

    if (container === undefined) {
        container = document.createDocumentFragment();
    }

    fn(r);
}

export function render<T extends Node>(
    node: IVNode<any>,
    container?: Element | DocumentFragment,
    disableCheckRefs?: boolean,
): T {
    if (!container) {
        container = document.createDocumentFragment();
    }

    const oldRoot = (container as any).__ivi_root as IVNode<any> | undefined;
    (container as any).__ivi_root = node;
    if (oldRoot) {
        syncVNode(container, oldRoot, node, DEFAULT_CONTEXT, 0);
    } else {
        renderVNode(container, null, node, DEFAULT_CONTEXT);
    }

    const result = getDOMInstanceFromVNode(node) as T;

    if (!disableCheckRefs) {
        checkRefs(result, node);
    }

    return result;
}

export function augment(node: IVNode<any>, innerHTML: string, container?: Element): Element {
    if (!container) {
        container = document.createElement("div");
    }

    (container as any).__ivi_root = node;
    container.innerHTML = innerHTML;
    augmentVNode(container, container.firstChild, node, DEFAULT_CONTEXT);
    checkRefs(container.firstChild!, node);

    return container;
}

export interface TestComponentOptions {
    returnUndefined?: boolean;
    wrapDepth?: number;
}

export class TestComponent extends Component<TestComponentOptions> {
    render(): IVNode<any> {
        const { returnUndefined, wrapDepth } = this.props;

        if (wrapDepth) {
            return $c(TestComponent, {
                returnUndefined,
                wrapDepth: wrapDepth - 1,
            });
        }
        if (returnUndefined) {
            return $t("");
        }

        return $h("div");
    }
}

export function TestComponentFunction(props: TestComponentOptions): IVNode<any> {
    const { returnUndefined, wrapDepth } = props;

    if (wrapDepth) {
        return $c(TestComponentFunction, {
            returnUndefined,
            wrapDepth: wrapDepth - 1,
        });
    }

    if (returnUndefined) {
        return $t("");
    }

    return $h("div");
}

export function TestComponentFunctionWrapper(props: IVNode<any>): IVNode<any> {
    return props;
}

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

export function $fsc(c: IVNode<any>): VNode<IVNode<any>> {
    return $c(StaticComponentFunctionTest, c);
}

export function $sc(c: IVNode<any>): VNode<IVNode<any>> {
    return $c(StaticComponentTest, c);
}

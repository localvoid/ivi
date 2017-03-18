import { VNodeFlags, SyncFlags } from "../../src/vdom/flags";
import { IVNode, getDOMInstanceFromVNode } from "../../src/vdom/ivnode";
import { renderVNode, syncVNode, augmentVNode } from "../../src/vdom/implementation";
import { Component } from "../../src/vdom/component";
import { expect } from "chai";

const DEFAULT_CONTEXT = {};

export function frag() {
    return document.createDocumentFragment();
}

export function checkRefs(n: Node, v: IVNode<any>) {
    const flags = v._flags;

    expect(getDOMInstanceFromVNode(v)).to.equal(n);

    if (flags & VNodeFlags.Component) {
        if (flags & VNodeFlags.ComponentClass) {
            expect(getDOMInstanceFromVNode(v)).to.equal(n);
            const root = v._children as IVNode<any>;
            if (root) {
                checkRefs(n, root);
            }
        } else {
            const root = v._children as IVNode<any>;
            if (root) {
                checkRefs(n, root);
            }
        }
    } else {
        let i = 0;
        let child = n.firstChild;
        if (child) {
            expect(!!(flags & VNodeFlags.Element)).to.true;
        }
        if (flags & VNodeFlags.ChildrenVNode) {
            let vchild = v._children as IVNode<any> | null;
            do {
                checkRefs(child, vchild!);
                child = child.nextSibling!;
                vchild = vchild!._next;
            } while (vchild !== null);
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
        syncVNode(container, oldRoot, node, DEFAULT_CONTEXT, SyncFlags.Attached);
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

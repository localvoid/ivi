import { Context } from "ivi-core";
import { Component } from "../../../src/vdom/component";
import { VNode } from "../../../src/vdom/vnode";
import { $t } from "../../../src/vdom/vnode_dom";
import { $c } from "../../../src/vdom/vnode_components";
import { lifecycleTouch } from "../lifecycle";

export interface ComponentHooks<P> {
    construct?: (
        this: Component<P>,
        props: P,
    ) => void;
    isPropsChanged?: (
        this: Component<P>,
        oldProps: P,
        newProps: P,
    ) => boolean;
    newPropsReceived?: (
        this: Component<P>,
        oldProps: P,
        newProps: P,
    ) => void;
    attached?: (this: Component<P>) => void;
    detached?: (this: Component<P>) => void;
    beforeUpdate?: (this: Component<P>) => void;
    updated?: (this: Component<P>) => void;
    invalidated?: (this: Component<P>) => void;
    render?: (this: Component<P>) => VNode<any>;
    shouldAugment?: (this: Component<P>) => boolean;
}

export interface TestLifecycleComponentProps {
    id: string;
    child: VNode<any>;
    hooks: ComponentHooks<TestLifecycleComponentProps>;
}

export class TestLifecycleComponent extends Component<TestLifecycleComponentProps> {
    constructor(props: TestLifecycleComponentProps) {
        super(props);
        lifecycleTouch(props.id, "constructor");
        if (props.hooks.construct) {
            props.hooks.construct.call(this, props, context);
        }
    }

    isPropsChanged(oldProps: TestLifecycleComponentProps, newProps: TestLifecycleComponentProps): boolean {
        lifecycleTouch(newProps.id, "isPropsChanged");
        if (newProps.hooks.isPropsChanged) {
            return newProps.hooks.isPropsChanged.call(this, oldProps, newProps);
        }
        return true;
    }

    newPropsReceived(oldProps: TestLifecycleComponentProps, newProps: TestLifecycleComponentProps): void {
        lifecycleTouch(newProps.id, "newPropsReceived");
        if (newProps.hooks.newPropsReceived) {
            newProps.hooks.newPropsReceived.call(this, oldProps, newProps);
        }
    }

    attached(): void {
        lifecycleTouch(this.props.id, "attached");
        if (this.props.hooks.attached) {
            this.props.hooks.attached.call(this);
        }
    }

    detached(): void {
        lifecycleTouch(this.props.id, "detached");
        if (this.props.hooks.detached) {
            this.props.hooks.detached.call(this);
        }
    }

    beforeUpdate(): void {
        lifecycleTouch(this.props.id, "beforeUpdate");
        if (this.props.hooks.beforeUpdate) {
            this.props.hooks.beforeUpdate.call(this);
        }
    }

    updated(): void {
        lifecycleTouch(this.props.id, "updated");
        if (this.props.hooks.updated) {
            this.props.hooks.updated.call(this);
        }
    }

    invalidated(): void {
        lifecycleTouch(this.props.id, "invalidated");
        if (this.props.hooks.invalidated) {
            this.props.hooks.invalidated.call(this);
        }
    }

    render() {
        lifecycleTouch(this.props.id, "render");
        if (this.props.hooks.render) {
            return this.props.hooks.render.call(this);
        }
        return this.props.child;
    }

    shouldAugment() {
        lifecycleTouch(this.props.id, "shouldAugment");
        if (this.props.hooks.shouldAugment) {
            return this.props.hooks.shouldAugment.call(this);
        }
        return true;
    }
}

export function $lc(
    id: string,
    hooks?: ComponentHooks<TestLifecycleComponentProps>,
): VNode<TestLifecycleComponentProps>;
export function $lc(
    id: string,
    child?: VNode<any>,
): VNode<TestLifecycleComponentProps>;
export function $lc(
    id: string,
    hooks: ComponentHooks<TestLifecycleComponentProps>,
    child?: VNode<any>,
): VNode<TestLifecycleComponentProps>;
export function $lc(
    id: string,
    p1?: ComponentHooks<TestLifecycleComponentProps> | VNode<any>,
    p2?: VNode<any>,
): VNode<TestLifecycleComponentProps> {
    if (arguments.length === 3) {
        return $c(TestLifecycleComponent, {
            id: id,
            child: p2 as VNode<any>,
            hooks: p1 as ComponentHooks<TestLifecycleComponentProps>,
        });
    } else if (arguments.length === 2) {
        if (p1!.constructor === VNode) {
            return $c(TestLifecycleComponent, {
                id: id,
                child: p1 as VNode<any>,
                hooks: {},
            });
        }
        return $c(TestLifecycleComponent, {
            id: id,
            child: $t(""),
            hooks: p1 as ComponentHooks<TestLifecycleComponentProps>,
        });
    }
    return $c(TestLifecycleComponent, {
        id: id,
        child: $t(""),
        hooks: {},
    });
}

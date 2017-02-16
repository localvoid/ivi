import { IVNode } from "../../src/vdom/ivnode";
import { VNodeFlags } from "../../src/vdom/flags";
import { VNode, $c, $h, $t } from "../../src/vdom/vnode";
import { Component, staticComponent } from "../../src/vdom/component";
import { lifecycleTouch } from "./lifecycle";

export interface ComponentHooks {
    construct?: (props: TestLifecycleComponentProps, context: { [key: string]: any }, owner: Component<any>) => void;
    isPropsChanged?: (oldProps: TestLifecycleComponentProps, newProps: TestLifecycleComponentProps) => boolean;
    newPropsReceived?: (oldProps: TestLifecycleComponentProps, newProps: TestLifecycleComponentProps) => void;
    newContextReceived?: (oldContext: { [key: string]: any }, newContext: { [key: string]: any }) => void;
    updateContext?: () => { [key: string]: any } | undefined;
    attached?: () => void;
    detached?: () => void;
    beforeUpdate?: () => void;
    updated?: () => void;
    invalidated?: () => void;
    render?: () => IVNode<any>;
    shouldAugment?: () => boolean;
}

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

export interface TestLifecycleComponentProps {
    id: string;
    child: IVNode<any>;
    hooks: ComponentHooks;
}

export class TestLifecycleComponent extends Component<TestLifecycleComponentProps> {
    constructor(props: TestLifecycleComponentProps, context: { [key: string]: any }, owner: Component<any>) {
        super(props, context, owner);
        lifecycleTouch(props.id, "constructor");
        if (props.hooks.construct) {
            props.hooks.construct(props, context, owner);
        }
    }

    isPropsChanged(oldProps: TestLifecycleComponentProps, newProps: TestLifecycleComponentProps): boolean {
        lifecycleTouch(newProps.id, "isPropsChanged");
        if (newProps.hooks.isPropsChanged) {
            return newProps.hooks.isPropsChanged(oldProps, newProps);
        }
        return true;
    }

    newPropsReceived(oldProps: TestLifecycleComponentProps, newProps: TestLifecycleComponentProps): void {
        lifecycleTouch(newProps.id, "newPropsReceived");
        if (newProps.hooks.newPropsReceived) {
            newProps.hooks.newPropsReceived(oldProps, newProps);
        }
    }

    newContextReceived(oldContext: { [key: string]: any }, newContext: { [key: string]: any }): void {
        lifecycleTouch(this.props.id, "newContextReceived");
        if (this.props.hooks.newContextReceived) {
            this.props.hooks.newContextReceived(oldContext, newContext);
        }
    }

    updateContext<C>(): C | undefined {
        lifecycleTouch(this.props.id, "updateContext");
        if (this.props.hooks.updateContext) {
            return this.props.hooks.updateContext() as C;
        }
        return;
    }

    attached(): void {
        lifecycleTouch(this.props.id, "attached");
        if (this.props.hooks.attached) {
            this.props.hooks.attached();
        }
    }

    detached(): void {
        lifecycleTouch(this.props.id, "detached");
        if (this.props.hooks.detached) {
            this.props.hooks.detached();
        }
    }

    beforeUpdate(): void {
        lifecycleTouch(this.props.id, "beforeUpdate");
        if (this.props.hooks.beforeUpdate) {
            this.props.hooks.beforeUpdate();
        }
    }

    updated(): void {
        lifecycleTouch(this.props.id, "updated");
        if (this.props.hooks.updated) {
            this.props.hooks.updated();
        }
    }

    invalidated(): void {
        lifecycleTouch(this.props.id, "invalidated");
        if (this.props.hooks.invalidated) {
            this.props.hooks.invalidated();
        }
    }

    render() {
        lifecycleTouch(this.props.id, "render");
        if (this.props.hooks.render) {
            return this.props.hooks.render();
        }
        return this.props.child;
    }

    shouldAugment() {
        lifecycleTouch(this.props.id, "shouldAugment");
        if (this.props.hooks.shouldAugment) {
            return this.props.hooks.shouldAugment();
        }
        return true;
    }
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

export function $lc(
    id: string,
    child?: IVNode<any>,
): VNode<TestLifecycleComponentProps>;
export function $lc(
    id: string,
    hooks: ComponentHooks,
    child?: IVNode<any>,
): VNode<TestLifecycleComponentProps>;
export function $lc(
    id: string,
    p1?: ComponentHooks | IVNode<any>,
    p2?: IVNode<any>,
): VNode<TestLifecycleComponentProps> {
    if (arguments.length === 3) {
        return $c(TestLifecycleComponent, {
            id: id,
            child: p2 as IVNode<any>,
            hooks: p1 as ComponentHooks,
        });
    } else if (arguments.length === 2) {
        return $c(TestLifecycleComponent, {
            id: id,
            child: p1 as IVNode<any>,
            hooks: {},
        });
    }
    return $c(TestLifecycleComponent, {
        id: id,
        child: $t(""),
        hooks: {},
    });
}

export function $fsc(c: IVNode<any>): VNode<IVNode<any>> {
    return $c(StaticComponentFunctionTest, c);
}



/**
 * Invalid VNode (XSS injection).
 */
export function $invalid(key: any = null): IVNode<any> {
    return {
        _flags: VNodeFlags.Element,
        _tag: "div",
        _key: key,
        _props: null,
        _className: null,
        _style: null,
        _events: null,
        _children: "abc",
        _instance: null,
        _ref: null,
        _debugId: 0,
    };
}

export function $sc(c: IVNode<any>): VNode<IVNode<any>> {
    return $c(StaticComponentTest, c);
}

import { StatelessComponent } from "../../../src/vdom/component";
import { VNode } from "../../../src/vdom/vnode";
import { text } from "../../../src/vdom/vnode_dom";
import { component } from "../../../src/vdom/vnode_components";

export interface TestFunctionalComponentHooks<P> {
    render?: (props: P) => VNode<any>;
    isPropsChanged?: (oldProps: P, newProps: P) => boolean;
    shouldAugment?: (props: P) => boolean;
}

export interface TestFunctionalComponentProps {
    id: string;
    child: VNode<any>;
    hooks: TestFunctionalComponentHooks<TestFunctionalComponentProps>;
}

export function TestFunctionalComponent(props: TestFunctionalComponentProps) {
    if (props.hooks.render) {
        return props.hooks.render(props);
    }

    return props.child;
}

(TestFunctionalComponent as StatelessComponent<TestFunctionalComponentProps>).isPropsChanged = function (
    oldProps: TestFunctionalComponentProps,
    newProps: TestFunctionalComponentProps,
) {
    if (newProps.hooks.isPropsChanged) {
        return newProps.hooks.isPropsChanged(oldProps, newProps);
    }
    return true;
};

(TestFunctionalComponent as StatelessComponent<TestFunctionalComponentProps>).shouldAugment = function (
    props: TestFunctionalComponentProps,
) {
    if (props.hooks.shouldAugment) {
        return props.hooks.shouldAugment(props);
    }
    return true;
};

export function $tfc(
    id: string,
    hooks?: TestFunctionalComponentHooks<TestFunctionalComponentProps>,
): VNode<TestFunctionalComponentProps>;
export function $tfc(
    id: string,
    child?: VNode<any>,
): VNode<TestFunctionalComponentProps>;
export function $tfc(
    id: string,
    hooks: TestFunctionalComponentHooks<TestFunctionalComponentProps>,
    child?: VNode<any>,
): VNode<TestFunctionalComponentProps>;
export function $tfc(
    id: string,
    p1?: TestFunctionalComponentHooks<TestFunctionalComponentProps> | VNode<any>,
    p2?: VNode<any>,
): VNode<TestFunctionalComponentProps> {
    if (arguments.length === 3) {
        return component(TestFunctionalComponent, {
            id: id,
            child: p2 as VNode<any>,
            hooks: p1 as TestFunctionalComponentHooks<TestFunctionalComponentProps>,
        });
    } else if (arguments.length === 2) {
        if (p1!.constructor === VNode) {
            return component(TestFunctionalComponent, {
                id: id,
                child: p1 as VNode<any>,
                hooks: {},
            });
        }
        return component(TestFunctionalComponent, {
            id: id,
            child: text(""),
            hooks: p1 as TestFunctionalComponentHooks<TestFunctionalComponentProps>,
        });
    }
    return component(TestFunctionalComponent, {
        id: id,
        child: text(""),
        hooks: {},
    });
}

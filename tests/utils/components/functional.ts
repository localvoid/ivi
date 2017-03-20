import { Context } from "../../../src/common/types";
import { IVNode } from "../../../src/vdom/ivnode";
import { ComponentFunction } from "../../../src/vdom/component";
import { VNode, $t } from "../../../src/vdom/vnode";
import { $c } from "../../../src/vdom/vnode_components";

export interface TestFunctionalComponentHooks<P> {
    render?: (props: P) => IVNode<any>;
    isPropsChanged?: (oldProps: P, newProps: P) => boolean;
    shouldAugment?: (props: P) => boolean;
}

export interface TestFunctionalComponentProps {
    id: string;
    child: IVNode<any>;
    hooks: TestFunctionalComponentHooks<TestFunctionalComponentProps>;
}

export function TestFunctionalComponent(props: TestFunctionalComponentProps) {
    if (props.hooks.render) {
        return props.hooks.render(props);
    }

    return props.child;
}

(TestFunctionalComponent as ComponentFunction<TestFunctionalComponentProps>).isPropsChanged = function (
    oldProps: TestFunctionalComponentProps,
    newProps: TestFunctionalComponentProps,
) {
    if (newProps.hooks.isPropsChanged) {
        return newProps.hooks.isPropsChanged(oldProps, newProps);
    }
    return true;
};

(TestFunctionalComponent as ComponentFunction<TestFunctionalComponentProps>).shouldAugment = function (
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
    child?: IVNode<any>,
): VNode<TestFunctionalComponentProps>;
export function $tfc(
    id: string,
    hooks: TestFunctionalComponentHooks<TestFunctionalComponentProps>,
    child?: IVNode<any>,
): VNode<TestFunctionalComponentProps>;
export function $tfc(
    id: string,
    p1?: TestFunctionalComponentHooks<TestFunctionalComponentProps> | IVNode<any>,
    p2?: IVNode<any>,
): VNode<TestFunctionalComponentProps> {
    if (arguments.length === 3) {
        return $c(TestFunctionalComponent, {
            id: id,
            child: p2 as IVNode<any>,
            hooks: p1 as TestFunctionalComponentHooks<TestFunctionalComponentProps>,
        });
    } else if (arguments.length === 2) {
        if (p1!.constructor === VNode) {
            return $c(TestFunctionalComponent, {
                id: id,
                child: p1 as IVNode<any>,
                hooks: {},
            });
        }
        return $c(TestFunctionalComponent, {
            id: id,
            child: $t(""),
            hooks: p1 as TestFunctionalComponentHooks<TestFunctionalComponentProps>,
        });
    }
    return $c(TestFunctionalComponent, {
        id: id,
        child: $t(""),
        hooks: {},
    });
}

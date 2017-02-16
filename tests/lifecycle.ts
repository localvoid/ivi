import { IVNode } from "../src/vdom/ivnode";
import { VNode, $c } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";

export interface LifecycleCounters {
    global: number;
    constructor: number;
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
    shouldAugment: number;
}

const LIFECYCLE_COUNTERS: LifecycleCounters = {
    global: 0,
    constructor: 0,
    isPropsChanged: 0,
    newPropsReceived: 0,
    newContextReceived: 0,
    updateContext: 0,
    attached: 0,
    detached: 0,
    beforeUpdate: 0,
    updated: 0,
    invalidated: 0,
    render: 0,
    shouldAugment: 0,
};

let LIFECYCLE_DATA: Map<string, number> | undefined;

function lifecycleTouch(id: string, name: keyof LifecycleCounters): void {
    if (LIFECYCLE_DATA) {
        LIFECYCLE_DATA.set(`${id}.${name}`, LIFECYCLE_COUNTERS.global++);
        LIFECYCLE_DATA.set(`${id}.${name}!`, LIFECYCLE_COUNTERS[name]++);
    }
}

function lifecycleGet(id: string, name: keyof LifecycleCounters, global = true): number {
    if (LIFECYCLE_DATA) {
        let key = `${id}.${name}`;
        if (!global) {
            key += "!";
        }
        const v = LIFECYCLE_DATA.get(key);
        if (v !== undefined) {
            return v;
        }
    }
    return -1;
}

export interface LifecycleTestComponentProps {
    id: string;
    child: IVNode<any>;
}

export class LifecycleTestComponent extends Component<LifecycleTestComponentProps> {
    constructor(props: LifecycleTestComponentProps, context: { [key: string]: any }, owner: Component<any>) {
        super(props, context, owner);
        lifecycleTouch(props.id, "constructor");
    }

    isPropsChanged(oldProps: LifecycleTestComponentProps, newProps: LifecycleTestComponentProps): boolean {
        lifecycleTouch(newProps.id, "isPropsChanged");
        return true;
    }

    newPropsReceived(oldProps: LifecycleTestComponentProps, newProps: LifecycleTestComponentProps): void {
        lifecycleTouch(newProps.id, "newPropsReceived");
    }

    newContextReceived(oldContext: { [key: string]: any }, newContext: { [key: string]: any }): void {
        lifecycleTouch(this.props.id, "newContextReceived");
    }

    updateContext<C>(): C | undefined {
        lifecycleTouch(this.props.id, "updateContext");
        return;
    }

    attached(): void {
        lifecycleTouch(this.props.id, "attached");
    }

    detached(): void {
        lifecycleTouch(this.props.id, "detached");
    }

    beforeUpdate(): void {
        lifecycleTouch(this.props.id, "beforeUpdate");
    }

    updated(): void {
        lifecycleTouch(this.props.id, "updated");
    }

    invalidated(): void {
        lifecycleTouch(this.props.id, "invalidated");
    }

    render() {
        lifecycleTouch(this.props.id, "render");
        return this.props.child;
    }

    shouldAugment() {
        lifecycleTouch(this.props.id, "shouldAugment");
        return true;
    }
}

function $lc(id: string, child: IVNode<any>): VNode<LifecycleTestComponentProps> {
    return $c(LifecycleTestComponent, {
        id: id,
        child: child,
    });
}

export function checkLifecycle(
    fn: (
        componentFactory: (id: string, child: IVNode<any>) => VNode<LifecycleTestComponentProps>,
        get: (id: string, name: keyof LifecycleCounters, global?: boolean) => number,
    ) => void): void {
    LIFECYCLE_DATA = new Map<string, number>();
    LIFECYCLE_COUNTERS.global = 0;
    LIFECYCLE_COUNTERS.constructor = 0;
    LIFECYCLE_COUNTERS.isPropsChanged = 0;
    LIFECYCLE_COUNTERS.newPropsReceived = 0;
    LIFECYCLE_COUNTERS.newContextReceived = 0;
    LIFECYCLE_COUNTERS.updateContext = 0;
    LIFECYCLE_COUNTERS.attached = 0;
    LIFECYCLE_COUNTERS.detached = 0;
    LIFECYCLE_COUNTERS.beforeUpdate = 0;
    LIFECYCLE_COUNTERS.updated = 0;
    LIFECYCLE_COUNTERS.invalidated = 0;
    LIFECYCLE_COUNTERS.render = 0;
    LIFECYCLE_COUNTERS.shouldAugment = 0;
    fn($lc, lifecycleGet);
    LIFECYCLE_DATA = undefined;
}

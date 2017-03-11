import { Context } from "../common/types";
import { SelectorData } from "../vdom/connect_descriptor";

export function selectorData<T>(i: T): SelectorData<T, T>;
export function selectorData<T, U>(i: T, o: U): SelectorData<T, U>;
export function selectorData<T, U>(i: T, o?: U): SelectorData<T, U> {
    return {
        in: i,
        out: (o === undefined ? i : o) as U,
    };
}

export function memoizeSelector<T, U extends SelectorData>(
    select: (prev: U | null) => U,
    ref: (v?: U | null) => U | null,
): (prev: U | null) => U;
export function memoizeSelector<T, U extends SelectorData>(
    select: (prev: U | null, props: T) => U,
    ref: (v?: U | null) => U | null,
): (prev: U | null, props: T) => U;
export function memoizeSelector<T, U extends SelectorData>(
    select: (prev: U | null, props: T, context: Context) => U,
    ref: (v?: U | null) => U | null,
): (prev: U | null, props: T, context: Context) => U {
    return function (prev: U | null, props: T, context: Context) {
        const state = select(ref(), props, context);
        ref(state);
        return state;
    };
}

export function memoizeSelectorGlobally<T, U extends SelectorData>(
    select: (prev: U | null) => U,
): (prev: U | null) => U;
export function memoizeSelectorGlobally<T, U extends SelectorData>(
    select: (prev: U | null, props: T) => U,
): (prev: U | null, props: T) => U;
export function memoizeSelectorGlobally<T, U extends SelectorData>(
    select: (prev: U | null, props: T, context: Context) => U,
): (prev: U | null, props: T, context: Context) => U {
    let g: U | null = null;
    return function (prev: U | null, props: T, context: Context) {
        return g = select(g, props, context);
    };
}

import { Context } from "../common/types";
import { SelectorData } from "../vdom/connect_descriptor";

export function selectorData<I>(i: I): SelectorData<I, I>;
export function selectorData<I, O>(i: I, o: O): SelectorData<I, O>;
export function selectorData<I, O>(i: I, o?: O): SelectorData<I, O> {
    return {
        in: i,
        out: (o === undefined ? i : o) as O,
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
    if (__IVI_DEV__) {
        const fn = function (prev: U | null, props: T, context: Context) {
            const state = select(ref(), props, context);
            ref(state);
            return state;
        };
        fn.displayName = select.name;
        return fn;
    }
    return function (prev: U | null, props: T, context: Context) {
        const state = select(ref(), props, context);
        ref(state);
        return state;
    };
}

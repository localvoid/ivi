import { VNodeFlags } from "./flags";
import { VNode, isValidVNode } from "./vnode";
import { $t } from "./vnode_dom";

/**
 * The `$map()` function creates a new virtual node linked list with the results of calling a provided function on every
 * element in the array.
 *
 * @param array Array.
 * @param fn Function.
 * @returns First VNode in a linked list or `null` when it is empty.
 */
export function $map<T>(array: Array<T>, fn: (item: T, index: number) => VNode<any>): VNode<T> | null {
    if (array.length) {
        const first = fn(array[0], 0);
        let prev = first;
        for (let i = 1; i < array.length; i++) {
            const vnode = fn(array[i], i);
            vnode._prev = prev;
            prev._next = vnode;
            prev = vnode;
        }
        first._prev = prev;
        return first;
    }
    return null;
}

/**
 * The `$filter()` function creates a new virtual node linked list with all virtual nodes returned by the provided
 * function.
 *
 * @param array Array.
 * @param fn Function.
 * @returns First VNode in a linked list or `null` when it is empty.
 */
export function $filter<T>(array: Array<T>, fn: (item: T, index: number) => VNode<any> | null): VNode<T> | null {
    if (array.length) {
        let first: VNode<any> | null = null;
        let vnode: VNode<any> | null;
        let i = 0;
        for (; i < array.length; i++) {
            vnode = fn(array[i], i);
            if (vnode !== null) {
                first = vnode;
                break;
            }
        }
        if (first !== null) {
            let prev = first;
            for (; i < array.length; i++) {
                vnode = fn(array[i], i);
                if (vnode !== null) {
                    vnode._prev = prev;
                    prev._next = vnode;
                    prev = vnode;
                }
            }
            first._prev = prev;
            return first;
        }
    }
    return null;
}

/**
 * The `$range()` function creates a new virtual node linked list with all virtual nodes returned by the provided
 * function.
 *
 * @param n Range number.
 * @param fn Function.
 * @returns First VNode in a linked list or `null` when it is empty.
 */
export function $range<T>(n: number, fn: (index: number) => VNode<any>): VNode<T> | null {
    if (n) {
        const first = fn(0);
        let prev = first;
        for (let i = 1; i < n; i++) {
            const vnode = fn(i);
            vnode._prev = prev;
            prev._next = vnode;
            prev = vnode;
        }
        first._prev = prev;
        return first;
    }
    return null;
}

/**
 * The `$list()` is a variadic function that converts variable number of children virtual nodes into a linked list form.
 *
 * @param children Variable number of children virtual nodes.
 * @returns First VNode in a linked list or `null` when it is empty.
 */
export function $list(...children: Array<VNode<any> | null>): VNode<any> | null;
export function $list(): VNode<any> | null {
    let first: VNode<any> | null = null;
    let i;
    let n;

    const children = arguments;
    for (i = 0; i < children.length; i++) {
        n = children[i];
        if (n !== null) {
            if (first === null) {
                first = n;
                break;
            }
        }
    }

    if (i < children.length) {
        first = first as VNode<any>;
        let prev = first._prev;
        for (; i < children.length; i++) {
            n = children[i];

            if (n !== null) {
                if (isValidVNode(n)) {
                    if (!(n._flags & VNodeFlags.Key)) {
                        n._key = i;
                    }
                } else {
                    n = $t(n);
                    n._key = i;
                }

                const last = n._prev;
                n._prev = prev;
                prev!._next = n;
                prev = last;
            }
        }
        first._prev = prev;
    }

    return first;
}

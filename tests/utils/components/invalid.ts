import { IVNode } from "../../../src/vdom/ivnode";
import { VNodeFlags } from "../../../src/vdom/flags";

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
        _debugId: 0,
    };
}

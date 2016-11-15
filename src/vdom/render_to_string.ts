import { DevModeFlags, DEV_MODE } from "../common/dev_mode";
import {
    AncestorFlags, pushNestingState, checkNestingViolation, nestingStateParentTagName, nestingStateAncestorFlags,
    restoreNestingState,
} from "../common/html_nesting_rules";
import { VNode } from "./vnode";
import { VNodeFlags } from "./flags";
import { ComponentClass, ComponentFunction, Component } from "./component";
import { Context, ROOT_CONTEXT } from "./context";

const LT_RE = /</g;
const GT_RE = /</g;
const QUOT_RE = /"/g;

/**
 * Escape children and convert to string.
 *
 * @param text Text.
 * @returns Escaped children.
 */
function escapeChildren(text: string | boolean | number): string {
    if (typeof text === "string") {
        return text
            .replace(LT_RE, "&lt;")
            .replace(GT_RE, "&gt;");
    }
    return text.toString();
}

/**
 * Escape attribute value and convert to string.
 *
 * @param text Text.
 * @returns Escaped value.
 */
function escapeAttributeValue(text: string | boolean | number): string {
    if (typeof text === "string") {
        return text.replace(QUOT_RE, "&quot;");
    }
    return text.toString();
}

/**
 * Render DOM Element properties to string.
 *
 * @param props DOM Element properties.
 * @returns DOM Element properties in string format.
 */
function renderElementPropsToString(props: any): string {
    let result = "";

    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = props[key];
        if (value !== null) {
            result += ` ${key}="${escapeAttributeValue(value)}"`;
        }
    }

    return result;
}

/**
 * Render DOM Element style to string.
 *
 * @param style DOM Element style.
 * @returns DOM Element style in string format.
 */
function renderElementStyleToString(style: string | { [key: string]: any }): string {
    if (typeof style === "string") {
        return ` style="${style}"`;
    }

    const keys = Object.keys(style);
    if (keys.length === 0) {
        return "";
    }

    let result = ` style="`;
    let semicolon = false;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = style[key];
        if (semicolon) {
            result += ";";
        } else {
            semicolon = true;
        }
        result += `${key}:${value}`;
    }

    return `${result}"`;
}

/**
 * Render Text VNode to string.
 *
 * @param node Text VNode.
 * @returns Rendered Text VNode.
 */
function renderTextToString(node: VNode<any>): string {
    // Push nesting state, check for nesting violation and restore nesting state.
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            const _prevNestingStateParentTagName = nestingStateParentTagName();
            const _prevNestingStateAncestorFlags = nestingStateAncestorFlags();
            pushNestingState("$t");
            checkNestingViolation();
            restoreNestingState(_prevNestingStateParentTagName, _prevNestingStateAncestorFlags!);
        }
    }

    return `<!---->${escapeChildren(node._children as string)}<!---->`;
}

/**
 * Render Element VNode to string.
 *
 * @param node Element VNode.
 * @param context Context.
 * @param owner Owner.
 * @returns Rendered Element VNode.
 */
function renderElementToString(node: VNode<any>, context: Context, owner?: Component<any>): string {
    // Push nesting state and check for nesting violation.
    let _prevNestingStateParentTagName: string | undefined;
    let _prevNestingStateAncestorFlags: AncestorFlags | undefined;
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            _prevNestingStateParentTagName = nestingStateParentTagName();
            _prevNestingStateAncestorFlags = nestingStateAncestorFlags();
            pushNestingState(node._tag as string);
            checkNestingViolation();
        }
    }

    const flags = node._flags;
    let result = "<";

    if (flags & VNodeFlags.InputElement) {
        if (flags & VNodeFlags.TextAreaElement) {
            result += "textarea";
        } else {
            result += `input type="${node._tag}"`;
        }
    } else {
        result += node._tag;
    }

    if (node._className !== null) {
        result += ` class="${node._className}"`;
    }
    if (node._props !== null) {
        result += `${renderElementPropsToString(node._props)}`;
    }
    if (node._style !== null) {
        result += `${renderElementStyleToString(node._style)}`;
    }
    if (node._children === null) {
        result += ">";
    } else {
        if (flags & (VNodeFlags.InputElement | VNodeFlags.MediaElement)) {
            if (flags & VNodeFlags.TextAreaElement) {
                result += `>${escapeChildren(node._children as string)}`;
            } else {
                if (typeof node._children === "boolean") {
                    result += ` checked="${node._children}">`;
                } else {
                    result += ` value="${escapeAttributeValue(node._children as string)}">`;
                }
            }
        } else {
            result += ">";
            if (flags & VNodeFlags.ChildrenBasic) {
                result += escapeChildren(node._children as string);
            } else if (flags & VNodeFlags.ChildrenArray) {
                const children = node._children as VNode<any>[];
                for (let i = 0; i < children.length; i++) {
                    result += renderToString(children[i], context, owner);
                }
            } else {
                result += renderToString(node._children as VNode<any>, context, owner);
            }
        }
    }

    if (flags & VNodeFlags.InputElement) {
        if (flags & VNodeFlags.TextAreaElement) {
            result += "</textarea>";
        } else {
            result += "</input>";
        }
    } else {
        result += `</${node._tag}>`;
    }

    // Restore nesting state.
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            restoreNestingState(_prevNestingStateParentTagName, _prevNestingStateAncestorFlags!);
        }
    }

    return result;
}

/**
 * Render Component VNode to string.
 *
 * @param node Component VNode.
 * @param context Context.
 * @param owner Owner.
 * @returns Rendered Component VNode.
 */
function renderComponentToString(node: VNode<any>, context: Context, owner?: Component<any>): string {
    if (node._flags & VNodeFlags.ComponentClass) {
        const component = new (node._tag as ComponentClass<any>)(node._props, context, owner);
        const contextData = component.updateContext();
        const newContext = contextData ? new Context(contextData, context) : context;
        component._context = newContext;

        const root = component.render();
        if (root) {
            return renderToString(root, newContext, component);
        }
    } else { // (node._flags & VNodeFlags.ComponentFunction)
        const root = (node._tag as ComponentFunction<any>)(node._props, context);
        if (root) {
            return renderToString(root, context, owner);
        }
    }

    return "";
}

/**
 * Render VNode to string.
 *
 * @param node VNode.
 * @param context Context.
 * @param owner Owner.
 */
export function renderToString(node: VNode<any>, context = ROOT_CONTEXT, owner?: Component<any>): string {
    const flags = node._flags;
    if (flags & (VNodeFlags.Element | VNodeFlags.Text)) {
        if (flags & VNodeFlags.Text) {
            return renderTextToString(node);
        } else { // (flags & VNodeFlags.Element)
            return renderElementToString(node, context, owner);
        }
    }
    // (flags & VNodeFlags.Component)
    return renderComponentToString(node, context, owner);
}

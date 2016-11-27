
import { InputType } from "../common/dom";

/**
 * Is tag valid.
 *
 * @param tag Tag name.
 * @returns `true` when tag name is valid.
 */
export function isValidTag(tag: string): boolean {
    if (__IVI_DEV__) {
        return /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/.test(tag);
    }
    return true;
}

let VOID_ELEMENTS: { [key: string]: number };
if (__IVI_DEV__) {
    VOID_ELEMENTS = {
        "area": 0,
        "base": 0,
        "br": 0,
        "col": 0,
        "embed": 0,
        "hr": 0,
        "img": 0,
        "input": 0,
        "keygen": 0,
        "link": 0,
        "meta": 0,
        "param": 0,
        "source": 0,
        "track": 0,
        "wbr": 0,
        "menuitem": 0,
    };
}

/**
 * Is element can contain any children.
 *
 * @param tag Tag name.
 * @returns `true` when element can't contain any children.
 */
export function isVoidElement(tag: string): boolean {
    if (__IVI_DEV__) {
        return VOID_ELEMENTS[tag] !== undefined;
    }
    return false;
}

/**
 * Is input type has checked property.
 *
 * @param type Input type.
 * @returns `true` if Input type has `checked` property.
 */
export function isInputTypeHasCheckedProperty(type: InputType): boolean {
    if (type === "checkbox" || type === "radio") {
        return true;
    }
    return false;
}

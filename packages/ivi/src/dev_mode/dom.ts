import { DEV } from "ivi-vars";

/**
 * Is tag valid.
 *
 * @param tag Tag name.
 * @returns `true` when tag name is valid.
 */
export function isValidTag(tag: string): boolean {
  if (DEV) {
    return /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/.test(tag);
  }
  return true;
}

/**
 * Is input type has checked property.
 *
 * @param type Input type.
 * @returns `true` if Input type has `checked` property.
 */
export function isInputTypeHasCheckedProperty(type: string): boolean {
  if (type === "checkbox" || type === "radio") {
    return true;
  }
  return false;
}


/**
 * escapeText escapes HTML text.
 *
 * https://www.w3.org/TR/html5/syntax.html#data-state
 * https://www.w3.org/TR/html5/syntax.html#rcdata-state
 *
 * @param text Text.
 * @returns Escaped text.
 */
export function escapeText(text: string | number): string {
  if (typeof text === "string") {
    let result = text;
    let start = 0;
    let i = 0;
    for (; i < text.length; ++i) {
      let escape;
      switch (text.charCodeAt(i)) {
        case 38: // &
          escape = "&amp;";
          break;
        case 60: // <
          escape = "&lt;";
          break;
        default:
          continue;
      }
      if (start > 0) {
        if (i > start) {
          result += text.slice(start, i) + escape;
        } else {
          result += escape;
        }
      } else {
        if (i > start) {
          result = text.slice(0, i) + escape;
        } else {
          result = escape;
        }
      }
      start = i + 1;
    }
    if (start !== 0 && i !== start) {
      return result + text.slice(start, i);
    }
    return result;
  }
  return text.toString();
}

/**
 * escapeAttributeValue escapes HTML attribute values.
 *
 * https://www.w3.org/TR/html5/syntax.html#attribute-value-(double-quoted)-state
 *
 * @param text Attribute value.
 * @returns Escaped attribute value
 */
export function escapeAttributeValue(text: string | number): string {
  if (typeof text === "string") {
    let result = text;
    let start = 0;
    let i = 0;
    for (; i < text.length; ++i) {
      let escape;
      switch (text.charCodeAt(i)) {
        case 34: // "
          escape = "&quot;";
          break;
        case 38: // &
          escape = "&amp;";
          break;
        default:
          continue;
      }
      if (start > 0) {
        if (i > start) {
          result += text.slice(start, i) + escape;
        } else {
          result += escape;
        }
      } else {
        if (i > start) {
          result = text.slice(0, i) + escape;
        } else {
          result = escape;
        }
      }
      start = i + 1;
    }
    if (start !== 0 && i !== start) {
      return result + text.slice(start, i);
    }
    return result;
  }
  return text.toString();
}

/**
 * escapeJavascript escapes javascript code.
 *
 * @param text Text.
 * @returns Escaped text.
 */
export function escapeJavascript(text: string): string {
  let result = text;
  let escape;
  let start = 0;
  let i = 0;
  for (; i < text.length; ++i) {
    switch (text.charCodeAt(i)) {
      case 47: // /
        escape = "\\u002F";
        break;
      case 60: // <
        escape = "\\u003C";
        break;
      case 62: // >
        escape = "\\u003E";
        break;
      case 8232:
        escape = "\\u2028";
        break;
      case 8233:
        escape = "\\u2029";
        break;
      default:
        continue;
    }
    if (start > 0) {
      if (i > start) {
        result += text.slice(start, i) + escape;
      } else {
        result += escape;
      }
    } else {
      if (i > start) {
        result = text.slice(0, i) + escape;
      } else {
        result = escape;
      }
    }
    start = i + 1;
  }
  if (start !== 0 && i !== start) {
    return result + text.slice(start, i);
  }
  return result;
}

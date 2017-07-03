
/**
 * escapeText escapes HTML text.
 *
 * @param text Text.
 * @returns Escaped text.
 */
export function escapeText(text: string | number): string {
    if (typeof text === "string") {
        let result = text;
        let start = 0;
        let i = 0;
        for (; i < text.length; i++) {
            let escape;
            switch (text.charCodeAt(i)) {
                case 38: // &
                    escape = "&amp;";
                    break;
                case 60: // <
                    escape = "&lt;";
                    break;
                case 62: // >
                    escape = "&gt;";
                    break;
                default:
                    continue;
            }
            if (i > start) {
                if (start !== 0) {
                    result += text.slice(start, i);
                } else {
                    result = text.slice(0, i);
                }
            }
            result += escape;
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
 * @param text Attribute value.
 * @returns Escaped attribute value
 */
export function escapeAttributeValue(text: string | number): string {
    if (typeof text === "string") {
        let result = text;
        let start = 0;
        let i = 0;
        for (; i < text.length; i++) {
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
            if (i > start) {
                if (start !== 0) {
                    result += text.slice(start, i);
                } else {
                    result = text.slice(0, i);
                }
            }
            result += escape;
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
    for (; i < text.length; i++) {
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
        if (i > start) {
            if (start !== 0) {
                result += text.slice(start, i);
            } else {
                result = text.slice(0, i);
            }
        }
        result += escape;
        start = i + 1;
    }
    if (start !== 0 && i !== start) {
        return result + text.slice(start, i);
    }
    return result;
}

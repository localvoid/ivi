/**
 * HTML nesting rules.
 *
 * Some HTML Elements have restrictions on which nodes can be nested, for example `table` Element can only have
 * `tbody`, `thead`, etc as its children. Browsers are handling such cases in a way that they automatically inject
 * missing elements or close existing elements, to prevent such behaviour we are just throwing errors in Dev Mode when
 * HTML nesting rules are violated.
 *
 * To disable nesting validation, set Dev Mode `DisableNestingValidation` flag with a function
 * `setDevModeFlags(DevModeFlags.DisableNestingValidation)`.
 */

import { DEV_MODE, DevModeFlags } from "./dev_mode";

/**
 * Ancestor Flags.
 */
export const enum AncestorFlags {
    Select = 1,
    OptGroup = 1 << 1,
    Option = 1 << 2,
    Table = 1 << 3,
    TableBlock = 1 << 4,
    TableRow = 1 << 5,
    Header = 1 << 6,
    Form = 1 << 7,
    Anchor = 1 << 8,
    Button = 1 << 9,
    Paragraph = 1 << 10,
    ListItem = 1 << 11,
    DescriptionListItem = 1 << 12,
    RubyAnnotation = 1 << 13,
}

/**
 * AncestorFlags associated with a `tagName`.
 */
const AncestorFlagsByTagName: { [tagName: string]: AncestorFlags } = {
    "select": AncestorFlags.Select,
    "optgroup": AncestorFlags.OptGroup,
    "option": AncestorFlags.Option,
    "table": AncestorFlags.Table,
    "tbody": AncestorFlags.TableBlock,
    "thead": AncestorFlags.TableBlock,
    "tfoot": AncestorFlags.TableBlock,
    "tr": AncestorFlags.TableRow,
    "h1": AncestorFlags.Header,
    "h2": AncestorFlags.Header,
    "h3": AncestorFlags.Header,
    "h4": AncestorFlags.Header,
    "h5": AncestorFlags.Header,
    "h6": AncestorFlags.Header,
    "form": AncestorFlags.Form,
    "a": AncestorFlags.Anchor,
    "button": AncestorFlags.Button,
    "p": AncestorFlags.Paragraph,
    "li": AncestorFlags.ListItem,
    "dd": AncestorFlags.DescriptionListItem,
    "dt": AncestorFlags.DescriptionListItem,
    "rp": AncestorFlags.RubyAnnotation,
    "rt": AncestorFlags.RubyAnnotation,
};

/**
 * Convert AncestorFlags to list of tagNames.
 *
 * @param ancestorFlags AncestorFlags.
 * @returns list of tagNames.
 */
function ancestorFlagsToTagNames(ancestorFlags: AncestorFlags): string[] {
    let result = [] as string[];
    if (ancestorFlags & AncestorFlags.Select) {
        result.push("select");
    }
    if (ancestorFlags & AncestorFlags.OptGroup) {
        result.push("optgroup");
    }
    if (ancestorFlags & AncestorFlags.Option) {
        result.push("option");
    }
    if (ancestorFlags & AncestorFlags.Table) {
        result.push("table");
    }
    if (ancestorFlags & AncestorFlags.TableBlock) {
        result.push("tbody", "thead", "tfoot");
    }
    if (ancestorFlags & AncestorFlags.TableRow) {
        result.push("tr");
    }
    if (ancestorFlags & AncestorFlags.Header) {
        result.push("h1", "h2", "h3", "h4", "h5", "h6");
    }
    if (ancestorFlags & AncestorFlags.Form) {
        result.push("form");
    }
    if (ancestorFlags & AncestorFlags.Anchor) {
        result.push("a");
    }
    if (ancestorFlags & AncestorFlags.ListItem) {
        result.push("li");
    }
    if (ancestorFlags & AncestorFlags.DescriptionListItem) {
        result.push("dd", "dt");
    }
    if (ancestorFlags & AncestorFlags.RubyAnnotation) {
        result.push("rp", "rt");
    }
    return result;
}

/**
 * List of child elements that allowed in `parent` elements.
 */
const validChildList: { [parent: string]: string[] } = {
    "select": ["option", "optgroup", "$t"],
    "optgroup": ["option", "$t"],
    "option": ["$t"],
    "tr": ["th", "td", "style", "script", "template"],
    "tbody": ["tr", "style", "script", "template"],
    "colgroup": ["col", "template"],
    "table": ["caption", "colgroup", "tbody", "tfoot", "thead", "style", "script", "template"],
};
validChildList["thead"] = validChildList["tbody"];
validChildList["tfoot"] = validChildList["tbody"];

/**
 * List of invalid ancestors for `child` elements.
 */
const invalidAncestorList: { [child: string]: AncestorFlags } = {
    "address": AncestorFlags.Paragraph,
    "article": AncestorFlags.Paragraph,
    "aside": AncestorFlags.Paragraph,
    "blockquote": AncestorFlags.Paragraph,
    "center": AncestorFlags.Paragraph,
    "details": AncestorFlags.Paragraph,
    "dialog": AncestorFlags.Paragraph,
    "dir": AncestorFlags.Paragraph,
    "div": AncestorFlags.Paragraph,
    "dl": AncestorFlags.Paragraph,
    "fieldset": AncestorFlags.Paragraph,
    "figcaption": AncestorFlags.Paragraph,
    "figure": AncestorFlags.Paragraph,
    "footer": AncestorFlags.Paragraph,
    "header": AncestorFlags.Paragraph,
    "hgroup": AncestorFlags.Paragraph,
    "main": AncestorFlags.Paragraph,
    "menu": AncestorFlags.Paragraph,
    "nav": AncestorFlags.Paragraph,
    "ol": AncestorFlags.Paragraph,
    "p": AncestorFlags.Paragraph,
    "section": AncestorFlags.Paragraph,
    "summary": AncestorFlags.Paragraph,
    "ul": AncestorFlags.Paragraph,
    "pre": AncestorFlags.Paragraph,
    "listing": AncestorFlags.Paragraph,
    "table": AncestorFlags.Paragraph,
    "hr": AncestorFlags.Paragraph,
    "xmp": AncestorFlags.Paragraph,
    "h1": AncestorFlags.Paragraph | AncestorFlags.Header,
    "h2": AncestorFlags.Paragraph | AncestorFlags.Header,
    "h3": AncestorFlags.Paragraph | AncestorFlags.Header,
    "h4": AncestorFlags.Paragraph | AncestorFlags.Header,
    "h5": AncestorFlags.Paragraph | AncestorFlags.Header,
    "h6": AncestorFlags.Paragraph | AncestorFlags.Header,
    "form": AncestorFlags.Form | AncestorFlags.Paragraph,
    "li": AncestorFlags.ListItem,
    "dd": AncestorFlags.DescriptionListItem,
    "dt": AncestorFlags.DescriptionListItem,
    "button": AncestorFlags.Button,
    "a": AncestorFlags.Anchor,
    "rp": AncestorFlags.DescriptionListItem | AncestorFlags.ListItem | AncestorFlags.ListItem | AncestorFlags.Option |
    AncestorFlags.OptGroup | AncestorFlags.Paragraph | AncestorFlags.RubyAnnotation,
    "rt": AncestorFlags.DescriptionListItem | AncestorFlags.ListItem | AncestorFlags.ListItem | AncestorFlags.Option |
    AncestorFlags.OptGroup | AncestorFlags.Paragraph | AncestorFlags.RubyAnnotation,
};

let _parentTagName: string | undefined;
let _ancestorFlags: AncestorFlags = 0;
let _childTagName: string | undefined;

/**
 * Set initial nesting state.
 *
 * @param parentTagName
 * @param ancestorFlags
 */
export function setInitialNestingState(parentTagName: string, ancestorFlags: AncestorFlags): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            _parentTagName = parentTagName;
            _ancestorFlags = ancestorFlags;
        }
    }
}

/**
 * Push nesting state.
 *
 * @param childTagName
 */
export function pushNestingState(childTagName: string): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            if (_parentTagName) {
                _ancestorFlags = _ancestorFlags | AncestorFlagsByTagName[_parentTagName];
            }
            _parentTagName = _childTagName;
            _childTagName = childTagName;
        }
    }
}

/**
 * We aren't using push/pop API to improve performance, we just store all this data on the stack and restore it when
 * unwinding stack.
 */
export function restoreNestingState(parentTagName: string | undefined, ancestorFlags: AncestorFlags): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            _parentTagName = parentTagName;
            _ancestorFlags = ancestorFlags;
            _childTagName = undefined;
        }
    }
}

/**
 * Get current parent tag name.
 */
export function nestingStateParentTagName(): string | undefined {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            return _parentTagName;
        }
    }
    return;
}

/**
 * Get current ancestor flags.
 */
export function nestingStateAncestorFlags(): AncestorFlags {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            return _ancestorFlags;
        }
    }
    return 0;
}

const REPORT_MSG = "If you are certain that you aren't violating any HTML nesting rules, please submit an issue, and " +
    "temporarily disable HTML child nesting validation with `setDevModeFlags(DevModeFlags.DisableNestingValidation)`.";

/**
 * Check nesting violation.
 *
 * @throws Error when child nesting rules are violated.
 */
export function checkNestingViolation(): void {
    if (__IVI_DEV__) {
        if (!(DEV_MODE & DevModeFlags.DisableNestingValidation)) {
            if (_parentTagName) {
                const validChild = validChildList[_parentTagName];
                if (validChild) {
                    for (let i = 0; i < validChild.length; i++) {
                        if (_childTagName === validChild[i]) {
                            return;
                        }
                    }
                    throw Error(`HTML child nesting rule violation: <${_parentTagName}> element can contain ` +
                        `[${validChild.join(", ")}] elements, but found <${_childTagName}> child.\n` + REPORT_MSG);
                }

                if (_childTagName && _childTagName !== "$t") {
                    const invalidAncestorFlags = invalidAncestorList[_childTagName];
                    if (invalidAncestorFlags && (_ancestorFlags & invalidAncestorFlags)) {
                        throw Error(`HTML child nesting rule violation: <${_childTagName}> element has invalid ` +
                            `ancestor [${ancestorFlagsToTagNames(invalidAncestorFlags).join(", ")}].\n` + REPORT_MSG);
                    }
                }
            }
        }
    }
}

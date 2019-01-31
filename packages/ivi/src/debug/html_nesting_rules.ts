import { NodeFlags } from "../vdom/node_flags";
import { OpNode } from "../vdom/operations";
import { OpState } from "../vdom/state";

/**
 * HTML nesting rules.
 *
 * Some HTML Elements have restrictions on which nodes can be nested, for example `table` Element can only have
 * `tbody`, `thead`, etc as its children. Browsers are handling such cases in a way that they automatically inject
 * missing elements or close existing elements, to prevent such behaviour we are just throwing errors in Dev Mode
 * when HTML nesting rules are violated.
 */

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
const ANCESTOR_FLAGS_BY_TAG_NAME: { [tagName: string]: AncestorFlags } = {
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
 * @param aFlags AncestorFlags.
 * @returns list of tagNames.
 */
function ancestorFlagsToTagNames(aFlags: AncestorFlags): string[] {
  const result = [] as string[];
  if ((aFlags & AncestorFlags.Select) !== 0) {
    result.push("select");
  }
  if ((aFlags & AncestorFlags.OptGroup) !== 0) {
    result.push("optgroup");
  }
  if ((aFlags & AncestorFlags.Option) !== 0) {
    result.push("option");
  }
  if ((aFlags & AncestorFlags.Table) !== 0) {
    result.push("table");
  }
  if ((aFlags & AncestorFlags.TableBlock) !== 0) {
    result.push("tbody", "thead", "tfoot");
  }
  if ((aFlags & AncestorFlags.TableRow) !== 0) {
    result.push("tr");
  }
  if ((aFlags & AncestorFlags.Header) !== 0) {
    result.push("h1", "h2", "h3", "h4", "h5", "h6");
  }
  if ((aFlags & AncestorFlags.Form) !== 0) {
    result.push("form");
  }
  if ((aFlags & AncestorFlags.Anchor) !== 0) {
    result.push("a");
  }
  if ((aFlags & AncestorFlags.ListItem) !== 0) {
    result.push("li");
  }
  if ((aFlags & AncestorFlags.DescriptionListItem) !== 0) {
    result.push("dd", "dt");
  }
  if ((aFlags & AncestorFlags.RubyAnnotation) !== 0) {
    result.push("rp", "rt");
  }
  return result;
}

/**
 * Traverses tree to the body and calculates `AncestorFlags`.
 *
 * @param element
 * @returns Ancestor Flags.
 */
function calculateAncestorFlags(element: Element | null): AncestorFlags {
  let result = 0;
  while (element !== null && (element !== document.body)) {
    result |= ANCESTOR_FLAGS_BY_TAG_NAME[element.tagName.toLowerCase()];
    element = element.parentElement;
  }
  return result;

  return 0;
}

/**
 * List of child elements that allowed in `parent` elements.
 */
const VALID_CHILDREN: { [parent: string]: string[] } = /*#__PURE__*/(() => {
  const r: { [parent: string]: string[] } = {
    "select": ["option", "optgroup", "$t"],
    "optgroup": ["option", "$t"],
    "option": ["$t"],
    "tr": ["th", "td", "style", "script", "template"],
    "tbody": ["tr", "style", "script", "template"],
    "colgroup": ["col", "template"],
    "table": ["caption", "colgroup", "tbody", "tfoot", "thead", "style", "script", "template"],
  };
  r["thead"] = r["tbody"];
  r["tfoot"] = r["tbody"];
  return r;
})();

/**
 * List of invalid ancestors for `child` elements.
 */
const INVALID_ANCESTOR_LIST: { [child: string]: AncestorFlags } = {
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

function visitNode(opState: OpState, parentTagName: string, ancestorFlags: AncestorFlags): void {
  const flags = opState.f;

  if ((flags & (NodeFlags.Element | NodeFlags.Text)) !== 0) {
    const tagName = ((flags & NodeFlags.Text) !== 0) ? "$t" : (opState.o as OpNode).t.d as string;

    const validChildren = VALID_CHILDREN[parentTagName];
    if (validChildren) {
      for (const validTagName of validChildren) {
        if (tagName === validTagName) {
          break;
        }
        throw Error(`HTML child nesting rule violation: <${parentTagName}> element can contain ` +
          `[${validChildren.join(", ")}] elements, but found <${tagName}> child.\n`);
      }
    }

    if (tagName !== "$t") {
      const invalidAncestorFlags = INVALID_ANCESTOR_LIST[tagName];
      if (invalidAncestorFlags !== undefined && ((ancestorFlags & invalidAncestorFlags) !== 0)) {
        throw Error(`HTML child nesting rule violation: <${tagName}> element has invalid ` +
          `ancestor [${ancestorFlagsToTagNames(invalidAncestorFlags).join(", ")}].\n`);
      }
    }

    parentTagName = tagName;
    ancestorFlags |= ANCESTOR_FLAGS_BY_TAG_NAME[parentTagName];
  }

  const children = opState.c;
  if ((flags & (NodeFlags.Fragment | NodeFlags.TrackByKey)) !== 0) {
    for (let i = 0; i < (children as Array<OpState | null>).length; i++) {
      const c = (children as Array<OpState | null>)[i];
      if (c !== null) {
        visitNode(c, parentTagName, ancestorFlags);
      }
    }
  } else if (children !== null) {
    visitNode(children as OpState, parentTagName, ancestorFlags);
  }
}

/**
 * checkNestingViolations goes through virtual dom tree and checks for HTML nesting rules violations.
 *
 * @param parent Parent element.
 * @param root Stateful operation root node.
 * @throws Error when child nesting rules are violated.
 */
export function checkNestingViolations(parent: Element, root: OpState): void {
  visitNode(
    root,
    parent.tagName.toLowerCase(),
    calculateAncestorFlags(parent),
  );
}

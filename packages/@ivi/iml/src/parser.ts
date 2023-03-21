import type {
  ITemplate, IProperty, INode, INodeElement, ITemplateType,
} from "@ivi/template-compiler/ir";
import { IPropertyType, INodeType } from "@ivi/template-compiler/ir";

export const parseTemplate = (
  s: string[] | TemplateStringsArray,
  type: ITemplateType,
  tryHoistExpr: (i: number) => boolean,
): ITemplate => {
  if (s.length === 0) {
    throw new TemplateParserError("Template is empty.", 0, 0);
  }
  const comp = COMPILER;
  comp.text = s[0];
  comp.statics = s;
  comp.tryHoistExpr = tryHoistExpr;

  try {
    return {
      type,
      children: parseChildrenList(comp.indent),
    };
  } finally {
    comp.statics = null!;
    comp.text = "";
    comp.e = 0;
    comp.i = 0;
    comp.indent = 0;
  }
};

export class TemplateParserError extends Error {
  staticsOffset: number;
  textOffset: number;

  constructor(message: string, staticsOffset: number, textOffset: number) {
    super(message);
    this.staticsOffset = staticsOffset;
    this.textOffset = textOffset;
  }
}

const parseChildrenList = (indent: number): INode[] => {
  const comp = COMPILER;
  const eSize = comp.statics.length - 1;
  const children: INode[] = [];
  while (comp.indent > indent) {
    if (comp.i < comp.text.length) {
      const s = parseString(false);
      if (s !== "") {
        children.push({
          type: INodeType.Text,
          value: s,
        });
      } else {
        children.push(parseElement());
      }
    } else if (comp.e < eSize) {
      children.push({
        type: INodeType.Expr,
        index: expr(),
      });
    } else {
      break;
    }

    whitespace();
  }
  return children;
};

const enum ParseElementState {
  /** Indentation level for inline nodes. */
  InlineIndentLevel = 1 << 16
}

const parseElement = (): INodeElement => {
  const comp = COMPILER;
  const indent = comp.indent;
  const properties: IProperty[] = [];
  const tag = regexp(IDENTIFIER);
  if (tag === void 0) {
    throw new TemplateParserError("Expected a valid tag name.", COMPILER.e, COMPILER.i);
  }
  if (indent < ParseElementState.InlineIndentLevel) {
    comp.indent = ParseElementState.InlineIndentLevel;
  }

  // Dynamic class name
  const classNameExpr = expr();
  if (classNameExpr !== -1) {
    let staticExpr = false;
    if (comp.tryHoistExpr(classNameExpr) === true) {
      staticExpr = true;
    }
    properties.push({
      type: IPropertyType.Attribute,
      key: "class",
      value: classNameExpr,
      static: staticExpr,
    });
  } else {
    // parse class names, e.g. `div.classA.classB`
    let value;
    while (comp.i < comp.text.length) {
      const c = comp.text.charCodeAt(comp.i);
      if (c === CharCode.Dot) {
        comp.i++;
        const id = regexp(IDENTIFIER);
        if (id === void 0) {
          throw new TemplateParserError("Expected a valid class name.", COMPILER.e, COMPILER.i);
        }
        value = (value === void 0)
          ? id
          : value + " " + id;
      } else {
        break;
      }
    }
    if (value !== void 0) {
      properties.push({
        type: IPropertyType.Attribute,
        key: "class",
        value,
        static: false,
      });
    }
  }

  whitespace();
  while (comp.indent > indent && comp.i < comp.text.length) {
    const c = comp.text.charCodeAt(comp.i);
    if (c === CharCode.Colon) { // :attribute
      comp.i++;
      const key = regexp(IDENTIFIER);
      if (key === void 0) {
        throw new TemplateParserError("Expected a valid attribute name.", COMPILER.e, COMPILER.i);
      }
      attributeProp(properties, key);
    } else if (c === CharCode.EqualsTo) { // =textContent
      comp.i++;
      const value = expr();
      if (value === -1) {
        throw new TemplateParserError("Expected a text content expression.", COMPILER.e, COMPILER.i);
      }
      properties.push({
        type: IPropertyType.Value,
        key: "textContent",
        value,
        static: false,
      });
    } else if (c === CharCode.Dot) { // .property
      comp.i++;
      const key = regexp(JS_PROPERTY);
      if (key === void 0) {
        throw new TemplateParserError("Expected a valid property name.", COMPILER.e, COMPILER.i);
      }
      dynamicProp(properties, IPropertyType.Value, key);
    } else if (c === CharCode.Asterisk) { // *value
      comp.i++;
      const key = regexp(JS_PROPERTY);
      if (key === void 0) {
        throw new TemplateParserError("Expected a valid property name.", COMPILER.e, COMPILER.i);
      }
      dynamicProp(properties, IPropertyType.DOMValue, key);
    } else if (c === CharCode.Tilde) { // ~style
      comp.i++;
      const key = regexp(IDENTIFIER);
      if (key === void 0) {
        throw new TemplateParserError("Expected a valid style name.", COMPILER.e, COMPILER.i);
      }
      dynamicProp(properties, IPropertyType.Style, key);
    } else if (c === CharCode.AtSign) { // @event
      comp.i++;
      const key = regexp(IDENTIFIER);
      if (key === void 0) {
        throw new TemplateParserError("Expected a valid event name.", COMPILER.e, COMPILER.i);
      }
      dynamicProp(properties, IPropertyType.Event, key);
    } else if (c === 36) { // $${directive}
      comp.i++;
      const value = expr();
      if (value === -1) {
        throw new TemplateParserError("Expected an attribute directive expression.", COMPILER.e, COMPILER.i);
      }
      properties.push({
        type: IPropertyType.Directive,
        key: null,
        value,
        static: false,
      });
    } else {
      break;
    }

    whitespace();
  }

  if (!VOID_ELEMENTS.test(tag!)) {
    return {
      type: INodeType.Element,
      tag,
      properties,
      children: parseChildrenList(indent),
    };
  }

  return {
    type: INodeType.Element,
    tag,
    properties,
    children: [],
  };
};

/**
 * Template Compiler.
 */
interface TemplateCompiler {
  /** Static strings. */
  statics: string[] | TemplateStringsArray;
  /** Current static string. */
  text: string;
  /** Text index. */
  i: number;
  /** Expr index. */
  e: number;

  /** Curent node indentation level. */
  indent: number;
  /** Try hoist expression. */
  tryHoistExpr: (i: number) => boolean,
}

const COMPILER: TemplateCompiler = Object.seal({
  statics: null!,
  text: "",
  i: 0,
  e: 0,
  indent: 0,
  tryHoistExpr: null!,
});

const IDENTIFIER = /[a-zA-Z_][\w-]*/y;
const JS_PROPERTY = /[a-zA-Z_$][\w]*/y;

const expr = (): number => {
  const c = COMPILER;
  let e;
  return (c.i === c.text.length && (e = c.e) < (c.statics.length - 1))
    ? (c.i = 0, c.text = c.statics[++c.e], e)
    : -1;
};

/**
 * `RegExp` should have sticky "y" flag.
 */
const regexp = (re: RegExp): string | undefined => {
  const c = COMPILER;
  re.lastIndex = c.i;
  const match = re.exec(c.text);
  if (match !== null) {
    const m = match[0];
    c.i += m.length;
    return m;
  }
  return void 0;
};

/**
 * Skips whitespace and returns indentation level.
 *
 * @returns Indentation level.
 */
const whitespace = (): boolean => {
  const comp = COMPILER;
  const text = comp.text;
  let i = comp.i;
  let indent = comp.indent;
  while (i < text.length) {
    const c = text.charCodeAt(i++);
    if (c === CharCode.Space || c === CharCode.Tab) {
      indent++;
      continue;
    }
    if (c === CharCode.Newline || c === CharCode.CarriageReturn) {
      indent = 0;
      continue;
    }
    i--;
    break;
  }

  return (i !== comp.i)
    ? (comp.indent = indent, comp.i = i, true)
    : false;
};

/**
 * Two types of strings:
 *
 * 'basic string'
 * ##'stri'n'g'##
 */
const parseString = (isAttribute: boolean): string => {
  const comp = COMPILER;
  const text = comp.text;
  const textLength = text.length;
  let i = comp.i;
  if (i < textLength) {
    let s = "";
    let hashDelim = 0;
    let c;

    while ((c = text.charCodeAt(i++)) === CharCode.Hash && i < textLength) {
      hashDelim++;
    }

    if (c === CharCode.Quote) {
      let start = i;
      outer: while (i < textLength) {
        c = c = text.charCodeAt(i++);
        if (c === CharCode.Quote) {
          const end = i - 1;
          const j = i + hashDelim;
          if (j > textLength) {
            throw new TemplateParserError("Invalid string.", COMPILER.e, COMPILER.i);
          }
          while (i < j) {
            if (text.charCodeAt(i) !== CharCode.Hash) {
              continue outer;
            }
            i++;
          }
          comp.i = i;
          return s + text.substring(start, end);
        }

        let escaped: string;
        if (c === CharCode.Ampersand) {
          escaped = "&amp;"; // &
        } else if (isAttribute === true) {
          if (c !== CharCode.DoubleQuote) {
            continue;
          }
          escaped = "&quot;";
        } else if (c === CharCode.LessThan) { // StringContext.Text
          escaped = "&lt;";
        } else {
          continue;
        }

        s += text.substring(start, i - 1) + escaped;
        start = i;
      }
    }
  }
  return "";
};

const eq = (): boolean => {
  const comp = COMPILER;
  const text = comp.text;
  return (comp.i < text.length && text.charCodeAt(comp.i) === CharCode.EqualsTo)
    ? (comp.i++, true)
    : false;
};

const attributeProp = (properties: IProperty[], key: string) => {
  let value: string | boolean | number = true;
  if (eq()) { // =
    value = parseString(true);
    if (value === "") {
      value = expr();
      if (value === -1) {
        throw new TemplateParserError("Expected a string or an expression.", COMPILER.e, COMPILER.i);
      }
    }
  }
  properties.push({
    type: IPropertyType.Attribute,
    key,
    value,
    static: false,
  });
};

const dynamicProp = (properties: IProperty[], type: IPropertyType, key: string) => {
  if (!eq()) {
    throw new TemplateParserError("Expected a '=' character.", COMPILER.e, COMPILER.i);
  }
  const value = expr();
  if (value === -1) {
    throw new TemplateParserError("Expected an expression.", COMPILER.e, COMPILER.i);
  }
  properties.push({
    type,
    key,
    value,
  } as IProperty);
};

const VOID_ELEMENTS = /^(audio|video|embed|input|param|source|textarea|track|area|base|link|meta|br|col|hr|img|wbr)$/;

/**
 * ASCII Char Codes.
 */
const enum CharCode {
  /** \\t */Tab = 9,
  /** \\n */Newline = 10,
  /** \\r */CarriageReturn = 13,
  /**     */Space = 32,
  /**  \" */DoubleQuote = 34,
  /**  \# */Hash = 35,
  /**   & */Ampersand = 38,
  /**   ' */Quote = 39,
  /**  \* */Asterisk = 42,
  /**  \+ */PlusSign = 43,
  /**  \- */MinusSign = 45,
  /**   . */Dot = 46,
  /**   : */Colon = 58,
  /**   < */LessThan = 60,
  /**   = */EqualsTo = 61,
  /**   @ */AtSign = 64,
  /**   ~ */Tilde = 126,
}

import {
  type ITemplate, type IProperty, type INode, type INodeElement, type INodeText,
  ITemplateType, IPropertyType, INodeType,
} from "../template/ir.js";
import {
  CharCode, isVoidElement, TemplateParserError, TemplateScanner,
} from "../template/parser.js";

export const parseTemplate = (
  s: string[] | TemplateStringsArray,
  type: ITemplateType,
  tryHoistExpr: (i: number) => boolean,
): ITemplate => {
  const parser = new TemplateParser(s, tryHoistExpr);
  return {
    type,
    children: parser.parse(),
  };
};

export class TemplateParser extends TemplateScanner {
  readonly tryHoistExpr: (i: number) => boolean;

  constructor(
    statics: string[] | TemplateStringsArray,
    tryHoistExpr: (i: number) => boolean,
  ) {
    super(statics);
    this.tryHoistExpr = tryHoistExpr;
  }

  parse(): INode[] {
    return this.parseChildrenList();
  }

  parseChildrenList(): INode[] {
    const children: INode[] = [];
    let whitespaceState = this.whitespace();
    while (!this.isEnd()) {
      const c = this.peekCharCode();
      if (c !== -1) {
        if (c === CharCode.LessThan) {
          if (whitespaceState & WhitespaceState.Whitespace) {
            if (
              !(whitespaceState & WhitespaceState.ContainsNewline) ||
              (whitespaceState & WhitespaceState.ContainsVerticalTab)
            ) {
              children.push(SPACE_TEXT_NODE);
            }
          }
          if (this.peekCharCode(1) === CharCode.Slash) {
            break;
          }
          children.push(this.parseElement());
        } else {
          children.push({
            type: INodeType.Text,
            value: this.parseText(whitespaceState),
          });
        }
      } else {
        const expr = this.expr();
        if (expr !== -1) {
          if (whitespaceState & WhitespaceState.Whitespace) {
            if (
              !(whitespaceState & WhitespaceState.ContainsNewline) ||
              (whitespaceState & WhitespaceState.ContainsVerticalTab)
            ) {
              children.push(SPACE_TEXT_NODE);
            }
          }
          children.push({
            type: INodeType.Expr,
            value: expr,
          });
        } else {
          break;
        }
      }

      whitespaceState = this.whitespace();
    }
    return children;
  }

  parseElement(): INodeElement {
    if (!this.charCode(CharCode.LessThan)) {
      throw new TemplateParserError("Expected a '<' character.", this.e, this.i);
    }
    const tag = this.regExp(IDENTIFIER);
    if (tag === void 0) {
      throw new TemplateParserError("Expected a valid tag name.", this.e, this.i);
    }

    this.whitespace();
    const properties = this.parseAttributes();

    let children: INode[];
    if (this.charCode(CharCode.Slash)) {
      if (!this.charCode(CharCode.MoreThan)) {
        throw new TemplateParserError("Expected a '>' character.", this.e, this.i);
      }
      children = [];
    } else {
      if (!this.charCode(CharCode.MoreThan)) {
        throw new TemplateParserError("Expected a '>' character.", this.e, this.i);
      }

      if (isVoidElement(tag)) {
        children = [];
      } else {
        children = this.parseChildrenList();
        if (!this.charCode(CharCode.LessThan)) {
          throw new TemplateParserError("Expected a '<' character.", this.e, this.i);
        }
        if (!this.charCode(CharCode.Slash)) {
          throw new TemplateParserError("Expected a '/' character.", this.e, this.i);
        }
        if (!this.string(tag)) {
          throw new TemplateParserError(`Expected a '${tag}' tag name.`, this.e, this.i);
        }
        this.whitespace();
        if (!this.charCode(CharCode.MoreThan)) {
          throw new TemplateParserError("Expected a '>' character.", this.e, this.i);
        }
      }
    }

    return {
      type: INodeType.Element,
      tag,
      properties,
      children,
    };
  }

  parseAttributes(): IProperty[] {
    const properties: IProperty[] = [];
    while (!this.isEnd()) {
      const c = this.peekCharCode();

      if (c === -1) { // shorthand syntax for directives
        properties.push({
          type: IPropertyType.Directive,
          key: null,
          value: this.expr(),
          hoist: false,
        });

        this.whitespace();
        continue;
      }
      if (c === CharCode.Slash || c === CharCode.MoreThan) {
        return properties;
      }
      if (c === CharCode.Dot) { // .property
        this.i++;
        const key = this.regExp(JS_PROPERTY);
        if (key === void 0) {
          throw new TemplateParserError("Expected a valid property name.", this.e, this.i);
        }
        this.dynamicProp(properties, IPropertyType.Value, key);
      } else if (c === CharCode.Asterisk) { // *value
        this.i++;
        const key = this.regExp(JS_PROPERTY);
        if (key === void 0) {
          throw new TemplateParserError("Expected a valid property name.", this.e, this.i);
        }
        this.dynamicProp(properties, IPropertyType.DOMValue, key);
      } else if (c === CharCode.Tilde) { // ~style
        this.i++;
        const key = this.regExp(IDENTIFIER);
        if (key === void 0) {
          throw new TemplateParserError("Expected a valid style name.", this.e, this.i);
        }
        let value: string | number;
        if (!this.charCode(CharCode.EqualsTo)) {
          throw new TemplateParserError("Expected a '=' character.", this.e, this.i);
        }
        const c = this.peekCharCode();
        if (c !== -1) {
          if (c !== CharCode.DoubleQuote) {
            throw new TemplateParserError("Expected a string or an expression.", this.e, this.i);
          }
          value = this.parseAttributeString();
        } else {
          value = this.expr();
          if (value === -1) {
            throw new TemplateParserError("Expected a string or an expression.", this.e, this.i);
          }
        }
        properties.push({
          type: IPropertyType.Style,
          key,
          value,
          hoist: false,
        });
      } else if (c === CharCode.AtSign) { // @event
        this.i++;
        const key = this.regExp(IDENTIFIER);
        if (key === void 0) {
          throw new TemplateParserError("Expected a valid event name.", this.e, this.i);
        }
        this.dynamicProp(properties, IPropertyType.Event, key);
      } else {
        const key = this.regExp(IDENTIFIER);
        if (key === void 0) {
          throw new TemplateParserError("Expected a valid attribute name.", this.e, this.i);
        }

        let staticAttr = false;
        let value: string | boolean | number = true;
        if (this.charCode(CharCode.EqualsTo)) { // =
          const c = this.peekCharCode();
          if (c !== -1) {
            if (c !== CharCode.DoubleQuote) {
              throw new TemplateParserError("Expected a string or an expression.", this.e, this.i);
            }
            value = this.parseAttributeString();
          } else {
            value = this.expr();
            if (value === -1) {
              throw new TemplateParserError("Expected a string or an expression.", this.e, this.i);
            }
            if (key === "class" && this.tryHoistExpr(value)) {
              staticAttr = true;
            }
          }
        }
        properties.push({
          type: IPropertyType.Attribute,
          key,
          value,
          hoist: staticAttr,
        });
      }
      this.whitespace();
    }
    throw new TemplateParserError("Expected a '>' character", this.e, this.i);
  }

  dynamicProp(properties: IProperty[], type: IPropertyType, key: string) {
    if (!this.charCode(CharCode.EqualsTo)) {
      throw new TemplateParserError("Expected a '=' character.", this.e, this.i);
    }
    const value = this.expr();
    if (value === -1) {
      throw new TemplateParserError("Expected an expression.", this.e, this.i);
    }
    properties.push({
      type,
      key,
      value,
      hoist: false,
    } as IProperty);
  }

  parseAttributeString(): string {
    const text = this.text;
    const textLength = text.length;
    let i = this.i;
    let s = "";
    let c = text.charCodeAt(i);

    let delimCharCode: number;
    if (c === CharCode.SingleQuote) {
      delimCharCode = CharCode.SingleQuote;
    } else if (c === CharCode.DoubleQuote) {
      delimCharCode = CharCode.DoubleQuote;
    } else {
      throw new TemplateParserError("Expected ' or \" character.", this.e, i);
    }

    let start = ++i;
    while (i < textLength) {
      c = text.charCodeAt(i++);
      if (c === delimCharCode) {
        const end = i - 1;
        this.i = i;
        return s + text.substring(start, end);
      }
    }

    throw new TemplateParserError(
      `Attribute string should be closed with a '${String.fromCharCode(delimCharCode)}' character`,
      this.e,
      i,
    );
  }

  parseText(state: number): string {
    const text = this.text;
    let chars = [];
    while (!this.isEnd()) {
      if (this.i < text.length) {
        const c = text.charCodeAt(this.i);
        if (c === CharCode.LessThan) {
          break;
        }
        if (c === CharCode.Space || c === CharCode.Tab) {
          this.i++;
          state |= WhitespaceState.Whitespace;
          continue;
        }
        if (c === CharCode.Newline || c === CharCode.CarriageReturn) {
          this.i++;
          state |= WhitespaceState.ContainsNewline;
          continue;
        }
        if (c === CharCode.VerticalTab) {
          this.i++;
          state |= WhitespaceState.ContainsVerticalTab;
          continue;
        }
        if (state & WhitespaceState.Whitespace) {
          if (
            (state & (WhitespaceState.TextContent | WhitespaceState.ContainsVerticalTab)) ||
            !(state & WhitespaceState.ContainsNewline)
          ) {
            chars.push(CharCode.Space);
          }
        }
        state = WhitespaceState.TextContent;
        chars.push(c);
        this.i++;
      }

      if (this.peekExpr() !== -1) {
        break;
      }
    }

    if (state & WhitespaceState.Whitespace) {
      if (!(state & WhitespaceState.ContainsNewline) || (state & WhitespaceState.ContainsVerticalTab)) {
        chars.push(CharCode.Space);
      }
    }
    if (chars.length !== 0) {
      if (chars.length > (1 << 16)) {
        throw new TemplateParserError("Text string is too long (>64k)", this.e, this.i);
        // Text nodes are splitted into two nodes when they exceed their length limit (64k).
        // https://github.com/chromium/chromium/blob/91159249db3086f17b28b7a060f55ec0345c24c7/third_party/blink/renderer/core/dom/text.h#L42
      }
      return _String.fromCharCode(...chars);
    }
    return "";
  }

  whitespace(): number {
    const text = this.text;
    let state = 0;
    let i = this.i;
    while (i < text.length) {
      const c = text.charCodeAt(i);
      if (c === CharCode.Space || c === CharCode.Tab) {
        i++;
        continue;
      }
      if (c === CharCode.Newline || c === CharCode.CarriageReturn) {
        i++;
        state |= WhitespaceState.ContainsNewline;
        continue;
      }
      if (c === CharCode.VerticalTab) {
        i++;
        state |= WhitespaceState.ContainsVerticalTab;
        continue;
      }
      break;
    }

    if (i !== this.i) {
      this.i = i;
      return state | WhitespaceState.Whitespace;
    }
    return 0;
  }
}

const enum WhitespaceState {
  Whitespace = 1,
  ContainsNewline = 1 << 1,
  ContainsVerticalTab = 1 << 2,
  TextContent = 1 << 3,
}

const _String = String;
const IDENTIFIER = /[a-zA-Z_][\w-]*/y;
const JS_PROPERTY = /[a-zA-Z_$][\w]*/y;

const SPACE_TEXT_NODE: INodeText = {
  type: INodeType.Text,
  value: " ",
};

import type {
  ITemplate, IProperty, INode, INodeElement, ITemplateType,
} from "ivi/template/ir";
import { IPropertyType, INodeType } from "ivi/template/ir";
import {
  CharCode, isVoidElement, TemplateParserError, TemplateScanner,
} from "ivi/template/parser";

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
  indent: number;

  constructor(
    statics: string[] | TemplateStringsArray,
    tryHoistExpr: (i: number) => boolean,
  ) {
    super(statics);
    this.tryHoistExpr = tryHoistExpr;
    this.indent = 0;
  }

  parse(): INode[] {
    return this.parseChildrenList(-1);
  }

  parseChildrenList(indent: number): INode[] {
    const children: INode[] = [];
    this.skipWhitespace();
    while (this.indent > indent && !this.isEnd()) {
      const c = this.peekCharCode();
      if (c !== -1) {
        if (
          c === CharCode.SingleQuote ||
          c === CharCode.DoubleQuote ||
          c === CharCode.Hash
        ) {
          children.push({
            type: INodeType.Text,
            value: this.parseTextString(),
          });
        } else {
          children.push(this.parseElement());
        }
      } else {
        const expr = this.expr();
        if (expr !== -1) {
          children.push({
            type: INodeType.Expr,
            value: expr,
          });
        } else {
          break;
        }
      }

      this.skipWhitespace();
    }
    return children;
  }

  parseElement(): INodeElement {
    const indent = this.indent;
    const properties: IProperty[] = [];

    const tag = this.regExp(IDENTIFIER);
    if (tag === void 0) {
      throw new TemplateParserError("Expected a valid tag name.", this.e, this.i);
    }

    if (indent < ParseElementState.InlineIndentLevel) {
      this.indent = ParseElementState.InlineIndentLevel;
    }

    // Dynamic class name
    const classNameExpr = this.expr();
    if (classNameExpr !== -1) {
      let staticExpr = false;
      if (this.tryHoistExpr(classNameExpr)) {
        staticExpr = true;
      }
      properties.push({
        type: IPropertyType.Attribute,
        key: "class",
        value: classNameExpr,
        hoist: staticExpr,
      });
    } else {
      // parse class names, e.g. `div.classA.classB`
      let value;
      let c;
      while ((c = this.peekCharCode()) !== -1) {
        if (c === CharCode.Dot) {
          this.i++;
          const id = this.regExp(IDENTIFIER);
          if (id === void 0) {
            throw new TemplateParserError("Expected a valid class name.", this.e, this.i);
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
          hoist: false,
        });
      }
    }

    this.skipWhitespace();
    let c;
    while (this.indent > indent && ((c = this.peekCharCode()) !== -1)) {
      if (c === CharCode.Colon) { // :attribute
        this.i++;
        const key = this.regExp(IDENTIFIER);
        if (key === void 0) {
          throw new TemplateParserError("Expected a valid attribute name.", this.e, this.i);
        }
        this.attributeProp(properties, key);
      } else if (c === CharCode.EqualsTo) { // =textContent
        this.i++;
        const value = this.expr();
        if (value === -1) {
          throw new TemplateParserError("Expected a text content expression.", this.e, this.i);
        }
        properties.push({
          type: IPropertyType.Value,
          key: "textContent",
          value,
          hoist: false,
        });
      } else if (c === CharCode.Dot) { // .property
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
          if (
            c === CharCode.SingleQuote ||
            c === CharCode.DoubleQuote ||
            c === CharCode.Hash
          ) {
            value = this.parseAttributeString();
          } else {
            throw new TemplateParserError("Expected a string or an expression.", this.e, this.i);
          }
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
      } else if (c === 36) { // $${directive}
        this.i++;
        const value = this.expr();
        if (value === -1) {
          throw new TemplateParserError("Expected an attribute directive expression.", this.e, this.i);
        }
        properties.push({
          type: IPropertyType.Directive,
          key: null,
          value,
          hoist: false,
        });
      } else {
        break;
      }

      this.skipWhitespace();
    }

    return {
      type: INodeType.Element,
      tag,
      properties,
      children: (
        isVoidElement(tag)
          ? []
          : this.parseChildrenList(indent)
      ),
    };
  }

  attributeProp(properties: IProperty[], key: string) {
    let value: string | boolean | number = true;
    if (this.charCode(CharCode.EqualsTo)) { // =
      const c = this.peekCharCode();
      if (c !== -1) {
        if (
          c === CharCode.SingleQuote ||
          c === CharCode.DoubleQuote ||
          c === CharCode.Hash
        ) {
          value = this.parseAttributeString();
        } else {
          throw new TemplateParserError("Expected a string or an expression.", this.e, this.i);
        }
      } else {
        value = this.expr();
        if (value === -1) {
          throw new TemplateParserError("Expected a string or an expression.", this.e, this.i);
        }
      }
    }
    properties.push({
      type: IPropertyType.Attribute,
      key,
      value,
      hoist: false,
    });
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
    let hashDelim = 0;
    let c;

    while ((c = text.charCodeAt(i)) === CharCode.Hash) {
      hashDelim++;
      if (i === textLength) {
        throw new TemplateParserError("Invalid attribute string.", this.e, i);
      }
      i++;
    }

    let delimCharCode: number;
    if (c === CharCode.SingleQuote) {
      delimCharCode = CharCode.SingleQuote;
    } else if (c === CharCode.DoubleQuote) {
      delimCharCode = CharCode.DoubleQuote;
    } else {
      throw new TemplateParserError("Expected ' or \" character.", this.e, i);
    }

    let start = ++i;
    outer: while (i < textLength) {
      c = text.charCodeAt(i++);
      if (c === delimCharCode) {
        const end = i - 1;
        const j = i + hashDelim;
        if (j > textLength) {
          throw new TemplateParserError(
            `Attribute string should be closed with ${hashDelim} '#' characters.`,
            this.e,
            i,
          );
        }
        while (i < j) {
          if (text.charCodeAt(i) !== CharCode.Hash) {
            continue outer;
          }
          i++;
        }
        this.i = i;
        return s + text.substring(start, end);
      }

      let escaped: string;
      if (c === CharCode.Ampersand) {
        escaped = "&amp;"; // &
      } else if (c === CharCode.DoubleQuote) {
        escaped = "&quot;";
      } else {
        continue;
      }

      s += text.substring(start, i - 1) + escaped;
      start = i;
    }

    throw new TemplateParserError(
      `Attribute string should be closed with a '${String.fromCharCode(delimCharCode)}' character`,
      this.e,
      i,
    );
  }

  parseTextString(): string {
    const text = this.text;
    const textLength = text.length;
    let i = this.i;
    let s = "";
    let hashDelim = 0;
    let c;

    while ((c = text.charCodeAt(i)) === CharCode.Hash) {
      hashDelim++;
      if (i === textLength) {
        throw new TemplateParserError("Invalid text string.", this.e, i);
      }
      i++;
    }

    let delimCharCode: number;
    if (c === CharCode.SingleQuote) {
      delimCharCode = CharCode.SingleQuote;
    } else if (c === CharCode.DoubleQuote) {
      delimCharCode = CharCode.DoubleQuote;
    } else {
      throw new TemplateParserError("Expected ' or \" character.", this.e, i);
    }

    let start = ++i;
    outer: while (i < textLength) {
      c = text.charCodeAt(i++);
      if (c === delimCharCode) {
        const end = i - 1;
        const j = i + hashDelim;
        if (j > textLength) {
          throw new TemplateParserError(
            `Text string should be closed with ${hashDelim} '#' characters.`,
            this.e,
            i,
          );
        }
        while (i < j) {
          if (text.charCodeAt(i) !== CharCode.Hash) {
            continue outer;
          }
          i++;
        }
        s += text.substring(start, end);
        if (s.length > (1 << 16)) {
          throw new TemplateParserError("Text string is too long (>64k)", this.e, i - 1);
          // Text nodes are splitted into two nodes when they exceed their length limit (64k).
          // https://github.com/chromium/chromium/blob/91159249db3086f17b28b7a060f55ec0345c24c7/third_party/blink/renderer/core/dom/text.h#L42
        }
        this.i = i;
        return s;
      }

      let escaped: string;
      if (c === CharCode.Ampersand) {
        escaped = "&amp;"; // &
      } else if (c === CharCode.LessThan) { // StringContext.Text
        escaped = "&lt;";
      } else {
        continue;
      }

      s += text.substring(start, i - 1) + escaped;
      start = i;
    }

    throw new TemplateParserError(
      `Text string should be closed with a '${String.fromCharCode(delimCharCode)}' character`,
      this.e,
      i,
    );
  }

  skipWhitespace(): boolean {
    const text = this.text;
    let i = this.i;
    let indent = this.indent;
    while (i < text.length) {
      const c = text.charCodeAt(i);
      if (c === CharCode.Space || c === CharCode.Tab) {
        i++;
        indent++;
        continue;
      }
      if (c === CharCode.Newline || c === CharCode.CarriageReturn) {
        i++;
        indent = 0;
        continue;
      }
      break;
    }

    if (i !== this.i) {
      this.indent = indent;
      this.i = i;
      return true;
    }
    return false;
  }
}

const enum ParseElementState {
  /** Indentation level for inline nodes. */
  InlineIndentLevel = 1 << 16
}

const IDENTIFIER = /[a-zA-Z_][\w-]*/y;
const JS_PROPERTY = /[a-zA-Z_$][\w]*/y;

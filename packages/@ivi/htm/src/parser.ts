import type {
  ITemplate, IProperty, INode, INodeElement, ITemplateType,
} from "@ivi/template-compiler/ir";
import { IPropertyType, INodeType } from "@ivi/template-compiler/ir";
import {
  CharCode, isVoidElement, TemplateParserError, TemplateScanner,
} from "@ivi/template-compiler/parser";

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
    this.skipWhitespace();
    while (!this.isEnd()) {
      const c = this.peekCharCode();
      if (c !== -1) {
        if (c === CharCode.LessThan) {
          if (this.peekCharCode(1) === CharCode.Slash) {
            break;
          }
          children.push(this.parseElement());
        } else {
          children.push({
            type: INodeType.Text,
            value: this.parseText(),
          });
        }
      } else {
        const expr = this.expr();
        if (expr !== -1) {
          children.push({
            type: INodeType.Expr,
            index: expr,
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
    if (!this.charCode(CharCode.LessThan)) {
      throw new TemplateParserError("Expected a '<' character.", this.e, this.i);
    }
    this.skipWhitespace();
    const tag = this.regExp(IDENTIFIER);
    if (tag === void 0) {
      throw new TemplateParserError("Expected a valid tag name.", this.e, this.i);
    }

    this.skipWhitespace();
    const properties = this.parseAttributes();

    if (!this.charCode(CharCode.MoreThan)) {
      throw new TemplateParserError("Expected a '>' character.", this.e, this.i);
    }

    let children: INode[];
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
      this.skipWhitespace();
      if (!this.string(tag)) {
        throw new TemplateParserError(`Expected a '${tag}' tag name.`, this.e, this.i);
      }
      this.skipWhitespace();
      if (!this.charCode(CharCode.MoreThan)) {
        throw new TemplateParserError("Expected a '>' character.", this.e, this.i);
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
      if (c !== -1) {
        if (c === CharCode.MoreThan) {
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
          this.dynamicProp(properties, IPropertyType.Style, key);
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
          this.skipWhitespace();

          let value: string | boolean | number = true;
          if (this.charCode(CharCode.EqualsTo)) { // =
            this.skipWhitespace();
            const c = this.peekCharCode();
            if (c !== -1) {
              if (c === CharCode.DoubleQuote) {
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
            static: false,
          });
        }
        this.skipWhitespace();
        continue;
      }
      const value: string | boolean | number = this.expr();
      if (value !== -1) {
        properties.push({
          type: IPropertyType.Directive,
          key: null,
          value,
          static: false,
        });
      }
      this.skipWhitespace();
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

  parseText(): string {
    let char;
    let chars = [];
    let skipWhitespace = true;
    while (true) {
      if (this.isEnd()) {
        throw new TemplateParserError("Unexpected end of template", this.e, this.i);
      }
      if (this.peekExpr() !== -1) {
        break;
      }
      if ((char = this.peekCharCode()) === CharCode.LessThan) {
        break;
      }
      if (skipWhitespace) {
        if (!isWhitespace(char)) {
          skipWhitespace = false;
          chars.push(char);
        }
      } else {
        if (isWhitespace(char)) {
          skipWhitespace = true;
          chars.push(CharCode.Space);
        } else {
          chars.push(char);
        }
      }

      this.i++;
    }

    if (chars.length !== 0) {
      if (chars.length > (1 << 16)) {
        throw new TemplateParserError("Text string is too long (>64k)", this.e, this.i);
        // Text nodes are splitted into two nodes when they exceed their length limit (64k).
        // https://github.com/chromium/chromium/blob/91159249db3086f17b28b7a060f55ec0345c24c7/third_party/blink/renderer/core/dom/text.h#L42
      }
      if (skipWhitespace) {
        chars.pop();
      }
      return _String.fromCharCode(...chars);
    }
    return "";
  }

  skipWhitespace(): boolean {
    const text = this.text;
    let i = this.i;
    while (i < text.length) {
      const c = text.charCodeAt(i);
      if (isWhitespace(c)) {
        i++;
      } else {
        break;
      }
    }

    if (i !== this.i) {
      this.i = i;
      return true;
    }
    return false;
  }
}

const _String = String;
const IDENTIFIER = /[a-zA-Z_][\w-]*/y;
const JS_PROPERTY = /[a-zA-Z_$][\w]*/y;

const isWhitespace = (c: number): boolean => (
  c === CharCode.Space ||
  c === CharCode.Newline ||
  c === CharCode.CarriageReturn ||
  c === CharCode.Tab
);

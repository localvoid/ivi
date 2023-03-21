export class TemplateParserError extends Error {
  staticsOffset: number;
  textOffset: number;

  constructor(message: string, staticsOffset: number, textOffset: number) {
    super(message);
    this.staticsOffset = staticsOffset;
    this.textOffset = textOffset;
  }
}

export class TemplateScanner {
  readonly statics: string[] | TemplateStringsArray;
  readonly exprCount: number;
  text: string;
  i: number;
  e: number;

  constructor(statics: string[] | TemplateStringsArray) {
    if (statics.length === 0) {
      throw new TemplateParserError("Template is empty.", 0, 0);
    }

    this.statics = statics;
    this.exprCount = statics.length - 1;
    this.text = statics[0];
    this.i = 0;
    this.e = 0;
  }

  isEnd(): boolean {
    return (
      this.i === this.text.length &&
      this.e === this.exprCount
    );
  }

  peekCharCode(): number {
    return this.i < this.text.length
      ? this.text.charCodeAt(this.i)
      : -1;
  }

  charCode(c: number): boolean {
    if (this.i < this.text.length && this.text.charCodeAt(this.i) === c) {
      this.i++;
      return true;
    }
    return false;
  }

  peekExpr(): number {
    const e = this.e;
    return (e < this.exprCount && this.i === this.text.length)
      ? e
      : -1;
  }

  expr(): number {
    const e = this.e;
    if (e < this.exprCount && this.i === this.text.length) {
      this.i = 0;
      this.text = this.statics[++this.e];
      return e;
    }
    return -1;
  }

  peekString(s: string): boolean {
    const text = this.text;
    const end = this.i + s.length;
    return (
      end <= text.length &&
      text.substring(this.i, end) === s
    );
  }

  string(s: string): boolean {
    const r = this.peekString(s);
    if (r) {
      this.i += s.length;
    }
    return r;
  }

  peekRegExp(re: RegExp): string | undefined {
    if (!re.sticky) {
      throw Error("RegExp should have a sticky flag.");
    }

    re.lastIndex = this.i;
    const match = re.exec(this.text);
    if (match !== null) {
      return match[0];
    }
    return void 0;
  }

  regExp(re: RegExp): string | undefined {
    const r = this.peekRegExp(re);
    if (r !== void 0) {
      this.i += r.length;
    }
    return r;
  }
}

const HTML_VOID_ELEMENTS = (
  /^(audio|video|embed|input|param|source|textarea|track|area|base|link|meta|br|col|hr|img|wbr)$/
);

export const isVoidElement = (tag: string) => HTML_VOID_ELEMENTS.test(tag);

/**
 * ASCII Char Codes.
 */
export const enum CharCode {
  /** "\\t" */Tab = 9,
  /** "\\n" */Newline = 10,
  /** "\\r" */CarriageReturn = 13,
  /** [space] */Space = 32,
  /** "!" */ExclamationMark = 33,
  /** "\\"" */DoubleQuote = 34,
  /** "#" */NumberSign = 35,
  /** "#" */Hash = 35,
  /** "$" */DollarSign = 36,
  /** "%" */PercentSign = 37,
  /** "&" */Ampersand = 38,
  /** "'" */SingleQuote = 39,
  /** "(" */LeftParen = 40,
  /** ")" */RightParen = 41,
  /** "*" */Asterisk = 42,
  /** "+" */PlusSign = 43,
  /** "," */Comma = 44,
  /** "-" */MinusSign = 45,
  /** "." */Dot = 46,
  /** "/" */Slash = 47,
  /** ":" */Colon = 58,
  /** ";" */Semicolon = 59,
  /** "<" */LessThan = 60,
  /** "=" */EqualsTo = 61,
  /** ">" */MoreThan = 62,
  /** "?" */QuestionMark = 63,
  /** "@" */AtSign = 64,
  /** "[" */LeftSquareBracket = 91,
  /** "\" */Backslash = 92,
  /** "]" */RightSquareBracket = 93,
  /** "^" */Caret = 94,
  /** "_" */Underscore = 95,
  /** "`" */GraveAccent = 96,
  /** "{" */LeftCurlyBrace = 123,
  /** "|" */VerticalBar = 124,
  /** "}" */RightCurlyBrace = 125,
  /** "~" */Tilde = 126,
}

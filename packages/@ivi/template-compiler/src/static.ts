import { INodeElement, INodeType, IPropertyType, ITemplate } from "./ir.js";

export type StaticTemplate = (string | Expr)[];

export interface Expr {
  readonly type: ExprType;
  readonly value: number;
}

export const enum ExprType {
  Attribute,
  Text,
}

interface Context {
  readonly result: StaticTemplate;
  last: string | null;
}

export const compileTemplateToStatic = (tpl: ITemplate): StaticTemplate => {
  const result: StaticTemplate = [];
  const ctx: Context = {
    result,
    last: null,
  };
  const children = tpl.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case INodeType.Element:
        compileNode(ctx, child);
        break;
      case INodeType.Expr:
        expr(ctx, ExprType.Text, child.value);
        break;
      case INodeType.Text:
        emit(ctx, child.value);
    }
  }
  return result;
};

const emit = (ctx: Context, s: string) => {
  if (ctx.last !== null) {
    ctx.last += s;
  } else {
    ctx.last = s;
  }
};

const expr = (ctx: Context, type: ExprType, value: number) => {
  if (ctx.last !== null) {
    ctx.result.push(ctx.last, { type, value });
    ctx.last = null;
  } else {
    ctx.result.push({ type, value });
  }
};

const compileNode = (ctx: Context, node: INodeElement) => {
  const { tag, properties, children } = node;

  emit(ctx, `<${tag}`);
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    const type = prop.type;
    if (type === IPropertyType.Attribute) {
      const { key, value } = prop;
      if (typeof value === "number") {
        emit(ctx, ` ${key}="`);
        expr(ctx, ExprType.Attribute, value);
        emit(ctx, `"`);
      } else if (value === true) {
        emit(ctx, ` ${key}`);
      } else {
        emit(ctx, ` ${key}="${value}"`);
      }
    }
  }
  emit(ctx, `>`);
  if (VOID_ELEMENTS.test(tag)) {
    if (children.length > 0) {
      throw new Error(`Invalid template, void element '${tag}' shouldn't have any children.`);
    }
    return;
  }

  let state = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case INodeType.Element:
        compileNode(ctx, child);
        state = 0;
        break;
      case INodeType.Text:
        if ((state & 3) === 3) {
          emit(ctx, "<!>");
        }
        state = 1;
        emit(ctx, child.value);
        break;
      case INodeType.Expr:
        state |= 2;
        expr(ctx, ExprType.Text, child.value);
    }
  }
  emit(ctx, `</${tag}>`);
};

const VOID_ELEMENTS = (
  /^(audio|video|embed|input|param|source|textarea|track|area|base|link|meta|br|col|hr|img|wbr)$/
);

import { INodeElement, INodeType, IPropertyType, ITemplate } from "./ir.js";

export interface CompileToStaticOptions {
  readonly slotAttr: string;
}

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

export const compileTemplateToStatic = (
  tpl: ITemplate,
  options?: CompileToStaticOptions,
): StaticTemplate => {
  const result: StaticTemplate = [];
  const slotAttr = options?.slotAttr ?? "&";
  const ctx: Context = {
    result,
    last: null,
  };
  const children = tpl.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    switch (child.type) {
      case INodeType.Element:
        compileNode(ctx, child, slotAttr);
        break;
      case INodeType.Expr:
        expr(ctx, ExprType.Text, child.value);
        break;
      case INodeType.Text:
        emit(ctx, child.value);
    }
  }
  if (ctx.last !== null) {
    result.push(ctx.last);
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

const compileNode = (ctx: Context, node: INodeElement, slotAttr: string) => {
  const { tag, properties, children } = node;

  emit(ctx, `<${tag} ${slotAttr}`); // TODO: Optimize slot attrs.
  if (properties.length > 0) {
    let styles: (string | number)[] = [];
    for (let i = 0; i < properties.length; i++) {
      const { key, value, type } = properties[i];
      if (type === IPropertyType.Attribute) {
        if (typeof value === "number") {
          emit(ctx, ` ${key}="`);
          expr(ctx, ExprType.Attribute, value);
          emit(ctx, `"`);
        } else if (value === true) {
          emit(ctx, ` ${key}`);
        } else {
          emit(ctx, ` ${key}="${value}"`);
        }
      } else if (type === IPropertyType.Value || type === IPropertyType.DOMValue) {
        if (tag === "input" || tag === "textarea") {
          if (key === "value") {
            emit(ctx, ` value="`);
            expr(ctx, ExprType.Attribute, value);
            emit(ctx, `"`);
          }
        }
      } else if (type === IPropertyType.Style) {
        styles.push(`${key}:${value};`);
      }
    }
    if (styles.length > 0) {
      emit(ctx, ` style="`);
      for (let i = 0; i < styles.length; i++) {
        const s = styles[i];
        if (typeof s === "string") {
          emit(ctx, s);
        } else {
          expr(ctx, ExprType.Attribute, s);
        }
      }
      emit(ctx, `"`);
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
        compileNode(ctx, child, slotAttr);
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

/**
 * Template Intermediate Representation.
 */

export interface ITemplate {
  readonly type: ITemplateType;
  readonly children: INode[];
}

export type ITemplateType =
  | typeof TEMPLATE_TYPE_HTM
  | typeof TEMPLATE_TYPE_SVG
  ;

export const TEMPLATE_TYPE_HTM = 0;
export const TEMPLATE_TYPE_SVG = 1;

export const NODE_TYPE_ELEMENT = 0;
export const NODE_TYPE_TEXT = 1;
export const NODE_TYPE_EXPR = 2;

export type IPropertyType =
  | typeof PROPERTY_TYPE_ATTRIBUTE
  | typeof PROPERTY_TYPE_VALUE
  | typeof PROPERTY_TYPE_DOMVALUE
  | typeof PROPERTY_TYPE_STYLE
  | typeof PROPERTY_TYPE_EVENT
  | typeof PROPERTY_TYPE_DIRECTIVE
  ;

export const PROPERTY_TYPE_ATTRIBUTE = 0;
export const PROPERTY_TYPE_VALUE = 1;
export const PROPERTY_TYPE_DOMVALUE = 2;
export const PROPERTY_TYPE_STYLE = 3;
export const PROPERTY_TYPE_EVENT = 4;
export const PROPERTY_TYPE_DIRECTIVE = 5;

export interface IPropertyAttribute {
  readonly type: typeof PROPERTY_TYPE_ATTRIBUTE;
  readonly key: string;
  readonly value: string | boolean | number;
}

export interface IPropertyValue {
  readonly type: typeof PROPERTY_TYPE_VALUE;
  readonly key: string;
  readonly value: number;
  readonly hoist: boolean;
}

export interface IPropertyDOMValue {
  readonly type: typeof PROPERTY_TYPE_DOMVALUE;
  readonly key: string;
  readonly value: number;
  readonly hoist: boolean;
}

export interface IPropertyStyle {
  readonly type: typeof PROPERTY_TYPE_STYLE;
  readonly key: string;
  readonly value: string | number;
  readonly hoist: boolean;
}

export interface IPropertyEvent {
  readonly type: typeof PROPERTY_TYPE_EVENT;
  readonly key: string;
  readonly value: number;
  readonly hoist: boolean;
}

export interface IPropertyDirective {
  readonly type: typeof PROPERTY_TYPE_DIRECTIVE;
  readonly key: null;
  readonly value: number;
  readonly hoist: boolean;
}

export type IProperty =
  | IPropertyAttribute
  | IPropertyValue
  | IPropertyDOMValue
  | IPropertyStyle
  | IPropertyEvent
  | IPropertyDirective
  ;

export interface INodeElement {
  readonly type: typeof NODE_TYPE_ELEMENT;
  readonly tag: string;
  readonly properties: IProperty[];
  readonly children: INode[];
}

export interface INodeText {
  readonly type: typeof NODE_TYPE_TEXT;
  readonly value: string;
}

export interface INodeExpr {
  readonly type: typeof NODE_TYPE_EXPR;
  readonly value: number;
}

export type INode = INodeElement | INodeText | INodeExpr;

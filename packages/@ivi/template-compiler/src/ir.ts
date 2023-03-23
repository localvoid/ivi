/**
 * Template Intermediate Representation.
 */

export interface ITemplate {
  readonly type: ITemplateType,
  readonly children: INode[];
}

export const enum ITemplateType {
  Htm = 0,
  Svg = 1,
}

export const enum INodeType {
  Element = 0,
  Text = 1,
  Expr = 2,
}

export const enum IPropertyType {
  Attribute = 0,
  Value = 1,
  DOMValue = 2,
  Style = 3,
  Event = 4,
  Directive = 5,
}

export interface IPropertyAttribute {
  readonly type: IPropertyType.Attribute;
  readonly key: string;
  readonly value: string | boolean | number;
  readonly static: boolean;
}

export interface IPropertyValue {
  readonly type: IPropertyType.Value;
  readonly key: string;
  readonly value: number;
  readonly static: boolean;
}

export interface IPropertyDOMValue {
  readonly type: IPropertyType.DOMValue;
  readonly key: string;
  readonly value: number;
  readonly static: boolean;
}

export interface IPropertyStyle {
  readonly type: IPropertyType.Style;
  readonly key: string;
  readonly value: number;
  readonly static: boolean;
}

export interface IPropertyEvent {
  readonly type: IPropertyType.Event;
  readonly key: string;
  readonly value: number;
  readonly static: boolean;
}

export interface IPropertyDirective {
  readonly type: IPropertyType.Directive;
  readonly key: null;
  readonly value: number;
  readonly static: boolean;
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
  readonly type: INodeType.Element;
  readonly tag: string;
  readonly properties: IProperty[];
  readonly children: INode[];
}

export interface INodeText {
  readonly type: INodeType.Text;
  readonly value: string;
}

export interface INodeExpr {
  readonly type: INodeType.Expr;
  readonly value: number;
}

export type INode = INodeElement | INodeText | INodeExpr;

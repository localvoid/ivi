import {
  HTMLDivElementProps, HTMLSpanElementProps, HTMLElementProps, HTMLInputElementProps, HTMLTextAreaElementProps,
  SVGCircleElementProps,
} from "ivi-core";
import { VNode, VNodeFlags } from "../../src";

export function t(content: string | number | null): VNode<null> {
  return new VNode<null>(VNodeFlags.Text, null, null, null, content, null);
}

export function div(className?: string): VNode<HTMLDivElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "<div",
    null,
    className === undefined ? null : className,
    null,
    "</div>",
  );
}

export function span(className?: string): VNode<HTMLSpanElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "<span",
    null,
    className === undefined ? null : className,
    null,
    "</span>",
  );
}

export function strong(className?: string): VNode<HTMLElementProps | null> {
  return new VNode(
    VNodeFlags.Element,
    "<strong",
    null,
    className === undefined ? null : className,
    null,
    "</strong>",
  );
}

export function textarea(className?: string): VNode<HTMLTextAreaElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.TextAreaElement | VNodeFlags.NewLineEatingElement,
    "<textarea",
    null,
    className === undefined ? null : className,
    null,
    "</textarea>",
  );
}

export function inputCheckbox(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    `<input type="checkbox"`,
    null,
    className === undefined ? null : className,
    null,
    null,
  );
}

export function inputText(className?: string): VNode<HTMLInputElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.InputElement | VNodeFlags.VoidElement,
    `<input type="text"`,
    null,
    className === undefined ? null : className,
    null,
    null,
  );
}

export function circle(className?: string): VNode<SVGCircleElementProps | null> {
  return new VNode(
    VNodeFlags.Element | VNodeFlags.SvgElement,
    "<circle",
    null,
    className === undefined ? null : className,
    null,
    "</circle>",
  );
}

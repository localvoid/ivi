import { type SSRResult } from "astro";
import { renderToString } from "ivi/server";
import { htm } from "@ivi/htm";

function check() {
  return true;
}

type RendererContext = {
  result: SSRResult;
};

function renderToStaticMarkup(
  this: RendererContext,
  Component: any,
  props: Record<string, any>,
  { default: children, ...slotted }: Record<string, any>
) {
  const p: any = {};
  for (const [name, value] of Object.entries(slotted)) {
    p[name] = StaticSlot(value, name);
  }
  if (children != null) {
    p.children = StaticSlot(children);
  }

  return {
    html: renderToString(Component(p)),
  };
}

const StaticSlot = (value: string, name?: string) => htm`
  <astro-slot name=${name} .innerHTML=${value}></astro-slot>
`;

export default {
  check,
  renderToStaticMarkup,
};

import { type SSRResult } from "astro";
import { renderToString } from "ivi/server";
import { htm } from "@ivi/htm";

const check = () => true;

const StaticSlot = (value: string, name?: string) => htm`
  <astro-slot name=${name} .innerHTML=${value} />
`;

type RendererContext = {
  result: SSRResult;
};

function renderToStaticMarkup(
  this: RendererContext,
  Component: any,
  props: Record<string, any>,
  { default: children, ...slotted }: Record<string, any>
) {
  props = { ...props };
  const entries = Object.entries(slotted);
  if (entries.length > 0) {
    for (const [name, child] of entries) {
      props[name] = StaticSlot(child);
    }
  }
  if (children != null) {
    props.children = StaticSlot(children);
  }

  return {
    html: renderToString(Component(props)),
  };
}

export default {
  check,
  renderToStaticMarkup,
};

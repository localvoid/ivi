import { type VAny, createRoot, hydrate, component, preventUpdates } from "ivi";
import { htm } from "@ivi/htm";

interface StaticSlotPops {
  value: string;
  name?: string;
}

const StaticSlot = component<StaticSlotPops>(() => {
  let slot: VAny;
  return ({ value, name }) =>
    slot !== void 0
      ? slot
      : (slot = /* ssr */htm`<astro-slot name=${name} .innerHTML=${value} />`);
}, preventUpdates);

export default (element: HTMLElement) =>
  async (
    Component: any,
    props: Record<string, any>,
    { default: children, ...slotted }: Record<string, any>
  ) => {
    if (element.hasAttribute("ssr")) {
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

      hydrate(
        createRoot(element),
        Component(props),
      );
    }
  };

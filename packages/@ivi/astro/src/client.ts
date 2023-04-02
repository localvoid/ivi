import { createRoot, hydrate, component, preventUpdates, VAny } from "ivi";
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
      : (slot = htm`<astro-slot name=${name} .innerHTML=${value}></astro-slot>`);
}, preventUpdates);

export default (element: HTMLElement) =>
  async (
    Component: any,
    props: Record<string, any>,
    { default: children, ...slotted }: Record<string, any>
  ) => {
    if (element.hasAttribute("ssr")) {
      for (const [name, value] of Object.entries(slotted)) {
        props[name] = StaticSlot({ value, name });
      }
      if (children != null) {
        props.children = StaticSlot(children);
      }
      console.log(element);
      hydrate(createRoot(element), Component(props));
    }
  };

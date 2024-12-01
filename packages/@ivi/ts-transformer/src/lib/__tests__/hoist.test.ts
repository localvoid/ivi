import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import { transformModule } from "../module.js";

const t = (code: string) => transformModule({ code }).outputText;

describe("transform module", () => {
  test(`hoist className`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const cn1 = "a";
const cn2 = "b";

const C = () => {
    return () => html\`<div class=\${cn1 + " " + cn2}></div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const cn1 = "a";
const cn2 = "b";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._h("<div class=\\"" + (cn1 + " " + cn2) + "\\"></div>"), 1, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1);
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`hoist className 2`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const cn1 = "a";

const C = () => {
    const cn2 = "b";
    return () => html\`<div class=\${cn1 + " " + cn2}></div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const cn1 = "a";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._hE("div"), 1, [1], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const C = () => {
    const cn2 = "b";
    return () => __ivi_1._t(__ivi_tpl_1, [cn1 + " " + cn2]);
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });
});
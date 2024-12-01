import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import { transformModule } from "../module.js";

const t = (code: string) => transformModule({ code }).outputText;

describe("transform module", () => {
  test(`singular root (html)`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = () => {
    return () => html\`<div>\${123}</div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._hE("div"), 65, __ivi_1.EMPTY_ARRAY, [0], __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1, [123]);
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`multiple roots (html)`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = () => {
    return () => html\`
      <div>\${1}</div>
      <div>\${2}</div>
    \`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._hE("div"), 65, __ivi_1.EMPTY_ARRAY, [0], __ivi_1.EMPTY_ARRAY);
const __ivi_tpl_2 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._hE("div"), 65, __ivi_1.EMPTY_ARRAY, [0], __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => [__ivi_1._t(__ivi_tpl_1, [1]), __ivi_1._t(__ivi_tpl_2, [2])];
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`singular root (svg)`, () => {
    deepStrictEqual(
      t(`
import { svg } from "ivi";

const C = () => {
    return () => svg\`<div>\${123}</div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { svg } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._sE("div"), 4161, __ivi_1.EMPTY_ARRAY, [0], __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1, [123]);
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`multiple roots (svg)`, () => {
    deepStrictEqual(
      t(`
import { svg } from "ivi";

const C = () => {
    return () => svg\`
      <div>\${1}</div>
      <div>\${2}</div>
    \`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { svg } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._sE("div"), 4161, __ivi_1.EMPTY_ARRAY, [0], __ivi_1.EMPTY_ARRAY);
const __ivi_tpl_2 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._sE("div"), 4161, __ivi_1.EMPTY_ARRAY, [0], __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => [__ivi_1._t(__ivi_tpl_1, [1]), __ivi_1._t(__ivi_tpl_2, [2])];
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`strings data ["a"]`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = () => {
    return () => html\`<div a=\${123}></div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._hE("div"), 1, [2], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["a"]);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1, [123]);
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`strings data ["a", "b"]`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = () => {
    return () => html\`<div a=\${1} b=\${2}></div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._hE("div"), 1, [2, 522], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["a", "b"]);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1, [1, 2]);
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`static template`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = () => {
    return () => html\`<div>abc</div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._h("<div>abc</div>"), 1, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1);
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`static template (preventClone)`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = () => {
    return () => /* preventClone */ html\`<div>abc</div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._Td(__ivi_1._hN("<div>abc</div>"), 1, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => /* preventClone */ __ivi_1._t(__ivi_tpl_1);
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });

  test(`string`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = () => {
    return () => html\`abc\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const C = () => {
    return () => "abc";
};
//# sourceMappingURL=module.js.map
      `.trim(),
    );
  });
});

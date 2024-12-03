import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import { transformModule } from "../module.js";

const t = (code: string) => transformModule({ code }).outputText.slice(0, -35);

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
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._h("<div class=\\"" + (cn1 + " " + cn2) + "\\"></div>"), 1, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1);
};
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
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [1], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const C = () => {
    const cn2 = "b";
    return () => __ivi_1._t(__ivi_tpl_1, [cn1 + " " + cn2]);
};
      `.trim(),
    );
  });

  test(`hoist event 1`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const a = "a";
const C = () => {
    const b = "b";
    return (c) => html\`<div @click=\${() => a}></div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const a = "a";
const __ivi_hoist_1 = () => a;
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = () => {
    const b = "b";
    return (c) => __ivi_1._t(__ivi_tpl_1, [__ivi_hoist_1]);
};
      `.trim(),
    );
  });

  test(`hoist event 2`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const a = "a";
const C = () => {
    const b = "b";
    return (c) => html\`<div @click=\${() => a + b}></div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const a = "a";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = () => {
    const b = "b";
    const __ivi_hoist_1 = () => a + b;
    return (c) => __ivi_1._t(__ivi_tpl_1, [__ivi_hoist_1]);
};
      `.trim(),
    );
  });

  test(`hoist event 3`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const a = "a";
const C = () => {
    const b = "b";
    return (c) => html\`<div @click=\${() => a + b + c}></div>\`;
};
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const a = "a";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = () => {
    const b = "b";
    return (c) => __ivi_1._t(__ivi_tpl_1, [() => a + b + c]);
};
      `.trim(),
    );
  });

  test(`hoist event 4`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const a = "a";
const C = (b) => (c) => html\`<div @click=\${() => a + b}></div>\`;
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const a = "a";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = (b) => { const __ivi_hoist_1 = () => a + b; return (c) => __ivi_1._t(__ivi_tpl_1, [__ivi_hoist_1]); };
      `.trim(),
    );
  });

  test(`hoist event 5 (global symbol)`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = (b) => (c) => html\`<div @click=\${() => console.log("a")}></div>\`;
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const __ivi_hoist_1 = () => console.log("a");
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = (b) => (c) => __ivi_1._t(__ivi_tpl_1, [__ivi_hoist_1]);
      `.trim(),
    );
  });

  test(`hoist event 6 (unknown symbol)`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const C = (b) => (c) => html\`<div @click=\${() => unknown()}></div>\`;
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const __ivi_hoist_1 = () => unknown();
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = (b) => (c) => __ivi_1._t(__ivi_tpl_1, [__ivi_hoist_1]);
      `.trim(),
    );
  });

  test(`hoist event 7 (Identifier)`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const a = "a";
const C = (b) => (c) => html\`<div @click=\${a}></div>\`;
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const a = "a";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = (b) => (c) => __ivi_1._t(__ivi_tpl_1, [a]);
      `.trim(),
    );
  });

  test(`hoist event 8 (CallExpression)`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const a = () => { };
const C = (b) => (c) => html\`<div @click=\${a()}></div>\`;
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const a = () => { };
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = (b) => (c) => __ivi_1._t(__ivi_tpl_1, [a()]);
      `.trim(),
    );
  });

  test(`hoist event 9 nested`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const a = "a";
const C = (b) => (c) => html\`<div @click=\${() => a + b}>\${html\`<div @click=\${() => a}/>\`}</div>\`;
      `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const a = "a";
const __ivi_hoist_1 = () => a;
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const __ivi_tpl_2 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 65, [6], [4], __ivi_1.EMPTY_ARRAY, ["click"]);
const C = (b) => { const __ivi_hoist_2 = () => a + b; return (c) => __ivi_1._t(__ivi_tpl_2, [__ivi_hoist_2, __ivi_1._t(__ivi_tpl_1, [__ivi_hoist_1])]); };
      `.trim(),
    );
  });

  test(`hoist event 8 nested`, () => {
    deepStrictEqual(
      t(`
import { html } from "ivi";

const a = "a";
const C = (b) => (c) => html\`<div @click=\${() => html\`<div @click=\${() => a}/>\`}/>\`;
        `),
      `
import * as __ivi_1 from "ivi";
import { html } from "ivi";
const a = "a";
const __ivi_hoist_1 = () => a;
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const __ivi_hoist_2 = () => __ivi_1._t(__ivi_tpl_1, [__ivi_hoist_1]);
const __ivi_tpl_2 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [6], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY, ["click"]);
const C = (b) => (c) => __ivi_1._t(__ivi_tpl_2, [__ivi_hoist_2]);
      `.trim(),
    );
  });

  test(`hoist component render fn 1`, () => {
    deepStrictEqual(
      t(`
import { component, html } from "ivi";

const C = component(() => ([a, b]) => a + b);
        `),
      `
import { component } from "ivi";
const __ivi_hoist_1 = ([a, b]) => a + b;
const C = component(() => __ivi_hoist_1);
      `.trim(),
    );
  });

  test(`hoist component render fn 2`, () => {
    deepStrictEqual(
      t(`
import { component, html } from "ivi";

const C = component(() => ([a]) => html\`<div>\${a}</div>\`));
        `),
      `
import * as __ivi_1 from "ivi";
import { component, html } from "ivi";
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 65, __ivi_1.EMPTY_ARRAY, [0], __ivi_1.EMPTY_ARRAY);
const __ivi_hoist_1 = ([a]) => __ivi_1._t(__ivi_tpl_1, [a]);
const C = component(() => __ivi_hoist_1);
      `.trim(),
    );
  });
});
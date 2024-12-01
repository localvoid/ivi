import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import { transformModule } from "../module.js";
import { SharedStrings } from "../SharedStrings.js";
import { transformChunk } from "../chunk.js";

const t = (sharedStrings: SharedStrings, code: string) => transformModule({ code, sharedStrings }).outputText.slice(0, -35);
const optimize = (sharedStrings: SharedStrings, code: string) => transformChunk({ code, sharedStrings }).outputText.slice(0, -35);

describe("transform module", () => {
  describe("collect shared strings", () => {
    test(`1`, () => {
      const shared = new SharedStrings();
      t(shared, `
import { html } from "ivi";
const C = () => {
    return () => html\`<div a=\${1} b=\${2}></div>\`;
};
      `);
      deepStrictEqual(Array.from(shared.strings), ["a", "b"]);
    });
  });

  describe("dedupe shared strings", () => {
    const shared = new SharedStrings();
    shared.add("a");
    shared.add("b");
    shared.sort();

    test(`inject __IVI_STRINGS__`, () => {
      deepStrictEqual(
        optimize(shared, `
const __IVI_STRINGS__ = /*@__IVI_STRINGS__*/[];
        `),
        `
const __IVI_STRINGS__ = /*@__IVI_STRINGS__*/ ["a", "b"];
        `.trim(),
      );
    });

    test(`1`, () => {
      const shared = new SharedStrings();
      const code = t(shared, `
import { html } from "ivi";
const __IVI_STRINGS__ = /*@__IVI_STRINGS__*/[];
const C = () => {
    return () => html\`<div a=\${1} b=\${2}></div>\`;
};
const D = () => {
    return () => html\`<span b=\${1} a=\${2}></span>\`;
};
      `);
      shared.sort();
      deepStrictEqual(
        optimize(shared, code),
        `
import * as __ivi_1 from "ivi";
const __IVI_STRINGS__ = /*@__IVI_STRINGS__*/ ["a", "b"];
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, [2, 522], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1, [1, 2]);
};
const __ivi_tpl_2 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("span"), 1, [514, 10], __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const D = () => {
    return () => __ivi_1._t(__ivi_tpl_2, [1, 2]);
};
        `.trim(),
      );
    });
  });

  describe("dedupe arrays", () => {
    test(`1`, () => {
      const shared = new SharedStrings();
      const code = t(shared, `
import { html } from "ivi";
const C = () => {
    return () => html\`<div a=\${1} b=\${2}></div>\`;
};
const D = () => {
    return () => html\`<span a=\${1} b=\${2}></span>\`;
};
      `);
      shared.sort();
      deepStrictEqual(
        optimize(shared, code),
        `
import * as __ivi_1 from "ivi";
const __IVI_OPCODES_1 = [2, 522];
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("div"), 1, __IVI_OPCODES_1, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1, [1, 2]);
};
const __ivi_tpl_2 = /*@__IVI_TPL__*/ __ivi_1._T(__ivi_1._hE("span"), 1, __IVI_OPCODES_1, __ivi_1.EMPTY_ARRAY, __ivi_1.EMPTY_ARRAY);
const D = () => {
    return () => __ivi_1._t(__ivi_tpl_2, [1, 2]);
};
        `.trim(),
      );
    });
  });

  describe("dedupe template factories", () => {
    test(`1`, () => {
      const shared = new SharedStrings();
      const code = t(shared, `
import { html } from "ivi";
const C = () => {
    return () => html\`<div a="1">\${1}</div>\`;
};
const D = () => {
    return () => html\`<div a="1">\${2}</div>\`;
};
      `);
      console.log(code);
      shared.sort();
      deepStrictEqual(
        optimize(shared, code),
        `
import * as __ivi_1 from "ivi";
const __IVI_FACTORY_1 = __ivi_1._h("<div a=\\"1\\"></div>"), __IVI_OPCODES_1 = [0];
const __ivi_tpl_1 = /*@__IVI_TPL__*/ __ivi_1._T(__IVI_FACTORY_1, 65, __ivi_1.EMPTY_ARRAY, __IVI_OPCODES_1, __ivi_1.EMPTY_ARRAY);
const C = () => {
    return () => __ivi_1._t(__ivi_tpl_1, [1]);
};
const __ivi_tpl_2 = /*@__IVI_TPL__*/ __ivi_1._T(__IVI_FACTORY_1, 65, __ivi_1.EMPTY_ARRAY, __IVI_OPCODES_1, __ivi_1.EMPTY_ARRAY);
const D = () => {
    return () => __ivi_1._t(__ivi_tpl_2, [2]);
};
        `.trim(),
      );
    });
  });
});
import { deepStrictEqual } from "node:assert";
import { describe, test } from "node:test";
import { transformModule } from "../module.js";
import { transformChunk } from "../chunk.js";

const t = (strings: Set<string>, code: string) => transformModule({ code, strings }).outputText.slice(0, -35);
const optimize = (strings: Map<string, number>, code: string) => transformChunk({ code, strings }).outputText.slice(0, -35);
const stringsToMap = (strings: Set<string>): Map<string, number> => {
  const result = new Map<string, number>;
  const ss = Array.from(strings.keys()).sort();
  for (let i = 0; i < ss.length; i++) {
    result.set(ss[i], i);
  }
  return result;
};

describe("transform module", () => {
  describe("collect shared strings", () => {
    test(`1`, () => {
      const strings = new Set<string>();
      t(strings, `
import { html } from "ivi";
const C = () => {
    return () => html\`<div a=\${1} b=\${2}></div>\`;
};
      `);
      deepStrictEqual(Array.from(strings), ["a", "b"]);
    });
  });

  describe("dedupe shared strings", () => {
    const strings = new Map();
    strings.set("a", 0);
    strings.set("b", 1);

    test(`inject __IVI_STRINGS__`, () => {
      deepStrictEqual(
        optimize(strings, `
const __IVI_STRINGS__ = /*@__IVI_STRINGS__*/[];
        `),
        `
const __IVI_STRINGS__ = /*@__IVI_STRINGS__*/ ["a", "b"];
        `.trim(),
      );
    });

    test(`1`, () => {
      const strings = new Set<string>();
      const code = t(strings, `
import { html } from "ivi";
const __IVI_STRINGS__ = /*@__IVI_STRINGS__*/[];
const C = () => {
    return () => html\`<div a=\${1} b=\${2}></div>\`;
};
const D = () => {
    return () => html\`<span b=\${1} a=\${2}></span>\`;
};
      `);
      deepStrictEqual(
        optimize(stringsToMap(strings), code),
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
      const strings = new Set<string>();
      const code = t(strings, `
import { html } from "ivi";
const C = () => {
    return () => html\`<div a=\${1} b=\${2}></div>\`;
};
const D = () => {
    return () => html\`<span a=\${1} b=\${2}></span>\`;
};
      `);
      deepStrictEqual(
        optimize(stringsToMap(strings), code),
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
      const strings = new Set<string>();
      const code = t(strings, `
import { html } from "ivi";
const C = () => {
    return () => html\`<div a="1">\${1}</div>\`;
};
const D = () => {
    return () => html\`<div a="1">\${2}</div>\`;
};
      `);
      deepStrictEqual(
        optimize(stringsToMap(strings), code),
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
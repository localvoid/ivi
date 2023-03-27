import type { Plugin } from "rollup";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { transformAsync } from "@babel/core";
import iviBabel, { TemplateLanguage } from "@ivi/babel-plugin";
import iviBabelOptimizer from "@ivi/babel-plugin/optimizer";

export interface IviOptions {
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
}

export function ivi(options?: IviOptions): Plugin {
  const filter = createFilter(
    options?.include ?? /\.(m?js|m?ts)$/,
    options?.exclude,
  );

  let lazyPreload = true;
  let iviLang: typeof import("@ivi/tpl/parser") | undefined;
  let htmLang: typeof import("@ivi/htm/parser") | undefined;

  return {
    name: "ivi",

    async buildStart() {
      if (lazyPreload) {
        const _iviLang = import("@ivi/tpl/parser");
        const _htmLang = import("@ivi/htm/parser");
        try {
          iviLang = await _iviLang;
        } catch (err) { }
        try {
          htmLang = await _htmLang;
        } catch (err) { }
        if (iviLang === void 0 && htmLang === void 0) {
          this.warn("Unable to find template language parser.");
        }
      }
    },

    async transform(code: string, id: string) {
      if (!filter(id)) {
        return null;
      }
      const templateLanguages: TemplateLanguage[] = [];
      if (iviLang) {
        templateLanguages.push({ module: "@ivi/tpl", parse: iviLang.parseTemplate });
      }
      if (htmLang) {
        templateLanguages.push({ module: "@ivi/htm", parse: htmLang.parseTemplate });
      }

      const result = await transformAsync(code, {
        configFile: false,
        babelrc: false,
        browserslistConfigFile: false,
        filename: id,
        plugins: [iviBabel({
          templateLanguages,
        })],
        sourceMaps: true,
        sourceType: "module",
      });
      if (!result) {
        return null;
      }
      return { code: result.code!, map: result.map };
    },

    async renderChunk(code, chunk) {
      const result = await transformAsync(code, {
        configFile: false,
        babelrc: false,
        browserslistConfigFile: false,
        filename: chunk.fileName,
        plugins: [iviBabelOptimizer],
        sourceMaps: true,
        sourceType: "module",
      });
      if (!result) {
        return null;
      }
      return { code: result.code!, map: result.map };
    },
  };
}

import type { Plugin } from "vite";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { transformAsync } from "@babel/core";
import iviClient, { TemplateLanguage } from "@ivi/babel-plugin/client";
import iviClientOptimizer from "@ivi/babel-plugin/client-optimizer";
import iviServer from "@ivi/babel-plugin/server";

export interface IviOptions {
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
}

export function ivi(options?: IviOptions): Plugin[] {
  const filter = createFilter(
    options?.include ?? /\.(m?js|m?ts)$/,
    options?.exclude,
  );

  let lazyPreload = true;
  let iviLang: typeof import("@ivi/tpl/parser") | undefined;
  let htmLang: typeof import("@ivi/htm/parser") | undefined;

  return [
    {
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

      async transform(code, id, options) {
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

        const babelPlugin = options?.ssr
          ? iviServer({ templateLanguages })
          : iviClient({ templateLanguages });
        const result = await transformAsync(code, {
          configFile: false,
          babelrc: false,
          browserslistConfigFile: false,
          filename: id,
          plugins: [babelPlugin],
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
          plugins: [iviClientOptimizer],
          sourceMaps: true,
          sourceType: "module",
        });
        if (!result) {
          return null;
        }
        return { code: result.code!, map: result.map };
      },
    },
    {
      name: "ivi:ssr",
      enforce: "pre",

      resolveId(source, importer, options) {
        if (options.ssr && source === "ivi") {
          return this.resolve("ivi/server", importer, options);
        }
        return void 0;
      },
    },
  ];
}

import type { Plugin } from "vite";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { transformAsync } from "@babel/core";
import iviClient, { TemplateLanguage } from "@ivi/babel-plugin/client";
import iviClientOptimizer from "@ivi/babel-plugin/client-optimizer";
import iviServer from "@ivi/babel-plugin/server";

export interface IviOptions {
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
  dedupeOpCodes?: false | "chunk" | "bundle";
  dedupePropData?: false | "chunk" | "bundle";
}

export function ivi(options?: IviOptions): Plugin[] {
  const filter = createFilter(
    options?.include ?? /\.(m?js|m?ts)$/,
    options?.exclude,
  );
  let dedupeOpCodes = options?.dedupeOpCodes ?? "chunk";
  let dedupePropData = options?.dedupePropData ?? "bundle";
  let sharedPropData = new Set<string>();

  let lazyPreload = true;
  let iviLang: typeof import("@ivi/tpl/parser") | undefined;
  let htmLang: typeof import("@ivi/htm/parser") | undefined;
  let sortedSharedPropData: Map<string, number> | undefined;

  return [
    {
      name: "ivi",

      configResolved(resolvedConfig) {
        if (resolvedConfig.command === "serve") {
          dedupeOpCodes = false;
          dedupePropData = false;
        }
      },

      async buildStart() {
        sortedSharedPropData = void 0;
        if (lazyPreload) {
          try {
            iviLang = await import("@ivi/tpl/parser");
          } catch (err) { }
          try {
            htmLang = await import("@ivi/htm/parser");
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
          : iviClient({
            templateLanguages,
            dedupeOpCodes,
            dedupePropData,
            sharedPropData,
          });
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
        if (dedupePropData === "bundle" && sortedSharedPropData === void 0) {
          const _data = Array.from(sharedPropData);
          _data.sort();
          sortedSharedPropData = new Map();
          for (let i = 0; i < _data.length; i++) {
            sortedSharedPropData.set(_data[i], i);
          }
        }
        const result = await transformAsync(code, {
          configFile: false,
          babelrc: false,
          browserslistConfigFile: false,
          filename: chunk.fileName,
          plugins: [iviClientOptimizer({
            dedupePropData,
            sharedPropData: sortedSharedPropData,
          })],
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

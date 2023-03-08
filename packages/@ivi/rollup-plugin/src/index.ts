import type { Plugin } from "rollup";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { transformAsync } from "@babel/core";
import { ivi as iviBabel, iviOptimizer as iviBabelOptimizer } from "@ivi/babel-plugin";

export interface IviOptions {
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
}

export function ivi(options?: IviOptions): Plugin {
  const filter = createFilter(options?.include, options?.exclude);

  return {
    name: "ivi",

    async transform(code: string, id: string) {
      if (!filter(id)) {
        return null;
      }
      const result = await transformAsync(code, {
        configFile: false,
        babelrc: false,
        browserslistConfigFile: false,
        filename: id,
        plugins: [iviBabel],
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

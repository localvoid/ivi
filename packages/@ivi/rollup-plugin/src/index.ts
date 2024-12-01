import type { Plugin } from "rollup";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { SharedStrings, transformModule, transformChunk } from "@ivi/ts-transformer";

export interface IviOptions {
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
}

export function ivi(options?: IviOptions): Plugin {
  const filter = createFilter(
    options?.include ?? /\.(m?js|m?ts)$/,
    options?.exclude,
  );
  const sharedStrings = new SharedStrings();

  return {
    name: "ivi",

    transform(code: string, id: string) {
      if (!filter(id)) {
        return null;
      }

      const result = transformModule({
        code,
        sharedStrings,
      });
      if (result.sourceMapText !== void 0) {
        return { code: result.outputText.slice(0, -35), map: result.sourceMapText };
      }
      return { code: result.outputText.slice(0, -35) };
    },

    renderStart() {
      sharedStrings.sort();
    },

    renderChunk(code, chunk) {
      // Fast-path for chunks that doesn't have any ivi code.
      if (!code.includes("@__IVI")) {
        return;
      }

      const result = transformChunk({
        code,
        sharedStrings,
      });
      if (result.sourceMapText !== void 0) {
        return { code: result.outputText.slice(0, -35), map: result.sourceMapText };
      }
      return { code: result.outputText.slice(0, -35) };
    },
  };
}

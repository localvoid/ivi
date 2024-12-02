import type { Plugin } from "rollup";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { SharedStrings, transformModule, transformChunk, TransformModuleError } from "@ivi/ts-transformer";

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
      if (
        !filter(id) &&
        // Fast-path to ignore modules that doesn't contain any ivi related
        // code.
        !code.includes("ivi")
      ) {
        return null;
      }

      try {
        const result = transformModule({
          code,
          sharedStrings,
        });
        if (result.sourceMapText !== void 0) {
          return { code: result.outputText.slice(0, -35), map: result.sourceMapText };
        }
        return { code: result.outputText.slice(0, -35) };
      } catch (err) {
        if (err instanceof TransformModuleError) {
          this.error(err.message, err.pos);
        }
      }
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

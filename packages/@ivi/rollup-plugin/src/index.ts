import type { Plugin } from "rollup";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { transformModule, transformChunk, TransformModuleError } from "@ivi/ts-transformer";

export interface IviOptions {
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
}

export function ivi(options?: IviOptions): Plugin {
  const filter = createFilter(
    options?.include ?? /\.(m?js|m?ts)$/,
    options?.exclude,
  );
  const strings = new Map<string, number>();

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
        const strings = new Set<string>();
        const result = transformModule({ code, strings });
        const meta = strings.size > 0
          ? { ivi: { strings: Array.from(strings.keys()) } }
          : null;
        if (result.sourceMapText !== void 0) {
          return { code: result.outputText.slice(0, -35), map: result.sourceMapText, meta };
        }
        return { code: result.outputText.slice(0, -35), meta };
      } catch (err) {
        if (err instanceof TransformModuleError) {
          this.error(err.message, err.pos);
        }
      }
    },

    buildEnd() {
      // Collect ivi strings from modules meta, sort and build an indexed map.
      strings.clear();
      const ss = Array.from(
        Array.from(this.getModuleIds()).reduce(
          (acc, id) => (this.getModuleInfo(id)?.meta.ivi?.strings?.forEach((s: string) => acc.add(s)), acc),
          new Set<string>(),
        ).keys(),
      ).sort();
      for (let i = 0; i < ss.length; i++) {
        strings.set(ss[i], i);
      }
    },

    renderChunk(code, chunk) {
      // Fast-path for chunks that doesn't have any ivi code.
      if (!code.includes("@__IVI")) {
        return;
      }

      const result = transformChunk({ code, strings });
      if (result.sourceMapText !== void 0) {
        return { code: result.outputText.slice(0, -35), map: result.sourceMapText };
      }
      return { code: result.outputText.slice(0, -35) };
    },
  };
}

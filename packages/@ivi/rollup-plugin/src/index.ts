import type { Plugin } from "rollup";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { TemplateCompiler, type CompilerOptions } from "@ivi/compiler";

export interface IviOptions extends CompilerOptions {
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
}

export function ivi(options?: IviOptions): Plugin {
  const filter = createFilter(
    options?.include ?? /\.(m?js|m?ts)$/,
    options?.exclude,
  );

  const compiler = new TemplateCompiler({
    dedupeStrings: options?.dedupeStrings ?? true,
    oveo: options?.oveo ?? false,
  });
  return {
    name: "ivi",

    async transform(code: string, id: string) {
      if (
        !filter(id) &&
        // Fast-path for modules that doesn't contain any ivi code.
        !code.includes("ivi")
      ) {
        return null;
      }

      try {
        const result = await compiler.compileModule(code, "tsx");
        const map = result.map;
        code = result.code;
        return map ? { code, map } : { code };
      } catch (err) {
        this.error(`Failed to transform: ${err}`);
      }
    },

    renderStart() {
      compiler.renderStart();
    },

    async renderChunk(code, _chunk) {
      // Fast-path for chunks that doesn't have any ivi code.
      if (!code.includes("IVI")) {
        return;
      }

      try {
        const result = await compiler.compileChunk(code);
        const map = result.map;
        code = result.code;
        return map ? { code, map } : { code };
      } catch (err) {
        this.error(`Failed to render chunk: ${err}`);
      }
    },
  };
}

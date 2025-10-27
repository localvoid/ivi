import { TemplateCompiler, type CompilerOptions } from "@ivi/compiler";
import type { HookFilter, Plugin } from "rollup";

export interface IviOptions extends CompilerOptions {
  readonly filter?: HookFilter,
}

export function ivi(options: IviOptions = {}): Plugin & { config(options: any, env: { mode: string; command: string; }): void; } {
  let compiler!: TemplateCompiler;
  return {
    name: "ivi",

    config(_options, { command }) {
      let dedupeStrings = options?.dedupeStrings ?? true;
      let oveo = options?.oveo ?? false;
      if (command !== "build") {
        dedupeStrings = false;
        oveo = false;
      }
      compiler = new TemplateCompiler({
        dedupeStrings,
        oveo,
      });
    },

    transform: {
      filter: {
        code: "ivi",
        ...options.filter,
      },
      async handler(code: string, id: string) {
        try {
          const result = await compiler.transform(code, "tsx");
          const map = result.map;
          code = result.code;
          return map ? { code, map } : { code };
        } catch (err) {
          this.error(`Failed to transform: ${err}`);
        }
      },
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
        const result = await compiler.renderChunk(code);
        const map = result.map;
        code = result.code;
        return map ? { code, map } : { code };
      } catch (err) {
        this.error(`Failed to render chunk: ${err}`);
      }
    },
  };
}

import type { HookFilter, RolldownPlugin } from "rolldown";
import { TemplateCompiler, type CompilerOptions } from "@ivi/compiler";

export interface IviOptions extends CompilerOptions {
  readonly filter?: HookFilter,
}

export function ivi(options: IviOptions = {}): RolldownPlugin {
  const compiler = new TemplateCompiler({
    dedupeStrings: options.dedupeStrings ?? true,
    oveo: options.oveo ?? false,
  });
  return {
    name: "ivi",

    transform: {
      filter: options.filter ?? {
        code: "ivi",
        moduleType: ["js", "jsx", "ts", "tsx"],
      },
      async handler(code: string, _id: string, { moduleType }) {
        try {
          const result = await compiler.transform(code, moduleType);
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

    renderChunk: {
      filter: {
        code: "IVI",
      },
      async handler(code, _chunk) {
        try {
          const result = await compiler.renderChunk(code);
          const map = result.map;
          code = result.code;
          return map ? { code, map } : { code };
        } catch (err) {
          this.error(`Failed to render chunk: ${err}`);
        }
      },
    },
  };
}

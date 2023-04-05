import type * as babel from "@babel/core";

export interface PluginConfig {
  readonly dedupePropData?: false | "chunk" | "bundle";
  readonly sharedPropData?: Map<string, number>;
}

declare const clientOptimizer: (config?: PluginConfig) => babel.PluginObj;
export default clientOptimizer;

import type * as babel from "@babel/core";
import { type ITemplate, ITemplateType } from "@ivi/template-compiler/ir";

export type TemplateParser = (
  s: string[] | TemplateStringsArray,
  type: ITemplateType,
  tryHoistExpr: (i: number) => boolean,
) => ITemplate;

export interface TemplateLanguage {
  readonly module: string;
  readonly parse: TemplateParser;
}

export interface PluginConfig {
  readonly templateLanguages?: TemplateLanguage[];
}

declare const ivi: (config: PluginConfig) => babel.PluginObj;
export default ivi;

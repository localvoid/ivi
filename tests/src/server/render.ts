import { compileTemplate } from "ivi/template/server";
import { ITemplateType } from "ivi/template/ir";
import { TemplateParserError, formatError } from "ivi/template/parser";
import { type VAny, _$T, _$t } from "ivi/server";
import { parseTemplate } from "@ivi/htm/parser";

const tryHoistExpr = (i: number) => false;

const DESCRIPTORS = new WeakMap<TemplateStringsArray, (exprs: any[]) => VAny>();

export const htm = (strings: TemplateStringsArray, ...exprs: any[]) => {
  let fn = DESCRIPTORS.get(strings);
  if (fn === void 0) {
    let result;
    try {
      const tpl = parseTemplate(strings, ITemplateType.Htm, tryHoistExpr);
      result = compileTemplate(tpl);
    } catch (e) {
      if (e instanceof TemplateParserError) {
        throw Error(
          "Invalid template" +
          formatError(strings, e.message, e.staticsOffset, e.textOffset),
        );
      }
      throw e;
    }

    const d = _$T(result.roots);
    fn = (exprs) => _$t(d, exprs);
    DESCRIPTORS.set(strings, fn);
  }

  return fn(exprs);
};

export const svg = (strings: TemplateStringsArray, ...exprs: any[]) => {
  let fn = DESCRIPTORS.get(strings);
  if (fn === void 0) {
    let result;
    try {
      const tpl = parseTemplate(strings, ITemplateType.Svg, tryHoistExpr);
      result = compileTemplate(tpl);
    } catch (e) {
      if (e instanceof TemplateParserError) {
        throw Error(
          "Invalid template" +
          formatError(strings, e.message, e.staticsOffset, e.textOffset),
        );
      }
      throw e;
    }

    const d = _$T(result.roots);
    fn = (exprs) => _$t(d, exprs);
    DESCRIPTORS.set(strings, fn);
  }

  return fn(exprs);
};

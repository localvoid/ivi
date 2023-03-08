import { compileTemplate, TemplateCompilerError } from "@ivi/template-compiler";
import type { TemplateDescriptor } from "./index.js";
import { _h, _hN, _hE, _s, _sN, _sE, _T, _t } from "./index.js";

const tryHoistExpr = (i: number) => false;

const DESCRIPTORS = new WeakMap<TemplateStringsArray, TemplateDescriptor>();

export const htm = (strings: TemplateStringsArray, ...exprs: any[]) => {
  var factory;
  var template;
  var result;
  var d = DESCRIPTORS.get(strings);
  if (d === void 0) {
    try {
      result = compileTemplate(strings, false, tryHoistExpr);
    } catch (e) {
      if (e instanceof TemplateCompilerError) {
        // TODO
      }
      throw e;
    }
    template = result.template;
    if (typeof template === "string") {
      factory = _hE(template);
    } else {
      template = template.join("");
      if (result.disableCloning) {
        factory = _hN(template);
      } else {
        factory = _h(template);
      }
    }
    DESCRIPTORS.set(
      strings,
      d = _T(
        factory,
        result.flags,
        result.propOpCodes,
        result.childOpCodes,
        result.stateOpCodes,
        result.data,
      ),
    );
  }

  return _t(d, exprs);
};

export const svg = (strings: TemplateStringsArray, ...exprs: any[]) => {
  var factory;
  var template;
  var result;
  var d = DESCRIPTORS.get(strings);
  if (d === void 0) {
    try {
      result = compileTemplate(strings, true, tryHoistExpr);
    } catch (e) {
      if (e instanceof TemplateCompilerError) {
        // TODO
      }
      throw e;
    }
    template = result.template;
    if (typeof template === "string") {
      factory = _sE(template);
    } else {
      template = template.join("");
      if (result.disableCloning) {
        factory = _sN(template);
      } else {
        factory = _s(template);
      }
    }
    DESCRIPTORS.set(
      strings,
      d = _T(
        factory,
        result.flags,
        result.propOpCodes,
        result.childOpCodes,
        result.stateOpCodes,
        result.data,
      ),
    );
  }

  return _t(d, exprs);
};

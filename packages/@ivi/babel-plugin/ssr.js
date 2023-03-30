import { declare } from "@babel/helper-plugin-utils";
import { compileTemplate } from "ivi/template/ssr";
import { TemplateParserError } from "ivi/template/parser";
import { importSymbolFactory, tryHoistExpr, hoistExpr } from "./shared.js";

const ssr = (config) => declare((api) => {
  api.assertVersion(7);

  const t = api.types;
  const templateLanguages = config?.templateLanguages ?? [];

  const getStaticValue = (s) => s.value.cooked;

  function createTemplateDescriptor(importSymbol, id, tpl) {
    return t.variableDeclaration("const", [
      t.variableDeclarator(
        id,
        t.arrayExpression(
          tpl.map((root) => createTNode(importSymbol, root)),
        ),
      )
    ]);
  }

  function createTNode(importSymbol, node) {
    if (typeof node === "object") { // Element
      return t.callExpression(importSymbol("ivi", "_T"), [
        t.numericLiteral(node.flags),
        t.stringLiteral(node.prefix),
        t.stringLiteral(node.suffix),
        node.props
          ? t.arrayExpression(
            node.props.map((p) => t.callExpression(importSymbol("ivi", "_P"), [
              t.stringLiteral(p.prefix),
              t.numericLiteral(p.i),
            ])))
          : t.nullLiteral(),
        node.children
          ? t.arrayExpression(
            node.children.map((n) => createTNode(importSymbol, n)),
          )
          : t.nullLiteral(),
      ]);
    }
    if (typeof node === "string") { // Text
      return t.stringLiteral(node);
    }
    // Expr
    return t.numericLiteral(node);
  }

  return {
    name: "ivi-ssr",
    visitor: {
      Program: {
        enter(path, state) {
          state.importSymbol = importSymbolFactory(path);
          state.removeImports = [];
        },
        exit(path, state) {
          const removeImports = state.removeImports;
          for (let i = 0; i < removeImports.length; i++) {
            removeImports[i].remove();
          }
        }
      },

      ImportDeclaration(path, state) {
        const removeImports = state.removeImports;
        const source = path.node.source.value;
        for (let i = 0; i < templateLanguages.length; i++) {
          const lang = templateLanguages[i];
          if (source === lang.module) {
            removeImports.push(path);
          }
        }
      },

      TaggedTemplateExpression: {
        exit(path, state) {
          let type;
          let parse;
          const tag = path.get("tag");
          for (let i = 0; i < templateLanguages.length; i++) {
            const lang = templateLanguages[i];
            if (tag.referencesImport(lang.module, "htm")) {
              type = "htm";
              parse = lang.parse;
              break;
            } else if (tag.referencesImport(lang.module, "svg")) {
              type = "svg";
              parse = lang.parse;
              break;
            }
          }
          if (parse !== void 0) {
            const importSymbol = state.importSymbol;
            const statics = path.node.quasi.quasis.map(getStaticValue);
            const exprs = path.get("quasi").get("expressions");
            try {
              const template = parse(
                statics,
                type === "svg" ? 1 : 0,
                (i) => tryHoistExpr(exprs[i])
              );
              const result = compileTemplate(template);
              const descriptorId = path.scope.generateUidIdentifier("__tpl_");

              hoistExpr(
                path,
                createTemplateDescriptor(
                  importSymbol,
                  descriptorId,
                  result,
                )
              );
              path.replaceWith(
                t.callExpression(
                  importSymbol("ivi", "_t"),
                  exprs.length > 0
                    ? [descriptorId, t.arrayExpression(exprs.map((e) => e.node))]
                    : [descriptorId]
                )
              );
            } catch (e) {
              if (e instanceof TemplateParserError) {
                const s = path.get("quasi").get("quasis")[e.staticsOffset];
                const c = s.node.value.cooked;
                let offset = 0;
                for (let i = 0; i < e.textOffset; i++) {
                  if (c.charCodeAt(i) === 10) {
                    // "\n"
                    offset = 0;
                  } else {
                    offset++;
                  }
                }
                throw s.buildCodeFrameError(
                  e.message +
                  "\n\n" +
                  s.node.value.cooked +
                  "\n" +
                  "^".padStart(offset) +
                  "\n"
                );
              }
              throw e;
            }
          }
        },
      },
    },
  }
});
export default ssr;

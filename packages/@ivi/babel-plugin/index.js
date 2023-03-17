import { declare } from "@babel/helper-plugin-utils";
import moduleImports from "@babel/helper-module-imports";
import { compileTemplate, TemplateCompilerError } from "@ivi/template-compiler";

export const ivi = declare((api) => {
  api.assertVersion(7);
  const t = api.types;

  const getStaticValue = (s) => s.value.cooked;
  const pure = (n) => t.addComment(n, "leading", "#__PURE__");
  const toNumeric = (i) => t.numericLiteral(i);
  const toString = (s) => t.stringLiteral(s);

  function importSymbolFactory(path) {
    const modules = new Map();
    return (moduleName, name) => {
      let symbols = modules.get(moduleName);
      if (!symbols) {
        modules.set(moduleName, symbols = new Map());
      }
      let symbolName = symbols.get(name);
      if (!symbolName) {
        symbolName = name === "default"
          ? moduleImports.addDefault(path, moduleName)
          : moduleImports.addNamed(path, name, moduleName);
        symbols.set(name, symbolName);
      }
      return symbolName;
    };
  }

  return {
    name: "ivi",
    visitor: {
      Program: {
        enter(path, state) {
          state.importSymbol = importSymbolFactory(path);
        },
      },

      CallExpression(path) {
        // Add `@__PURE__` comment for `component(() => {..})` exprs.
        if (path.get("tag").referencesImport("ivi", "component")) {
          path.replaceWith(pure(path.node));
        }
      },

      TaggedTemplateExpression: {
        exit(path, state) {
          let type;
          const tag = path.get("tag");
          if (tag.referencesImport("ivi/template", "htm")) {
            type = "htm";
          } else if (tag.referencesImport("ivi/template", "svg")) {
            type = "svg";
          }
          if (type !== void 0) {
            const importSymbol = state.importSymbol;
            const statics = path.node.quasi.quasis.map(getStaticValue);
            const exprs = path.get("quasi").get("expressions");
            const exprsNodes = path.node.quasi.expressions;

            let result;
            try {
              result = compileTemplate(
                statics,
                type === "svg",
                (i) => tryHoistExpr(exprs[i]),
              );
            } catch (e) {
              if (e instanceof TemplateCompilerError) {
                const s = path.get("quasi").get("quasis")[e.staticsOffset];
                const c = s.node.value.cooked;
                let offset = 0;
                for (let i = 0; i < e.textOffset; i++) {
                  if (c.charCodeAt(i) === 10) { // "\n"
                    offset = 0;
                  } else {
                    offset++;
                  }
                }
                throw s.buildCodeFrameError(
                  e.message + "\n\n" + s.node.value.cooked + "\n" + "^".padStart(offset) + "\n",
                );
              }
              throw path.buildCodeFrameError(e.message);
            }

            const dynamicExprs = result.dynamicExprs.map((i) => exprsNodes[i]);

            let template = result.template;
            let factoryFnId;
            let factoryFnArg;
            if (typeof template === "string") {
              factoryFnArg = t.stringLiteral(template);
              if (type === "htm") {
                factoryFnId = "_hE";
              } else {
                factoryFnId = "_sE";
              }
            } else {
              factoryFnArg = staticTemplateToExpr(t, template, exprsNodes);
              if (type === "htm") {
                if (result.disableCloning) {
                  factoryFnId = "_hN";
                } else {
                  factoryFnId = "_h";
                }
              } else {
                if (result.disableCloning) {
                  factoryFnId = "_sN";
                } else {
                  factoryFnId = "_s";
                }
              }
            }

            const id = path.scope.generateUidIdentifier("__tpl_");
            hoistExpr(
              path,
              t.variableDeclaration("const", [
                t.variableDeclarator(
                  id,
                  t.addComment(
                    t.callExpression(
                      importSymbol("ivi", "_T"),
                      [
                        t.callExpression(
                          importSymbol("ivi", factoryFnId),
                          [factoryFnArg],
                        ),
                        t.numericLiteral(result.flags),
                        t.arrayExpression(result.propOpCodes.map(toNumeric)),
                        t.arrayExpression(result.childOpCodes.map(toNumeric)),
                        t.arrayExpression(result.stateOpCodes.map(toNumeric)),
                        t.arrayExpression(result.data.map(toString)),
                      ],
                    ),
                    "leading",
                    "@__PURE__ @__IVI_TPL__",
                  ),
                ),
              ]),
            );

            path.replaceWith(
              t.callExpression(
                importSymbol("ivi", "_t"),
                (dynamicExprs.length > 0)
                  ? [id, t.arrayExpression(dynamicExprs)]
                  : [id],
              ),
            );
          }
        }
      },
    },
  };
});

export const iviOptimizer = declare((api) => {
  api.assertVersion(7);
  const t = api.types;

  return {
    name: "ivi-optimizer",
    visitor: {
      Program: {
        enter(path, state) {
          state.templates = [];
        },
        exit(path, state) {
          const templates = state.templates;
          if (templates.length > 0) {
            const sharedDecls = [];
            const sharedData = new Set();
            const sharedFactories = new Map();
            const sharedOpCodes = new Map();

            // deduplicating data strings
            for (const tpl of templates) {
              for (const s of tpl.get("arguments")[5].node.elements) {
                sharedData.add(s.value);
              }
            }

            // update data indexes in propOpCodes
            const shareDataId = path.scope.generateUidIdentifier("_TPL_DATA");
            const data = Array.from(sharedData).sort();
            const dataIndex = new Map();
            for (let i = 0; i < data.length; i++) {
              dataIndex.set(data[i], i);
            }

            sharedDecls.push(
              t.variableDeclarator(
                shareDataId,
                t.arrayExpression(data.map((d) => t.stringLiteral(d))),
              ),
            );

            for (const tpl of templates) {
              const args = tpl.get("arguments");
              const propOpCodes = args[2].get("elements");
              const data = args[5];
              const dataElements = data.node.elements;
              for (const op of propOpCodes) {
                const value = op.node.value;
                const type = value & 0b111;

                if (type > 1) { // Ignore SetNode and Common
                  const i = (value >> 3) & ((1 << 10) - 1);
                  const newDataIndex = dataIndex.get(dataElements[i].value);
                  op.node.value = (value & (~0b1111111111000)) | (newDataIndex << 3);
                }
              }
              data.replaceWith(shareDataId);
            }

            // count the number of usages for factories and arrays with excactly
            // the same values.
            for (const tpl of templates) {
              const args = tpl.get("arguments");
              addSharedFactory(t, sharedFactories, args[0]);
              addSharedOpCodes(sharedOpCodes, args[2]);
              addSharedOpCodes(sharedOpCodes, args[3]);
              addSharedOpCodes(sharedOpCodes, args[4]);
            }

            // deduplicate factories that are used by more than one template
            for (const vs of sharedFactories.values()) {
              if (vs.length > 1) {
                const id = path.scope.generateUidIdentifier("_TPL_FACTORY");
                const factoryPath = vs[0];
                const factoryNode = factoryPath.node;
                hoistExpr(
                  factoryPath,
                  t.variableDeclaration("const", [
                    t.variableDeclarator(
                      id,
                      t.callExpression(factoryNode.callee, factoryNode.arguments),
                    ),
                  ]),
                );

                for (const p of vs) {
                  p.replaceWith(id);
                }
              }
            }

            // deduplicate arrays that are used by more than one template
            for (const vs of sharedOpCodes.values()) {
              if (vs.length > 1) {
                const id = path.scope.generateUidIdentifier("_OP");
                sharedDecls.push(
                  t.variableDeclarator(
                    id,
                    t.arrayExpression(vs[0].node.elements),
                  ),
                );

                for (const p of vs) {
                  p.replaceWith(id);
                }
              }
            }

            if (sharedDecls.length > 0) {
              path.unshiftContainer("body", [
                t.variableDeclaration("const", sharedDecls),
              ]);
            }
          }
        },
      },

      CallExpression(path, state) {
        const leadingComments = path.node.leadingComments;
        if (leadingComments) {
          for (const comment of leadingComments) {
            if (comment.value.includes("@__IVI_TPL__")) {
              state.templates.push(path);
              break;
            }
          }
        }
      },
    },
  };
});

function isProgramScopeIdentifier(path, state) {
  const node = path.node;
  let scope = path.scope;

  while (scope) {
    if (scope.hasOwnBinding(node.name)) {
      if (!scope.path.isProgram()) {
        state.isProgramScope = false;
      }
      return;
    }

    scope = scope.parent;
  }
}

const isProgramScopeVisitor = {
  Identifier: isProgramScopeIdentifier,
};

function tryHoistExpr(expr) {
  const state = { isProgramScope: true };
  if (expr.isReferencedIdentifier()) {
    isProgramScopeIdentifier(expr, state);
  } else {
    expr.traverse(isProgramScopeVisitor, state);
  }
  return state.isProgramScope;
}

function staticTemplateToExpr(t, s, exprs) {
  let lastStringLiteral = t.stringLiteral("");
  let result = lastStringLiteral;
  for (const c of s) {
    if (typeof c === "string") {
      lastStringLiteral.value += c;
    } else {
      result = t.binaryExpression(
        "+",
        t.binaryExpression(
          "+",
          result,
          exprs[c],
        ),
        lastStringLiteral = t.stringLiteral(""),
      );
    }
  }
  return result;
}

function hoistExpr(path, expr) {
  let prev = path;
  while (path && !path.isProgram()) {
    prev = path;
    path = path.parentPath;
  }
  if (prev !== path) {
    prev.insertBefore(expr);
  }
}

const stringify = JSON.stringify;

function addSharedFactory(t, sharedStore, factory) {
  const node = factory.node;
  const key = node.callee.name + ":" + stringify(t.cloneNode(node.arguments[0], true, true), void 0, 0);
  let entries = sharedStore.get(key);
  if (entries === void 0) {
    sharedStore.set(key, [factory]);
  } else {
    entries.push(factory);
  }
}

const opCodeValue = (el) => el.value;

function addSharedOpCodes(sharedStore, opCodes) {
  const key = stringify(opCodes.node.elements.map(opCodeValue), void 0, 0);
  let entries = sharedStore.get(key);
  if (entries === void 0) {
    sharedStore.set(key, [opCodes]);
  } else {
    entries.push(opCodes);
  }
}

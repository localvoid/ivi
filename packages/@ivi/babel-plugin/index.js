import { declare } from "@babel/helper-plugin-utils";
import moduleImports from "@babel/helper-module-imports";
import { compileTemplate } from "@ivi/template-compiler";
import { TemplateParserError } from "@ivi/template-compiler/parser";
import { parseTemplate } from "@ivi/iml/parser";

export const ivi = declare((api) => {
  api.assertVersion(7);
  const t = api.types;

  const getStaticValue = (s) => s.value.cooked;
  const pure = (n) => t.addComment(n, "leading", "@__PURE__");
  const toNumeric = (i) => t.numericLiteral(i);
  const toString = (s) => t.stringLiteral(s);

  function importSymbolFactory(path) {
    const modules = new Map();
    return (moduleName, name) => {
      let symbols = modules.get(moduleName);
      if (!symbols) {
        modules.set(moduleName, (symbols = new Map()));
      }
      let symbolName = symbols.get(name);
      if (!symbolName) {
        symbolName =
          name === "default"
            ? moduleImports.addDefault(path, moduleName)
            : moduleImports.addNamed(path, name, moduleName);
        symbols.set(name, symbolName);
      }
      return symbolName;
    };
  }

  function staticTemplateToExpr(s, exprs) {
    let lastStringLiteral = t.stringLiteral("");
    let result = lastStringLiteral;
    for (const c of s) {
      if (typeof c === "string") {
        lastStringLiteral.value += c;
      } else {
        result = t.binaryExpression(
          "+",
          t.binaryExpression("+", result, exprs[c]),
          (lastStringLiteral = t.stringLiteral(""))
        );
      }
    }
    return result;
  }

  function createTemplateDescriptor(
    importSymbol,
    exprsNodes,
    type,
    clone,
    id,
    root
  ) {
    const template = root.template;
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
      factoryFnArg = staticTemplateToExpr(template, exprsNodes);
      if (type === "htm") {
        if (clone) {
          factoryFnId = "_hN";
        } else {
          factoryFnId = "_h";
        }
      } else {
        if (clone) {
          factoryFnId = "_s";
        } else {
          factoryFnId = "_sN";
        }
      }
    }

    return t.variableDeclaration("const", [
      t.variableDeclarator(
        id,
        t.addComment(
          t.callExpression(importSymbol("ivi", "_T"), [
            t.callExpression(importSymbol("ivi", factoryFnId), [factoryFnArg]),
            t.numericLiteral(root.flags),
            t.arrayExpression(root.props.map(toNumeric)),
            t.arrayExpression(root.child.map(toNumeric)),
            t.arrayExpression(root.state.map(toNumeric)),
            t.arrayExpression(root.data.map(toString)),
          ]),
          "leading",
          "@__PURE__ @__IVI_TPL__"
        )
      ),
    ]);
  }

  function transformRootNode(
    importSymbol,
    path,
    exprsNodes,
    type,
    clone,
    root
  ) {
    switch (root.type) {
      case 0: // Element
        const dynamicExprs = root.exprs.map((e) => exprsNodes[e]);
        const id = path.scope.generateUidIdentifier("__tpl_");
        hoistExpr(
          path,
          createTemplateDescriptor(
            importSymbol,
            exprsNodes,
            type,
            clone,
            id,
            root
          )
        );
        return t.callExpression(
          importSymbol("ivi", "_t"),
          dynamicExprs.length > 0 ? [id, t.arrayExpression(dynamicExprs)] : [id]
        );
      case 1: // Text
        return t.stringLiteral(root.value);
      case 2: // Expr
        return exprsNodes[root.value];
    }
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
        if (path.get("callee").referencesImport("ivi", "component")) {
          path.replaceWith(pure(path.node));
        }
      },

      TaggedTemplateExpression: {
        exit(path, state) {
          let type;
          const tag = path.get("tag");
          if (tag.referencesImport("@ivi/iml", "htm")) {
            type = "htm";
          } else if (tag.referencesImport("ivi/iml", "svg")) {
            type = "svg";
          }
          if (type !== void 0) {
            const importSymbol = state.importSymbol;
            const statics = path.node.quasi.quasis.map(getStaticValue);
            const exprs = path.get("quasi").get("expressions");
            const exprsNodes = path.node.quasi.expressions;

            try {
              const leadingComments = path.node.leadingComments;
              let clone = true;
              if (leadingComments) {
                for (const comment of leadingComments) {
                  if (comment.value.trim() === "-c") {
                    console.log("clone");
                    clone = false;
                    break;
                  }
                }
              }

              const template = parseTemplate(
                statics,
                type === "svg" ? 1 : 0,
                (i) => tryHoistExpr(exprs[i])
              );
              const result = compileTemplate(template);
              const roots = result.roots;
              if (roots.length === 1) {
                path.replaceWith(
                  transformRootNode(
                    importSymbol,
                    path,
                    exprsNodes,
                    type,
                    clone,
                    roots[0]
                  )
                );
              } else {
                path.replaceWith(
                  t.arrayExpression(
                    roots.map((root) =>
                      transformRootNode(
                        importSymbol,
                        path,
                        exprsNodes,
                        type,
                        clone,
                        root
                      )
                    )
                  )
                );
              }
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
  };
});

// const enum `PropOpCode` from "@ivi/template-compiler/format"
const PROP_DATA_SHIFT = 9;
const PROP_TYPE_MASK = 0b111;

export const iviOptimizer = declare((api) => {
  api.assertVersion(7);
  const t = api.types;
  const stringify = JSON.stringify;

  function addSharedFactory(sharedStore, factory) {
    const node = factory.node;
    const key =
      node.callee.name +
      ":" +
      stringify(t.cloneNode(node.arguments[0], true, true), void 0, 0);
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
                t.arrayExpression(data.map((d) => t.stringLiteral(d)))
              )
            );

            for (const tpl of templates) {
              const args = tpl.get("arguments");
              const propOpCodes = args[2].get("elements");
              const data = args[5];
              const dataElements = data.node.elements;
              for (const op of propOpCodes) {
                const value = op.node.value;
                const type = value & PROP_TYPE_MASK;

                if (type > 1) {
                  // Ignore SetNode and Common
                  const i = (value >> PROP_DATA_SHIFT);
                  const newDataIndex = dataIndex.get(dataElements[i].value);
                  op.node.value = (
                    // Removes old data index
                    (value & ~((1 << PROP_DATA_SHIFT) - 1)) |
                    // Adds new data index
                    (newDataIndex << PROP_DATA_SHIFT)
                  );
                }
              }
              data.replaceWith(shareDataId);
            }

            // count the number of usages for factories and arrays with excactly
            // the same values.
            for (const tpl of templates) {
              const args = tpl.get("arguments");
              addSharedFactory(sharedFactories, args[0]);
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
                      t.callExpression(
                        factoryNode.callee,
                        factoryNode.arguments
                      )
                    ),
                  ])
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
                    t.arrayExpression(vs[0].node.elements)
                  )
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

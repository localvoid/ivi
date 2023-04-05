import { declare } from "@babel/helper-plugin-utils";
import { hoistExpr } from "./shared.js";

// const enum `PropOpCode` from "@ivi/template-compiler/format"
const PROP_TYPE_SET_NODE = 0;
const PROP_TYPE_COMMON = 1;
const PROP_TYPE_DIRECTIVE = 7;
const PROP_DATA_SHIFT = 9;
const PROP_TYPE_MASK = 0b111;

const stringify = JSON.stringify;

const iviOptimizer = (config) =>
  declare((api) => {
    api.assertVersion(7);
    const t = api.types;
    const dedupePropData = config?.dedupePropData ?? false;
    let sharedPropData = config?.sharedPropData;

    function addSharedFactory(sharedStore, factory) {
      if (!factory.isNumericLiteral()) {
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
    }

    const opCodeValue = (el) => el.value;

    function addSharedOpCodes(sharedStore, opCodes) {
      if (opCodes.isArrayExpression()) {
        const key = stringify(opCodes.node.elements.map(opCodeValue), void 0, 0);
        let entries = sharedStore.get(key);
        if (entries === void 0) {
          sharedStore.set(key, [opCodes]);
        } else {
          entries.push(opCodes);
        }
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
              let sharedPropDataId;
              const localSharedDecls = [];
              const localSharedFactories = new Map();
              const localSharedOpCodes = new Map();

              if (dedupePropData) {
                if (dedupePropData === "chunk") {
                  const localSharedData = new Set();
                  // deduplicating data strings
                  for (const { tpl } of templates) {
                    for (const s of tpl.get("arguments")[5].node.elements) {
                      localSharedData.add(s.value);
                    }
                  }

                  // update data indexes in propOpCodes
                  sharedPropDataId =
                    path.scope.generateUidIdentifier("_TPL_DATA");
                  const data = Array.from(localSharedData).sort();
                  sharedPropData = new Map();
                  for (let i = 0; i < data.length; i++) {
                    sharedPropData.set(data[i], i);
                  }

                  localSharedDecls.push(
                    t.variableDeclarator(
                      sharedPropDataId,
                      t.arrayExpression(data.map((d) => t.stringLiteral(d)))
                    )
                  );
                }

                for (const { tpl, data } of templates) {
                  const args = tpl.get("arguments");
                  if (args[2].isArrayExpression()) {
                    const propOpCodes = args[2].get("elements");
                    let propData;
                    if (dedupePropData === "chunk") {
                      const propDataPath = args[5];
                      propData = propDataPath.node.elements.map((e) => e.value);
                      propDataPath.replaceWith(sharedPropDataId);
                    } else {
                      // bundle
                      propData = data.split(",").map((s) => parseInt(s, 10));
                    }
                    for (const op of propOpCodes) {
                      const value = op.node.value;
                      const type = value & PROP_TYPE_MASK;

                      if (
                        type !== PROP_TYPE_SET_NODE &&
                        type !== PROP_TYPE_COMMON &&
                        type !== PROP_TYPE_DIRECTIVE
                      ) {
                        const i = value >> PROP_DATA_SHIFT;
                        const newDataIndex = sharedPropData.get(propData[i]);
                        op.node.value =
                          // Removes old data index
                          (value & ((1 << PROP_DATA_SHIFT) - 1)) |
                          // Adds new data index
                          (newDataIndex << PROP_DATA_SHIFT);
                      }
                    }
                  }
                }
              }

              // count the number of usages for factories and arrays with excactly
              // the same values.
              for (const { tpl } of templates) {
                const args = tpl.get("arguments");
                addSharedFactory(localSharedFactories, args[0]);
                addSharedOpCodes(localSharedOpCodes, args[2]);
                addSharedOpCodes(localSharedOpCodes, args[3]);
                addSharedOpCodes(localSharedOpCodes, args[4]);
              }

              // deduplicate factories that are used by more than one template
              for (const vs of localSharedFactories.values()) {
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
              for (const vs of localSharedOpCodes.values()) {
                if (vs.length > 1) {
                  const id = path.scope.generateUidIdentifier("_OP");
                  localSharedDecls.push(
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

              if (localSharedDecls.length > 0) {
                path.unshiftContainer("body", [
                  t.variableDeclaration("const", localSharedDecls),
                ]);
              }
            }
          },
        },

        CallExpression(path, state) {
          const leadingComments = path.node.leadingComments;
          if (leadingComments) {
            for (const comment of leadingComments) {
              const match = IVI_TPL_COMMENT_REGEXP.exec(comment.value);
              if (match !== null) {
                state.templates.push({
                  tpl: path,
                  data: match[2],
                });
              }
              break;
            }
          }
        },

        ArrayExpression(path, state) {
          if (dedupePropData === "bundle") {
            const leadingComments = path.node.leadingComments;
            if (leadingComments) {
              for (const comment of leadingComments) {
                if (comment.value.includes("@__IVI_DATA__")) {
                  path.replaceWith(
                    t.arrayExpression(
                      Array.from(sharedPropData.keys()).map((v) =>
                        t.stringLiteral(v)
                      )
                    )
                  );
                  path.skip();
                  return;
                }
              }
            }
          }
        },
      },
    };
  });
export default iviOptimizer;

const IVI_TPL_COMMENT_REGEXP = /@__IVI_TPL__(\((.*)\))?/;

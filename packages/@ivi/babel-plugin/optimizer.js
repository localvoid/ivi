import { declare } from "@babel/helper-plugin-utils";
import { hoistExpr } from "./shared.js";

// const enum `PropOpCode` from "@ivi/template-compiler/format"
const PROP_DATA_SHIFT = 9;
const PROP_TYPE_MASK = 0b111;

const iviOptimizer = declare((api) => {
  api.assertVersion(7);
  const t = api.types;
  const stringify = JSON.stringify;

  function addSharedFactory(sharedStore, factory) {
    const node = factory.node;
    const key = node.callee.name + ":" +
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
export default iviOptimizer;

import * as ts from "typescript";
import { PropOpCode } from "ivi";
import { compilerOptions } from "./checker.js";

export interface TransformChunkOptions {
  readonly code: string,
  readonly strings?: Map<string, number>,
}

const parseInt = Number.parseInt;
const opCodeNodeToString = (n: ts.Node): string => {
  if (!ts.isNumericLiteral(n)) {
    throw new Error("Expected a numeric literal");
  }
  return n.text;
};
const stringLiteralToString = (n: ts.Node): string => {
  if (!ts.isStringLiteral(n)) {
    throw new Error("Expected a string literal");
  }
  return n.text;
};

interface SharedExpr<T extends ts.CallExpression | ts.ArrayLiteralExpression> {
  readonly node: T;
  /**
   * When expression is deduplicated, this reference point should be used as an
   * insertion point for a deduplicated expression.
   */
  readonly ref: ts.VariableStatement;
}

/**
 * SharedData is used for deduplicating template factories and numeric arrays.
 */
class SharedData {
  readonly factories: Map<string, SharedExpr<ts.CallExpression>[]>;
  readonly arrays: Map<string, SharedExpr<ts.ArrayLiteralExpression>[]>;

  constructor() {
    this.factories = new Map();
    this.arrays = new Map();
  }

  addFactory(node: ts.Expression, ref: ts.VariableStatement) {
    if (ts.isCallExpression(node)) {
      const arg0 = node.arguments[0];
      const key = node.expression.getText() + ":" + arg0.getText();
      let entries = this.factories.get(key);
      if (entries === void 0) {
        this.factories.set(key, [{ node, ref }]);
      } else {
        entries.push({ node, ref });
      }
    }
  }

  addArray(node: ts.Node, ref: ts.VariableStatement) {
    if (ts.isArrayLiteralExpression(node)) {
      const key = node.elements.map(opCodeNodeToString).join(",");
      let entries = this.arrays.get(key);
      if (entries === void 0) {
        this.arrays.set(key, [{ node, ref }]);
      } else {
        entries.push({ node, ref });
      }
    }
  }
}

export function transformChunk(options: TransformChunkOptions): ts.TranspileOutput {
  const { code, strings } = options;

  const chunkTransformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
    const factory = context.factory;

    const sharedData = new SharedData();
    const templates: ts.CallExpression[] = [];

    return (sourceFile: ts.SourceFile): ts.SourceFile => {
      // First pass
      // - Find all template descriptors: `@__IVI_TPL__`.
      // - Update templates OpCodes to match indices from shared strings.
      // - Inject shared strings array `@__IVI_STRINGS__`.
      const firstPass = (node: ts.Node): ts.Node => {
        if (ts.isCallExpression(node)) {
          const varDecl = node.parent;
          if (ts.isVariableDeclaration(varDecl)) {
            const varList = varDecl.parent;
            if (ts.isVariableDeclarationList(varList)) {
              const varStmt = varList.parent;
              if (ts.isVariableStatement(varStmt)) {
                // Workaround to retrieve leading comments for expressions.
                // https://github.com/microsoft/TypeScript/issues/54906
                if (node.getFullText().includes("/*@__IVI_TPL__*/")) {
                  // Count the number of usages for factories and arrays with
                  // exactly the same values.
                  const args = node.arguments;
                  if (args.length < 5) {
                    throw new Error("Expected at least 5 arguments");
                  }
                  const arg0 = args[0]; // Template DOM factory
                  const arg1 = args[1]; // Flags
                  let arg2 = args[2]; // Prop OpCodes
                  const arg3 = args[3]; // Child OpCodes
                  const arg4 = args[4]; // State OpCodes
                  sharedData.addFactory(arg0, varStmt);
                  sharedData.addArray(arg3, varStmt);
                  sharedData.addArray(arg4, varStmt);

                  // Replace strings with shared strings
                  if (strings !== void 0 && args.length > 5) {
                    const arg5 = args[5]; // Strings
                    if (ts.isArrayLiteralExpression(arg2) && ts.isArrayLiteralExpression(arg5)) {
                      const tplStrings = arg5.elements.map(stringLiteralToString);

                      const propOpCodes = arg2.elements.map((op) => {
                        if (!ts.isNumericLiteral(op)) {
                          throw new Error("Invalid OpCode");
                        }
                        const value = parseInt(op.text, 10);

                        const type = value & PropOpCode.TypeMask;

                        if (
                          type !== PropOpCode.SetNode &&
                          type !== PropOpCode.Common &&
                          type !== PropOpCode.Directive
                        ) {
                          const i = value >> PropOpCode.DataShift;
                          const newDataIndex = strings.get(tplStrings[i]);
                          if (newDataIndex === void 0) {
                            throw new Error(`Failed to find a shared string '${tplStrings[i]}`);
                          }
                          return factory.createNumericLiteral(
                            // Removes old data index
                            (value & ((1 << PropOpCode.DataShift) - 1)) |
                            // Adds new data index
                            (newDataIndex << PropOpCode.DataShift)
                          );
                        }
                        return op;
                      });
                      node = factory.updateCallExpression(
                        node,
                        node.expression,
                        node.typeArguments,
                        [
                          arg0,
                          arg1,
                          arg2 = factory.updateArrayLiteralExpression(arg2, propOpCodes),
                          arg3,
                          arg4,
                          // Remove arg5 when strings are shared.
                        ],
                      );
                      sharedData.addArray(arg2, varStmt);
                    }
                  }
                  templates.push(node as ts.CallExpression);
                  return node;
                }
              }
            }
          }
        } else if (strings !== void 0 && ts.isArrayLiteralExpression(node)) {
          if (node.getFullText().includes("/*@__IVI_STRINGS__*/")) {
            const s = [];
            for (const key of strings.keys()) {
              s.push(factory.createStringLiteral(key));
            }
            return factory.updateArrayLiteralExpression(node, s);
          }
        }

        return ts.visitEachChild(node, firstPass, context);
      };

      sourceFile = ts.visitNode(sourceFile, firstPass) as ts.SourceFile;

      if (templates.length > 0) {
        // Find factory and opCode array duplicates.
        const sharedDecls = new Map<number, ts.VariableDeclaration[]>();
        const sharedFactories = new Map<ts.Node, ts.Identifier>();
        const sharedArrays = new Map<ts.Node, ts.Identifier>();

        for (const nodes of sharedData.factories.values()) {
          if (nodes.length > 1) {
            const expr = nodes[0];
            const id = factory.createUniqueName("__IVI_FACTORY");
            let entries = sharedDecls.get(expr.ref.pos);
            if (entries === void 0) {
              entries = [];
            }
            entries.push(factory.createVariableDeclaration(id, void 0, void 0, expr.node));
            sharedDecls.set(expr.ref.pos, entries);
            for (let i = 0; i < nodes.length; i++) {
              sharedFactories.set(nodes[i].node, id);
            }
          }
        }

        for (const nodes of sharedData.arrays.values()) {
          if (nodes.length > 1) {
            const expr = nodes[0];
            const id = factory.createUniqueName("__IVI_OPCODES");
            let entries = sharedDecls.get(expr.ref.pos);
            if (entries === void 0) {
              entries = [];
            }
            entries.push(factory.createVariableDeclaration(id, void 0, void 0, expr.node));
            sharedDecls.set(expr.ref.pos, entries);
            for (let i = 0; i < nodes.length; i++) {
              sharedArrays.set(nodes[i].node, id);
            }
          }
        }

        if (sharedDecls.size > 0) {
          // Second Pass
          // - Deduplicate template descriptors data.
          const secondPass = (node: ts.Node): ts.Node => {
            if (ts.isCallExpression(node)) {
              const id = sharedFactories.get(node);
              if (id !== void 0) {
                return id;
              }
            } else if (ts.isArrayLiteralExpression(node)) {
              const id = sharedArrays.get(node);
              if (id !== void 0) {
                return id;
              }
            } else if (ts.isVariableStatement(node)) {
              const stmt = ts.visitEachChild(node, secondPass, context);
              const decl = sharedDecls.get(node.pos);
              if (decl !== void 0) {
                return factory.updateVariableStatement(
                  stmt,
                  stmt.modifiers,
                  factory.updateVariableDeclarationList(
                    stmt.declarationList,
                    [
                      ...decl,
                      ...stmt.declarationList.declarations,
                    ],
                  )
                );
              }
              return stmt;
            }
            return ts.visitEachChild(node, secondPass, context);
          };
          return ts.visitNode(sourceFile, secondPass) as ts.SourceFile;
        }
      }

      return sourceFile;
    };
  };

  return ts.transpileModule(code, {
    compilerOptions,
    transformers: {
      before: [
        chunkTransformer,
      ],
    }
  });
}

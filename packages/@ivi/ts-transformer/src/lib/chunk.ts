import * as ts from "typescript";
import { PropOpCode } from "ivi";
import { compilerOptions } from "./checker.js";
import { SharedStrings } from "./SharedStrings.js";

export interface TransformChunkOptions {
  readonly code: string,
  readonly sharedStrings?: SharedStrings,
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

class SharedData {
  readonly factories: Map<string, ts.CallExpression[]>;
  readonly arrays: Map<string, ts.ArrayLiteralExpression[]>;

  constructor() {
    this.factories = new Map();
    this.arrays = new Map();
  }

  addFactory(node: ts.Expression) {
    if (ts.isCallExpression(node)) {
      const arg0 = node.arguments[0];
      const key = node.expression.getText() + ":" + arg0.getText();
      let entries = this.factories.get(key);
      if (entries === void 0) {
        this.factories.set(key, [node]);
      } else {
        entries.push(node);
      }
    }
  }

  addArray(node: ts.Node) {
    if (ts.isArrayLiteralExpression(node)) {
      const key = node.elements.map(opCodeNodeToString).join(",");
      let entries = this.arrays.get(key);
      if (entries === void 0) {
        this.arrays.set(key, [node]);
      } else {
        entries.push(node);
      }
    }
  }
}

export function transformChunk(options: TransformChunkOptions): ts.TranspileOutput {
  const { code, sharedStrings } = options;

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
          // Workaround to retrieve leading comments for expressions.
          // https://github.com/microsoft/TypeScript/issues/54906
          if (node.getFullText().includes("/*@__IVI_TPL__*/")) {
            // Count the number of usages for factories and arrays with
            // exactly the same values.
            const args = node.arguments;
            if (args.length < 5) {
              throw new Error("Expected at least 5 arguments");
            } const arg0 = args[0];
            const arg1 = args[1];
            let arg2 = args[2];
            const arg3 = args[3];
            const arg4 = args[4];
            sharedData.addFactory(arg0);
            sharedData.addArray(arg3);
            sharedData.addArray(arg4);

            // Replace strings with shared strings
            if (sharedStrings !== void 0 && args.length > 5) {
              const arg5 = args[5];
              if (ts.isArrayLiteralExpression(arg2) && ts.isArrayLiteralExpression(arg5)) {
                const strings = arg5.elements.map(stringLiteralToString);

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
                    const newDataIndex = sharedStrings.get(strings[i]);
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
                sharedData.addArray(arg2);
              }
            }
            templates.push(node as ts.CallExpression);
            return node;
          }
        } else if (sharedStrings !== void 0 && ts.isArrayLiteralExpression(node)) {
          if (node.getFullText().includes("/*@__IVI_STRINGS__*/")) {
            const strings = [];
            for (const key of sharedStrings.keys()) {
              strings.push(factory.createStringLiteral(key));
            }
            return factory.updateArrayLiteralExpression(node, strings);
          }
        }

        return ts.visitEachChild(node, firstPass, context);
      };

      sourceFile = ts.visitNode(sourceFile, firstPass) as ts.SourceFile;

      if (templates.length > 0) {
        // Find factory and opCode array duplicates.
        const sharedDecls = [];
        const sharedFactories = new Map<ts.Node, ts.Identifier>();
        const sharedArrays = new Map<ts.Node, ts.Identifier>();

        for (const nodes of sharedData.factories.values()) {
          if (nodes.length > 1) {
            const expr = nodes[0];
            const id = factory.createUniqueName("__IVI_FACTORY");
            sharedDecls.push(factory.createVariableDeclaration(id, void 0, void 0, expr));
            for (let i = 0; i < nodes.length; i++) {
              sharedFactories.set(nodes[i], id);
            }
          }
        }

        for (const nodes of sharedData.arrays.values()) {
          if (nodes.length > 1) {
            const expr = nodes[0];
            const id = factory.createUniqueName("__IVI_OPCODES");
            sharedDecls.push(factory.createVariableDeclaration(id, void 0, void 0, expr));
            for (let i = 0; i < nodes.length; i++) {
              sharedArrays.set(nodes[i], id);
            }
          }
        }

        // Second Pass
        // - Deduplicate template descriptors data.
        if (sharedDecls.length > 0) {
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
            }
            return ts.visitEachChild(node, secondPass, context);
          };
          sourceFile = ts.visitNode(sourceFile, secondPass) as ts.SourceFile;

          const statements = sourceFile.statements;
          const newStatements = [];
          let i = 0;
          for (; i < statements.length; i++) {
            if (!ts.isImportDeclaration(sourceFile.statements[i])) {
              break;
            }
            newStatements.push(statements[i]);
          }
          newStatements.push(
            factory.createVariableStatement(
              void 0,
              factory.createVariableDeclarationList(sharedDecls, ts.NodeFlags.Const),
            ),
          );
          for (; i < statements.length; i++) {
            newStatements.push(statements[i]);
          }

          return factory.updateSourceFile(
            sourceFile,
            newStatements,
          );
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

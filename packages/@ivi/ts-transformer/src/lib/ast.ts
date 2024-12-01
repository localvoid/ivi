import * as ts from "typescript";
import { type TemplateNodeBlock } from "ivi/template/compiler";

function staticTemplateToExpr(factory: ts.NodeFactory, s: (string | number)[], exprs: ts.Expression[]): ts.Expression {
  let lastStringLiteral = factory.createStringLiteral("");
  let result: ts.Expression = lastStringLiteral;
  for (const c of s) {
    if (typeof c === "string") {
      lastStringLiteral.text += c;
    } else {
      result = factory.createBinaryExpression(
        factory.createBinaryExpression(result, ts.SyntaxKind.PlusToken, exprs[c]),
        ts.SyntaxKind.PlusToken,
        (lastStringLiteral = factory.createStringLiteral(""))
      );
    }
  }
  return result;
}

export function createTemplateDescriptor(
  factory: ts.NodeFactory,
  iviModuleIdentifier: ts.Identifier,
  exprsNodes: ts.Expression[],
  type: "html" | "svg",
  clone: boolean,
  id: ts.Identifier,
  root: TemplateNodeBlock,
  bundlePropData: Set<string> | undefined,
) {
  const template = root.template;
  let tplFactory;
  let tplFactoryFnId;
  let tplFactoryFnArg;
  if (typeof template === "string") {
    tplFactoryFnArg = factory.createStringLiteral(template);
    if (type === "html") {
      tplFactoryFnId = "_hE";
    } else {
      tplFactoryFnId = "_sE";
    }
  } else {
    tplFactoryFnArg = staticTemplateToExpr(factory, template, exprsNodes);
    if (type === "html") {
      if (clone) {
        tplFactoryFnId = "_h";
      } else {
        tplFactoryFnId = "_hN";
      }
    } else {
      if (clone) {
        tplFactoryFnId = "_s";
      } else {
        tplFactoryFnId = "_sN";
      }
    }
  }
  tplFactory = factory.createCallExpression(
    factory.createPropertyAccessExpression(iviModuleIdentifier, tplFactoryFnId),
    void 0,
    [tplFactoryFnArg],
  );

  const toNumeric = (n: number) => factory.createNumericLiteral(n);

  if (bundlePropData) {
    const data = root.data;
    for (let i = 0; i < data.length; i++) {
      bundlePropData.add(data[i]);
    }
    return factory.createVariableStatement(
      void 0,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            id,
            void 0,
            void 0,
            ts.addSyntheticLeadingComment(
              factory.createCallExpression(
                factory.createPropertyAccessExpression(iviModuleIdentifier, "_T"),
                void 0,
                [
                  tplFactory,
                  factory.createNumericLiteral(root.flags),
                  root.props.length === 0
                    ? factory.createPropertyAccessExpression(iviModuleIdentifier, "EMPTY_ARRAY")
                    : factory.createArrayLiteralExpression(root.props.map(toNumeric)),
                  root.child.length === 0
                    ? factory.createPropertyAccessExpression(iviModuleIdentifier, "EMPTY_ARRAY")
                    : factory.createArrayLiteralExpression(root.child.map(toNumeric)),
                  root.state.length === 0
                    ? factory.createPropertyAccessExpression(iviModuleIdentifier, "EMPTY_ARRAY")
                    : factory.createArrayLiteralExpression(root.state.map(toNumeric)),
                ],
              ),
              ts.SyntaxKind.MultiLineCommentTrivia,
              `@__IVI_TPL__(${data.join(",")})`,
            )
          ),
        ],
        ts.NodeFlags.Const,
      ),
    );
  }

  return factory.createVariableStatement(
    void 0,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          id,
          void 0,
          void 0,
          ts.addSyntheticLeadingComment(
            factory.createCallExpression(
              factory.createPropertyAccessExpression(iviModuleIdentifier, "_Td"),
              void 0,
              [
                tplFactory,
                factory.createNumericLiteral(root.flags),
                root.props.length === 0
                  ? factory.createPropertyAccessExpression(iviModuleIdentifier, "EMPTY_ARRAY")
                  : factory.createArrayLiteralExpression(root.props.map(toNumeric)),
                root.child.length === 0
                  ? factory.createPropertyAccessExpression(iviModuleIdentifier, "EMPTY_ARRAY")
                  : factory.createArrayLiteralExpression(root.child.map(toNumeric)),
                root.state.length === 0
                  ? factory.createPropertyAccessExpression(iviModuleIdentifier, "EMPTY_ARRAY")
                  : factory.createArrayLiteralExpression(root.state.map(toNumeric)),
              ],
            ),
            ts.SyntaxKind.MultiLineCommentTrivia,
            `@__IVI_TPL__`,
          )
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
}

import * as ts from "typescript";
import { type TemplateNodeBlock } from "ivi/template/compiler";

export function createVarStmt(factory: ts.NodeFactory, name: ts.Identifier, expr: ts.Expression): ts.VariableStatement {
  return factory.createVariableStatement(
    void 0,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(name, void 0, void 0, expr),
      ],
      ts.NodeFlags.Const,
    )
  );
}

export function createImportNamespaceDeclaration(
  factory: ts.NodeFactory,
  namespace: ts.Identifier,
  moduleSpecifier: string,
): ts.ImportDeclaration {
  return factory.createImportDeclaration(
    void 0,
    factory.createImportClause(
      false,
      void 0,
      factory.createNamespaceImport(namespace)
    ),
    factory.createStringLiteral(moduleSpecifier),
    void 0,
  );
}

export function createTemplateDescriptor(
  factory: ts.NodeFactory,
  iviModuleIdentifier: ts.Identifier,
  exprsNodes: ts.Expression[],
  type: string,
  clone: boolean,
  root: TemplateNodeBlock,
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

  const args = [
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
  ];
  if (root.data.length > 0) {
    args.push(
      factory.createArrayLiteralExpression(root.data.map((n: string) => factory.createStringLiteral(n)))
    );
  }
  return ts.addSyntheticLeadingComment(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(iviModuleIdentifier, "_T"),
      void 0,
      args,
    ),
    ts.SyntaxKind.MultiLineCommentTrivia,
    `@__IVI_TPL__`,
  );
}

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
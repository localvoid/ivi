import * as ts from "typescript";

/**
 * Checks that expression is an imported symbol.
 * 
 * @param expr Expression.
 * @param module Imported module.
 * @param names Imported symbol names.
 * @param checker TypeScript type checker.
 * @returns True if {@link expr} is a symbol imported from a {@link module} with
 *   a name from {@link names} list.
 */
export function isImportedSymbol(
  expr: ts.Expression,
  module: string,
  names: string[] | string,
  checker: ts.TypeChecker,
): undefined | string {
  if (ts.isIdentifier(expr)) {
    return isImportIdentifier(expr, module, names, checker);
  }
  if (ts.isPropertyAccessExpression(expr)) {
    return isImportPropertyAccessExpression(expr, module, names, checker);
  }
  return;
}

function isImportPropertyAccessExpression(
  node: ts.PropertyAccessExpression,
  module: string,
  names: string[] | string,
  checker: ts.TypeChecker,
): undefined | string {
  if (!ts.isIdentifier(node.name)) {
    return;
  }
  const text = node.name.text;
  if (typeof names === "string") {
    if (text !== names) {
      return;
    }
  } else {
    if (!names.includes(text)) {
      return;
    }
  }
  if (!ts.isIdentifier(node.expression)) {
    return;
  }
  const symbol = checker.getSymbolAtLocation(node.expression);
  if (!symbol) {
    return;
  }
  const namespaceImport = symbol.declarations?.[0];
  if (!namespaceImport || !ts.isNamespaceImport(namespaceImport)) {
    return;
  }
  const importDeclaration = namespaceImport.parent.parent;
  const specifier = importDeclaration.moduleSpecifier;
  if (!ts.isStringLiteral(specifier)) {
    return;
  }
  if (specifier.text !== module) {
    return;
  }

  return text;
}

function isImportIdentifier(
  node: ts.Identifier,
  module: string,
  names: string[] | string,
  checker: ts.TypeChecker,
): undefined | string {
  const symbol = checker.getSymbolAtLocation(node);
  if (!symbol) {
    return;
  }
  const iviImport = symbol.declarations?.[0];
  if (!iviImport || !ts.isImportSpecifier(iviImport)) {
    return;
  }
  const text = iviImport.propertyName ? iviImport.propertyName.text : iviImport.name.text;
  if (typeof names === "string") {
    if (text !== names) {
      return;
    }
  } else {
    if (!names.includes(text)) {
      return;
    }
  }
  const namedImport = iviImport.parent;
  if (!ts.isNamedImports(namedImport)) {
    return;
  }
  const importClause = namedImport.parent;
  if (!ts.isImportClause(importClause)) {
    return;
  }
  const importDeclaration = importClause.parent;
  if (!ts.isImportDeclaration(importDeclaration)) {
    return;
  }
  const specifier = importDeclaration.moduleSpecifier;
  if (!ts.isStringLiteral(specifier)) {
    return;
  }
  if (specifier.text !== module) {
    return;
  }

  return text;
}
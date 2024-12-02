import * as ts from "typescript";
import { createVarStmt } from "./ast.js";

/**
 * Scope for hoisted expressions.
 * 
 * Possible scopes:
 * - Source File
 * - `{}` blocks that can contain statements
 * - Arrow functions `() => expr`
 * 
 * It is possible to add class bodies as possible scopes, but since it would
 * affect object shapes, it is probably not worth it.
 */
export interface HoistScope {
  /**
   * Scope node.
   */
  readonly node: ts.SourceFile | ts.Block | ts.ArrowFunction;
  /**
   * Hoisted expressions.
   */
  hoisted: HoistedExpr[] | undefined;
}

export interface HoistedExprRef {
  /**
   * Hoisted expressions should be inserted before this statement.
   */
  readonly stmt: ts.Statement;
  /**
   * When reference statement is a `VariableDeclarationList` that contains
   * declarations before this reference declaration variable, hoisted expression
   * should be inserted before this reference declaration to handle edge cases
   * like this:
   * 
   *     const v = 1, fn = () => { console.log((() => v)()); };
   * 
   * It should be transformed into:
   * 
   *     const v = 1, __hoisted = () => v; fn = () => { console.log(_hoisted()); };
   */
  readonly varDecl: ts.VariableDeclaration | null;
}

export interface HoistedExpr {
  /**
   * Unique identifier for a hoisted expression.
   */
  readonly name: ts.Identifier;
  /**
   * Hoisted expression.
   */
  readonly expr: ts.Expression;
  /**
   * Hoisted expressions should be inserted before this reference.
   * 
   * Ref is `null` when scope is an `ArrowFunction` without a body and doesn't
   * have any statements: `() => x`.
   */
  readonly ref: HoistedExprRef | null;
}

/**
 * Hoist expression.
 * 
 * @param factory TypeScript node factory.
 * @param namePrefix Name prefix for a unique identifier.
 * @param expr Hoisted expression.
 * @param scope Scope to hoist an expression.
 * @param ref Insert hoisted expression before this node.
 * @returns Unique identifier.
 */
export function hoistExpr(
  factory: ts.NodeFactory,
  namePrefix: string,
  expr: ts.Expression,
  scope: HoistScope,
  ref: HoistedExprRef | null,
): ts.Identifier {
  let h = scope.hoisted;
  if (h === void 0) {
    scope.hoisted = h = [];
  }
  const name = factory.createUniqueName(namePrefix);
  h.push({
    name,
    expr,
    ref,
  });
  return name;
}

/**
 * Creates a visitor that tracks hoistable scopes.
 * 
 * @param factory TypeScript node factory.
 * @param scopes Hoistable scopes.
 * @param visitor Inner TypeScript node visitor.
 * @returns TypeScript node visitor.
 */
export const withHoistScope = (
  factory: ts.NodeFactory,
  scopes: HoistScope[],
  visitor: (node: ts.Node) => ts.VisitResult<ts.Node | undefined>,
): ts.Visitor => (
  (node: ts.Node): ts.VisitResult<ts.Node | undefined> => {
    if (ts.isArrowFunction(node)) {
      if (!ts.isBlock(node.body)) {
        scopes.push({ node, hoisted: void 0 });
        const r = visitor(node);
        const s = scopes.pop()!;
        const hoisted = s.hoisted;
        if (hoisted !== void 0) {
          const n = (r ?? node) as ts.ArrowFunction;
          const statements: ts.Statement[] = hoisted.map((h) => createVarStmt(factory, h.name, h.expr));
          statements.push(factory.createReturnStatement(n.body as ts.Expression));
          return factory.updateArrowFunction(
            n,
            n.modifiers,
            n.typeParameters,
            n.parameters,
            n.type,
            n.equalsGreaterThanToken,
            factory.createBlock(statements)
          );
        }
        return r;
      }
    } else if (ts.isBlock(node)) {
      scopes.push({ node, hoisted: void 0 });
      const r = visitor(node) as ts.Block ?? node;
      const s = scopes.pop()!;
      const hoisted = s.hoisted;
      if (hoisted !== void 0) {
        return factory.updateBlock(
          r,
          updateStatements(factory, r.statements, hoisted),
        );
      }
      return r;
    } else if (ts.isSourceFile(node)) {
      scopes.push({ node, hoisted: void 0 });
      const r = visitor(node) as ts.SourceFile ?? node;
      const s = scopes.pop()!;
      const hoisted = s.hoisted;
      if (hoisted !== void 0) {
        return factory.updateSourceFile(
          r,
          updateStatements(factory, r.statements, hoisted),
        );
      }
      return r;
    }

    return visitor(node);
  }
);

function updateStatements(factory: ts.NodeFactory, statements: ts.NodeArray<ts.Statement>, hoisted: HoistedExpr[]): ts.Statement[] {
  const newStatements: ts.Statement[] = [];
  if (hoisted.length > 0) {
    let h: HoistedExpr | undefined = hoisted[0];
    let hIndex = 1;

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      while (h !== void 0 && stmt.pos === h.ref!.stmt.pos) {
        newStatements.push(createVarStmt(factory, h.name, h.expr));
        if (hIndex < hoisted.length) {
          h = hoisted[hIndex++];
        } else {
          h = void 0;
        }
      }
      newStatements.push(stmt);
    }
  }
  return newStatements;
}

/**
 * Find reference that should be used as an insertion point for a hoisted
 * expression.
 * 
 * @param node Node.
 * @param scope Hoistable scope.
 * @returns A reference.
 */
export function findHoistRef(node: ts.Node, scope: HoistScope): HoistedExprRef | null {
  const scopeNode = scope.node;
  if (ts.isArrowFunction(scopeNode)) {
    return null;
  }

  let varDecl = null;
  node = node.parent;
  while (node.parent !== scopeNode) {
    if (ts.isVariableDeclaration(node)) {
      varDecl = node;
    }
    node = node.parent;
  }

  // VariableStatement(VariableDeclarationList(VariableDeclaration))
  if (ts.isVariableStatement(node)) {
    return {
      stmt: node,
      varDecl,
    };
  }
  return {
    stmt: node as ts.Statement, // This node should be a statement
    varDecl: null,
  };
}

/**
 * Finds outermost valid scope for an expression.
 * 
 * @param checker TypeScript type checker.
 * @param scopes Hoistable scopes.
 * @param node Expression.
 * @returns Outermost hoistable scope.
 */
export function findOutermostScope(checker: ts.TypeChecker, scopes: HoistScope[], node: ts.Node) {
  let outer = scopes[0];
  let outerStart = outer.node.getStart();
  const visitor = (node: ts.Node): ts.Node => {
    if (ts.isIdentifier(node)) {
      const symbol = checker.getSymbolAtLocation(node);
      if (symbol !== void 0) {
        const scope = findOutermostScopeForSymbol(checker, scopes, symbol);
        if (scope !== void 0) {
          const start = scope.node.getStart();
          if (start > outerStart) {
            outerStart = start;
            outer = scope;
          }
        }
      }
    }
    return ts.visitEachChild(node, visitor, void 0);
  };
  ts.visitNode(node, visitor);
  return outer;
}

/**
 * Checks if an expression can be hoisted to a scope.
 * 
 * @param checker TypeScript type checker.
 * @param scope Hoistable scope.
 * @param node Expression.
 * @returns True if an expression can be hoisted to a scope.
 */
export function isHoistableToScope(checker: ts.TypeChecker, scope: HoistScope, node: ts.Node): boolean {
  let result = true;
  const visitor = (node: ts.Node): ts.VisitResult<ts.Node | undefined> => {
    if (result === false) {
      return node;
    }
    if (ts.isIdentifier(node)) {
      const symbol = checker.getSymbolAtLocation(node);
      if (symbol !== void 0) {
        const resolvedSymbol = checker.resolveName(symbol.name, scope.node, symbol.flags, /*excludeGlobals*/ false);
        if (resolvedSymbol !== symbol) {
          result = false;
          return node;
        }
      }
    }
    return ts.visitEachChild(node, visitor, void 0);
  };
  ts.visitNode(node, visitor);
  return result;
}

function findOutermostScopeForSymbol(checker: ts.TypeChecker, scopes: HoistScope[], symbol: ts.Symbol): HoistScope | undefined {
  let result;
  let i = scopes.length;
  while (--i >= 0) {
    const scope = scopes[i];
    const resolvedSymbol = checker.resolveName(symbol.name, scope.node, symbol.flags, /*excludeGlobals*/ false);
    if (resolvedSymbol !== symbol) {
      break;
    }
    result = scope;
  }
  return result;
}


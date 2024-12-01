import * as ts from "typescript";

export interface HoistScope {
  readonly node: ts.SourceFile | ts.Block | ts.ArrowFunction;
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

export function hoistExpr(
  factory: ts.NodeFactory,
  expr: ts.Expression,
  scope: HoistScope,
  ref: HoistedExprRef | null,
): ts.Node {
  let h = scope.hoisted;
  if (h === void 0) {
    scope.hoisted = h = [];
  }
  const name = factory.createUniqueName("__ivi_");
  h.push({
    name,
    expr,
    ref,
  });
  return name;
}

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
          statements.push(factory.createReturnStatement(node.body));
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
        let h: HoistedExpr | undefined = hoisted[0];
        let hIndex = 1;

        const statements = r.statements;
        const newStatements: ts.Statement[] = [];
        for (let i = 0; i < statements.length; i++) {
          const stmt = statements[i];
          if (h !== void 0 && stmt.pos === h.ref!.stmt.pos) {
            newStatements.push(createVarStmt(factory, h.name, h.expr));
            if (hIndex < hoisted.length) {
              h = hoisted[hIndex++];
            } else {
              h = void 0;
            }
          }
          newStatements.push(stmt);
        }
        return factory.updateBlock(r, newStatements);
      }
      return r;
    } else if (ts.isSourceFile(node)) {
      scopes.push({ node, hoisted: void 0 });
      const r = visitor(node) as ts.SourceFile ?? node;
      const s = scopes.pop()!;
      const hoisted = s.hoisted;
      if (hoisted !== void 0) {
        let h: HoistedExpr | undefined = hoisted[0];
        let hIndex = 1;

        const statements = r.statements;
        const newStatements: ts.Statement[] = [];
        for (let i = 0; i < statements.length; i++) {
          const stmt = statements[i];
          if (h !== void 0 && stmt.pos === h.ref!.stmt.pos) {
            newStatements.push(createVarStmt(factory, h.name, h.expr));
            if (hIndex < hoisted.length) {
              h = hoisted[hIndex++];
            } else {
              h = void 0;
            }
          }
          newStatements.push(stmt);
        }
        return factory.updateSourceFile(r, newStatements);
      }
      return r;
    }

    return visitor(node);
  }
);

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

export function isHoistableToScope(checker: ts.TypeChecker, scope: HoistScope, node: ts.Node): boolean {
  let result = true;
  const visitor = (node: ts.Node): ts.VisitResult<ts.Node | undefined> => {
    if (result === false) {
      return;
    }
    if (ts.isIdentifier(node)) {
      const symbol = checker.getSymbolAtLocation(node);
      if (symbol !== void 0) {
        const resolvedSymbol = checker.resolveName(symbol.name, scope.node, symbol.flags, /*excludeGlobals*/ false);
        if (resolvedSymbol !== symbol) {
          result = false;
          return;
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

function createVarStmt(factory: ts.NodeFactory, name: ts.Identifier, expr: ts.Expression): ts.VariableStatement {
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

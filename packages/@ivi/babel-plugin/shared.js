import moduleImports from "@babel/helper-module-imports";

export function importSymbolFactory(path) {
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

export function hoistExpr(path, expr) {
  let prev = path;
  while (path && !path.isProgram()) {
    prev = path;
    path = path.parentPath;
  }
  if (prev !== path) {
    prev.insertBefore(expr);
  }
}

export function tryHoistExpr(expr) {
  const state = { isProgramScope: true };
  if (expr.isReferencedIdentifier()) {
    isProgramScopeIdentifier(expr, state);
  } else {
    expr.traverse(isProgramScopeVisitor, state);
  }
  return state.isProgramScope;
}

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

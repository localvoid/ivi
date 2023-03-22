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

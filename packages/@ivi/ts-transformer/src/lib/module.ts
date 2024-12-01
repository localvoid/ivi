import * as ts from "typescript";
import { parseTemplate } from "ivi/html/parser";
import { ITemplateType } from "ivi/template/ir";
import { compileTemplate, TemplateNodeType } from "ivi/template/compiler";
import { SharedStrings } from "./SharedStrings.js";
import { getTypeChecker } from "./checker.js";
import { createTemplateDescriptor } from "./ast.js";
import { findHoistRef, HoistScope } from "./hoist.js";

export interface TransformModuleOptions {
  readonly code: string;
  readonly sharedStrings: SharedStrings;
}

export function transformModule(options: TransformModuleOptions): ts.TranspileOutput {
  const {
    code,
    sharedStrings,
  } = options;
  const moduleTransformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => (
    (sourceFile: ts.SourceFile): ts.SourceFile => {
      const text = sourceFile.text;
      const factory = context.factory;
      const checker = getTypeChecker(sourceFile.fileName, text);
      const iviModuleIdentifier = factory.createUniqueName("__ivi");
      const bundlePropData = void 0;
      const templates = [];
      const scopes: HoistScope[] = [];

      const visitor = (node: ts.Node): ts.Node => {
        if (ts.isTaggedTemplateExpression(node)) {
          if (isIviTaggedTemplateExpression(node, checker)) {
            const comments = ts.getLeadingCommentRanges(text, node.getStart());
            const ref = findHoistRef(node, scopes[0]);

            let clone = true;
            let hoist = true;
            if (comments !== void 0) {
              for (let i = 0; i < comments.length; i++) {
                const comment = comments[i];
                const c = text.slice(comment.pos, comment.end);
                if (c.includes("preventClone")) {
                  clone = false;
                } else if (c.includes("preventHoist")) {
                  hoist = false;
                }
              }
            }

            const r = ts.visitEachChild(node, visitor, context) ?? node;

            const template = r.template;
            if (ts.isTemplateExpression(template)) {
              const spans = template.templateSpans;
              const statics = spans.map((s) => s.literal.text);
              const expressions = spans.map((s) => s.expression);

              try {
                const tir = parseTemplate(
                  statics,
                  ITemplateType.Htm,
                  () => false,
                );
                const result = compileTemplate(tir);
                const roots = result.roots.map((root) => {
                  switch (root.type) {
                    case TemplateNodeType.Block: // Element
                      const dynamicExprs = root.exprs.map((e) => expressions[e]);
                      const id = factory.createUniqueName("__ivi_tpl_");
                      templates.push({
                        tpl: createTemplateDescriptor(
                          factory,
                          iviModuleIdentifier,
                          expressions,
                          "html",
                          !clone,
                          id,
                          root,
                          bundlePropData,
                        ),
                        ref,
                      });
                      return factory.createCallExpression(
                        factory.createPropertyAccessExpression(iviModuleIdentifier, "_t"),
                        void 0,
                        dynamicExprs.length > 0
                          ? [id, ...dynamicExprs]
                          : [id],
                      );
                    case TemplateNodeType.Text: // Text
                      return factory.createStringLiteral(root.value);
                    case TemplateNodeType.Expr: // Expr
                      return expressions[root.value];
                  }
                });
                if (roots.length === 1) {
                  return roots[0];
                } else {
                  return factory.createArrayLiteralExpression(roots);
                }
              } catch (err) {
                throw err;
              }
            } else {
            }
          }
        }
        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    }
  );

  return ts.transpileModule(code, {
    transformers: {
      before: [
        moduleTransformer,
      ],
    }
  });
}

function isIviTaggedTemplateExpression(node: ts.TaggedTemplateExpression, checker: ts.TypeChecker): node is ts.TaggedTemplateExpression {
  if (ts.isIdentifier(node.tag)) {
    return isIviTemplateIdentifier(node.tag, checker);
  }
  if (ts.isPropertyAccessExpression(node.tag)) {
    return isIviTemplatePropertyAccessExpression(node.tag, checker);
  }
  return false;
}

function isIviTemplatePropertyAccessExpression(node: ts.PropertyAccessExpression, checker: ts.TypeChecker): boolean {
  if (ts.isIdentifier(node.name)) {
    const text = node.name.text;
    if (text !== "html" && text !== "svg") {
      return false;
    }
  }
  if (!ts.isIdentifier(node.expression)) {
    return false;
  }
  const symbol = checker.getSymbolAtLocation(node.expression);
  if (!symbol) {
    return false;
  }
  const namespaceImport = symbol.declarations?.[0];
  if (!namespaceImport || !ts.isNamespaceImport(namespaceImport)) {
    return false;
  }
  const importDeclaration = namespaceImport.parent.parent;
  const specifier = importDeclaration.moduleSpecifier;
  if (!ts.isStringLiteral(specifier)) {
    return false;
  }
  return specifier.text === "ivi";
}

function isIviTemplateIdentifier(node: ts.Identifier, checker: ts.TypeChecker): boolean {
  const symbol = checker.getSymbolAtLocation(node);
  if (!symbol) {
    return false;
  }
  const iviImport = symbol.declarations?.[0];
  if (!iviImport || !ts.isImportSpecifier(iviImport)) {
    return false;
  }
  if (iviImport.propertyName) {
    const text = iviImport.propertyName.text;
    if (text !== "html" && text !== "svg") {
      return false;
    }
  } else {
    const text = iviImport.name.text;
    if (text !== "html" && text !== "svg") {
      return false;
    }
  }
  const namedImport = iviImport.parent;
  if (!ts.isNamedImports(namedImport)) {
    return false;
  }
  const importClause = namedImport.parent;
  if (!ts.isImportClause(importClause)) {
    return false;
  }
  const importDeclaration = importClause.parent;
  if (!ts.isImportDeclaration(importDeclaration)) {
    return false;
  }
  const specifier = importDeclaration.moduleSpecifier;
  if (!ts.isStringLiteral(specifier)) {
    return false;
  }
  return specifier.text === "ivi";
}

import * as ts from "typescript";
import { parseTemplate } from "ivi/html/parser";
import { ITemplateType } from "ivi/template/ir";
import { compileTemplate, TemplateNodeType } from "ivi/template/compiler";
import { SharedStrings } from "./SharedStrings.js";
import { compilerOptions, getTypeChecker } from "./checker.js";
import { createImportNamespaceDeclaration, createTemplateDescriptor } from "./ast.js";
import { findHoistRef, hoistExpr, HoistScope, isHoistableToScope, withHoistScope } from "./hoist.js";

export interface TransformModuleOptions {
  readonly code: string;
  readonly sharedStrings?: SharedStrings;
}

export function transformModule(options: TransformModuleOptions): ts.TranspileOutput {
  const {
    code,
  } = options;
  const moduleTransformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => (
    (sourceFile: ts.SourceFile): ts.SourceFile => {
      const text = sourceFile.text;
      const factory = context.factory;
      const checker = getTypeChecker(sourceFile.fileName, text);
      const iviModuleIdentifier = factory.createUniqueName("__ivi_");
      const scopes: HoistScope[] = [];

      const visitor = withHoistScope(factory, scopes, (node: ts.Node): ts.Node => {
        if (ts.isTaggedTemplateExpression(node)) {
          const tplType = isIviTaggedTemplateExpression(node, checker);
          if (tplType) {
            const ref = findHoistRef(node, scopes[0]);

            let clone = true;
            let hoist = true;

            // https://github.com/microsoft/TypeScript/issues/54906
            const tagText = node.tag.getFullText();
            if (PREVENT_CLONE_RE.test(tagText)) {
              clone = false;
            } else if (PREVENT_HOIST_RE.test(tagText)) {
              hoist = false;
            }

            const r = ts.visitEachChild(node, visitor, context) ?? node;

            const template = r.template;
            const statics: string[] = [];
            const expressions: ts.Expression[] = [];
            if (ts.isTemplateExpression(template)) {
              statics.push(template.head.text);
              for (const s of template.templateSpans) {
                statics.push(s.literal.text);
                expressions.push(s.expression);
              }
            } else { // NoSubstitutionTemplateLiteral
              statics.push(template.text);
            }

            try {
              const tir = parseTemplate(
                statics,
                tplType === "html"
                  ? ITemplateType.Htm
                  : ITemplateType.Svg,
                (i) => {
                  const expr = expressions[i];
                  if (!hoist) {
                    return false;
                  }
                  return isHoistableToScope(checker, scopes[0], expr);

                  // return false;
                }
              );
              const result = compileTemplate(tir);
              const roots = result.roots.map((root) => {
                switch (root.type) {
                  case TemplateNodeType.Block: // Element
                    const dynamicExprs = root.exprs.map((e) => expressions[e]);
                    const id = hoistExpr(
                      factory,
                      "__ivi_tpl_",
                      createTemplateDescriptor(
                        factory,
                        iviModuleIdentifier,
                        expressions,
                        tplType,
                        clone,
                        root,
                      ),
                      scopes[0],
                      ref,
                    );

                    return factory.createCallExpression(
                      factory.createPropertyAccessExpression(iviModuleIdentifier, "_t"),
                      void 0,
                      dynamicExprs.length > 0
                        ? [id, factory.createArrayLiteralExpression(dynamicExprs)]
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
          }
        }
        return ts.visitEachChild(node, visitor, context);
      });

      sourceFile = ts.visitNode(sourceFile, visitor) as ts.SourceFile;
      return factory.updateSourceFile(
        sourceFile,
        [
          createImportNamespaceDeclaration(factory, iviModuleIdentifier, "ivi"),
          ...sourceFile.statements,
        ],
      );
    }
  );

  return ts.transpileModule(code, {
    compilerOptions,
    transformers: {
      before: [
        moduleTransformer,
      ],
    }
  });
}

const PREVENT_CLONE_RE = /\/\*.*preventClone.*\*\//;
const PREVENT_HOIST_RE = /\/\*.*preventHoist.*\*\//;

function isIviTaggedTemplateExpression(node: ts.TaggedTemplateExpression, checker: ts.TypeChecker): undefined | "html" | "svg" {
  if (ts.isIdentifier(node.tag)) {
    return isIviTemplateIdentifier(node.tag, checker);
  }
  if (ts.isPropertyAccessExpression(node.tag)) {
    return isIviTemplatePropertyAccessExpression(node.tag, checker);
  }
  return;
}

function isIviTemplatePropertyAccessExpression(node: ts.PropertyAccessExpression, checker: ts.TypeChecker): undefined | "html" | "svg" {
  if (!ts.isIdentifier(node.name)) {
    return;
  }
  const text = node.name.text;
  if (text !== "html" && text !== "svg") {
    return;
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
  if (specifier.text !== "ivi") {
    return;
  }

  return text;
}

function isIviTemplateIdentifier(node: ts.Identifier, checker: ts.TypeChecker): undefined | "html" | "svg" {
  const symbol = checker.getSymbolAtLocation(node);
  if (!symbol) {
    return;
  }
  const iviImport = symbol.declarations?.[0];
  if (!iviImport || !ts.isImportSpecifier(iviImport)) {
    return;
  }
  const text = iviImport.propertyName ? iviImport.propertyName.text : iviImport.name.text;
  if (text !== "html" && text !== "svg") {
    return;
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
  if (specifier.text !== "ivi") {
    return;
  }

  return text;
}

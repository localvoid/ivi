// NOTES:
//
// ## `@__IVI_TPL__` comments
//
// Template descriptor call expressions are marked with /*@__IVI_TPL__*/ comment so that it would be possible to find
// templates during chunk optimization pass. I don't think that there is a better way to figure out which call
// expression are belong to template descriptor creation because when chunks are processed, chunk transformer won't have
// any infomation about imported symbols and it won't be able to figure out which call expressions are used to create
// template descriptors.
//
// In theory, Rollup provides `importedBindings` inside of a `RenderedChunk` object, so it is probably possible to add
// an option that uses this information to figure out bindings for template descriptor call expressions. But it is still
// will be necessary to provide a solution with a comment to support bundlers that doesn't provide such information.

import * as ts from "typescript";
import { parseTemplate } from "ivi/html/parser";
import { TemplateParserError } from "ivi/template/parser";
import { ITemplateType } from "ivi/template/ir";
import { compileTemplate, TemplateNodeType } from "ivi/template/compiler";
import { compilerOptions, getTypeChecker } from "./checker.js";
import { isImportedSymbol } from "./import.js";
import { createImportNamespaceDeclaration, createTemplateDescriptor } from "./ast.js";
import { findHoistRef, findOutermostScope, hoistExpr, HoistScope, isHoistableToScope, withHoistScope } from "./hoist.js";

export interface HoistOptions {
  readonly events?: boolean,
  readonly renderFunctions?: boolean,
}

export interface TransformModuleOptions {
  readonly code: string;
  readonly strings?: Set<string> | undefined;
  readonly hoist?: HoistOptions | undefined;
}

export class TransformModuleError extends Error {
  readonly pos: number;

  constructor(message: string, pos: number) {
    super(message);
    this.pos = pos;
  }
}

export function transformModule(options: TransformModuleOptions): ts.TranspileOutput {
  const { code, strings, hoist } = options;
  const hoistEvents = hoist?.events ?? true;
  const hoistRenderFunctions = hoist?.renderFunctions ?? true;

  const moduleTransformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext): ts.Transformer<ts.SourceFile> => (
    (sourceFile: ts.SourceFile): ts.SourceFile => {
      const text = sourceFile.text;
      const factory = context.factory;
      const checker = getTypeChecker(sourceFile.fileName, text);
      const scopes: HoistScope[] = [];
      let iviModuleIdentifier: undefined | ts.Identifier;

      const visitor = withHoistScope(factory, scopes, (node: ts.Node): ts.Node | undefined => {
        if (hoistRenderFunctions && ts.isArrowFunction(node)) {
          // Right now it can only recognize a basic pattern:
          // `component(() => () => ...)`
          const inner = node.body;
          if (ts.isArrowFunction(inner)) {
            const component = node.parent;
            if (ts.isCallExpression(component)) {
              if (isImportedSymbol(component.expression, "ivi", "component", checker)) {
                const scope = findOutermostScope(checker, scopes, inner);
                if (scope !== scopes[scopes.length - 1]) {
                  const r = ts.visitEachChild(node, visitor, context) as ts.ArrowFunction;
                  if (ts.isArrowFunction(r)) {
                    if (ts.isArrowFunction(r.body)) {
                      const id = hoistExpr(factory, "__ivi_hoist_", r.body as ts.Expression, scope, findHoistRef(node, scope));
                      return factory.updateArrowFunction(
                        node,
                        node.modifiers,
                        node.typeParameters,
                        node.parameters,
                        node.type,
                        node.equalsGreaterThanToken,
                        id,
                      );
                    }
                  }
                  return r;
                }
              }
            }
          }
        } else if (ts.isTaggedTemplateExpression(node)) {
          const tplType = isImportedSymbol(node.tag, "ivi", TAGGED_TEMPLATES, checker);

          if (tplType) {
            const sourceMapRange = ts.getSourceMapRange(node);
            if (iviModuleIdentifier === void 0) {
              iviModuleIdentifier = factory.createUniqueName("__ivi_");
            }
            const ref = findHoistRef(node, scopes[0]);

            let clone = true;
            let hoist = true;

            // Workaround to retrieve leading comments for expressions.
            // https://github.com/microsoft/TypeScript/issues/54906
            const tagText = node.tag.getFullText();
            if (PREVENT_CLONE_RE.test(tagText)) {
              clone = false;
            } else if (PREVENT_HOIST_RE.test(tagText)) {
              hoist = false;
            }

            const template = node.template;
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
              const hoistedExpressions = new Map<number, HoistScope>();

              const tir = parseTemplate(
                statics,
                tplType === "html"
                  ? ITemplateType.Htm
                  : ITemplateType.Svg,
                (i, staticPart) => {
                  const expr = expressions[i];
                  if (staticPart) {
                    return isHoistableToScope(checker, scopes[0], expr);
                  }
                  if (!hoist) {
                    return false;
                  }
                  if (hoistEvents && ts.isArrowFunction(expr)) {
                    const scope = findOutermostScope(checker, scopes, expr);
                    if (scope !== scopes[scopes.length - 1]) {
                      hoistedExpressions.set(i, scope);
                      return true;
                    }
                  }
                  return false;
                }
              );

              const r = ts.visitEachChild(node, visitor, context);
              if (ts.isTaggedTemplateExpression(r)) {
                let expressions: ts.Expression[] = [];
                if (ts.isTemplateExpression(r.template)) {
                  expressions = r.template.templateSpans.map((s, i) => {
                    const expr = s.expression;
                    const scope = hoistedExpressions.get(i);
                    if (scope !== void 0) {
                      return hoistExpr(
                        factory,
                        "__ivi_hoist_",
                        expr,
                        scope,
                        findHoistRef(node, scope),
                      );
                    }
                    return expr;
                  });
                }
                const result = compileTemplate(tir);
                const roots = result.roots.map((root) => {
                  switch (root.type) {
                    case TemplateNodeType.Block: // Element
                      if (strings !== void 0) {
                        const tplStrings = root.data;
                        for (let i = 0; i < tplStrings.length; i++) {
                          strings.add(tplStrings[i]);
                        }
                      }

                      const dynamicExprs = root.exprs.map((e) => expressions[e]);
                      const id = hoistExpr(
                        factory,
                        "__ivi_tpl_",
                        createTemplateDescriptor(
                          factory,
                          iviModuleIdentifier!,
                          expressions,
                          tplType,
                          clone,
                          root,
                        ),
                        scopes[0],
                        ref,
                      );

                      return factory.createCallExpression(
                        factory.createPropertyAccessExpression(iviModuleIdentifier!, "_t"),
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
                  return ts.setSourceMapRange(
                    roots[0],
                    sourceMapRange,
                  );
                } else {
                  return ts.setSourceMapRange(
                    factory.createArrayLiteralExpression(roots),
                    sourceMapRange,
                  );
                }
              }
            } catch (err) {
              if (err instanceof TemplateParserError) {
                if (err.staticsOffset === 0) {
                  if (ts.isTemplateExpression(template)) {
                    throw new TransformModuleError(err.message, template.head.getStart() + err.textOffset + 1);
                  } else { // NoSubstitutionTemplateLiteral
                    throw new TransformModuleError(err.message, template.getStart() + err.textOffset + 1);
                  }
                } else {
                  if (ts.isTemplateExpression(template)) {
                    const span = template.templateSpans[err.staticsOffset - 1];
                    throw new TransformModuleError(err.message, span.literal.getStart() + err.textOffset + 1);
                  }
                }
              }
              throw new TransformModuleError(err.message, template.getStart());
            }
          }
        }
        return ts.visitEachChild(node, visitor, context);
      });

      sourceFile = ts.visitNode(sourceFile, visitor) as ts.SourceFile;
      if (iviModuleIdentifier !== void 0) {
        return factory.updateSourceFile(
          sourceFile,
          [
            createImportNamespaceDeclaration(factory, iviModuleIdentifier, "ivi"),
            ...sourceFile.statements,
          ],
        );
      }
      return sourceFile;
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

const TAGGED_TEMPLATES = ["html", "svg"];
const PREVENT_CLONE_RE = /\/\*.*preventClone.*\*\//;
const PREVENT_HOIST_RE = /\/\*.*preventHoist.*\*\//;

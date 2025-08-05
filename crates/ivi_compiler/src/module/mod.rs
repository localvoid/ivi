use std::collections::hash_map;

use oxc_allocator::{Address, Allocator, GetAddress, TakeIn};
use oxc_ast::ast::*;
use oxc_diagnostics::OxcDiagnostic;
use oxc_semantic::{Scoping, SymbolId};
use oxc_traverse::{Traverse, traverse_mut};
use rustc_hash::{FxHashMap, FxHashSet};

use crate::{
    CompilerOptions,
    context::{TraverseCtx, TraverseCtxState},
    import::ImportSymbols,
    oveo::oveo_intrinsic,
    tpl::{TemplateKind, compile_template},
};

pub fn compile_module<'a>(
    program: &mut Program<'a>,
    allocator: &'a Allocator,
    scoping: Scoping,
    options: &CompilerOptions,
    strings: &mut FxHashSet<String>,
) -> Vec<OxcDiagnostic> {
    let mut t = ModuleCompiler::new(options, strings);
    traverse_mut(&mut t, allocator, program, scoping, TraverseCtxState::default());
    t.errors
}

struct ModuleCompiler<'a, 'ctx> {
    options: &'ctx CompilerOptions,
    strings: &'ctx mut FxHashSet<String>,
    ivi_module: FxHashMap<SymbolId, IviSymbol>,
    imports: ImportSymbols<'a>,
    statements: Vec<Address>,
    templates: FxHashMap<Address, Vec<Statement<'a>>>,
    errors: Vec<OxcDiagnostic>,
}

impl<'a, 'ctx> ModuleCompiler<'a, 'ctx> {
    pub fn new(options: &'ctx CompilerOptions, strings: &'ctx mut FxHashSet<String>) -> Self {
        Self {
            options,
            strings,
            ivi_module: FxHashMap::default(),
            imports: ImportSymbols::default(),
            statements: Vec::new(),
            templates: FxHashMap::default(),
            errors: Vec::new(),
        }
    }

    fn resolve(&self, expr: &Expression<'a>, scoping: &Scoping) -> Option<IviSymbol> {
        match expr {
            Expression::Identifier(id) => {
                let r = scoping.get_reference(id.reference_id());
                if let Some(symbol_id) = r.symbol_id() {
                    self.ivi_module.get(&symbol_id).copied()
                } else {
                    None
                }
            }
            Expression::StaticMemberExpression(expr) => {
                if let Some(IviSymbol::Module) = self.resolve(&expr.object, scoping) {
                    match expr.property.name.as_str() {
                        "component" => Some(IviSymbol::Component),
                        "html" => Some(IviSymbol::Html),
                        "svg" => Some(IviSymbol::Svg),
                        _ => None,
                    }
                } else {
                    None
                }
            }
            _ => None,
        }
    }

    fn add_template_decl(&mut self, address: Address, decl: Statement<'a>) {
        match self.templates.entry(address) {
            hash_map::Entry::Occupied(mut entry) => {
                entry.get_mut().push(decl);
            }
            hash_map::Entry::Vacant(entry) => {
                entry.insert(vec![decl]);
            }
        }
    }
}

impl<'a> Traverse<'a, TraverseCtxState<'a>> for ModuleCompiler<'a, '_> {
    fn enter_statement(&mut self, node: &mut Statement<'a>, _ctx: &mut TraverseCtx<'a>) {
        self.statements.push(node.address());
    }

    fn exit_statement(&mut self, _node: &mut Statement<'a>, _ctx: &mut TraverseCtx<'a>) {
        self.statements.pop();
    }

    fn exit_expression(&mut self, node: &mut Expression<'a>, ctx: &mut TraverseCtx<'a>) {
        match node {
            Expression::CallExpression(expr) if self.options.oveo => {
                // hoist render functions
                // component(() => hoist(() => { .. }));
                if let Some(IviSymbol::Component) = self.resolve(&expr.callee, ctx.scoping()) {
                    if let Some(Argument::ArrowFunctionExpression(expr)) = expr.arguments.get_mut(0)
                    {
                        if expr.expression {
                            if let Some(Statement::ExpressionStatement(expr_stmt)) =
                                &mut expr.body.statements.get_mut(0)
                            {
                                expr_stmt.expression = oveo_intrinsic(
                                    expr_stmt.expression.take_in(ctx.ast.allocator),
                                    self.imports.hoist(ctx),
                                    ctx,
                                );
                            }
                        }
                    }
                }
            }
            Expression::TaggedTemplateExpression(expr) => {
                if let Some(ivi) = self.resolve(&expr.tag, ctx.scoping()) {
                    let kind = match ivi {
                        IviSymbol::Html => TemplateKind::Html,
                        IviSymbol::Svg => TemplateKind::Svg,
                        _ => {
                            return;
                        }
                    };
                    match compile_template(
                        &mut expr.quasi,
                        ctx,
                        kind,
                        &mut self.imports,
                        self.options.oveo,
                    ) {
                        Ok(result) => {
                            for s in result.strings {
                                self.strings.insert(s);
                            }
                            let address = self.statements[0];
                            for decl in result.decl {
                                self.add_template_decl(address, decl);
                            }
                            *node = result.expr;
                        }
                        Err(error) => {
                            self.errors.push(error);
                        }
                    }
                }
            }
            _ => {}
        }
    }

    fn exit_import_declaration(
        &mut self,
        node: &mut ImportDeclaration<'a>,
        _ctx: &mut TraverseCtx<'a>,
    ) {
        // Resolve ivi module
        if let Some(specifiers) = &node.specifiers {
            let source = &node.source;
            if source.value != "ivi" {
                return;
            }

            for spec in specifiers {
                match spec {
                    // import { imported } from "source"
                    // import { imported as local } from "source"
                    ImportDeclarationSpecifier::ImportSpecifier(spec) => {
                        let s = match spec.imported.name().as_str() {
                            "component" => IviSymbol::Component,
                            "html" => IviSymbol::Html,
                            "svg" => IviSymbol::Svg,
                            _ => {
                                continue;
                            }
                        };
                        self.ivi_module.insert(spec.local.symbol_id(), s);
                    }
                    // import * as local from "source"
                    ImportDeclarationSpecifier::ImportNamespaceSpecifier(spec) => {
                        self.ivi_module.insert(spec.local.symbol_id(), IviSymbol::Module);
                    }
                    _ => {}
                }
            }
        }
    }

    fn exit_program(&mut self, node: &mut Program<'a>, ctx: &mut TraverseCtx<'a>) {
        let imports = self.imports.create_import_statements(ctx);
        if !imports.is_empty() {
            let index = node
                .body
                .iter()
                .position(|stmt| !matches!(stmt, Statement::ImportDeclaration(_)))
                .unwrap_or(node.body.len());

            node.body.splice(index..index, imports);
        }

        if !self.templates.is_empty() {
            let statements = &mut node.body;
            let mut new_statements =
                ctx.ast.vec_with_capacity(statements.len() + self.templates.len());

            for stmt in statements.drain(..) {
                if let Some(s) = self.templates.remove(&stmt.address()) {
                    new_statements.extend(s.into_iter());
                }
                new_statements.push(stmt);
            }

            *statements = new_statements;
        }
    }
}

#[derive(Clone, Copy)]
enum IviSymbol {
    Module,
    Component,
    Html,
    Svg,
}

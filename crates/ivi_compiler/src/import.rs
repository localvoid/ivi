use oxc_ast::{
    NONE,
    ast::{
        Expression, ImportDeclarationSpecifier, ImportOrExportKind, ModuleExportName, Statement,
    },
};
use oxc_semantic::SymbolFlags;
use oxc_span::SPAN;
use oxc_traverse::BoundIdentifier;

use crate::context::TraverseCtx;

#[derive(Default)]
pub struct ImportSymbols<'a> {
    descriptor_id: Option<BoundIdentifier<'a>>,  // _T
    html_id: Option<BoundIdentifier<'a>>,        // _hN
    html_el_id: Option<BoundIdentifier<'a>>,     // _hE
    svg_id: Option<BoundIdentifier<'a>>,         // _sN
    svg_el_id: Option<BoundIdentifier<'a>>,      // _sE
    tpl_id: Option<BoundIdentifier<'a>>,         // _t
    empty_array_id: Option<BoundIdentifier<'a>>, // _t

    hoist_id: Option<BoundIdentifier<'a>>,
    dedupe_id: Option<BoundIdentifier<'a>>,
}

impl<'a> ImportSymbols<'a> {
    pub fn template_descriptor(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.descriptor_id, "_T", ctx)
    }

    pub fn html_template(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.html_id, "_hN", ctx)
    }

    pub fn html_element(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.html_el_id, "_hE", ctx)
    }

    pub fn svg_template(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.svg_id, "_sN", ctx)
    }

    pub fn svg_element(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.svg_el_id, "_sE", ctx)
    }

    pub fn create_from_template(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.tpl_id, "_t", ctx)
    }

    pub fn empty_array(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.empty_array_id, "EMPTY_ARRAY", ctx)
    }

    pub fn hoist(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.hoist_id, "hoist", ctx)
    }

    pub fn dedupe(&mut self, ctx: &mut TraverseCtx<'a>) -> Expression<'a> {
        get(&mut self.dedupe_id, "dedupe", ctx)
    }

    pub fn create_import_statements(&self, ctx: &mut TraverseCtx<'a>) -> Vec<Statement<'a>> {
        let mut imports = Vec::new();
        let mut specifiers = ctx.ast.vec();
        if let Some(id) = &self.descriptor_id {
            specifiers.push(spec("_T", id, ctx));
        }
        if let Some(id) = &self.html_id {
            specifiers.push(spec("_hN", id, ctx));
        }
        if let Some(id) = &self.html_el_id {
            specifiers.push(spec("_hE", id, ctx));
        }
        if let Some(id) = &self.svg_id {
            specifiers.push(spec("_sN", id, ctx));
        }
        if let Some(id) = &self.svg_el_id {
            specifiers.push(spec("_sE", id, ctx));
        }
        if let Some(id) = &self.tpl_id {
            specifiers.push(spec("_t", id, ctx));
        }
        if let Some(id) = &self.empty_array_id {
            specifiers.push(spec("EMPTY_ARRAY", id, ctx));
        }
        if !specifiers.is_empty() {
            imports.push(Statement::ImportDeclaration(ctx.ast.alloc_import_declaration(
                SPAN,
                Some(specifiers),
                ctx.ast.string_literal(SPAN, ctx.ast.atom("ivi"), None),
                None,
                NONE,
                ImportOrExportKind::Value,
            )));
        }

        let mut specifiers = ctx.ast.vec();
        if let Some(id) = &self.hoist_id {
            specifiers.push(spec("hoist", id, ctx));
        }
        if let Some(id) = &self.dedupe_id {
            specifiers.push(spec("dedupe", id, ctx));
        }
        if !specifiers.is_empty() {
            imports.push(Statement::ImportDeclaration(ctx.ast.alloc_import_declaration(
                SPAN,
                Some(specifiers),
                ctx.ast.string_literal(SPAN, ctx.ast.atom("oveo"), None),
                None,
                NONE,
                ImportOrExportKind::Value,
            )));
        }

        imports
    }
}

fn get<'a>(
    cell: &mut Option<BoundIdentifier<'a>>,
    name: &'static str,
    ctx: &mut TraverseCtx<'a>,
) -> Expression<'a> {
    if let Some(id) = cell {
        id.create_read_expression(ctx)
    } else {
        let uid = ctx.generate_uid_in_root_scope(name, SymbolFlags::ConstVariable);
        let read = uid.create_read_expression(ctx);
        *cell = Some(uid);
        read
    }
}

fn spec<'a>(
    name: &'static str,
    id: &BoundIdentifier<'a>,
    ctx: &mut TraverseCtx<'a>,
) -> ImportDeclarationSpecifier<'a> {
    ImportDeclarationSpecifier::ImportSpecifier(ctx.ast.alloc_import_specifier(
        SPAN,
        ModuleExportName::IdentifierName(ctx.ast.identifier_name(SPAN, ctx.ast.atom(name))),
        id.create_binding_identifier(ctx),
        ImportOrExportKind::Value,
    ))
}

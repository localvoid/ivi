use indexmap::IndexSet;
use oxc_allocator::{TakeIn, Vec as ArenaVec};
use oxc_ast::{NONE, ast::*};
use oxc_diagnostics::OxcDiagnostic;
use oxc_semantic::SymbolFlags;
use oxc_span::SPAN;

use crate::{
    context::TraverseCtx, import::ImportSymbols, oveo::oveo_intrinsic, tpl::emit::TemplateNode,
};

mod emit;
mod html;
pub mod opcodes;
mod parser;

pub struct CompiledTemplate<'a> {
    pub decl: ArenaVec<'a, Statement<'a>>,
    pub expr: Expression<'a>,
    pub strings: Vec<String>,
}

#[derive(Clone, Copy)]
pub enum TemplateKind {
    Html,
    Svg,
}

pub fn compile_template<'a>(
    tpl: &mut TemplateLiteral<'a>,
    ctx: &mut TraverseCtx<'a>,
    kind: TemplateKind,
    imports: &mut ImportSymbols<'a>,
    oveo: bool,
) -> Result<CompiledTemplate<'a>, OxcDiagnostic> {
    let mut decl = ctx.ast.vec();
    let mut exprs = ctx.ast.vec();
    let mut strings = Vec::new();
    let nodes = parser::parse_template(tpl, ctx.scoping())?;

    for n in &nodes {
        let e = emit::emit_root_element(n, kind, &mut tpl.expressions, ctx, imports, oveo);
        match e {
            TemplateNode::Block(t) => {
                let uid = ctx.generate_uid_in_root_scope("_TPL_", SymbolFlags::ConstVariable);

                // const _TPL_ = (void 0, "@ivi.tpl", _T(statics, ..opcodes));
                let statics = if let Expression::StringLiteral(_) = t.statics {
                    ctx.ast.expression_call(
                        SPAN,
                        match kind {
                            TemplateKind::Html => imports.html_element(ctx),
                            TemplateKind::Svg => imports.svg_element(ctx),
                        },
                        NONE,
                        ctx.ast.vec1(t.statics.into()),
                        false,
                    )
                } else {
                    ctx.ast.expression_call(
                        SPAN,
                        match kind {
                            TemplateKind::Html => imports.html_template(ctx),
                            TemplateKind::Svg => imports.svg_template(ctx),
                        },
                        NONE,
                        ctx.ast.vec1(t.statics.into()),
                        false,
                    )
                };
                let statics =
                    if oveo { oveo_intrinsic(statics, imports.dedupe(ctx), ctx) } else { statics };

                let mut arguments = ctx.ast.vec_with_capacity(6);
                arguments.push(statics.into());
                arguments.push(
                    ctx.ast
                        .expression_numeric_literal(SPAN, t.flags as f64, None, NumberBase::Decimal)
                        .into(),
                );
                arguments
                    .push(op_codes_into_expression(&t.props_op_codes, ctx, imports, oveo).into());
                arguments
                    .push(op_codes_into_expression(&t.child_op_codes, ctx, imports, oveo).into());
                arguments
                    .push(op_codes_into_expression(&t.state_op_codes, ctx, imports, oveo).into());
                if !t.strings.is_empty() {
                    arguments.push(strings_into_expression(&t.strings, ctx).into());
                    strings.extend(t.strings.into_iter());
                }
                let template_descriptor = ctx.ast.expression_call(
                    SPAN,
                    imports.template_descriptor(ctx),
                    NONE,
                    arguments,
                    false,
                );
                let v = ctx.ast.declaration_variable(
                    SPAN,
                    VariableDeclarationKind::Const,
                    ctx.ast.vec1(ctx.ast.variable_declarator(
                        SPAN,
                        VariableDeclarationKind::Const,
                        ctx.ast.binding_pattern(
                            BindingPatternKind::BindingIdentifier(
                                ctx.alloc(uid.create_binding_identifier(ctx)),
                            ),
                            NONE,
                            false,
                        ),
                        Some(ctx.ast.expression_sequence(
                            SPAN,
                            ctx.ast.vec_from_array([
                                ctx.ast.void_0(SPAN),
                                ctx.ast.expression_string_literal(
                                    SPAN,
                                    ctx.ast.atom("@ivi.tpl"),
                                    None,
                                ),
                                template_descriptor,
                            ]),
                        )),
                        false,
                    )),
                    false,
                );
                decl.push(v.into());

                // _t(_TPL_, [expressions])
                let call_expressions = if t.expressions.is_empty() {
                    ctx.ast.vec_from_array([uid.create_read_expression(ctx).into()])
                } else {
                    ctx.ast.vec_from_array([
                        uid.create_read_expression(ctx).into(),
                        ctx.ast
                            .expression_array(
                                SPAN,
                                ctx.ast.vec_from_iter(t.expressions.iter().map(|i| {
                                    tpl.expressions[*i].take_in(ctx.ast.allocator).into()
                                })),
                            )
                            .into(),
                    ])
                };
                let call = ctx.ast.expression_call(
                    SPAN,
                    imports.create_from_template(ctx),
                    NONE,
                    call_expressions,
                    false,
                );
                exprs.push(call);
            }
            TemplateNode::Text(text) => {
                exprs.push(ctx.ast.expression_string_literal(SPAN, ctx.ast.atom(&text), None));
            }
            TemplateNode::Expr(i) => {
                exprs.push(tpl.expressions[i].take_in(ctx.ast.allocator));
            }
        }
    }

    let expr = if exprs.len() > 1 {
        ctx.ast.expression_array(SPAN, ctx.ast.vec_from_iter(exprs.into_iter().map(|e| e.into())))
    } else {
        exprs.pop().unwrap()
    };
    Ok(CompiledTemplate { decl, expr, strings })
}

fn op_codes_into_expression<'a>(
    op_codes: &[u32],
    ctx: &mut TraverseCtx<'a>,
    imports: &mut ImportSymbols<'a>,
    oveo: bool,
) -> Expression<'a> {
    if op_codes.is_empty() {
        imports.empty_array(ctx)
    } else {
        let expr = ctx.ast.expression_array(
            SPAN,
            ctx.ast.vec_from_iter(op_codes.iter().map(|o| {
                ctx.ast
                    .expression_numeric_literal(SPAN, *o as f64, None, NumberBase::Decimal)
                    .into()
            })),
        );
        if oveo { oveo_intrinsic(expr, imports.dedupe(ctx), ctx) } else { expr }
    }
}

fn strings_into_expression<'a>(
    strings: &IndexSet<String>,
    ctx: &mut TraverseCtx<'a>,
) -> Expression<'a> {
    ctx.ast.expression_array(
        SPAN,
        ctx.ast.vec_from_iter(
            strings
                .iter()
                .map(|s| ctx.ast.expression_string_literal(SPAN, ctx.ast.atom(s), None).into()),
        ),
    )
}

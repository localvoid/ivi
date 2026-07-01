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
    pub decl: Vec<Statement<'a>>,
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
    dedupe_strings: bool,
) -> Result<CompiledTemplate<'a>, OxcDiagnostic> {
    let mut decl = Vec::new();
    let mut exprs = Vec::new();
    let mut strings = Vec::new();
    let nodes = parser::parse_template(tpl, ctx.scoping())?;

    for n in &nodes {
        let e = emit::emit_root_element(n, kind, &mut tpl.expressions, ctx, imports, oveo);
        match e {
            TemplateNode::Block(t) => {
                let uid = ctx.generate_uid_in_root_scope("_TPL_", SymbolFlags::ConstVariable);

                // const _TPL_ = __IVI_TPL__(_T(statics, ..opcodes));
                let statics = if let Expression::StringLiteral(_) = t.statics {
                    Expression::CallExpression(CallExpression::boxed(
                        SPAN,
                        match kind {
                            TemplateKind::Html => imports.html_element(ctx),
                            TemplateKind::Svg => imports.svg_element(ctx),
                        },
                        NONE,
                        ArenaVec::from_value_in(t.statics.into(), ctx),
                        false,
                        ctx,
                    ))
                } else {
                    Expression::CallExpression(CallExpression::boxed(
                        SPAN,
                        match kind {
                            TemplateKind::Html => imports.html_template(ctx),
                            TemplateKind::Svg => imports.svg_template(ctx),
                        },
                        NONE,
                        ArenaVec::from_value_in(t.statics.into(), ctx),
                        false,
                        ctx,
                    ))
                };
                let statics =
                    if oveo { oveo_intrinsic(statics, imports.dedupe(ctx), ctx) } else { statics };

                let mut arguments = ArenaVec::with_capacity_in(6, ctx);
                arguments.push(statics.into());
                arguments.push(
                    Expression::NumericLiteral(NumericLiteral::boxed(
                        SPAN,
                        t.flags as f64,
                        None,
                        NumberBase::Decimal,
                        ctx,
                    ))
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
                    strings.extend(t.strings);
                }
                let template_descriptor = Expression::CallExpression(CallExpression::boxed(
                    SPAN,
                    imports.template_descriptor(ctx),
                    NONE,
                    arguments,
                    false,
                    ctx,
                ));
                let v = Declaration::VariableDeclaration(VariableDeclaration::boxed(
                    SPAN,
                    VariableDeclarationKind::Const,
                    ArenaVec::from_value_in(
                        VariableDeclarator::new(
                            SPAN,
                            VariableDeclarationKind::Const,
                            BindingPattern::BindingIdentifier(BindingIdentifier::boxed(
                                SPAN, uid.name, ctx,
                            )),
                            NONE,
                            Some(if dedupe_strings {
                                Expression::CallExpression(CallExpression::boxed(
                                    SPAN,
                                    Expression::Identifier(IdentifierReference::boxed(
                                        SPAN,
                                        Str::from_str_in("__IVI_TPL__", ctx),
                                        ctx,
                                    )),
                                    NONE,
                                    ArenaVec::from_array_in([template_descriptor.into()], ctx),
                                    false,
                                    ctx,
                                ))
                            } else {
                                template_descriptor
                            }),
                            false,
                            ctx,
                        ),
                        ctx,
                    ),
                    false,
                    ctx,
                ));
                decl.push(v.into());

                // _t(_TPL_, [expressions])
                let call_expressions = if t.expressions.is_empty() {
                    ArenaVec::from_array_in([uid.create_read_expression(ctx).into()], ctx)
                } else {
                    ArenaVec::from_array_in(
                        [
                            uid.create_read_expression(ctx).into(),
                            Expression::ArrayExpression(ArrayExpression::boxed(
                                SPAN,
                                ArenaVec::from_iter_in(
                                    t.expressions
                                        .iter()
                                        .map(|i| tpl.expressions[*i].take_in(ctx).into()),
                                    ctx,
                                ),
                                ctx,
                            ))
                            .into(),
                        ],
                        ctx,
                    )
                };
                let call = Expression::CallExpression(CallExpression::boxed(
                    SPAN,
                    imports.create_from_template(ctx),
                    NONE,
                    call_expressions,
                    false,
                    ctx,
                ));
                exprs.push(call);
            }
            TemplateNode::Text(text) => {
                exprs.push(Expression::StringLiteral(StringLiteral::boxed(
                    SPAN,
                    Str::from_str_in(&text, ctx),
                    None,
                    ctx,
                )));
            }
            TemplateNode::Expr(i) => {
                exprs.push(tpl.expressions[i].take_in(ctx));
            }
        }
    }

    let expr = if exprs.len() > 1 {
        Expression::ArrayExpression(ArrayExpression::boxed(
            SPAN,
            ArenaVec::from_iter_in(exprs.into_iter().map(|e| e.into()), ctx),
            ctx,
        ))
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
        let expr = Expression::ArrayExpression(ArrayExpression::boxed(
            SPAN,
            ArenaVec::from_iter_in(
                op_codes.iter().map(|o| {
                    Expression::NumericLiteral(NumericLiteral::boxed(
                        SPAN,
                        *o as f64,
                        None,
                        NumberBase::Decimal,
                        ctx,
                    ))
                    .into()
                }),
                ctx,
            ),
            ctx,
        ));
        if oveo { oveo_intrinsic(expr, imports.dedupe(ctx), ctx) } else { expr }
    }
}

fn strings_into_expression<'a>(
    strings: &IndexSet<String>,
    ctx: &mut TraverseCtx<'a>,
) -> Expression<'a> {
    Expression::ArrayExpression(ArrayExpression::boxed(
        SPAN,
        ArenaVec::from_iter_in(
            strings.iter().map(|s| {
                Expression::StringLiteral(StringLiteral::boxed(
                    SPAN,
                    Str::from_str_in(s, ctx),
                    None,
                    ctx,
                ))
                .into()
            }),
            ctx,
        ),
        ctx,
    ))
}

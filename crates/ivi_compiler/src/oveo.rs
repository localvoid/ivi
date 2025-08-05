use oxc_ast::{NONE, ast::Expression};
use oxc_span::SPAN;

use crate::context::TraverseCtx;

// annotation(expr)
pub fn oveo_intrinsic<'a>(
    expr: Expression<'a>,
    callee: Expression<'a>,
    ctx: &mut TraverseCtx<'a>,
) -> Expression<'a> {
    ctx.ast.expression_call(SPAN, callee, NONE, ctx.ast.vec_from_array([expr.into()]), false)
}

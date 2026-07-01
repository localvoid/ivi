use oxc_allocator::Vec as ArenaVec;
use oxc_ast::{
    NONE,
    ast::{CallExpression, Expression},
};
use oxc_span::SPAN;

use crate::context::TraverseCtx;

// annotation(expr)
pub fn oveo_intrinsic<'a>(
    expr: Expression<'a>,
    callee: Expression<'a>,
    ctx: &mut TraverseCtx<'a>,
) -> Expression<'a> {
    Expression::CallExpression(CallExpression::boxed(
        SPAN,
        callee,
        NONE,
        ArenaVec::from_array_in([expr.into()], ctx),
        false,
        ctx,
    ))
}

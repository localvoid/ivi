use oxc_allocator::{Allocator, Vec as ArenaVec};
use oxc_ast::ast::*;
use oxc_semantic::Scoping;
use oxc_span::SPAN;
use oxc_traverse::{Traverse, traverse_mut};
use rustc_hash::FxHashMap;

use crate::{
    context::{TraverseCtx, TraverseCtxState},
    tpl::opcodes::prop_op,
};

pub fn compile_chunk<'a>(
    program: &mut Program<'a>,
    allocator: &'a Allocator,
    scoping: Scoping,
    strings: &FxHashMap<String, u8>,
) {
    let mut t = ChunkCompiler::new(strings);
    traverse_mut(&mut t, allocator, program, scoping, TraverseCtxState::default());
}

struct ChunkCompiler<'ctx> {
    strings: &'ctx FxHashMap<String, u8>,
}

impl<'ctx> ChunkCompiler<'ctx> {
    pub fn new(strings: &'ctx FxHashMap<String, u8>) -> Self {
        Self { strings }
    }
}

impl<'a> Traverse<'a, TraverseCtxState<'a>> for ChunkCompiler<'_> {
    fn exit_expression(&mut self, node: &mut Expression<'a>, ctx: &mut TraverseCtx<'a>) {
        if let Expression::SequenceExpression(expr) = node {
            if expr.expressions.len() == 3 && expr.expressions[0].is_void_0() {
                if let Expression::StringLiteral(s) = &expr.expressions[1] {
                    match s.value.as_str() {
                        "@ivi.strings" => {
                            let mut indexed: Vec<_> = self.strings.iter().collect();
                            indexed.sort_by_key(|e| e.1);

                            let mut strings = ctx.ast.vec_with_capacity(self.strings.len());
                            for (s, _) in indexed {
                                strings.push(ArrayExpressionElement::StringLiteral(
                                    ctx.ast.alloc_string_literal(SPAN, ctx.ast.atom(s), None),
                                ));
                            }
                            *node = ctx.ast.expression_array(SPAN, strings);
                        }
                        "@ivi.tpl" => {
                            if let Some(mut expr) = expr.expressions.pop() {
                                if let Expression::CallExpression(call) = &mut expr {
                                    if call.arguments.len() > 5 {
                                        if let Some(Argument::ArrayExpression(tpl_strings)) =
                                            call.arguments.pop()
                                        {
                                            let prop_op_codes = &mut call.arguments[2];
                                            update_prop_op_codes(
                                                prop_op_codes.as_expression_mut().unwrap(),
                                                &tpl_strings.elements,
                                                self.strings,
                                            );
                                        }
                                    }
                                }
                                *node = expr;
                            }
                        }
                        _ => {}
                    }
                }
            }
        }
    }
}

fn update_prop_op_codes<'a>(
    expr: &mut Expression,
    tpl_strings: &ArenaVec<'a, ArrayExpressionElement<'a>>,
    strings: &FxHashMap<String, u8>,
) {
    match expr {
        // dedupe(op_codes)
        Expression::CallExpression(c) => {
            if let Some(e) = c.arguments.get_mut(0).and_then(|a| a.as_expression_mut()) {
                update_prop_op_codes(e, tpl_strings, strings);
            }
        }
        Expression::ArrayExpression(a) => {
            for el in &mut a.elements {
                if let Some(Expression::NumericLiteral(op)) = el.as_expression_mut() {
                    let v = op.value as u32;
                    let ty = v & prop_op::TYPE_MASK;
                    if ty != prop_op::SET_NODE && ty != prop_op::COMMON && ty != prop_op::DIRECTIVE
                    {
                        let i = v >> prop_op::DATA_SHIFT;
                        let s = &tpl_strings[i as usize];
                        if let ArrayExpressionElement::StringLiteral(s) = s {
                            if let Some(new_index) = strings.get(s.value.as_str()) {
                                op.value = ((v & ((1 << prop_op::DATA_SHIFT) - 1))
                                    | ((*new_index as u32) << prop_op::DATA_SHIFT))
                                    as f64;
                            }
                        }
                    }
                }
            }
        }
        _ => {}
    }
}

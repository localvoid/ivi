use indexmap::IndexSet;
use oxc_allocator::{TakeIn, Vec as ArenaVec};
use oxc_ast::{
    AstBuilder,
    ast::{Expression, TemplateElement, TemplateElementValue},
};
use oxc_span::SPAN;

use crate::{
    context::TraverseCtx,
    import::ImportSymbols,
    oveo::oveo_intrinsic,
    tpl::{
        TemplateKind,
        html::is_html_void_element,
        opcodes::{child_op, common_prop_type, prop_op, state_op, template_flags},
        parser::{
            TElement, TNode, TNodeKind, TProperty, TPropertyAttributeValue, TPropertyStyleValue,
        },
    },
};

pub enum TemplateNode<'a> {
    Block(TemplateBlock<'a>),
    Text(String),
    Expr(usize),
}

pub struct TemplateBlock<'a> {
    pub statics: Expression<'a>,
    pub flags: u32,
    pub props_op_codes: Vec<u32>,
    pub child_op_codes: Vec<u32>,
    pub state_op_codes: Vec<u32>,
    pub strings: IndexSet<String>,
    pub expressions: Vec<usize>,
}

pub fn emit_root_element<'a>(
    node: &TNode,
    kind: TemplateKind,
    expressions: &mut ArenaVec<'a, Expression<'a>>,
    ctx: &mut TraverseCtx<'a>,
    imports: &mut ImportSymbols<'a>,
    oveo: bool,
) -> TemplateNode<'a> {
    match &node.kind {
        TNodeKind::Element(e) => {
            let statics = emit_static_template(e, expressions, &mut ctx.ast);

            let expr_map = create_expr_map(e, ctx, expressions, imports, oveo);

            let state_op_codes = emit_state_op_codes(e);
            let (props_op_codes, strings) = emit_props_op_codes(node, &expr_map);
            let child_op_codes = emit_child_op_codes(node, &expr_map);

            let state_slots = count_state_slots(&state_op_codes);
            let child_slots = count_child_slots(&child_op_codes);

            let mut flags = state_slots | (child_slots << template_flags::CHILDREN_SIZE_SHIFT);
            if let TemplateKind::Svg = kind {
                flags |= template_flags::SVG;
            }
            TemplateNode::Block(TemplateBlock {
                statics,
                flags,
                props_op_codes,
                child_op_codes,
                state_op_codes,
                strings,
                expressions: expr_map.iter().copied().collect(),
            })
        }
        TNodeKind::Text(t) => TemplateNode::Text(t.value.clone()),
        TNodeKind::Expr(e) => TemplateNode::Expr(e.index.inner()),
    }
}

fn count_state_slots(op_codes: &[u32]) -> u32 {
    let mut count = 1;
    for op in op_codes {
        if *op & state_op::SAVE != 0
            || (*op & state_op::ENTER_OR_REMOVE != 0 && (op >> state_op::OFFSET_SHIFT) == 0)
        {
            count += 1
        }
    }
    count
}

fn count_child_slots(op_codes: &[u32]) -> u32 {
    let mut count = 0;
    for op in op_codes {
        if op & child_op::TYPE == child_op::CHILD {
            count += 1;
        }
    }
    count
}

fn create_expr_map<'a>(
    root: &TElement,
    ctx: &mut TraverseCtx<'a>,
    expressions: &mut ArenaVec<'a, Expression<'a>>,
    imports: &mut ImportSymbols<'a>,
    oveo: bool,
) -> IndexSet<usize> {
    let mut map = IndexSet::default();
    _create_expr_map(&mut map, root, ctx, expressions, imports, oveo);
    map
}

fn _create_expr_map<'a>(
    map: &mut IndexSet<usize>,
    node: &TElement,
    ctx: &mut TraverseCtx<'a>,
    expressions: &mut ArenaVec<'a, Expression<'a>>,
    imports: &mut ImportSymbols<'a>,
    oveo: bool,
) {
    for p in &node.properties {
        match p {
            TProperty::Attribute(p) => {
                if let TPropertyAttributeValue::Expr(v) = &p.value
                    && !v.hoist
                {
                    map.insert(v.index.inner());
                }
            }
            TProperty::Value(p) => {
                map.insert(p.value.inner());
            }
            TProperty::DOMValue(p) => {
                map.insert(p.value.inner());
            }
            TProperty::Style(p) => {
                if let TPropertyStyleValue::Expr(v) = &p.value {
                    map.insert(v.inner());
                }
            }
            TProperty::Event(p) => {
                let i = p.value.inner();
                if oveo {
                    expressions[i] = oveo_intrinsic(
                        expressions[i].take_in(ctx.ast.allocator),
                        imports.hoist(ctx),
                        ctx,
                    );
                }
                map.insert(i);
            }
            TProperty::Directive(p) => {
                map.insert(p.inner());
            }
        }
    }

    for c in &node.children {
        match &c.kind {
            TNodeKind::Element(e) => {
                _create_expr_map(map, e, ctx, expressions, imports, oveo);
            }
            TNodeKind::Expr(e) => {
                map.insert(e.index.inner());
            }
            _ => {}
        }
    }
}

fn emit_static_template<'a>(
    node: &TElement,
    template_expressions: &mut ArenaVec<'a, Expression<'a>>,
    ast: &mut AstBuilder<'a>,
) -> Expression<'a> {
    let mut static_part = String::new();
    let mut quasis = ast.vec();
    let mut expressions = ast.vec();
    // Node doesn't have any children elements/texts or static properties
    let mut is_simple_node = true;
    _emit_static_template(
        &mut is_simple_node,
        node,
        &mut static_part,
        &mut quasis,
        &mut expressions,
        template_expressions,
        ast,
    );

    if is_simple_node {
        ast.expression_string_literal(SPAN, ast.atom(&node.tag), None)
    } else {
        quasis.push(ast.template_element(
            SPAN,
            TemplateElementValue { raw: ast.atom(&static_part), cooked: None },
            true,
        ));

        ast.expression_template_literal(SPAN, quasis, expressions)
    }
}

fn _emit_static_template<'a>(
    is_simple_node: &mut bool,
    node: &TElement,
    static_part: &mut String,
    quasis: &mut ArenaVec<'a, TemplateElement<'a>>,
    expressions: &mut ArenaVec<'a, Expression<'a>>,
    template_expressions: &mut ArenaVec<'a, Expression<'a>>,
    ast: &mut AstBuilder<'a>,
) {
    static_part.push('<');
    static_part.push_str(&node.tag);

    let mut style = String::new();
    for p in &node.properties {
        match p {
            TProperty::Attribute(p) => match &p.value {
                TPropertyAttributeValue::String(v) => {
                    if p.key == "style" {
                        if style.is_empty() {
                            style = v.clone();
                        } else {
                            style.push(';');
                            style.push_str(v);
                        }
                    } else {
                        *is_simple_node = false;
                        static_part.push(' ');
                        static_part.push_str(&p.key);
                        static_part.push_str("=\"");
                        static_part.push_str(v);
                        static_part.push('"');
                    }
                }
                TPropertyAttributeValue::Bool => {
                    *is_simple_node = false;
                    static_part.push(' ');
                    static_part.push_str(&p.key);
                }
                TPropertyAttributeValue::Expr(v) => {
                    if v.hoist {
                        *is_simple_node = false;
                        static_part.push(' ');
                        static_part.push_str(&p.key);
                        static_part.push_str("=\"");
                        quasis.push(ast.template_element(
                            SPAN,
                            TemplateElementValue { raw: ast.atom(static_part), cooked: None },
                            false,
                        ));
                        expressions
                            .push(template_expressions[v.index.inner()].take_in(ast.allocator));
                        static_part.clear();
                        static_part.push('"');
                    }
                }
            },
            TProperty::Style(p) => {
                if let TPropertyStyleValue::String(v) = &p.value {
                    if style.is_empty() {
                        style = v.clone();
                    } else {
                        style.push(';');
                        style.push_str(v);
                    }
                }
            }
            _ => {}
        }
    }
    if !style.is_empty() {
        *is_simple_node = false;
        static_part.push_str(" style=\"");
        static_part.push_str(&style);
        static_part.push('"');
    }
    static_part.push('>');
    if is_html_void_element(&node.tag) {
        return;
    }

    let mut siblings_state = 0;
    for c in &node.children {
        match &c.kind {
            TNodeKind::Element(c) => {
                *is_simple_node = false;
                _emit_static_template(
                    is_simple_node,
                    c,
                    static_part,
                    quasis,
                    expressions,
                    template_expressions,
                    ast,
                );
                siblings_state = 0;
            }
            TNodeKind::Text(n) => {
                *is_simple_node = false;
                if (siblings_state & 3) == 3 {
                    static_part.push_str("<!>");
                }
                siblings_state = 1;
                static_part.push_str(&n.value);
            }
            TNodeKind::Expr(_) => {
                siblings_state |= 2;
            }
        }
    }

    static_part.push_str("</");
    static_part.push_str(&node.tag);
    static_part.push('>');
}

fn emit_props_op_codes(node: &TNode, expr_map: &IndexSet<usize>) -> (Vec<u32>, IndexSet<String>) {
    let mut op_codes = Vec::new();
    let mut strings = IndexSet::new();
    _emit_props_op_codes(&mut op_codes, node, true, &mut strings, expr_map);
    (op_codes, strings)
}
fn _emit_props_op_codes(
    op_codes: &mut Vec<u32>,
    node: &TNode,
    is_root: bool,
    strings: &mut IndexSet<String>,
    expr_map: &IndexSet<usize>,
) {
    fn string_index(strings: &mut IndexSet<String>, key: &str) -> u32 {
        if let Some((i, _)) = strings.get_full(key) {
            i as u32
        } else {
            let (i, _) = strings.insert_full(key.to_string());
            i as u32
        }
    }
    if let TNodeKind::Element(e) = &node.kind {
        if !is_root && node.flags & TNode::HAS_PROPS_EXPRESSIONS != 0 {
            op_codes.push(prop_op::SET_NODE | ((node.state_index as u32) << prop_op::DATA_SHIFT));
        }
        for p in &e.properties {
            match p {
                TProperty::Attribute(p) => {
                    if let TPropertyAttributeValue::Expr(expr) = &p.value {
                        if let Some(i) = expr_map.get_index_of(&expr.index.inner()) {
                            if p.key == "class" {
                                op_codes.push(
                                    prop_op::COMMON
                                        | (common_prop_type::CLASS_NAME << prop_op::DATA_SHIFT)
                                        | ((i as u32) << prop_op::INPUT_SHIFT),
                                );
                            } else {
                                op_codes.push(
                                    prop_op::ATTRIBUTE
                                        | (string_index(strings, &p.key) << prop_op::DATA_SHIFT)
                                        | ((i as u32) << prop_op::INPUT_SHIFT),
                                );
                            }
                        }
                    }
                }
                TProperty::Value(p) => {
                    match p.key.as_str() {
                        "textContent" => {
                            op_codes.push(
                                prop_op::COMMON
                                    | (common_prop_type::TEXT_CONTENT << prop_op::DATA_SHIFT)
                                    | ((p.value.inner() as u32) << prop_op::INPUT_SHIFT),
                            );
                        }
                        "innerHTML" => {
                            op_codes.push(
                                prop_op::COMMON
                                    | (common_prop_type::INNER_HTML << prop_op::DATA_SHIFT)
                                    | ((p.value.inner() as u32) << prop_op::INPUT_SHIFT),
                            );
                        }
                        _ => {
                            if let Some(i) = expr_map.get_index_of(&p.value.inner()) {
                                op_codes.push(
                                    prop_op::PROPERTY
                                        | (string_index(strings, &p.key) << prop_op::DATA_SHIFT)
                                        | ((i as u32) << prop_op::INPUT_SHIFT),
                                );
                            }
                        }
                    };
                }
                TProperty::DOMValue(p) => {
                    match p.key.as_str() {
                        "textContent" => {
                            op_codes.push(
                                prop_op::COMMON
                                    | (common_prop_type::TEXT_CONTENT << prop_op::DATA_SHIFT)
                                    | ((p.value.inner() as u32) << prop_op::INPUT_SHIFT),
                            );
                        }
                        "innerHTML" => {
                            op_codes.push(
                                prop_op::COMMON
                                    | (common_prop_type::INNER_HTML << prop_op::DATA_SHIFT)
                                    | ((p.value.inner() as u32) << prop_op::INPUT_SHIFT),
                            );
                        }
                        _ => {
                            if let Some(i) = expr_map.get_index_of(&p.value.inner()) {
                                op_codes.push(
                                    prop_op::DIFF_DOM_PROPERTY
                                        | (string_index(strings, &p.key) << prop_op::DATA_SHIFT)
                                        | ((i as u32) << prop_op::INPUT_SHIFT),
                                );
                            }
                        }
                    };
                }
                TProperty::Style(p) => {
                    if let TPropertyStyleValue::Expr(expr_index) = &p.value {
                        if let Some(i) = expr_map.get_index_of(&expr_index.inner()) {
                            op_codes.push(
                                prop_op::STYLE
                                    | (string_index(strings, &p.key) << prop_op::DATA_SHIFT)
                                    | ((i as u32) << prop_op::INPUT_SHIFT),
                            );
                        }
                    }
                }
                TProperty::Event(p) => {
                    if let Some(i) = expr_map.get_index_of(&p.value.inner()) {
                        op_codes.push(
                            prop_op::EVENT
                                | (string_index(strings, &p.key) << prop_op::DATA_SHIFT)
                                | ((i as u32) << prop_op::INPUT_SHIFT),
                        );
                    }
                }
                TProperty::Directive(p) => {
                    if let Some(i) = expr_map.get_index_of(&p.inner()) {
                        op_codes.push(prop_op::DIRECTIVE | ((i as u32) << prop_op::INPUT_SHIFT));
                    }
                }
            }
        }

        for c in &e.children {
            _emit_props_op_codes(op_codes, c, false, strings, expr_map);
        }
    }
}

fn emit_state_op_codes(node: &TElement) -> Vec<u32> {
    let mut op_codes = Vec::new();
    _emit_state_op_codes(&mut op_codes, node);
    op_codes
}

fn _emit_state_op_codes(op_codes: &mut Vec<u32>, node: &TElement) {
    mod state_flags {
        pub const PREV_TEXT: u32 = 1;
        pub const PREV_EXPR: u32 = 1 << 1;
    }
    let mut state = 0;
    'outer: for c in &node.children {
        match &c.kind {
            TNodeKind::Element(e) => {
                let mut op = 0;
                if state & state_flags::PREV_EXPR != 0 || c.flags & TNode::HAS_EXPRESSIONS != 0 {
                    op = state_op::SAVE;
                }

                let current_op_index = op_codes.len();
                op_codes.push(op);

                if c.flags & TNode::HAS_EXPRESSIONS != 0 {
                    _emit_state_op_codes(op_codes, e);
                    let children_offset = op_codes.len() - (current_op_index + 1);
                    if children_offset > 0 {
                        op |= state_op::ENTER_OR_REMOVE
                            | ((children_offset as u32) << state_op::OFFSET_SHIFT);
                        op_codes[current_op_index] = op;
                    }
                }
                if c.flags & (TNode::HAS_NEXT_EXPRESSION | TNode::HAS_NEXT_DOM_NODE)
                    != (TNode::HAS_NEXT_EXPRESSION | TNode::HAS_NEXT_DOM_NODE)
                {
                    if op == 0 {
                        op_codes.pop();
                    }
                    break 'outer;
                }
                state = 0;
            }
            TNodeKind::Text(_) => {
                if state & (state_flags::PREV_TEXT | state_flags::PREV_EXPR)
                    == (state_flags::PREV_TEXT | state_flags::PREV_EXPR)
                {
                    op_codes.push(state_op::ENTER_OR_REMOVE);
                } else if state & state_flags::PREV_EXPR != 0 {
                    op_codes.push(state_op::SAVE);
                } else if c.flags & (TNode::HAS_NEXT_EXPRESSION | TNode::HAS_NEXT_DOM_NODE)
                    != (TNode::HAS_NEXT_EXPRESSION | TNode::HAS_NEXT_DOM_NODE)
                {
                    break 'outer;
                } else {
                    op_codes.push(0);
                }
                state = state_flags::PREV_TEXT;
            }
            TNodeKind::Expr(_) => {
                state |= state_flags::PREV_EXPR;
            }
        }
    }
}

fn emit_child_op_codes(node: &TNode, expr_map: &IndexSet<usize>) -> Vec<u32> {
    let mut op_codes = Vec::new();
    _emit_child_op_codes(&mut op_codes, node, true, expr_map);
    op_codes
}

fn _emit_child_op_codes(
    op_codes: &mut Vec<u32>,
    node: &TNode,
    is_root: bool,
    expr_map: &IndexSet<usize>,
) {
    if let TNodeKind::Element(e) = &node.kind {
        if node.flags & TNode::HAS_CHILDREN_EXPRESSIONS > 0 {
            if !is_root {
                op_codes.push(
                    child_op::SET_PARENT | ((node.state_index as u32) << child_op::VALUE_SHIFT),
                );
            }
            let mut prev_state_index = None;
            let mut prev_expr = false;
            for c in e.children.iter().rev() {
                if let TNodeKind::Expr(expr_index) = &c.kind {
                    if let Some(prev_state_index) = prev_state_index
                        && !prev_expr
                    {
                        op_codes.push(
                            child_op::SET_NEXT
                                | ((prev_state_index as u32) << child_op::VALUE_SHIFT),
                        );
                    }
                    op_codes.push(
                        child_op::CHILD
                            | (expr_map.get_index_of(&expr_index.index.inner()).unwrap() as u32)
                                << child_op::VALUE_SHIFT,
                    );
                    prev_expr = true;
                } else {
                    prev_expr = false;
                    prev_state_index = Some(node.state_index);
                }
            }
        }
        for c in e.children.iter().rev() {
            _emit_child_op_codes(op_codes, c, false, expr_map);
        }
    }
}

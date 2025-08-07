use oxc_ast::ast::{Expression, TemplateElement, TemplateLiteral};
use oxc_diagnostics::OxcDiagnostic;
use oxc_semantic::Scoping;

use crate::tpl::html::is_html_void_element;

#[derive(Clone, Copy)]
pub struct ExprIndex(usize);

impl ExprIndex {
    pub fn inner(self) -> usize {
        self.0
    }
}

pub struct THoistableExpr {
    pub index: ExprIndex,
    pub hoist: bool,
}

pub struct TNode {
    pub kind: TNodeKind,
    pub flags: u8,
    pub state_index: u16,
    pub children_exprs: u16,
    pub props_exprs: u16,
}

pub enum TNodeKind {
    Element(TElement),
    Text(TText),
    Expr(TExpr),
}

impl TNode {
    pub const HAS_EXPRESSIONS: u8 = 1;
    pub const HAS_NEXT_EXPRESSION: u8 = 1 << 1;
    pub const HAS_NEXT_DOM_NODE: u8 = 1 << 2;

    fn new(kind: TNodeKind) -> Self {
        Self { kind, flags: 0, state_index: 0, children_exprs: 0, props_exprs: 0 }
    }

    fn text(text: &str) -> Self {
        Self {
            kind: TNodeKind::Text(TText { value: text.to_string() }),
            flags: 0,
            state_index: 0,
            children_exprs: 0,
            props_exprs: 0,
        }
    }

    fn space_text() -> Self {
        Self::text(" ")
    }
}

pub struct TElement {
    pub tag: String,
    pub properties: Vec<TProperty>,
    pub children: Vec<TNode>,
    pub void: bool,
}

pub struct TText {
    pub value: String,
}

pub struct TExpr {
    pub index: ExprIndex,
}

pub enum TProperty {
    Attribute(TPropertyAttribute),
    Value(TPropertyValue),
    DOMValue(TPropertyDOMValue),
    Style(TPropertyStyle),
    Event(TPropertyEvent),
    Directive(ExprIndex),
}

pub struct TPropertyAttribute {
    pub key: String,
    pub value: TPropertyAttributeValue,
}

pub enum TPropertyAttributeValue {
    String(String),
    Bool,
    Expr(THoistableExpr),
}

pub struct TPropertyValue {
    pub key: String,
    pub value: ExprIndex,
}

pub struct TPropertyDOMValue {
    pub key: String,
    pub value: ExprIndex,
}

pub struct TPropertyStyle {
    pub key: String,
    pub value: TPropertyStyleValue,
}

pub enum TPropertyStyleValue {
    String(String),
    Expr(ExprIndex),
}

pub struct TPropertyEvent {
    pub key: String,
    pub value: ExprIndex,
}

pub fn parse_template<'a>(
    tpl: &'a TemplateLiteral,
    scoping: &'a Scoping,
) -> Result<Vec<TNode>, OxcDiagnostic> {
    let mut parser = Parser::new(scoping, &tpl.quasis, &tpl.expressions);
    let mut nodes = parser.parse_children_list()?;
    for n in &mut nodes {
        update_flags(n);
        assign_state_slots(n);
    }
    Ok(nodes)
}

#[derive(Debug, Clone)]
struct Parser<'a> {
    scoping: &'a Scoping,
    quasis: &'a [TemplateElement<'a>],
    expressions: &'a [Expression<'a>],
    text: &'a str,
    expr_cursor: usize,
}

impl<'a> Parser<'a> {
    fn new(
        scoping: &'a Scoping,
        quasis: &'a [TemplateElement<'a>],
        expressions: &'a [Expression<'a>],
    ) -> Self {
        Self {
            scoping,
            quasis,
            expressions,
            text: quasis[0].value.cooked.unwrap().as_str(),
            expr_cursor: 0,
        }
    }

    fn current_element(&self) -> &TemplateElement<'a> {
        &self.quasis[self.expr_cursor]
    }

    fn is_end(&self) -> bool {
        self.text.is_empty() && self.expr_cursor == self.expressions.len()
    }

    fn peek_char(&self) -> Option<char> {
        self.text.chars().next()
    }

    fn peek_nth_char(&self, n: usize) -> Option<char> {
        self.text.chars().nth(n)
    }

    fn try_consume_char(&mut self, expected: char) -> Option<char> {
        if let Some(c) = self.text.chars().next()
            && c == expected
        {
            self.text = &self.text[expected.len_utf8()..];
            Some(expected)
        } else {
            None
        }
    }

    fn consume_char(&mut self, expected: char) -> Result<(), OxcDiagnostic> {
        if let Some(c) = self.text.chars().next()
            && c == expected
        {
            self.text = &self.text[expected.len_utf8()..];
            Ok(())
        } else {
            let parts = self.text.split_at(self.text.len().min(10));
            Err(OxcDiagnostic::error(format!("Expected a '{expected}' char: {}", parts.0))
                .with_label(self.current_element().span))
        }
    }

    fn advance(&mut self, i: usize) {
        self.text = &self.text[i..];
    }

    fn consume_expr(&mut self) -> Result<usize, OxcDiagnostic> {
        if self.text.is_empty() && (self.expr_cursor) < self.expressions.len() {
            let i = self.expr_cursor;
            self.expr_cursor += 1;
            self.text = self.current_element().value.cooked.unwrap().as_str();
            Ok(i)
        } else {
            Err(OxcDiagnostic::error("Expected an expression")
                .with_label(self.current_element().span))
        }
    }

    fn consume_whitespace(&mut self) -> WhitespaceState {
        let mut state = 0;
        let mut len = self.text.len();
        for (i, c) in self.text.char_indices() {
            match c {
                ' ' | '\t' => {
                    state |= WhitespaceState::WHITESPACE;
                }
                '\n' | '\r' => {
                    state |= WhitespaceState::WHITESPACE | WhitespaceState::CONTAINS_NEWLINE;
                }
                '\x0b' => {
                    state |= WhitespaceState::WHITESPACE | WhitespaceState::CONTAINS_VERTICAL_TAB;
                }
                _ => {
                    len = i;
                    break;
                }
            }
        }
        if len == 0 {
            WhitespaceState(0)
        } else {
            self.advance(len);
            WhitespaceState(state)
        }
    }

    fn parse_tag_name(&mut self) -> Result<String, OxcDiagnostic> {
        let mut len = self.text.len();
        for (i, c) in self.text.char_indices() {
            match c {
                '0'..='9' | 'a'..='z' | 'A'..='Z' | '_' => {}
                '-' => {
                    if i == 0 {
                        len = 0;
                        break;
                    }
                }
                _ => {
                    len = i;
                    break;
                }
            }
        }
        if len > 0 {
            let id = self.text[..len].to_string();
            self.advance(len);
            Ok(id)
        } else {
            let parts = self.text.split_at(self.text.len().min(10));
            Err(OxcDiagnostic::error(format!("Invalid tag name: {}", parts.0))
                .with_label(self.current_element().span))
        }
    }

    fn parse_attribute_name(&mut self) -> Result<String, OxcDiagnostic> {
        let mut len = self.text.len();
        for (i, c) in self.text.char_indices() {
            match c {
                '0'..='9' | 'a'..='z' | 'A'..='Z' | '_' => {}
                '-' => {
                    if i == 0 {
                        len = 0;
                        break;
                    }
                }
                _ => {
                    len = i;
                    break;
                }
            }
        }
        if len > 0 {
            let id = self.text[..len].to_string();
            self.advance(len);
            Ok(id)
        } else {
            let parts = self.text.split_at(self.text.len().min(10));
            Err(OxcDiagnostic::error(format!("Invalid attribute name: {}", parts.0))
                .with_label(self.current_element().span))
        }
    }

    fn parse_js_property(&mut self) -> Result<String, OxcDiagnostic> {
        let mut len = self.text.len();
        for (i, c) in self.text.char_indices() {
            match c {
                '0'..='9' | 'a'..='z' | 'A'..='Z' | '_' | '$' => {}
                _ => {
                    len = i;
                    break;
                }
            }
        }
        if len > 0 {
            let id = self.text[..len].to_string();
            self.advance(len);
            Ok(id)
        } else {
            let parts = self.text.split_at(self.text.len().min(10));
            Err(OxcDiagnostic::error(format!("Invalid property name: {}", parts.0))
                .with_label(self.current_element().span))
        }
    }

    fn parse_style_name(&mut self) -> Result<String, OxcDiagnostic> {
        let mut len = self.text.len();
        for (i, c) in self.text.char_indices() {
            match c {
                '0'..='9' | 'a'..='z' | 'A'..='Z' | '-' | '_' => {}
                _ => {
                    len = i;
                    break;
                }
            }
        }
        if len > 0 {
            let id = self.text[..len].to_string();
            self.advance(len);
            Ok(id)
        } else {
            let parts = self.text.split_at(self.text.len().min(10));
            Err(OxcDiagnostic::error(format!("Invalid style name: {}", parts.0))
                .with_label(self.current_element().span))
        }
    }

    fn parse_children_list(&mut self) -> Result<Vec<TNode>, OxcDiagnostic> {
        let mut children = Vec::new();
        let mut whitespace_state = self.consume_whitespace();
        while !self.is_end() {
            if let Some(c) = self.peek_char() {
                if c == '<' {
                    if whitespace_state.should_insert_whitespace() {
                        children.push(TNode::space_text());
                    }
                    if let Some('/') = self.peek_nth_char(1) {
                        break;
                    }
                    children.push(TNode::new(TNodeKind::Element(self.parse_element()?)));
                } else {
                    children.push(TNode::new(TNodeKind::Text(self.parse_text(whitespace_state)?)));
                }
            } else {
                let index = self.consume_expr()?;
                if whitespace_state.should_insert_whitespace() {
                    children.push(TNode::space_text());
                }
                children.push(TNode::new(TNodeKind::Expr(TExpr { index: ExprIndex(index) })));
            }

            whitespace_state = self.consume_whitespace();
        }
        Ok(children)
    }

    fn parse_element(&mut self) -> Result<TElement, OxcDiagnostic> {
        self.advance(1);
        let tag = self.parse_tag_name()?;
        self.consume_whitespace();
        let properties = self.parse_attributes()?;

        let mut children = Vec::new();
        let mut void = false;
        if self.try_consume_char('/').is_some() {
            self.consume_char('>')?;
        } else {
            self.consume_char('>')?;

            if is_html_void_element(&tag) {
                void = true;
            } else {
                children = self.parse_children_list()?;
                self.consume_char('<')?;
                self.consume_char('/')?;
                self.advance(tag.len());
                self.consume_whitespace();
                self.consume_char('>')?;
            }
        }
        Ok(TElement { tag, properties, children, void })
    }

    fn parse_text(&mut self, whitespace_state: WhitespaceState) -> Result<TText, OxcDiagnostic> {
        let mut text = String::new();
        let mut len = self.text.len();
        let mut whitespace_state = whitespace_state;
        for (i, c) in self.text.char_indices() {
            match c {
                '<' => {
                    len = i;
                    break;
                }
                ' ' | '\t' => {
                    whitespace_state.0 |= WhitespaceState::WHITESPACE;
                    continue;
                }
                '\n' | '\r' => {
                    whitespace_state.0 |= WhitespaceState::CONTAINS_NEWLINE;
                    continue;
                }
                '\x0b' => {
                    whitespace_state.0 |= WhitespaceState::CONTAINS_VERTICAL_TAB;
                    continue;
                }
                _ => {}
            }
            if whitespace_state.0 & WhitespaceState::WHITESPACE != 0
                && (whitespace_state.0
                    & (WhitespaceState::TEXT_CONTENT | WhitespaceState::CONTAINS_VERTICAL_TAB)
                    != 0
                    || whitespace_state.0 & WhitespaceState::CONTAINS_NEWLINE == 0)
            {
                text.push(' ');
            }
            whitespace_state.0 = WhitespaceState::TEXT_CONTENT;
            text.push(c);
        }
        if whitespace_state.should_insert_whitespace() {
            text.push(' ');
        }
        self.advance(len);
        if text.len() <= (1 << 16) {
            Ok(TText { value: text })
        } else {
            // Text nodes are splitted into two nodes when they exceed their length limit (64k).
            // https://github.com/chromium/chromium/blob/91159249db3086f17b28b7a060f55ec0345c24c7/third_party/blink/renderer/core/dom/text.h#L42
            Err(OxcDiagnostic::error("Text is too long (>64Kb)")
                .with_label(self.current_element().span))
        }
    }

    fn parse_attributes(&mut self) -> Result<Vec<TProperty>, OxcDiagnostic> {
        let mut properties = Vec::new();

        while !self.is_end() {
            if let Some(c) = self.peek_char() {
                match c {
                    '/' | '>' => {
                        return Ok(properties);
                    }
                    '.' => {
                        self.advance(1);
                        let key = self.parse_js_property()?;
                        self.consume_char('=')?;
                        let expr_index = self.consume_expr()?;
                        properties.push(TProperty::Value(TPropertyValue {
                            key,
                            value: ExprIndex(expr_index),
                        }));
                    }
                    '*' => {
                        self.advance(1);
                        let key = self.parse_js_property()?;
                        self.consume_char('=')?;
                        let expr_index = self.consume_expr()?;
                        properties.push(TProperty::DOMValue(TPropertyDOMValue {
                            key,
                            value: ExprIndex(expr_index),
                        }));
                    }
                    '@' => {
                        self.advance(1);
                        let key = self.parse_js_property()?;
                        self.consume_char('=')?;
                        let expr_index = self.consume_expr()?;
                        properties.push(TProperty::Event(TPropertyEvent {
                            key,
                            value: ExprIndex(expr_index),
                        }));
                    }
                    '~' => {
                        self.advance(1);
                        let key = self.parse_style_name()?;
                        self.consume_char('=')?;
                        let value = if self.peek_char().is_some() {
                            TPropertyStyleValue::String(self.parse_attribute_string()?)
                        } else {
                            TPropertyStyleValue::Expr(ExprIndex(self.consume_expr()?))
                        };
                        properties.push(TProperty::Style(TPropertyStyle { key, value }));
                    }
                    _ => {
                        let key = self.parse_attribute_name()?;
                        let mut hoist = false;
                        let value;
                        if self.try_consume_char('=').is_some() {
                            if let Some('"') = self.peek_char() {
                                value =
                                    TPropertyAttributeValue::String(self.parse_attribute_string()?);
                            } else {
                                let expr_index = self.consume_expr()?;
                                if key == "class" {
                                    let expr = &self.expressions[expr_index];
                                    // Hoist symbols from the root scope
                                    if is_hoistable_expr(expr, self.scoping) {
                                        hoist = true;
                                    }
                                }
                                value = TPropertyAttributeValue::Expr(THoistableExpr {
                                    index: ExprIndex(expr_index),
                                    hoist,
                                });
                            }
                        } else {
                            value = TPropertyAttributeValue::Bool;
                        }
                        properties.push(TProperty::Attribute(TPropertyAttribute { key, value }));
                    }
                }
            } else {
                properties.push(TProperty::Directive(ExprIndex(self.consume_expr()?)))
            }
            self.consume_whitespace();
        }

        let parts = self.text.split_at(self.text.len().min(10));
        Err(OxcDiagnostic::error(format!("Expected a '>' char: {}", parts.0))
            .with_label(self.current_element().span))
    }

    fn parse_attribute_string(&mut self) -> Result<String, OxcDiagnostic> {
        let delim;
        let mut chars = self.text.char_indices();
        if let Some((_, c)) = chars.next() {
            match c {
                '\'' | '"' => {
                    delim = c;
                }
                _ => {
                    return Err(OxcDiagnostic::error(
                        "Invalid string value, it should start with '\"' char.",
                    )
                    .with_label(self.current_element().span));
                }
            }
            for (i, c) in chars {
                if c == delim {
                    let v = self.text[1..i].to_string();
                    self.advance(i + 1);
                    return Ok(v);
                }
            }
            Err(OxcDiagnostic::error("Invalid string value, it should end with '\"' char.")
                .with_label(self.current_element().span))
        } else {
            Err(OxcDiagnostic::error("Invalid string value")
                .with_label(self.current_element().span))
        }
    }
}

#[derive(Clone, Copy)]
struct WhitespaceState(u8);

impl WhitespaceState {
    const WHITESPACE: u8 = 1;
    const CONTAINS_NEWLINE: u8 = 1 << 1;
    const CONTAINS_VERTICAL_TAB: u8 = 1 << 2;
    const TEXT_CONTENT: u8 = 1 << 3;

    fn should_insert_whitespace(self) -> bool {
        self.0 & WhitespaceState::WHITESPACE != 0
            && (self.0 & WhitespaceState::CONTAINS_NEWLINE == 0
                || self.0 & WhitespaceState::CONTAINS_VERTICAL_TAB != 0)
    }
}

// RTL pass
fn update_flags(node: &mut TNode) {
    _update_flags(node, 0);
}
fn _update_flags(node: &mut TNode, flags: u8) -> u8 {
    let mut flags = flags;
    if let TNodeKind::Element(e) = &mut node.kind {
        let mut props_exprs = 0;
        for p in &e.properties {
            match p {
                TProperty::Attribute(p) => {
                    if let TPropertyAttributeValue::Expr(e) = &p.value
                        && !e.hoist
                    {
                        props_exprs += 1;
                        break;
                    }
                }
                TProperty::Style(p) => {
                    if let TPropertyStyleValue::Expr(_) = &p.value {
                        props_exprs += 1;
                        break;
                    }
                }
                TProperty::Value(_)
                | TProperty::DOMValue(_)
                | TProperty::Event(_)
                | TProperty::Directive(_) => {
                    props_exprs += 1;
                    break;
                }
            }
        }

        let mut siblings_flags = 0;
        let mut children_exprs = 0;
        for c in e.children.iter_mut().rev() {
            match &mut c.kind {
                TNodeKind::Element(_) => {
                    let f = _update_flags(c, siblings_flags);
                    if f & TNode::HAS_EXPRESSIONS != 0 {
                        flags |= TNode::HAS_EXPRESSIONS;
                        siblings_flags |= TNode::HAS_NEXT_EXPRESSION | TNode::HAS_NEXT_DOM_NODE;
                    } else {
                        siblings_flags |= TNode::HAS_NEXT_DOM_NODE;
                    }
                }
                TNodeKind::Text(_) => {
                    c.flags = siblings_flags;
                    siblings_flags |= TNode::HAS_NEXT_DOM_NODE;
                }
                TNodeKind::Expr(_) => {
                    siblings_flags |= TNode::HAS_NEXT_EXPRESSION;
                    c.flags = siblings_flags;
                    children_exprs += 1;
                }
            }
        }

        if props_exprs > 0 || children_exprs > 0 {
            flags |= TNode::HAS_EXPRESSIONS;
        }
        node.flags = flags;
        node.props_exprs = props_exprs;
        node.children_exprs = children_exprs;
    }
    flags
}

fn assign_state_slots(node: &mut TNode) {
    _assign_state_slots(node, 1);
}

fn _assign_state_slots(node: &mut TNode, mut state_index: u16) -> u16 {
    if let TNodeKind::Element(e) = &mut node.kind {
        let mut prev_expr = false;
        for c in &mut e.children {
            match c.kind {
                TNodeKind::Element(_) => {
                    if prev_expr {
                        prev_expr = false;
                        c.state_index = state_index;
                        state_index += 1;
                    } else if c.props_exprs > 0 || c.children_exprs > 0 {
                        c.state_index = state_index;
                        state_index += 1;
                    }
                    state_index = _assign_state_slots(c, state_index);
                }
                TNodeKind::Text(_) => {
                    if prev_expr {
                        prev_expr = false;
                        c.state_index = state_index;
                        state_index += 1;
                    }
                }
                TNodeKind::Expr(_) => {
                    prev_expr = true;
                }
            }
        }
    }

    state_index
}

fn is_hoistable_expr<'a>(expr: &Expression<'a>, scoping: &Scoping) -> bool {
    match expr {
        Expression::Identifier(id) => {
            let r = scoping.get_reference(id.reference_id());
            if let Some(symbol_id) = r.symbol_id() {
                if scoping.symbol_scope_id(symbol_id) == scoping.root_scope_id() {
                    return true;
                }
            }
        }
        Expression::StaticMemberExpression(expr) => {
            return is_hoistable_expr(&expr.object, scoping);
        }
        _ => {}
    }
    false
}

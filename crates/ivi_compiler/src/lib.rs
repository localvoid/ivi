use std::path::PathBuf;

use oxc_allocator::Allocator;
use oxc_codegen::{Codegen, CodegenOptions};
use oxc_diagnostics::GraphicalReportHandler;
use oxc_parser::Parser;
use oxc_semantic::SemanticBuilder;
use oxc_span::SourceType;
use rustc_hash::{FxHashMap, FxHashSet};

mod chunk;
mod context;
mod import;
mod module;
mod oveo;
mod tpl;

#[derive(Default, Debug)]
pub struct CompilerOptions {
    pub oveo: bool,
}

pub struct CompilerOutput {
    pub code: String,
    pub map: String,
}

#[derive(Debug, thiserror::Error)]
pub enum CompilerError {
    #[error("Unable to parse javascript file: {0}")]
    SyntaxError(String),
    #[error("Unable to parse javascript file: {0}")]
    SemanticError(String),
    #[error("Invalid template: {0}")]
    InvalidTemplate(String),
}

pub fn compile_module(
    source_text: &str,
    options: &CompilerOptions,
    strings: &mut FxHashSet<String>,
) -> Result<CompilerOutput, CompilerError> {
    let allocator = Allocator::default();
    let source_type = SourceType::mjs();
    let ret = Parser::new(&allocator, source_text, source_type).parse();
    if let Some(err) = ret.errors.first() {
        return Err(CompilerError::SyntaxError(err.to_string()));
    }

    let mut program = ret.program;

    let ret = SemanticBuilder::new().with_excess_capacity(1.0).build(&program);
    if let Some(err) = ret.errors.first() {
        return Err(CompilerError::SemanticError(err.to_string()));
    }

    let scoping = ret.semantic.into_scoping();
    let mut errors = module::compile_module(&mut program, &allocator, scoping, options, strings);
    if let Some(err) = errors.drain(..).next() {
        let report_handler = GraphicalReportHandler::new();
        let mut s = String::new();
        let _ = report_handler
            .render_report(&mut s, err.with_source_code(source_text.to_string()).as_ref());
        return Err(CompilerError::InvalidTemplate(s));
    }

    let result = Codegen::new()
        .with_options(CodegenOptions {
            source_map_path: Some(PathBuf::new()),
            ..Default::default()
        })
        .build(&program);

    Ok(CompilerOutput {
        code: result.code,
        map: result.map.map_or_else(String::default, |v| v.to_json_string()),
    })
}

pub fn compile_chunk(
    source_text: &str,
    strings: &FxHashMap<String, u8>,
) -> Result<CompilerOutput, CompilerError> {
    let allocator = Allocator::default();
    let source_type = SourceType::mjs();
    let ret = Parser::new(&allocator, source_text, source_type).parse();
    if let Some(err) = ret.errors.first() {
        return Err(CompilerError::SyntaxError(err.to_string()));
    }

    let mut program = ret.program;

    let ret = SemanticBuilder::new().with_excess_capacity(0.1).build(&program);
    if let Some(err) = ret.errors.first() {
        return Err(CompilerError::SemanticError(err.to_string()));
    }

    let scoping = ret.semantic.into_scoping();

    chunk::compile_chunk(&mut program, &allocator, scoping, strings);

    let result = Codegen::new()
        .with_options(CodegenOptions {
            source_map_path: Some(PathBuf::new()),
            ..Default::default()
        })
        .build(&program);

    Ok(CompilerOutput {
        code: result.code,
        map: result.map.map_or_else(String::default, |v| v.to_json_string()),
    })
}

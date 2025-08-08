use ivi_compiler::{compile_chunk, compile_module};
use napi::{Env, bindgen_prelude::*};
use napi_derive::napi;
use rustc_hash::{FxHashMap, FxHashSet};

use std::sync::{Arc, Mutex, RwLock};

#[napi]
pub struct CompilerOutput {
    pub code: String,
    pub map: String,
}

#[napi(object)]
pub struct CompilerOptions {
    pub dedupe_strings: Option<bool>,
    pub oveo: Option<bool>,
}

#[napi]
pub struct TemplateCompiler {
    inner: Arc<CompilerState>,
}

struct CompilerState {
    options: ivi_compiler::CompilerOptions,
    unique_strings: Mutex<FxHashSet<String>>,
    indexed_strings: RwLock<FxHashMap<String, u8>>,
}

#[napi]
impl TemplateCompiler {
    #[napi(constructor)]
    pub fn new(options: Option<CompilerOptions>) -> Result<Self> {
        let options = if let Some(options) = options {
            ivi_compiler::CompilerOptions {
                oveo: options.oveo.unwrap_or(false),
                dedupe_strings: options.dedupe_strings.unwrap_or(false),
            }
        } else {
            ivi_compiler::CompilerOptions::default()
        };

        Ok(Self {
            inner: Arc::new(CompilerState {
                options,
                unique_strings: Mutex::default(),
                indexed_strings: RwLock::default(),
            }),
        })
    }

    #[napi(ts_return_type = "Promise<CompilerOutput>")]
    pub fn transform(&self, source_text: String, module_type: String) -> AsyncTask<TransformTask> {
        AsyncTask::new(TransformTask {
            compiler: Arc::clone(&self.inner),
            source_text,
            module_type,
            dedupe_strings: self.inner.options.dedupe_strings,
        })
    }

    #[napi]
    pub fn render_start(&self) {
        let unique_lock = self.inner.unique_strings.lock().unwrap();
        let mut unique: Vec<_> = unique_lock.iter().collect();
        unique.sort();
        let mut strings = self.inner.indexed_strings.write().unwrap();
        strings.clear();
        for (i, s) in unique.iter().enumerate() {
            strings.insert(s.to_string(), i as u8);
        }
        unique.clear();
    }

    #[napi(ts_return_type = "Promise<CompilerOutput>")]
    pub fn render_chunk(&self, source_text: String) -> AsyncTask<RenderChunkTask> {
        AsyncTask::new(RenderChunkTask { compiler: Arc::clone(&self.inner), source_text })
    }
}

pub struct TransformTask {
    compiler: Arc<CompilerState>,
    source_text: String,
    module_type: String,
    dedupe_strings: bool,
}

impl Task for TransformTask {
    type Output = CompilerOutput;
    type JsValue = CompilerOutput;

    fn compute(&mut self) -> Result<Self::Output> {
        let mut strings = FxHashSet::default();
        let result = compile_module(
            &self.source_text,
            &self.module_type,
            &self.compiler.options,
            &mut strings,
        )
        .map(|v| CompilerOutput { code: v.code, map: v.map })
        .map_err(|err| Error::from_reason(err.to_string()))?;

        if self.dedupe_strings && !strings.is_empty() {
            let mut unique = self.compiler.unique_strings.lock().unwrap();
            unique.extend(strings.drain());
        }

        Ok(result)
    }

    fn resolve(&mut self, _env: Env, output: CompilerOutput) -> Result<Self::JsValue> {
        Ok(output)
    }
}

pub struct RenderChunkTask {
    compiler: Arc<CompilerState>,
    source_text: String,
}

impl Task for RenderChunkTask {
    type Output = CompilerOutput;
    type JsValue = CompilerOutput;

    fn compute(&mut self) -> Result<Self::Output> {
        let strings = self.compiler.indexed_strings.read().unwrap();

        compile_chunk(&self.source_text, &strings)
            .map(|v| CompilerOutput { code: v.code, map: v.map })
            .map_err(|err| Error::from_reason(err.to_string()))
    }

    fn resolve(&mut self, _env: Env, output: CompilerOutput) -> Result<Self::JsValue> {
        Ok(output)
    }
}

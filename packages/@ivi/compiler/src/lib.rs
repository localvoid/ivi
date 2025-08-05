use ivi_compiler::{compile_chunk, compile_module};
use napi::{Env, bindgen_prelude::*};
use napi_derive::napi;
use rustc_hash::{FxHashMap, FxHashSet};

use std::sync::{
    Arc, Mutex, RwLock,
    atomic::{AtomicBool, Ordering},
};

#[napi]
pub struct CompilerOutput {
    pub code: String,
    pub map: String,
}

#[napi(object)]
pub struct CompilerOptions {
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
    dirty_strings: AtomicBool,
}

#[napi]
impl TemplateCompiler {
    #[napi(constructor)]
    pub fn new(options: Option<CompilerOptions>) -> Result<Self> {
        let options = if let Some(options) = options {
            ivi_compiler::CompilerOptions { oveo: options.oveo.unwrap_or(false) }
        } else {
            ivi_compiler::CompilerOptions::default()
        };

        Ok(Self {
            inner: Arc::new(CompilerState {
                options,
                unique_strings: Mutex::default(),
                indexed_strings: RwLock::default(),
                dirty_strings: AtomicBool::new(false),
            }),
        })
    }

    #[napi]
    pub fn reset(&mut self) {
        {
            let mut strings = self.inner.unique_strings.lock().unwrap();
            strings.clear();
        }
        {
            let mut indexed_strings = self.inner.indexed_strings.write().unwrap();
            indexed_strings.clear();
        }
    }

    #[napi(ts_return_type = "Promise<CompilerOutput>")]
    pub fn compile_module(&self, source_text: String) -> AsyncTask<CompileModuleTask> {
        AsyncTask::new(CompileModuleTask { compiler: self.inner.clone(), source_text })
    }

    #[napi(ts_return_type = "Promise<CompilerOutput>")]
    pub fn compile_chunk(&self, source_text: String) -> AsyncTask<CompileChunkTask> {
        AsyncTask::new(CompileChunkTask { compiler: self.inner.clone(), source_text })
    }
}

pub struct CompileModuleTask {
    compiler: Arc<CompilerState>,
    source_text: String,
}

impl Task for CompileModuleTask {
    type Output = CompilerOutput;
    type JsValue = CompilerOutput;

    fn compute(&mut self) -> Result<Self::Output> {
        let mut strings = FxHashSet::default();
        let result = compile_module(&self.source_text, &self.compiler.options, &mut strings)
            .map(|v| CompilerOutput { code: v.code, map: v.map })
            .map_err(|err| Error::from_reason(err.to_string()))?;
        if !strings.is_empty() {
            let mut unique = self.compiler.unique_strings.lock().unwrap();
            unique.extend(strings.drain());
            self.compiler.dirty_strings.store(true, Ordering::SeqCst);
        }
        Ok(result)
    }

    fn resolve(&mut self, _env: Env, output: CompilerOutput) -> Result<Self::JsValue> {
        Ok(output)
    }
}

pub struct CompileChunkTask {
    compiler: Arc<CompilerState>,
    source_text: String,
}

impl Task for CompileChunkTask {
    type Output = CompilerOutput;
    type JsValue = CompilerOutput;

    fn compute(&mut self) -> Result<Self::Output> {
        // Sort strings
        while self.compiler.dirty_strings.load(Ordering::SeqCst) {
            let unique_lock = self.compiler.unique_strings.lock().unwrap();
            let mut unique: Vec<_> = unique_lock.iter().collect();
            unique.sort();
            let mut strings = self.compiler.indexed_strings.write().unwrap();
            for (i, s) in unique.iter().enumerate() {
                strings.insert(s.to_string(), i as u8);
            }

            self.compiler.dirty_strings.store(false, Ordering::SeqCst);
        }
        let strings = self.compiler.indexed_strings.read().unwrap();

        compile_chunk(&self.source_text, &strings)
            .map(|v| CompilerOutput { code: v.code, map: v.map })
            .map_err(|err| Error::from_reason(err.to_string()))
    }

    fn resolve(&mut self, _env: Env, output: CompilerOutput) -> Result<Self::JsValue> {
        Ok(output)
    }
}

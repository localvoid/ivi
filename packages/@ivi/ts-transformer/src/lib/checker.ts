/**
 * Type checker for an isolated modules. It is used for resolving symbol
 * bindings.
 */
import * as ts from "typescript";

export function getTypeChecker(fileName: string, source: string): ts.TypeChecker {
  const languageService = ts.createLanguageService(
    new IsolatedLanguageServiceHost(fileName, source),
    ts.createDocumentRegistry(),
  );
  const program = languageService.getProgram();
  if (!program) {
    throw new Error("Failed to start a TypeScript program");
  }
  return program.getTypeChecker();
};

export const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  sourceMap: true,
  noCheck: true,
  skipDefaultLibCheck: true,
  skipLibCheck: true,
};

class IsolatedLanguageServiceHost implements ts.LanguageServiceHost {
  private readonly compilerOptions: ts.CompilerOptions = compilerOptions;
  private readonly fileName: string;
  private readonly source: string;

  constructor(fileName: string, source: string) {
    this.fileName = fileName;
    this.source = source;
  }

  getCompilationSettings(): ts.CompilerOptions {
    return this.compilerOptions;
  }

  getScriptFileNames(): string[] {
    return [this.fileName];
  }

  getScriptVersion(_fileName: string): string {
    return "-1";
  }

  getScriptSnapshot(filename: string): ts.IScriptSnapshot | undefined {
    const contents = this.readFile(filename);
    if (contents === void 0) {
      return void 0;
    }
    return ts.ScriptSnapshot.fromString(contents);
  }

  getCurrentDirectory(): string {
    return ".";
  }

  getDefaultLibFileName(options: ts.CompilerOptions): string {
    return ts.getDefaultLibFilePath(options);
  }

  readFile(fileName: string): string | undefined {
    return (!this.fileExists(fileName))
      ? void 0
      : this.source;
  }

  fileExists(fileName: string): boolean {
    return this.fileName === fileName;
  }
}

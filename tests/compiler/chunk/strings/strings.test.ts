import { beforeEach, expect, test } from "bun:test";
import { readdir } from "node:fs/promises";
import * as path from "node:path";
import { TemplateCompiler } from "@ivi/compiler";
import { normalizeNewlines } from "../../normalize.js";

const compiler = new TemplateCompiler({ oveo: true, dedupeStrings: true });
beforeEach(() => {
  compiler.reset();
});

const units = path.join(import.meta.dir, "data");
const entries = await readdir(units, { recursive: true });
for (const entry of entries) {
  try {
    const input = await Bun.file(path.join(units, entry, "input.js")).text();

    test(`compiler/chunk/strings/${entry}`, async () => {
      const output = Bun.file(path.join(units, entry, "output.js"));
      const moduleResult = await compiler.compileModule(input, "js");
      const chunkResult = await compiler.compileChunk(moduleResult.code);
      expect(normalizeNewlines(chunkResult.code)).toBe(normalizeNewlines(await output.text()));
    });
  } catch (err) {
  }
}

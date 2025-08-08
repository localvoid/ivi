import { beforeEach, expect, test } from "bun:test";
import { readdir } from "node:fs/promises";
import * as path from "node:path";
import { TemplateCompiler } from "@ivi/compiler";
import { normalizeNewlines } from "../normalize.js";

const units = path.join(import.meta.dir, "data");
const entries = await readdir(units, { recursive: true });
for (const entry of entries) {
  try {
    const input = await Bun.file(path.join(units, entry, "input.js")).text();

    test(`compiler/module-all-disabled/${entry}`, async () => {
      const compiler = new TemplateCompiler({ oveo: false, dedupeStrings: false });
      const output = Bun.file(path.join(units, entry, "output.js"));
      const moduleResult = await compiler.transform(input, "js");
      expect(normalizeNewlines(moduleResult.code)).toBe(normalizeNewlines(await output.text()));
    });
  } catch (err) {
  }
}

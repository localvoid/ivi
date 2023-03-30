import { strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, toSnapshot } from "../global.js";

describe("mock-dom/innerHTML", () => {
  beforeEach(reset);

  test("<span></span>", () => {
    const e = document._createElement("div");
    e.innerHTML = "<span></span>";
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4/>
</DIV#2>
      `.trim(),
    );
  });

  test("<span><a></a></span>", () => {
    const e = document._createElement("div");
    e.innerHTML = "<span><a></a></span>";
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4>
    <A#5/>
  </SPAN#4>
</DIV#2>
      `.trim(),
    );
  });

  test("<span><a></a><b></b></span>", () => {
    const e = document._createElement("div");
    e.innerHTML = "<span><a></a><b></b></span>";
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4>
    <A#5/>
    <B#6/>
  </SPAN#4>
</DIV#2>
      `.trim(),
    );
  });

  test("<span> text </span>", () => {
    const e = document._createElement("div");
    e.innerHTML = "<span> text </span>";
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4>
    <TEXT#5> text </TEXT#5>
  </SPAN#4>
</DIV#2>
      `.trim(),
    );
  });

  test("<span><a></a>text<b></b></span>", () => {
    const e = document._createElement("div");
    e.innerHTML = "<span><a></a>text<b></b></span>";
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4>
    <A#5/>
    <TEXT#6>text</TEXT#6>
    <B#7/>
  </SPAN#4>
</DIV#2>
      `.trim(),
    );
  });

  test(`<span attr="value"></span>`, () => {
    const e = document._createElement("div");
    e.innerHTML = `<span a="1"></span>`;
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4
    a="1"
  />
</DIV#2>
      `.trim(),
    );
  });

  test(`<span a="1" b="2"></span>`, () => {
    const e = document._createElement("div");
    e.innerHTML = `<span a="1" b="2"></span>`;
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4
    a="1"
    b="2"
  />
</DIV#2>
      `.trim(),
    );
  });

  test(`<span class="a b"></span>`, () => {
    const e = document._createElement("div");
    e.innerHTML = `<span class="a b"></span>`;
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4
    class="a b"
  />
</DIV#2>
      `.trim(),
    );
  });

  test(`<div><input><span></span></div>`, () => {
    const e = document._createElement("div");
    e.innerHTML = `<div><input><span></span></div>`;
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <DIV#4>
    <INPUT#5/>
    <SPAN#6/>
  </DIV#4>
</DIV#2>
      `.trim(),
    );
  });

  test("<span><!></span>", () => {
    const e = document._createElement("div");
    e.innerHTML = "<span><!></span>";
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4>
    <!>
  </SPAN#4>
</DIV#2>
      `.trim(),
    );
  });

  test("namespace", () => {
    const e = document._createElementNS("NS", "div");
    e.innerHTML = "<span></span>";
    strictEqual(
      toSnapshot(e),
      `
<DIV#2>
  <SPAN#4/>
</DIV#2>
      `.trim(),
    );
  });
});

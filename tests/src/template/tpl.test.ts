import { strictEqual } from "node:assert";
import { beforeEach, describe, test } from "node:test";
import { reset, toSnapshot } from "@ivi/mock-dom/global";
import { createRoot } from "ivi/test";
import { htm } from "@ivi/tpl";

describe("@ivi/tpl", () => {
  beforeEach(reset);

  test(`1`, () => {
    const root = createRoot();
    root.update(htm`div`);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#2/>
      `.trim(),
    );
  });

  test(`2`, () => {
    const root = createRoot();
    root.update(htm`div span`);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#5>
  <SPAN#6/>
</DIV#5>
      `.trim(),
    );
  });

  test(`3`, () => {
    const root = createRoot();
    root.update(htm`div 'a'`);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#5>
  <TEXT#6>a</TEXT#6>
</DIV#5>
      `.trim(),
    );
  });

  test(`4`, () => {
    const root = createRoot();
    root.update(htm`div "a"`);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#5>
  <TEXT#6>a</TEXT#6>
</DIV#5>
      `.trim(),
    );
  });

  test(`5`, () => {
    const root = createRoot();
    root.update(htm`div #"a"#`);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#5>
  <TEXT#6>a</TEXT#6>
</DIV#5>
      `.trim(),
    );
  });

  test(`6`, () => {
    const root = createRoot();
    root.update(htm`div ##"a"##`);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#5>
  <TEXT#6>a</TEXT#6>
</DIV#5>
      `.trim(),
    );
  });

  test(`7`, () => {
    const root = createRoot();
    root.update(htm`div 'a' 'b'`);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#5>
  <TEXT#6>ab</TEXT#6>
</DIV#5>
      `.trim(),
    );
  });

  test(`8`, () => {
    const root = createRoot();
    root.update(htm`div 'a' span 'b'`);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#7>
  <TEXT#8>a</TEXT#8>
  <SPAN#9>
    <TEXT#10>b</TEXT#10>
  </SPAN#9>
</DIV#7>
      `.trim(),
    );
  });

  test(`9`, () => {
    const root = createRoot();
    root.update(htm`
      div
        span
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#5>
  <SPAN#6/>
</DIV#5>
      `.trim(),
    );
  });

  test(`10`, () => {
    const root = createRoot();
    root.update(htm`
      div
        'a'
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#5>
  <TEXT#6>a</TEXT#6>
</DIV#5>
      `.trim(),
    );
  });

  test(`11`, () => {
    const root = createRoot();
    root.update(htm`
      div
        'a'
        span
          'b'
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#7>
  <TEXT#8>a</TEXT#8>
  <SPAN#9>
    <TEXT#10>b</TEXT#10>
  </SPAN#9>
</DIV#7>
      `.trim(),
    );
  });

  test(`div.a.b`, () => {
    const root = createRoot();
    root.update(htm`
      div.a.b
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#4
  class="a b"
/>
      `.trim(),
    );
  });

  test(`div :attr #1`, () => {
    const root = createRoot();
    root.update(htm`
      div :attr
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#4
  attr=""
/>
      `.trim(),
    );
  });

  test(`div :attr #2`, () => {
    const root = createRoot();
    root.update(htm`
      div
        :attr
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#4
  attr=""
/>
      `.trim(),
    );
  });

  test(`div :attr='a'`, () => {
    const root = createRoot();
    root.update(htm`
      div
        :attr='a'
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#4
  attr="a"
/>
      `.trim(),
    );
  });

  test(`div{"a b"}`, () => {
    const root = createRoot();
    root.update(htm`
      div${"a b"}
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#2
  class="a b"
/>
      `.trim(),
    );
  });

  test(`div :a={"0"}`, () => {
    const root = createRoot();
    root.update(htm`
      div :a=${"0"}
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#2
  a="0"
/>
      `.trim(),
    );
  });

  test(`div .a={"0"}`, () => {
    const root = createRoot();
    root.update(htm`
      div .a=${"0"}
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#2
  .a="0"
/>
      `.trim(),
    );
  });

  test(`div *a={"0"}`, () => {
    const root = createRoot();
    root.update(htm`
      div *a=${"0"}
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#2
  .a="0"
/>
      `.trim(),
    );
  });

  test(`div ~top="10px"`, () => {
    const root = createRoot();
    root.update(htm`
      div ~top="10px"
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#4
  style="top:10px"
/>
      `.trim(),
    );
  });

  test(`div :style="left:5px" ~top="10px`, () => {
    const root = createRoot();
    root.update(htm`
      div :style="left:5px" ~top="10px"
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#4
  style="left:5px;top:10px"
/>
      `.trim(),
    );
  });

  test(`div ~top={"10px"}`, () => {
    const root = createRoot();
    root.update(htm`
      div ~top=${"10px"}
    `);
    strictEqual(
      toSnapshot(root.findDOMNode()),
      `
<DIV#2
  ~top="10px"
/>
      `.trim(),
    );
  });
});

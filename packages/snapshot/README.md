# Snapshot Renderer

[ivi](https://github.com/ivijs/ivi) snapshot renderer for
[Jest Snapshot Testing](https://facebook.github.io/jest/docs/snapshot-testing.html).

## Usage Example

```ts
import * as h from "ivi-ssr-html";
import { render } from "ivi-snapshot"

test("snapshot", () => {
  expect(render(
      h.div("container").children("Snapshot Test"),
    ))
    .toMatchSnapshot();
})
```
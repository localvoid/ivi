# [ivi](https://github.com/localvoid/ivi) Rollup Plugin

## Example Configuration

`rollup.config.mjs`

```js
import { ivi } from "@ivi/rollup-plugin";

export default {
  // ..
  plugins: [
    ivi(),
  ],
};
```

## Plugin Options

- `include` - Optional include filter.
- `exclude` - Optional exclude filter.

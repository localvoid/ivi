# [ivi](https://github.com/localvoid/ivi) Astro Integration Plugin

`"@ivi/astro"` package provides [Astro](https://astro.build/) integration plugin that supports Server-Side Rendering and Client-Side Hydration.

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import ivi from "@ivi/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [ivi()],
});
```

# [ivi](https://github.com/localvoid/ivi) Vite Plugin

`"@ivi/vite-plugin"` package provides [Vite](https://vitejs.dev/) plugin that supports Client-Side Rendering and [Server-Side Rendering](https://vitejs.dev/guide/ssr.html).

```ts
// vite.config.mjs
import { defineConfig } from "vite";
import { ivi } from "@ivi/vite-plugin";

export default defineConfig({
  plugins: [ivi()],
});
```

# Build Configuration

Building an application with an NPM module requires an assignment for all global variables. There are two global
variables:

```ts
declare global {
    const __IVI_DEV__: boolean;
    const __IVI_BROWSER__: boolean;
}
```

`__IVI_DEV__` enables Development Mode.

`__IVI_BROWSER__` indicates that application is working in a browser environment. When building scripts for server side
rendering, this variable should be set to `false`.

## Webpack Configuration

Assign global variables with [DefinePlugin](https://github.com/webpack/docs/wiki/list-of-plugins#defineplugin).

```js
new webpack.DefinePlugin({
    __IVI_DEV__: true,
    __IVI_BROWSER__: true,
})
```

## Rollup Configuration

Install [rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace) module.

```sh
npm install --save-dev rollup-plugin-replace
```

And enable it in the rollup config:

```js
import { rollup } from "rollup";
import replace from "rollup-plugin-replace";

rollup({
    entry: "main.js",
    plugins: [
        replace({
            __IVI_DEV__: true,
            __IVI_BROWSER__: true,
        }),
    ],
}).then(...)
```

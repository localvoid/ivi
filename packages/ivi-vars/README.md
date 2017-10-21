Environment Variable presets for [ivi](https://github.com/ivijs/ivi) library.

By default, `ivi-vars` is pointing at config file that targets browser environment in a development mode.

- `browser-dev.js` targets browser in a development mode (DEFAULT).
- `browser.js` targets browser in a production mode.
- `cordova-dev.js` targets cordova in a development mode.
- `cordova.js` targets cordova in a production mode.
- `electron-dev.js` targets electron in a development mode.
- `electron.js` targets electron in a production mode.
- `evergreen-browser-dev.js` targets latest browser in a development mode.
- `evergreen-browser.js` targets latest browser in a production mode.
- `node-dev.js` targets Node.js in a development mode.
- `node.js` targets Node.js in a production mode.

## Webpack Configuration

Configure webpack package aliasing with [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias).

```js
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      "ivi-vars": "ivi-vars/browser",
    },
  },
};
```

## Rollup Configuration

Install [rollup-plugin-alias](https://github.com/rollup/rollup-plugin-alias) module.

```sh
npm install --save-dev rollup-plugin-alias
```

And enable it in the rollup config:

```js
import { rollup } from "rollup";
import alias from "rollup-plugin-alias";

rollup({
  entry: "main.js",
  plugins: [
    alias({
      "ivi-vars": __dirname + "/node_modules/ivi-vars/browser",
    }),
  ],
}).then(...);
```

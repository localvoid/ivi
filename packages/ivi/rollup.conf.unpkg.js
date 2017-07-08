import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

export default {
  entry: "unpkg/entry.js",
  dest: "dist/unpkg/index.js",
  format: "umd",
  moduleName: "ivi",
  plugins: [
    resolve(),
    replace({
      values: {
        __IVI_DEV__: true,
        __IVI_BROWSER__: true,
      },
    }),
  ],
};

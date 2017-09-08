import resolve from "rollup-plugin-node-resolve";

export default {
  name: "ivi",
  input: __dirname + "/unpkg/entry.js",
  output: {
    file: __dirname + "/dist/unpkg/index.js",
    format: "umd",
  },
  plugins: [
    resolve(),
  ],
};

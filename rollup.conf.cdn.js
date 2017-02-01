import sourceMaps from "rollup-plugin-sourcemaps";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
const pkg = require("./package.json");

export default {
    entry: "build/es6/src/ivi.js",
    context: "window",
    plugins: [
        sourceMaps(),
        nodeResolve(),
        replace({
            values: {
                "__IVI_VERSION__": JSON.stringify(pkg["version"]),
                "__IVI_DEV__": true,
                "__IVI_BROWSER__": true,
            },
        }),
    ],
    dest: "dist/cdn/ivi.js",
    format: "umd",
    moduleName: "ivi",
    sourceMap: true,
}

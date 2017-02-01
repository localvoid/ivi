import sourceMaps from "rollup-plugin-sourcemaps";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
const pkg = require("./package.json");

export default {
    entry: "build/es6/src/ivi.js",
    treeshake: false,
    context: "window",
    plugins: [
        sourceMaps(),
        nodeResolve(),
        replace({
            values: {
                "__IVI_VERSION__": JSON.stringify(pkg["version"]),
            },
        }),
    ],
    dest: pkg["module"],
    format: "es",
    sourceMap: true,
}

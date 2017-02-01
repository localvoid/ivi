import sourceMaps from "rollup-plugin-sourcemaps";
import istanbul from "rollup-plugin-istanbul";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
const pkg = require("./package.json");

export default {
    entry: "build/es6/tests/index.js",
    context: "window",
    plugins: [
        sourceMaps(),
        istanbul({
            exclude: [
                "build/es6/src/common/dev_mode.js",
                "build/es6/src/common/feature_detection.js",
                "build/es6/src/common/user_agent.js",
                "build/es6/src/common/screen_of_death.js",
                "build/es6/src/events/events.js",
                "build/es6/src/events/synthetic_event.js",
                "build/es6/src/vdom/stack_trace.js",
                "build/es6/tests/**/*.js",
                "node_modules/**/*",
            ],
        }),
        nodeResolve(),
        replace({
            values: {
                "__IVI_VERSION__": JSON.stringify(pkg["version"]),
                "__IVI_DEV__": true,
                "__IVI_BROWSER__": true,
            },
        }),
    ],
    format: "iife",
    moduleName: "tests",
    dest: "build/es6/tests.js",
    sourceMap: "inline",
}

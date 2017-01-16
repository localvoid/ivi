/**
 * Commands:
 *  - clean: removes build directories
 *  - lint: lint checking
 *  - compileTS: compile typescript to es6
 *  - bundleTests: bundle tests from es6 sources into one file
 *  - compileTests: compile bundled tests to es5 and inject polyfills
 *  - runTests: run tests
 *  - runTestsSuace: run test on saucelabs
 *  - testCoverage: build tests with istanbul, run tests and build coverage report
 *
 * Shortcuts:
 *  - test: bundleTests -> runTests (use this command during development)
 *  - dist: build packages for distribution
 */

const exec = require("child_process").exec;
const gulp = require("gulp");
const del = require("del");
const gulpTSLint = require("gulp-tslint");
const gulpIstanbulReport = require("gulp-istanbul-report");
const gulpSourcemaps = require("gulp-sourcemaps");
const rollup = require("rollup");
const rollupSourceMaps = require("rollup-plugin-sourcemaps");
const rollupIstanbul = require("rollup-plugin-istanbul");
const rollupNodeResolve = require("rollup-plugin-node-resolve");
const rollupReplace = require("rollup-plugin-replace");
const remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");
const closureCompiler = require("google-closure-compiler").gulp();
const pkg = require("./package.json");

const series = gulp.series;
const parallel = gulp.parallel;

function clean() {
    return del(["dist", "build", "coverage"]);
}

function lint() {
    return gulp.src("src/**/*.ts")
        .pipe(gulpTSLint({
            formatter: "verbose"
        }))
        .pipe(gulpTSLint.report());
}

function compile(args) {
    const fn = function (done) {
        let cmd = "./node_modules/typescript/bin/tsc";
        if (args) {
            cmd += " " + args;
        }
        exec(cmd,
            function (err, stdout, stderr) {
                if (stdout) {
                    console.log(stdout);
                }
                if (stderr) {
                    console.log(stderr);
                }
                done(err);
            });
    };
    fn.displayName = "compile typescript";
    if (args) {
        fn.displayName += " [" + args + "]";
    }
    return fn;
}

const compileTS = compile();

function copyDeclarations() {
    return gulp.src("build/es6/src/**/*.d.ts")
        .pipe(gulp.dest("dist/typings"));
}

function bundleNPM() {
    return rollup.rollup({
        entry: "build/es6/src/ivi.js",
        treeshake: false,
        plugins: [
            rollupSourceMaps(),
            rollupNodeResolve(),
            rollupReplace({
                values: {
                    "__IVI_VERSION__": JSON.stringify(pkg["version"]),
                },
            }),
        ],
    }).then((bundle) => Promise.all([
        bundle.write({
            format: "es",
            dest: pkg["module"],
            sourceMap: true,
        }),
    ]));
}

function bundleCDN() {
    return rollup.rollup({
        entry: "build/es6/src/ivi.js",
        context: "window",
        plugins: [
            rollupSourceMaps(),
            rollupNodeResolve(),
            rollupReplace({
                values: {
                    "__IVI_VERSION__": JSON.stringify(pkg["version"]),
                    "__IVI_DEV__": true,
                    "__IVI_BROWSER__": true,
                },
            }),
        ],
    }).then((bundle) => Promise.all([
        bundle.write({
            format: "umd",
            moduleName: "ivi",
            dest: "dist/cdn/ivi.js",
            sourceMap: true,
        }),
    ]));
}

function bundleTests(enableCoverageReport) {
    return function bundleTests() {
        const plugins = [];
        plugins.push(rollupSourceMaps());
        if (enableCoverageReport) {
            plugins.push(rollupIstanbul({
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
            }));
        }
        plugins.push(
            rollupNodeResolve(),
            rollupReplace({
                values: {
                    "__IVI_VERSION__": JSON.stringify(pkg["version"]),
                    "__IVI_DEV__": true,
                    "__IVI_BROWSER__": true,
                },
            })
        );

        return rollup.rollup({
            entry: "build/es6/tests/index.js",
            context: "window",
            plugins: plugins,
        }).then((bundle) => Promise.all([
            bundle.write({
                format: "iife",
                moduleName: "tests",
                dest: "build/es6/tests.js",
                sourceMap: "inline",
            }),
        ]));
    };
}

function compileTests() {
    return gulp.src("build/es6/tests.js")
        .pipe(gulpSourcemaps.init({ loadMaps: true }))
        .pipe(closureCompiler({
            js_output_file: "build/es6/tests.js",
            compilation_level: "SIMPLE",
            language_in: "ECMASCRIPT6_STRICT",
            language_out: "ECMASCRIPT5_STRICT",
            use_types_for_optimization: true,
            assume_function_wrapper: true,
            output_wrapper: "(function(){%output%}).call(this);",
            summary_detail_level: 3,
            warning_level: "QUIET",
            rewrite_polyfills: true,
        }))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest("."));
}

function runTests(done) {
    const KarmaServer = require("karma").Server;

    new KarmaServer({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true,
    }, done).start();
}

function runTestsWithCoverageReport(done) {
    const KarmaServer = require("karma").Server;

    new KarmaServer({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true,
        reporters: ["mocha", "coverage"],
    }, done).start();
}

function runTestsSauce(done) {
    const KarmaServer = require("karma").Server;

    new KarmaServer({
        configFile: __dirname + "/karma.conf.js",
        browsers: [
            "sl_chrome",
            "sl_firefox",
            "sl_mac_safari",
            "sl_edge",
            "sl_ie_11",
            // Temporarily disable ios safari, it is insanely slow
            // "sl_ios_safari_9",
            "sl_android_4_4",
            "sl_android_5_1",
        ],
        reporters: ["dots", "saucelabs"],
        singleRun: true,
    }, done).start();
}

function remapCoverage() {
    return gulp.src("coverage/coverage.json")
        .pipe(remapIstanbul({
            reports: {
                json: "coverage/coverage.json",
                html: "coverage/html-report",
            },
            exclude: "node_modules",
        }));
}

function printIstanbulReport() {
    return gulp.src("coverage/coverage.json")
        .pipe(gulpIstanbulReport());
}

exports.default = exports.dist = series(compileTS, copyDeclarations, bundleNPM, bundleCDN);

exports.clean = clean;
exports.lint = lint;
exports.compileTS = compileTS;
exports.bundleTests = bundleTests(false);
exports.compileTests = compileTests;
exports.runTests = runTests;
exports.runTestsSauce = runTestsSauce;
exports.testCoverage = series(
    bundleTests(true),
    compileTests,
    runTestsWithCoverageReport,
    remapCoverage,
    printIstanbulReport
);
exports.test = series(bundleTests(false), runTests);

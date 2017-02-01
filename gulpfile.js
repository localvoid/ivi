/**
 * Commands:
 *  - clean: removes build directories
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

const child = require("child_process");
const gulp = require("gulp");
const del = require("del");
const gulpIstanbulReport = require("gulp-istanbul-report");
const gulpSourcemaps = require("gulp-sourcemaps");
const remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");
const closureCompiler = require("google-closure-compiler").gulp();

const series = gulp.series;
const parallel = gulp.parallel;

function clean() {
    return del(["dist", "build", "coverage"]);
}

function compileTS(done) {
    child.execFile("./node_modules/.bin/tsc", function (err, stdout, stderr) {
        if (stdout) {
            process.stdout.write(stdout);
        }
        if (stderr) {
            process.stderr.write(stderr);
        }
        done(err);
    });
}

function rollup(config, done) {
    child.execFile("./node_modules/.bin/rollup", ["-c", config], function (err, stdout, stderr) {
        if (stdout) {
            process.stdout.write(stdout);
        }
        if (stderr) {
            process.stderr.write(stderr);
        }
        done();
    });
}

function bundleNPM(done) {
    rollup("rollup.conf.npm.js", done);
}

function bundleCDN(done) {
    rollup("rollup.conf.cdn.js", done);
}

function bundleTests(done) {
    rollup("rollup.conf.tests.js", done);
}

function bundleTestsCoverage(done) {
    rollup("rollup.conf.coverage.js", done);
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

exports.default = exports.dist = series(compileTS, bundleNPM, bundleCDN);

exports.clean = clean;
exports.compileTS = compileTS;
exports.bundleTests = bundleTests;
exports.compileTests = compileTests;
exports.runTests = runTests;
exports.runTestsSauce = runTestsSauce;
exports.testCoverage = series(
    bundleTestsCoverage,
    runTestsWithCoverageReport,
    remapCoverage,
    printIstanbulReport
);
exports.test = series(bundleTests, runTests);

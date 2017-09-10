const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./karma.conf");

module.exports = function (config) {
  baseConfig(config);

  config.set({
    singleRun: true,

    webpack: merge.smart(config.webpack, {
      module: {
        rules: [{
          test: /\.ts$/,
          include: path.resolve("src/"),
          exclude: [
            /node_modules/,
            path.resolve("src/dev_mode/dev_mode.ts"),
            path.resolve("src/dev_mode/stack_trace.ts"),
          ],
          loader: "istanbul-instrumenter-loader",
          enforce: "post",
        }],
      },
    }),

    reporters: ["coverage-istanbul"],

    coverageIstanbulReporter: {
      reports: ["lcov", "text"],
      dir: "./coverage",
      fixWebpackSourcePath: true,
      skipFilesWithNoCoverage: true,
    },
  });

  if (process.env.TRAVIS) {
    config.coverageIstanbulReporter.reports = ["lcov"];
  }
};

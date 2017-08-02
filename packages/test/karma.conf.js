const path = require("path");
const webpack = require("webpack");

module.exports = function (config) {
  config.set({
    browsers: ["ChromeHeadless"],
    frameworks: ["iko", "snapshot"],
    reporters: ["iko"],
    preprocessors: {
      "__snapshots__/**/*.md": ["snapshot"],
      "__tests__/index.ts": ["webpack", "sourcemap"]
    },
    files: [
      "__snapshots__/**/*.md",
      "__tests__/index.ts"
    ],

    colors: true,
    autoWatch: true,

    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  configFileName: "tsconfig.tests.json",
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          "__IVI_DEV__": true,
          "__IVI_BROWSER__": true,
        }),
        new webpack.SourceMapDevToolPlugin({
          test: /\.(ts|js)$/,
        }),
      ],
      resolve: {
        alias: {
          "ivi-scheduler": path.join(__dirname, "src", "scheduler"),
        },
        extensions: [".ts", ".js"],
      },
      performance: {
        hints: false
      },
    },

    webpackMiddleware: {
      stats: "errors-only",
      noInfo: true
    },

    snapshot: {
      update: !!process.env.UPDATE,
      format: "indented-md",
      checkSourceFile: true,
      pathResolver: function (basePath, suiteName) {
        return path.join(basePath, "__snapshots__", suiteName + ".md");
      },
    },

    client: {
      mocha: {
        reporter: "html",
        ui: "bdd",
      }
    },

    mime: {
      "text/x-typescript": ["ts"],
    },
  });
};

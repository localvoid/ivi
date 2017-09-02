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
                  configFile: "tsconfig.tests.json",
                },
              },
            ],
          },
        ],
      },
      plugins: [
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
      prune: !!process.env.PRUNE,
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

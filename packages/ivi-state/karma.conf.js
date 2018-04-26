const webpack = require("webpack");

module.exports = function (config) {
  config.set({
    browsers: ["ChromeHeadless"],
    frameworks: ["iko"],
    reporters: ["iko"],
    preprocessors: { "__tests__/index.ts": ["webpack", "sourcemap"] },
    files: ["__tests__/index.ts"],

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

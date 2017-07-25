const webpack = require("webpack");

module.exports = function (config) {
  config.set({
    browsers: ["ChromeHeadless"],
    frameworks: ["mocha"],
    reporters: ["mocha"],
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

"use strict";

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const globby = require("globby");

const logError = (error) => {
  console.clear();
  console.error(error);
  return process.exit(1);
};

const getEntries = () =>
  globby([`./docroot/themes/custom/**/src/*.js`, `./docroot/modules/custom/**/src/*.js`])
    .then((paths) => paths)
    .catch((error) => logError(error));

module.exports = getEntries()
  .then((allEntries) =>
    allEntries.map((entry) => {
      const [outputPath, filename] = [`${entry.split(`src`)[0]}dist`, `${entry.split(`src/`)[1]}`];
      const MODE = process.argv.find((arg) => arg.includes(`--mode=`)).split(`--mode=`)[1];
      const PLUGINS =
        MODE === `production`
          ? [
              new CleanWebpackPlugin(),
              new MiniCssExtractPlugin({
                moduleFilename: (_chunk) => filename.replace(`.js`, `.css`),
              }),
              new OptimizeCSSAssetsPlugin({}),
            ]
          : [
              new CleanWebpackPlugin(),
              new MiniCssExtractPlugin({
                moduleFilename: (_chunk) => filename.replace(`.js`, `.css`),
              }),
            ];
      return {
        mode: MODE,
        entry,
        output: {
          path: path.join(__dirname, outputPath),
          filename,
        },
        devtool: `hidden-source-map`,
        externals: {
          Drupal: `Drupal`,
          drupalSettings: `drupalSettings`,
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx)/,
              exclude: /node_modules/,
              loader: ["babel-loader"],
            },
            {
              test: /\.(css|scss)$/,
              exclude: /node_modules/,
              use: [
                MiniCssExtractPlugin.loader,
                { loader: "css-loader", options: { sourceMap: MODE === `development` } },
                {
                  loader: "postcss-loader",
                  options: {
                    ident: "postcss",
                    plugins: [require("autoprefixer")],
                  },
                },
                { loader: "sass-loader", options: { sourceMap: MODE === `development` } },
              ],
            },
          ],
        },
        devtool: MODE === `development` ? `source-map` : false,
        plugins: PLUGINS,
        resolve: {
          extensions: [".js", ".jsx", ".scss"],
        },
      };
    })
  )
  .catch((error) => logError(error));

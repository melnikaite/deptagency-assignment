const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = (env, options) => {
    return {
        entry: "./src/public/javascripts/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "./bundle.js"
        },
        watch: options.mode === "development",
        devtool: 'eval-source-map',
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [{from: "src/public/images"}]
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
            })
        ]
    };
};

module.exports = config;

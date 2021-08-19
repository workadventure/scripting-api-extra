import type { Configuration } from "webpack";
import type WebpackDevServer from "webpack-dev-server";
import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import sveltePreprocess from "svelte-preprocess";
//import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const mode = process.env.NODE_ENV ?? "development";
const isProduction = mode === "production";
const isDevelopment = !isProduction;

const resources = [{ from: "resources", to: "resources" }];

if (isDevelopment) {
    resources.push({
        from: "test/maps",
        to: ".",
    });
}

module.exports = {
    entry: {
        main: "./src/bootstrap.ts",
        keypad: "./src/Iframes/Keypad/index.ts",
    },
    mode: mode,
    devtool: isDevelopment ? "inline-source-map" : "source-map",
    //devtool: isDevelopment ? 'eval' : 'source-map',
    devServer: {
        port: 3000,
        contentBase: "dist",
        host: "localhost",
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                //use: 'ts-loader',
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    //transpileOnly: true,
                    configFile: "tsconfig.build.json",
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            //url: false,
                            sourceMap: true,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            //url: false,
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: {
                    loader: "svelte-loader",
                    options: {
                        compilerOptions: {
                            // Dev mode must be enabled for HMR to work!
                            dev: isDevelopment,
                        },
                        emitCss: isProduction,
                        hotReload: isDevelopment,
                        hotOptions: {
                            // List of options and defaults: https://www.npmjs.com/package/svelte-loader-hot#usage
                            noPreserveState: false,
                            optimistic: true,
                        },
                        preprocess: sveltePreprocess({
                            scss: true,
                            sass: true,
                        }),
                        onwarn: function (
                            warning: { code: string },
                            handleWarning: (warning: { code: string }) => void,
                        ) {
                            // See https://github.com/sveltejs/svelte/issues/4946#issuecomment-662168782

                            /*if (warning.code === 'a11y-no-onchange') { return }
                            if (warning.code === 'a11y-autofocus') { return }
                            if (warning.code === 'a11y-media-has-caption') { return }*/

                            // process as usual
                            handleWarning(warning);
                        },
                    },
                },
            },

            // Required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
            // See: https://github.com/sveltejs/svelte-loader#usage
            {
                test: /node_modules\/svelte\/.*\.mjs$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(eot|svg|png|gif|jpg)$/,
                exclude: /node_modules/,
                type: "asset",
            },
            {
                test: /\.(woff(2)?|ttf)$/,
                type: "asset",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
        ],
    },
    resolve: {
        alias: {
            svelte: path.resolve("node_modules", "svelte"),
        },
        extensions: [".tsx", ".ts", ".js", ".svelte"],
        mainFields: ["svelte", "browser", "module", "main", "iframe"],
    },
    output: {
        filename: (pathData) => {
            // Add a content hash only for the main bundle.
            // We want the iframe_api.js file to keep its name as it will be referenced from outside iframes.
            //return pathData.chunk?.name === 'main' ? 'js/[name].js': '[name].[contenthash].js';
            return pathData.chunk?.name === "main" ? "bundle.js" : "js/[name].[contenthash].js";
        },
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new ForkTsCheckerWebpackPlugin({
        //eslint: {
        //    files: './src/**/*.ts'
        //}
        //}),
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
        new HtmlWebpackPlugin({
            template: "./src/Iframes/Keypad/keypad.ejs",
            filename: "keypad.html",
            templateParameters: {
                workadventure_url: process.env.WORKADVENTURE_URL
                    ? process.env.WORKADVENTURE_URL
                    : "https://play.workadventu.re",
            },
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
            chunks: ["keypad"],
        }),
        new HtmlWebpackPlugin({
            template: "./test/maps/index.ejs",
            filename: "index.html",
            templateParameters: {
                workadventure_url: process.env.WORKADVENTURE_URL
                    ? process.env.WORKADVENTURE_URL
                    : "https://play.workadventu.re",
            },
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
            chunks: [],
        }),
        new NodePolyfillPlugin(),
        new CopyPlugin({
            patterns: resources,
        }),
        new webpack.EnvironmentPlugin({
            ASSETS_URL: null,
        }),
    ],
} as Configuration & WebpackDevServer.Configuration;

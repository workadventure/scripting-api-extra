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
        configuration: "./src/Iframes/Configuration/index.ts",
        tutorial: "./src/Iframes/Tutorial/index.ts",
        tutorialv1: "./src/Iframes/TutorialV1/Tuto/index.ts",
        tutorialv1Script: "./src/Iframes/TutorialV1/Launcher/index.ts",
    },
    mode: mode,
    devtool: isDevelopment ? "inline-source-map" : "source-map",
    //devtool: isDevelopment ? 'eval' : 'source-map',
    devServer: {
        port: 3000,
        static: ["dist"],
        host: "0.0.0.0",
        allowedHosts: "all",
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
                            url: false,
                            sourceMap: true,
                        },
                    },
                    "postcss-loader",
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
        extensions: [".tsx", ".ts", ".js", ".scss", ".svelte"],
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
            template: "./src/Iframes/Configuration/configuration.ejs",
            filename: "configuration.html",
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
            chunks: ["configuration"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/Iframes/Tutorial/tutorial.ejs",
            filename: "tutorial.html",
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
            chunks: ["tutorial"],
        }),

        // Scripting for tutorial V1
        new HtmlWebpackPlugin({
            template: "./src/Iframes/TutorialV1/Tuto/tutorialv1.ejs",
            filename: "tutorialv1.html",
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
            chunks: ["tutorialv1"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/Iframes/TutorialV1/Launcher/script.ejs",
            filename: "tutorialv1Script.html",
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
            chunks: ["tutorialv1Script"],
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
            WORKADVENTURE_URL: process.env.WORKADVENTURE_URL
                ? JSON.stringify(process.env.WORKADVENTURE_URL)
                : null,
        }),
    ],
} as Configuration & WebpackDevServer.Configuration;

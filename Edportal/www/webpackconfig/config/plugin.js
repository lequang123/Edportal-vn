﻿const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const pathConfig = require('./path');
const cssRootPath = pathConfig.cssPaths.build;

let _buildNumber = 1;
function generatePlugins(environment) {
    const commonPlugins = [
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [
        //         `${cssRootPath}/**/*`, // Clean all files in cssRootPath
        //         `!${cssRootPath}/fonts/**/*`, // Exclude the 'fonts' directory
        //         `!${cssRootPath}/images/**/*`, // Exclude the 'images' directory
        //         `!${cssRootPath}/dev/**/*`, // Exclude the 'dev' directory
        //         `!${cssRootPath}/pro/**/*`  // Exclude the 'pro' directory
        //     ],
        //     dry: false,
        //     verbose: true
        // }),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: 'jquery',
            'window.$': 'jquery',
            "window.jQuery": 'jquery',
            "root.jQuery": 'jquery'
        }),
        new WebpackBuildNotifierPlugin({
            title: "React Webpack Build",
            suppressSuccess: true
        }),
        function () {
            this.plugin('done', function (stats) {
                setTimeout(function () {
                    console.log('\n ////////// Build version: #' + (_buildNumber++) + ' (' + new Date().toLocaleString() + ').//////////\n');
                }, 150);
            });
        }
    ];

    return commonPlugins;
}

module.exports = generatePlugins;
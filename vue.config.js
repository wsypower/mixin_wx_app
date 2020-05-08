/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   vue.config.js                                             :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/06 21:48:07 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/08 14:25:58 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
//使用uglify-js进行js文件的压缩。
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "vue模板"; // page title
// ──────────────────────────────────────────────── I ──────────
//   :::::: P O R T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────
// 如果您的端口设置为80，
// 使用管理员权限执行命令行。
// 例如，Mac：sudo npm run
// 您可以通过以下方法更改端口：
// port=9527 npm run serve 或 npm run serve --port=8080
// ──────────────────────────────────────────────────────────────
const port = process.env.port || process.env.npm_config_port || 9527; // dev port

//所有配置项说明均可在https://cli.vuejs.org/config/中找到
module.exports = {
  /**
   * 如果您打算在子路径下部署网站，则需要设置publicPath，
   * 例如GitHub Pages。如果您打算将网站部署到https://foo.github.io/bar/，
   * 然后publicPath应该设置为“ /bar /”。
   * 在大多数情况下，请使用'/'！
   * 详细信息：https://cli.vuejs.org/config/#publicpath
   */

  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // before: require("./mock/mock-server.js"),
  },
  configureWebpack: {
    // 在webpack的名称字段中提供应用程序的标题，以便
    // 可以在index.html中对其进行访问以注入正确的标题。
    name: name,
    resolve: {
      // 重命名
      alias: {
        "@": resolve("src"),
      },
    },
  },
  chainWebpack(config) {
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config
      // ~~~~~~~~~~~~~~~~~ 开发环境 ~~~~~~~~~~~~~~~~ //
      .when(
        process.env.NODE_ENV === "development",
        // sourcemap不包含列信息
        (config) => config.devtool("cheap-source-map")
      )
      // ~~~~~~~~~~~~~~~~ 非开发环境 ~~~~~~~~~~~~~~~~ //
      .when(process.env.NODE_ENV !== "development", (config) => {
        config.optimization.minimizer([
          new UglifyJsPlugin({
            uglifyOptions: {
              // 移除 console
              // 其它优化选项 https://segmentfault.com/a/1190000010874406
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ["console.log"],
              },
            },
          }),
        ]);
      });
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            //`runtime`必须与runtimeChunk名称相同。默认是“运行时”
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
          vantUI: {
            name: "chunk-vantUI",
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vant(.*)/,
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
};

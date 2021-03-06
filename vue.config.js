/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   vue.config.js                                             :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/06 21:48:07 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/08 16:07:48 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
// 使用uglify-js进行js文件的压缩。
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 使用terser-webpack-plugin 替换uglify-js 进行js文件的压缩
// TODO:uglify - js不能识别es6代码，如果外部依赖中存在es6代码，将很难捕获到问题
const TerserPlugin = require("terser-webpack-plugin");
// webpack 可视化分析
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// PWD骨架屏
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
const resolve = (dir) => path.join(__dirname, dir);
const name = defaultSettings.title || "vue模板"; // page title

// ====================================================== //
// ======================= 可修改的端口号 ====================== //
// ====================================================== //
// 如果您的端口设置为80，
// 使用管理员权限执行命令行。
// 例如，Mac：sudo npm run
// 您可以通过以下方法更改端口：
// port=9527 npm run serve 或 npm run serve --port=8080
const port = process.env.port || process.env.npm_config_port || 9527; // dev port

module.exports = {
  // ====================================================== //
  // ======================== 基础配置 ======================== //
  // ====================================================== //
  /**
   * 所有配置项说明均可在https://cli.vuejs.org/config/中找到
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
  transpileDependencies: ["glob"],
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // 配置多个代理
    proxy: {
      "/proxy": {
        target: "https://www.mock.com",
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          "^/proxy": "",
        },
      },
    },
    // before: require("./mock/mock-server.js"),
  },
  // ====================================================== //
  // ========================= 重命名 ======================== //
  // ====================================================== //

  configureWebpack: {
    // 在webpack的名称字段中提供应用程序的标题，以便
    // 可以在index.html中对其进行访问以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"), // 主目录
        views: resolve("src/views"), // 页面
        components: resolve("src/components"), // 组件
        api: resolve("src/api"), // 接口
        utils: resolve("src/utils"), // 通用功能
        assets: resolve("src/assets"), // 静态资源
        style: resolve("src/style"), // 通用样式
      },
    },
    // 加入骨架屏
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, "./src/skeleton/entry-skeleton.js"), //这里为上面的entry-skeleton.js
          },
        },
        minimize: true,
        // quiet: true,
        // 对应需要router的路径会为当前路径生成骨架屏
        router: {
          mode: "hash",
          routes: [
            {
              path: "/", //和router.js中的路径一样就行
              skeletonId: "skeleton1", //之前的id
            },
            {
              path: "/router",
              skeletonId: "skeleton2",
            },
          ],
        },
      }),
    ],
  },
  // 去除vue元素之间的空格
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
    // ====================================================== //
    // ======================== 开发环境 ======================== //
    // ====================================================== //
    config.when(process.env.NODE_ENV === "development", (config) =>
      // sourcemap不包含列信息
      config.devtool("cheap-source-map")
    );
    // ====================================================== //
    // ======================== 非开发环境 ======================= //
    // ====================================================== //
    config.when(process.env.NODE_ENV !== "development", (config) => {
      // 压缩html中的css
      config.plugin("html").tap((args) => {
        args[0].minify.minifyCSS = true;
        return args;
      });
      // 启动 webpack 打包分析
      config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);

      // FIXME: UglifyJs 无法解压ES6文件，node-modules中文件dist有es6导致文件压缩失败

      // config.optimization.minimizer([
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         drop_console: true,
      //         drop_debugger: true,
      //         pure_funcs: ["console.log"],
      //       },
      //     },
      //   }),
      // ]);
      // 启用多线程打包压缩，并移除console
      config.optimization.minimizer([
        new TerserPlugin({
          parallel: 4, // 并行打包
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_debugger: false,
              drop_console: true,
              pure_funcs: ["console.log"],
            },
            mangle: true, // 注意`mangle.properties`默认为`false`。
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
          },
        }),
      ]);
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
      /*===============================
      =            文件拆分            =
      =================================*/

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
      /*=====  End of Section comment block  ======*/
      config.optimization.runtimeChunk("single");
    });
  },
  // ====================================================== //
  // ====================== CSS 相关选项 ====================== //
  // ====================================================== //
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    loaderOptions: {
      // 设置 scss 公用文件
      sass: {
        prependData: '@import "style/settings.scss";',
      },
    },
  },
};

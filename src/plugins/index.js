/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   index.js                                                  :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/08 21:59:52 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/08 21:59:52 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */
import vueWechatTitle from "vue-wechat-title";
// TODO: 只能用于单路由，如遇到tab路由形式，压栈的形式就会有问题，推荐移动端不采用子路由，改换动态组件
// import router from "@/router";
// import Navigation from "./navigation/index";
import service from "./request/index";
// 淘宝的flexbile 增加一个修正字体字号大小的影响
import "./flexbile/index";
// TODO:微信鉴权（如果是微信环境才会执行内部鉴权，否则注册空插件）
import wechatAuth from "@/plugins/environment/wx/wechatAuth";

// 环境判断
// import browser from "./environment/index";
// console.log("browser", browser);

// const wx = () => import(/* webpackChunkName: "wx-sdk" */ "weixin-js-sdk");
// const hesc = () => import(/* webpackChunkName: "wx-sdk" */ "hesc-jsapi");
// wx().then((w) => {
//   console.log(w);
// });
// import '@/plugins/environment/wx/wechatAuth/index'
import defaultSettings from "@/settings.js";
console.log(defaultSettings.wx);

export default {
  install(Vue) {
    Vue.use(wechatAuth, { ...defaultSettings.wx });
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false;
    Vue.use(service);
    // Vue.use(Navigation, { router });
    Vue.use(vueWechatTitle);
  },
};

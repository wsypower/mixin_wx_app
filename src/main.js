/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   main.js                                                   :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/08 22:13:08 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/08 22:13:08 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

//
// ─── BASIC ──────────────────────────────────────────────────────────────────────
//

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "amfe-flexible";
import "assets/iconfont/iconfont.css";
//
// ─── PLUGINS ────────────────────────────────────────────────────────────────────
//

import Plugins from "@/plugins";
Vue.use(Plugins);

import vuescroll from 'vuescroll';

// 你可以在这里设置全局配置
Vue.use(vuescroll, {
    ops: {
        bar: {
            background: '#c1c1c1',
            size: '3px',
            opacity: 0
        }
    },
    name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
});
// Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

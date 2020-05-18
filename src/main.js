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
import VuePageStack from 'vue-page-stack';

// vue-router is necessary
Vue.use(VuePageStack, { router }); 
// use plugin
//
// ─── PLUGINS ────────────────────────────────────────────────────────────────────
//

import Plugins from "@/plugins";
Vue.use(Plugins);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

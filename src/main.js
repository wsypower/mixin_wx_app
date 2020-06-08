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
import "assets/iconfont/iconfont.css";
// import "assets/fontFamily/font.css";

import vueFiltersDate from '@/filters/moment/main'
Vue.use(vueFiltersDate)

import FastClick from "fastclick";
FastClick.attach(document.body);

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
import Vconsole from 'vconsole'
let vConsole = new Vconsole()
Vue.use(vConsole)
// Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
  created(){
    this.$store.commit('updateSystem', navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1)
  }
}).$mount("#app");

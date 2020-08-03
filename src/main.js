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

import animated from 'animate.css'
Vue.use(animated)

import vueFiltersDate from '@/filters/moment/main'
Vue.use(vueFiltersDate)

import FastClick from "fastclick";
// FastClick.attach(document.body);
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    if (FastClick) {
      FastClick.attach(document.body);
    }
  }, false);
}
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

//
// ─── PLUGINS ────────────────────────────────────────────────────────────────────
//

import Plugins from "@/plugins";
Vue.use(Plugins);

// import vuescroll from 'vuescroll';
// // 你可以在这里设置全局配置
// Vue.use(vuescroll, {
//     ops: {
//         bar: {
//             background: '#c1c1c1',
//             size: '3px',
//             opacity: 0
//         }
//     },
//     name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
// });

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

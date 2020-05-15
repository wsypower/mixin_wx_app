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
import { getURLParameters } from '@/utils/index';
import { AccountLogin } from '@/api/account/login.js';
// Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted(){
    this.$store.commit('updateSystem', navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1)
    let token = getURLParameters('userid');
    console.log('token', token);
    console.log(this);
    const data =  this.getToken(token)
    console.log(data)

    console.log(3)
  },
    method:{
         getToken(token){
            console.log(token)
            return 123
        }
    }
}).$mount("#app");
// new Promise(async (resolve, reject) => {
//     const data = await AccountLogin({token: token});
//     console.log(2)
//     // await AccountLogin({token: token})
//     //     .then(async res => {
//     //         console.log('res', res);
//     //         await this.$store.commit('updateUserId', '6');
//     //         resolve(res)
//     //     })
//     //     .catch(err => {
//     //         console.log(err)
//     //         reject(err)
//     //     })
// })
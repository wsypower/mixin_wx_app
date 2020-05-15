/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   index.js                                                  :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/11 21:45:36 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/11 21:45:36 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});

export default new Vuex.Store({
  state: {
      isWX: true, //是否是微信，
      token: '', //用户原始登入有效期的唯一标识
      userId: '', //养犬管理的用户UserId
  },
  getters: {
      isWX: state => {
          return state.isWX
      },
      userId: state => {
          return state.userId
      }
  },
  mutations: {
      // 设置目前是否处于微信内打开
      updateSystem(state, isWX) {
          state.isWX = isWX;
      },
      // 设置目前是否处于微信内打开
      updateToken(state, token) {
          state.token = token;
      },
      // 设置目前是否处于微信内打开
      updateUserId(state, userId) {
          state.userId = userId;
      },
  },
  actions: {},
  modules,
});

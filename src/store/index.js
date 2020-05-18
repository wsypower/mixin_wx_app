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
      isWX: true, // 是否是微信，
      token: '', // 用户原始登入有效期的唯一标识
      userId: 'xxx', // 养犬管理的用户UserId
      originLon: '120.57', // 经度
      originLat: '30.00', // 纬度
  },
  getters: {
      isWX: state => {
          return state.isWX
      },
      userId: state => {
          return state.userId
      },
      originLon: state => {
          return state.originLon
      },
      originLat: state => {
          return state.originLat
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
      // 设置经度
      updateOriginLon(state, originLon) {
          state.originLon = originLon;
      },
      // 设置纬度
      updateOriginLat(state, originLat) {
          state.originLat = originLat;
      },
  },
  actions: {},
  modules,
});

/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   wechatAuth.js                                             :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/06/10 23:44:12 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/06/10 23:44:12 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

import axios from "axios";
import qs from "qs";
import router from "@/router";
import store from "@/store";
import wechatStore from "./store";
import wx from "weixin-js-sdk";
class VueWechat {
  constructor() {
    this.jsToken = null;
    this.wechatId = null;
    this.debug = true;
  }
  // ====================================================== //
  // ======================= vue插件插槽 ====================== //
  // ====================================================== //
  install(
    Vue,
    { wechatId = "af21e2c0033e11e96b2df410224d169f", debug = false } = {}
  ) {
    this.init(wechatId, debug);
  }
  // ====================================================== //
  // ========================= 初始化 ======================== //
  // ====================================================== //
  init(wechatId, debug) {
    this.setWechatId(wechatId);
    this.debug = debug;
    this.wechatStore();
    // 用路由钩子注册阻塞页面加载
    this.interceptRouter();
  }
  // 设置wechatId
  setWechatId(wechatId) {
    this.wechatId = wechatId;
  }
  // 设置JsToken
  setJsToken(jsToken) {
    this.jsToken = jsToken;
  }
  // ====================================================== //
  // ======================= request ======================= //
  // ====================================================== //
  /**
   * @description
   * 请求wxJsSdk签名
   * @author wsy
   * @date 2020-06-08  18:40:12
   */
  requestJsdkM() {
    return axios
      .post(
        "http://192.168.71.33:8369/wechat/stage/jump/getJsdkMd",
        qs.stringify({
          url: encodeURIComponent(location.href.split("#")[0]),
          wechatId: this.wechatId,
        })
      )
      .then(function({ data: { flag, jsToken } }) {
        if (flag) {
          return jsToken;
        } else {
          throw new Error("error");
        }
      })
      .catch(function(error) {
        return error;
      });
  }
  // ====================================================== //
  // ======================= router ======================= //
  // ====================================================== //
  interceptRouter() {
    router.beforeEach(async (to, from, next) => {
      // 获取登录状态
      const { loginStatus } = store.state.wechat;
      // 请求鉴权和js-sdk签名
      switch (loginStatus) {
        case 0:
          await store.dispatch("wechat/setLoginStatus", 1);
          break;
        case 1:
          try {
            const jsToken = await this.requestJsdkM();
            await this.wxConfig(jsToken, this.debug);
            console.log("鉴权结束");
            await store.dispatch("wechat/setJsToken", jsToken);
            this.setJsToken(jsToken);
            next();
            return true;
          } catch (err) {
            await store.dispatch("wechat/setLoginStatus", 0);
            console.error("Error", err);
            next();
          }
          break;
        case 2:
          next();
          break;
        default:
          break;
      }
      next();
    });
  }
  // ====================================================== //
  // ======================== store ======================= //
  // ====================================================== //
  wechatStore() {
    store.registerModule("wechat", wechatStore);
  }
  // ====================================================== //
  // ======================= wx权限配置 ======================= //
  // ====================================================== //
  wxConfig(jsToken, debug) {
    console.log(jsToken);
    return new Promise((resolve, reject) => {
      wx.config(
        Object.assign(jsToken, {
          debug,
        })
      );
      wx.ready(function() {
        resolve();
        console.log("鉴权成功");
      });
      wx.error(function(res) {
        reject(res);
      });
    });
  }
}

const VueWechatPlugin = new VueWechat();

export default VueWechatPlugin;

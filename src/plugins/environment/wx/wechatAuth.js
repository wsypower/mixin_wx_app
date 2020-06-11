/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   wechatAuth.js                                             :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/06/10 23:44:12 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/06/11 17:26:01 by wsy                  ########## ########   ######## ###########         */
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
    this.wechatId = null;
    this.debug = true;
    this.jsApiList = [];
  }
  // ====================================================== //
  // ======================= vue插件插槽 ====================== //
  // ====================================================== //
  install(
    Vue,
    { wechatId = "af21e2c0033e11e96b2df410224d169f", debug = false } = {}
  ) {
    // ---- 如果是微信环境才会执行初始化 ---- //
    this.isWx() && this.init(wechatId, debug);
  }
  // ====================================================== //
  // ========================= 初始化 ======================== //
  // ====================================================== //
  init(wechatId, debug, jsApiList = ["chooseImage"]) {
    this.wechatId = wechatId;
    this.debug = debug;
    this.jsApiList = jsApiList;
    // ----- 动态生成一个store模块 ---- //
    this.wechatStore();
    // ----- 用路由钩子注册阻塞页面加载 ---- //
    this.interceptRouter();
  }
  // ====================================================== //
  // ====================== 判断是否是微信环境 ===================== //
  // ====================================================== //
  isWx() {
    if (typeof navigator === "undefined") {
      return;
    }
    var ua = navigator.userAgent.toLowerCase();
    return !!~ua.indexOf("micromessenger");
  }
  // ====================================================== //
  // ================== router 做鉴权拦截==================== //
  // ====================================================== //
  interceptRouter() {
    router.beforeEach(async (to, from, next) => {
      // -------- 获取登录状态 -------- //
      const { loginStatus } = store.state.wechat;
      // ----- 请求鉴权和js-sdk签名 ---- //
      switch (loginStatus) {
        case 1:
          next();
          break;
        case 0:
          try {
            // ~~~~~~~~~~~~~~~~~ 开始鉴权 ~~~~~~~~~~~~~~~~ //
            const authentication = await this.requestWxConfig();
            // ~~~~~~~~~~ 成功跳转，否则跳转入请关注公众号页面 ~~~~~~~~~ //
            authentication && next();
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
  // ====================== 动态添加store ===================== //
  // ====================================================== //
  wechatStore() {
    store.registerModule("wechat", wechatStore);
  }
  // ====================================================== //
  // ======================= 请求鉴权签名 ======================= //
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
        "http://wyf.vipgz4.idcfengye.com/wechat/stage/jump/getJsdkMd",
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
  // ======================= wx权限配置 ======================= //
  // ====================================================== //
  /**
   * @description
   * 请求wx-js
   * @author wsy
   * @date 2020-06-11  16:57:18
   */
  async requestWxConfig() {
    // 获取鉴权参数
    const jsToken = await this.requestJsdkM();
    await store.dispatch("wechat/setJsToken", jsToken);
    const { appId, timestamp, noncestr, signature } = jsToken;
    return new Promise((resolve, reject) => {
      wx.config({
        appId,
        timestamp,
        nonceStr: noncestr,
        signature,
        debug: this.debug,
        jsApiList: this.jsApiList,
      });
      wx.ready(async function() {
        resolve(true);
        await store.dispatch("wechat/setLoginStatus", 1);
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

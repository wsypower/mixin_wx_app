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
            await store.dispatch("wechat/setJsToken", jsToken);
            this.setJsToken(jsToken);
            await this.wxConfig(jsToken, this.debug);
            console.log("鉴权结束");
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
        /* 
         config信息验证后会执行ready方法
         所有接口调用都必须在config接口获得结果之后
         config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口
         则须把相关接口放在ready函数中调用来确保正确执行。
         对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
       */
        resolve();
        console.log("鉴权成功");
      });
      wx.error(function(res) {
        /* 
         config信息验证失败会执行error函数
         如签名过期导致验证失败
         具体错误信息可以打开config的debug模式查看，
         也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        */
        reject(res);
      });
    });
  }
}

const VueWechatPlugin = new VueWechat();

export default VueWechatPlugin;

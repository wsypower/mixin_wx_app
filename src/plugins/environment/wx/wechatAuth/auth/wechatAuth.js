/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   wechatAuth.js                                             :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/06/02 16:25:11 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/06/02 16:29:21 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

import qs from "qs";

// ====================================================== //
// ======================== 应用授权 ======================== //
// ====================================================== //
/**
 *  授权类型
 * @description
 * [snsapi_base] 不弹出授权页面，直接跳转，只能获取用户openid
 * [snsapi_userinfo] 弹出授权页面，可通过openid拿到昵称、性别、所在地,并且，即使在未关注的情况下，只要用户授权，也能获取其信息
 * @author wsy
 * @date 2020-06-02  16:25:18
 */
const SCOPES = ["snsapi_base", "snsapi_userinfo"];

// ====================================================== //
// ================= VueWechatAuthPlugin ================ //
// ====================================================== //
/**
 * @description
 * @author wsy
 * @date 2020-06-02  16:26:40
 */
class VueWechatAuthPlugin {
  constructor() {
    this.appid = null;
    this.redirect_uri = null;
    this.scope = SCOPES[0];
    this._code = null;
    this._redirect_uri = null;
  }
  // Vue 插件接口
  install(Vue, options) {
    const wechatAuth = this;
    this.setAppId(options.appid);
    Vue.mixin({
      created() {
        this.$wechatAuth = wechatAuth;
      },
    });
  }

  static makeState() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }

  setAppId(appid) {
    this.appid = appid;
  }

  set redirect_uri(redirect_uri) {
    this._redirect_uri = encodeURIComponent(redirect_uri);
  }

  get redirect_uri() {
    return this._redirect_uri;
  }

  get state() {
    return localStorage.getItem("wechat_auth:state");
  }

  set state(state) {
    localStorage.setItem("wechat_auth:state", state);
  }

  get authUrl() {
    if (this.appid === null) {
      throw "appid must not be null";
    }
    if (this.redirect_uri === null) {
      throw "redirect uri must not be null";
    }
    this.state = VueWechatAuthPlugin.makeState();
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect`;
  }

  returnFromWechat(redirect_uri) {
    const parsedUrl = qs.parse(redirect_uri.split("?")[1]);
    if (process.env.NODE_ENV === "development") {
      this.state = null;
      this._code = parsedUrl.code;
    } else {
      if (this.state === null) throw "You did't set state";
      if (parsedUrl.state === this.state) {
        this.state = null;
        this._code = parsedUrl.code;
      } else {
        this.state = null;
        throw `Wrong state: ${parsedUrl.state}`;
      }
    }
  }

  get code() {
    if (this._code === null) throw "Not get the code from wechat server!";
    const code = this._code;
    this._code = null;
    return code;
  }
}

const vueWechatAuthPlugin = new VueWechatAuthPlugin();

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueWechatAuthPlugin);
}

export default vueWechatAuthPlugin;

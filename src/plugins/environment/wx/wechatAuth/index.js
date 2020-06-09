import Vue from "vue";
import qs from "qs";
import router from "@/router";
import store from "@/store";
import wechatAuthSore from "./store";
import CommonServer from "./request/request";
import wechatAuth from "./auth/wechatAuth";
import WX_CONFIG from "../../config";

Vue.use(wechatAuth, {
  appid: WX_CONFIG.appID,
});

store.registerModule("wechatAuth", wechatAuthSore);

router.beforeEach(async (to, from, next) => {
  const { loginStatus } = store.state.wechatAuth;
  switch (loginStatus) {
    case 0:
      wechatAuth.redirect_uri = processUrl();
      await store.dispatch("wechatAuth/setLoginStatus", 1);
      // window.location.href = wechatAuth.authUrl;
      break;
    case 1:
      try {
        wechatAuth.returnFromWechat(window.location.search);
        await processLogin(wechatAuth.code);
        next();
      } catch (err) {
        await store.dispatch("wechatAuth/setLoginStatus", 0);
        next();
      }
      break;
    case 2:
      next();
      break;
    default:
      break;
  }
});

/**
 * 处理url链接
 * @returns {string}
 */
function processUrl() {
  const url = window.location.href;
  // 解决多次登录url添加重复的code与state问题
  const urlParams = qs.parse(url.split("?")[1]);
  let redirectUrl = url;
  if (urlParams.code && urlParams.state) {
    delete urlParams.code;
    delete urlParams.state;
    const query = qs.stringify(urlParams);
    if (query.length) {
      redirectUrl = `${url.split("?")[0]}?${query}`;
    } else {
      redirectUrl = `${url.split("?")[0]}`;
    }
  }
  return redirectUrl;
}

/**
 * 处理登录
 * @param code
 * @returns {Promise<any>}
 */
function processLogin(code) {
  const data = {
    code,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const token = await CommonServer.login(data);
      console.log(token);

      // await store.dispatch("wechatAuth/setLoginStatus", 2);
      // await store.dispatch("wechatAuth/setAccessToken", accessToken);
      // await store.dispatch("wechatAuth/setUserInfo", userInfo);

      resolve({
        status: 1,
        data: "登录成功",
      });
    } catch (err) {
      reject(err);
    }
  });
}

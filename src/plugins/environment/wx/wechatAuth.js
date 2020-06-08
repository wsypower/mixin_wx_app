import axios from "axios";
import qs from "qs";
import router from "@/router";
class VueWechat {
  constructor() {
    this.jsToken = null;
    this.wechatId =null
  }
  async install(Vue, { wechatId = "af21e2c0033e11e96b2df410224d169f" } = {}) {
    this.wechatId = wechatId
    this.interceptRouter();
  }
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
  // 设置JsToken
  static setJsToken(jsToken) {
    this.jsToken = jsToken;
  }
  interceptRouter() {
    router.beforeEach(async (to, from, next) => {
      console.log(to)
      // 请求鉴权和js-sdk签名
      const jsToken = await this.requestJsdkM();
      console.log(jsToken);
      this.setJsToken = jsToken;
      next();
    });
  }
}

const VueWechatPlugin = new VueWechat();

export default VueWechatPlugin;

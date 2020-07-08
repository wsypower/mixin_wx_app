import WxJSApi from "./wx";
// import { hesc } from "hesc-jsapi";
import hescJSApi from "./hesc";
// 浏览器环境
const environment = {
  micromessenger: WxJSApi,
  hesc: hescJSApi,
};

class Native {
  constructor() {
    this.env = null;
    this.inti();
    console.log(this.env);
  }
  inti() {
    this.env = this.isNavigator();
  }
  // ====================================================== //
  // ====================== 获取地理位置接口 ====================== //
  // ====================================================== //
  getLocation({ type = "wgs84" } = {}) {
    return this.env.getLocation({ type: type });
  }
  // ====================================================== //
  // ======================== 调用相册 ======================== //
  // ====================================================== //
  /**
   * @description
   * @author wsy
   * @date 2020-06-30  16:29:59
   * @param {Number} count 上传数量限制
   * @param {String} url 附件服务器地址
   */
  album({
    count = 9,
    url = "http://192.168.71.33:50000/file/file/uploadBase64",
  } = {}) {
    return this.env.album({ count, url });
  }
  // ====================================================== //
  // ======================== 调用相机 ======================== //
  // ====================================================== //
  camera({ url = "http://192.168.71.33:50000/file/file/uploadBase64" } = {}) {
    return this.env.camera({ url });
  }
  // ====================================================== //
  // ============== 自定义“分享给朋友”及“分享到QQ”按钮的分享内容 ========== //
  // ====================================================== //

  updateAppMessageShareData({
    title = "", // 分享标题
    desc = "", // 分享描述
    link = "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl = "", // 分享图标
  } = {}) {
    return this.env.updateAppMessageShareData({
      title,
      desc,
      link,
      imgUrl,
    });
  }
  // ====================================================== //
  // ============ 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容 ============ //
  // ====================================================== //
  updateTimelineShareData({
    title = "", // 分享标题
    link = "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl = "", // 分享图标
  } = {}) {
    return new Promise((resolve, reject) => {
      this.env.ready(() => {
        this.env
          .updateTimelineShareData({
            title,
            link,
            imgUrl,
          })
          .then((res) => {
            resolve(res);
          });
      });
    });
  }
  // ====================================================== //
  // ================== 判断环境并返回当前环境的jsApi ============= //
  // ====================================================== //
  isNavigator() {
    if (typeof navigator === "undefined") return;
    var ua = navigator.userAgent.toLowerCase();
    return this._transform(
      environment,
      (previous, current) =>
        !!~ua.indexOf(current) ? environment[current] : previous,
      environment["hesc"]
    );
  }
  // ====================================================== //
  // ======================== 私有方法 ======================== //
  // ====================================================== //;
  /**
   * @description
   * 对累加器和对象属性应用函数
   * @author wsy
   * @date 2020-06-29  16:52:39
   */
  _transform(obj, fn, acc) {
    return Object.keys(obj).reduce((a, k) => fn(a, k, obj), acc);
  }
}
const native = new Native();
export default native;

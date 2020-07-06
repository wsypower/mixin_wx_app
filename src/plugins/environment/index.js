import WxJSApi from "./wx";
import { hesc } from "hesc-jsapi";
// 浏览器环境
const environment = {
  micromessenger: WxJSApi,
  hesc: hesc,
};

class Native {
  constructor() {
    this.env = null;
    this.inti();
    console.log("this.env", this.env);
  }
  inti() {
    this.env = this.isNavigator();
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
  camera({ url = "http://192.168.71.33:50000/file/file/uploadBase64" } = {}) {
    return this.env.camera({ url });
  }

  // ====================================================== //
  // ======================== 调用相机 ======================== //
  // ====================================================== //
  // 判断环境并返回当前环境的jsApi
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
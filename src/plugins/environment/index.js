import WxJSApi from "./wx";
import hescJSApi from "./hesc";

// 浏览器环境
const environment = {
  micromessenger: WxJSApi,
  hesc: hescJSApi,
};

/**
 * @description
 * 返回一个符合环境的父类
 * @author wsy
 * @date 2020-07-09  18:26:21
 */

const isNavigator = () => {
  if (typeof navigator === "undefined") return;
  var ua = navigator.userAgent.toLowerCase();
  return _transform(
    environment,
    (previous, current) =>
      !!~ua.indexOf(current) ? environment[current] : previous,
    environment["hesc"]
  );
};
/**
 * @description
 * 对累加器和对象属性应用函数
 * @author wsy
 * @date 2020-06-29  16:52:39
 */

const _transform = (obj, fn, acc) => {
  return Object.keys(obj).reduce((a, k) => fn(a, k, obj), acc);
};
const DevSupConstructor = isNavigator();
class Native extends DevSupConstructor {
  constructor() {
    super();
  }
  // ====================================================== //
  // ====================== 获取地理位置接口 ====================== //
  // ====================================================== //
  ty_getLocation({ type = "wgs84" } = {}) {
    return super.getLocation({ type: type });
  }
  // ====================================================== //
  // ======================= 拍照和打开相册 ====================== //
  // ====================================================== //
  ty_chooseImage({
    count = 9,
    url = "http://192.168.71.33:50000/file/file/uploadBase64",
  } = {}) {
    return super.wx_chooseImage({ count, url });
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
  ty_album({
    count = 9,
    url = "http://192.168.71.33:50000/file/file/uploadBase64",
  } = {}) {
    return super.album({ count, url });
  }
  // ====================================================== //
  // ======================== 调用相机 ======================== //
  // ====================================================== //
  ty_camera({
    url = "http://192.168.71.33:50000/file/file/uploadBase64",
  } = {}) {
    return super.camera({ url });
  }
  // ====================================================== //
  // ============== 自定义“分享给朋友”及“分享到QQ”按钮的分享内容 ========== //
  // ====================================================== //

  ty_updateAppMessageShareData({
    title = "", // 分享标题
    desc = "", // 分享描述
    link = "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl = "", // 分享图标
  } = {}) {
    return super.updateAppMessageShareData({
      title,
      desc,
      link,
      imgUrl,
    });
  }
  // ====================================================== //
  // ============ 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容 ============ //
  // ====================================================== //
  ty_updateTimelineShareData({
    title = "", // 分享标题
    link = "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl = "", // 分享图标
  } = {}) {
    return new Promise((resolve, reject) => {
      super.ready(() => {
        super
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
}
const native = new Native();
export default native;

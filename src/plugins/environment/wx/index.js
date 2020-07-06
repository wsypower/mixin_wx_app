import wx from "weixin-js-sdk";
import axios from "axios";
import qs from "qs";
// 需要变为promise的方法
const asyncMethods = ["chooseImage", "getLocalImgData"];

class WxPro {
  constructor(wx) {
    this.wx = wx;
    this.init();
  }
  init() {
    this._promisifyAll();
  }
  /**
   * @description
   * 手机相册中选图接口
   * @author wsy
   * @date 2020-06-28  17:08:51
   */
  album({ count, url } = {}) {
    return new Promise((resolve, reject) => {
      return this.mediaSelect("album", { count, url })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  //
  /**
   * @description
   * 拍照选图接口
   * @author wsy
   * @date 2020-06-28  17:08:51
   */
  camera({ count = 1, url } = {}) {
    return new Promise((resolve, reject) => {
      return this.mediaSelect("camera", { count, url })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /**
   * @description
   * 拍照或从手机相册中选图接口
   * @author wsy
   * @date 2020-06-28  17:08:51
   */
  async mediaSelect(media, { count, url } = {}) {
    try {
      // 获取微信本地localIds数组
      const { localIds } = await this._wx_album(count, media);
      // 调用微信格式转换 将id转为base64
      const base64Images = await this._wx_Base64(localIds);
      // 并发处理上传服务器
      const imgDataBase = base64Images.map((base64Image) => {
        return this._request(url, qs.stringify({ base64Data: base64Image }));
      });
      const result = await Promise.all(imgDataBase);
      return result.map((imgs) => imgs[0]);
    } catch (error) {
      throw new Error(error);
    }
  }
  // ====================================================== //
  // ======================== 私有方法 ======================== //
  // ====================================================== //
  /**
   * @description
   * 附件服务器请求
   */
  _request(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        url,
        data,
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  }
  /**
   * @description
   * wx相册选择、相机
   * @param { Number } count
   */
  _wx_album(count, media = "album") {
    // 等待徐图片选择完毕，取得localIds数组
    let mediaSelect = media === "album" ? ["album"] : ["camera"];
    return this.chooseImage({
      count: count, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: mediaSelect, // 可以指定来源是相册还是相机，默认二者都有
    });
  }
  /**
   * @description
   * 转换为base64
   */
  async _wx_Base64(localIds) {
    try {
      const baseImagesResult = [];
      for (let i = 0; i < localIds.length; i++) {
        const { localData } = await this.getLocalImgData({
          localId: localIds[i],
        });
        //判断是否有这样的头部
        // ios/安卓适配
        if (localData.indexOf("data:image") != 0) {
          localData += "data:image/jpg;base64,";
        }
        baseImagesResult.push(localData);
      }
      return baseImagesResult;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description
   * 将需要promise化的属性放入asyncMethods中,自动修改为promise Api
   * (注：因为有些元素不需要promise化,如wx.ready 、wx.error等)
   * @author wsy
   * @date 2020-06-28  16:56:49
   */
  _promisifyAll() {
    Object.keys(this.wx).forEach((key) => {
      if (!!~asyncMethods.indexOf(key)) {
        this[key] = this._promisify(this.wx[key]);
      } else {
        this[key] = this.wx[key];
      }
    });
  }
  /**
   * @description
   * 回调函数promise化
   * @author wsy
   * @date 2020-06-28  16:44:01
   */
  _promisify(original) {
    return (args = {}) => {
      return new Promise((resolve, reject) => {
        original({
          // fail: reject,
          fail: reject,
          // success: resolve,
          success: resolve,
          ...args,
        });
      });
    };
  }
}
const WxJSApi = new WxPro(wx);
export default WxJSApi;

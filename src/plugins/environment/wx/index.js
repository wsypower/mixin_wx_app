import wx from "weixin-js-sdk";

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
   * 拍照或从手机相册中选图接口
   * @author wsy
   * @date 2020-06-28  17:08:51
   *
   * ------------------------------------------
   * TODO：
   * 本想用Promise.all 做并发处理getLocalImgData，但是发现就没返回值
   * @example
   * const imgDataBase = localIds.map((id) => {
   *  return this.getLocalImgData({ localId: id });
   * });
   * const result = await Promise.all(imgDataBase);
   *
   * --------------------------------------------
   */
  // 192.168.33:9000/file/file/uploadBase64,//uploadBase64
  async album({ count } = {}) {
    try {
      const { localIds } = await this._wx_album(count);
      const base64Images = await this._wx_Base64(localIds);
      console.log("result=======>", base64Images);
    } catch (error) {
      console.log(error);
    }
  }

  // ====================================================== //
  // ======================== 私有方法 ======================== //
  // ====================================================== //
  /**
   * @description
   * 网络请求
   */
  _request() {}
  /**
   * @description
   * wx相册选择
   * @param { Number } count
   */
  _wx_album(count) {
    // 等待徐图片选择完毕，取得localIds数组
    return this.chooseImage({
      count: count, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
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

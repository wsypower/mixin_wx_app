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
   * 本想用Promise.all 做并发处理，但是发现就没返回值
   * @example
   * const imgDataBase = localIds.map((id) => {
   *  return this.getLocalImgData({ localId: id });
   * });
   * const result = await Promise.all(imgDataBase);
   *
   * --------------------------------------------
   */
  async camera({ count } = {}) {
    try {
      // 等待徐图片选择完毕，取得localIds数组
      const { localIds } = await this.chooseImage({
        count: count, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
      });
      // localIds数组变为获取本地图片的promise函数在promise.all中做并发处理;
      const baseImagesResult = [];
      for (let i = 0; i < localIds.length; i++) {
        const res = await this.getLocalImgData({ localId: localIds[i] });
        baseImagesResult.push(res);
      }

      console.log("result=======>", baseImagesResult);
    } catch (error) {
      console.log(error);
    }
  }
  // ====================================================== //
  // ======================== 私有方法 ======================== //
  // ====================================================== //
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

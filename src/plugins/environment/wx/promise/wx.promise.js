import wx from "weixin-js-sdk";
import def from "@/settings.js";
// 需要变为promise的方法,默认取得settings中的api调用
const asyncMethods = def.wx["jsApiList"];

/**
 * @description
 * WxTransformPromise
 * 将wx对象的方法promise化添加到WxTransformPromise的原型上
 */

class WxTransformPromise {
  constructor() {
    this.init();
  }
  init() {
    this._promisifyAll();
  }
  /**
   * @description
   * 将需要promise化的属性放入asyncMethods中,自动修改为promise Api
   * (注：因为有些元素不需要promise化,如wx.ready 、wx.error等)
   * @author wsy
   * @date 2020-06-28  16:56:49
   */
  _promisifyAll() {
    Object.keys(wx).forEach((key) => {
      if (!!~asyncMethods.indexOf(key)) {
        WxTransformPromise.prototype[key] = this._promisify(wx[key]);
      } else {
        WxTransformPromise.prototype[key] = wx[key];
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

export default WxTransformPromise;

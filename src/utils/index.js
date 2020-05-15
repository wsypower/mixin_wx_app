/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   index.js                                                  :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/08 21:09:57 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/08 21:09:57 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

// 防抖
export function debounce(func, wait, immediate = true) {
  let timer = null;
  const _debounce = function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      if (!timer) {
        // null
        func.apply(this, args);
      }
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait);
    }
  };
  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return _debounce;
}

// 节流
export function throttle(func, wait, options = {}) {
  let timer = null;

  const _throttle = function (...args) {
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait);
    }
  };
  return _throttle;
}

/**
 * @description 获取网址参数
 * @author weiyafei
 * @date 2019-06-28-15:00:04
 * @param {String} 网址
 * @returns {Object} 参数对象
 */
export function getURLParameters(prop) {
    let params = {},
        query = window.location.search.length > 0 ? window.location.search.substring(1) : '',
        arr = query.split('&'),
        rt
    for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i],
            tmp = item.split('='),
            key = tmp[0],
            val = tmp[1]
        if (typeof params[key] == 'undefined') {
            params[key] = val
        } else if (typeof params[key] == 'string') {
            params[key] = [params[key], val]
        } else {
            params[key].push(val)
        }
    }
    rt = prop ? params[prop] : params
    return rt
}

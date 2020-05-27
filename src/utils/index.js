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
    let qP = window.location.hash.indexOf('?')>=0 ? window.location.hash.substring(window.location.hash.indexOf('?')+1) : '';
    let params = {},
        query = window.location.search.length > 0 ? window.location.search.substring(1) : qP,
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

/**
 * Date 转化为指定格式的String<br>
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)可以用 1-2 个占位符<br>
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * @param {string} date
 * @param {string} fmt
 * @returns {string}
 * @example
 *
 * formatDate(Date.now(), 'yyyy-MM-dd hh:mm:ss.S');
 * // => 2006-07-02 08:09:04.423
 *
 * formatDate(Date.now(), 'yyyy-MM-dd E HH:mm:ss');
 * // => 2009-03-10 二 20:09:04
 *
 * formatDate(Date.now(), 'yyyy-MM-dd EE hh:mm:ss');
 * // => 2009-03-10 周二 08:09:04
 *
 * formatDate(Date.now(), 'yyyy-MM-dd EEE hh:mm:ss');
 * // => 2009-03-10 星期二 08:09:04
 *
 * formatDate(Date.now(), 'yyyy-M-d h:m:s.S')
 * // => 2006-7-2 8:9:4.18
 */
export function formatDate(date, fmt) {
    if (date === void 0) date = new Date();
    if (fmt === void 0) fmt = "yyyy-MM-dd HH:mm:ss";

    date =
        typeof date === "number" || typeof date === "string"
            ? new Date(date)
            : date;

    var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d",
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }

    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (RegExp.$1.length > 1
                ? RegExp.$1.length > 2
                    ? "\u661f\u671f"
                    : "\u5468"
                : "") + week[date.getDay() + ""]
        );
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }

    return fmt;
}

/**
 * 最近一周、一月、一年的日期计算
 * ****/
export function getDay(day){

    var today = new Date();

    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;

    today.setTime(targetday_milliseconds); //注意，这行是关键代码

    var tYear = today.getFullYear();

    var tMonth = today.getMonth();

    var tDate = today.getDate();

    tMonth = doHandleMonth(tMonth + 1);

    tDate = doHandleMonth(tDate);

    return tYear+"-"+tMonth+"-"+tDate;

}
function doHandleMonth(month){

    var m = month;

    if(month.toString().length == 1){

        m = "0" + month;

    }

    return m;

}
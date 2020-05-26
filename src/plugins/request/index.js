/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   axios.js                                                  :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/08 21:54:40 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/08 21:54:40 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */
"use strict";
import Vue from "vue";
import axios from "axios";

// ##################################################################### //
// ############################ axios默认请求头配置 ########################### //
// ##################################################################### //
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
//
// ##################################################################### //
// ########################### axios config配置 ########################## //
// ##################################################################### //
let config = {
  baseURL: URL_CONFIG.baseURL,
  timeout: 60 * 1000, // 请求超时时间
  //TODO:只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  //修改请求数据添加必填项 userId
  // transformRequest: [
  //   function(data = {}) {
  //     //对 data 进行任意转换处理 => 转为fromData(按照实际后台约定修改转换)
  //     return Qs.stringify(data, { arrayFormat: "repeat" });
  //   },
  // ],
  // //TODO:必须是一个无格式对象(plain object)或 URLSearchParams 对象(GET)
  // paramsSerializer: function(params) {
  //   return Qs.stringify(params, { arrayFormat: "brackets" });
  // },
};

// ##################################################################### //
// ############################# 创建axios实例 ############################# //
// ##################################################################### //;
const service = axios.create(config);

// ##################################################################### //
// ############################### 请求拦截器 ############################### //
// ##################################################################### //
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 执行请求错误后的操作
    // 发送失败
    console.log(error);
    return Promise.reject(error);
  }
);

// ##################################################################### //
// ############################### 响应拦截器; ############################## //
// ##################################################################### //
service.interceptors.response.use(
  // ====================================================== //
  // ======================= 正确响应数据 ======================= //
  // ====================================================== //
  (response) => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data;
    // 这个状态码是和后端约定的（默认值为防止外部接口没有code，导致值为undefined）
    const { code = 111 } = dataAxios;
    // 根据 code 进行判断
    switch (code >>> 0) {
      case 111:
        // [ 示例 ] code === 111 代表code不存在，为外部接口直接返回结果
        return dataAxios;
      case 0:
        // [ 示例 ] code === 0 代表成功
        return dataAxios.result;
      case 401:
        // [ 示例 ] code === 401 代表没有权限
        break;
      default:
        // 不是正确的 code
        break;
    }
  },
  // ====================================================== //
  // ===================== 对错误响应数据的操作 ===================== //
  // ====================================================== //
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          error.message = "未授权，请联系管理员";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

// ##################################################################### //
// ####################### Vue prototype 上挂载axios ###################### //
// ##################################################################### //

service.install = function(Vue, options) {
  Vue.axios = service;
  window.axios = service;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return service;
      },
    },
    $axios: {
      get() {
        return service;
      },
    },
  });
};

export default service;

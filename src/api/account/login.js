/*
 * @Author: wei.yafei
 * @Date: 2019-06-27 21:26:07
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-07-19 17:05:33
 */

import request from '@/plugins/request/index'


/**
 * @description 登录获取用户信息和权限
 * @author weiyafei
 * @date 2019-06-27-21:25:58
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const AccountLogin = data => {
  return request({
    url: `/dogOwner/getUserId/${data.token}`,
    method: 'post'
  })
}


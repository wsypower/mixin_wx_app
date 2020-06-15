/*
 * @Author: moxuejuan
 * @Date: 2020-05-15 15:21
 */

import request from '@/plugins/request/index'


/**
 * @description 登录获取用户信息userId
 * @author weiyafei
 * @date 2019-06-27-21:25:58
 * @param {String} userId 请求参数 :城市管家的UserId
 */
export const AccountLogin = data => {
  return request({
    url: `/dogOwner/getUserId/${data.token}`,
    method: 'post'
  })
}


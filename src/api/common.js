/*
 * @Author: moxujuan
 * @Date: 2020-05-15
 */

import request from '@/plugins/request/index'

/**
 * @description 获取区县、街道、社区数据
 * @author moxuejuan
 * @date 2020-05-15 12:04
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryAddressByParentId = data => {
    return request({
        url: `/dogOrder/queryAddressByParentId/${data.userId}`,
        method: 'post',
        params: data
    })
}

/**
 * @description 获取免疫地点数据
 * @author moxuejuan
 * @date 2020-05-19 12:04
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryImmuneSite = data => {
    return request({
        url: `/dogServicePoint/queryImmuneSite/${data.userId}`,
        method: 'post',
        params: data
    })
}


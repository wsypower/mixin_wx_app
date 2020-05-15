/*
 * @Author: moxujuan
 * @Date: 2020-05-15 12:49
 */

import request from '@/plugins/request/index'


/**
 * @description 获取当前用户名下的所有犬证
 * @author moxuejuan
 * @date 2020-05-15 12:49
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryDogCard = data => {
    return request({
        url: `/dogCard/queryDogCard/${data.userId}`,
        method: 'post',
        data
    })
}

/**
 * @description 获取服务点
 * @author moxuejuan
 * @date 2020-05-15 12:49
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryDogServicePoint = data => {
    return request({
        url: `/dogServicePoint/queryDogServicePoint/${data.userId}`,
        method: 'post',
        data
    })
}


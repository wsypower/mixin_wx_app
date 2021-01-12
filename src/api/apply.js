/*
 * @Author: moxujuan
 * @Date: 2020-05-15 12:49
 */

import request from '@/plugins/request/index'

/**
 * @description 每一步的保存操作
 * @author moxuejuan
 * @date 2020-05-15 12:49
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const bidDogCard = data => {
    console.log('bidDogCard',data);
    return request({
        url: `/dogOrder/bidDogCard/${data.userId}`,
        method: 'post',
        data: data
    })
}

/**
 * @description 生成权证编号
 * @author moxuejuan
 * @date 2021-01-11 15:49
 * @param {String} userId 请求参数 :用户唯一标识符默认参数
 * @param {String} id 请求参数 :犬证id
 */
export const dogCardNumberGenerate = data => {
    console.log('dogCardNumberGenerate',data);
    return request({
        url: `/dogCard/dogCardNumberGenerate?id=${data.id}&_t=${new Date().getTime()}`,
        method: 'get',
    })
}

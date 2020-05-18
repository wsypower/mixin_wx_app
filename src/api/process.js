/*
 * @Author: moxujuan
 * @Date: 2020-05-15
 */

import request from '@/plugins/request/index'
import Qs from "qs";

/**
 * @description 根据进度查询列表接口
 * @author moxuejuan
 * @date 2020-05-18 12:04
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const querybidDogCardRecord = data => {
    return request({
        url: `/dogOrder/querybidDogCardRecord/${data.userId}`,
        method: 'post',
        params: data
    })
}

/**
 * @description 根据orderId获取申办详细信息
 * @author moxuejuan
 * @date 2020-05-18 19:04
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryPidDogCard = data => {
    return request({
        url: `/dogOrder/queryPidDogCard/${data.userId}`,
        method: 'post',
        params: data
    })
}

/**
 * @description 根据orderId获取预约详细信息
 * @author moxuejuan
 * @date 2020-05-18 12:04
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
// export const querybidDogCardRecord = data => {
//     return request({
//         url: `/dogOrder/querybidDogCardRecord/${data.userId}`,
//         method: 'post',
//         params: data
//     })
// }


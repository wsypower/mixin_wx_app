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
 * @description 短信发送
 * @author moxuejuan
 * @date 2020-05-20 09:28
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const sendSms = data => {
    console.log('sendSms',data);
    return request({
        url: `/sms/sendSms/${data.userId}`,
        method: 'post',
        params: data
    })
}

/**
 * @description 校验验证码是否正确
 * @author moxuejuan
 * @date 2020-05-20 09:28
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const checkSms = data => {
    console.log('sendSms',data);
    return request({
        url: `/sms/checkSms/${data.userId}`,
        method: 'post',
        params: data
    })
}

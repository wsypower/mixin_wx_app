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
    console.log('checkSms',data);
    return request({
        url: `/sms/checkSms/${data.userId}`,
        method: 'post',
        params: data
    })
}

/**
 * @description 校验身份证号码是否绑定过犬只，规则：一个身份证只能有一只犬
 * @author moxuejuan
 * @date 2020-05-25 14:28
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryDogByOwnerIdCard = data => {
    console.log('queryDogByOwnerIdCard',data);
    return request({
        url: `/dogOwner/queryDogByOwnerIdCard/${data.userId}`,
        method: 'post',
        params: data
    })
}



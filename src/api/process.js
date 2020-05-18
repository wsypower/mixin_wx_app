/*
 * @Author: moxujuan
 * @Date: 2020-05-15
 */

import request from '@/plugins/request/index'
import Qs from "qs";

/**
 * @description 根据类型以及父节点的id获取子节点数据
 * @author moxuejuan
 * @date 2020-05-15 12:04
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const querybidDogCardRecord = data => {
    return request({
        url: `/dogOrder/querybidDogCardRecord/${data.userId}`,
        method: 'post',
        params: data
    })
}


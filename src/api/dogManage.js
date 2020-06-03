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
        params: data
    })
}

/**
 * @description 注销某个犬证
 * @author moxuejuan
 * @date 2020-06-01 18:52
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const dogCardCancelApply = data => {
    return request({
        url: `/dogCard/dogCardCancelApply/${data.userId}`,
        method: 'post',
        data
    })
}

/**
 * @description 二维码分享某个犬只信息
 * @author moxuejuan
 * @date 2020-06-01 19:06
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryDogByQrCode = data => {
    return request({
        url: `/dogCard/queryDogByQrCode`,
        method: 'post',
        params: data
    })
}

/**
 * @description 查询某个犬只所有年审记录
 * @author moxuejuan
 * @date 2020-06-03 08:43
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryYearCarefulRecords = data => {
    return request({
        url: `/dogOrder/queryYearCarefulRecords/${data.userId}`,
        method: 'post',
        params: data
    })
}
import request from '@/plugins/request/index'
/**
 * @description 获取待领养的犬只信息
 * @author moxuejuan
 * @date 2020-05-15 12:49
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryAllAdoptDog = data => {
    return request({
        url: `/dogKnowledge/queryDogAdopt/${data.userId}`,
        method: 'post',
        params: data
    })
}


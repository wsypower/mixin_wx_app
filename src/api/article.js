import request from '@/plugins/request/index'
/**
 * @description 获取所有养犬知识文章
 * @author moxuejuan
 * @date 2020-06-15 12:49
 * @param {String} userId 请求参数 :用户唯一标识符默认参数）
 */
export const queryDogKnowledgeArticle = data => {
    return request({
        url: `/dogCard/queryDogCard/${data.userId}`,
        method: 'post',
        params: data
    })
}
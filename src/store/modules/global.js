export default {
    namespaced: true,
    state: {
        isWX: true, //是否是微信，
        token: '', //用户登入有效期的唯一标识
    },
    getters: {
        isWX: state => {
            return state.isWX
        }
    },
    mutations: {
        // 设置目前是否处于微信内打开
        updateSystem(state, isWX) {
            state.isWX = isWX;
        },
    },
    /**
     * @description
     * 判断方向，添加动画
     * ['forward','back']
     * @author weiyafei
     * @date 2020-05-11-21:19:27
     * @param {Object} { commit }
     * @param {Router} 路由的to,from
     */
    actions: {

    },
};

export default {
    namespaced: true,
    state: {
        dogOrderId: "0", // 页面切换方向
    },
    getters: {
        dogOrderId: state => {
            return state.dogOrderId
        }
    },
    mutations: {
        // 更新页面切换方向
        updateDogOrderId(state, dogOrderId) {
            state.dogOrderId = dogOrderId;
        },
    }
};

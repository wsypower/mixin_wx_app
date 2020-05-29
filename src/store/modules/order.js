import orderInitInfo from '@/utils/orderInit.js'
export default {
    namespaced: true,
    state: {
        orderInfo: orderInitInfo
    },
    getters: {
        orderInfo: state => {
            return state.orderInfo
        }
    },
    mutations: {
        // 更新订单ID
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = Object.assign({},state.orderInfo ,orderInfo);
        },
    }
};

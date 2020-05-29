
export default {
    namespaced: true,
    state: {
        pointInfo:{
            servicePointName: '',
            distance: 0,
            address: '',
            serviceTime: '',
            originLon: '',
            originLat: '',
        }
    },
    getters: {
        pointInfo: state => {
            return state.pointInfo
        }
    },
    mutations: {
        // 更新订单ID
        updatePointInfo(state, pointInfo) {
            state.pointInfo = Object.assign({},state.pointInfo ,pointInfo);
        },
    }
};
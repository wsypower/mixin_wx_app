
export default {
    namespaced: true,
    state: {
        pointInfo:{
            id: '',
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
        // 更新服务点
        updatePointInfo(state, pointInfo) {
            state.pointInfo = Object.assign({},state.pointInfo ,pointInfo);
        },
    }
};

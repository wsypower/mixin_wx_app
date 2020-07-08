
export default {
    namespaced: true,
    state: {
        dogInfo:{
            id: '',
            dogName: "",
            breed: "",
            dogSex: "",
            hairColor: "",
            address: "",
            phone: "",
            starttime: "",
            endtime: "",
            dogPhoto: [],
        }
    },
    getters: {
        dogInfo: state => {
            return state.dogInfo
        }
    },
    mutations: {
        // 更新服务点
        updateDogInfo(state, dogInfo) {
            state.dogInfo = Object.assign({},state.dogInfo ,dogInfo);
        },
    }
};

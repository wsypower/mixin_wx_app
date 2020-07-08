
export default {
    namespaced: true,
    state: {
        dogInfo:{
            id: '',
            dogName: "",
            breed: "",
            dogSex: "",
            hairColor: "",
            adoptServiceName: "",
            phone: "",
            adoptBeginTime: "",
            adoptEndTime: "",
            dogPhotoFront: "",
            dogPhotoBack: ""
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

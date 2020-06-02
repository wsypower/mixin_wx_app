
export default {
    namespaced: true,
    state: {
        dogInfo:{
            id: '',
            dogCarStatus: "",
            statusId: 0,
            dogCardNumber: "",
            dogId: 0,
            dogName: "",
            dogPhotoFront: "",
            validityEnd: 0,
            validityStart: 0,
            chipNumber: "",
            ownerName: "",
            phone: "",
            qRCodePath: '',
            backgroundImage: '',
            makeTime: ''
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

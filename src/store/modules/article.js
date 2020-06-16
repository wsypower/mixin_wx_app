export default {
    namespaced: true,
    state: {
        articleInfo:{
            id: '',
            title: '',
            documentNumber: '',
            publishTime: 0,
            content: ''
        }
    },
    getters: {
        articleInfo: state => {
            return state.articleInfo
        }
    },
    mutations: {
        // 更新服务点
        updateArticleInfo(state, articleInfo) {
            state.articleInfo = Object.assign({},state.articleInfo ,articleInfo);
        },
    }
};

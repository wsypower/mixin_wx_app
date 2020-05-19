export default {
    namespaced: true,
    state: {
        dogOrderId: "0", // 订单ID
        pdfUrl: '', //订单中申请表与承诺书的PDF文档链接
    },
    getters: {
        dogOrderId: state => {
            return state.dogOrderId
        },
        pdfUrl: state => {
            return state.pdfUrl
        },
    },
    mutations: {
        // 更新订单ID
        updateDogOrderId(state, dogOrderId) {
            state.dogOrderId = dogOrderId;
        },
        // 更新pdfUrl
        updatePdfUrl(state, pdfUrl) {
            state.pdfUrl = pdfUrl;
        },
    }
};

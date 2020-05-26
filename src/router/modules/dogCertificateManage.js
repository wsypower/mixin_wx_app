const routes = [
    {
        path: '/dogCertificateManage',
        name: 'dogCertificateManage',
        component: () => import(/* webpackChunkName: "dogCertificateManage" */ '@/views/DogCertificateManage/index.vue'),
        meta: { keepAlive:false }
    }
];
export default routes;
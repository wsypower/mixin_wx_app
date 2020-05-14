const routes = [
    {
        path: '/process',
        name: 'process',
        component: () => import(/* webpackChunkName: "dogCertificateManage" */ '@/views/ProcessSearch/index.vue')
    }
];
export default routes;
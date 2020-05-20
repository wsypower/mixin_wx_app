const routes = [
    {
        path: '/process',
        name: 'process',
        component: () => import(/* webpackChunkName: "process" */ '@/views/ProcessSearch/index.vue')
    },
    {
        path: '/:orderNo/detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "process" */ '@/views/ProcessSearch/detail.vue')
    }
];
export default routes;
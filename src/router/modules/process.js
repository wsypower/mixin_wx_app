const routes = [
    {
        path: '/process',
        name: 'process',
        component: () => import(/* webpackChunkName: "process" */ '@/views/ProcessSearch/index.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/:orderNo/detail',
        name: 'detail',
        component: () => import(/* webpackChunkName: "process" */ '@/views/ProcessSearch/detail.vue'),
        meta: { keepAlive:false }
    }
];
export default routes;
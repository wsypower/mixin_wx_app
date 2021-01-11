const routes = [
    {
        path: '/hotline',
        name: 'hotline',
        component: () => import(/* webpackChunkName: "process" */ '@/views/Hotline/index.vue'),
        meta: { keepAlive:false }
    }
];
export default routes;
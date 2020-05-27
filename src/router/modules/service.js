const routes = [
    {
        path: '/service',
        name: 'servicePoint',
        component: () => import(/* webpackChunkName: "process" */ '@/views/ServicePoint/index.vue'),
        meta: { keepAlive:false }
    }
];
export default routes;
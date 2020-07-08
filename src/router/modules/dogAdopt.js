const routes = [
    {
        path: '/dogAdopt',
        name: 'dogAdopt',
        component: () => import(/* webpackChunkName: "dogAdopt" */ '@/views/DogAdopt/index.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/dogAdopt/detail',
        name: 'dogAdoptDetail',
        component: () => import(/* webpackChunkName: "dogAdopt" */ '@/views/DogAdopt/detail.vue'),
        meta: { keepAlive:false }
    }
];
export default routes;
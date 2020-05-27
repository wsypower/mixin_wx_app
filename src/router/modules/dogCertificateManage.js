const routes = [
    {
        path: '/dogCertificateManage',
        name: 'dogCertificateManage',
        component: () => import(/* webpackChunkName: "dogCertificateManage" */ '@/views/DogCertificateManage/index.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/dogCertificateManage/detail',
        name: 'dogDetail',
        component: () => import(/* webpackChunkName: "dogCertificateManage" */ '@/views/DogCertificateManage/detail.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/dogCertificateManage/annual',
        name: 'annual',
        component: () => import(/* webpackChunkName: "dogCertificateManage" */ '@/views/DogCertificateManage/annualCheck.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/dogCertificateManage/unbind',
        name: 'unbind',
        component: () => import(/* webpackChunkName: "dogCertificateManage" */ '@/views/DogCertificateManage/unbind.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/dogShareDetail',
        name: 'share',
        component: () => import(/* webpackChunkName: "dogCertificateManage" */ '@/views/DogCertificateManage/dogShareDetail.vue'),
        meta: { keepAlive:false }
    }
];
export default routes;
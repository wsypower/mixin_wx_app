const routes = [
    {
        path: '/apply',
        name: 'apply',
        component: () => import(/* webpackChunkName: "apply" */ '@/views/Apply/index.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/newApply',
        name: 'newApply',
        component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/newApply.vue'),
        meta: { keepAlive:false },
        children: [
            {
                path: 'stepOneForPerson',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepOneForPerson.vue'),
                meta: { index: 0, keepAlive:false }
            },
            {
                path: 'stepOneForCompany',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepOneForCompany.vue'),
                meta: { index: 0, keepAlive:false }
            },
            {
                path: 'stepTwo',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepTwo.vue'),
                meta: { index: 1, keepAlive:false }
            },
            {
                path: 'stepThree',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepThree.vue'),
                meta: { index: 2, keepAlive:false }
            },
            {
                path: 'stepFour',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepFour.vue'),
                meta: { index: 3, keepAlive:false }
            }
        ]
    },
    {
        path: '/continuedApply',
        name: 'continuedApply',
        component: () => import(/* webpackChunkName: "continuedApply" */ '@/views/Apply/continuedApply.vue'),
        meta: { keepAlive:false }
    }
];
export default routes;
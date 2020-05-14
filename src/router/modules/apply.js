const routes = [
    {
        path: '/apply',
        name: 'apply',
        component: () => import(/* webpackChunkName: "apply" */ '@/views/Apply/index.vue')
    },
    {
        path: '/newApply',
        name: 'newApply',
        component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/newApply.vue'),
        children: [
            {
                path: 'stepOneForPerson',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepOneForPerson.vue'),
                meta: { index: 0 }
            },
            {
                path: 'stepOneForCompany',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepOneForCompany.vue'),
                meta: { index: 0 }
            },
            {
                path: 'stepTwo',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepTwo.vue'),
                meta: { index: 1 }
            },
            {
                path: 'stepThree',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepThree.vue'),
                meta: { index: 2 }
            },
            {
                path: 'stepFour',
                component: () => import(/* webpackChunkName: "newApply" */ '@/views/Apply/subViews/stepFour.vue'),
                meta: { index: 3 }
            }
        ]
    },
    {
        path: '/continuedApply',
        name: 'continuedApply',
        component: () => import(/* webpackChunkName: "continuedApply" */ '@/views/Apply/continuedApply.vue'),
    }
];
export default routes;
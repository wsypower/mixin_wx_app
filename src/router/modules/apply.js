const routes = [
    {
        path: '/apply',
        name: 'apply',
        component: () => import(/* webpackChunkName: "apply" */ '@/views/Apply/index.vue')
    },
    {
        path: '/applyStep',
        name: 'applyStep',
        component: () => import(/* webpackChunkName: "applyStep" */ '@/views/Apply/applyStep.vue'),
        children: [
            {
                path: 'stepOneForPerson',
                component: () => import(/* webpackChunkName: "applyStep" */ '@/views/Apply/subViews/stepOneForPerson.vue'),
                meta: { index: 0 }
            },
            {
                path: 'stepOneForCompany',
                component: () => import(/* webpackChunkName: "applyStep" */ '@/views/Apply/subViews/stepOneForCompany.vue'),
                meta: { index: 0 }
            },
            {
                path: 'stepTwo',
                component: () => import(/* webpackChunkName: "applyStep" */ '@/views/Apply/subViews/stepTwo.vue'),
                meta: { index: 1 }
            },
            {
                path: 'stepThree',
                component: () => import(/* webpackChunkName: "applyStep" */ '@/views/Apply/subViews/stepThree.vue'),
                meta: { index: 2 }
            },
            {
                path: 'stepFour',
                component: () => import(/* webpackChunkName: "applyStep" */ '@/views/Apply/subViews/stepFour.vue'),
                meta: { index: 3 }
            }
        ]
    }
];
export default routes;
const routes = [
    {
        path: '/apply',
        name: 'apply',
        component: () => import(/* webpackChunkName: "apply" */ '@/views/Apply/index.vue')
    },
    {
        path: '/applyStepForPerson',
        name: 'applyStepForPerson',
        component: () => import(/* webpackChunkName: "applyStepForPerson" */ '@/views/Apply/applyStepForPerson.vue'),
        children: [
            {
                path: 'stepOne',
                component: () => import(/* webpackChunkName: "applyStepForPerson" */ '@/views/Apply/stepOne.vue'),
            },
            {
                path: 'stepTwo',
                component: () => import(/* webpackChunkName: "applyStepForPerson" */ '@/views/Apply/stepTwo.vue'),
            },
            {
                path: 'stepThree',
                component: () => import(/* webpackChunkName: "applyStepForPerson" */ '@/views/Apply/stepThree.vue'),
            },
            {
                path: 'stepFour',
                component: () => import(/* webpackChunkName: "applyStepForPerson" */ '@/views/Apply/stepFour.vue'),
            }
        ]
    }
];
export default routes;
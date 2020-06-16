const routes = [
    {
        path: '/dogKnowledge',
        name: 'index',
        component: () => import(/* webpackChunkName: "process" */ '@/views/DogKnowledge/index.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/dogKnowledge/detail',
        name: 'dogKnowledgeDetail',
        component: () => import(/* webpackChunkName: "process" */ '@/views/DogKnowledge/detail.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/laws',
        name: 'index',
        component: () => import(/* webpackChunkName: "process" */ '@/views/LawsKnowledge/index.vue'),
        meta: { keepAlive:false }
    },
    {
        path: '/lawsKnowledge/detail',
        name: 'lawsKnowledgeDetail',
        component: () => import(/* webpackChunkName: "process" */ '@/views/LawsKnowledge/detail.vue'),
        meta: { keepAlive:false }
    }
];
export default routes;
// ##################################################################### //
// ################################ 测试路由 ############################### //
// ##################################################################### //
const routes = [
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
  {
    path: "/router",
    name: "router",
    component: () =>
      import(/* webpackChunkName: "router" */ "@/views/router.vue"),
    meta: {
      title: "犬类列表",
    },
  },
  {
    path: "/detail",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "detail" */ "@/views/detail.vue"),
    meta: {
      title: "犬类列表",
    },
    redirect: "/detail/ceshi1",
    children: [
      {
        path: "ceshi1",
        name: "ceshi1",
        component: () =>
          import(/* webpackChunkName: "ceshi1" */ "@/views/ceshi1.vue"),
        meta: {
          title: "犬类列表-ceshi1",
        },
      },
      {
        path: "ceshi2",
        name: "ceshi2",
        component: () =>
          import(/* webpackChunkName: "ceshi2" */ "@/views/ceshi2.vue"),
        meta: {
          title: "犬类列表-ceshi2",
        },
      },
    ],
  },
];
export default routes;

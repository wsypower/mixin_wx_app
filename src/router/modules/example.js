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
    path: "/ceshi",
    name: "ceshi",
    component: () =>
      import(/* webpackChunkName: "router" */ "@/views/router.vue"),
    meta: {
      title: "犬类列表",
    },
  },
];
export default routes;

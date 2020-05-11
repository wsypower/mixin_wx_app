
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
      import(/* webpackChunkName: "about" */ "@/views/router.vue"),
  },
];
export default routes;

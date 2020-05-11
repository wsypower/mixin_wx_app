/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   index.js                                                  :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/11 19:46:18 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/11 19:46:18 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import store from "@/store";
// ##################################################################### //
// ################################# 首页 ################################ //
// ##################################################################### //
let routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title:'犬类测试title'
    }
  },
];
// ##################################################################### //
// ################################# 声明 ################################ //
// ##################################################################### //
Vue.use(Router);

// ##################################################################### //
// ############################# 查找所有router ############################ //
// ##################################################################### //
const routerContext = require.context("./", true, /\.js$/);
routerContext.keys().forEach((route) => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith("./index")) {
    return;
  }
  const routerModule = routerContext(route);
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = routes.concat(routerModule.default || routerModule);
});

// ##################################################################### //
// ############################## 配置router ############################# //
// ##################################################################### //

const createRouter = () =>
  new Router({
    routes,
    scrollBehavior: () => ({ y: 0 }),
  });
const myRouter = createRouter();
Vue.use(myRouter);

// ##################################################################### //
// ############################### 前置导航守卫 ############################## //
// ##################################################################### //

myRouter.beforeEach((to, from, next) => {
  store.dispatch("pagesAnimation/pageSwitchEvent", { to, from });
  next();
});
export default myRouter;

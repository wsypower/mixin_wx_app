const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem("count") * 1 || 0;
history.setItem("/", 0);

export default {
  namespaced: true,
  state: {
    direction: "forward", // 页面切换方向
  },
  mutations: {
    // 更新页面切换方向
    updateDirection(state, direction) {
      state.direction = direction;
    },
  },
  /**
   * @description
   * 判断方向，添加动画
   * ['forward','back']
   * @author weiyafei
   * @date 2020-05-11-21:19:27
   * @param {Object} { commit }
   * @param {Router} 路由的to,from
   */
  actions: {
    pageSwitchEvent({ commit }, { to, from }) {
      // 屏蔽掉子元素，会导致Navigation 压栈失败
      // const regexp = /\/.*\//;
      // if (regexp.test(to.path) && regexp.test(from.path)) {
      //   console.log(123);
      //   commit("updateDirection", "");
      //   return;
      // }
      if (to.params.direction) {
        commit("updateDirection", to.params.direction);
      } else {
        const toIndex = history.getItem(to.path);
        const fromIndex = history.getItem(from.path);
        // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
        if (toIndex) {
          !fromIndex ||
          parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
          (toIndex === "0" && fromIndex === "0")
            ? commit("updateDirection", "forward")
            : commit("updateDirection", "back");
        } else {
          ++historyCount;
          history.setItem("count", historyCount);
          to.path !== "/" && history.setItem(to.path, historyCount);
          commit("updateDirection", "forward");
        }
      }
    },
  },
};

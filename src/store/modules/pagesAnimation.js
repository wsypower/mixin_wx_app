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
  actions: {
    pageSwitchEvent({ state, commit }, { to, form }) {
      console.log("1", to);
      console.log("2", form);
      if (to.params.direction) {
        store.commit("pagesAnimation/updateDirection", to.params.direction);
      } else {
        const toIndex = history.getItem(to.path);
        const fromIndex = history.getItem(from.path);
        // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
        if (toIndex) {
          if (
            !fromIndex ||
            parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
            (toIndex === "0" && fromIndex === "0")
          ) {
            store.commit("pagesAnimation/updateDirection", "forward");
          } else {
            store.commit("pagesAnimation/updateDirection", "back");
          }
        } else {
          ++historyCount;
          history.setItem("count", historyCount);
          to.path !== "/" && history.setItem(to.path, historyCount);
          store.commit("pagesAnimation/updateDirection", "forward");
        }
      }
    },
  },
};

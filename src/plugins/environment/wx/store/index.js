import state from "./state";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

const wechatStore = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
export default wechatStore;

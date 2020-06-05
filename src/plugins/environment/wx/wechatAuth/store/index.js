import state from "./state";
import * as getters from "./getters";
import * as actions from "./actions";
import mutations from "./mutations";

const wechatAuthSore = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};

export default wechatAuthSore;

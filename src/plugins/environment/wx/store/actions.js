import {
  ACCESS_TOKEN,
  LOGIN_STATUS,
  removeStorage,
  saveCookie,
  saveStorage,
  USER_INFO,
  JS_TOKEN
} from "../utils/cache";
import * as types from "./mutationTypes";

/**
 * 设置登录状态
 * @param commit
 * @param state
 * @param query
 */
export const setLoginStatus = ({ commit }, query) => {
  if ((query === 0 || query === 1) && process.env.NODE_ENV === "production") {
    removeStorage(ACCESS_TOKEN);
    removeStorage(USER_INFO);
  }
  commit(
    types.SET_LOGIN_STATUS,
    saveCookie(LOGIN_STATUS, query, { expires: 7 })
  );
};

/**
 * 设置用户信息
 * @param commit
 * @param state
 * @param query
 */
export const setUserInfo = ({ commit }, query) => {
  commit(types.SET_USER_INFO, saveStorage(USER_INFO, query));
};

/**
 * 设置js_token
 * @param commit
 * @param state
 * @param query
 */
export const setJsToken = ({ commit }, query) => {
  console.log(query);
  commit(types.SET_JS_TOKEN, saveStorage(JS_TOKEN, query));
};
/**
 * 设置token
 * @param commit
 * @param state
 * @param query
 */
export const setAccessToken = ({ commit }, query) => {
  commit(types.SET_ACCESS_TOKEN, saveStorage(ACCESS_TOKEN, query));
};

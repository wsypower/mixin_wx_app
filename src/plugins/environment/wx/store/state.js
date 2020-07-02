import {
  loadStorage,
  loadCookie,
  LOGIN_STATUS,
  ACCESS_TOKEN,
  USER_INFO,
  JS_TOKEN,
} from "../utils/cache";

const state = {
  // loginStatus: Number(loadCookie(LOGIN_STATUS, 0)),
  // accessToken: loadStorage(ACCESS_TOKEN, ""),
  // userInfo: loadStorage(USER_INFO, {}),
  // jsToken: loadStorage(JS_TOKEN, {}),
  loginStatus: 0,
  accessToken: "",
  userInfo: {},
  jsToken: {},
};

export default state;

import WxJSApi from "./wx";
import hescJSApi from "./hesc";

// 浏览器环境
const environment = {
  micromessenger: WxJSApi,
  hesc: hescJSApi,
};

// 返回一个符合环境的父类
const isNavigator = () => {
  if (typeof navigator === "undefined") return;
  var ua = navigator.userAgent.toLowerCase();
  return _transform(
    environment,
    (previous, current) =>
      !!~ua.indexOf(current) ? environment[current] : previous,
    environment["hesc"]
  );
};
// 对累加器和对象属性应用函数
const _transform = (obj, fn, acc) => {
  return Object.keys(obj).reduce((a, k) => fn(a, k, obj), acc);
};

const DevSupConstructor = isNavigator();

export default DevSupConstructor;

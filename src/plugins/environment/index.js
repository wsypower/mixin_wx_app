const DEVICE = {
  micromessenger: () =>
    import(/* webpackChunkName: "wx-sdk" */ "weixin-js-sdk"),
  hesc: () => import(/* webpackChunkName: "hesc" */ "hesc-jsapi"),
};
const isDevice = async () => {
  let jsSdk;
  if (typeof navigator === "undefined") {
    return;
  }
  const ua = navigator.userAgent.toLowerCase();
  for (const [key, dev] of Object.entries(DEVICE)) {
    jsSdk = !!~ua.indexOf(key) ? dev : "hesc";
    console.log(jsSdk);
  }

  const dev = () => {
    return DEVICE[jsSdk]().then((res) => {
      console.log(res);
      return res;
    });
  };
  return await dev();
};
const browser = isDevice();
console.log("123123", browser);

export default browser;

const DEVICE = {
  micromessenger: "微信",
  hesc: "公司自带",
};

const isDevice = () => {
  if (typeof navigator === "undefined") {
    return;
  }
  const ua = navigator.userAgent.toLowerCase();
  for (const [key, dev] of Object.entries(DEVICE)) {
    return !!~ua.indexOf(key) ? dev : DEVICE["hesc"];
  }
};
const browser = isDevice();
console.log(browser);


export default browser;

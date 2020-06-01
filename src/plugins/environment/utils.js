export const isWeiXin = () => {
  return ua.match(/microMessenger/i) == "micromessenger";
};

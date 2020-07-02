export default {
  /**
   * @type {boolean} true | false
   * @description 是否在右面板显示设置
   */
  title: "vue模板-title",

  /**
   * @description 微信配置
   */
  wx: {
    wechatId: "af21e2c0033e11e96b2df410224d169f",
    debug: false,
    jsApiList: ["chooseImage", "getLocalImgData"],
    getJsdkMdUrl: "http://wyf.vipgz4.idcfengye.com/wechat/stage/jump/getJsdkMd",
  },

  /**
   * @type {boolean} true | false
   * @description 是否需要页面切换动画
   */
  needPageTrans: true,

  /**
   * @type {boolean} true | false
   * @description 是否修复标题
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在边栏中显示徽标
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * 默认仅在生产环境中使用
   * 如果您还想在开发中使用它，可以通过['production', 'development']
   */
  errorLog: "production",
};

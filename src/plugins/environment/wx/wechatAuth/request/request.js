import service from "@/plugins/request/index";
import WX_CONFIG from "../../../config";
const {
  baseUrl
} = WX_CONFIG;
export default class CommonServer {
  /**
   * 登录接口请求token与userInfo
   * @param data
   * 入参  code:"021gj0OV1om5PU0k9VNV1VMQNV1gj0OK"
   * 返回  {
   *          accessToken:'xxx',
   *          refreshToken:'xxx',
   *          userInfo:{}
   *       }
   */
  static login(data) {
    return service({
      url: `${baseUrl}/getJsdkMd`,
      method: "post",
      data,
    });
  }
}
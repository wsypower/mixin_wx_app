/* ********************************************************************************************************* */
/*                                                                                                           */
/*                                                              :::::::::: ::::::::   :::::::: :::::::::::   */
/*   example.js                                                :+:       :+:    :+: :+:    :+:    :+:        */
/*                                                            +:+       +:+        +:+           +:+         */
/*   By: wsy <2553241022@qq.com>                             +#++:++#  +#++:++#++ :#:           +#+          */
/*                                                          +#+              +#+ +#+   +#+#    +#+           */
/*   Created: 2020/05/08 22:31:27 by wsy                   #+#       #+#    #+# #+#    #+#    #+#            */
/*   Updated: 2020/05/08 22:31:27 by wsy                  ########## ########   ######## ###########         */
/*                                                                                                           */
/* ********************************************************************************************************* */

// ##################################################################### //
// ############################# post 请求示例 ############################# //
// ##################################################################### //

export const AccountLogin = (data) => {
  return request({
    url: `@test/login`,
    method: "post",
    data,
  });
};

// ##################################################################### //
// ############################## get 请求示例 ############################# //
// ##################################################################### //

export const Account = ({ ...params }) => {
  return request({
    url: `@test/login`,
    method: "get",
    params: {
      id,
    },
  });
};

// ##################################################################### //
// ############################ delete 请求示例 ############################ //
// ##################################################################### //

export const deleteRole = () => {
  return request({
    url: `/role`,
    method: "delete",
  });
};

// ##################################################################### //
// ############################## put 请求示例 ############################# //
// ##################################################################### //

export const updateRole = (data) => {
  return request({
    url: `/role`,
    method: "put",
    data,
  });
};

// ##################################################################### //
// ######################### 试例：配置post自定义序列化参数 ######################### //
// ##################################################################### //

export const storagePointData = (data) => {
  return request({
    url: `/wfs`,
    method: "post",
    /* 会将全局默认headers替换 */
    headers: {
      "Content-Type": "text/xml ",
    },
    /* 会将全局默认transformRequest替换 */
    transformRequest: [
      function(data) {
        // 对 data 进行任意转换处理
        return data;
      },
    ],
    data: `${data}`, //数据为xml格式
  });
};
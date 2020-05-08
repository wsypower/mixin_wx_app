import service from "@/plugins/request/index";

export function add(data = {}) {
  return request({
    url: "@test/add",
    method: "post",
    params: data,
  });
}

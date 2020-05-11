import service from "@/plugins/request/index";

export function add(data = {}) {
  return service({
    url: "http://220.191.224.215/api/sp/getUrl?code=33060200001310130001",
    method: "get",
    params: data,
  });
}

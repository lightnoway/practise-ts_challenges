import { ApiConfig, ApiConfigType, TCreateApi } from "./types";
import axios from "axios";

function CreateApiByConfig<T extends ApiConfigType>(
  config: ApiConfig<T>["api"]
): TCreateApi<T> {
  const instance = axios.create({});
  const api = Object.create(null);
  type apiType = T["api"];
  for (const [method, mConfig] of Object.entries(config.api)) {
    api[method] = (o) => instance.request(o);
  }

  return api;
}

// - 目标
// 输入
interface AConfig extends ApiConfigType {
  api: {
    getUser: {
      req: { id: number };
      res: { id: number; content: string }[];
    };
  };
}
//输出
const api: TCreateApi<AConfig> = CreateApiByConfig<AConfig>({
  getUser: "aa",
});
//能够自动提示
api
  .getUser({ id: 3 })
  .then((items) => console.log("first content", items[0].content));

/* 
 问题：
 - 1 config.api.getUser 是类型 还是值？
   - 2个都要
    - 配置: url
    - 类型 
 - 2 instance.request<T> 怎么给T ？ 静态？动态？
   - g:先不要类型
 
 */

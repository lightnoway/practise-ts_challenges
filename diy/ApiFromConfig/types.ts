// 参考：谈谈 Axios 的 TypeScript 封装
// - https://zhuanlan.zhihu.com/p/446388616
import { type AxiosInstance } from "axios";

/* 
分块：
- 实现api.getUser,api.updateArticle 
- 拦截器等其他


*/
export interface RequestConfig {
  req: Record<string, any>;
  res: Record<string, any>;
}

// export type RequestMethod<O extends RequestConfig> =  {
//   (option: O["req"]): Promise<O["res"]>;
// };

// Types of parameters 'option' and 'option' are incompatible.
//   Property 'id' is missing in type 'Record<string, any>' but required in type '{ id: number; }'

export type RequestMethod<Option extends RequestConfig> = (
  option: Option["req"]
) => Promise<Option["res"]>;

export type Method = "GET" | "POST" | "PUT" | "DELETE";
//配置
// type RequestConfigOptionPath<T extends Method> = `T ${string}`; // ?泛型不让用 :  区分下 泛型
type RequestConfigOptionPath = `${Method} ${string}`;
export type RequestConfigOptionObj = {
  method: Method;
  path: string;
  headers?: {};
};
type RequestConfigOptionMethod<T extends RequestConfig> = (
  instance: AxiosInstance
) => RequestMethod<T>;

export type RequestConfigOption<T extends RequestConfig> =
  // | RequestConfigOptionPath<T extends Method> //?泛型不让用 :
  | RequestConfigOptionPath
  | RequestConfigOptionObj
  | RequestConfigOptionMethod<T>;

// type ApiOption = ApiOption1 | ApiOption2 | ApiOption3;

export interface ApiConfigType {
  [key: string]: RequestConfig;
}

type ApiConfig<T extends ApiConfigType> = {
  [key in keyof T]: RequestConfigOption<T[key]>;
};

//g:?? interfac 实现 怪异？
// interface ApiConfig3<T extends ApiConfigType> {
//   [key: string]: RequestConfigOption<T[keyof T]>;
// }

export type ApiClient<ConfigType extends ApiConfigType> = {
  [key in keyof ConfigType]: RequestMethod<ConfigType[key]>;
};

export type CreateApiClient<T extends ApiConfigType> = (
  instance: AxiosInstance,
  config: ApiConfig<T>
) => ApiClient<T>;

// 实现api.getUser,api.updateArticle

//代码实现

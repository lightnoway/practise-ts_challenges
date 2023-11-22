// 参考：谈谈 Axios 的 TypeScript 封装
// - https://zhuanlan.zhihu.com/p/446388616
import { type AxiosInstance } from "axios";

type RemoveIndexSignature<T, KeepType = PropertyKey> = {
  [key in keyof T as KeepType extends key
    ? never
    : key extends KeepType
    ? key
    : never]: T[key];
};

/* 
分块：
- 实现api.getUser,api.updateArticle 
- 拦截器等其他


*/

export type Method = "GET" | "POST" | "PUT" | "DELETE";
export const Methods: Readonly<Method[]> = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
] as const;
export interface RequestConfig {
  req: Record<string, any> | void;
  res: Record<string, any> | void;
}

export type ParseMethod<Config extends { req: any; res: any }> = (
  option: Config["req"]
) => Promise<Config["res"]>;

//区分下 RequestConfig, RequestConfigOption : 前者用来定类型，后者用来传参；前者描述函数签名，后者描述实现这个函数的需要的几种传参类型(path,obj,fn)
//配置
type RequestConfigOptionPath = `${Method} ${string}`;
export type RequestConfigOptionObj = {
  method: Method;
  path: string;
  headers?: {};
};
type RequestConfigOptionMethod<T extends RequestConfig> = (
  instance: AxiosInstance
) => ParseMethod<T>;

//先退一步
// type RequestConfigOptionMethod<T = any> = (
//   instance: AxiosInstance
// ) => (option: any) => Promise<any>;

export type RequestConfigOption<T extends RequestConfig = any> =
  | RequestConfigOptionObj
  | RequestConfigOptionMethod<T>
  | RequestConfigOptionPath;

export interface ApiConfigType {
  [key: string]: RequestConfig;
}

export type ApiConfig<T extends ApiConfigType> = {
  [key in keyof RemoveIndexSignature<T>]: RequestConfigOption<T[key]>; // 使用 RemoveIndexSignature 避免 传参时 要求  `RequestConfig extends 参数值类型` 而不是 `参数值类型 extends T[key]`
};

// client 指 api.getUser ,中 api 的签名
export type ApiClient<ConfigType extends ApiConfigType> = {
  [key in keyof RemoveIndexSignature<ConfigType>]: ParseMethod<ConfigType[key]>;
};

// export type ApiClientCreator<T extends ApiConfigType> = (
//   instance: AxiosInstance,
//   config: ApiConfig<T>
// ) => ApiClient<T>;

export type ApiClientCreatorImp = <T extends ApiConfigType>(
  instance: AxiosInstance,
  config: ApiConfig<T>
) => ApiClient<T>;



//test

interface AConfig extends ApiConfigType {
  // getUser: {
  //   req: { id: number };
  //   res: { id: number; content: string }[];
  // };
  // removeArticle: {
  //   req: {};
  //   res: void;
  // };
  // editArticle: RequestConfig
  editArticle: {
    req: { id: number };
    res: { isSuc: boolean };
  };
}

const fn: ApiClientCreatorImp = null;

fn<AConfig>(
  {} as any, //不是重点，any跳过
  { editArticle: (i) => (o) => Promise.resolve({ isSuc: true }) }
);

type L = ParseMethod<{ req: { id: number }; res: number }>;


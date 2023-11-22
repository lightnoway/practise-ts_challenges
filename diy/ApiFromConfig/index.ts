import { AxiosInstance } from "axios";
import {
  ApiClientCreatorImp,
  Method,
  ParseMethod,
  RequestConfig,
  RequestConfigOption,
  RequestConfigOptionObj,
} from "./types";

// const CreateApiByConfig: CreateApiClient<T> = function<T extends ApiConfigType>(instance,config){
// export const createApiByConfig: <T extends ApiConfigType>(
//   ...args: Parameters<CreateApiClient<T>>
// ) => ReturnType<CreateApiClient<T>> = function (instance, config) {

export const apiClientCreator: ApiClientCreatorImp = (instance, config) => {
  const api = Object.create(null);
  for (const [methodName, methodConfigOption] of Object.entries(
    config as Record<string, RequestConfigOption>
  )) {
    api[methodName] = parseRequestMethod(instance, methodConfigOption);
  }
  return api;
};

function parseRequestMethod<T extends RequestConfig>(
  instance: AxiosInstance,
  option: RequestConfigOption<T>
): ParseMethod<T> {
  let _option: RequestConfigOptionObj;
  if (typeof option == "string") {
    const [method, path] = option.split(/\s+/);
    _option = {
      method: method as Method,
      path,
    };
  } else if (typeof option == "object") {
    _option = option;
  } else {
    return option(instance);
  }
  return instance.request({
    method: _option.method,
    url: _option.path,
    headers: _option.headers,
  }) as any;
}


/* 
 问题：
 - 1 config.api.getUser 是类型 还是值？
   - 2个都要
    - 配置: url
    - 类型 
 - 2 instance.request<T> 怎么给T ？ 静态？动态？
   - g:先不要类型
- 3 知道 CreateApiClient<AConfig>  ,怎么自动生成代码？
- 4 不能用泛型声明？ const  CreateApiByConfig: CreateApiClient<T> = function<T extends ApiConfigType>(instance,config){
 
 */

type F<T> = (arg: T) => string; // 假设泛型函数类型 F<T> 接受一个类型参数 T，并返回一个 string 类型的值

// 实现一个泛型函数类型为 F<T> 的函数
const myFunction: <T>(arg: Parameters<F<T>>) => ReturnType<F<T>> = (arg) => {
  return 0 as any;
};

/* 
泛型默认值

*/

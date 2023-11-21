// 参考：谈谈 Axios 的 TypeScript 封装
// - https://zhuanlan.zhihu.com/p/446388616

/* 
分块：
- 实现api.getUser,api.updateArticle 
- 拦截器等其他


*/
interface ApiOption1 {
  req: unknown;
  res: unknown;
}

export interface ApiConfigType {
  api: {
    [key: string]: ApiOption1;
  };
}

export interface ApiConfig<T extends ApiConfigType> {
  api: {
    [key in keyof T["api"]]: string;
  };
}

type ApiMethod<O extends ApiOption1> = {
  (option: O["req"]): Promise<O["res"]>;
};

export type TCreateApi<C extends ApiConfigType> = {
  [key in keyof C["api"]]: ApiMethod<C["api"][key]>;
};

// 实现api.getUser,api.updateArticle

//代码实现

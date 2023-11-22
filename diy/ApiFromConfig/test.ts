// export interface RequestConfig {
//   req: Record<string, any>;
//   res: Record<string, any>;
// }

// export type RequestMethod<Option extends RequestConfig> = (
//   option: Option["req"]
// ) => Option["res"];

// type ConfigType = {
//   [key: string]: RequestConfig;
// };

// type ConfigOption<T extends ConfigType> = {
//   [key in keyof T]: RequestMethod<T[key]>;
// };

// export const a = 1;

// //client

// interface MyConfig extends ConfigType {
//   getUser: {
//     req: { id: number };
//     res: { isSuc: boolean };
//   };
// }

// const fn: (api: ConfigOption<MyConfig>) => void = null; //todo

// fn({ getUser: (o) => Promise.resolve({ isSuc: true }) }); // 修改了 Promise 的构造方式

// try again
// interface T1 {
//   R: "a" | "b" | "c" | "d";
// }

// type T1M<T extends T1> = () => T;

// type CT = {
//   [key: string]: T1;
// };

// type CO<T extends CT> = {
//   [key in keyof T]: T1M<T[key]>;
// };

// ///client

// type aCT = {
//   a: "a";
//   b: "b";
// };

// const fn2: (o: CO<aCT>) => void = null;
// console.log(fn2);
// fn2({ a: () => "a", b: () => "b" });

// type F<P, R> = (o: P) => R;
// type F2 = <P, R>(o: P) => R;

// const f1: <P, R>(o: Parameters<F<P, R>>) => ReturnType<F<P, R>>
// = function <
//   P,
//   R
// >(o: P): R {
//   throw new Error("ni");
// };
// const f2:F2  = function <P, R>(o: P): R {
//   throw new Error("ni");
// };

//try 2second


// type ApiConfigType = any; // 假设 ApiConfigType 已经定义

interface AConfig  {
  getUser: {
    req: { id: number };
    res: { id: number; content: string };
  };
  removeArticle: {
    req: void;
    res: number;
  };
}

type Tool<T extends { [K in keyof T]: { req: any; res: any } }> = {
  [K in keyof T]: toFn<T[K]>;
};

type toFn<T extends { req: any; res: any }> = (o: T["req"]) => T["res"];

type Result = Tool<AConfig>;

const fn: (o: Result) => void = null;

fn({ getUser: (o) => ({ id: 1, content: "1" }), removeArticle: () => 3 });

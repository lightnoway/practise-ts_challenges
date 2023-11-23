/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #medium #application

  ### Question

  Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?

  In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.

  For example

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  You don't need to write any js/ts logic to handle the problem - just in type level.

  You can assume that `key` only accepts `string` and the `value` can be anything - just leave it as-is. Same `key` won't be passed twice.

  > View on GitHub: https://tsch.js.org/12
*/

/* _____________ Your Code Here _____________ */

//try-1
// - this 有问题？
// - 还不显示 option?
// type Chainable = {
//   option<T,K,V>(this:T, key: K, value: any): T&{
//     K: V
//   }
//   get<T>(this:T): T
// }

//解-2 option 可以覆盖值类型；k 限定为 名字和值不能同时与已有相同
// - option 返回值如何引用自己{T,{option,get},key:value}
// - option 中约束 key 的范围: 声明处 vs 使用处
// - get 返回值应该没有 {option,get}
type Chainable<T = {}> = {
  option<K extends PropertyKey, V>(
    key: K extends keyof T ? (V extends T[K] ? never : K) : K,
    value: V
  ): Chainable<
    Omit<T,K> & {
      [key in K]: V;
    }
  >;
  get(): T;
};

// 解-3 option中 名字相同时报错
// type Chainable<T = {}> = {
//   option: <K extends string, V>(
//     key: K extends keyof T ? never : K,
//     value: V)
//   => K extends keyof T ? Chainable<Omit<T, K> & Record<K, V>> : Chainable<T & Record<K, V>>
//   get: () => T
// }
// type L = Exclude<PropertyKey, "get">; //- 排查get 没生效，姿势不对？
const t = a.option("name", "another name").option("name", 123).get();
// .get()
type Log = typeof result3;
// type Log =  typeof t;

/* _____________ Test Cases _____________ */
import type { Alike, Expect, MergeInsertions } from "@type-challenges/utils";

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

const result3 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/12/answer
  > View solutions: https://tsch.js.org/12/solutions
  > More Challenges: https://tsch.js.org
*/

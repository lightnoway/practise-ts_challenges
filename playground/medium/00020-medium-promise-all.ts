/*
  20 - Promise.all
  -------
  by Anthony Fu (@antfu) #medium #array #promise

  ### Question

  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.

  ```ts
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
  });

  // expected to be `Promise<[number, 42, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const)
  ```

  > View on GitHub: https://tsch.js.org/20
*/

/* _____________ Your Code Here _____________ */

type A = number | Promise<number>;
type B = A extends Promise<infer Raw> ? Raw : 2;
// - 如何遍历 union

type unPromise<T> = T extends Promise<infer Raw> ? Raw : T;
type ReturnPromiseAll<T> = T extends [T[0], ...infer Rest]
  ? Rest["length"] extends 0
    ? Promise<[T[0]]>
    : Promise<[unPromise<T[0]>, ...unPromise<ReturnPromiseAll<Rest>>]>
  : T extends Array<infer U>
  ? Promise<U[]>
  : Promise<[]>;
// type ReturnPromiseAll<T extends any[]> = T extends Array<infer A>?A:2
// type ReturnPromiseAll<T extends any[]> = T extends [T[0], ...infer Rest]
// ? 1
// : T extends Array<infer P>
// ? T['length']
// // ? Promise<Array<unPromise<P>>>
// : 3;
// 分2种情况处理：元组和数组; 数组及[] length:number, [] 类型为never； 元组 length 具体数字
// - 长度为1时 Rest extends []
// - ? as const 怎么处理？

// type Log = ReturnPromiseAll<[1, 2, 3]>;
type LogCase = typeof promiseAllTest4;

// declare function PromiseAll<T>(values: T): ReturnPromiseAll<T>;

// 别人解法 1
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): number extends T["length"]
  ? T extends (infer Item)[]
    ? Promise<unPromise<Item>[]>
    : never
  : Promise<{
      [key in keyof T]: unPromise<T[key]>;
    }>;
// - keyof,map vs 递归; 前者 适用于 元组，数组； 后者只数组
// - as const 怎么处理;使用readonly ，根据提示   readonly T  时，readonly 后边应该是数组或元组 ，变形成 readonly [...T]
type LogC2 = typeof promiseAllTest4;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/20/answer
  > View solutions: https://tsch.js.org/20/solutions
  > More Challenges: https://tsch.js.org
*/

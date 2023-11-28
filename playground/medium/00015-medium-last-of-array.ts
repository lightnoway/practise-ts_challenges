/*
  15 - Last of Array
  -------
  by Anthony Fu (@antfu) #medium #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  Implement a generic `Last<T>` that takes an Array `T` and returns its last element.

  For example

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
  ```

  > View on GitHub: https://tsch.js.org/15
*/

/* _____________ Your Code Here _____________ */
// 解1 遍历
// type Last<T extends any[]> = T extends [T[0], ...infer Rest]
//   ? Rest["length"] extends 0
//     ? T[0]
//     : Last<Rest>
//   : never;
// 不能 算数运算： length - 1 ; length 能拿到，但不能 -1
// - 但可以模式匹配补一位
// - test  T 为 [] 时 extends [T[0], ...infer Rest] ? 0 :1 ; 返回1
type Log = Last<[]>;

//解2 模式匹配
// type Last<T extends any[]> = [never, ...T][T["length"]];

//解3 模式匹配, typescript rest 可以写前边
type Last<T extends any[]> = T extends [...infer _, infer Last] ? Last : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/15/answer
  > View solutions: https://tsch.js.org/15/solutions
  > More Challenges: https://tsch.js.org
*/

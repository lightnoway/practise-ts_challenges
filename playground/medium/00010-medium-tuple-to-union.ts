/*
  10 - Tuple to Union
  -------
  by Anthony Fu (@antfu) #medium #infer #tuple #union

  ### Question

  Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.

  For example

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > View on GitHub: https://tsch.js.org/10
*/

/* _____________ Your Code Here _____________ */

// 解1：遍历数组

// type TupleToUnion<T extends any[]> = T["length"] extends 0
//   ? never
//   : T["length"] extends 1
//   ? T[0]
//   : T extends [T[0], ...infer Rest]
//   ? T[0] | TupleToUnion<Rest>
//   : never;

// 解2：模式匹配
//- cases3: Array 改成 ReadonlyArray
// type TupleToUnion<T> = T extends ReadonlyArray<infer Items> ? Items : never;

// 解3: 简单粗暴：集合操作；union 没有顺序
type TupleToUnion<T extends readonly any[]> = T[number];

type Log = TupleToUnion<typeof v1>;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

let v1 = [1, 2, "3"] as const;
type cases = [
  Expect<Equal<TupleToUnion<[123, "456", true]>, 123 | "456" | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
  Expect<Equal<TupleToUnion<typeof v1>, 1 | 2 | "3">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10/answer
  > View solutions: https://tsch.js.org/10/solutions
  > More Challenges: https://tsch.js.org
*/

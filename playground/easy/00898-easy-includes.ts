/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

// type Includes<T extends readonly any[], U> = any
// type Includes<T extends readonly any[], U> = U extends T[number] ? true:false
/* 类型相关的不匹配:boolean~false, readonly */
/* a extends b: 有交集就能过 */

// type Includes<T extends readonly any[], U> = {
//   [K in T[number]]: true;
// }[U] extends true
//   ? true
//   : false;
/*  消除了 extends 交集就能过的局限 */
/* 但要求  U的 类型 符合 PropertyKey。 

- boolean~false 通过原因是 false不符合 PropertyKey ，在extends 之前就 false了  */

type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <H>() => H extends U
  ? 1
  : 2
  ? true
  : false;
/* 不理解: <G>()=>G
先拿着用 */
// type Includes<T extends readonly any[], U> = T extends []
// ? false
// : T extends [infer F,...infer L]
//  ? T extends [U]
//   ? true
//   : Includes<L,U>
//  : never

//  type t1 = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars"> //没过

// type Includes<T extends readonly any[], U> = T extends []
//   ? false
//   : T extends [infer F]
//   ? IsEqual<F, U>
//   : T extends [infer F, ...infer L]
//   ? Includes<L, U>
//   : never;
// 没过？？

// type Includes<T extends readonly any[], U> = IsEqual<T[0], U> extends true
//   ? true
//   : T extends [T[0], ...infer Rest] //数组长度为 1，2... ; 为0时不符合
//   ? Includes<Rest, U>
//   : false;

//prettier-ignore

// type Includes<Value extends any[], Item> = IsEqual<Value[0], Item> extends true
// ? true
// : Value extends [Value[0], ...infer rest]
//   ? Includes<rest, Item>
//   : false;
// 不通过： Expect<Equal<Includes<[null], undefined>, false>>,
// - 解释: null 和 undefined 不等；进入 rest 比较 ：[][0]==undefined

// 修改

// type AIncludes<Value extends any[], Item> = Value['length'] extends 0
// ? 0
// : Value['length'] extends 1
// // ? Equal<Value[0],Item>
// ? Value[0]
// : Value extends [Value[0],... infer Rest]
//  ? AIncludes<Rest,Item>
//  : 6

// const x: AIncludes<["Kars", "Esidisi","Esidisi2"], "Kars"> = 20; //不通过: 递归后, ：倒着执行 Equal 的
// console.log(x);

// 通过: 范式
type Includes<Items extends readonly any[], Value> = Items['length'] extends 0
? false
: Items extends [Items[0],... infer Rest]  
? Equal<Items[0],Value> extends true
  ? true
  : Includes<Rest,Value> 
: never

// 通过2：推荐
// type Includes<T extends readonly any[], U> = true extends
// {[K in keyof T]: Equal<T[K], U>}[number]
// ? true
// : false;

// 判断空数组
type lArrEmpty<T extends readonly any[]> = T extends [] ? 0 : 1;

type emptyCases = [
  Expect<Equal<lArrEmpty<[]>, 0>>,
  Expect<Equal<lArrEmpty<[1]>, 1>>,
  Expect<Equal<lArrEmpty<[2]>, 1>>
];

// 判断长度等于1
// 判断长度大于1
type LArr<T extends readonly any[]> = T extends []
  ? 0
  : T extends [T[0], ...infer Rest]
  ? 1
  : 2;

type myCases = [
  Expect<Equal<LArr<[]>, 0>>,
  Expect<Equal<LArr<[1]>, 1>>,
  Expect<Equal<LArr<[1, 2]>, 1>>,
  Expect<Equal<LArr<[1, 2, 3]>, 1>>
];

//  type LArr2<T extends readonly any[]> = T extends []
//  ? 0
//  : T extends [T[0]]
//    ? 1
//    : T extends [T[0],... infer Rest]
//     ? 1 + LArr2<Rest> //报错
//     : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
type cases = [
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[{}], {}>, true>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/

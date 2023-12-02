/*
  

  ### Question
 

  For example:
 
*/

/* _____________ Your Code Here _____________ */

type OneOf<T extends readonly unknown[], U> = T extends [T[0], ...infer Rest]
  ? Equal<T[0], U> extends true
    ? true
    : OneOf<Rest, U>
  : false;

// // type Log = OneOf<[number, string], number>;

// type UnionToIntersection<T> =  (p:T)=>void extends (p:infer R)=>void ?R:never
// type Log =   UnionToIntersection<{a:number,b:string}|{a:number,c:string}>
// let a:Log = {}

/* _____________ Test Cases _____________ */
import type { Equal, Expect, MergeInsertions } from "@type-challenges/utils";

type cases = [
  Expect<Equal<true, OneOf<[number, string], number>>>,
  Expect<Equal<false, OneOf<[number, string], Function>>>,
  Expect<Equal<false, OneOf<[number, string], number | string>>>
];

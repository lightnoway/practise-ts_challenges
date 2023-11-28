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

type Log = OneOf<[number, string], number>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<true, OneOf<[number, string], number>>>,
  Expect<Equal<false, OneOf<[number, string], Function>>>,
  Expect<Equal<false, OneOf<[number, string], number | string>>>
];

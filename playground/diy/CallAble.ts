/*
  

  ### Question
 

  For example:
 
*/

/* _____________ Your Code Here _____________ */

type CallAble<T> = T extends Function ? T : T | (() => T);
// type CallAble<T> = () => T;

type CallAbleObj<T, U extends keyof T = keyof T> = {
  [key in keyof T as key extends U ? key : never]: CallAble<T[key]>;
} & Omit<T, U>;
// };

type Log = CallAbleObj<T1, "a">;
var log: Log = { a: () => "sdf", b: 1 }; //符合预期
//@ts-expect-error
var log_1: Log = { a: () => 2, b: 1 }; //符合预期
var log2: Log = { a: "sdf", b: 1 }; //符合预期
//@ts-expect-error
var log3: Log = { a: "sdf", b: () => 1 }; //符合预期

/* _____________ Test Cases _____________ */
import type {
  Alike,
  Equal,
  Expect,
  MergeInsertions,
  UnionToIntersection,
} from "@type-challenges/utils";
//? 测试 为啥过不了？
type cases = [
  Expect<Equal<string | (() => string), CallAble<string>>>,
  Expect<Equal<T1E1, CallAbleObj<T1, "a">>>
];

type T1 = {
  a: string;
  b: number;
};

type T1E = {
  a: string | (() => string);
  b: number | (() => number);
};
type T1E1 = {
  a: string | (() => string);
  b: number;
};

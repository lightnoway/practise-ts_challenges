/*
  119 - ReplaceAll
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `ReplaceAll<S, From, To>` which replace the all the substring `From` with `To` in the given string `S`

  For example

  ```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
  ```

  > View on GitHub: https://tsch.js.org/119
*/

/* _____________ Your Code Here _____________ */

type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer Before}${From}${infer After}`
  ? `${Before}${To}${After}`
  : S;

//d:?:怎么额外弄个变量
//
type extraT<S extends string, From extends string, To extends string> = Replace<
  S,
  From,
  To
> extends infer Result
  ? Result
  : 1;
type Log = extraT<"foobar", "bar", "foo">;

// -try1: 递归边缘： replace过的 不继续replace :ReplaceAll<"foobarfoobar", "ob", "b">
// type ReplaceAll<
//   S extends string,
//   From extends string,
//   To extends string
// > = Replace<S, From, To> extends infer Result
//   ? Result extends S
//     ? Result
//     : Result extends string
//     ? ReplaceAll<Result, From, To>
//     : 1
//   : S;

// 解2：
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> =
 From extends ""|To
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? `${L}${To}${ReplaceAll<R, From, To>}`
  : S;

// type Log2 = ReplaceAll<"foobarfoobar", "ob", "b">;
type Log2 = ReplaceAll<"foobarbar", "", "foo">;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<ReplaceAll<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobar", "bag", "foo">, "foobar">>,
  Expect<Equal<ReplaceAll<"foobarbar", "bar", "foo">, "foofoofoo">>,
  Expect<Equal<ReplaceAll<"t y p e s", " ", "">, "types">>,
  Expect<Equal<ReplaceAll<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<ReplaceAll<"barfoo", "bar", "foo">, "foofoo">>,
  Expect<Equal<ReplaceAll<"foobarfoobar", "ob", "b">, "fobarfobar">>, //递归边缘： replace过的 不继续replace
  Expect<Equal<ReplaceAll<"foboorfoboar", "bo", "b">, "foborfobar">>,
  Expect<Equal<ReplaceAll<"", "", "">, "">>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'bar'>, 'barfoo'>>//排除不必要的执行
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/119/answer
  > View solutions: https://tsch.js.org/119/solutions
  > More Challenges: https://tsch.js.org
*/

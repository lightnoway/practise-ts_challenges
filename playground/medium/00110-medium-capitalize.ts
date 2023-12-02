/*
  110 - Capitalize
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Capitalize<T>` which converts the first letter of a string to uppercase and leave the rest as-is.

  For example

  ```ts
  type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
  ```

  > View on GitHub: https://tsch.js.org/110
*/

/* _____________ Your Code Here _____________ */

type MapCapital = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};
type DiyToUpper<T> = T extends keyof MapCapital ? MapCapital[T]:T
type LogCase = DiyToUpper<'a'>


// try 1
// type MyCapitalize<S extends string> =
// // S[0]  //d:问题：S[0] 是string 太宽松了; 
//   S extends `${S[0]}${infer Rest}`
//     ? S[0] extends keyof MapCapital?`${MapCapital[S[0]]}${Rest}`:S
//     : S;

// 解2    
type MyCapitalize<S extends string> =
// S[0]  //问题：S[0] 是string 太宽松了
  S extends `${infer First}${infer Rest}`
    ? `${DiyToUpper<First>}${Rest}`
    : S;

/* 
 S[0] 是string 太宽松：试其他办法
 - 取首字母的办法还有infer；
  - 多 infer 不加限定时`${infer First}${infer Rest}` 第一个取1个字母 非贪婪，后边取剩下
  - 多 infer 加限定时`${infer I1} - ${infer I 2}` 根据限定来
*/

type Log =    MyCapitalize<"foobar"> 

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<MyCapitalize<"foobar">, "Foobar">>,
  Expect<Equal<MyCapitalize<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<MyCapitalize<"foo bar">, "Foo bar">>,
  Expect<Equal<MyCapitalize<"">, "">>,
  Expect<Equal<MyCapitalize<"a">, "A">>,
  Expect<Equal<MyCapitalize<"b">, "B">>,
  Expect<Equal<MyCapitalize<"c">, "C">>,
  Expect<Equal<MyCapitalize<"d">, "D">>,
  Expect<Equal<MyCapitalize<"e">, "E">>,
  Expect<Equal<MyCapitalize<"f">, "F">>,
  Expect<Equal<MyCapitalize<"g">, "G">>,
  Expect<Equal<MyCapitalize<"h">, "H">>,
  Expect<Equal<MyCapitalize<"i">, "I">>,
  Expect<Equal<MyCapitalize<"j">, "J">>,
  Expect<Equal<MyCapitalize<"k">, "K">>,
  Expect<Equal<MyCapitalize<"l">, "L">>,
  Expect<Equal<MyCapitalize<"m">, "M">>,
  Expect<Equal<MyCapitalize<"n">, "N">>,
  Expect<Equal<MyCapitalize<"o">, "O">>,
  Expect<Equal<MyCapitalize<"p">, "P">>,
  Expect<Equal<MyCapitalize<"q">, "Q">>,
  Expect<Equal<MyCapitalize<"r">, "R">>,
  Expect<Equal<MyCapitalize<"s">, "S">>,
  Expect<Equal<MyCapitalize<"t">, "T">>,
  Expect<Equal<MyCapitalize<"u">, "U">>,
  Expect<Equal<MyCapitalize<"v">, "V">>,
  Expect<Equal<MyCapitalize<"w">, "W">>,
  Expect<Equal<MyCapitalize<"x">, "X">>,
  Expect<Equal<MyCapitalize<"y">, "Y">>,
  Expect<Equal<MyCapitalize<"z">, "Z">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/110/answer
  > View solutions: https://tsch.js.org/110/solutions
  > More Challenges: https://tsch.js.org
*/

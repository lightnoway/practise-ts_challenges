/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

type RemoveIndexSignature<T,P=PropertyKey> = {
  // [key in keyof T as key extends `${infer literKey}` ? literKey: never ]:T[key] 
  // [key in keyof T  ]:key extends `${infer literKey}` ? literKey: 1 //检查: key 是 string 为1；说明 ``中 infer literKey 不能指向string

  [K in keyof T as P extends K? never : K extends P ? K : never]: T[K]
  // [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K]
  // [K in keyof T ]:   P extends K ? 1 : K extends P ? 2 : 3 //检查 哪些情况成立了
}

// 直接omit 行不行: 不行，结果: {}
// type RemoveIndexSignature<T> = Omit<T,PropertyKey>

type Log =  LogDetail<RemoveIndexSignature<Foo>>


type LogDetail<T> = {
  [key in keyof T]: T[key];
};
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/

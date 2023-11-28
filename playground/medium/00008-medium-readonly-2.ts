/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys

  ### Question

  Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > View on GitHub: https://tsch.js.org/8
*/

/* _____________ Your Code Here _____________ */

type exclude<From, Exclude extends From> = From extends Exclude ? never : From;
// type Log = exclude<"a" | "b" | "c", "c">;

// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   // readonly [key in K]: T[key];
//   // readonly [key in keyof T as key extends K ? key : never]: T[key]; //与上边等价
//   readonly [key in keyof T as key extends K ? key : never]: T[key];
// }
// &
// {
//   [key in exclude<keyof T, K>]: T[key];
// };

// type MyReadonly2<T, K extends keyof T = keyof T> = 
// {
//   readonly [key in keyof T as key extends K ? key : never]: T[key];
// } 
// &
//  {
//     // [key in keyof T as key extends K ? never : key]: T[key];
//       [key in exclude<keyof T, K>]: T[key];
//   }
// // type Log = MyReadonly2<Todo2, "description">; //    readonly description?: string | undefined;
// type Log = LogDetail<MyReadonly2<Todo2, "description">>; //    readonly description?: string | undefined;
// type Log2 = LogDetail<Expected>; //    readonly description?: string | undefined;
// type LogDetail<T> = {
//   [key in keyof T]: T[key];
// };
 
// your answers

// type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
//   Readonly<Pick<T, K>>;

// redo:

type Flatten<T extends { [key: string]: any }> = { [key in keyof T]: T[key] }

type MyReadonly2<
	T extends { [key: string]: any },
	K extends keyof T = keyof T,
> = 
Flatten<
	Readonly<Pick<T, K>> & Omit<T, K>
>

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<A, "a" >, AExpected>>, 
  Expect<Alike<MyReadonly2<Todo2, "description">, Expected>> //还要 保持原有的readonly ： [key in exclude<keyof T, K>] vs [key in keyof T as key extends ...] 前者可以保留原有readOnly
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}
type A = { a: number } & { b: boolean }
type AExpected = { readonly a: number } & { b: boolean }

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8/answer
  > View solutions: https://tsch.js.org/8/solutions
  > More Challenges: https://tsch.js.org
*/

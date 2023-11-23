/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys #deep

  ### Question

  Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.

  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

  For example:

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/9
*/

/* _____________ Your Code Here _____________ */

// 解1 ：
// - 不用 Object ,{} 做判断失败， Funciton 应该区别出来
// type NoRecurse = number|string|Function|Boolean
// type DeepReadonly<T> = {
//   readonly [key in keyof T]:T[key] extends NoRecurse ? T[key]: DeepReadonly<T[key]>
// }

// 解2 没key 的 直接返回
// type DeepReadonly<T> = keyof T extends never
//   ? T
//   : { readonly [k in keyof T]: DeepReadonly<T[k]> };
//问题：不能处理 a|b 当做never了
// - [extend never ](https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367)
// - `a|b`
//   - keyof  拿不到
//   - map方式能拿到:

// 解2-改
type DeepReadonly<T> = {
  readonly [k in keyof T]: keyof T[k] extends never ? T[k] :DeepReadonly<T[k]>
}

//解3 :
// - vs 解1 可以二次区分
// type DeepReadonly<T> = {
//   // readonly [k in keyof T] : k extends Record<any,any> ? DeepReadonly<T[k]>:T[k]
//   readonly [k in keyof T]: T[k] extends Record<any, any>
//     ? T[k] extends Function
//       ? T[k]
//       : DeepReadonly<T[k]>
//     : T[k];
// };

//涨见识 from vue-next : https://github.com/type-challenges/type-challenges/issues/52
// type Primitive = string | number | boolean | bigint | symbol | undefined | null
// type Builtin = Primitive | Function | Date | Error | RegExp
// type DeepReadonly<T> = T extends Builtin
//   ? T
//   : T extends Map<infer K, infer V>
//     ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
//     : T extends ReadonlyMap<infer K, infer V>
//       ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
//       : T extends WeakMap<infer K, infer V>
//         ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
//         : T extends Set<infer U>
//           ? ReadonlySet<DeepReadonly<U>>
//           : T extends ReadonlySet<infer U>
//             ? ReadonlySet<DeepReadonly<U>>
//             : T extends WeakSet<infer U>
//               ? WeakSet<DeepReadonly<U>>
//               : T extends Promise<infer U>
//                 ? Promise<DeepReadonly<U>>
//                 : T extends {}
//                   ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
//                   : Readonly<T>

type Log = DeepReadonly<X1>;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>
];

type X1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9/answer
  > View solutions: https://tsch.js.org/9/solutions
  > More Challenges: https://tsch.js.org
*/

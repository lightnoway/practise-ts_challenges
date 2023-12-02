// https://stackoverflow.com/questions/58563721/how-to-check-that-types-are-the-same
export type AreSame<T, U, R> = T extends U
  ? U extends T
    ? true
    : false
  : false;

// - todo  isEqul 过程？


// type A = AreSame<1, 1, Object>; // Object
// type B = AreSame<1, 2, Object>; // never
type C = AreSame<1, number, Object>; // never
//- T 是union时 分发了
type D = AreSame<1, 1 | 2, Object>; // Object - why???
type E = AreSame<1 | 2, 1 | 3, Object>; // Object - why???
type F = AreSame<1 | 2, 1 | 2, Object>; // Object

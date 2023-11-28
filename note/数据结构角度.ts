import { Equal } from "@type-challenges/utils"

/* 类型组合 */
	// - union: `A or B` 有一个符合
 //  - `X extends A|B`: `x extends A` or `X extends B`
 // - insect: `A and B` 都符合
	// 	- 出发点~实际-union
	// 		- `X extends A&B`: `X extends A`  and `X extends B`
	// - 元组:`[A,B]`: 值 as const;类型 `readonly T []`
		type LogTupleLength = [number,string]['length'] //2
	// - 数组：`Item[],Array<Item>`

  type LogArrLength = Array<number>['length'] //number

- `{[key:string]:Val}`


/* 常见操作/method：交叉轴 */
	- `A extends B` 
  - 赋值时,实参: 类型是A的值 可以 赋值给类型 B 的变量或形参
  - 条件判断`if/else` 
   - `A extends B ?condition1:condition2`
   type LogExtends1= 1 extends number ? true:false //true
   type LogExtends2= 1|2 extends 1 ? true:false //false
   type LogExtends3= string|number extends number ? true:false //false
  - 筛选？
	- keyof:Map
- infer 
- 匹配- 泛型
 - `T extends any[]` ~ `arr`
 - ? `...T` ~ `arr`|`Tuple`
 
/* 常见算法 */
	- 递归
	- 模式匹配
 - 转换:untion~object
 

 // log
 004：keyof Map
 011： untion~obj
 007: readonly;keyof
 014: firstOfArr;infer
 018: arrLength;infer
 043: exclude; extends
 3312:params; infer
 3060:unSift; `...`
 3057:push:`...`
 0898:includes;递归，infer;map,keyof;
 - ? 有没纯模式匹配？; 试了没通过
 0533:concat;`...`
 0268:if;`extends`
 0268:await;递归+infer
 // meidum
 002：returnType；infer
 003:omit; `key in keyof T  as ...`
 008:readonly;有子属性可以加readonly,区分function
 009:deep readonly;Map,递归
 010：tuple~union;遍历；`T[number]`
 020：promiseAll; `readonly [...T]`
 016:pop; 递归；模式匹配infer；
 015:lastOfArr;递推遍历数组；模式匹配
 012:option,chainable, 附加属性; 函数中各处类型都可以约束



 问题
 - ？数组readonly 后是元组么？
 - ？区分数组,元组；length, readonly?
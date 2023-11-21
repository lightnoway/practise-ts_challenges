### ts知识点：
- ` a extends b `: 
 - 约束  a,b 的关系
 - 在泛型中时 `a extends b` 返回a,b的交集, 交集可以用3目 :`R?不为空时:为空时`
  - 不是泛型不能这样，[当整体判断](https://github.com/type-challenges/type-challenges/issues/54)
- `keyof T`:  返回 T的键名Tuple
- `x in T`: 声明 x  遍历 T ;x 是个变量
  - 不能 `[key:K]:T[key]` ,提示改为map ` [key in K]:T[key]` ; 2种语法
- `... T`: T 是 `[]` 也能用


### 不理解的
- `['tesla', 'model 3', 'model X', 'model Y'] as const` tuple声明
- `readonly`: ?约束 ;类型增强
- `T[x]`: 返回类型T 中键为x类型对应的值类型集合？
- `infer x `: 占位? 这里有个类型， 声明为x ; 约束 没有话...
  - `T extends [infer A, ...infer rest]`
- ? 有and 操作么？

### 其他
- `@ts-expect-error` 下句话应该抛出异常，否则警告


### 梳理
结构/语法
- infer

if~else:`extends`
声明
遍历
函数: `x~y`
- 

范式
- 遍历数组
```ts
//X: item中任意一项满足Y则返回true
X<Items extends any[]> = Y<Items[0]> extends true //第一项
? true
: Items extends [Items[0],...infer Rest]
 ? X<Rest> //递归 Rest
 : false //数组为空

```


### 问题
如何 求交集：输入objA,objB ,得到 他们的交集字段；交集字段的类型与输入双方相同
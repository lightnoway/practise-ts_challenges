/* 
问题： 如何显示Type执行递归的次数
- 显示次数
- ？较少干扰原有逻辑
*/

//来自ai：错的 
type RecurseCount<T, C extends number = 0> = T extends object
  ? {
      [K in keyof T]: RecurseCount<T[K], C | 0 | 1>;
    }
  : C;

// 使用示例
type NestedObject = {
  key1: {
    key2: {
      key3: string;
    };
  };
  key4: number;
};

type CountedObject = RecurseCount<NestedObject>; // 此时 CountedObject 的类型将会记录递归的深度


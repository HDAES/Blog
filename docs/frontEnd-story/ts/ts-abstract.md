# TypeScript 抽象类和抽象方法

## 介绍
抽象方法或抽象字段是一个没有提供实现的方法或字段。这些成员必须存在于一个抽象类中，不能被直接实例化。

抽象类的作用是作为子类的基类，实现所有的抽象成员。当一个类没有任何抽象成员时，它被称为是具体的。

## 抽象类，属性，方法
加`abstract`关键就成抽象类

```
abstract class People {
  /**
   * 移动
   */
  abstract move(): void

  /**
   * 跑
   */
  abstract run():void{} //方法“run”不能具有实现，因为它标记为抽象。

  /**
   * 名字
   */
  abstract name: string = '小明' //属性“name”不能具有初始化表杰式，因为它标记为摘要。
}

new People()  //无法创建抽象类的实例
```
1. 抽象类不能被实例化。
2. 抽象方法只能定义，不能实现，即没有函数体.
3. 抽象属性不能有实现

## 抽象类使用方法
通过类的继承并实现抽象方法和属性
```
abstract class People {
  /**
   * 移动
   */
  abstract move(): void

  /**
   * 跑步
   */
  abstract run(): void

  /**
   * 名字
   */
  abstract name: string
}

class Man extends People {
  run(): void {
    throw new Error('Method not implemented.')
  }

  name!: string

  move(): void {
    throw new Error('Method not implemented.')
  }
}

new Man()
```
## 总结
TypeScript也支持定义抽象类和抽象类成员。抽象类和抽象类成员都使用`abstract`关键字来定义

- 抽象类可以不包含抽象方法，但抽象方法必须存在于抽象类中
- 抽象方法只能定义，不能实现，即没有函数体
- 抽象类不能被直接使用，只能被继承，非抽象子类必须实现父类的抽象方法和抽象属性
- 抽象类类似于类的模板，实现规范的代码定义



# Typescript 装饰器

![](https://hades0512.oss-cn-beijing.aliyuncs.com/1_h4DYwjRrrzrv6Wg5E8k2aA.png)

## 介绍
随着TypeScript和ES6中类的引入，现在存在某些场景需要额外的功能来支持注释或修改类和类成员。装饰器提供了一种为类声明和成员添加注释和元编程语法的方法。装饰器是JavaScript的第二阶段建议，并作为TypeScript的一个实验性功能提供。
## 如何开启
```
修改tsconfig.json文件
{
    "compilerOptions": {
        "experimentalDecorators": true //需要手动开启
        ...
    }
}
运行命令
tsc --target ES5 --experimentalDecorators
```
## 类装饰器（Class Decorator）
类装饰器就在类声明之前被声明。类装饰器被应用于类的构造函数，可以用来观察、修改或替换类定义。类装饰器不能在声明文件中使用，也不能在任何其他环境下使用（比如在声明类上）。

类装饰器的表达式在运行时将作为一个函数被调用，被装饰的类的构造器是它唯一的参数。

如果类装饰器返回一个值，它将用提供的构造函数替换类声明。

```
const moveDecoate: ClassDecorator = (target: Function) => {
  console.log(target === Tank); // true  target为原型对象

  target.prototype.name = "tank";
  target.prototype.getPosition = () => {
    return { x: 100, y: 100 };
  };
};

@moveDecoate
class Tank {
  getPosition(): any {
    throw new Error("Method not implemented.");
  }
}
const t = new Tank();
console.log(t.getPosition()); // { x: 100, y: 100 }
console.log((t as any).name); //tank

// 装饰器叠加
const musicDecorate: ClassDecorator = (target: Function) => {
  target.prototype.playMusci = () => {
    console.log("播放音乐");
  };
};
@moveDecoate
@musicDecorate
class Player {}

const p = new Player();
console.log((p as any).getPosition()); // { x: 100, y: 100 }
console.log((p as any).playMusci()); // 播放音乐
```
## 装饰器工厂（Class Decorator Factory）
```
const colorDecorateFactory = (type?: string): ClassDecorator => {
  return (target: Function) => {
    switch (type) {
      case "Car":
        target.prototype.color = "Car red";
        break;
      case "Ship":
        target.prototype.color = "Ship red";
        break;
      default:
        target.prototype.color = "red";
        break;
    }
  };
};

@colorDecorateFactory("Car")
class Car {}

@colorDecorateFactory("Ship")
class Ship {}

@colorDecorateFactory("Ship")
class Train {}
const car = new Car();
const ship = new Ship();
const train = new Train();
console.log((car as any).color); // Car red
console.log((ship as any).color); // Ship red
console.log((train as any).color); // red
```
## 属性装饰器（Property Decorator）
一个属性装饰器就在一个属性声明之前被声明。一个属性装饰器不能在声明文件中使用，也不能在任何其他环境下使用（比如在声明类中）。

属性装饰器的表达式将在运行时作为一个函数被调用，有以下两个参数。
1. 对于静态成员，可以是类的构造函数，对于实例成员，可以是类的原型。
2. 成员的名字。

```
const propertyDecorator: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
  console.log(target, target === Xx.prototype); // {}   true  普通属性 为构造函数原型
  console.log(propertyKey); // name   属性名称
};
const propertyDecorator1: PropertyDecorator = (target: Object, propertyKey: string | symbol) => {
  console.log(target, target === Xx); //  [class Xx] { age: undefined }  true  静态属性 返回构造函数
  console.log(propertyKey); // name   属性名称
};

class Xx {
  @propertyDecorator
  public name!: string;

  @propertyDecorator1
  public static age: number;
}
```
## 方法装饰器（Method Decorators）
方法装饰器就在方法声明之前被声明。该装饰器被应用于方法的属性描述符，可以用来观察、修改或替换方法定义。一个方法装饰器不能在声明文件中使用，不能在重载上使用，也不能在任何其他的环境中使用（比如在声明类中）。

```
const showDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
  console.log(target, target === User.prototype); //{}  公共方法返回构造函数原型  target === User
  console.log(propertyKey); //show  函数的名字
  console.log(descriptor); //{value: [Function: show],writable: true,enumerable: false,configurable: true};  函数的一些配置属性

  const method = descriptor.value; //获取到该函数
  descriptor.writable = true; //控制该函数是否可以修改
};

const hideDecorator1: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
  console.log(target, target === User); //[class User]  静态方法返回构造函数
};

const hideDecorator: MethodDecorator = (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
  descriptor.writable = false; // 不可修改函数
};
class User {
  @showDecorator
  show() {}

  @hideDecorator
  private static hide() {}

  @hideDecorator1
  hide1() {}
}

User.prototype.show = () => {
  console.log("writable show");
};

User.prototype.hide1 = () => {
  console.log("writable show"); //TypeError: Cannot assign to read only property 'hide1' of object '#<User>'
};

new User().show(); //writable show

```
## 参数装饰器（Parameter Decorators）
参数装饰器就在参数声明之前被声明。参数装饰器被应用于类构造器或方法声明的函数。一个参数装饰器不能在声明文件、重载或任何其他环境中使用（比如在声明类中）。

```
const parameterDecorator: ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
  console.log(target, target === Tk.prototype); //{} true
  console.log(propertyKey); // show
  console.log(parameterIndex); //1: 参数的索引值
};

class Tk {
  public show(id: number = 1, @parameterDecorator step: number) {}
}

```
[doc](https://www.typescriptlang.org/docs/handbook/decorators.html)

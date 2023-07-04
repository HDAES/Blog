# class-transformer

## 1.简介

现在是ES6和Typescript时代。现在，你比以往任何时候都更多地与类和构造器对象打交道。类转换器允许你将普通对象转换为某个类的实例，反之亦然。它还允许根据标准对对象进行序列化/反序列化。这个工具在前端和后端都非常有用。

[文档](https://github.com/typestack/class-transformer)

## 2.简单例子

生成一个users.json

```json
[
  {
    "id": 1,
    "firstName": "Johny",
    "lastName": "Cage",
    "age": 27
  },
  {
    "id": 2,
    "firstName": "Ismoil",
    "lastName": "Somoni",
    "age": 50
  },
  {
    "id": 3,
    "firstName": "Luke",
    "lastName": "Dacascos",
    "age": 12
  }
]
```

定义有个`User`类

```typescript
export class User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;

  getName() {
    return this.firstName + ' ' + this.lastName;
  }

  isAdult() {
    return this.age > 36 && this.age < 60;
  }
}
```

使用方法

```typescript
fetch('users.json').then((users: User[]) => {
  // 你可以在这里使用 User，而且类型提示也将提供给你、
  // 但 users 实际上不是用 User 的实例
  // 这意味着你不能使用  User 的方法
});

fetch('users.json').then((users: Object[]) => {
  const realUsers = plainToClass(User, users);
  // 现在 realUsers 中的每个用户都是一个用户类的实例
  // 你可以使用 User 的方法
});
```

## 3.使用方法

### 3.1 Node.js

1. Install module

   ```shell
   npm install class-transformer --save
   ```

2. `reflect-metadata` shim is required, install it too:

   ```shell
   npm install reflect-metadata --save
   ```

   and make sure to import it in a global place, like app.ts:

   ```typescript
   import 'reflect-metadata';
   ```

3. ES6 features are used, if you are using old version of node.js you may need to install es6-shim:

   ```shell
   npm install es6-shim --save
   ```

   and import it in a global place like app.ts:

   ```typescript
   import 'es6-shim';
   ```

   

### 3.2 Browser

安装前两个即可

## 4.Methods

### 4.1 `plainToClass` 已废弃

该方法将一个普通的javascript对象转换为特定类的实例。

```typescript
import { plainToClass } from 'class-transformer';

let users = plainToClass(User, userJson);
```

### 4.2 `plainToInstance`

和`plainToClass` 使用方法一致

```typescript
export declare function plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V[], options?: ClassTransformOptions): T[];
export declare function plainToInstance<T, V>(cls: ClassConstructor<T>, plain: V, options?: ClassTransformOptions): T;

export interface ClassTransformOptions {
    /**
     * 排除策略。默认情况下，使用exposeAll，这意味着它将暴露所有的属性被转化为
     */
    strategy?: 'excludeAll' | 'exposeAll';
    /**
     * 表示在将一个普通的值转换为一个类时，是否应该将不相干的属性从值中排除。
     * 这个选项要求目标类上的每个属性至少有一个`@Expose`或`@Exclude`装饰器
     */
    excludeExtraneousValues?: boolean;
    /**
     * 只有具有给定组别的属性才能被转化。
     */
    groups?: string[];
    /**
     * 只有 "since"> 版本 <"until "的属性会被转换。
     */
    version?: number;
    /**
     * 排除具有给定前缀的属性。例如，如果你用"_"和"__"来标记你的私有属性
     * 你可以把这个选项的值设置为["_", "__"]，所有的私有属性将被跳过。
     * 只适用于 "exposeAll "策略。
     */
    excludePrefixes?: string[];
    /**
     * 如果设置为true，那么类转换器将忽略所有@Expose和@Exclude装饰器的效果。
     * 如果你想有点克隆你的对象，但不应用装饰器的影响，这个选项很有用。
     *
     * 注意：__你可能仍然需要添加装饰器，以使其他选项发挥作用。
     */
    ignoreDecorators?: boolean;
    /**
     * 标地图允许在不使用@Type装饰器的情况下设置一个转换对象的类型。
     * 这在你转换外部类时很有用，或者如果你已经有类型元数据的对象，而且你不想再设置它了。
     */
    targetMaps?: TargetMap[];
    /**
     * 如果设置为true，那么类转换器将执行循环检查。(默认情况下，循环检查是关闭的)
     * 当你确定你的类型可能有一个循环依赖时，这个选项是有用的
     */
    enableCircularCheck?: boolean;
    /**
     * 如果设置为 "true"，那么类转换器将尝试根据属性的类型信息将其隐式转换为目标类型。
     *
     * DEFAULT: `false`
     */
    enableImplicitConversion?: boolean;
    /**
     * 如果设置为 "true"，那么类转换器将对未提供的字段采取默认值
     * 当你把一个普通对象转换为一个类，并且有一个带有默认值的可选字段时，这很有用。
     */
    exposeDefaultValues?: boolean;
    /**
     * 当设置为 "true "时，未定义为值的字段将被包含在类到普通的转换中。否则，这些字段将被从结果中省略。
     *
     * DEFAULT: `true`
     */
    exposeUnsetFields?: boolean;
}

```


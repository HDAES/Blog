# 类型体操



## 1. `Pick<Type, Keys>`

[官方示例](https://www.typescriptlang.org/docs/handbook/utility-types.html)

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
 
todo;
```

题解：

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Case2 = MyPick<{ a: string; b: string; c: string }, 'a' | 'b'>;
let test: Case2 = {
    a: '123',
    b: '123123',
    c: '123'  //Type '{ a: string; b: string; c: string; }' is not assignable to type 'Case2'.Object literal may only specify known properties, and 'c' does not exist in type 'Case2'.
}
```

## 2.`Readonly<Type>`

[官方示例](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)

```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
```

## 3.元组转换为对象

```typescript
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```


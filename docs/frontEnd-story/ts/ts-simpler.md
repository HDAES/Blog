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


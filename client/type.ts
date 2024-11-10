export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoStore {
  todos: Todo[];
  input: string;
  setInput: (input: string) => void;
  addTodo: () => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

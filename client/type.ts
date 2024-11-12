export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export interface TodoStore {
  todos: Todo[];
  input: string;
  setInput: (input: string) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  postTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  fetchTodos: () => Promise<void>;
}

export interface returnTodo {
  title: string;
  completed: boolean;
  id: string;
}

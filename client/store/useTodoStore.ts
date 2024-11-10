import { create } from "zustand";
import { TodoStore, Todo } from "../type";

const useStore = create<TodoStore>((set) => ({
  todos: [],
  input: "",
  setInput: (input) => set({ input }),
  addTodo: () => {
    set((state) => {
      const newTodo: Todo = {
        id: state.todos.length + 1,
        title: state.input,
        completed: false,
      };

      return { todos: [...state.todos, newTodo], input: "" };
    });
  },

  toggleTodo: (id) => {
    set((state) => {
      const newTodo = state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      return { todos: newTodo };
    });
  },

  deleteTodo: (id) => {
    set((state) => {
      const newTodo = state.todos.filter((t) => t.id !== id);
      return { todos: newTodo };
    });
  },
}));

export default useStore;

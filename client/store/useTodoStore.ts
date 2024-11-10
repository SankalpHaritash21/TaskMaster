import { create } from "zustand";
import { TodoStore, Todo } from "../type";
import axios from "axios";

const useStore = create<TodoStore>((set) => ({
  todos: [],
  input: "",
  fetchTodos: async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/todo/getTodo"
      );
      set({ todos: response.data });
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  },
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

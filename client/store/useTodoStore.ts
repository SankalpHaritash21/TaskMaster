import { create } from "zustand";
import { TodoStore } from "../type";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

const useStore = create<TodoStore>((set) => ({
  todos: [],
  input: "",
  fetchTodos: async () => {
    try {
      const response = await axios.get(`${URL}/getTodo`);
      if (response.data?.success) {
        set({ todos: response.data?.todo });
        return;
      }

      throw new Error("Failed to fetch todos");
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  },
  setInput: (input) => set({ input }),
  postTodo: async (text: string) => {
    try {
      const res = await axios.post(`${URL}/addTodo`, {
        title: text,
        completed: false,
      });
      console.log(res.data?.newtodo);
      if (!res.data?.newtodo) {
        throw new Error("Failed to add todo");
      }
      useStore.getState().addTodo(res.data?.newtodo);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  },

  addTodo: (todo) => {
    const todos = useStore.getState().todos;
    const newTodo = [...todos, todo];
    set({ todos: newTodo, input: "" });
  },

  toggleTodo: async (id) => {
    const res = await axios.put(`${URL}/toggleTodo/${id}`);

    if (!res.data?.updatedTodo) {
      throw new Error("Failed to Toggle todo");
    }

    const todos = useStore.getState().todos;
    const newTodo = todos.map((todo) =>
      todo._id === id ? res.data?.updatedTodo : todo
    );

    set({ todos: newTodo });
  },

  deleteTodo: async (id: string) => {
    try {
      const response = await axios.delete(`${URL}/deleteTodo/${id}`);

      if (!response.data?.success) {
        throw new Error("Failed to Delete todo");
      }

      const todos = useStore.getState().todos;
      const newTodo = todos.filter((item) => item._id !== id);

      set({ todos: newTodo });
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  },
}));

export default useStore;

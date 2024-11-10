import { MdDelete } from "react-icons/md";
import useStore from "../store/useTodoStore";
import { useEffect } from "react";

const App = () => {
  const todos = useStore((state) => state.todos);
  const input = useStore((state) => state.input);
  const setInput = useStore((state) => state.setInput);
  const addTodo = useStore((state) => state.addTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);
  const toggleTodo = useStore((state) => state.toggleTodo);
  const fetchTodos = useStore((state) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">To-Do App</h1>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            autoFocus
          />
          <button
            onClick={addTodo}
            className="ml-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition"
          >
            Add
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="py-4 flex items-center justify-between"
            >
              <span
                className={`text-lg ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`px-4 py-1 rounded-lg text-sm font-medium ${
                    todo.completed
                      ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                      : "bg-green-400 text-green-900 hover:bg-green-500"
                  } focus:outline-none transition`}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 focus:outline-none transition"
                >
                  <MdDelete size={24} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

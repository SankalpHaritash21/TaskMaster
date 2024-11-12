import TodoSchema from "../model/todoSchema.js";

export const getTodos = async (req, res) => {
  try {
    const todo = await TodoSchema.find({});
    console.log(todo);
    todo.sort((a, b) => a.id - b.id);
    res.status(200).json({ success: true, todo });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const newTodoProps = {
      title: title,
      completed: completed,
    };

    const newtodo = await TodoSchema.create(newTodoProps); // Use the model to create a new todo

    if (!newtodo) {
      return res.status(400).json({ error: "Failed to create Todo" }); // Return an error if the todo already exists
    }
    return res.status(201).json({ success: true, newtodo }); // Return the created todo as a response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const { id } = req?.params;
    console.log(id);

    // Find the Todo by ID
    const todo = await TodoSchema.findById(id); // Ensure you're using the correct model

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Toggle the completed status
    const updatedTodo = await TodoSchema.findByIdAndUpdate(
      id,
      { completed: !todo.completed }, // Toggle completed status
      { new: true } // Return the updated document
    );

    // Return the updated Todo
    res.status(200).json({ success: true, updatedTodo }); // Respond with the updated todo
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to toggle todo" }); // Handle the error gracefully
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req?.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const todo = await TodoSchema.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Send a success message if todo is found and deleted
    res.status(200).json({ success: true });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

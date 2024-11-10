const TodoSchema = require("../model/todoSchema");

const getTodos = async (req, res) => {
  try {
    const todo = await TodoSchema.find({});
    console.log(todo);
    todo.sort((a, b) => a.id - b.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const addTodo = async (req, res) => {
  try {
    const { id, title, completed } = req.body;

    const existingTodo = await TodoSchema.findOne({ id });
    if (existingTodo) {
      return res
        .status(400)
        .json({ error: "Todo with this ID already exists" });
    }

    const newTodo = {
      id: id,
      title: title,
      completed: completed,
    };

    const addtodo = await TodoSchema.create(newTodo); // Use the model to create a new todo

    res.status(201).json(addtodo); // Return the created todo as a response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to create todo" });
  }
};

const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Find the Todo by ID
    const todo = await TodoSchema.find({ id: id }); // Ensure you're using the correct model

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Toggle the completed status
    const updatedTodo = await TodoSchema.findOneAndUpdate(
      { id: id },
      { completed: !todo.completed }, // Toggle completed status
      { new: true } // Return the updated document
    );

    // Return the updated Todo
    res.status(200).json(updatedTodo); // Respond with the updated todo
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to toggle todo" }); // Handle the error gracefully
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const todo = await TodoSchema.findOneAndDelete({ id: id });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Send a success message if todo is found and deleted
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

module.exports = {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
};

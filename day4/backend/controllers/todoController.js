import Todo from "../Models/todoModel.js";

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.error("Get Todo Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const todo = await Todo.create({ text });
    return res.status(200).json({
      success: true,
      message: "Todos Added successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Add Todo Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Todos Updated successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Updated Todo Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Todos Deleted successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Delete Todo Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

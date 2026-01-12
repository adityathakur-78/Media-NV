"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [descripton, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/task");
      setTodos(res.data.data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create or Update todo
  const submitTodo = async () => {
    if (!title.trim()) return;

    try {
      if (editId) {
        // UPDATE
        await api.patch(`/task/${editId}`, {
          title,
          descripton,
        });
      } else {
        // CREATE
        await api.post("/task", {
          title,
          descripton,
        });
      }

      resetForm();
      fetchTodos();
    } catch (error) {
      console.error("Failed to submit todo", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  // Toggle complete
  const toggleTodo = async (id, completed) => {
    try {
      await api.patch(`/task/${id}`, {
        completed: !completed,
      });
      fetchTodos();
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/task/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  // Edit todo
  const editTodo = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setDescription(todo.descripton || "");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          📝 Todo App
        </h1>

        {/* Add / Edit Todo */}
        <div className="space-y-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={descripton}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todo description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2">
            <button
              onClick={submitTodo}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Todo List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-400">No todos yet 🚀</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="bg-gray-50 p-4 rounded-lg hover:shadow transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id, todo.completed)}
                      className="mt-1 w-5 h-5 accent-blue-600"
                    />

                    <div>
                      <h3
                        className={`font-medium ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.title}
                      </h3>
                      {todo.descripton && (
                        <p className="text-sm text-gray-500">
                          {todo.descripton}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => editTodo(todo)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

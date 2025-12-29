"use client";
import { useEffect, useState } from "react";
import CreateTodo from "./components/createTodo";
import api from "./api/todo";

export default function Page() {
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      const res = await api.get("/");
      const data = await res.data;

      setTodo(data.data);
    }

    fetchTodos();
  }, [todo]);
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/${id}`);
      alert("Todo Deleted Succesfully");
      setTodo((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Delete Failed", error);
    }
  };
  const startEdit = (item) => {
    setEditId(item._id);
    setEditText(item.text);
    setEditCompleted(item.completed);
  };
  const updateTodo = async (id) => {
    try {
      const res = await api.put(`/${id}`, {
        text: editText,
        completed: editCompleted,
      });

      setTodo((prev) =>
        prev.map((item) => (item._id === id ? res.data.data : item))
      );

      setEditId(null);
    } catch (error) {
      console.log("Update failed", error);
    }
  };

  return (
    <div>
      <CreateTodo />

      <h1 className="text-3xl font-bold text-center my-8 text-white">
        My Todo Lists
      </h1>

      {todo.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No todos found 💤</p>
      )}

      <div className="max-w-2xl mx-auto space-y-4">
        {todo.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-white shadow-sm border rounded-lg px-6 py-4"
          >
            {editId === item._id ? (
              <div className="flex-1 space-y-2">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={editCompleted}
                    onChange={(e) => setEditCompleted(e.target.checked)}
                  />
                  Completed
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateTodo(item._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-lg font-medium text-gray-800">{item.text}</p>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      item.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.completed ? "Done" : "Pending"}
                  </span>

                  <button
                    onClick={() => deleteTodo(item._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => startEdit(item)}
                    className="px-3 py-1 text-sm bg-green-700 text-white rounded"
                  >
                    Edit 🖋️
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

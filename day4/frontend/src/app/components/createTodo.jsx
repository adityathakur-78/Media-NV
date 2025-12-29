"use client";

import axios from "axios";
import { useState } from "react";

function CreateTodo() {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/todo/create", {
        text: todo,
      });

      console.log(res.data);
      alert("Task Added Succesfully");

      setTodo("");
    } catch (error) {
      console.error(error);
      alert("Not able to fetch Todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-white text-4xl font-semibold text-center my-6">
        Welcome to Todo's App
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 max-w-md h-36 mx-auto p-4 bg-white rounded-xl shadow-md border border-gray-200"
      >
        <input
          type="text"
          placeholder="Enter your task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="
      flex-1
      px-4 py-2
      text-sm
      border border-gray-300
      rounded-lg
      focus:outline-none
      focus:ring-2
      focus:ring-black
      focus:border-black
      placeholder-gray-400
    "
        />

        <button
          type="submit"
          disabled={loading}
          className="
      px-5 py-2
      text-sm font-medium
      text-white
      bg-black
      rounded-lg
      transition-all
      duration-200
      hover:bg-gray-900
      active:scale-95
      disabled:bg-gray-400
      disabled:cursor-not-allowed
    "
        >
          {loading ? "Posting..." : "Submit"}
        </button>
      </form>
    </>
  );
}

export default CreateTodo;

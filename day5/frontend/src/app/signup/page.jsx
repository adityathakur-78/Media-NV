"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const Signup = () => {
  const { signup } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      router.push("/login");
    } catch (error) {
      console.log(error);
      alert("Something wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-sm text-center text-gray-500">
          Join us. No spam. No nonsense.
        </p>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-black cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

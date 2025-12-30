"use client";

import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Something wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Login to Your account
        </h1>

        <p className="text-sm text-center text-gray-500">
          Join us to become A Succesfull Developer
        </p>

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
          Login ↪️
        </button>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-black cursor-pointer font-medium"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

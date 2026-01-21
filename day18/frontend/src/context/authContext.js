"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Roles } from "@/enums/role";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { accessToken, user } = res.data.data;

    localStorage.setItem("token", accessToken);
    setUser(user);
    redirectByRole(user.role);
  };

  const register = async (payload) => {
    await api.post("/auth/register", payload);
    router.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const redirectByRole = (role) => {
    if (role === Roles.ADMIN) router.push("/admin");
    if (role === Roles.TEACHER) router.push("/teacher");
    if (role === Roles.STUDENT) router.push("/student");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile();
    else setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

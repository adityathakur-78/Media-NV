"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { Roles } from "@/enums/role";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
  };

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case Roles.ADMIN:
        router.push("/admin");
        break;
      case Roles.TEACHER:
        router.push("/teacher");
        break;
      case Roles.STUDENT:
        router.push("/student");
        break;
    }
  }, [user, router]);

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (!allowedRoles.includes(user.role)) router.push("/unauthorized");
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return children;
}

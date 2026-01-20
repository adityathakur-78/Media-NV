"use client";

import { useAuth } from "@/context/authContext";

export default function RoleGuard({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not Authenticated</p>;
  if (!allowedRoles.includes(user.role)) return <p>Access Denied</p>;

  return children;
}

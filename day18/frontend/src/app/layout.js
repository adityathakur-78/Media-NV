"use client";

import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { useEffect, useState } from "react";
import AppLoader from "@/components/pageLoader";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="antialiased">
        {loading ? <AppLoader /> : <AuthProvider>{children}</AuthProvider>}
      </body>
    </html>
  );
}

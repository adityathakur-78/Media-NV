import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center max-w-xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Welcome to Media NV
        </h1>

        <p className="mt-4 text-gray-200 text-lg">
          Join use to Scale yourself and become a Full Stack Developer like me
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/signup"
            className="px-6 py-3 rounded-md bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Sign Up
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 rounded-md border border-white text-white font-medium hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-gray-100">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-lg text-gray-400">
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="relative mt-8 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-gray-200 shadow-[0_0_15px_rgba(0,150,255,0.3)] transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(0,150,255,0.6)]"
      >
        Go back home
      </Link>
    </div>
  );
}

import Link from "next/link";
import SendFiles from "./SendFiles";

export default async function SendPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-950 px-6 py-24 text-gray-100">
      <h1 className="text-4xl font-bold">Send Files</h1>
      <p className="mt-4 text-lg text-gray-400">
        Upload and protect files with a password.
      </p>

      <Link
        href="/files"
        className="relative mt-8 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-gray-200 shadow-[0_0_15px_rgba(0,150,255,0.3)] transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(0,150,255,0.6)]"
      >
        Go to Files
      </Link>

      <SendFiles />
    </main>
  );
}

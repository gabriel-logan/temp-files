import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-zinc-950 to-zinc-900 px-6 py-24 text-gray-100">
      <div className="relative flex place-items-center">
        <div className="absolute -inset-16 rounded-full bg-linear-to-br from-blue-600/20 to-sky-500/10 blur-3xl" />
        <Image
          className="relative drop-shadow-[0_0_0.3rem_#00aaff90]"
          src="/file.svg"
          alt="Send Files Logo"
          width={160}
          height={160}
          priority
        />
      </div>

      <h1 className="mt-10 text-5xl font-bold tracking-tight">Send Files</h1>
      <p className="mt-4 text-lg text-gray-400">
        A simple and secure file sharing app
      </p>

      <Link
        href="/files"
        className="relative mt-10 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-gray-200 shadow-[0_0_15px_rgba(0,150,255,0.3)] transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(0,150,255,0.6)]"
      >
        Go to Files
      </Link>
    </main>
  );
}

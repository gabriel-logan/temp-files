import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="before:bg-gradient-radial after:bg-gradient-conic relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-60 after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:lg:h-[360px] before:dark:bg-linear-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/file.svg"
          alt="Send Files Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <h1 className="mt-10 text-4xl font-bold">Welcome to Send Files</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        A simple file sharing app
      </p>

      <Link href="/files" className="mt-6 text-blue-600 hover:underline">
        Go to Files
      </Link>
    </main>
  );
}

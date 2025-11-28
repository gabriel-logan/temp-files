import { filesCache } from "@/lib/cache/file-cache";
import Link from "next/link";

export default function FilesPage() {
  const files = Array.from(filesCache.values()).flat();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Files Page</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        This is where you can manage your files.
      </p>

      <ul className="mt-6 space-y-4">
        {files.map((file) => (
          <Link key={file.fileId} href={`/api/file/${file.fileId}`}>
            <li className="w-full max-w-md rounded-lg border p-4">
              <h2 className="text-2xl font-semibold">{file.filename}</h2>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}

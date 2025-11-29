import FetchFiles from "./FetchFiles";

export default async function FilesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Files Page</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        This is where you can manage your files.
      </p>

      <FetchFiles />
    </main>
  );
}

import SendFiles from "./SendFiles";

export default async function SendPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Send Files Page</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        This is where you can send your files.
      </p>

      <SendFiles />
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-4 text-lg text-blue-600 dark:text-blue-400">
        Go back home
      </Link>
    </div>
  );
}

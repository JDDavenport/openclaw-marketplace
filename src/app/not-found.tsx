import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-4xl">🔍</p>
      <h1 className="text-xl font-bold">Page Not Found</h1>
      <p className="text-gray-400 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700"
        >
          Go Home
        </Link>
        <Link
          href="/agents"
          className="rounded-md border border-gray-700 px-6 py-2 text-gray-300 hover:bg-gray-800"
        >
          Browse Agents
        </Link>
      </div>
    </div>
  );
}

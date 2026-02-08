"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-4xl">😵</p>
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <p className="text-gray-400 text-center max-w-md">
        We hit an unexpected error. Please try again, or contact support if the
        problem persists.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}

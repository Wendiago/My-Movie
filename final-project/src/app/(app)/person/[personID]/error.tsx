"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 mt-[72px] flex flex-col items-center justify-center">
      <h2 className="text-center">
        Something is wrong. Please try again or go back
      </h2>
      <button
        className="mt-4 rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground transition-colors hover:bg-destructive/80"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}

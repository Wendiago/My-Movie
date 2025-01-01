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
    <main className="flex h-full flex-col items-center justify-center bg-foreground">
      <h2 className="text-center text-background">{error.message}</h2>
      <button
        className="mt-4 rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground transition-colors hover:bg-destructive/80"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}

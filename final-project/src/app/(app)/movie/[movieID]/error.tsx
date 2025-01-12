"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Error() {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload(); // Reloads the page
  };

  const goHome = () => {
    router.push("/"); // Navigate to the homepage
  };
  return (
    <div className="w-full mt-[72px] flex flex-col flex-1 gap-2 justify-center">
      <div className="flex justify-center items-center">
        No info for this movie, fail getting movie info
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <Button onClick={handleRefresh}>Refresh</Button>
        <Button onClick={goHome} variant="link" className="text-destructive">
          Go to home
        </Button>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SearchResultsSkeleton() {
  return (
    <div className="container h-full">
      <div className="flex flex-wrap gap-4 justify-center mt-16">
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton
            key={index}
            className="sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] lg:h-[400px] md:h-[350px] rounded-md bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}

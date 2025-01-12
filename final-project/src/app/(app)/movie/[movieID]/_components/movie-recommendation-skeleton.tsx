"use client";

import { Skeleton } from "@/components/ui/skeleton";

const MovieRecommendationSkeleton = () => {
  return (
    <div className="container">
      <p className="text-foreground font-semibold text-xl mb-3">
        Recommendations
      </p>
      <div className="w-full">
        <div className="flex gap-4 w-max pr-8 pb-8">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="rounded-md w-[250px] flex flex-col">
                <Skeleton className="rounded-t-md w-[250px] h-[141px]" />
                <div className="flex-col gap-1 text-foreground justify-center items-center p-3 w-full h-[1rem]">
                  <Skeleton className="mb-2 w-full h-[20px]" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendationSkeleton;

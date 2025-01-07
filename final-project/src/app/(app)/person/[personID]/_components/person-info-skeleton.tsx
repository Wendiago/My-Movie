import { Skeleton } from "@/components/ui/skeleton";

export default function PersonInfoSkeleton() {
  return (
    <div className="container grid grid-cols-[300px_1fr] gap-8">
      {/* Left Section Skeleton */}
      <div className="flex flex-col">
        <Skeleton className="w-[300px] h-[450px] rounded-md" />
        <section className="flex flex-col mt-6">
          <Skeleton className="h-[24px] w-[200px] mb-3" />
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex flex-col mb-5">
              <Skeleton className="h-[18px] w-[150px] mb-1" />
              <Skeleton className="h-[16px] w-[200px]" />
            </div>
          ))}
        </section>
      </div>

      {/* Right Section Skeleton */}
      <div className="px-8 min-w-0">
        {/* Name Skeleton */}
        <Skeleton className="h-[32px] w-[70%] mb-6" />

        {/* Bio Section Skeleton */}
        <section className="mt-8">
          <Skeleton className="h-[50px] w-[150px] mb-3" />
        </section>

        {/* Known For Section Skeleton */}
        <section className="mt-8">
          <Skeleton className="h-[24px] w-[150px] mb-3" />
          <div className="flex gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-md w-[130px]">
                <Skeleton className="w-[130px] h-[195px] rounded-t-md" />
                <Skeleton className="h-[16px] w-full mt-2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export default function CastInfoSkeleton() {
  return (
    <>
      {/* Background and Header Skeleton */}
      <div className="w-full mx-auto bg-cover bg-center h-[200px]">
        <div className="container py-4 flex items-center gap-5">
          <Skeleton className="w-[58px] h-[87px]" />
          <div className="flex flex-col gap-2 w-[50%]">
            <Skeleton className="h-[24px] w-[70%]" />
            <Skeleton className="h-[18px] w-[50%]" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container py-8 grid grid-cols-2 gap-8">
        {/* Cast Section Skeleton */}
        <div className="flex flex-col">
          <Skeleton className="h-[24px] w-[150px] mb-5" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 w-full">
                <Skeleton className="w-[58px] h-[87px] rounded-md" />
                <Skeleton className="h-[18px] w-[70%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Crew Section Skeleton */}
        <div className="flex flex-col">
          <Skeleton className="h-[24px] w-[150px] mb-5" />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[18px] w-[100px]" />
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 w-full">
                  <Skeleton className="w-[58px] h-[87px] rounded-md" />
                  <Skeleton className="h-[18px] w-[70%]" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[18px] w-[100px]" />
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 w-full">
                  <Skeleton className="w-[58px] h-[87px] rounded-md" />
                  <Skeleton className="h-[18px] w-[70%]" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[18px] w-[100px]" />
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 w-full">
                  <Skeleton className="w-[58px] h-[87px] rounded-md" />
                  <Skeleton className="h-[18px] w-[70%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

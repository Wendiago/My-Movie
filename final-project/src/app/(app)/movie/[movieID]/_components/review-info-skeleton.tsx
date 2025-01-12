import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewInfoSkeleton() {
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
        <div className="container py-8 flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              className="w-full rounded-md border h-16"
              key={index}
            ></Skeleton>
          ))}
        </div>
      </div>
    </>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export default function MovieItemSkeleton() {
  return (
    <div className="w-full h-[200px] border rounded-md flex">
      <Skeleton className="w-[133px] h-[199px] rounded-tl-md rounded-bl-md"></Skeleton>
      <div className="px-[15px] py-[10px] flex flex-col justify-between w-full">
        <div className="flex items-center gap-3 h-[52px]">
          <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
          <Skeleton className="h-full w-28 rounded-md"></Skeleton>
        </div>
        <Skeleton className="w-full h-12 rounded-md"></Skeleton>
        <Skeleton className="w-full h-12 rounded-md"></Skeleton>
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export default function MovieInfoSkeleton() {
  const leftLayerStyle = {
    backgroundImage:
      "linear-gradient(270deg, rgba(17, 19, 25, 0) 0%, rgba(17, 19, 25, 0.05) 16%, rgba(17, 19, 25, 0.2) 30%, rgba(17, 19, 25, 0.39) 43%, rgba(17, 19, 25, 0.61) 55%, rgba(17, 19, 25, 0.8) 68%, rgba(17, 19, 25, 0.95) 82%, rgb(17, 19, 25) 98%)",
  };
  const bottomLayerStyle = {
    backgroundImage:
      "linear-gradient(179deg, rgba(17, 19, 25, 0) 1%, rgba(17, 19, 25, 0.05) 17%, rgba(17, 19, 25, 0.2) 31%, rgba(17, 19, 25, 0.39) 44%, rgba(17, 19, 25, 0.61) 56%, rgba(17, 19, 25, 0.8) 69%, rgba(17, 19, 25, 0.95) 83%, rgb(17, 19, 25) 99%)",
  };
  return (
    <div className="flex w-full relative h-[640px]">
      <div className="overflow-hidden absolute top-0 right-0 w-[70.84%] h-full">
        <Skeleton className="w-full h-full object-cover rounded-none" />
        <div
          className="left-layer absolute h-full w-[28%] bottom-0"
          style={leftLayerStyle}
        ></div>
        <div
          className="bottom-layer absolute w-full h-[36%] bottom-0"
          style={bottomLayerStyle}
        ></div>
      </div>
      <div className="container mt-[15%] z-30 flex flex-col gap-3">
        <div className="flex flex-col w-[500px] mb-8">
          <Skeleton className="h-[2rem] w-[70%] mb-3" />
          <div className="flex items-center gap-2 h-4 mb-4">
            <Skeleton className="h-[16px] w-[50px]" />
            <Skeleton className="h-[16px] w-[50px]" />
            <Skeleton className="h-[16px] w-[50px]" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-[24px] w-[80px]" />
            <Skeleton className="h-[24px] w-[80px]" />
            <Skeleton className="h-[24px] w-[80px]" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[16px] w-[150px]" />
            <Skeleton className="h-[16px] w-[150px]" />
            <Skeleton className="h-[16px] w-[250px]" />
            <Skeleton className="h-[64px] w-full" />
            <div className="flex gap-6">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-12 h-12 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

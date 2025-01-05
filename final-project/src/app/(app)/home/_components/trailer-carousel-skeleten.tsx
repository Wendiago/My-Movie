"use-client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function TrailerCarouselSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-screen lg:px-8">
      <Carousel className="mx-auto">
        <CarouselContent className="">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="md:basis-1/3 lg:basis-1/5" key={index}>
              <Skeleton className="w-[300px] h-[170px] rounded-lg" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

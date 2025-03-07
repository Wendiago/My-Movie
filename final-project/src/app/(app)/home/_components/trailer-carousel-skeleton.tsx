"use-client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function TrailerCarouselSkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:px-8">
      <Carousel className="mx-auto">
        <CarouselContent className="w-full -ml-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem className="md:basis-1/3 lg:basis-1/4" key={index}>
              <Skeleton className="w-[315px] h-[176px] rounded-lg" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

"use-client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function TrendingCarouselSkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:px-8">
      <Carousel className="mx-auto">
        <CarouselContent className="w-full -ml-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem
              className="md:basis-1/4 lg:basis-1/6 basis-1/2"
              key={index}
            >
              <Skeleton className="w-48 h-72 rounded-lg" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

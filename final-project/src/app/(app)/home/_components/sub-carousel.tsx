"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SubCarouselItem from "./sub-carousel-item";
import { Movie } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/routes";

type SubCarouselProps = {
  carouselName?: string;
  data: Movie[] | null;
};

export default function SubCarousel({ carouselName, data }: SubCarouselProps) {
  const router = useRouter();
  const isLoading = !data;
  return (
    <div className="flex flex-col gap-3 max-w-screen lg:px-8">
      {carouselName && (
        <div className="font-bold text-background ml-8 text-2xl">
          {carouselName}
        </div>
      )}
      <Carousel opts={{ align: "start", loop: true }} className="mx-auto">
        <CarouselPrevious className="bg-transparent hover:bg-transparent [&_svg]:text-background left-6 z-10" />
        <CarouselContent className="">
          {isLoading
            ? // Render skeleton placeholders
              Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={`skeleton-${index}`}
                  className="md:basis-1/3 lg:basis-1/5"
                >
                  <Skeleton className="w-full h-[200px] rounded-lg" />
                </CarouselItem>
              ))
            : // Render actual data items
              data.map((movie, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/5 pl-2 cursor-pointer"
                  onClick={() =>
                    router.push(paths.details.getHref(movie.id.toString()))
                  }
                >
                  <SubCarouselItem data={movie} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselNext className="bg-transparent hover:bg-transparent [&_svg]:text-background right-6 z-10" />
      </Carousel>
    </div>
  );
}

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SubCarouselItem from "./trending-carousel-item";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/routes";
import { GetTrendingMoviesResponse } from "@/types/api";
import { use } from "react";

type TrendingCarouselProps = {
  carouselName?: string;
  data: Promise<GetTrendingMoviesResponse>;
};

export default function TrendingCarousel({
  carouselName,
  data,
}: TrendingCarouselProps) {
  const router = useRouter();
  const trendingMovies = use(data).data;

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
          {trendingMovies.map((movie, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/5 pl-2 cursor-pointer"
              onClick={() =>
                router.push(paths.details.getHref(movie.tmdb_id.toString()))
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

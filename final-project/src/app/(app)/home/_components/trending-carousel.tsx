"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/routes";
import { GetTrendingMoviesResponse } from "@/types/api";
import { use } from "react";
import TrendingCarouselItem from "./trending-carousel-item";

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
    <div className="w-full flex flex-col gap-3">
      {carouselName && (
        <div className="font-bold text-foreground text-2xl">{carouselName}</div>
      )}
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full mx-auto"
      >
        <CarouselPrevious className="bg-foreground [&_svg]:text-background hover:bg-foreground/80 z-10 border-none left-0" />
        <CarouselContent className="w-full -ml-2">
          {trendingMovies.map((movie, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/4 lg:basis-1/6 basis-1/2 cursor-pointer"
              onClick={() =>
                router.push(paths.details.getHref(movie.tmdb_id.toString()))
              }
            >
              <TrendingCarouselItem data={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="bg-foreground [&_svg]:text-background hover:bg-foreground/80 z-10 border-none right-0" />
      </Carousel>
    </div>
  );
}

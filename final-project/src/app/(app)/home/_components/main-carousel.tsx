"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { use, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { GetTrendingMoviesResponse } from "@/types/api";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/routes";
import MovieOverview from "./movie-overview";
import CustomImage from "@/components/ui/custom-image";
export default function MainCarousel({
  className,
  data,
}: {
  className?: string;
  data: Promise<GetTrendingMoviesResponse>;
}) {
  const movies = use(data).data;
  const router = useRouter();
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));
  const [currentMovie, setCurrentMovie] = useState(movies[0]);

  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSlidesInView = () => {
      const slidesInView = api.slidesInView();
      if (slidesInView.length > 0) {
        setCurrentMovie(movies[slidesInView[0]]);
      }
    };

    api.on("slidesInView", () => {
      handleSlidesInView();
    });
    return () => {
      api.off("slidesInView", handleSlidesInView);
    };
  }, [api, movies]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      plugins={[plugin.current]}
      className={cn(className, "w-full relative")}
    >
      <MovieOverview data={currentMovie} className="z-30" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70"></div>
      </div>
      <CarouselPrevious className="h-12 w-12 absolute top-1/2 -translate-y-1/2 left-0 z-10 rounded-none bg-transparent border-none [&_svg]:size-12 hover:bg-transparent [&_svg]:text-foreground" />
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem key={index} className="relative">
            <CustomImage
              src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${movie.backdrop_path}`}
              alt="main carousel item"
              width={1440}
              height={850}
              placeholderSrc={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${movie.backdrop_path}`}
              className="w-screen h-64 md:h-[850px] object-cover cursor-pointer"
              onClick={() =>
                router.push(paths.details.getHref(movie.id.toString()))
              }
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="h-12 w-12 absolute top-1/2 -translate-y-1/2 right-0 z-10 rounded-none bg-transparent border-none [&_svg]:size-12 hover:bg-transparent [&_svg]:text-foreground" />
    </Carousel>
  );
}

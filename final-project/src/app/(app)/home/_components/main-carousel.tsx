"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieOverview from "./movie-overview";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { cn } from "@/utils/cn";
export default function MainCarousel({ className }: { className?: string }) {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[plugin.current]}
      className={cn(className, "w-full max-w-screen relative")}
    >
      <CarouselPrevious className="h-12 w-12 absolute top-1/2 -translate-y-1/2 left-0 z-10 rounded-none bg-transparent border-none [&_svg]:size-12 hover:bg-transparent [&_svg]:text-white" />
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="relative">
            <img
              src="https://images.hindustantimes.com/img/2023/01/25/1600x900/pathaan_movie_review_1674631292696_1674631292838_1674631292838.jpeg"
              alt=""
              className="w-full h-auto"
            />
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
            </div>
            <MovieOverview className="absolute top-[20%] left-[7%]" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="h-12 w-12 absolute top-1/2 -translate-y-1/2 right-0 z-10 rounded-none bg-transparent border-none [&_svg]:size-12 hover:bg-transparent [&_svg]:text-white" />
    </Carousel>
  );
}

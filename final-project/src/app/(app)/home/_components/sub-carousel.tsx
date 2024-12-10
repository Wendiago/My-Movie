"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SubCarouselItem from "./sub-carousel-item";
import { SubCarouselMovie } from "@/types/api";

type SubCarouselProps = {
  carouselName?: string;
  data: SubCarouselMovie[];
};

export default function SubCarousel({ carouselName, data }: SubCarouselProps) {
  return (
    <div className="flex flex-col gap-3">
      {carouselName && (
        <div className="font-bold text-background ml-8 text-2xl">
          {carouselName}
        </div>
      )}
      <Carousel opts={{ align: "start", loop: true }} className="container">
        <CarouselPrevious className="bg-transparent hover:bg-transparent [&_svg]:text-background -left-4" />
        <CarouselContent className="-ml-2">
          {data.map((movie, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/5 pl-2"
            >
              <SubCarouselItem data={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="bg-transparent hover:bg-transparent [&_svg]:text-background -right-4" />
      </Carousel>
    </div>
  );
}

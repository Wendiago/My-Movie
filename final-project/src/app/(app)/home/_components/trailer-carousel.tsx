"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SubCarouselItem from "./trailer-carousel-item";
import { GetMovieTrailersResponse } from "@/types/api";
import { use } from "react";
import { Dialog } from "@/components/ui/dialog";
import MediaPlayerPopup from "./media-player";

type TrailerCarouselProps = {
  carouselName?: string;
  data: Promise<GetMovieTrailersResponse>;
};

export default function TrailerCarousel({
  carouselName,
  data,
}: TrailerCarouselProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedMovieUrl, setSelectedMovieUrl] = useState("");
  const movieTrailers = use(data).data;
  console.log('movie trailers: ', movieTrailers);

  const handleItemClick = (url: string) => {
    setSelectedMovieUrl(url);
    setPopupOpen(true);
  };

  return (
    <div className="flex flex-col bg-background/5 gap-3 pt-6 md:max-w-screen max-w-screen-lg lg:px-8">
      {carouselName && (
        <div className="font-bold text-primary ml-8 text-2xl">
          {carouselName}
        </div>
      )}
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselPrevious className="bg-transparent hover:bg-transparent [&_svg]:text-background left-1 top-24 z-10" />
        <CarouselContent className="w-screen lg:w-full">
          {movieTrailers.map((trailer, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/4 pl-2 cursor-pointer"
              onClick={() => handleItemClick(trailer?.key)}
            >
              <SubCarouselItem data={trailer?.tmdb_id} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="bg-transparent hover:bg-transparent [&_svg]:text-background right-6 top-24 z-10" />
      </Carousel>
      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <MediaPlayerPopup trailerUrl={`https://www.youtube.com/embed/${selectedMovieUrl}`}/>
      </Dialog>
    </div>
  );
}

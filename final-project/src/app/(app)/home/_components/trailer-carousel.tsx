"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GetMovieTrailersResponse } from "@/types/api";
import { use } from "react";
import { Dialog } from "@/components/ui/dialog";
import MediaPlayerPopup from "./media-player";
import TrailerCarouselItem from "./trailer-carousel-item";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

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
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const movieTrailers = use(data).data;
  //console.log("movie trailers: ", movieTrailers);

  const handleItemClick = (url: string) => {
    setSelectedMovieUrl(url);
    setPopupOpen(true);
  };

  const backgrounds = movieTrailers.map((movieTrailer) => {
    return movieTrailer.tmdb_id.backdrop_path;
  });

  // Loop through backgrounds every 1 minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgrounds.length
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [backgrounds]);

  const currentBackground =
    backgrounds[currentBackgroundIndex] &&
    `${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${backgrounds[currentBackgroundIndex]}`;

  return (
    <div
      className="w-full py-3 "
      style={{
        backgroundImage: currentBackground
          ? `linear-gradient(hsla(263.4, 70%, 30.4%, 0.3), hsla(263.4, 70%, 30.4%, 0.3)), url(${currentBackground})`
          : "linear-gradient(hsla(263.4, 70%, 30.4%, 0.3), hsla(263.4, 70%, 30.4%, 0.3))",
        backgroundColor: currentBackground ? "transparent" : "#000", // Fallback color
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container flex flex-col gap-4">
        {carouselName && (
          <div className="font-bold text-2xl">{carouselName}</div>
        )}
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselPrevious className="bg-foreground [&_svg]:text-background hover:bg-foreground/80 z-10 border-none left-0" />
          <CarouselContent className="w-full -ml-2">
            {movieTrailers.map((trailer, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/4 cursor-pointer"
                onClick={() => handleItemClick(trailer?.key)}
              >
                <TrailerCarouselItem data={trailer?.tmdb_id} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="bg-foreground [&_svg]:text-background hover:bg-foreground/80 z-10 border-none right-0" />
        </Carousel>
        <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
          <VisuallyHidden.Root>
            <DialogTitle></DialogTitle>
          </VisuallyHidden.Root>
          <MediaPlayerPopup
            trailerUrl={`https://www.youtube.com/embed/${selectedMovieUrl}`}
          />
        </Dialog>
      </div>
    </div>
  );
}

"use-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GetMovieDetailResponse, Movie } from "@/types/api";
import { ChevronRight, Play, Star } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { use } from "react";

export default function MovieInfo({
  data,
}: {
  data: Promise<GetMovieDetailResponse>;
}) {
  const movieDetail = use(data).data;
  const partialCast = movieDetail?.credits?.cast
    ?.slice()
    .sort((a, b) => a.order - b.order)
    .slice(0, 10);
  const leftLayerStyle = {
    backgroundImage:
      "linear-gradient(270deg, rgba(17, 19, 25, 0) 0%, rgba(17, 19, 25, 0.05) 16%, rgba(17, 19, 25, 0.2) 30%, rgba(17, 19, 25, 0.39) 43%, rgba(17, 19, 25, 0.61) 55%, rgba(17, 19, 25, 0.8) 68%, rgba(17, 19, 25, 0.95) 82%, rgb(17, 19, 25) 98%)",
  };
  const bottomLayerStyle = {
    backgroundImage:
      "linear-gradient(179deg, rgba(17, 19, 25, 0) 1%, rgba(17, 19, 25, 0.05) 17%, rgba(17, 19, 25, 0.2) 31%, rgba(17, 19, 25, 0.39) 44%, rgba(17, 19, 25, 0.61) 56%, rgba(17, 19, 25, 0.8) 69%, rgba(17, 19, 25, 0.95) 83%, rgb(17, 19, 25) 99%)",
  };

  const validImageUrl = (url: string | null | undefined) => {
    if (!url) return false;
    return true;
  };
  return (
    <>
      <div className="flex w-full min-h-screen relative">
        <div className="overflow-hidden absolute top-0 right-0 w-[70.84%] h-full">
          {validImageUrl(movieDetail.backdrop_path) ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w1280${movieDetail.backdrop_path}`}
              alt={movieDetail.title}
              height={576}
              width={1000}
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              className="w-full h-full object-cover"
              src="/placeholder.jpeg"
              alt="placeholder"
              height={576}
              width={1000}
            ></Image>
          )}
          <div
            className="left-layer absolute h-full w-[28%] bottom-0"
            style={leftLayerStyle}
          ></div>
          <div
            className="bottom-layer absolute w-full h-[36%] bottom-0"
            style={bottomLayerStyle}
          ></div>
        </div>
        <div className="w-full mt-[10%] z-30 flex flex-col gap-3">
          <div className="flex flex-col w-[500px] mb-8">
            <h1 className="text-[2rem] font-semibold line-clamp-1 text-background mb-3">
              {movieDetail.title}
            </h1>
            <div className="flex items-center gap-2 h-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500 fill-yellow-500" />
                <p className="text-yellow-500 font-semibold">
                  {movieDetail.vote_average.toPrecision(2)}
                </p>
              </div>
              <Separator orientation="vertical" />
              <p className="text-background">{movieDetail.release_date}</p>
              {movieDetail.adult && (
                <>
                  <Separator orientation="vertical" />
                  <Badge variant="outline">18</Badge>
                  <Separator orientation="vertical" />
                </>
              )}

              <p className="text-background">{movieDetail.original_language}</p>
            </div>
            <div className="flex items-center gap-2 mb-4">
              {movieDetail.genres?.map((genre, index) => (
                <Badge variant="outline" key={index}>
                  {genre.name}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-background">
                <span className="text-textGrey">Duration: {""}</span>
                {movieDetail.runtime} {""}min
              </p>
              <p className="text-background">
                <span className="text-textGrey">Budget: {""}</span>$
                {movieDetail.budget}
              </p>
              <p className="text-background">
                <span className="text-textGrey">
                  Production Companies: {""}
                </span>
                {movieDetail.production_companies?.map(
                  (productionCompany) => productionCompany.name + ", "
                )}
              </p>
              {/* add to prevent overflow max-h-[63px] line-clamp-2 */}
              <p className="text-background">
                <span className="text-textGrey">Overview: {""}</span>
                {movieDetail.overview}
              </p>
              <div>
                <Button className="flex justify-center items-center gap-2 ">
                  <Play /> Play trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="text-background font-semibold text-xl mb-3">
          Top Billed Cast
        </p>
        <ScrollArea className="w-full whitespace-nowrap ">
          <div className="flex gap-4 w-max pr-8 pb-6">
            {partialCast.map((cast, index) => (
              <div key={index} className="rounded-md">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w185${cast.profile_path}`}
                  alt={cast.name}
                  width="138"
                  height="175"
                  className="rounded-t-md w-[200px] h-[237px]"
                ></Image>
                <div className="flex-col gap-1 text-background justify-center items-center p-3">
                  <p className="text-center font-bold">{cast.name}</p>
                  <p className="text-center">{cast.character}</p>
                </div>
              </div>
            ))}
            <div className="flex text-background items-center justify-center font-bold cursor-pointer">
              View full
              <ChevronRight />
            </div>
          </div>
          <ScrollBar orientation="horizontal"></ScrollBar>
        </ScrollArea>
      </div>
    </>
  );
}

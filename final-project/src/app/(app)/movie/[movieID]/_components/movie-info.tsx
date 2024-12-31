import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Movie } from "@/types/api";
import { Play, Star } from "lucide-react";
import Image from "next/image";

export default function MovieInfo({ data }: { data: Movie }) {
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
          {validImageUrl(data.backdrop_path) ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}${data.backdrop_path}`}
              alt={data.title}
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
      </div>
      <div className="w-full -mt-[40%] z-30 flex flex-col gap-3">
        <div className="flex flex-col lg:w-[500px] mb-8">
          <h1 className="text-[2rem] font-semibold line-clamp-1 text-background mb-3">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 h-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500 fill-yellow-500" />
              <p className="text-yellow-500 font-semibold">
                {data.vote_average.toPrecision(2)}
              </p>
            </div>
            <Separator orientation="vertical" />
            <p className="text-background">{data.release_date}</p>
            {data.adult && (
              <>
                <Separator orientation="vertical" />
                <Badge variant="outline">18</Badge>
                <Separator orientation="vertical" />
              </>
            )}

            <p className="text-background">{data.original_language}</p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {data.genres?.map((genre, index) => (
              <Badge variant="outline" key={index}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-background">
              <span className="text-textGrey">Duration: {""}</span>
              {data.runtime} {""}min
            </p>
            <p className="text-background">
              <span className="text-textGrey">Budget: {""}</span>${data.budget}
            </p>
            <p className="text-background">
              <span className="text-textGrey">Production Companies: {""}</span>
              {data.production_companies?.map(
                (productionCompany) => productionCompany.name + ", "
              )}
            </p>
            {/* add to prevent overflow max-h-[63px] line-clamp-2 */}
            <p className="text-background">
              <span className="text-textGrey">Description: {""}</span>
              {data.overview}
            </p>
            <div>
              <Button className="flex justify-center items-center gap-2 ">
                <Play /> Play trailer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

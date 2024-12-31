import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type MovieDetails } from "@/types/api";
import { Play, Star } from "lucide-react";
import React from "react";

export default function MovieDetail({ data }: { data: MovieDetails }) {
  return (
    <div className="flex flex-col lg:w-[500px] mb-8">
      <h1 className="text-[2rem] font-semibold line-clamp-1 text-background mb-3">
        {data.title}
      </h1>
      <div className="flex items-center gap-2 mb-3">
        <Badge>{data.status}</Badge>
      </div>
      <div className="flex items-center gap-2 h-4 mb-4">
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" />
          <p className="text-yellow-500 font-semibold">{data.vote_average}</p>
        </div>
        <Separator orientation="vertical" />
        <p className="text-background">{data.release_date}</p>
        <Separator orientation="vertical" />
        <p className="text-background">{data.adult ? "T18" : "No restrict"}</p>
        <Separator orientation="vertical" />
        <p className="text-background">{data.original_language}</p>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {data.genres.map((genre, index) => (
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
          {data.production_companies.map(
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
            <Play /> Play
          </Button>
        </div>
      </div>
    </div>
  );
}

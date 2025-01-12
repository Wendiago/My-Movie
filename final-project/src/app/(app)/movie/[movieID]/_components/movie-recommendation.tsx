"use client";
import CustomImage from "@/components/ui/custom-image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GetMovieRecommendation } from "@/types/api";
import { useRouter } from "next/navigation";
import React, { use } from "react";

export default function MovieRecommendation({
  data,
}: {
  data: Promise<GetMovieRecommendation>;
}) {
  const movies = use(data).data;
  const router = useRouter();
  return (
    <div className="container">
      <p className="text-foreground font-semibold text-xl mb-3">
        Recommendations
      </p>
      <ScrollArea className="w-full">
        <div className="flex gap-4 w-max pr-8 pb-8">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="rounded-md cursor-pointer w-[250px]"
              onClick={() => router.push(`/movie/${movie.tmdb_id}`)}
            >
              <CustomImage
                src={`${process.env.NEXT_PUBLIC_IMDB_IMAGE_URL}/w500${movie.backdrop_path}`}
                alt={movie.title || "movie-recommendation-title"}
                width="250"
                height="141"
                className="rounded-t-md w-[250px] h-[141px]"
              />
              <div className="flex justify-between items-center gap-2 pt-3">
                <p className="flex-1 font-bold overflow-hidden text-ellipsis whitespace-nowrap inline-block">
                  {movie.title}
                </p>
                <p className="line-clamp-1 text-ellipsis whitespace-nowrap inline-flex justify-end">
                  {(movie.vote_average * 10).toPrecision(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal"></ScrollBar>
      </ScrollArea>
    </div>
  );
}

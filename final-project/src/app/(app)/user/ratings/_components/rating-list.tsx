"use client";
import React from "react";
import MovieItemSkeleton from "../../_components/movie-item-skeleton";
import RatingMovieItem from "./rating-movie-item";
import { useRatingList } from "@/api/user/rating-list";

export default function RatingList() {
  const { data, status } = useRatingList();
  return status == "success" ? (
    <div className="flex-1 flex flex-col gap-3">
      {data.data != null && data.data.length != 0 ? (
        data.data.map((movie, index) => (
          <RatingMovieItem key={index} data={movie} />
        ))
      ) : (
        <div className="">You haven't rated any movie.</div>
      )}
    </div>
  ) : status == "pending" ? (
    <div className="flex-1 flex">
      <MovieItemSkeleton />
    </div>
  ) : (
    <div>Something is wrong</div>
  );
}

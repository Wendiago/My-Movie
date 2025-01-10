"use client";
import React from "react";
import MovieItemSkeleton from "../../_components/movie-item-skeleton";
import WatchingMovieItem from "./watching-movie-item";
import { useWatchlist } from "@/api/user/watch-list";

export default function Watchlist() {
  const { data, status } = useWatchlist();
  return status == "success" ? (
    <div className="flex-1 flex flex-col gap-3">
      {data.data != null && data.data.length != 0 ? (
        data.data.map((movie, index) => (
          <WatchingMovieItem key={index} data={movie} />
        ))
      ) : (
        <div className="">You haven`&apos;`t added any movie to watchlist.</div>
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

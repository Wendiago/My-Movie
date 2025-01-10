"use client";
import { useFavoriteList } from "@/api/user/favorite-list";
import React from "react";
import FavoriteMovieItem from "./favorite-movie-item";
import MovieItemSkeleton from "../../_components/movie-item-skeleton";

export default function FavoriteLists() {
  const { data, status } = useFavoriteList();
  return status == "success" ? (
    <div className="flex-1 flex flex-col gap-3">
      {data.data != null && data.data.length != 0 ? (
        data.data.map((movie, index) => (
          <FavoriteMovieItem key={index} data={movie} />
        ))
      ) : (
        <div className="">You haven`&apos;`t added any favorite movies.</div>
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

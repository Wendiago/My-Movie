"use client";
import { useFavoriteList } from "@/api/user/favorite-list";
import React from "react";
import FavoriteMovieItem from "./favorite-movie-item";
import FavoriteMovieItemSkeleton from "./favorite-movie-item-skeleton";

export default function FavoriteLists() {
  const { data, status } = useFavoriteList();
  //console.log(data);
  return status == "success" ? (
    <div className="flex-1 flex flex-col gap-2">
      {data.data != null ? (
        data.data.map((movie, index) => (
          <FavoriteMovieItem key={index} data={movie} />
        ))
      ) : (
        <div className="">You haven't added any favorite movies.</div>
      )}
    </div>
  ) : status == "pending" ? (
    <div className="flex-1 flex">
      <FavoriteMovieItemSkeleton />
    </div>
  ) : (
    <div>Something is wrong</div>
  );
}

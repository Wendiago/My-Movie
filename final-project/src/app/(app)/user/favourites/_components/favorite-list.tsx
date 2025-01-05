"use client";
import { useFavoriteList } from "@/api/user/user";
import React from "react";
import FavoriteMovieItem from "./favorite-movie-item";
import FavoriteMovieItemSkeleton from "./favorite-movie-item-skeleton";

export default function FavoriteLists() {
  const { data, status } = useFavoriteList();
  //console.log(data);
  return status == "success" ? (
    <div className="flex-1 flex flex-col gap-2">
      {data.data.favoriteList.length != 0 ? (
        data.data.favoriteList.map((movie, index) => (
          <FavoriteMovieItem key={index} data={movie.idMovie} />
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

import { getMovieDetail } from "@/api/movie/movie";
import React from "react";
import MovieInfo from "./movie-info";

export default async function MovieInfoServer({
  movieID,
}: {
  movieID: string;
}) {
  const movieInfo = (await getMovieDetail(movieID)).data;
  return <MovieInfo data={movieInfo} />;
}

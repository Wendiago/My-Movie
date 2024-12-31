import { customFetch } from "@/lib/api-client";
import {
  GetAllGenresResponse,
  GetMovieDetailResponse,
  GetTrendingMoviesResponse,
} from "@/types/api";

import { useQuery } from "@tanstack/react-query";

// Search movie
export const searchMovie = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}): Promise<any> => {
  if (!query) {
    throw new Error("Search query is required.");
  }

  const response = await customFetch.get("/api/v1/search", {
    params: { query, page },
  });
  console.log("res", response);

  return response;
};

const searchMovieKey = (query: string, page: number) => [
  "searchMovie",
  { query, page },
];

export const useSearchMovies = ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}) => {
  return useQuery({
    queryKey: searchMovieKey(query, page),
    queryFn: () => searchMovie({ query, page }),
    enabled: !!query,
  });
};

// Get today trending movie
export const getTodayTrendingMovies =
  async (): Promise<GetTrendingMoviesResponse> => {
    const response = customFetch.get<GetTrendingMoviesResponse>(
      "/api/v1/trending/movie/day",
      { cache: "force-cache" }
    );
    return response;
  };

export const useTodayTrendingMovies = () => {
  return useQuery({
    queryKey: ["getTodayTrendingMovies"],
    queryFn: () => getTodayTrendingMovies(),
  });
};

// Get this week trending movie
export const getWeekTrendingMovies =
  async (): Promise<GetTrendingMoviesResponse> => {
    const response = customFetch.get<GetTrendingMoviesResponse>(
      "/api/v1/trending/movie/week",
      { cache: "force-cache" }
    );
    return response;
  };

//Get all genres
export const getAllGenres = async (): Promise<GetAllGenresResponse> => {
  const response = customFetch.get<GetAllGenresResponse>("/api/v1/genres", {
    cache: "force-cache",
  });
  return response;
};

export const useWeekTrendingMovies = () => {
  return useQuery({
    queryKey: ["getWeekTrendingMovies"],
    queryFn: () => getWeekTrendingMovies(),
  });
};

//Get movie detail
export const getMovieDetail = async (
  movieID: string
): Promise<GetMovieDetailResponse> => {
  const response = customFetch.get<GetMovieDetailResponse>(
    `/api/v1/detail/movie/${movieID}`,
    { cache: "force-cache" }
  );
  return response;
};

export const useMovieDetail = (movieID: string) => {
  return useQuery({
    queryKey: ["getMovieDetail"],
    queryFn: () => getMovieDetail(movieID),
  });
};

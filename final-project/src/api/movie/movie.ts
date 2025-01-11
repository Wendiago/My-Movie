import { customFetch } from "@/lib/api-client";
import {
  GetAllGenresResponse,
  GetMovieDetailResponse,
  GetTrendingMoviesResponse,
  GetMovieTrailersResponse
} from "@/types/api";
import { useQuery } from "@tanstack/react-query";

// Get today trending movie
export const getTodayTrendingMovies =
  async (): Promise<GetTrendingMoviesResponse> => {
    const response = customFetch.get<GetTrendingMoviesResponse>(
      "/api/v1/movie/trending/day"
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
      "/api/v1/movie/trending/week"
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
    `/api/v1/movie/${movieID}`,
    { cache: "force-cache", next: { tags: ["get-movie-detail"] } }
  );
  return response;
};

export const useMovieDetail = (movieID: string) => {
  return useQuery({
    queryKey: ["getMovieDetail"],
    queryFn: () => getMovieDetail(movieID),
  });
};

// Get latest trailer list
export const getLatestTrailerList =
  async (): Promise<GetMovieTrailersResponse> => {
    const response = await customFetch.get<GetMovieTrailersResponse>(
      "/api/v1/movie/upcoming"
    );
    return response;
  };

export const useLatestTrailerList = () => {
  return useQuery({
    queryKey: ["getLatestTrailerList"],
    queryFn: () => getLatestTrailerList(),
  });
};

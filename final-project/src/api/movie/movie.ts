import { customFetch } from "@/lib/api-client";
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
export const getTodayTrendingMovies = async (): Promise<any> => {
  const response = await customFetch.get("/api/v1/trending/movie/day", {});

  return response;
};

export const useTodayTrendingMovies = () => {
  return useQuery({
    queryKey: ["getTodayTrendingMovies"],
    queryFn: () => getTodayTrendingMovies(),
  });
};

// Get this week trending movie
export const getWeekTrendingMovies = async (): Promise<any> => {
  const response = await customFetch.get("/api/v1/trending/movie/week", {});
  return response;
};

export const useWeekTrendingMovies = () => {
  return useQuery({
    queryKey: ["getWeekTrendingMovies"],
    queryFn: () => getWeekTrendingMovies(),
  });
};

//Get movie detail
export const getMovieDetail = async (movieID: string): Promise<any> => {
  const response = await customFetch.get(`/api/v1/detail/movie/${movieID}`);
  return response;
};

export const useMovieDetail = (movieID: string) => {
  return useQuery({
    queryKey: ["getMovieDetail"],
    queryFn: () => getMovieDetail(movieID),
  });
};

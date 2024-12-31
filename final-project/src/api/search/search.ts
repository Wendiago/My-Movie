import { customFetch } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

// Search movie by name or cast
export const searchMovie = async ({
  query,
  searchType = "name",
  genres,
  rating,
  release_date,
  page = 1,
  limit = 20,
}: {
  query: string;
  searchType?: string;
  genres?: string;
  rating?: number;
  release_date?: string;
  page?: number;
  limit?: number;
}): Promise<any> => {
  if (!query) {
    throw new Error("Search query is required.");
  }

  const response = await customFetch.get(`/api/v1/search/movie/${searchType}`, {
    params: { search: query, genres, rating, release_date, page, limit },
  });

  return response;
};

const searchMovieKey = ({
  query,
  searchType,
  genres,
  rating,
  release_date,
  page,
}: {
  query: string;
  searchType?: string;
  genres?: string;
  rating?: number;
  release_date?: string;
  page?: number;
}) => [
  "searchMovie",
  { query, searchType, genres, rating, release_date, page },
];

export const useSearchMovies = ({
  query,
  searchType = "name",
  genres,
  rating,
  release_date,
  page = 1,
  limit = 20,
}: {
  query: string;
  searchType?: string;
  genres?: string;
  rating?: number;
  release_date?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: searchMovieKey({
      query,
      searchType,
      genres,
      rating,
      release_date,
      page,
    }),
    queryFn: () =>
      searchMovie({ query, searchType, genres, rating, release_date, page, limit }),
    enabled: !!query,
  });
};

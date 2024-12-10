import { customFetch } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

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

const searchMovieKey = (query: string, page: number) => ["searchMovie", { query, page }];

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
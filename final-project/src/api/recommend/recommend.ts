import { customFetch } from "@/lib/api-client";
import { GetMovieRecommendation } from "@/types/api";

import { useQuery } from "@tanstack/react-query";

// Get recommendation based on favorite list
export const getRecommendationBasedFavoriteList = async ({
  genres,
  rating,
  release_year,
  page = 1,
  limit = 20,
}: {
  genres?: string;
  rating?: string;
  release_year?: string;
  page?: number;
  limit?: number;
}): Promise<any> => {
  const response = await customFetch.get("/api/v1/recommend/", {
    params: { genres, rating, release_year, page, limit },
  });
  return response;
};

export const useRecommendationBasedFavoriteList = ({
  genres,
  rating,
  release_year,
  page = 1,
  limit = 20,
}: {
  genres?: string;
  rating?: string;
  release_year?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [
      "getRecommendationBasedFavoriteList",
      genres,
      rating,
      release_year,
      page,
      limit,
    ],
    queryFn: () =>
      getRecommendationBasedFavoriteList({
        genres,
        rating,
        release_year,
        page,
        limit,
      }),
  });
};

export const getRecommendationBasedSelection = async (idMovie: string) => {
  return customFetch.get<GetMovieRecommendation>(
    `/api/v1/recommend/movie/${idMovie}`
  );
};

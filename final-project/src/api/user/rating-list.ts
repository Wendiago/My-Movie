import { customFetch } from "@/lib/api-client";
import {
  AddToRatingListResponse,
  GetRatingListResponse,
  RemoveFromRatingListResponse,
} from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getRatingList = async (): Promise<GetRatingListResponse> => {
  return customFetch.get<GetRatingListResponse>("/api/v1/ratings");
};

const addToRatingList = async ({
  movieID,
  rating,
}: {
  movieID: number;
  rating: number;
}): Promise<AddToRatingListResponse> => {
  return customFetch.post<AddToRatingListResponse>("/api/v1/ratings", {
    idMovie: movieID,
    rating: rating,
  });
};

const removeFromRatingList = async (
  movieID: number
): Promise<RemoveFromRatingListResponse> => {
  return customFetch.delete<RemoveFromRatingListResponse>(
    `/api/v1/ratings/${movieID}`
  );
};

export const useRatingList = () => {
  return useQuery({
    queryKey: ["get-ratingList"],
    queryFn: () => getRatingList(),
  });
};

export const useAddToRatingList = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-to-ratingList"],
    mutationFn: addToRatingList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-ratingList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-favoriteList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-watchlist"],
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return mutation;
};

export const useRemoveFromRatingList = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["remove-from-ratingList"],
    mutationFn: removeFromRatingList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-ratingList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-favoriteList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-watchlist"],
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return mutation;
};

import { customFetch } from "@/lib/api-client";
import {
  AddToFavoriteListResponse,
  GetFavoriteListResponse,
  RemoveFromFavoriteListResponse,
} from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getFavoriteList = async (): Promise<GetFavoriteListResponse> => {
  return customFetch.get<GetFavoriteListResponse>("/api/v1/favorites");
};

const addToFavoriteList = async (
  movieID: number
): Promise<AddToFavoriteListResponse> => {
  return customFetch.post<AddToFavoriteListResponse>("/api/v1/favorites", {
    idMovie: movieID,
  });
};

const removeFromFavoriteList = async (
  movieID: number
): Promise<RemoveFromFavoriteListResponse> => {
  return customFetch.delete<RemoveFromFavoriteListResponse>(
    `/api/v1/favorites/${movieID}`
  );
};

export const useFavoriteList = () => {
  return useQuery({
    queryKey: ["get-favoriteList"],
    queryFn: () => getFavoriteList(),
  });
};

export const useAddToFavoriteList = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-to-favoriteList"],
    mutationFn: addToFavoriteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-favoriteList"] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return mutation;
};

export const useRemoveFromFavoriteList = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["remove-from-favoriteList"],
    mutationFn: removeFromFavoriteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-favoriteList"] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return mutation;
};

import { customFetch } from "@/lib/api-client";
import {
  AddToFavoriteListResponse,
  GetFavoriteListResponse,
  RemoveFromFavoriteListResponse,
} from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToFavoriteListServerAction,
  removeFromFavoriteListServerAction,
} from "./favorite-list-actions";

export const getFavoriteList = async (): Promise<GetFavoriteListResponse> => {
  return customFetch.get<GetFavoriteListResponse>("/api/v1/favorites");
};

export const addToFavoriteList = async (
  movieID: number
): Promise<AddToFavoriteListResponse> => {
  return customFetch.post<AddToFavoriteListResponse>("/api/v1/favorites", {
    idMovie: movieID,
  });
};

export const removeFromFavoriteList = async (
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
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-to-favoriteList"],
    mutationFn: addToFavoriteList,
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
    onError: (error: any) => {
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
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["remove-from-favoriteList"],
    mutationFn: removeFromFavoriteList,
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
    onError: (error: any) => {
      onError?.(error);
    },
  });

  return mutation;
};

export const useAddToFavoriteListServer = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-to-favoriteList"],
    mutationFn: addToFavoriteListServerAction,
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
    onError: (error: any) => {
      onError?.(error);
    },
  });

  return mutation;
};

export const useRemoveFromFavoriteListServer = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["remove-from-favoriteList"],
    mutationFn: removeFromFavoriteListServerAction,
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
    onError: (error: any) => {
      const { message } = error;
      onError?.(message);
    },
  });

  return mutation;
};

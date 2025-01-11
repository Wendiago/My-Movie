import { customFetch } from "@/lib/api-client";
import {
  AddToWatchListResponse,
  GetWatchListResponse,
  RemoveFromWatchListResponse,
} from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToWatchlistServerAction,
  removeFromWatchlistServerAction,
} from "./watchlist-actions";

export const getWatchlist = async (): Promise<GetWatchListResponse> => {
  return customFetch.get<GetWatchListResponse>("/api/v1/watchlist");
};

export const addToWatchlist = async (
  movieID: number
): Promise<AddToWatchListResponse> => {
  return customFetch.post<AddToWatchListResponse>("/api/v1/watchlist", {
    idMovie: movieID,
  });
};

export const removeFromWatchlist = async (
  movieID: number
): Promise<RemoveFromWatchListResponse> => {
  return customFetch.delete<RemoveFromWatchListResponse>(
    `/api/v1/watchlist/${movieID}`
  );
};

export const useWatchlist = () => {
  return useQuery({
    queryKey: ["get-watchlist"],
    queryFn: () => getWatchlist(),
  });
};

export const useAddToWatchlist = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-to-watchlist"],
    mutationFn: addToWatchlist,
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

export const useRemoveFromWatchlist = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["remove-from-watchlist"],
    mutationFn: removeFromWatchlist,
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

export const useAddToWatchlistServerAction = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-to-watchlist"],
    mutationFn: addToWatchlistServerAction,
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

export const useRemoveFromWatchlistServerAction = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["remove-from-watchlist"],
    mutationFn: removeFromWatchlistServerAction,
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

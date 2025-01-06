import { customFetch } from "@/lib/api-client";
import {
  AddToWatchListResponse,
  GetWatchListResponse,
  RemoveFromWatchListResponse,
} from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getWatchlist = async (): Promise<GetWatchListResponse> => {
  return customFetch.get<GetWatchListResponse>("/api/v1/watchings");
};

const addToWatchlist = async (
  movieID: number
): Promise<AddToWatchListResponse> => {
  return customFetch.post<AddToWatchListResponse>("/api/v1/watchings", {
    idMovie: movieID,
  });
};

const removeFromWatchlist = async (
  movieID: number
): Promise<RemoveFromWatchListResponse> => {
  return customFetch.delete<RemoveFromWatchListResponse>(
    `/api/v1/watchings/${movieID}`
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
      queryClient.invalidateQueries({ queryKey: ["get-watchlist"] });
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
      queryClient.invalidateQueries({ queryKey: ["get-watchlist"] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return mutation;
};

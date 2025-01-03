import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { customFetch } from "@/lib/api-client";
import { TLoginSchema, TRegisterSchema } from "@/app/(auth)/_data/auth-schema";
import { GetUserResponse } from "@/types/api";

export const getUser = async (): Promise<GetUserResponse> => {
  return customFetch.get<GetUserResponse>("/authenticate");
};

export const logout = (): Promise<any> => {
  return customFetch.post("/api/v1/logout");
};

export const loginWithEmailAndPassword = (data: TLoginSchema): Promise<any> => {
  return customFetch.post("/api/v1/login", data);
};

export type TRegisterDTO = Omit<TRegisterSchema, "confirmPassword">;

export const registerWithEmailAndPassword = (
  data: TRegisterDTO
): Promise<any> => {
  return customFetch.post("/api/v1/register", data);
};

const userQueryKey = ["user"];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOptions());

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });

  return mutation;
};

export const useRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
};

export const useLogout = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueryKey });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    },
  });
};

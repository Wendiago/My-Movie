import { customFetch } from "@/lib/api-client";
import { GetCastByIDResponse } from "@/types/api";

export const getCastByID = async (
  castID: string
): Promise<GetCastByIDResponse> => {
  const response = customFetch.get<GetCastByIDResponse>(
    `/api/v1/detail/cast/${castID}`,
    { cache: "force-cache" }
  );
  return response;
};
